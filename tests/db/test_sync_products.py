from datetime import datetime, timezone

from sqlalchemy import create_engine, text

from scraper.services import db as db_services


def test_sync_products_activation_and_pharmacy_prices_untouched(migrated_db):
    engine = create_engine(f"sqlite:///{migrated_db}", future=True)
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
        first_seen = datetime.fromisoformat(row["first_seen"])
        if first_seen.tzinfo is None:
            first_seen = first_seen.replace(tzinfo=timezone.utc)
        last_seen = datetime.fromisoformat(row["last_seen"])
        if last_seen.tzinfo is None:
            last_seen = last_seen.replace(tzinfo=timezone.utc)
        assert first_seen.tzinfo == timezone.utc
        assert last_seen.tzinfo == timezone.utc

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
