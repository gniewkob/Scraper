# tests/test_integration_static_context.py

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from core.browser import setup_browser
from selenium.webdriver.common.by import By
import time
import pytest

URL = "https://www.gdziepolek.pl/produkty/120136/cannabis-flos-thc-22-cbd-1-four-20-pharma-gmbh-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=279924#stacjonarne"

def test_static_context_extraction():
	driver = setup_browser(headless=False)
	try:
		driver.get(URL)
		time.sleep(3)  # daj czas na załadowanie Reacta

		# Wyciągamy dane z osadzonego kontekstu
		data = driver.execute_script("return window.staticContext?.model?.pharmacies?.data || []")
		print(f"🔍 Znaleziono {len(data)} aptek z window.staticContext.model.pharmacies.data")

		assert len(data) > 0, "Nie znaleziono żadnych aptek."

		for apteka in data:
			name = apteka.get("Name")
			offers = apteka.get("Offers", {})
			print(f"🏥 Apteka: {name}")
			total_prices = 0
			for v in offers.values():
				for o in v.get("exp", []):
					total_prices += 1
					print(f"💰 Cena: {o['price']} zł | Jednostka: {o['i']} | Data ważności: {o['date']}")
			assert total_prices > 0, f"Apteka {name} nie zawiera żadnych cen."

	finally:
		driver.quit()
