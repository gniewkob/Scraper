import json
import os
from pathlib import Path

import pytest

TARGET_URL = os.getenv("TARGET_URL")
MIN_OFFERS = int(os.getenv("MIN_OFFERS", 5))

FIELDS = ["product", "pharmacy", "price", "expires_at"]


def write_metrics(runner: str, records: list[dict]) -> None:
    offers_total = len(records)
    products_found = sum(1 for r in records if all(r.get(f) for f in FIELDS))
    non_null = sum(bool(r.get(f)) for r in records for f in FIELDS)
    total_possible = offers_total * len(FIELDS)
    fields_non_null_pct = (non_null / total_possible * 100) if total_possible else 0.0
    Path(f"metrics_{runner}.json").write_text(
        json.dumps(
            {
                "offers_total": offers_total,
                "products_found": products_found,
                "fields_non_null_pct": fields_non_null_pct,
            }
        ),
        encoding="utf-8",
    )


@pytest.mark.parametrize("target_url,min_offers", [(TARGET_URL, MIN_OFFERS)])
def test_selenium_headed(target_url: str, min_offers: int) -> None:
    webdriver = pytest.importorskip("selenium.webdriver").Firefox
    selenium_by = pytest.importorskip("selenium.webdriver.common.by").By
    if not target_url:
        pytest.skip("TARGET_URL env variable not set")

    options_module = pytest.importorskip("selenium.webdriver").FirefoxOptions
    options = options_module()
    # TODO: run with a visible browser when environment supports GUI
    # options.headless = False
    driver = webdriver(options=options)
    try:
        driver.get(target_url)
        driver.save_screenshot("selenium.png")

        offer_selector = ".offer-card,.result-row,.offer-item"  # TODO adjust selector for real DOM
        product_selector = ".product-name,.name"  # TODO adjust selector for real DOM
        pharmacy_selector = ".pharmacy-name,.pharmacy"  # TODO adjust selector for real DOM
        price_selector = ".price"  # TODO adjust selector for real DOM
        expires_selector = ".expires,.exp-date"  # TODO adjust selector for real DOM

        offers = driver.find_elements(selenium_by.CSS_SELECTOR, offer_selector)
        scraped = []
        for offer in offers[:min_offers]:
            try:
                scraped.append(
                    {
                        "product": offer.find_element(selenium_by.CSS_SELECTOR, product_selector).text.strip(),
                        "pharmacy": offer.find_element(selenium_by.CSS_SELECTOR, pharmacy_selector).text.strip(),
                        "price": offer.find_element(selenium_by.CSS_SELECTOR, price_selector).text.strip(),
                        "expires_at": offer.find_element(selenium_by.CSS_SELECTOR, expires_selector).text.strip(),
                    }
                )
            except Exception:
                continue
        write_metrics(os.getenv("RUNNER", "selenium_headed"), scraped)
        assert len(scraped) >= min_offers
        for item in scraped:
            assert item["product"]
            assert item["pharmacy"]
            assert item["price"]
            assert item["expires_at"]
    finally:
        driver.quit()
