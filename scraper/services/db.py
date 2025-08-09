"""Utility helpers for persisting data via SQLAlchemy."""

from __future__ import annotations

import logging
from datetime import datetime
from typing import Dict, Iterable

import requests
from sqlalchemy import text

from backend.db import get_engine
from scraper.core.config.config import DB_PATH, DB_URL, API_URL
from scraper.services.price_validator import normalize_unit

logger = logging.getLogger("gdziepolek")

# shared engine used for all DB operations
ENGINE = get_engine(DB_URL, DB_PATH)


def ensure_product_name(product_id: str, product_name: str) -> None:
    """Insert product if it does not exist."""

    if API_URL:
        # API handles product creation
        return

    with ENGINE.begin() as conn:
        try:
            conn.execute(
                text("INSERT INTO products (slug, name) VALUES (:id, :name)"),
                {"id": product_id, "name": product_name},
            )
        except Exception:
            # duplicate or other error – ignore
            pass


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

