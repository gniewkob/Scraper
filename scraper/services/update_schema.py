# services/update_schema.py
import sys
import sqlite3
import logging
from pathlib import Path

# Konfiguracja loggera
logger = logging.getLogger("gdziepolek")
logger.setLevel(logging.DEBUG)

from scraper.core.config.config import DB_PATH
from scraper.core.config.urls import URLS, extract_product_id, get_product_name

def update_schema():
	try:
		with sqlite3.connect(DB_PATH) as conn:
			c = conn.cursor()

			logger.info("🔧 Tworzenie lub aktualizacja tabel...")

			# Główna tabela z cenami
			c.execute("""
				CREATE TABLE IF NOT EXISTS pharmacy_prices (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					product_id TEXT NOT NULL,
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
			""")

			# Produkty
			c.execute("""
				CREATE TABLE IF NOT EXISTS products (
					product_id TEXT PRIMARY KEY,
					name TEXT NOT NULL
				);
			""")

			# Alerty użytkownika (opcjonalnie)
			c.execute("""
				CREATE TABLE IF NOT EXISTS user_alerts (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					product_id TEXT NOT NULL,
					threshold REAL NOT NULL,
					email TEXT
				);
			""")

			# Historia powiadomień (opcjonalnie)
			c.execute("""
				CREATE TABLE IF NOT EXISTS notified_alerts (
					key TEXT PRIMARY KEY,
					fetched_at TEXT NOT NULL
				);
			""")

			# Widok najnowszych cen
			c.execute("""
				CREATE VIEW IF NOT EXISTS latest_prices AS
				SELECT * FROM pharmacy_prices WHERE (product_id, pharmacy_name, expiration, fetched_at) IN (
					SELECT product_id, pharmacy_name, expiration, MAX(fetched_at)
					FROM pharmacy_prices
					GROUP BY product_id, pharmacy_name, expiration
				);
			""")

			# Indeksy
			logger.info("📌 Tworzenie indeksów...")
			c.execute("CREATE INDEX IF NOT EXISTS idx_prices_product ON pharmacy_prices(product_id);")
			c.execute("CREATE INDEX IF NOT EXISTS idx_prices_fetched ON pharmacy_prices(fetched_at DESC);")

			# Migracja danych produktów z URL-i
			inserted = 0
			for url in URLS:
				try:
					product_id = extract_product_id(url)
					name = get_product_name(product_id)
					c.execute("INSERT OR IGNORE INTO products (product_id, name) VALUES (?, ?)", (product_id, name))
					inserted += c.rowcount
				except Exception as e:
					logger.warning(f"⚠️ Błąd przy migracji produktu z URL: {url} → {e}")

			conn.commit()
			logger.info(f"✅ Schemat bazy zaktualizowany. Dodano {inserted} produktów.")
	except Exception as e:
		logger.critical(f"❌ Krytyczny błąd przy aktualizacji schematu: {e}")

if __name__ == "__main__":
	update_schema()
