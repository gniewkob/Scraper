"""Command-line entry point for scraping workflow."""

import logging
import time
from typing import List

from sqlalchemy import select, update
from sqlalchemy.orm import Session

from scraper.core.bootstrap import init_logging
from scraper.products.discovery import discover_products
from scraper.products.urls import build_regional_url
from scraper.services import sync_products
from scraper.services.db import ENGINE, insert_prices
from scraper.services.offers import _default_fetch, _parse_offers
from backend.models import Product


logger = logging.getLogger("gdziepolek")


def main() -> None:
    """Entry point for discovery, syncing and scraping workflow."""
    init_logging()
    start_time = time.time()

    # Discover products
    discover_start = time.time()
    discovered = discover_products()
    discover_time = time.time() - discover_start
    logger.info("🔍 Discovered %d products in %.2fs", len(discovered), discover_time)

    # Count products before sync
    with Session(ENGINE) as session:
        before_active = session.execute(select(Product).where(Product.active == True)).scalars().all()
        before_inactive = session.execute(select(Product).where(Product.active == False)).scalars().all()

    # Sync products
    sync_start = time.time()
    sync_products(discovered)
    sync_time = time.time() - sync_start

    with Session(ENGINE) as session:
        active_products = session.execute(select(Product).where(Product.active == True)).scalars().all()
        after_active = len(active_products)
        after_inactive = session.execute(select(Product).where(Product.active == False)).scalars().all()
        after_inactive = len(after_inactive)

    activated = max(0, after_active - len(before_active))
    deactivated = max(0, after_inactive - len(before_inactive))
    logger.info(
        "🔄 Sync completed in %.2fs: activated=%d, deactivated=%d",
        sync_time,
        activated,
        deactivated,
    )

    # Scrape offers for active products
    scrape_start = time.time()
    offers_count = 0
    missing_products: List[str] = []
    seen: set[str] = set()
    for product in active_products:
        base_url = f"https://www.gdziepolek.pl/produkty/{product.slug}"
        url = build_regional_url(base_url)
        try:
            html = _default_fetch(url)
        except Exception as exc:  # pragma: no cover - network failure
            logger.error("Failed to fetch %s: %s", url, exc)
            continue
        entries = _parse_offers(html, product.slug)
        if not entries:
            missing_products.append(product.slug)
            continue
        seen.add(product.slug)
        for entry in entries:
            offers_count += len(entry.get("offers", []))
            insert_prices(entry)

    scrape_time = time.time() - scrape_start
    logger.info(
        "📦 Scraped offers in %.2fs: offers=%d, products_without_offers=%d",
        scrape_time,
        offers_count,
        len(missing_products),
    )

    # Deactivate products without offers
    if missing_products:
        with Session(ENGINE) as session:
            session.execute(
                update(Product).where(Product.slug.in_(missing_products)).values(active=False)
            )
            session.commit()
        logger.info("🛑 Deactivated %d products without offers", len(missing_products))

    # Optional price stats update
    try:  # pragma: no cover - optional dependency
        from scraper.services.db import update_price_stats  # type: ignore
    except Exception:  # pragma: no cover - optional dependency
        update_price_stats = None  # type: ignore
    if update_price_stats:
        stats_start = time.time()
        stats = update_price_stats()
        stats_time = time.time() - stats_start
        logger.info("📊 Price stats updated in %.2fs: %s", stats_time, stats)

    total_time = time.time() - start_time
    logger.info("✅ Finished in %.2fs", total_time)


if __name__ == "__main__":
    main()
