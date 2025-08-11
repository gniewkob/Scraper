"""Tests for the FastAPI backend."""

import pytest
from fastapi.testclient import TestClient

from backend.main import app
import json
import sqlite3
from cryptography.fernet import Fernet


@pytest.fixture()
def client(tmp_path_factory, monkeypatch):
    """Create a TestClient for the FastAPI app with a temp database."""
    db_file = tmp_path_factory.mktemp("data") / "test.sqlite"
    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1,
            first_seen TEXT,
            last_seen TEXT
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name TEXT NOT NULL,
            address TEXT,
            price REAL,
            unit TEXT,
            expiration TEXT,
            fetched_at TEXT,
            availability TEXT,
            updated TEXT,
            map_url TEXT,
            pharmacy_lat REAL,
            pharmacy_lon REAL,
            UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
        )
        """
    )
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

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

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


def test_get_cities(client):
    response = client.get('/api/cities')
    assert response.status_code == 200
    cities = response.json()
    assert isinstance(cities, list)
    assert cities, 'Cities list should not be empty'
    assert isinstance(cities[0], str)


def test_get_city_coords(client, monkeypatch, tmp_path):
    coords_file = tmp_path / 'coords.json'
    data = {"TestCity": {"lat": 1.23, "lon": 4.56}}
    coords_file.write_text(json.dumps(data))
    monkeypatch.setattr('backend.main.CITY_COORDS_FILE', coords_file, raising=False)

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
def alerts_db(tmp_path, monkeypatch):
    db_file = tmp_path / "alerts.sqlite"
    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1,
            first_seen TEXT,
            last_seen TEXT
        )
        """
    )
    conn.execute(
        "CREATE TABLE user_alerts (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, threshold REAL NOT NULL, email_encrypted TEXT, phone_encrypted TEXT, created TEXT, token TEXT, confirmed INTEGER DEFAULT 0)"
    )
    conn.execute("INSERT INTO products (id, slug, name) VALUES (1, 'p1', 'Test')")
    conn.commit()
    conn.close()
    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()
    key = Fernet.generate_key().decode()
    monkeypatch.setenv("ALERTS_FERNET_KEY", key)
    return db_file


@pytest.mark.parametrize(
    "data",
    [
        {"threshold": 30, "product_name": "Test"},  # missing email and phone
        {"email": "a@b.com", "product_name": "Test"},  # missing threshold
        {"phone": "+48100100100", "product_name": "Test"},  # missing threshold
        {"email": "a@b.com", "threshold": 30},  # missing product_name
        {"phone": "+48100100100", "threshold": 30},  # missing product_name
    ],
)
def test_register_alert_missing_field(client, alerts_db, data):
    resp = client.post('/api/alerts/register', json=data)
    assert resp.status_code == 400
    body = resp.json()
    assert body.get("status") == "error"


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


def test_price_per_g_returned(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name TEXT NOT NULL,
            address TEXT,
            price REAL,
            unit TEXT,
            expiration TEXT,
            fetched_at TEXT,
            availability TEXT,
            updated TEXT,
            map_url TEXT,
            pharmacy_lat REAL,
            pharmacy_lon REAL,
            UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
        )
        """
    )
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

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    resp = client.get('/api/product/TestProduct')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(15.0)
    assert offers[0]['price'] == pytest.approx(15.0)


def test_price_per_g_from_package_sizes(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name TEXT NOT NULL,
            address TEXT,
            price REAL,
            unit TEXT,
            expiration TEXT,
            fetched_at TEXT,
            availability TEXT,
            updated TEXT,
            map_url TEXT,
            pharmacy_lat REAL,
            pharmacy_lon REAL,
            UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
        )
        """
    )
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

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {"1": 5}, raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    resp = client.get('/api/product/SizeProduct')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(30.0)
    assert offers[0]['price'] == pytest.approx(30.0)


def test_price_per_g_from_small_price(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name TEXT NOT NULL,
            address TEXT,
            price REAL,
            unit TEXT,
            expiration TEXT,
            fetched_at TEXT,
            availability TEXT,
            updated TEXT,
            map_url TEXT,
            pharmacy_lat REAL,
            pharmacy_lon REAL,
            UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
        )
        """
    )
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

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {"1": 5}, raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    resp = client.get('/api/product/CheapSize')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(10.0)
    assert offers[0]['price'] == pytest.approx(10.0)


def test_price_per_g_omitted_without_quantity_and_low_price(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name TEXT NOT NULL,
            address TEXT,
            price REAL,
            unit TEXT,
            expiration TEXT,
            fetched_at TEXT,
            availability TEXT,
            updated TEXT,
            map_url TEXT,
            pharmacy_lat REAL,
            pharmacy_lon REAL,
            UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
        )
        """
    )
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

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {}, raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    resp = client.get('/api/product/NoQtyLow')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert 'price_per_g' not in offers[0]
    assert offers[0]['price'] == pytest.approx(80.0)


def test_price_per_g_added_below_100_with_package_size(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name TEXT NOT NULL,
            address TEXT,
            price REAL,
            unit TEXT,
            expiration TEXT,
            fetched_at TEXT,
            availability TEXT,
            updated TEXT,
            map_url TEXT,
            pharmacy_lat REAL,
            pharmacy_lon REAL,
            UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
        )
        """
    )
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

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {"1": 10}, raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    resp = client.get('/api/product/CheapTen')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(7.0)
    assert offers[0]['price'] == pytest.approx(7.0)


def test_price_per_g_real_product_id(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name TEXT NOT NULL,
            address TEXT,
            price REAL,
            unit TEXT,
            expiration TEXT,
            fetched_at TEXT,
            availability TEXT,
            updated TEXT,
            map_url TEXT,
            pharmacy_lat REAL,
            pharmacy_lon REAL,
            UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
        )
        """
    )
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

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {"121591": 10}, raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    resp = client.get('/api/product/S-Lab22')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(20.0)
    assert offers[0]['price'] == pytest.approx(20.0)
