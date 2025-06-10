# cli/analyze_prices.py
import sys
import importlib.util
import logging
import sqlite3
import argparse
from pathlib import Path
from datetime import datetime
from collections import defaultdict
from scraper.core.config.config import DB_PATH

from scraper.core.bootstrap import init_logging, ensure_schema
# 🔧 Inicjalizacja logowania
init_logging()
logger = logging.getLogger("gdziepolek")

# 🔧 Automatyczna synchronizacja struktury bazy
schema_path = Path(__file__).resolve().parents[1] / "services" / "update_schema.py"
if schema_path.exists():
	spec = importlib.util.spec_from_file_location("update_schema", schema_path)
	update_schema = importlib.util.module_from_spec(spec)
	sys.modules["update_schema"] = update_schema
	spec.loader.exec_module(update_schema)
	logger.info("✅ Schemat bazy zaktualizowany.")
else:
	logger.warning("⚠️ Plik update_schema.py nie znaleziony. Upewnij się, że struktura bazy została przygotowana.")
	ensure_schema()

def fetch_all_data(product_filter=None):
	with sqlite3.connect(DB_PATH) as conn:
		cursor = conn.execute("""
			SELECT product, pharmacy, price, unit, fetched_at
			FROM price_history
			ORDER BY fetched_at ASC
		""")
		rows = cursor.fetchall()

	results = []
	for row in rows:
		product, pharmacy, price, unit, fetched_at = row
		if product_filter and product_filter.lower() not in product.lower():
			continue
		try:
			price_val = float(price.replace(",", ".").replace(" zł", "").replace(" ", ""))
		except ValueError:
			logger.debug(f"⚠️ Błąd konwersji ceny: {price}")
			continue
		results.append({
			"product": product,
			"pharmacy": pharmacy,
			"price": price_val,
			"unit": unit,
			"timestamp": datetime.fromisoformat(fetched_at)
		})
	return results


def show_lowest_price(data):
	by_product = defaultdict(list)
	for d in data:
		by_product[d["product"]].append(d)

	for product, entries in by_product.items():
		lowest = min(entries, key=lambda x: x["price"])
		logger.info(f"📉 Najniższa cena dla: {product}")
		logger.info(f"    {lowest['price']} zł/{lowest['unit']} @ {lowest['pharmacy']} ({lowest['timestamp']})")


def show_trend(data):
	by_product = defaultdict(list)
	for d in data:
		by_product[d["product"]].append(d)

	for product, entries in by_product.items():
		logger.info(f"📊 Trend cen dla: {product}")
		for e in entries:
			logger.info(f"  - {e['timestamp'].strftime('%Y-%m-%d %H:%M')} ➜ {e['price']} zł/{e['unit']} @ {e['pharmacy']}")


def show_latest_by_day(data):
	by_product = defaultdict(lambda: defaultdict(list))
	for d in data:
		day = d["timestamp"].strftime("%Y-%m-%d")
		by_product[d["product"]][day].append(d)

	for product, days in by_product.items():
		logger.info(f"📅 Ostatnia cena dzienna dla: {product}")
		for day, entries in sorted(days.items()):
			last_entry = sorted(entries, key=lambda x: x["timestamp"])[-1]
			logger.info(f"  {day}: {last_entry['price']} zł/{last_entry['unit']} @ {last_entry['pharmacy']}")


if __name__ == "__main__":
	parser = argparse.ArgumentParser(description="Analyze historical pharmacy price data")
	parser.add_argument("--lowest", action="store_true", help="Pokaż najniższą cenę historycznie")
	parser.add_argument("--trend", action="store_true", help="Pokaż trend cenowy")
	parser.add_argument("--daily", action="store_true", help="Pokaż ostatnie ceny z każdego dnia")
	parser.add_argument("--filter", help="Filtruj po nazwie produktu")

	args = parser.parse_args()
	data = fetch_all_data(product_filter=args.filter)

	if not data:
		logger.warning("❌ Brak danych do analizy.")

	if args.lowest:
		show_lowest_price(data)
	if args.trend:
		show_trend(data)
	if args.daily:
		show_latest_by_day(data)
