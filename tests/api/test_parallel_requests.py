import asyncio
import sqlite3

import pytest
from httpx import AsyncClient

from backend.main import app


@pytest.fixture()
async def async_client(tmp_path_factory, monkeypatch):
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
        "INSERT INTO products (id, slug, name) VALUES (1, 'p0', 'Sample')"
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

    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client


@pytest.mark.anyio
async def test_parallel_requests(async_client, anyio_backend):
    if anyio_backend != "asyncio":
        pytest.skip("requires asyncio backend")
    products = (await async_client.get('/api/products')).json()
    name = products[0]['name']

    async def fetch_products():
        return await async_client.get('/api/products')

    async def fetch_product():
        return await async_client.get(f'/api/product/{name}')

    responses = await asyncio.gather(*[fetch_products() for _ in range(5)])
    assert all(r.status_code == 200 for r in responses)

    responses = await asyncio.gather(*[fetch_product() for _ in range(5)])
    assert all(r.status_code == 200 for r in responses)
