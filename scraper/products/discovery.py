import os
from typing import List, Dict, Optional

from playwright.sync_api import sync_playwright

from .urls import build_regional_url

CATEGORY_URL = "https://www.gdziepolek.pl/kategorie/susz-i-ekstrakt-marihuany-medycznej"
PRODUCT_URL_BASE = "https://www.gdziepolek.pl"


def discover_products(headless: Optional[bool] = None) -> List[Dict[str, str]]:
    """Return a list of products discovered on the category page."""
    if headless is None:
        headless_env = os.getenv("HEADLESS", "true")
        headless = headless_env.lower() == "true"
    with sync_playwright() as p:
        browser = p.firefox.launch(headless=headless)
        context = browser.new_context(ignore_https_errors=True)
        page = context.new_page()
        page.goto(CATEGORY_URL)

        load_more_selector = "button:has-text('Pokaż więcej'), button:has-text('Załaduj więcej')"
        for _ in range(100):
            button = page.locator(load_more_selector)
            if not button.count():
                break
            try:
                button.first.click()
                page.wait_for_load_state("networkidle")
            except Exception:
                break

        links = page.query_selector_all("a[href^='/produkty/']")
        products: Dict[str, Dict[str, str]] = {}
        for link in links:
            href = link.get_attribute("href") or ""
            slug = href.split("/produkty/")[-1].strip("/")
            if not slug or slug in products:
                continue
            name = (link.inner_text() or "").strip()
            base_url = f"{PRODUCT_URL_BASE}/produkty/{slug}"
            pvid = link.get_attribute("data-pvid") or link.get_attribute("pvid")
            products[slug] = {
                "name": name,
                "slug": slug,
                "base_url": base_url,
                "regional_url": build_regional_url(base_url, pvid=pvid),
            }

        browser.close()
        return list(products.values())
