# services/update_schema.py
import logging
import sqlite3

from scraper.core.config.config import DB_PATH
from scraper.core.config.urls import URLS, extract_product_id, get_product_name

# Konfiguracja loggera
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def update_schema() -> None:
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()

            logger.info("🔧 Tworzenie lub aktualizacja tabel...")

            # Główna tabela z cenami
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS pharmacy_prices (
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
                    UNIQUE(product_id, pharmacy_name, price, expiration, fetched_at)
                );
                """
            )

            # Produkty
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    slug TEXT UNIQUE NOT NULL,
                    name TEXT NOT NULL,
                    active INTEGER NOT NULL DEFAULT 1,
                    first_seen TEXT,
                    last_seen TEXT
                );
                """
            )

            # Alerty użytkownika (opcjonalnie)
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS user_alerts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    product_id TEXT NOT NULL,
                    threshold REAL NOT NULL,
                    email_encrypted TEXT,
                    phone_encrypted TEXT,
                    created TEXT,
                    token TEXT,
                    confirmed INTEGER DEFAULT 0
                );
                """
            )

            # Upewnij się, że istnieją kolumny dla zaszyfrowanych pól
            try:
                c.execute(
                    "ALTER TABLE user_alerts ADD COLUMN email_encrypted TEXT"
                )
            except sqlite3.OperationalError:
                pass
            try:
                c.execute(
                    "ALTER TABLE user_alerts ADD COLUMN phone_encrypted TEXT"
                )
            except sqlite3.OperationalError:
                pass
            try:
                c.execute(
                    "ALTER TABLE user_alerts ADD COLUMN created TEXT"
                )
            except sqlite3.OperationalError:
                pass
            try:
                c.execute("ALTER TABLE user_alerts ADD COLUMN token TEXT")
            except sqlite3.OperationalError:
                pass
            try:
                c.execute(
                    "ALTER TABLE user_alerts ADD COLUMN confirmed INTEGER DEFAULT 0"
                )
            except sqlite3.OperationalError:
                pass

            # Historia powiadomień (opcjonalnie)
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS notified_alerts (
                    key TEXT PRIMARY KEY,
                    fetched_at TEXT NOT NULL
                );
                """
            )

            # Widok najnowszych cen
            c.execute(
                """
                CREATE VIEW IF NOT EXISTS latest_prices AS
                SELECT *
                FROM pharmacy_prices
                WHERE (product_id, pharmacy_name, expiration, fetched_at) IN (
                    SELECT product_id,
                           pharmacy_name,
                           expiration,
                           MAX(fetched_at)
                    FROM pharmacy_prices
                    GROUP BY product_id, pharmacy_name, expiration
                );
                """
            )

            # Indeksy
            logger.info("📌 Tworzenie indeksów...")
            c.execute(
                "CREATE INDEX IF NOT EXISTS idx_prices_product ON pharmacy_prices(product_id);"
            )
            c.execute(
                "CREATE INDEX IF NOT EXISTS idx_prices_fetched ON pharmacy_prices(fetched_at DESC);"
            )

            # Migracja danych produktów z URL-i
            inserted = 0
            for url in URLS:
                try:
                    product_id = extract_product_id(url)
                    name = get_product_name(product_id)
                    c.execute(
                        "INSERT OR IGNORE INTO products (slug, name, active) VALUES (?, ?, 1)",
                        (product_id, name),
                    )
                    inserted += c.rowcount
                except Exception as e:  # noqa: BLE001
                    logger.warning(
                        f"⚠️ Błąd przy migracji produktu z URL: {url} → {e}"
                    )

            conn.commit()
            logger.info(
                f"✅ Schemat bazy zaktualizowany. Dodano {inserted} produktów."
            )
    except Exception as e:  # noqa: BLE001
        logger.critical(
            f"❌ Krytyczny błąd przy aktualizacji schematu: {e}"
        )


if __name__ == "__main__":
    update_schema()

