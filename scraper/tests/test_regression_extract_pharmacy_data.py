# tests/test_regression_extract_pharmacy_data.py

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from core.browser import setup_browser
from core.data_extractor import extract_pharmacy_data
from selenium.webdriver.common.by import By
import time
import pytest
from pathlib import Path

URL = "https://www.gdziepolek.pl/produkty/120136/cannabis-flos-thc-22-cbd-1-four-20-pharma-gmbh-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=279924#stacjonarne"

@pytest.mark.parametrize("product_id", ["120136"])
def test_extract_all_items(product_id):
	driver = setup_browser(headless=False)
	try:
		Path("logs").mkdir(exist_ok=True)
		driver.set_window_size(1920, 4000)
		driver.get(URL)
		time.sleep(3)
		driver.execute_script("location.href = '#stacjonarne';")
		time.sleep(1)

		elements = driver.find_elements(By.CSS_SELECTOR, "li.MuiListItem-root")
		print(f"🔍 Znaleziono {len(elements)} ofert do przetworzenia.")

		passed = 0
		failed = 0

		for i, el in enumerate(elements):
			data = extract_pharmacy_data(el, product_id=product_id)
			if data:
				passed += 1
				print(f"✅ [{i+1}] {data['name']} – {len(data['offers'])} cen")
			else:
				failed += 1
				print(f"❌ [{i+1}] Błąd ekstrakcji – zapisuję HTML")
				with open(f"logs/failed_offer_{i+1}.html", "w", encoding="utf-8") as f:
					f.write(el.get_attribute("outerHTML"))

		print(f"\n📊 Wynik: {passed} poprawnych / {passed+failed} ogółem ({failed} błędów)")
		assert passed > 0, "Żadna oferta nie została poprawnie sparsowana."

	finally:
		driver.quit()
