"""Utility helpers for persisting data via SQLAlchemy."""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Dict, Iterable

import requests
from sqlalchemy import select, text, update
from sqlalchemy.orm import Session

from backend.db import get_engine
from backend.models import Product
from scraper.core.config.config import DB_PATH, DB_URL, API_URL
from scraper.services.price_validator import normalize_unit

logger = logging.getLogger(__name__)

# shared engine used for all DB operations
ENGINE = get_engine(DB_URL, DB_PATH)

__all__ = [
    "ensure_product_name",
    "insert_prices",
    "should_insert_price",
    "get_all_prices",
    "get_prices_for_product",
    "get_trend_for_product",
    "get_top3_prices",
    "sync_products",
    "update_price_stats",
]


def sync_products(discovered: Iterable[dict]) -> None:
    """Synchronise product table with *discovered* entries.

    Each ``dict`` in ``discovered`` must contain ``slug`` and ``name`` keys.
    Existing rows are updated while new ones are inserted with current
    timestamps. Products not present in ``discovered`` are marked as inactive
    but their history is preserved.
    """

    if API_URL:
        # Remote API is the source of truth – nothing to do.
        return

    now = datetime.now(timezone.utc)
    seen_slugs = set()

    with Session(ENGINE) as session:
        for item in discovered:
            slug = item.get("slug")
            name = item.get("name")
            if not slug or not name:
                continue
            seen_slugs.add(slug)

            product = session.execute(
                select(Product).where(Product.slug == slug)
            ).scalar_one_or_none()
            if product:
                product.name = name
                product.last_seen = now
                product.active = True
            else:
                session.add(
                    Product(
                        slug=slug,
                        name=name,
                        active=True,
                        first_seen=now,
                        last_seen=now,
                    )
                )

        if seen_slugs:
            session.execute(
                update(Product)
                .where(Product.slug.notin_(list(seen_slugs)))
                .values(active=False)
            )
        else:
            session.execute(update(Product).values(active=False))
        session.commit()


def ensure_product_name(product_id: str, product_name: str) -> None:
    """Insert product if it does not exist."""

    if API_URL:
        # API handles product creation
        return

    with Session(ENGINE) as session:
        product = session.execute(
            select(Product).where(Product.slug == product_id)
        ).scalar_one_or_none()
        if product is None:
            session.add(Product(slug=product_id, name=product_name))
            session.commit()


def insert_prices(entry: Dict) -> None:
    """Persist scraped offers to the configured backend or API."""

    offers = entry.get("offers", [])
    if not offers:
        logger.debug(f"⏩ Pominięto {entry['name']} – brak ofert.")
        return

    now = datetime.now().isoformat(timespec="seconds")

    if API_URL:
        payload = entry.copy()
        payload["fetched_at"] = now
        try:
            requests.post(API_URL, json=payload, timeout=10)
        except Exception as e:
            logger.error(f"❌ Błąd wysyłki do API ({entry['name']}): {e}")
        return

    if not should_insert_price(entry):
        logger.debug(f"⏩ Pominięto {entry['name']} – brak zmian.")
        return

    with ENGINE.begin() as conn:
        ensure_product_name(entry["product_id"], entry.get("product_name", entry["name"]))
        for offer in offers:
            price = offer.get("price")
            unit = normalize_unit(offer.get("unit"))
            expiration = offer.get("expiration")
            try:
                conn.execute(
                    text(
                        """
                        INSERT INTO pharmacy_prices (
                            product_id, pharmacy_name, address, price, unit, expiration,
                            availability, updated, fetched_at, map_url
                        ) VALUES (
                            :product_id, :pharmacy_name, :address, :price, :unit, :expiration,
                            :availability, :updated, :fetched_at, :map_url
                        )
                        """
                    ),
                    {
                        "product_id": entry["product_id"],
                        "pharmacy_name": entry["name"],
                        "address": entry.get("address", ""),
                        "price": float(price),
                        "unit": unit,
                        "expiration": expiration,
                        "availability": entry.get("availability"),
                        "updated": entry.get("updated"),
                        "fetched_at": now,
                        "map_url": entry.get("map_url", ""),
                    },
                )
            except Exception as e:
                logger.debug(
                    f"ℹ️ Duplikat lub błąd przy zapisie do bazy ({entry['name']}): {e}"
                )


