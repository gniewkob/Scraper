import asyncio
import sqlite3

import pytest
from httpx import AsyncClient, ASGITransport

from backend.main import app


@pytest.fixture()
async def async_client(migrated_db):
    conn = sqlite3.connect(migrated_db)
    conn.execute("INSERT INTO products (id, slug, name) VALUES (1, 'p0', 'Sample')")
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

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
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
