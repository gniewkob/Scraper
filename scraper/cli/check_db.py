# cli/check_db.py

import sys
from pathlib import Path
# 🔧 Dodaj główny katalog do sys.path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import sqlite3
import importlib.util
import logging

from core.bootstrap import init_logging, ensure_schema
from core.config.config import DB_PATH

# 📁 Ustawienie katalogu głównego projektu
ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
	sys.path.insert(0, str(ROOT_DIR))

# 🧪 Inicjalizacja logowania
init_logging()
logger = logging.getLogger("gdziepolek")

# 🔧 Synchronizacja struktury bazy danych
ensure_schema()

schema_path = ROOT_DIR / "services" / "update_schema.py"
if schema_path.exists():
	spec = importlib.util.spec_from_file_location("update_schema", schema_path)
	update_schema = importlib.util.module_from_spec(spec)
	sys.modules["update_schema"] = update_schema
	spec.loader.exec_module(update_schema)
	logger.info("✅ Schemat bazy zaktualizowany.")
else:
	logger.warning("⚠️ Plik update_schema.py nie znaleziony. Upewnij się, że struktura bazy została przygotowana.")

# 💾 Podgląd ostatnich rekordów
try:
	conn = sqlite3.connect("pharmacy_prices.sqlite")
	cur = conn.cursor()

	cur.execute("""
		SELECT pharmacy_name, price, expiration, fetched_at, map_url
		FROM pharmacy_prices
		ORDER BY fetched_at DESC
		LIMIT 20
	""")

	rows = cur.fetchall()
	logger.info(f"ℹ️ Znaleziono {len(rows)} rekordów:")
	for row in rows:
		print(f"{row[0]} – {row[1]} zł ({row[2]}) @ {row[3]}\n🔗 {row[4]}")
except Exception as e:
	logger.error(f"❌ Błąd podczas odczytu danych: {e}")
finally:
	conn.close()
