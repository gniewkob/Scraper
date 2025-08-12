from sqlalchemy import create_engine, text

from scraper.services import db as db_services


def test_update_price_stats_creates_table_and_aggregates(migrated_db):
    engine = create_engine(f"sqlite:///{migrated_db}", future=True)
    db_services.ENGINE = engine

    with engine.begin() as conn:
        conn.execute(
            text(
                "INSERT INTO products (id, slug, name) VALUES (1, 'p1', 'P1'), (2, 'p2', 'P2')"
            )
        )
        conn.execute(
            text(
                """
                INSERT INTO pharmacy_prices (product_id, pharmacy_name, price, fetched_at)
                VALUES
                    (1, 'A', 10.0, 'now'),
                    (1, 'B', 20.0, 'now'),
                    (2, 'A', 5.0, 'now'),
                    (2, 'B', 15.0, 'now')
                """
            )
        )

    stats = db_services.update_price_stats()

    assert stats == {
        1: {"min_price": 10.0, "max_price": 20.0, "avg_price": 15.0},
        2: {"min_price": 5.0, "max_price": 15.0, "avg_price": 10.0},
    }

    with engine.connect() as conn:
        rows = conn.execute(
            text(
                "SELECT product_id, min_price, max_price, avg_price FROM price_stats ORDER BY product_id"
            )
        ).mappings().all()

    assert rows == [
        {"product_id": "1", "min_price": 10.0, "max_price": 20.0, "avg_price": 15.0},
        {"product_id": "2", "min_price": 5.0, "max_price": 15.0, "avg_price": 10.0},
    ]

