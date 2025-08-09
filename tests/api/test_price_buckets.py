import sqlite3
import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture()
def client(tmp_path_factory, monkeypatch):
    db_file = tmp_path_factory.mktemp("data") / "buckets.sqlite"
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
        """
        CREATE TABLE product_type_mapping (
            product_id TEXT PRIMARY KEY,
            product_type TEXT
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE price_thresholds (
            product_type TEXT,
            super_deal REAL,
            deal REAL,
            normal REAL,
            updated_at TEXT
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE price_statistics (
            product TEXT,
            min_price REAL,
            calculated_at TEXT
        )
        """
    )
    conn.execute("INSERT INTO products (id, slug, name) VALUES (1, 'p1', 'Bucket')")
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'A', 'Addr', 12, '1g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'B', 'Addr', 18, '1g', NULL,
            '2023-01-02T00:00:00', 'Y', '2023-01-02', '', 0.0, 0.0
        )
        """
    )
    conn.execute(
        "INSERT INTO price_thresholds (product_type, super_deal, deal, normal, updated_at) VALUES ('default', 15, 20, 30, '2024-01-01')"
    )
    conn.execute(
        "INSERT INTO price_statistics (product, min_price, calculated_at) VALUES ('1', 12, '2024-01-01T00:00:00')"
    )
    conn.commit()
    conn.close()

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    with TestClient(app) as c:
        yield c


def test_price_buckets_and_historical_low(client):
    resp = client.get('/api/product/Bucket')
    assert resp.status_code == 200
    offers = resp.json()['offers']
    assert offers[0]['price_bucket'] == 'super_okazja'
    assert offers[0]['is_historical_low'] is True
    assert offers[1]['price_bucket'] == 'okazja'
    assert offers[1]['is_historical_low'] is False
