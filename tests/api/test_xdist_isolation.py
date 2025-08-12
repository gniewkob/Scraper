import sqlite3
import pytest
import backend.main as main
from fastapi.testclient import TestClient
from backend.main import app

@pytest.fixture()
def client(migrated_db):
    with TestClient(app) as c:
        yield c


@pytest.mark.parametrize("idx", range(4))
def test_client_database_is_isolated(client, idx):
    """Ensure each test using the client gets its own database."""
    conn = sqlite3.connect(main.DB_PATH)
    conn.execute(
        "INSERT INTO products (id, slug, name) VALUES (1, ?, ?)",
        (f"s{idx}", f"Name{idx}"),
    )
    conn.commit()
    conn.close()

    resp = client.get('/api/products')
    assert resp.status_code == 200
    products = resp.json()
    assert len(products) == 1
    assert products[0]['name'] == f'Name{idx}'
