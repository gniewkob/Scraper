"""Runtime capability detection for optional features depending on DB schema.

This module inspects the database schema at startup to determine which
features the API can support (e.g., filtering by strain type).
"""

from __future__ import annotations

from typing import Literal, TypedDict
import logging

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncConnection

logger = logging.getLogger(__name__)


class Capabilities(TypedDict, total=False):
    strain_filter: bool
    strain_source: Literal["column", "mapping_table"] | None


_CAPS: Capabilities = {
    "strain_filter": False,
    "strain_source": None,
}


async def refresh_capabilities(conn: AsyncConnection) -> Capabilities:
    """Detect capabilities based on the current DB schema.

    - strain_filter: True if either products.strain_type column exists or
      a mapping table product_strain(product_id, strain_type) exists.
    - strain_source: "column" if using products.strain_type, otherwise
      "mapping_table" if product_strain exists.
    """

    global _CAPS
    caps: Capabilities = {"strain_filter": False, "strain_source": None}

    # Try detecting a direct column first (preferred)
    try:
        # LIMIT 0 selects no rows but validates column existence
        await conn.execute(text("SELECT p.strain_type FROM products p LIMIT 0"))
        caps["strain_filter"] = True
        caps["strain_source"] = "column"
        _CAPS = caps
        logger.info("Capabilities: strain filter via products.strain_type column")
        return _CAPS
    except Exception:
        pass

    # Try detecting a mapping table next
    try:
        await conn.execute(text("SELECT strain_type FROM product_strain LIMIT 0"))
        caps["strain_filter"] = True
        caps["strain_source"] = "mapping_table"
        _CAPS = caps
        logger.info("Capabilities: strain filter via product_strain mapping table")
        return _CAPS
    except Exception:
        pass

    _CAPS = caps
    logger.info("Capabilities: strain filter not available")
    return _CAPS


def get_capabilities() -> Capabilities:
    """Return last detected capabilities."""

    return _CAPS.copy()

