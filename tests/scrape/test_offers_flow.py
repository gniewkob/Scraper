from sqlalchemy import create_engine, text

from scraper.services import db as db_services
from scraper.services import offers as offers_mod



def test_offers_flow_marks_inactive_and_inserts_prices(migrated_db):
    engine = create_engine(f"sqlite:///{migrated_db}", future=True)
    db_services.ENGINE = engine
    offers_mod.ENGINE = engine

    with engine.begin() as conn:
        conn.execute(
            text("INSERT INTO products (slug, name, active) VALUES ('1', 'Prod1', 1)")
        )
        conn.execute(
            text("INSERT INTO products (slug, name, active) VALUES ('2', 'Prod2', 1)")
        )

    def fake_fetch(url: str) -> str:
        if "1" in url:
            return (
                "<ul>"
                "<li class=\"offer\">"
                "<a class=\"apteka\" href=\"/a1\">Apteka A</a>"
                "<p class=\"address\">ul. Zielona 1</p>"
                "<div class=\"offers\"><p><span class=\"priceExp\">12,34 zł / g</span></p></div>"
                "<p class=\"updated\">dziś</p>"
                "</li>"
                "</ul>"
            )
        return "<ul></ul>"

    offers_mod.scrape_offers_once(fetch_page=fake_fetch)

    with engine.connect() as conn:
        prices = conn.execute(
            text("SELECT product_id, pharmacy_name, price FROM pharmacy_prices")
        ).mappings().all()
        p1_active = conn.execute(
            text("SELECT active FROM products WHERE slug='1'")
        ).scalar_one()
        p2_active = conn.execute(
            text("SELECT active FROM products WHERE slug='2'")
        ).scalar_one()

    assert len(prices) == 1
    assert prices[0]["product_id"] == 1
    assert prices[0]["pharmacy_name"] == "Apteka A"
    assert prices[0]["price"] == 12.34
    assert p1_active == 1
    assert p2_active == 0
