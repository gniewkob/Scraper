import sqlite3
import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture()
def client(migrated_db):
    conn = sqlite3.connect(migrated_db)
    conn.execute(
        "INSERT INTO products (id, slug, name, active) VALUES (1, 'p0', 'Sample', 1)"
    )
    conn.commit()
    conn.close()

    from backend import db as backend_db

    backend_db._ENGINE_CACHE.clear()

    with TestClient(app) as c:
        yield c


def test_invalid_product_name(client):
    resp = client.get('/api/product/Invalid!')
    assert resp.status_code == 422


def test_invalid_sort_param(client):
    resp = client.get('/api/product/Sample', params={'sort': 'bad'})
    assert resp.status_code == 422


def test_invalid_city_param(client):
    resp = client.get('/api/alerts_grouped', params={'city': 'City123'})
    assert resp.status_code == 422
