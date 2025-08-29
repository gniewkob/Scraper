"""Search API endpoints for frontend integration."""

from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.asyncio import AsyncConnection
from typing import Optional, Dict, Any, Union
import logging

from backend.db import get_connection
from backend import cities as cities_cfg
from backend.capabilities import get_capabilities
from backend.routes.utils import haversine, CITY_REGEX

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/api/search", response_class=JSONResponse)
async def search_products(
    city: Optional[str] = Query(None, min_length=1, max_length=50, pattern=CITY_REGEX),
    strain_type: Optional[str] = Query(None, min_length=1, max_length=50),
    product_name: Optional[str] = Query(None, min_length=1, max_length=100),
    max_price: Optional[float] = Query(None, gt=0),
    min_thc: Optional[float] = Query(None, ge=0, le=100),
    max_thc: Optional[float] = Query(None, ge=0, le=100),
    min_cbd: Optional[float] = Query(None, ge=0, le=100),
    max_cbd: Optional[float] = Query(None, ge=0, le=100),
    radius: Optional[float] = Query(None, gt=0, le=1000),
    lat: Optional[float] = Query(None, ge=-90, le=90),
    lon: Optional[float] = Query(None, ge=-180, le=180),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    sort_by: str = Query("price", pattern=r"^(price|rating|distance|name)$"),
    sort_order: str = Query("asc", pattern=r"^(asc|desc)$"),
    conn: AsyncConnection = Depends(get_connection),
):
    """Search products with advanced filtering and sorting.
    
    This endpoint provides the search functionality needed by the React frontend.
    """
    
    # Build base query
    base_query = """
        SELECT DISTINCT
            p.id,
            p.name,
            pp.id as offer_id,
            pp.pharmacy_name,
            pp.address,
            pp.price,
            pp.unit,
            pp.expiration,
            pp.fetched_at,
            pp.pharmacy_lat,
            pp.pharmacy_lon,
            pp.map_url
        FROM products p
        INNER JOIN pharmacy_prices pp ON p.id = pp.product_id
        WHERE p.active = true
    """
    
    params: Dict[str, Union[str, float, int]] = {}
    
    # Add filters
    if city:
        base_query += " AND LOWER(pp.address) LIKE LOWER(:city)"
        params.update({"city": f"%{city}%"})
    if product_name and product_name != "all":
        base_query += " AND LOWER(p.name) LIKE LOWER(:pname)"
        params["pname"] = f"%{product_name}%"
    
    # Strain filtering depending on capabilities
    if strain_type and strain_type != "all":
        caps = get_capabilities()
        if caps.get("strain_filter") and caps.get("strain_source") == "column":
            base_query += " AND LOWER(p.strain_type) = LOWER(:strain_type)"
            params["strain_type"] = strain_type
        elif caps.get("strain_filter") and caps.get("strain_source") == "mapping_table":
            base_query += " AND EXISTS (SELECT 1 FROM product_strain ps WHERE ps.product_id = p.id AND LOWER(ps.strain_type) = LOWER(:strain_type))"
            params["strain_type"] = strain_type
        else:
            # Unsupported, ignore
            pass
    
    if max_price:
        base_query += " AND pp.price <= :max_price"
        params["max_price"] = max_price
    
    if min_thc is not None:
        base_query += " AND p.thc_content >= :min_thc"
        params["min_thc"] = min_thc
    
    if max_thc is not None:
        base_query += " AND p.thc_content <= :max_thc"
        params["max_thc"] = max_thc
    
    if min_cbd is not None:
        base_query += " AND p.cbd_content >= :min_cbd"
        params["min_cbd"] = min_cbd
    
    if max_cbd is not None:
        base_query += " AND p.cbd_content <= :max_cbd"
        params["max_cbd"] = max_cbd
    
    # Location filtering
    if lat is not None and lon is not None and radius is not None:
        base_query += " AND pp.pharmacy_lat IS NOT NULL AND pp.pharmacy_lon IS NOT NULL"
    
    # Add sorting
    sort_field_map = {
        "price": "pp.price",
        "rating": "pp.pharmacy_rating",
        "distance": "pp.distance",
        "name": "p.name"
    }
    
    sort_field = sort_field_map.get(sort_by, "pp.price")
    order_clause = f" ORDER BY {sort_field} {sort_order.upper()}"
    
    # Add pagination
    base_query += order_clause + " LIMIT :limit OFFSET :offset"
    params.update({"limit": limit, "offset": offset})
    
    # Execute query
    try:
        rows = (await conn.execute(text(base_query), params)).mappings().all()
        
        # Process results
        products = []
        for row in rows:
            # Calculate distance if coordinates provided
            distance = None
            if lat is not None and lon is not None and row.get("pharmacy_lat") and row.get("pharmacy_lon"):
                distance = haversine(lat, lon, row.get("pharmacy_lat"), row.get("pharmacy_lon"))
                if radius and distance > radius:
                    continue
            
            product = {
                "id": str(row.get("id")),
                "name": row.get("name"),
                "offer_id": str(row.get("offer_id")) if row.get("offer_id") is not None else None,
                "strain_type": (row.get("strain_type") or "unknown"),
                "thc_content": row.get("thc_content"),
                "cbd_content": row.get("cbd_content"),
                "price": float(row.get("price")) if row.get("price") else 0,
                "pharmacy": row.get("pharmacy_name"),
                "location": row.get("address") or "Unknown",
                "distance": distance,
                "availability": (row.get("availability_status") == "available") if row.get("availability_status") is not None else True,
                "rating": float(row.get("pharmacy_rating")) if row.get("pharmacy_rating") else None,
                "unit": row.get("unit") or "g",
                "expiration": row.get("expiration"),
                "fetched_at": row.get("fetched_at"),
                "map_url": row.get("map_url"),
                "delivery_options": row.get("delivery_options"),
            }
            products.append(product)
        
        # Get total count for pagination
        count_query = """
            SELECT COUNT(DISTINCT p.id) 
            FROM products p 
            INNER JOIN pharmacy_prices pp ON p.id = pp.product_id 
            WHERE p.active = true
        """
        count_params: Dict[str, Union[str, float]] = {}
        
        if city:
            count_query += " AND LOWER(pp.address) LIKE LOWER(:city)"
            count_params.update({"city": f"%{city}%"})
        
        # Strain filter for count when supported
        if strain_type and strain_type != "all":
            caps = get_capabilities()
            if caps.get("strain_filter") and caps.get("strain_source") == "column":
                count_query += " AND LOWER(p.strain_type) = LOWER(:strain_type)"
                count_params["strain_type"] = strain_type
            elif caps.get("strain_filter") and caps.get("strain_source") == "mapping_table":
                count_query += " AND EXISTS (SELECT 1 FROM product_strain ps WHERE ps.product_id = p.id AND LOWER(ps.strain_type) = LOWER(:strain_type))"
                count_params["strain_type"] = strain_type
        
        if max_price:
            count_query += " AND pp.price <= :max_price"
            count_params["max_price"] = max_price
        
        total_count = (await conn.execute(text(count_query), count_params)).scalar()
        
        # Calculate statistics
        if products:
            prices = [p["price"] for p in products if p["price"] > 0]
            avg_price = sum(prices) / len(prices) if prices else 0.0
            lowest_price = min(prices) if prices else 0.0
            highest_price = max(prices) if prices else 0.0
        else:
            avg_price = lowest_price = highest_price = 0.0
        
        return {
            "products": products,
            "total_count": total_count,
            "avg_price": round(avg_price, 2),
            "lowest_price": round(lowest_price, 2),
            "highest_price": round(highest_price, 2),
            "limit": limit,
            "offset": offset,
            "sort_by": sort_by,
            "sort_order": sort_order
        }
        
    except Exception as e:
        logger.error(f"Search query failed: {e}")
        # Graceful dev fallback if schema not initialized
        if isinstance(e, OperationalError) or 'no such table' in str(e).lower():
            return {
                "products": [],
                "total_count": 0,
                "avg_price": 0.0,
                "lowest_price": 0.0,
                "highest_price": 0.0,
                "limit": limit,
                "offset": offset,
                "sort_by": sort_by,
                "sort_order": sort_order,
            }
        return JSONResponse(
            {"error": "Search failed", "details": str(e)},
            status_code=500,
        )


