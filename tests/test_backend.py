"""Tests for the FastAPI backend."""

import pytest
from fastapi.testclient import TestClient

from backend.main import app
import json


@pytest.fixture(scope="module")
def client():
    """Create a TestClient for the FastAPI app."""
    with TestClient(app) as c:
        yield c


def test_get_products(client):
    response = client.get('/api/products')
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)
    assert products, 'Product list should not be empty'
    assert {'name', 'label'} <= set(products[0].keys())


def test_get_product_by_name(client):
    products = client.get('/api/products').json()
    product_name = products[0]['name']
    response = client.get(f'/api/product/{product_name}')
    assert response.status_code == 200
    data = response.json()
    assert 'offers' in data
    assert 'total' in data
    assert isinstance(data['offers'], list)


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


def test_alerts_grouped_city_filter(client):
    all_groups = client.get('/api/alerts_grouped').json()
    assert isinstance(all_groups, list)

    city = client.get('/api/cities').json()[0]
    city_groups = client.get(f'/api/alerts_grouped?city={city}').json()
    assert isinstance(city_groups, list)
    assert len(city_groups) <= len(all_groups)

    empty_groups = client.get('/api/alerts_grouped?city=NonexistentCity').json()
    assert empty_groups == []


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
def test_register_alert_missing_field(client, monkeypatch, tmp_path, data):
    monkeypatch.setattr('backend.main.ALERT_FILE', tmp_path / 'alerts.json', raising=False)
    resp = client.post('/api/alerts/register', json=data)
    assert resp.status_code == 400
    body = resp.json()
    assert body.get("status") == "error"


def test_register_alert_success(client, monkeypatch, tmp_path):
    monkeypatch.setattr('backend.main.ALERT_FILE', tmp_path / 'alerts.json', raising=False)
    data = {"email": "a@b.com", "phone": "+48100100100", "threshold": 30, "product_name": "Test"}
    resp = client.post('/api/alerts/register', json=data)
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}
    with open(tmp_path / 'alerts.json', 'r', encoding='utf-8') as f:
        alerts = json.load(f)
    assert alerts[-1]["email"] == "a@b.com"
    assert alerts[-1]["phone"] == "+48100100100"


def test_price_per_g_returned(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute("CREATE TABLE products (product_id TEXT PRIMARY KEY, name TEXT NOT NULL)")
    conn.execute(
        "CREATE TABLE pharmacy_prices (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id TEXT NOT NULL, pharmacy_name TEXT NOT NULL, address TEXT, price REAL, unit TEXT, expiration TEXT, fetched_at TEXT, availability TEXT, updated TEXT, map_url TEXT, pharmacy_lat REAL, pharmacy_lon REAL, UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at))"
    )
    conn.execute(
        "INSERT INTO products (product_id, name) VALUES (?, ?)",
        ("p1", "TestProduct"),
    )
    conn.execute(
        "INSERT INTO pharmacy_prices (product_id, pharmacy_name, address, price, unit, expiration, fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            "p1",
            "Pharmacy",
            "Addr",
            150.0,
            "10g",
            None,
            "2023-01-01T00:00:00",
            "Y",
            "2023-01-01",
            "",
            0.0,
            0.0,
        ),
    )
    conn.commit()
    conn.close()

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)

    resp = client.get('/api/product/TestProduct')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(15.0)


def test_price_per_g_from_package_sizes(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute("CREATE TABLE products (product_id TEXT PRIMARY KEY, name TEXT NOT NULL)")
    conn.execute(
        "CREATE TABLE pharmacy_prices (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id TEXT NOT NULL, pharmacy_name TEXT NOT NULL, address TEXT, price REAL, unit TEXT, expiration TEXT, fetched_at TEXT, availability TEXT, updated TEXT, map_url TEXT, pharmacy_lat REAL, pharmacy_lon REAL, UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at))"
    )
    conn.execute(
        "INSERT INTO products (product_id, name) VALUES (?, ?)",
        ("p2", "SizeProduct"),
    )
    conn.execute(
        "INSERT INTO pharmacy_prices (product_id, pharmacy_name, address, price, unit, expiration, fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            "p2",
            "Pharmacy",
            "Addr",
            150.0,
            "g",
            None,
            "2023-01-01T00:00:00",
            "Y",
            "2023-01-01",
            "",
            0.0,
            0.0,
        ),
    )
    conn.commit()
    conn.close()

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {"p2": 5}, raising=False)

    resp = client.get('/api/product/SizeProduct')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_per_g'] == pytest.approx(30.0)


def test_price_per_g_not_from_small_price(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute("CREATE TABLE products (product_id TEXT PRIMARY KEY, name TEXT NOT NULL)")
    conn.execute(
        "CREATE TABLE pharmacy_prices (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id TEXT NOT NULL, pharmacy_name TEXT NOT NULL, address TEXT, price REAL, unit TEXT, expiration TEXT, fetched_at TEXT, availability TEXT, updated TEXT, map_url TEXT, pharmacy_lat REAL, pharmacy_lon REAL, UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at))"
    )
    conn.execute(
        "INSERT INTO products (product_id, name) VALUES (?, ?)",
        ("p3", "CheapSize"),
    )
    conn.execute(
        "INSERT INTO pharmacy_prices (product_id, pharmacy_name, address, price, unit, expiration, fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            "p3",
            "Pharmacy",
            "Addr",
            50.0,
            "g",
            None,
            "2023-01-01T00:00:00",
            "Y",
            "2023-01-01",
            "",
            0.0,
            0.0,
        ),
    )
    conn.commit()
    conn.close()

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {"p3": 5}, raising=False)

    resp = client.get('/api/product/CheapSize')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert 'price_per_g' not in offers[0]


def test_price_per_g_omitted_without_quantity_and_low_price(client, monkeypatch, tmp_path):
    db_file = tmp_path / "test.sqlite"
    import sqlite3

    conn = sqlite3.connect(db_file)
    conn.execute("CREATE TABLE products (product_id TEXT PRIMARY KEY, name TEXT NOT NULL)")
    conn.execute(
        "CREATE TABLE pharmacy_prices (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id TEXT NOT NULL, pharmacy_name TEXT NOT NULL, address TEXT, price REAL, unit TEXT, expiration TEXT, fetched_at TEXT, availability TEXT, updated TEXT, map_url TEXT, pharmacy_lat REAL, pharmacy_lon REAL, UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at))"
    )
    conn.execute(
        "INSERT INTO products (product_id, name) VALUES (?, ?)",
        ("p4", "NoQtyLow"),
    )
    conn.execute(
        "INSERT INTO pharmacy_prices (product_id, pharmacy_name, address, price, unit, expiration, fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            "p4",
            "Pharmacy",
            "Addr",
            80.0,
            "g",
            None,
            "2023-01-01T00:00:00",
            "Y",
            "2023-01-01",
            "",
            0.0,
            0.0,
        ),
    )
    conn.commit()
    conn.close()

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.PACKAGE_SIZES', {}, raising=False)

    resp = client.get('/api/product/NoQtyLow')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert 'price_per_g' not in offers[0]