def should_insert_price(entry: Dict) -> bool:
    """Check if offers for product should be inserted (avoid duplicates)."""

    offers = entry.get("offers", [])
    if not offers or API_URL:
        return bool(offers)

    with ENGINE.connect() as conn:
        for offer in offers:
            price = offer.get("price")
            expiration = offer.get("expiration", "")
            unit = normalize_unit(offer.get("unit"))
            result = conn.execute(
                text(
                    """
                    SELECT 1 FROM pharmacy_prices
                    WHERE product_id = :pid AND pharmacy_name = :ph AND address = :addr
                      AND price = :price AND expiration = :exp AND unit = :unit
                    LIMIT 1
                    """
                ),
                {
                    "pid": entry["product_id"],
                    "ph": entry["name"],
                    "addr": entry.get("address", ""),
                    "price": price,
                    "exp": expiration,
                    "unit": unit,
                },
            ).first()
            if result is None:
                return True
    return False


def get_all_prices() -> Iterable[Dict]:
    if API_URL:
        resp = requests.get(API_URL)
        resp.raise_for_status()
        return resp.json()

    with ENGINE.connect() as conn:
        result = conn.execute(
            text("SELECT * FROM pharmacy_prices ORDER BY fetched_at DESC")
        )
        return [dict(row._mapping) for row in result]


def get_prices_for_product(product_id: str) -> Iterable[Dict]:
    if API_URL:
        resp = requests.get(f"{API_URL}/{product_id}")
        resp.raise_for_status()
        return resp.json()

    with ENGINE.connect() as conn:
        result = conn.execute(
            text(
                """
                SELECT * FROM pharmacy_prices
                WHERE product_id = :pid
                ORDER BY price ASC
                """
            ),
            {"pid": product_id},
        )
        return [dict(row._mapping) for row in result]


def get_trend_for_product(product_id: str) -> Iterable[Dict]:
    with ENGINE.connect() as conn:
        result = conn.execute(
            text(
                """
                SELECT fetched_at, price, expiration
                FROM pharmacy_prices
                WHERE product_id = :pid
                ORDER BY fetched_at ASC, price ASC
                """
            ),
            {"pid": product_id},
        )
        return [dict(row._mapping) for row in result]


def get_top3_prices(product_id: str) -> Iterable[Dict]:
    with ENGINE.connect() as conn:
        result = conn.execute(
            text(
                """
                SELECT *
                FROM pharmacy_prices
                WHERE product_id = :pid
                ORDER BY price ASC
                LIMIT 3
                """
            ),
            {"pid": product_id},
        )
        return [dict(row._mapping) for row in result]


def update_price_stats() -> Dict[str, Dict[str, float]]:
    """Aggregate price statistics and persist them."""

    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    stats: Dict[str, Dict[str, float]] = {}

    with ENGINE.begin() as conn:
        conn.execute(
            text(
                """
                CREATE TABLE IF NOT EXISTS price_stats (
                    product_id TEXT PRIMARY KEY,
                    min_price REAL,
                    max_price REAL,
                    avg_price REAL,
                    updated_at TEXT
                )
                """
            )
        )

        result = conn.execute(
            text(
                """
                SELECT product_id,
                       MIN(price) AS min_price,
                       MAX(price) AS max_price,
                       AVG(price) AS avg_price
                FROM pharmacy_prices
                GROUP BY product_id
                """
            )
        )

        for row in result.mappings():
            pid = row["product_id"]
            stats[pid] = {
                "min_price": row["min_price"],
                "max_price": row["max_price"],
                "avg_price": row["avg_price"],
            }
            conn.execute(
                text(
                    """
                    INSERT INTO price_stats (
                        product_id, min_price, max_price, avg_price, updated_at
                    ) VALUES (
                        :product_id, :min_price, :max_price, :avg_price, :updated_at
                    )
                    ON CONFLICT(product_id) DO UPDATE SET
                        min_price=excluded.min_price,
                        max_price=excluded.max_price,
                        avg_price=excluded.avg_price,
                        updated_at=excluded.updated_at
                    """
                ),
                {
                    "product_id": pid,
                    "min_price": row["min_price"],
                    "max_price": row["max_price"],
                    "avg_price": row["avg_price"],
                    "updated_at": now,
                },
            )

    return stats

