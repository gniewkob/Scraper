from fastapi import APIRouter, Depends, Query, Path
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncConnection
from urllib.parse import unquote
from datetime import datetime
from typing import Optional

from backend.db import get_connection
from backend.config import settings
from ..schemas import ProductOffersResponse
from .utils import (
    haversine,
    compute_price_info,
    get_price_thresholds,
    classify_price_bucket,
    get_historical_low,
    slugify,
)

router = APIRouter()

ALLOWED_SORT_FIELDS = {
    "price": "price",
    "expiration": "expiration",
    "fetched_at": "fetched_at",
}

ALLOWED_SORT_ORDERS = {"asc": "ASC", "desc": "DESC"}


@router.get("/api/products", response_class=JSONResponse)
async def get_products(conn: AsyncConnection = Depends(get_connection)):
    """Return all active products.

    Parameters
    ----------
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    list[dict]
        Each item contains ``id``, ``name`` and a simplified ``label``.
    """

    rows = (
        await conn.execute(
            text("SELECT DISTINCT id, name FROM products WHERE active = true")
        )
    ).fetchall()

    results = []
    for pid, name in rows:
        label = (
            name.replace("Cannabis", "")
            .replace("Flos", "")
            .replace("Marihuana Lecznicza Medyczna", "")
            .replace("Medyczna", "")
            .strip()
            .title()
        )
        results.append({"id": pid, "name": name, "label": label})
    return results


@router.get(
    "/api/product/{product_name}",
    response_class=JSONResponse,
    response_model=ProductOffersResponse,
    response_model_exclude_none=True,
)
async def get_product_by_name(
    product_name: str = Path(
        ..., min_length=1, max_length=100, pattern=r"^[A-Za-z0-9\s-]+$"
    ),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    sort: str = Query("price", pattern=r"^(price|expiration|fetched_at)$"),
    order: str = Query("asc", pattern=r"^(asc|desc)$"),
    city: Optional[str] = Query(
        None, min_length=1, max_length=50, pattern=r"^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$"
    ),
    lat: Optional[float] = Query(None, ge=-90, le=90),
    lon: Optional[float] = Query(None, ge=-180, le=180),
    radius: Optional[float] = Query(None, gt=0, le=1000),
    conn: AsyncConnection = Depends(get_connection),
):
    """Return offers for a given product.

    Parameters
    ----------
    product_name : str
        URL-friendly name or slug of the product.
    limit : int, optional
        Maximum number of offers to return. Default is 50.
    offset : int, optional
        Number of offers to skip for pagination. Default is 0.
    sort : str, optional
        Field used for sorting (``price``, ``expiration`` or ``fetched_at``).
    order : str, optional
        Sort order, either ``asc`` or ``desc``.
    city : str, optional
        Filter offers by city in the pharmacy address.
    lat : float, optional
        Latitude used for distance filtering.
    lon : float, optional
        Longitude used for distance filtering.
    radius : float, optional
        Maximum distance in kilometers for location filtering.
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    dict
        Contains ``offers`` list and metadata keys ``total``, ``limit``,
        ``offset``, ``sort``, ``order``, ``top3`` and ``trend``.

    Error Cases
    -----------
    Returns a 404 JSON response when the product is not found.
    """

    decoded_name = unquote(product_name)
    normalized_name = slugify(decoded_name)
    row = (
        (
            await conn.execute(
                text("SELECT id FROM products WHERE slug = :slug OR lower(name) = :name"),
                {"slug": normalized_name, "name": decoded_name.lower()},
            )
        )
        .mappings()
        .first()
    )
    if not row:
        return JSONResponse({"error": "Produkt nie znaleziony"}, status_code=404)
    product_id = row["id"]

    sort_sql = ALLOWED_SORT_FIELDS[sort]
    order_sql = ALLOWED_SORT_ORDERS[order]

    base_query = """
        SELECT *,
               ROW_NUMBER() OVER (
                   PARTITION BY pharmacy_name, expiration
                   ORDER BY fetched_at::timestamp DESC
               ) AS rn
        FROM pharmacy_prices
        WHERE product_id = :pid
          AND (expiration IS NULL OR expiration::date >= CURRENT_DATE)
    """
    params = {"pid": product_id}

    if city:
        base_query += " AND (address LIKE :city1 OR address LIKE :city2)"
        params.update({"city1": f"%{city}%", "city2": f"%{city}%"})

    order_clause = f" ORDER BY {sort_sql} {order_sql} "
    query = text(
        f"SELECT * FROM ({base_query}) WHERE rn = 1{order_clause}LIMIT :limit OFFSET :offset"
    )
    query_params = {**params, "limit": limit, "offset": offset}
    rows = (await conn.execute(query, query_params)).mappings().all()
    total = (
        await conn.execute(
            text(f"SELECT COUNT(*) FROM ({base_query}) WHERE rn = 1"), params
        )
    ).scalar()
    thresholds = await get_price_thresholds(conn, product_id)
    min_price = await get_historical_low(conn, product_id)

    offers = []
    now = datetime.now()
    MINIMUM_DISPLAY_PRICE = float(settings.min_display_price)

    for row in rows:
        price = float(row["price"])
        if price < MINIMUM_DISPLAY_PRICE:
            continue
        if lat is not None and lon is not None and radius is not None:
            plat = row["pharmacy_lat"]
            plon = row["pharmacy_lon"]
            if plat is None or plon is None:
                continue
            distance = haversine(lat, lon, plat, plon)
            if distance > radius:
                continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, product_id, expiration, now
        )
        offer = {
            "pharmacy": row["pharmacy_name"],
            "address": row["address"],
            "price": display_price,
            "unit": unit,
            "expiration": expiration,
            "fetched_at": fetched_at,
            "short_expiry": short_expiry,
            "map_url": row["map_url"] or "",
            "pharmacy_lat": row["pharmacy_lat"],
            "pharmacy_lon": row["pharmacy_lon"],
        }
        if price_per_g is not None:
            offer["price_per_g"] = price_per_g
        offer["price_bucket"] = classify_price_bucket(display_price, thresholds)
        offer["is_historical_low"] = bool(
            min_price is not None and abs(display_price - float(min_price)) < 1e-9
        )
        offers.append(offer)

    trend_data = []
    seen_top3_keys = set()
    top3 = []
    for offer in offers:
        trend_data.append(
            {
                "price": offer["price"],
                "expiration": offer["expiration"],
                "fetched_at": offer["fetched_at"],
            }
        )
        key = (offer["pharmacy"], offer["expiration"])
        if key not in seen_top3_keys and len(top3) < 3:
            top3.append(offer)
            seen_top3_keys.add(key)
    trend_data.sort(key=lambda t: t["fetched_at"])

    return {
        "offers": offers,
        "total": total,
        "limit": limit,
        "offset": offset,
        "sort": sort_sql,
        "order": order_sql,
        "top3": top3,
        "trend": trend_data,
    }
