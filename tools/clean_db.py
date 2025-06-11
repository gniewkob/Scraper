#!/usr/bin/env python3
"""Remove expired and duplicate entries from the pharmacy prices database."""

import sqlite3
from scraper.core.config.config import DB_PATH
from datetime import datetime

def clean_database(db_path: str = DB_PATH) -> None:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    # remove expired offers
    cur.execute(
        "DELETE FROM pharmacy_prices WHERE expiration IS NOT NULL AND DATE(expiration) < DATE('now')"
    )
    # remove duplicates keeping the latest fetched_at
    cur.execute(
        """
        DELETE FROM pharmacy_prices
        WHERE id NOT IN (
            SELECT id FROM (
                SELECT id,
                       ROW_NUMBER() OVER (
                           PARTITION BY product_id, pharmacy_name, expiration, price
                           ORDER BY datetime(fetched_at) DESC
                       ) AS rn
                FROM pharmacy_prices
            ) WHERE rn = 1
        )
        """
    )
    conn.commit()
    conn.close()

if __name__ == "__main__":
    clean_database()
    print("Database cleaned")