@router.get("/api/stats", response_class=JSONResponse)
async def get_statistics(
    city: Optional[str] = Query(None, min_length=1, max_length=50, pattern=CITY_REGEX),
    product_name: Optional[str] = Query(None, min_length=1, max_length=100),
    strain_type: Optional[str] = Query(None, min_length=1, max_length=50),
    max_price: Optional[float] = Query(None, gt=0),
    conn: AsyncConnection = Depends(get_connection),
):
    """Get statistics, optionally filtered by city/product/strain."""

    try:
        where = ["p.active = true"]
        params: Dict[str, Union[str, float]] = {}

        if city:
            where.append("LOWER(pp.address) LIKE LOWER(:city)")
            params["city"] = f"%{city}%"
        if product_name:
            where.append("LOWER(p.name) LIKE LOWER(:pname)")
            params["pname"] = f"%{product_name}%"
        if max_price is not None:
            where.append("pp.price <= :max_price")
            params["max_price"] = max_price
        # Optional strain filter (only if schema supports; use EXISTS to be safe)
        if strain_type and strain_type != "all":
            # Try products.strain_type
            where_strain_column = "LOWER(p.strain_type) = LOWER(:stype)"
            where_strain_map = (
                "EXISTS (SELECT 1 FROM product_strain ps WHERE ps.product_id = p.id AND LOWER(ps.strain_type) = LOWER(:stype))"
            )
            # Use a tolerant OR so query works regardless of presence
            where.append(f"(({where_strain_column}) OR ({where_strain_map}))")
            params["stype"] = strain_type

        where_clause = " AND ".join(where)

        # Total products within filters
        total_products = (
            await conn.execute(
                text(
                    f"""
                    SELECT COUNT(DISTINCT p.id)
                    FROM products p
                    JOIN pharmacy_prices pp ON p.id = pp.product_id
                    WHERE {where_clause}
                    """
                ),
                params,
            )
        ).scalar()

        # Total pharmacies within filters
        total_pharmacies = (
            await conn.execute(
                text(
                    f"""
                    SELECT COUNT(DISTINCT pp.pharmacy_name)
                    FROM products p
                    JOIN pharmacy_prices pp ON p.id = pp.product_id
                    WHERE {where_clause}
                    """
                ),
                params,
            )
        ).scalar()

        # Average price within filters
        avg_price_result = (
            await conn.execute(
                text(
                    f"""
                    SELECT AVG(pp.price)
                    FROM products p
                    JOIN pharmacy_prices pp ON p.id = pp.product_id
                    WHERE {where_clause} AND pp.price > 0
                    """
                ),
                params,
            )
        ).scalar()
        avg_price = float(avg_price_result) if avg_price_result else 0

        # Cities covered within filters
        cities_result = (
            await conn.execute(
                text(
                    f"""
                    SELECT COUNT(DISTINCT pp.address)
                    FROM products p
                    JOIN pharmacy_prices pp ON p.id = pp.product_id
                    WHERE {where_clause} AND pp.address IS NOT NULL
                    """
                ),
                params,
            )
        ).scalar()
        cities_covered = cities_result or 0

        # Last updated within filters
        last_updated_result = (
            await conn.execute(
                text(
                    f"""
                    SELECT MAX(pp.fetched_at)
                    FROM products p
                    JOIN pharmacy_prices pp ON p.id = pp.product_id
                    WHERE {where_clause}
                    """
                ),
                params,
            )
        ).scalar()
        last_updated = last_updated_result or "Unknown"

        return {
            "total_products": total_products,
            "total_pharmacies": total_pharmacies,
            "avg_price": round(avg_price, 2),
            "cities_covered": cities_covered,
            "last_updated": str(last_updated),
        }

    except Exception as e:
        logger.error(f"Stats query failed: {e}")
        if isinstance(e, OperationalError) or 'no such table' in str(e).lower():
            return {
                "total_products": 0,
                "total_pharmacies": 0,
                "avg_price": 0.0,
                "cities_covered": 0,
                "last_updated": "Unknown",
            }
        return JSONResponse(
            {"error": "Failed to get statistics", "details": str(e)},
            status_code=500,
        )


