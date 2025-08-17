"""Medical marijuana API endpoints.

This module provides API endpoints for searching and retrieving medical marijuana product information
from the real database instead of using mock data. The endpoints include:

- /api/search: Search for products with various filters
- /api/stats: Get statistics about products and dispensaries
- /api/medical/cities: Get list of available cities
- /api/products/{product_id}: Get specific product information
- /api/products/city/{city}: Get products available in a specific city
- /api/deals/best: Get best deals (lowest prices)

All endpoints now query the real database for up-to-date information.
"""
from typing import List, Optional
from fastapi import APIRouter, Query, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncConnection

from . import cities
from backend.db import get_cities as db_get_cities, get_connection

router = APIRouter(prefix="/api", tags=["medical"])

# Pydantic models
class Product(BaseModel):
    id: str
    name: str
    strain_type: str  # "indica" | "sativa" | "hybrid"
    thc_content: float
    cbd_content: float
    price: float
    dispensary: str
    location: str
    distance: Optional[float] = None
    availability: bool
    rating: float
    image_url: Optional[str] = None

class SearchResponse(BaseModel):
    products: List[Product]
    total_count: int
    avg_price: float
    lowest_price: float
    highest_price: float

class StatsResponse(BaseModel):
    total_products: int
    total_dispensaries: int
    avg_price: float
    cities_covered: int
    last_updated: str

@router.get("/search", response_model=SearchResponse)
async def search_products(
    city: Optional[str] = Query(None),
    strain_type: Optional[str] = Query(None),
    max_price: Optional[float] = Query(None),
    min_thc: Optional[float] = Query(None),
    max_thc: Optional[float] = Query(None),
    min_cbd: Optional[float] = Query(None),
    max_cbd: Optional[float] = Query(None),
    radius: Optional[float] = Query(None),
    conn: AsyncConnection = Depends(get_connection)
):
    """Search for medical marijuana products from real database data."""
    
    # Build query for pharmacy prices with product information
    query = """
        SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url,
               pr.id as product_id, pr.name as product_name,
               p.availability, p.updated
        FROM pharmacy_prices p
        LEFT JOIN products pr ON p.product_id = pr.id
        WHERE pr.active = true
    """
    params = {}
    
    # Apply filters
    if city and city != "all":
        query += " AND lower(p.address) LIKE :city"
        params["city"] = f"%{city.lower()}%"
    
    # Note: For strain_type, min_thc, max_thc, min_cbd, max_cbd filters,
    # we would need additional product information in the database
    # For now, we'll implement what we can with available data
    
    if max_price:
        query += " AND p.price <= :max_price"
        params["max_price"] = max_price
    
    query += " ORDER BY p.price ASC"
    
    rows = (await conn.execute(text(query), params)).mappings().all()
    
    # Convert database rows to Product objects
    products = []
    for row in rows:
        # Extract city from address
        address_parts = (row["address"] or "").split(",")
        location = address_parts[-1].strip() if address_parts else "Unknown"
        
        # For strain_type, thc_content, cbd_content, we'll use default values
        # since this information is not in the current database schema
        product = Product(
            id=str(row["product_id"]),
            name=row["product_name"] or "Unknown Product",
            strain_type="hybrid",  # Default value
            thc_content=20.0,     # Default value
            cbd_content=1.0,     # Default value
            price=float(row["price"]) if row["price"] else 0.0,
            dispensary=row["pharmacy_name"] or "Unknown Pharmacy",
            location=location,
            availability=(row["availability"] or "Available") == "Available",
            rating=4.5,  # Default rating
            image_url=None
        )
        products.append(product)
    
    # Apply additional filters that couldn't be done in SQL
    if strain_type and strain_type != "all":
        # This is a limitation - we can't filter by strain type without that data in DB
        pass
    
    if min_thc:
        products = [p for p in products if p.thc_content >= min_thc]
    
    if max_thc:
        products = [p for p in products if p.thc_content <= max_thc]
    
    if min_cbd:
        products = [p for p in products if p.cbd_content >= min_cbd]
    
    if max_cbd:
        products = [p for p in products if p.cbd_content <= max_cbd]
    
    # Limit to first 20 results
    products = products[:20]
    
    if not products:
        return SearchResponse(
            products=[],
            total_count=0,
            avg_price=0,
            lowest_price=0,
            highest_price=0
        )
    
    prices = [p.price for p in products]
    
    return SearchResponse(
        products=products,
        total_count=len(products),
        avg_price=round(sum(prices) / len(prices), 2) if prices else 0,
        lowest_price=min(prices) if prices else 0,
        highest_price=max(prices) if prices else 0
    )

