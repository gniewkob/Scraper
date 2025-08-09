from sqlalchemy import create_engine, text

from scraper.services import db as db_services


def setup_test_db():
    engine = create_engine("sqlite:///:memory:", future=True)
    with engine.begin() as conn:
        conn.exec_driver_sql(
            """
            CREATE TABLE pharmacy_prices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id TEXT NOT NULL,
                price FLOAT NOT NULL
            )
            """
        )
    return engine


def test_update_price_stats_creates_table_and_aggregates():
    engine = setup_test_db()
    db_services.ENGINE = engine

    with engine.begin() as conn:
        conn.execute(
            text(
                """
                INSERT INTO pharmacy_prices (product_id, price) VALUES
                    ('p1', 10.0),
                    ('p1', 20.0),
                    ('p2', 5.0),
                    ('p2', 15.0)
                """
            )
        )

    stats = db_services.update_price_stats()

    assert stats == {
        "p1": {"min_price": 10.0, "max_price": 20.0, "avg_price": 15.0},
        "p2": {"min_price": 5.0, "max_price": 15.0, "avg_price": 10.0},
    }

    with engine.connect() as conn:
        rows = conn.execute(
            text(
                "SELECT product_id, min_price, max_price, avg_price FROM price_stats ORDER BY product_id"
            )
        ).mappings().all()

    assert rows == [
        {"product_id": "p1", "min_price": 10.0, "max_price": 20.0, "avg_price": 15.0},
        {"product_id": "p2", "min_price": 5.0, "max_price": 15.0, "avg_price": 10.0},
    ]

