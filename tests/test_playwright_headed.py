import os
import pytest

from test_scrape_matrix import TARGET_URL, MIN_OFFERS, write_metrics


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

    write_metrics(os.getenv("RUNNER", "playwright_headed"), scraped)
    assert len(scraped) >= min_offers
    for item in scraped:
        assert item["product"]
        assert item["pharmacy"]
        assert item["price"]
        assert item["expires_at"]
