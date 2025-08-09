import os
import pytest

from scraper.products.discovery import discover_products

MIN_ITEMS = int(os.getenv("MIN_ITEMS", 10))


@pytest.mark.skipif(not os.getenv("CI"), reason="Playwright tests run only in CI")
def test_discover_products() -> None:
    items = discover_products()
    assert isinstance(items, list)
    assert len(items) >= MIN_ITEMS
    for item in items:
        assert item["name"]
        assert item["slug"]
        assert item["base_url"] == f"https://www.gdziepolek.pl/produkty/{item['slug']}"
        assert item["regional_url"].startswith(f"{item['base_url'].rstrip('/')}/apteki/")
