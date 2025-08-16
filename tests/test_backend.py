"""Tests for the FastAPI backend."""

import pytest
from fastapi.testclient import TestClient

from backend.main import app
import json
import sqlite3
from cryptography.fernet import Fernet


@pytest.fixture()
def client(migrated_db):
    """Create a TestClient for the FastAPI app with seed data."""
    conn = sqlite3.connect(migrated_db)
    conn.execute(
        "INSERT INTO products (id, slug, name, active) VALUES (1, 'p0', 'Sample', 1)"
    )
    conn.execute(
        "INSERT INTO products (id, slug, name, active) VALUES (2, 'p_inactive', 'Inactive', 0)"
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'Pharmacy', 'Main St, 00-001 SampleCity', 100.0, '10g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()

    with TestClient(app) as c:
        yield c


def test_get_products(client):
    response = client.get('/api/products')
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)
    assert products, 'Product list should not be empty'
    assert {'id', 'name', 'label'} <= set(products[0].keys())
    names = {p['name'] for p in products}
    assert 'Sample' in names
    assert 'Inactive' not in names


def test_get_product_by_name(client):
    products = client.get('/api/products').json()
    product_name = products[0]['name']
    response = client.get(f'/api/product/{product_name}')
    assert response.status_code == 200
    data = response.json()
    assert 'offers' in data
    assert 'total' in data
    assert isinstance(data['offers'], list)
    if data['offers']:
        first = data['offers'][0]
        assert 'price_bucket' in first
        assert 'is_historical_low' in first
        assert isinstance(first['is_historical_low'], bool)
    if data.get('top3'):
        top_first = data['top3'][0]
        assert 'price_bucket' in top_first
        assert 'is_historical_low' in top_first


def test_get_product_not_found(client):
    response = client.get('/api/product/non-existent-product')
    assert response.status_code == 404


def test_get_cities(client, monkeypatch):
    import asyncio
    from backend import db as backend_db
    import backend.cities as city_data

    monkeypatch.setattr(city_data, "get_city_list", lambda: ["SampleCity"])

    response = client.get('/api/cities')
    assert response.status_code == 200
    cities = response.json()
    assert cities == ["SampleCity"]

    cities_direct = asyncio.run(backend_db.get_cities())
    assert cities_direct == ["SampleCity"]


def test_get_city_coords(client, monkeypatch, tmp_path):
    coords_file = tmp_path / 'coords.json'
    data = {"TestCity": {"lat": 1.23, "lon": 4.56}}
    coords_file.write_text(json.dumps(data))
    monkeypatch.setattr('backend.main.CITY_COORDS_FILE', coords_file, raising=False)
    # reset cache
    monkeypatch.setattr('backend.main._CITY_COORDS_CACHE', None, raising=False)

    resp = client.get('/api/city_coords/TestCity')
    assert resp.status_code == 200
    assert resp.json() == {"lat": 1.23, "lon": 4.56}

    # Modify file to ensure cached data is used
    coords_file.write_text(json.dumps({"TestCity": {"lat": 9.99, "lon": 8.88}}))
    resp = client.get('/api/city_coords/TestCity')
    assert resp.status_code == 200
    assert resp.json() == {"lat": 1.23, "lon": 4.56}

    resp = client.get('/api/city_coords/Unknown')
    assert resp.status_code == 404


def test_alerts_grouped_city_filter(client):
    all_groups = client.get('/api/alerts_grouped').json()
    assert isinstance(all_groups, list)

    city = client.get('/api/cities').json()[0]
    city_groups = client.get(f'/api/alerts_grouped?city={city}').json()
    assert isinstance(city_groups, list)
    assert len(city_groups) <= len(all_groups)

    empty_groups = client.get('/api/alerts_grouped?city=NonexistentCity').json()
    assert empty_groups == []


@pytest.fixture()
def alerts_db(client, monkeypatch):
    from scraper.core.config.config import DB_PATH as _DB_PATH

    conn = sqlite3.connect(_DB_PATH)
    conn.execute("INSERT INTO products (id, slug, name) VALUES (3, 'p1', 'Test')")
    conn.commit()
    conn.close()
    key = Fernet.generate_key().decode()
    monkeypatch.setenv("ALERTS_FERNET_KEY", key)
    monkeypatch.setattr('backend.main.send_confirmation_email', lambda *a, **k: True)
    monkeypatch.setattr('backend.main.send_confirmation_sms', lambda *a, **k: True)
    monkeypatch.setattr('backend.routes.alerts.send_confirmation_email', lambda *a, **k: True)
    monkeypatch.setattr('backend.routes.alerts.send_confirmation_sms', lambda *a, **k: True)
    return _DB_PATH


@pytest.mark.parametrize(
    "data",
    [
        {"threshold": 30, "product_name": "Test"},  # missing email and phone
        {"email": "a@b.com", "product_name": "Test"},  # missing threshold
        {"phone": "+48100100100", "product_name": "Test"},  # missing threshold
        {"email": "a@b.com", "threshold": 30},  # missing product_name
        {"phone": "+48100100100", "threshold": 30},  # missing product_name
        {"email": "a@b.com", "threshold": -1, "product_name": "Test"},  # invalid threshold
    ],
)
def test_register_alert_invalid_payload(client, alerts_db, data):
    resp = client.post('/api/alerts/register', json=data)
    assert resp.status_code == 422


