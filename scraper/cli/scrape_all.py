# cli/scrape_all.py

import importlib.util
import os
import sys
import time
import logging
from pathlib import Path
from datetime import datetime

# 🔧 Dodaj główny katalog do sys.path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from core.browser import setup_browser
from core.data_extractor import extract_pharmacy_data
from core.bootstrap import ensure_schema, init_logging
from core.config.urls import PRODUCT_NAMES, get_url_by_name

# 📁 Inicjalizacja logowania i schematu
init_logging()
logger = logging.getLogger("gdziepolek")
ensure_schema()

def main():
	driver = setup_browser()
	scraped = 0

	try:
		for idx, name in enumerate(PRODUCT_NAMES, start=1):
			url = get_url_by_name(name)
			if not url:
				logger.warning(f"[{idx}] ⚠️ Pominięto (brak URL): {name}")
				continue

			logger.info(f"[{idx}] 🔍 Scraping: {name}")
			try:
				extract_pharmacy_data(driver, url)
				logger.info(f"[{idx}] ✅ Gotowe: {name}")
			except Exception as e:
				logger.error(f"[{idx}] ❌ Błąd ekstrakcji – {e}")

			scraped += 1

			if scraped % 10 == 0:
				logger.info("🔄 Restart przeglądarki dla stabilności...")
				driver.quit()
				time.sleep(2)
				driver = setup_browser()

			time.sleep(1.5)

	finally:
		driver.quit()
		logger.info("🛑 Zakończono scraping.")

if __name__ == "__main__":
	main()
