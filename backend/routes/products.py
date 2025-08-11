from fastapi import APIRouter, JSONResponse, Query
from sqlalchemy import text
from urllib.parse import unquote
from datetime import datetime
from typing import Optional

from backend.db import get_engine
from ..schemas import ProductOffersResponse
from .utils import (
    haversine,
    compute_price_info,
    get_price_thresholds,
    classify_price_bucket,
    get_historical_low,
)

router = APIRouter()


@router.get("/api/products", response_class=JSONResponse)
async def get_products():
    engine = get_engine()
    async with engine.connect() as conn:
        rows = (
            await conn.execute(
                text("SELECT DISTINCT id, name FROM products WHERE active = 1")
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
    product_name: str,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    sort: str = Query("price"),
    order: str = Query("asc"),
    city: Optional[str] = Query(None),
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None),
    radius: Optional[float] = Query(None),
):
    decoded_name = unquote(product_name)
    engine = get_engine()
    async with engine.connect() as conn:
        row = (
            (
                await conn.execute(
                    text("SELECT id FROM products WHERE name = :name"),
                    {"name": decoded_name},
                )
            )
            .mappings()
            .first()
        )
    if not row:
        return JSONResponse({"error": "Produkt nie znaleziony"}, status_code=404)
    product_id = row["id"]

    allowed_sort = {"price", "expiration", "fetched_at"}
    allowed_order = {"asc", "desc"}
    sort_sql = sort if sort in allowed_sort else "price"
    order_sql = order if order in allowed_order else "asc"

    base_query = """
        SELECT *,
               ROW_NUMBER() OVER (
                   PARTITION BY pharmacy_name, expiration
                   ORDER BY datetime(fetched_at) DESC
               ) AS rn
        FROM pharmacy_prices
        WHERE product_id = :pid
          AND (expiration IS NULL OR DATE(expiration) >= DATE('now'))
    """
    params = {"pid": product_id}

    if city:
        base_query += " AND (address LIKE :city1 OR address LIKE :city2)"
        params.update({"city1": f"%, {city}", "city2": f"% {city}"})

    query = (
        f"SELECT * FROM ({base_query}) WHERE rn = 1 ORDER BY {sort_sql} {order_sql} "
        "LIMIT :limit OFFSET :offset"
    )
    query_params = {**params, "limit": limit, "offset": offset}
    async with engine.connect() as conn:
        rows = (await conn.execute(text(query), query_params)).mappings().all()
        total = (
            await conn.execute(
                text(f"SELECT COUNT(*) FROM ({base_query}) WHERE rn = 1"), params
            )
        ).scalar()
        thresholds = await get_price_thresholds(conn, product_id)
        min_price = await get_historical_low(conn, product_id)

    offers = []
    now = datetime.now()
    MINIMUM_DISPLAY_PRICE = 10

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

