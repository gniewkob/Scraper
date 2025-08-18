import importlib
import os
import sys
import types

import pytest

try:
    from scraper.products.discovery import discover_products
except RuntimeError:  # Playwright missing
    discover_products = None

MIN_ITEMS = int(os.getenv("MIN_ITEMS", 10))


@pytest.mark.skipif(not os.getenv("CI"), reason="Playwright tests run only in CI")
def test_discover_products() -> None:
    if discover_products is None:
        pytest.skip("Playwright is required for product discovery")

    items = discover_products()
    assert isinstance(items, list)
    assert len(items) >= MIN_ITEMS
    for item in items:
        assert item["name"]
        assert item["slug"]
        assert item["base_url"] == f"https://www.gdziepolek.pl/produkty/{item['slug']}"
        assert item["regional_url"].startswith(f"{item['base_url'].rstrip('/')}/apteki/")


@pytest.mark.parametrize("env_value,expected", [("true", True), ("false", False)])
def test_launch_uses_headless_env(monkeypatch, env_value, expected) -> None:
    captured: dict = {}

    def fake_sync_playwright():
        class DummyPage:
            def goto(self, url):
                pass

            def locator(self, selector):
                class DummyLocator:
                    def count(self):
                        return 0

                    def first(self):
                        return self

                    def click(self):
                        pass

                return DummyLocator()

            def wait_for_load_state(self, state):
                pass

            def query_selector_all(self, selector):
                return []

        class DummyContext:
            def new_page(self):
                return DummyPage()

        class DummyBrowser:
            def new_context(self, ignore_https_errors=True):
                return DummyContext()

            def close(self):
                pass

        class DummyFireFox:
            def launch(self, headless):
                captured["headless"] = headless
                return DummyBrowser()

        class DummyPlaywright:
            firefox = DummyFireFox()

        class DummyManager:
            def __enter__(self):
                return DummyPlaywright()

            def __exit__(self, exc_type, exc, tb):
                pass

        return DummyManager()

    # Prepare fake playwright module before importing discovery
    fake_playwright = types.SimpleNamespace()
    fake_sync_api = types.SimpleNamespace()
    fake_sync_api.sync_playwright = lambda: None
    fake_playwright.sync_api = fake_sync_api
    monkeypatch.setitem(sys.modules, "playwright", fake_playwright)
    monkeypatch.setitem(sys.modules, "playwright.sync_api", fake_sync_api)

    discovery = importlib.import_module("scraper.products.discovery")
    monkeypatch.setenv("HEADLESS", env_value)
    monkeypatch.setattr(discovery, "sync_playwright", fake_sync_playwright)

    items = discovery.discover_products()
    assert items == []
    assert captured["headless"] is expected
