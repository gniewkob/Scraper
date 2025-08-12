import sqlite3
import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture()
def client(migrated_db):
    conn = sqlite3.connect(migrated_db)
    conn.execute("INSERT INTO products (id, slug, name, active) VALUES (1, 'p1', 'Active', 1)")
    conn.execute("INSERT INTO products (id, slug, name, active) VALUES (2, 'p2', 'Inactive', 0)")
    conn.commit()
    conn.close()

    with TestClient(app) as c:
        yield c


def test_products_only_active(client):
    res = client.get('/api/products')
    assert res.status_code == 200
    data = res.json()
    ids = {p['id'] for p in data}
    assert 1 in ids
    assert 2 not in ids
