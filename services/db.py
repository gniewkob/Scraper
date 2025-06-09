import sqlite3
import logging
from datetime import datetime
from pathlib import Path
from services.price_validator import normalize_unit

logger = logging.getLogger("gdziepolek")
DB_PATH = Path("pharmacy_prices.sqlite")


def ensure_product_name(product_id, product_name):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute("INSERT OR IGNORE INTO products (product_id, name) VALUES (?, ?)", (product_id, product_name))
        conn.commit()


def insert_prices(entry: dict):
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        now = datetime.now().isoformat(timespec='seconds')

        offers = entry.get("offers", [])
        if not offers:
            logger.debug(f"⏩ Pominięto {entry['name']} – brak ofert.")
            return

        if not should_insert_price(entry):
            logger.debug(f"⏩ Pominięto {entry['name']} – brak zmian.")
            return

        for offer in offers:
            price = offer.get("price")
            unit = normalize_unit(offer.get("unit"))
            expiration = offer.get("expiration")

            try:
                cur.execute("""
                    INSERT OR IGNORE INTO pharmacy_prices (
                        product_id, pharmacy_name, address, price, unit, expiration,
                        availability, updated, fetched_at, map_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    entry["product_id"],
                    entry["name"],
                    entry.get("address", ""),
                    float(price),
                    unit,
                    expiration,
                    entry.get("availability"),
                    entry.get("updated"),
                    now,
                    entry.get("map_url", "")
                ))

                if cur.rowcount == 0:
                    logger.debug(f"ℹ️ Duplikat pominięty: {entry['name']} {price} zł ({expiration})")

            except Exception as e:
                logger.error(f"❌ Błąd zapisu do bazy ({entry['name']}): {e}")
                continue

        conn.commit()


def should_insert_price(entry: dict) -> bool:
    offers = entry.get("offers", [])
    if not offers:
        return False

    with sqlite3.connect(DB_PATH) as conn:
        cur = conn.cursor()

        for offer in offers:
            price = offer.get("price")
            expiration = offer.get("expiration", "")
            unit = normalize_unit(offer.get("unit"))

            cur.execute("""
                SELECT 1 FROM pharmacy_prices
                WHERE product_id = ? AND pharmacy_name = ? AND address = ?
                  AND price = ? AND expiration = ? AND unit = ?
                LIMIT 1
            """, (
                entry["product_id"],
                entry["name"],
                entry.get("address", ""),
                price,
                expiration,
                unit
            ))

            if cur.fetchone() is None:
                return True  # nowa oferta

    return False  # wszystko już w bazie


def get_all_prices():
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        return conn.execute("SELECT * FROM pharmacy_prices ORDER BY fetched_at DESC").fetchall()


def get_prices_for_product(product_id: str):
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        return conn.execute("""
            SELECT * FROM pharmacy_prices
            WHERE product_id = ?
            ORDER BY price ASC
        """, (product_id,)).fetchall()


def get_trend_for_product(product_id: str):
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        return conn.execute("""
            SELECT fetched_at, price, expiration
            FROM pharmacy_prices
            WHERE product_id = ?
            ORDER BY fetched_at ASC, price ASC
        """, (product_id,)).fetchall()


def get_top3_prices(product_id: str):
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        return conn.execute("""
            SELECT *
            FROM pharmacy_prices
            WHERE product_id = ?
            ORDER BY price ASC
            LIMIT 3
        """, (product_id,)).fetchall()
