import json
import os
from pathlib import Path

import pytest

TARGET_URL = os.getenv("TARGET_URL")
MIN_OFFERS = int(os.getenv("MIN_OFFERS", 5))


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
        assert len(scraped) >= min_offers
        for item in scraped:
            assert item["product"]
            assert item["pharmacy"]
            assert item["price"]
            assert item["expires_at"]
    finally:
        driver.quit()


@pytest.mark.skipif(not os.getenv("CI"), reason="Playwright tests run only in CI")
@pytest.mark.parametrize("target_url,min_offers", [(TARGET_URL, MIN_OFFERS)])
def test_playwright_headed(target_url: str, min_offers: int) -> None:
    p_sync = pytest.importorskip("playwright.sync_api")
    if not target_url:
        pytest.skip("TARGET_URL env variable not set")
    with p_sync.sync_playwright() as p:
        # TODO: run with a visible browser when environment supports GUI
        browser = p.firefox.launch(headless=False)
        page = browser.new_page()
        page.goto(target_url)
        page.screenshot(path="playwright.png")

        offer_selector = ".offer-card,.result-row,.offer-item"  # TODO adjust selector for real DOM
        product_selector = ".product-name,.name"  # TODO adjust selector for real DOM
        pharmacy_selector = ".pharmacy-name,.pharmacy"  # TODO adjust selector for real DOM
        price_selector = ".price"  # TODO adjust selector for real DOM
        expires_selector = ".expires,.exp-date"  # TODO adjust selector for real DOM

        offers = page.query_selector_all(offer_selector)
        scraped = []
        for offer in offers[:min_offers]:
            product = offer.query_selector(product_selector)
            pharmacy = offer.query_selector(pharmacy_selector)
            price = offer.query_selector(price_selector)
            expires = offer.query_selector(expires_selector)
            if all([product, pharmacy, price, expires]):
                scraped.append(
                    {
                        "product": product.inner_text().strip(),
                        "pharmacy": pharmacy.inner_text().strip(),
                        "price": price.inner_text().strip(),
                        "expires_at": expires.inner_text().strip(),
                    }
                )
        browser.close()

    assert len(scraped) >= min_offers
    for item in scraped:
        assert item["product"]
        assert item["pharmacy"]
        assert item["price"]
        assert item["expires_at"]


@pytest.mark.skipif(not os.getenv("CI"), reason="Playwright tests run only in CI")
@pytest.mark.parametrize("target_url,min_offers", [(TARGET_URL, MIN_OFFERS)])
def test_xhr_capture_then_fetch(target_url: str, min_offers: int) -> None:
    p_sync = pytest.importorskip("playwright.sync_api")
    httpx = pytest.importorskip("httpx")
    if not target_url:
        pytest.skip("TARGET_URL env variable not set")
    with p_sync.sync_playwright() as p:
        browser = p.firefox.launch(headless=True)
        context = browser.new_context(record_har_path="network.har")
        page = context.new_page()
        page.goto(target_url)
        page.wait_for_load_state("networkidle")
        context.close()
        browser.close()

    har_path = Path("network.har")
    assert har_path.exists(), "HAR file not created"
    har = json.loads(har_path.read_text(encoding="utf-8"))
    entries = [e for e in har.get("log", {}).get("entries", []) if e.get("_resourceType") == "xhr"]
    if not entries:
        pytest.skip("No XHR requests captured")
    url = entries[0]["request"]["url"]
    response = httpx.get(url, timeout=10.0)
    data = response.json()
    Path("xhr.json").write_text(json.dumps(data), encoding="utf-8")

    offers = data if isinstance(data, list) else data.get("offers") or data.get("items") or []
    assert isinstance(offers, list)
    assert len(offers) >= min_offers
    first = offers[0]
    assert first.get("product")
    assert first.get("pharmacy")
    assert first.get("price")
    assert first.get("expires_at")
