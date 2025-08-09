from pathlib import Path

import os
import json
import argparse
import logging
import time
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from scraper.core.browser import setup_browser
from scraper.core.data_extractor import extract_pharmacy_data
from scraper.core.config.urls import URLS, extract_product_id
from scraper.core.config.selectors import PHARMACY_ITEMS_SELECTORS
from scraper.services.db import insert_prices
from scraper.core.bootstrap import init_logging
from scraper.core.config.config import DB_PATH

logger = logging.getLogger("gdziepolek")

def create_logs_dir():
	Path("logs").mkdir(exist_ok=True)

def get_output_paths(product_id):
	timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
	json_output = f"pharmacies_{product_id}.json"
	debug_dir = Path("logs") / f"{product_id}_{timestamp}"
	debug_dir.mkdir(parents=True, exist_ok=True)
	return json_output, debug_dir

def filter_urls_by_product(urls, product_id):
	return [url for url in urls if extract_product_id(url) == product_id]

def scrape_product(driver, url, product_id):
	logger.info(f"🔍 Scraping: Produkt_{product_id} ({product_id})")
	logger.info(f"🌐 Ładuję stronę: {url}")
        driver.get(url)

        if "#stacjonarne" in url:
                driver.execute_script("location.href = '#stacjonarne';")
                time.sleep(1.5)

        # Scroll to the bottom to trigger lazy-loaded content and ensure
        # all offers are rendered before we start searching for them.
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(0.5)

	try:
		WebDriverWait(driver, 15).until(
			EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.MuiListItem-root"))
		)
	except TimeoutException:
		logger.warning("❌ Timeout – nie znaleziono ofert aptek.")
		return []

	pharmacy_elements = []
	for selector in PHARMACY_ITEMS_SELECTORS:
		try:
			pharmacy_elements = driver.find_elements(By.CSS_SELECTOR, selector)
			if pharmacy_elements:
				break
		except Exception:
			continue

	logger.info(f"🔎 Znaleziono {len(pharmacy_elements)} ofert." if pharmacy_elements else "⚠️ Nie znaleziono ofert.")
	offers = []
	_, debug_dir = get_output_paths(product_id)

        for i, el in enumerate(pharmacy_elements):
                try:
                        # Some elements load asynchronously; scrolling them into view
                        # avoids stale or detached element errors during extraction.
                        el.location_once_scrolled_into_view()
                        data = extract_pharmacy_data(el, product_id=product_id)
			if not data:
				logger.warning(f"✖ Oferta {i+1}: pominięta — niepoprawne dane.")
				with open(debug_dir / f"oferta_{i+1}_invalid.html", "w", encoding="utf-8") as f:
					f.write(el.get_attribute("outerHTML"))
				continue

			offers.append(data)
			insert_prices(data)
                        cheapest_offer = min(data["offers"], key=lambda x: x["price"])
                        logger.info(
                            f"✅ Oferta {i+1}: {data['name']} – {cheapest_offer['price']} zł / {cheapest_offer['unit']}"
                        )
		except Exception as e:
			logger.error(f"❌ Błąd podczas przetwarzania oferty {i+1}: {e}")
			with open(debug_dir / f"oferta_{i+1}_exception.html", "w", encoding="utf-8") as f:
				f.write(el.get_attribute("outerHTML"))

	return offers

def main(product_id):
	init_logging()  # 🔥 Aktywuj centralne logowanie
	create_logs_dir()
	filtered_urls = filter_urls_by_product(URLS, product_id)
	logger.info(f"🧪 URLs po filtrze: {filtered_urls}")

	if not filtered_urls:
		logger.warning(f"⚠️ Brak URLi dla produktu {product_id}")
		return

	driver = setup_browser(headless=False)

	all_offers = []
	try:
		for url in filtered_urls:
			offers = scrape_product(driver, url, product_id)
			all_offers.extend(offers)
	finally:
		driver.quit()

	if not all_offers:
		logger.warning(f"⚠️ Brak poprawnych ofert dla Produkt_{product_id}.")
		return

	flattened = []
	for entry in all_offers:
                cheapest = min(entry["offers"], key=lambda x: x["price"])
		flattened.append({
			"name": entry["name"],
			"href": entry["href"],
			"address": entry["address"],
			"availability": entry["availability"],
			"updated": entry["updated"],
			"price": cheapest["price"],
			"unit": cheapest["unit"],
			"expiration": cheapest["expiration"],
			"product_id": entry["product_id"]
		})

        top_3 = sorted(flattened, key=lambda x: x["price"])[:3]

	output_path, _ = get_output_paths(product_id)
	with open(output_path, "w", encoding="utf-8") as f:
		json.dump(top_3, f, ensure_ascii=False, indent=2)

	logger.info(f"\n💾 Zapisano {len(top_3)} najtańsze oferty do: {output_path}")

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("--product", required=True, help="ID produktu do scrapowania")
	args = parser.parse_args()
	logger.info("🚀 START main.py")
	main(args.product)