@router.get("/api/cities_stats", response_class=JSONResponse)
async def get_cities_stats(conn: AsyncConnection = Depends(get_connection)):
    """Get list of cities with pharmacy coverage (name + counters).

    Note: Avoids clashing with the core `/api/cities` endpoint that returns
    a simple list of city names used elsewhere and in tests.
    """
    
    try:
        # Pull aggregated data per address (street-level). We'll map addresses to known city names.
        cities_query = """
            SELECT 
                address,
                COUNT(DISTINCT pharmacy_name) as pharmacy_count,
                AVG(price) as avg_price
            FROM pharmacy_prices 
            WHERE address IS NOT NULL 
            GROUP BY address 
        """
        rows = (await conn.execute(text(cities_query))).mappings().all()

        # Build a quick lookup of known cities (lowercased) for substring matching
        known_cities = cities_cfg.get_city_list()
        known_lower = [(c, c.lower()) for c in known_cities]

        # Aggregate by detected city name
        agg: Dict[str, Dict[str, Any]] = {}
        for row in rows:
            address = (row.get("address") or "").lower()
            matched_city = None
            for orig, low in known_lower:
                if low in address:
                    matched_city = orig
                    break
            # If none matched, skip as we can't attribute to a known city
            if not matched_city:
                continue

            entry = agg.setdefault(matched_city, {"name": matched_city, "pharmacy_count": 0, "_price_sum": 0.0, "_price_cnt": 0})
            entry["pharmacy_count"] += int(row["pharmacy_count"] or 0)
            avg_price = row["avg_price"]
            if avg_price is not None:
                entry["_price_sum"] += float(avg_price)
                entry["_price_cnt"] += 1

        # Finalize avg_price and sort
        result = []
        for city_name, data in agg.items():
            cnt = data.pop("_price_cnt")
            s = data.pop("_price_sum")
            data["avg_price"] = round(s / cnt, 2) if cnt else 0.0
            result.append(data)

        # Sort by pharmacy_count desc
        result.sort(key=lambda x: x.get("pharmacy_count", 0), reverse=True)
        return result

    except Exception as e:
        logger.error(f"Cities query failed: {e}")
        if isinstance(e, OperationalError) or 'no such table' in str(e).lower():
            return []
        return JSONResponse(
            {"error": "Failed to get cities", "details": str(e)},
            status_code=500,
        )


