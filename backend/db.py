"""Database utilities and shared SQLAlchemy engine builder."""

from __future__ import annotations

import os
import re
from typing import Dict, Optional

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine


from .models import Product

# Connection pooling settings can be tweaked via environment variables
POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "5"))
MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "10"))

# cache of engines keyed by URL so modules can share a single instance
_ENGINE_CACHE: Dict[str, AsyncEngine] = {}


def get_engine(db_url: Optional[str] = None, db_path: Optional[str] = None) -> AsyncEngine:
    """Return a shared SQLAlchemy :class:`AsyncEngine`.

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

    if db_url.startswith("sqlite://") and not db_url.startswith("sqlite+aiosqlite://"):
        db_url = db_url.replace("sqlite://", "sqlite+aiosqlite://", 1)

    engine = _ENGINE_CACHE.get(db_url)
    if engine is None:
        # Dispose any previously cached engine to close old connections
        for cached_engine in _ENGINE_CACHE.values():
            cached_engine.dispose()
        _ENGINE_CACHE.clear()

        engine = create_async_engine(
            db_url,
            pool_pre_ping=True,
            pool_size=POOL_SIZE,
            max_overflow=MAX_OVERFLOW,
            future=True,
        )

        _ENGINE_CACHE[db_url] = engine  # cache fresh engine after cleanup
    return engine


async def get_offers(
    city: Optional[str] = None,
    product: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    limit: int = 100,
    offset: int = 0,
) -> list[dict]:
    """Fetch offers from the database with optional filters and pagination."""

    engine = get_engine()
    query = (
        "SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url,"
        "       pr.id as product_id, pr.name as product_name "
        "FROM pharmacy_prices p "
        "LEFT JOIN products pr ON p.product_id = pr.id "
        "WHERE pr.active = 1"
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

    query += " LIMIT :limit OFFSET :offset"
    params.update({"limit": limit, "offset": offset})

    async with engine.connect() as conn:
        rows = (await conn.execute(text(query), params)).mappings().all()
    return [dict(row) for row in rows]


async def get_products() -> list[dict[str, str]]:
    """Return all active products as dictionaries."""

    engine = get_engine()
    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    async with session_factory() as session:
        rows = (
            await session.execute(
                select(Product.id, Product.name).where(Product.active == True)  # noqa: E712
            )
        ).all()
    return [{"id": pid, "name": name} for pid, name in rows]


async def get_cities() -> list[str]:
    """Extract unique city names from pharmacy addresses."""

    engine = get_engine()
    async with engine.connect() as conn:
        rows = (await conn.execute(text("SELECT DISTINCT address FROM pharmacy_prices"))).all()

    cities = set()
    city_regex = re.compile(r"\d{2}-\d{3}\s+([\wąćęłńóśźżA-Z]+)", re.IGNORECASE)
    for (address,) in rows:
        match = city_regex.search(address or "")
        if match:
            cities.add(match.group(1))
    return sorted(list(cities))

