# tests/test_dom_apteki_stacjonarne.py

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from core.browser import setup_browser
from selenium.webdriver.common.by import By
import time
import pytest

URL = "https://www.gdziepolek.pl/produkty/120136/cannabis-flos-thc-22-cbd-1-four-20-pharma-gmbh-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=279924#stacjonarne"

def test_dom_apteki_stacjonarne():
	driver = setup_browser(headless=False)
	try:
		driver.set_window_size(1920, 4000)
		driver.get(URL)
		time.sleep(3)  # daj Reactowi czas

		driver.execute_script("location.href = '#stacjonarne';")
		time.sleep(1)  # czekamy na ładowanie oferty

		elements = driver.find_elements(By.CSS_SELECTOR, "li.MuiListItem-root")
		print(f"🔍 Znaleziono {len(elements)} elementów ofert DOM (li.MuiListItem-root)")
		assert len(elements) > 0, "Nie znaleziono żadnych ofert w DOM."

		# Opcjonalnie loguj fragment HTML
		with open("logs/dom_preview.html", "w", encoding="utf-8") as f:
			f.write(elements[0].get_attribute("outerHTML"))

	finally:
		driver.quit()
