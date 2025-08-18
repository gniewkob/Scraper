import importlib
import sys
import types

import pytest
from sqlalchemy import create_engine, text

from scraper.services import db as db_services
from scraper.services import offers as offers_mod

try:
    import scraper.cli.main as cli_main
except RuntimeError:
    cli_main = None


def setup_playwright_stub() -> None:
    """Provide a minimal stub for the optional playwright dependency."""
    playwright_module = types.ModuleType("playwright")
    sync_api_module = types.ModuleType("playwright.sync_api")
    sync_api_module.sync_playwright = lambda: None
    playwright_module.sync_api = sync_api_module
    sys.modules.setdefault("playwright", playwright_module)
    sys.modules.setdefault("playwright.sync_api", sync_api_module)


@pytest.fixture(autouse=True, scope="module")
def playwright_stub() -> None:
    setup_playwright_stub()

    global cli_main
    if cli_main is None:
        cli_main = importlib.import_module("scraper.cli.main")


def test_full_pipeline(monkeypatch, migrated_db):
    engine = create_engine(f"sqlite:///{migrated_db}", future=True)
    db_services.ENGINE = engine
    offers_mod.ENGINE = engine
    cli_main.ENGINE = engine
    db_services.API_URL = None

    monkeypatch.setattr(cli_main, "init_logging", lambda: None)

    monkeypatch.setattr(
        cli_main,
        "discover_products",
        lambda: [
            {"slug": "p1", "name": "Produkt 1"},
            {"slug": "p2", "name": "Produkt 2"},
        ],
    )

    def fake_fetch(url: str) -> str:
        if "p1" in url:
            return (
                "<ul>"
                "<li class=\"offer\">"
                "<a class=\"apteka\" href=\"/a1\">Apteka A</a>"
                "<p class=\"address\">ul. Zielona 1</p>"
                "<div class=\"offers\"><p><span class=\"priceExp\">12,34 zł / g</span></p></div>"
                "<p class=\"updated\">dzisiaj</p>"
                "</li>"
                "</ul>"
            )
        return "<ul></ul>"

    monkeypatch.setattr(cli_main, "_default_fetch", fake_fetch)

    cli_main.main()

    with engine.connect() as conn:
        products = conn.execute(
            text("SELECT slug, active FROM products")
        ).mappings().all()
        active_map = {row["slug"]: row["active"] for row in products}
        prices = conn.execute(
            text("SELECT product_id, pharmacy_name, price FROM pharmacy_prices")
        ).mappings().all()

    assert active_map["p1"] == 1
    assert active_map["p2"] == 0
    assert len(prices) == 1
    assert prices[0]["product_id"] == "p1"
    assert prices[0]["pharmacy_name"] == "Apteka A"
    assert prices[0]["price"] == 12.34

    trend = list(db_services.get_trend_for_product("p1"))
    assert trend
    fetched = [row["fetched_at"] for row in trend]
    assert fetched == sorted(fetched)
