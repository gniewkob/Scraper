import asyncio
import sqlite3

from backend import db as db_mod


def test_get_offers_pagination(tmp_path, monkeypatch):
    db_file = tmp_path / "offers.sqlite"
    conn = sqlite3.connect(db_file)
    conn.execute(
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE,
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
    conn.execute("INSERT INTO products (id, slug, name) VALUES (1, 'p1', 'Prod1')")
    for idx, price in enumerate([10.0, 20.0, 30.0], start=1):
        conn.execute(
            """
            INSERT INTO pharmacy_prices (
                product_id, pharmacy_name, address, price, unit, expiration,
                fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon
            ) VALUES (
                1, ?, 'Addr', ?, 'g', NULL,
                '2023-01-01T00:00:00', 'Y', '2023-01-01', '', 0.0, 0.0
            )
            """,
            (f'Pharmacy{idx}', price),
        )
    conn.commit()
    conn.close()

    monkeypatch.setattr('scraper.core.config.config.DB_PATH', str(db_file), raising=False)
    monkeypatch.setattr('scraper.core.config.config.DB_URL', f'sqlite:///{db_file}', raising=False)
    db_mod._ENGINE_CACHE.clear()

    offers = asyncio.run(db_mod.get_offers(limit=2, offset=0))
    assert len(offers) == 2
    assert {o['pharmacy_name'] for o in offers} == {'Pharmacy1', 'Pharmacy2'}

    offers_offset = asyncio.run(db_mod.get_offers(limit=2, offset=2))
    assert len(offers_offset) == 1
    assert offers_offset[0]['pharmacy_name'] == 'Pharmacy3'
