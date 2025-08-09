import sqlite3
import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture()
def client(tmp_path_factory, monkeypatch):
    db_file = tmp_path_factory.mktemp("data") / "prod.sqlite"
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
    conn.execute("INSERT INTO products (id, slug, name, active) VALUES (1, 'p1', 'Active', 1)")
    conn.execute("INSERT INTO products (id, slug, name, active) VALUES (2, 'p2', 'Inactive', 0)")
    conn.commit()
    conn.close()

    monkeypatch.setattr('backend.main.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('backend.main.DB_URL', f'sqlite:///{db_file}', raising=False)
    from backend import db as backend_db
    backend_db._ENGINE_CACHE.clear()

    with TestClient(app) as c:
        yield c


def test_products_only_active(client):
    res = client.get('/api/products')
    assert res.status_code == 200
    data = res.json()
    ids = {p['id'] for p in data}
    assert 1 in ids
    assert 2 not in ids
