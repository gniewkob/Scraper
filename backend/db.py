"""Database utilities and shared SQLAlchemy engine builder."""

from __future__ import annotations

import os
import re
from typing import Dict, Optional

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

# Connection pooling settings can be tweaked via environment variables
POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "5"))
MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "10"))

# cache of engines keyed by URL so modules can share a single instance
_ENGINE_CACHE: Dict[str, Engine] = {}


def get_engine(db_url: Optional[str] = None, db_path: Optional[str] = None) -> Engine:
    """Return a shared SQLAlchemy :class:`Engine`.

    The URL can be provided directly via ``db_url`` or built from ``db_path``.
    When neither is supplied the values from ``scraper.core.config.config`` are
    used. Engines are cached by URL so repeated calls share the same pool.
    """

    if not db_url:
        from scraper.core.config import config as cfg

        db_url = cfg.DB_URL
        if not db_url:
            db_path = db_path or cfg.DB_PATH
            db_url = f"sqlite:///{db_path}"

    engine = _ENGINE_CACHE.get(db_url)
    if engine is None:
        engine = create_engine(
            db_url,
            pool_pre_ping=True,
            pool_size=POOL_SIZE,
            max_overflow=MAX_OVERFLOW,
            future=True,
        )
        _ENGINE_CACHE.clear()
        _ENGINE_CACHE[db_url] = engine
    return engine


def get_offers(city: Optional[str] = None, product: Optional[str] = None,
               min_price: Optional[float] = None, max_price: Optional[float] = None):
    """Fetch offers from the database with optional filters."""

    engine = get_engine()
    query = (
        "SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url,"
        "       p.product_id, pr.name as product_name "
        "FROM pharmacy_prices p "
        "LEFT JOIN products pr ON p.product_id = pr.product_id "
        "WHERE 1=1"
    )
    params = {}
    if city:
        query += " AND lower(p.address) LIKE :city"
        params["city"] = f"%{city.lower()}%"
    if product:
        query += " AND lower(pr.name) LIKE :product"
        params["product"] = f"%{product.lower()}%"
    if min_price is not None:
        query += " AND p.price >= :min_price"
        params["min_price"] = min_price
    if max_price is not None:
        query += " AND p.price <= :max_price"
        params["max_price"] = max_price

    with engine.connect() as conn:
        rows = conn.execute(text(query), params).mappings().all()
    return [dict(row) for row in rows]


def get_products():
    """Return all products as dictionaries."""

    engine = get_engine()
    with engine.connect() as conn:
        rows = conn.execute(
            text("SELECT product_id, name FROM products")
        ).mappings().all()
    return [dict(row) for row in rows]


def get_cities():
    """Extract unique city names from pharmacy addresses."""

    engine = get_engine()
    with engine.connect() as conn:
        rows = conn.execute(
            text("SELECT DISTINCT address FROM pharmacy_prices")
        ).all()

    cities = set()
    city_regex = re.compile(r"\d{2}-\d{3}\s+([\wąćęłńóśźżA-Z]+)", re.IGNORECASE)
    for (address,) in rows:
        match = city_regex.search(address or "")
        if match:
            cities.add(match.group(1))
    return sorted(list(cities))

