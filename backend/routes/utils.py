import logging
import re
from datetime import datetime, timezone
from math import radians, cos, sin, asin, sqrt
from sqlalchemy import text
from scraper.core.config.urls import PACKAGE_SIZES
from backend.config import settings

CITY_REGEX = r"^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$"


logger = logging.getLogger(__name__)


def slugify(value: str) -> str:
    """Return a simple slugified representation of ``value``."""
    value = value.lower()
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"\s+", "-", value)
    return value.strip("-")


def haversine(lat1, lon1, lat2, lon2):
    """Return distance in kilometres between two points."""
    R = 6371
    lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    return R * c


def compute_price_info(price, unit, product_id, expiration, now=None):
    """Compute helper values for price information."""
    if now is None:
        now = datetime.now(timezone.utc)
    elif now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)

    short_expiry = False
    if expiration:
        try:
            exp_dt = datetime.fromisoformat(expiration)
            if exp_dt.tzinfo is None:
                exp_dt = exp_dt.replace(tzinfo=timezone.utc)
            days_left = (exp_dt - now).days
            short_expiry = days_left <= int(settings.short_expiry_days)
        except ValueError as exc:
            logger.warning(
                "Failed to parse expiration '%s' for product %s: %s",
                expiration,
                product_id,
                exc,
            )

    price_per_g = None
    match = re.search(r"(\d+(?:[.,]\d+)?)\s*g", unit or "")
    if match:
        grams = float(match.group(1).replace(",", "."))
        if grams:
            price_per_g = price / grams
    else:
        pkg = PACKAGE_SIZES.get(str(product_id))
        if pkg:
            price_per_g = price / pkg

    display_price = price_per_g if price_per_g is not None else price
    return price_per_g, display_price, short_expiry


async def get_price_thresholds(conn, product_id):
    """Fetch price bucket thresholds for a product."""
    product_type = "default"
    try:
        row = await conn.execute(
            text("SELECT product_type FROM product_type_mapping WHERE product_id = :pid"),
            {"pid": str(product_id)},
        )
        mapping = row.mappings().first()
        if mapping and mapping.get("product_type"):
            product_type = mapping["product_type"]
    except Exception:
        return None

    try:
        row = await conn.execute(
            text(
                """
                SELECT super_deal, deal, normal
                FROM price_thresholds
                WHERE product_type = :ptype
                ORDER BY datetime(updated_at) DESC
                LIMIT 1
                """
            ),
            {"ptype": product_type},
        )
        return row.mappings().first()
    except Exception:
        return None


def classify_price_bucket(price, thresholds):
    """Classify ``price`` into a price bucket using thresholds."""
    if not thresholds:
        return "unknown"
    try:
        if price < thresholds["super_deal"]:
            return "super_okazja"
        if price < thresholds["deal"]:
            return "okazja"
        if price < thresholds["normal"]:
            return "normalna"
        return "drogo"
    except Exception:
        return "unknown"


async def get_historical_low(conn, product_id):
    """Return historical lowest price for a product if available."""
    try:
        row = await conn.execute(
            text(
                """
                SELECT min_price
                FROM price_statistics
                WHERE product = :pid
                ORDER BY datetime(calculated_at) DESC
                LIMIT 1
                """
            ),
            {"pid": str(product_id)},
        )
        result = row.mappings().first()
        return result["min_price"] if result else None
    except Exception:
        return None
