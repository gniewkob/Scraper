from __future__ import annotations

import logging
import random
import re
import urllib.parse
from typing import Callable, List

from sqlalchemy import select, update
from sqlalchemy.orm import Session

from backend.models import Product
from scraper.products.urls import build_regional_url
from scraper.services.db import insert_prices, ENGINE
from scraper.services.price_validator import parse_price_unit
from scraper.core.constants import USER_AGENTS, DEFAULT_LOCALE, DEFAULT_VIEWPORT
from scraper.utils.retry import retry_on_timeout

logger = logging.getLogger(__name__)


def _default_fetch(url: str) -> str:
    """Fetch ``url`` using Playwright and return HTML content.

    The browser waits for ``networkidle`` to ensure that dynamic sections such
    as ``#stacjonarne`` are fully loaded before the HTML is captured.
    """
    from playwright.sync_api import sync_playwright
    
    with sync_playwright() as p:  # pragma: no cover - network/browser side effect
        browser = p.firefox.launch(headless=True)
        context = browser.new_context(
            user_agent=random.choice(USER_AGENTS),
            locale=DEFAULT_LOCALE,
            viewport=DEFAULT_VIEWPORT,
        )
        page = context.new_page()

        def load_page() -> None:
            page.goto(url)
            page.wait_for_response(lambda r: re.search(r"(offers|results)", r.url))
            page.wait_for_load_state("networkidle")

        try:
            retry_on_timeout(load_page)
            content = page.content()
        finally:
            context.close()
            browser.close()
    return content


def _parse_offers(html: str, product_id: str) -> List[dict]:
    """Return parsed offer entries from ``html`` for ``product_id``.

    The parser is intentionally minimal and expects a structure with ``li``
    elements carrying the ``offer`` class, containing pharmacy name, address and
    a ``span.priceExp`` with the price text.
    """
    offers: List[dict] = []
    pattern = re.compile(
        r"<li[^>]*class=\"offer\".*?>.*?"
        r"<a[^>]*class=\"apteka\"[^>]*>(?P<name>.*?)</a>.*?"
        r"<p[^>]*class=\"address\"[^>]*>(?P<addr>.*?)</p>.*?"
        r"<span[^>]*class=\"priceExp\"[^>]*>(?P<price>.*?)</span>"
        r"(?:.*?<p[^>]*class=\"updated\"[^>]*>(?P<updated>.*?)</p>)?"
        r".*?</li>",
        re.S,
    )
    for match in pattern.finditer(html):
        name = re.sub(r"\s+", " ", match.group("name")).strip()
        address = re.sub(r"\s+", " ", match.group("addr")).strip()
        price_text = re.sub(r"\s+", " ", match.group("price")).strip()
        updated = match.group("updated")
        if updated:
            updated = re.sub(r"\s+", " ", updated).strip()
        try:
            price, unit = parse_price_unit(price_text)
        except Exception:  # pragma: no cover - defensive
            continue
        entry = {
            "product_id": product_id,
            "name": name,
            "address": address,
            "map_url": f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote(address)}" if address else "",
            "updated": updated,
            "offers": [{"price": price, "unit": unit, "expiration": ""}],
        }
        offers.append(entry)
    return offers


def scrape_offers_once(fetch_page: Callable[[str], str] = _default_fetch) -> None:
    """Scrape offers for all active products once.

    ``fetch_page`` is a callable returning HTML for a given URL, allowing tests
    to provide a lightweight stub instead of launching a browser.
    """
    with Session(ENGINE) as session:
        products = session.execute(select(Product).where(Product.active == True)).scalars().all()

    seen: set[str] = set()
    for product in products:
        base_url = f"https://www.gdziepolek.pl/produkty/{product.slug}"
        url = build_regional_url(base_url)
        try:
            html = fetch_page(url)
        except Exception as e:  # pragma: no cover - network failure
            logger.error("Failed to fetch %s: %s", url, e)
            continue
        entries = _parse_offers(html, product.slug)
        if not entries:
            continue
        seen.add(product.slug)
        for entry in entries:
            insert_prices(entry)

    missing = [p.slug for p in products if p.slug not in seen]
    if missing:
        with Session(ENGINE) as session:
            session.execute(
                update(Product).where(Product.slug.in_(missing)).values(active=False)
            )
            session.commit()
