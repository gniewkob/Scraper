# tests/test_selector_discovery.py

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pytest
from core.config.selectors import PHARMACY_ITEMS_SELECTORS
from core.browser import setup_browser
from selenium.webdriver.common.by import By
from time import sleep


URL = "https://www.gdziepolek.pl/produkty/119768/cannabis-flos-thc-20-cbd-1-aurora-pink-kush-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=279313"

@pytest.mark.parametrize("selector", PHARMACY_ITEMS_SELECTORS)
def test_selector_works(selector):
	driver = setup_browser(headless=False)
	try:
		print(f"\n🔍 Testuję selektor: {selector}")
		driver.get(URL)
		sleep(2)  # Czekaj na załadowanie strony

		elements = driver.find_elements(By.CSS_SELECTOR, selector)
		if elements:
			print(f"✅ Selektor działa ({len(elements)} elementów): {selector}")
			# Zapisz pierwszy element do analizy
			Path("logs").mkdir(exist_ok=True)
			with open(f"logs/preview_{selector.replace('/', '_').replace('.', '').replace('[', '').replace(']', '')}.html", "w", encoding="utf-8") as f:
				f.write(elements[0].get_attribute("outerHTML"))
		else:
			print(f"❌ Brak dopasowań: {selector}")

		assert True  # zawsze przechodzi — to test eksploracyjny

	finally:
		driver.quit()
