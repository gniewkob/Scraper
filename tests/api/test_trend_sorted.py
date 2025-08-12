import sqlite3
import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture()
def client(tmp_path_factory, monkeypatch):
    db_file = tmp_path_factory.mktemp("data") / "trend.sqlite"
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
    conn.execute("INSERT INTO products (id, slug, name) VALUES (1, 'p1', 'Trend')")
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'A', 'Addr', 10, '1g', NULL,
            '2023-01-02T00:00:00', 'Y', '2023-01-02', '', 0.0, 0.0
        )
        """
    )
    conn.execute(
        """
        INSERT INTO pharmacy_prices (
            product_id, pharmacy_name, address, price, unit, expiration,
            fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
        ) VALUES (
            1, 'B', 'Addr', 20, '1g', NULL,
            '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
        )
        """
    )
    conn.commit()
    conn.close()

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    monkeypatch.setattr('scraper.core.config.config.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('scraper.core.config.config.DB_URL', f'sqlite:///{db_file}', raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    with TestClient(app) as c:
        yield c


def test_trend_sorted(client):
    resp = client.get('/api/product/Trend')
    assert resp.status_code == 200
    data = resp.json()
    trend = data['trend']
    dates = [t['fetched_at'] for t in trend]
    assert dates == sorted(dates)
