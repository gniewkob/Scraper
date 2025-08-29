"""Database utilities and shared SQLAlchemy engine builder."""

from __future__ import annotations

from pathlib import Path
import logging
from typing import Dict, Optional, AsyncIterator

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import (
    AsyncConnection,
    AsyncEngine,
    async_sessionmaker,
    create_async_engine,
)

from .config import settings


from .models import Product
from . import cities

# cache of engines keyed by URL so modules can share a single instance
_ENGINE_CACHE: Dict[str, AsyncEngine] = {}
logger = logging.getLogger(__name__)


def _ensure_db_dir(db_url: Optional[str], db_path: Optional[str]) -> None:
    """Create the parent directory for the SQLite database if needed."""
    path = db_path
    if path is None and db_url and db_url.startswith("sqlite"):
        path = db_url.split("sqlite:///")[-1]
    if path:
        Path(path).parent.mkdir(parents=True, exist_ok=True)


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

    _ensure_db_dir(db_url, db_path)

    engine = _ENGINE_CACHE.get(db_url)
    if engine is None:
        try:
            engine = create_async_engine(
                db_url,
                pool_pre_ping=True,
                pool_size=settings.db_pool_size,
                max_overflow=settings.db_max_overflow,
                future=True,
            )
        except ModuleNotFoundError as e:
            # Graceful fallback for missing optional DB drivers (e.g., asyncpg during local dev)
            if "asyncpg" in str(e):
                from scraper.core.config import config as cfg

                fb_path = db_path or cfg.DB_PATH
                fb_url = f"sqlite+aiosqlite:///{fb_path}"
                logger.warning(
                    "Postgres driver 'asyncpg' missing. Falling back to SQLite at %s",
                    fb_path,
                )
                engine = create_async_engine(
                    fb_url,
                    pool_pre_ping=True,
                    future=True,
                )
                # Note: cache under the fallback URL to avoid mixing pools
                _ENGINE_CACHE[fb_url] = engine
                return engine
            raise

        _ENGINE_CACHE[db_url] = engine  # cache fresh engine
    return engine


async def dispose_engines(db_url: Optional[str] = None) -> None:
    """Dispose cached engines.

    If ``db_url`` is provided only that engine is disposed otherwise all
    engines in the cache are cleaned up. This should be called on application
    shutdown to close open connections gracefully.
    """

    if db_url:
        engine = _ENGINE_CACHE.pop(db_url, None)
        if engine is not None:
            await engine.dispose()
    else:
        for engine in list(_ENGINE_CACHE.values()):
            await engine.dispose()
        _ENGINE_CACHE.clear()


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
        "WHERE pr.active = true"
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

    async with engine.begin() as conn:
        rows = (await conn.execute(text(query), params)).mappings().all()
    return [dict(row) for row in rows]


async def get_products() -> list[dict[str, str]]:
    """Return all active products as dictionaries."""

    engine = get_engine()
    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    async with session_factory() as session:
        rows = (
            await session.execute(
                select(Product.id, Product.name).where(Product.active)
            )
        ).all()
    return [{"id": pid, "name": name} for pid, name in rows]


async def get_cities() -> list[str]:
    """Return list of available cities from shared configuration."""

    return cities.get_city_list()


async def get_connection() -> AsyncIterator[AsyncConnection]:
    """FastAPI dependency that yields a transactional connection."""
    engine = get_engine()
    try:
        async with engine.begin() as conn:
            yield conn
            return
    except Exception as e:
        logger.warning("Primary DB connection failed (%s). Falling back to SQLite.", type(e).__name__)
        # Build fallback SQLite URL using configured DB_PATH
        try:
            from scraper.core.config import config as cfg
            fb_url = f"sqlite+aiosqlite:///{cfg.DB_PATH}"
            fb_engine = _ENGINE_CACHE.get(fb_url)
            if fb_engine is None:
                fb_engine = create_async_engine(fb_url, pool_pre_ping=True, future=True)
                _ENGINE_CACHE[fb_url] = fb_engine
            async with fb_engine.begin() as conn:
                yield conn
                return
        except Exception as e2:
            logger.error("SQLite fallback connection failed: %s", e2)
            raise
