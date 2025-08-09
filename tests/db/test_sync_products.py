from sqlalchemy import create_engine, text

from scraper.services import db as db_services


def setup_test_db():
    engine = create_engine("sqlite:///:memory:", future=True)
    schema = [
        """
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            active BOOLEAN NOT NULL DEFAULT 1,
            first_seen DATETIME,
            last_seen DATETIME
        )
        """,
        """
        CREATE TABLE pharmacy_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            pharmacy_name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            price FLOAT NOT NULL,
            unit VARCHAR(50),
            expiration VARCHAR(50),
            availability VARCHAR(50),
            updated VARCHAR(50),
            fetched_at VARCHAR(50) NOT NULL,
            map_url VARCHAR(255),
            FOREIGN KEY(product_id) REFERENCES products (id)
        )
        """,
    ]
    with engine.begin() as conn:
        for stmt in schema:
            conn.exec_driver_sql(stmt)
    return engine


def test_sync_products_activation_and_pharmacy_prices_untouched():
    engine = setup_test_db()
    db_services.ENGINE = engine

    # Initial sync inserts products
    initial = [
        {
            "slug": "prod1",
            "name": "Product 1",
            "base_url": "https://example.com/prod1",
            "regional_url": "https://example.com/prod1/region",
        },
        {
            "slug": "prod2",
            "name": "Product 2",
            "base_url": "https://example.com/prod2",
            "regional_url": "https://example.com/prod2/region",
        },
    ]
    db_services.sync_products(initial)

    with engine.connect() as conn:
        rows = conn.execute(
            text("SELECT slug, active, first_seen, last_seen FROM products ORDER BY slug")
        ).mappings().all()
    assert len(rows) == 2
    for row in rows:
        assert row["active"] == 1
        assert row["first_seen"] is not None
        assert row["last_seen"] is not None

    # Insert an existing price entry
    with engine.begin() as conn:
        product_id = conn.execute(
            text("SELECT id FROM products WHERE slug='prod1'")
        ).scalar_one()
        conn.execute(
            text(
                "INSERT INTO pharmacy_prices (product_id, pharmacy_name, price, fetched_at) "
                "VALUES (:pid, 'Pharmacy', 9.99, 'now')"
            ),
            {"pid": product_id},
        )
        price_before = conn.execute(
            text("SELECT * FROM pharmacy_prices")
        ).mappings().all()

    # Sync again with one product removed
    db_services.sync_products(
        [
            {
                "slug": "prod2",
                "name": "Product 2",
                "base_url": "https://example.com/prod2",
                "regional_url": "https://example.com/prod2/region",
            }
        ]
    )

    with engine.connect() as conn:
        prod1_active = conn.execute(
            text("SELECT active FROM products WHERE slug='prod1'")
        ).scalar_one()
        prod2_active = conn.execute(
            text("SELECT active FROM products WHERE slug='prod2'")
        ).scalar_one()
        price_after = conn.execute(
            text("SELECT * FROM pharmacy_prices")
        ).mappings().all()

    assert prod1_active == 0
    assert prod2_active == 1
    assert price_after == price_before