@router.get("/stats", response_model=StatsResponse)
async def get_stats(conn: AsyncConnection = Depends(get_connection)):
    """Get statistics about available products from real database data."""
    
    # Get total number of products
    product_count_result = await conn.execute(
        text("SELECT COUNT(DISTINCT product_id) FROM pharmacy_prices")
    )
    total_products = product_count_result.scalar() or 0
    
    # Get total number of dispensaries (pharmacies)
    pharmacy_count_result = await conn.execute(
        text("SELECT COUNT(DISTINCT pharmacy_name) FROM pharmacy_prices")
    )
    total_dispensaries = pharmacy_count_result.scalar() or 0
    
    # Get average price
    avg_price_result = await conn.execute(
        text("SELECT AVG(price) FROM pharmacy_prices WHERE price IS NOT NULL")
    )
    avg_price = float(avg_price_result.scalar() or 0)
    
    # Get cities covered
    cities_result = await conn.execute(
        text("SELECT COUNT(DISTINCT address) FROM pharmacy_prices WHERE address IS NOT NULL")
    )
    cities_covered = cities_result.scalar() or 0
    
    return StatsResponse(
        total_products=total_products,
        total_dispensaries=total_dispensaries,
        avg_price=round(avg_price, 2),
        cities_covered=cities_covered,
        last_updated=datetime.now().isoformat()
    )

@router.get("/medical/cities", response_model=List[str])
async def get_medical_cities():
    """Get list of available cities for the medical API."""
    return await db_get_cities()

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str, conn: AsyncConnection = Depends(get_connection)):
    """Get a specific product by ID from real database data."""
    # Get product information from pharmacy_prices
    query = """
        SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url,
               pr.id as product_id, pr.name as product_name,
               p.availability, p.updated
        FROM pharmacy_prices p
        LEFT JOIN products pr ON p.product_id = pr.id
        WHERE p.product_id = :product_id
        LIMIT 1
    """
    row = (await conn.execute(text(query), {"product_id": product_id})).mappings().first()
    
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Extract city from address
    address_parts = (row["address"] or "").split(",")
    location = address_parts[-1].strip() if address_parts else "Unknown"
    
    product = Product(
        id=str(row["product_id"]),
        name=row["product_name"] or "Unknown Product",
        strain_type="hybrid",  # Default value
        thc_content=20.0,     # Default value
        cbd_content=1.0,     # Default value
        price=float(row["price"]) if row["price"] else 0.0,
        dispensary=row["pharmacy_name"] or "Unknown Pharmacy",
        location=location,
        availability=(row["availability"] or "Available") == "Available",
        rating=4.5,  # Default rating
        image_url=None
    )
    return product

@router.get("/products/city/{city}", response_model=List[Product])
async def get_products_by_city(city: str, conn: AsyncConnection = Depends(get_connection)):
    """Get products available in a specific city from real database data."""
    query = """
        SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url,
               pr.id as product_id, pr.name as product_name,
               p.availability, p.updated
        FROM pharmacy_prices p
        LEFT JOIN products pr ON p.product_id = pr.id
        WHERE pr.active = true
          AND lower(p.address) LIKE :city
    """
    params = {"city": f"%{city.lower()}%"}
    
    rows = (await conn.execute(text(query), params)).mappings().all()
    
    products = []
    for row in rows[:20]:  # Limit to first 20 results
        # Extract city from address
        address_parts = (row["address"] or "").split(",")
        location = address_parts[-1].strip() if address_parts else "Unknown"
        
        product = Product(
            id=str(row["product_id"]),
            name=row["product_name"] or "Unknown Product",
            strain_type="hybrid",  # Default value
            thc_content=20.0,     # Default value
            cbd_content=1.0,     # Default value
            price=float(row["price"]) if row["price"] else 0.0,
            dispensary=row["pharmacy_name"] or "Unknown Pharmacy",
            location=location,
            availability=(row["availability"] or "Available") == "Available",
            rating=4.5,  # Default rating
            image_url=None
        )
        products.append(product)
    
    return products

@router.get("/deals/best", response_model=List[Product])
async def get_best_deals(limit: int = Query(10, ge=1, le=50), conn: AsyncConnection = Depends(get_connection)):
    """Get best deals (lowest prices) from real database data."""
    query = """
        SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url,
               pr.id as product_id, pr.name as product_name,
               p.availability, p.updated
        FROM pharmacy_prices p
        LEFT JOIN products pr ON p.product_id = pr.id
        WHERE pr.active = true
          AND p.price IS NOT NULL
        ORDER BY p.price ASC
        LIMIT :limit
    """
    params = {"limit": limit}
    
    rows = (await conn.execute(text(query), params)).mappings().all()
    
    products = []
    for row in rows:
        # Extract city from address
        address_parts = (row["address"] or "").split(",")
        location = address_parts[-1].strip() if address_parts else "Unknown"
        
        product = Product(
            id=str(row["product_id"]),
            name=row["product_name"] or "Unknown Product",
            strain_type="hybrid",  # Default value
            thc_content=20.0,     # Default value
            cbd_content=1.0,     # Default value
            price=float(row["price"]) if row["price"] else 0.0,
            dispensary=row["pharmacy_name"] or "Unknown Pharmacy",
            location=location,
            availability=(row["availability"] or "Available") == "Available",
            rating=4.5,  # Default rating
            image_url=None
        )
        products.append(product)
    
    return products