def test_register_alert_success(client, alerts_db):
    data = {"email": "a@b.com", "phone": "+48100100100", "threshold": 30, "product_name": "Test"}
    resp = client.post('/api/alerts/register', json=data)
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}

    conn = sqlite3.connect(alerts_db)
    alert_id, token, confirmed = conn.execute(
        "SELECT id, token, confirmed FROM user_alerts ORDER BY id DESC LIMIT 1"
    ).fetchone()
    conn.close()
    assert confirmed == 0

    resp = client.post('/api/alerts/confirm', json={"token": token})
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}

    conn = sqlite3.connect(alerts_db)
    confirmed, email_e, phone_e = conn.execute(
        "SELECT confirmed, email_encrypted, phone_encrypted FROM user_alerts WHERE id=?",
        (alert_id,),
    ).fetchone()
    conn.close()
    from scraper.utils.crypto import decrypt

    assert confirmed == 1
    assert decrypt(email_e) == "a@b.com"
    assert decrypt(phone_e) == "+48100100100"


def test_price_per_g_returned(client, migrated_db):
    conn = sqlite3.connect(migrated_db)
    conn.execute("DELETE FROM pharmacy_prices")
    conn.execute("DELETE FROM products")
    conn.execute(
        "INSERT INTO products (id, slug, name) VALUES (1, 'p1', 'TestProduct')"
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'Pharmacy', 'Addr', 150.0, '10g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()

    resp = client.get('/api/product/TestProduct')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(15.0)
    assert offers[0]['price'] == pytest.approx(15.0)


def test_price_per_g_from_package_sizes(client, migrated_db, monkeypatch):
    conn = sqlite3.connect(migrated_db)
    conn.execute("DELETE FROM pharmacy_prices")
    conn.execute("DELETE FROM products")
    conn.execute(
        "INSERT INTO products (id, slug, name) VALUES (1, 'p2', 'SizeProduct')"
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'Pharmacy', 'Addr', 150.0, 'g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()
    monkeypatch.setattr('backend.routes.utils.PACKAGE_SIZES', {"1": 5}, raising=False)

    resp = client.get('/api/product/SizeProduct')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(30.0)
    assert offers[0]['price'] == pytest.approx(30.0)


def test_price_per_g_from_small_price(client, migrated_db, monkeypatch):
    conn = sqlite3.connect(migrated_db)
    conn.execute("DELETE FROM pharmacy_prices")
    conn.execute("DELETE FROM products")
    conn.execute(
        "INSERT INTO products (id, slug, name) VALUES (1, 'p3', 'CheapSize')"
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'Pharmacy', 'Addr', 50.0, 'g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()
    monkeypatch.setattr('backend.routes.utils.PACKAGE_SIZES', {"1": 5}, raising=False)

    resp = client.get('/api/product/CheapSize')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(10.0)
    assert offers[0]['price'] == pytest.approx(10.0)


def test_price_per_g_omitted_without_quantity_and_low_price(client, migrated_db, monkeypatch):
    conn = sqlite3.connect(migrated_db)
    conn.execute("DELETE FROM pharmacy_prices")
    conn.execute("DELETE FROM products")
    conn.execute(
        "INSERT INTO products (id, slug, name) VALUES (1, 'p4', 'NoQtyLow')"
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'Pharmacy', 'Addr', 80.0, 'g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()
    monkeypatch.setattr('backend.routes.utils.PACKAGE_SIZES', {}, raising=False)

    resp = client.get('/api/product/NoQtyLow')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert 'price_per_g' not in offers[0]
    assert offers[0]['price'] == pytest.approx(80.0)


def test_price_per_g_added_below_100_with_package_size(client, migrated_db, monkeypatch):
    conn = sqlite3.connect(migrated_db)
    conn.execute("DELETE FROM pharmacy_prices")
    conn.execute("DELETE FROM products")
    conn.execute(
        "INSERT INTO products (id, slug, name) VALUES (1, 'p5', 'CheapTen')"
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'Pharmacy', 'Addr', 70.0, 'g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()
    monkeypatch.setattr('backend.routes.utils.PACKAGE_SIZES', {"1": 10}, raising=False)

    resp = client.get('/api/product/CheapTen')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(7.0)
    assert offers[0]['price'] == pytest.approx(7.0)


def test_price_per_g_real_product_id(client, migrated_db, monkeypatch):
    conn = sqlite3.connect(migrated_db)
    conn.execute("DELETE FROM pharmacy_prices")
    conn.execute("DELETE FROM products")
    conn.execute(
        "INSERT INTO products (id, slug, name) VALUES (121591, '121591', 'S-Lab22')"
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            121591, 'Pharmacy', 'Addr', 200.0, 'g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()
    monkeypatch.setattr('backend.routes.utils.PACKAGE_SIZES', {"121591": 10}, raising=False)
    resp = client.get('/api/product/S-Lab22')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(20.0)
    assert offers[0]['price'] == pytest.approx(20.0)
