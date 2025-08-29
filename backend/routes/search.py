"""Search API endpoints for frontend integration."""

from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy import text, func
from sqlalchemy.ext.asyncio import AsyncConnection
from typing import Optional, List, Dict, Any, Union
import logging

from backend.db import get_connection
from backend.routes.utils import haversine, CITY_REGEX

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/api/search", response_class=JSONResponse)
async def search_products(
    city: Optional[str] = Query(None, min_length=1, max_length=50, pattern=CITY_REGEX),
    strain_type: Optional[str] = Query(None, min_length=1, max_length=50),
    max_price: Optional[float] = Query(None, gt=0),
    min_thc: Optional[float] = Query(None, ge=0, le=100),
    max_thc: Optional[float] = Query(None, ge=0, le=100),
    min_cbd: Optional[float] = Query(None, ge=0, le=100),
    max_cbd: Optional[float] = Query(None, ge=0, le=100),
    radius: Optional[float] = Query(None, gt=0, le=1000),
    lat: Optional[float] = Query(None, ge=-90, le=90),
    lon: Optional[float] = Query(None, ge=-180, le=180),
    limit: int = Query(50, ge=1, le=100),
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
            p.strain_type,
            p.thc_content,
            p.cbd_content,
            p.category,
            p.image_url,
            pp.pharmacy_name,
            pp.address,
            pp.price,
            pp.unit,
            pp.expiration,
            pp.fetched_at,
            pp.availability_status,
            pp.pharmacy_rating,
            pp.delivery_options,
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
        base_query += " AND (pp.address LIKE :city1 OR pp.address LIKE :city2)"
        params.update({"city1": f"%{city}%", "city2": f"%{city}%"})
    
    if strain_type and strain_type != "all":
        base_query += " AND p.strain_type = :strain_type"
        params["strain_type"] = strain_type
    
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
            if lat is not None and lon is not None and row["pharmacy_lat"] and row["pharmacy_lon"]:
                distance = haversine(lat, lon, row["pharmacy_lat"], row["pharmacy_lon"])
                if radius and distance > radius:
                    continue
            
            product = {
                "id": str(row["id"]),
                "name": row["name"],
                "strain_type": row["strain_type"] or "unknown",
                "thc_content": row["thc_content"],
                "cbd_content": row["cbd_content"],
                "price": float(row["price"]) if row["price"] else 0,
                "pharmacy": row["pharmacy_name"],
                "location": row["address"] or "Unknown",
                "distance": distance,
                "availability": row["availability_status"] == "available" if row["availability_status"] else True,
                "rating": float(row["pharmacy_rating"]) if row["pharmacy_rating"] else 4.0,
                "unit": row["unit"] or "g",
                "expiration": row["expiration"],
                "fetched_at": row["fetched_at"],
                "map_url": row["map_url"],
                "delivery_options": row["delivery_options"]
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
            count_query += " AND (pp.address LIKE :city1 OR pp.address LIKE :city2)"
            count_params.update({"city1": f"%{city}%", "city2": f"%{city}%"})
        
        if strain_type and strain_type != "all":
            count_query += " AND p.strain_type = :strain_type"
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
        return JSONResponse(
            {"error": "Search failed", "details": str(e)}, 
            status_code=500
        )


@router.get("/api/stats", response_class=JSONResponse)
async def get_statistics(conn: AsyncConnection = Depends(get_connection)):
    """Get system statistics for the dashboard."""
    
    try:
        # Get total products
        total_products = (await conn.execute(
            text("SELECT COUNT(*) FROM products WHERE active = true")
        )).scalar()
        
        # Get total unique pharmacies
        total_pharmacies = (await conn.execute(
            text("SELECT COUNT(DISTINCT pharmacy_name) FROM pharmacy_prices")
        )).scalar()
        
        # Get average price
        avg_price_result = (await conn.execute(
            text("SELECT AVG(price) FROM pharmacy_prices WHERE price > 0")
        )).scalar()
        avg_price = float(avg_price_result) if avg_price_result else 0
        
        # Get cities covered
        cities_result = (await conn.execute(
            text("SELECT COUNT(DISTINCT address) FROM pharmacy_prices WHERE address IS NOT NULL")
        )).scalar()
        cities_covered = cities_result or 0
        
        # Get last update time
        last_updated_result = (await conn.execute(
            text("SELECT MAX(fetched_at) FROM pharmacy_prices")
        )).scalar()
        last_updated = last_updated_result or "Unknown"
        
        return {
            "total_products": total_products,
            "total_pharmacies": total_pharmacies,
            "avg_price": round(avg_price, 2),
            "cities_covered": cities_covered,
            "last_updated": str(last_updated)
        }
        
    except Exception as e:
        logger.error(f"Stats query failed: {e}")
        return JSONResponse(
            {"error": "Failed to get statistics", "details": str(e)}, 
            status_code=500
        )


@router.get("/api/cities_stats", response_class=JSONResponse)
async def get_cities_stats(conn: AsyncConnection = Depends(get_connection)):
    """Get list of cities with pharmacy coverage (name + counters).

    Note: Avoids clashing with the core `/api/cities` endpoint that returns
    a simple list of city names used elsewhere and in tests.
    """
    
    try:
        # Get cities with pharmacy count
        cities_query = """
            SELECT 
                address,
                COUNT(DISTINCT pharmacy_name) as pharmacy_count,
                AVG(price) as avg_price
            FROM pharmacy_prices 
            WHERE address IS NOT NULL 
            GROUP BY address 
            ORDER BY pharmacy_count DESC
        """
        
        rows = (await conn.execute(text(cities_query))).mappings().all()
        
        cities = []
        for row in rows:
            # Extract city name from address (simple approach)
            address = row["address"]
            city_name = address.split(",")[0].strip() if address else "Unknown"
            
            cities.append({
                "name": city_name,
                "pharmacy_count": row["pharmacy_count"],
                "avg_price": round(float(row["avg_price"]), 2) if row["avg_price"] else 0.0
            })
        
        # Remove duplicates and sort by pharmacy count
        unique_cities = {}
        for city in cities:
            name = city["name"]
            if name not in unique_cities or city["pharmacy_count"] > unique_cities[name]["pharmacy_count"]:
                unique_cities[name] = city
        
        return list(unique_cities.values())
        
    except Exception as e:
        logger.error(f"Cities query failed: {e}")
        return JSONResponse(
            {"error": "Failed to get cities", "details": str(e)}, 
            status_code=500
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
                p.strain_type,
                p.thc_content,
                p.cbd_content,
                pp.pharmacy_name,
                pp.address,
                pp.price,
                pp.unit,
                pp.expiration,
                pp.fetched_at,
                pp.pharmacy_rating,
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
                "strain_type": row["strain_type"] or "unknown",
                "thc_content": row["thc_content"],
                "cbd_content": row["cbd_content"],
                "price": float(row["price"]),
                "pharmacy": row["pharmacy_name"],
                "location": row["address"] or "Unknown",
                "unit": row["unit"] or "g",
                "expiration": row["expiration"],
                "fetched_at": row["fetched_at"],
                "rating": float(row["pharmacy_rating"]) if row["pharmacy_rating"] else 4.0,
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