@router.get("/api/deals/best", response_class=JSONResponse)
async def get_best_deals(
    limit: int = Query(10, ge=1, le=50),
    conn: AsyncConnection = Depends(get_connection)
):
    """Get best price deals across all products."""
    
    try:
        # Get best deals by finding lowest prices per product
        deals_query = """
            SELECT 
                p.id,
                p.name,
                pp.id as offer_id,
                pp.pharmacy_name,
                pp.address,
                pp.price,
                pp.unit,
                pp.expiration,
                pp.fetched_at,
                pp.map_url
            FROM products p
            INNER JOIN pharmacy_prices pp ON p.id = pp.product_id
            INNER JOIN (
                SELECT product_id, MIN(price) as min_price
                FROM pharmacy_prices
                WHERE price > 0
                GROUP BY product_id
            ) min_prices ON pp.product_id = min_prices.product_id AND pp.price = min_prices.min_price
            WHERE p.active = true
            ORDER BY pp.price ASC
            LIMIT :limit
        """
        
        rows = (await conn.execute(text(deals_query), {"limit": limit})).mappings().all()
        
        deals = []
        for row in rows:
            deal = {
                "id": str(row["id"]),
                "name": row["name"],
                "offer_id": str(row.get("offer_id")) if row.get("offer_id") is not None else None,
                "strain_type": "unknown",
                "thc_content": None,
                "cbd_content": None,
                "price": float(row["price"]) if row.get("price") is not None else 0.0,
                "pharmacy": row["pharmacy_name"],
                "location": row["address"] or "Unknown",
                "unit": row["unit"] or "g",
                "expiration": row["expiration"],
                "fetched_at": row["fetched_at"],
                "rating": None,
                "map_url": row["map_url"]
            }
            deals.append(deal)
        
        return deals
        
    except Exception as e:
        logger.error(f"Best deals query failed: {e}")
        return JSONResponse(
            {"error": "Failed to get best deals", "details": str(e)}, 
            status_code=500
        )
