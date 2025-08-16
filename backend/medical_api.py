"""Medical marijuana API endpoints."""
from typing import List, Optional
from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
from datetime import datetime
import random

from . import cities
from backend.db import get_cities as db_get_cities

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

MOCK_CITIES = cities.get_city_list()

STRAIN_NAMES = {
    "indica": ["🌙 Northern Lights", "🍇 Purple Kush", "💤 Granddaddy Purple", "🌌 Bubba Kush", "🍰 Wedding Cake"],
    "sativa": ["☀️ Sour Diesel", "🍋 Lemon Haze", "🚀 Green Crack", "⚡ Jack Herer", "🌈 Durban Poison"],
    "hybrid": ["🛸 Blue Dream", "🍪 Girl Scout Cookies", "🦍 Gorilla Glue", "🎨 Gelato", "🍓 Strawberry Cough"]
}

DISPENSARIES = [
    "🌿 Green Galaxy", "👽 Cosmic Cannabis", "🌌 Stellar Strains",
    "🚀 Space Station THC", "🛸 UFO Botanicals", "🌙 Lunar Leaf",
    "⭐ Star Seeds", "🌠 Meteor Medicine", "🪐 Planet Plant",
    "🌍 Earth's Essence"
]

def generate_mock_products(count: int = 50) -> List[Product]:
    """Generate mock products."""
    products = []
    for i in range(count):
        strain_type = random.choice(["indica", "sativa", "hybrid"])
        products.append(Product(
            id=str(i + 1),
            name=random.choice(STRAIN_NAMES[strain_type]),
            strain_type=strain_type,
            thc_content=round(random.uniform(15, 30), 1),
            cbd_content=round(random.uniform(0.1, 5), 1),
            price=round(random.uniform(25, 80), 2),
            dispensary=random.choice(DISPENSARIES),
            location=random.choice(MOCK_CITIES),
            availability=random.choice([True, True, True, False]),  # 75% available
            rating=round(random.uniform(3.5, 5.0), 1),
            image_url=None
        ))
    return products

# Generate mock products once
MOCK_PRODUCTS = generate_mock_products(100)

@router.get("/search", response_model=SearchResponse)
async def search_products(
    city: Optional[str] = Query(None),
    strain_type: Optional[str] = Query(None),
    max_price: Optional[float] = Query(None),
    min_thc: Optional[float] = Query(None),
    max_thc: Optional[float] = Query(None),
    min_cbd: Optional[float] = Query(None),
    max_cbd: Optional[float] = Query(None),
    radius: Optional[float] = Query(None)
):
    """Search for medical marijuana products."""
    filtered_products = MOCK_PRODUCTS.copy()
    
    # Apply filters
    if city and city != "all":
        filtered_products = [p for p in filtered_products if p.location.lower() == city.lower()]
    
    if strain_type and strain_type != "all":
        filtered_products = [p for p in filtered_products if p.strain_type == strain_type]
    
    if max_price:
        filtered_products = [p for p in filtered_products if p.price <= max_price]
    
    if min_thc:
        filtered_products = [p for p in filtered_products if p.thc_content >= min_thc]
    
    if max_thc:
        filtered_products = [p for p in filtered_products if p.thc_content <= max_thc]
    
    if min_cbd:
        filtered_products = [p for p in filtered_products if p.cbd_content >= min_cbd]
    
    if max_cbd:
        filtered_products = [p for p in filtered_products if p.cbd_content <= max_cbd]
    
    if not filtered_products:
        return SearchResponse(
            products=[],
            total_count=0,
            avg_price=0,
            lowest_price=0,
            highest_price=0
        )
    
    prices = [p.price for p in filtered_products]
    
    return SearchResponse(
        products=filtered_products[:20],  # Return first 20 results
        total_count=len(filtered_products),
        avg_price=round(sum(prices) / len(prices), 2),
        lowest_price=min(prices),
        highest_price=max(prices)
    )

@router.get("/stats", response_model=StatsResponse)
async def get_stats():
    """Get statistics about available products."""
    prices = [p.price for p in MOCK_PRODUCTS]
    unique_dispensaries = len(set(p.dispensary for p in MOCK_PRODUCTS))
    unique_cities = len(set(p.location for p in MOCK_PRODUCTS))
    
    return StatsResponse(
        total_products=len(MOCK_PRODUCTS),
        total_dispensaries=unique_dispensaries,
        avg_price=round(sum(prices) / len(prices), 2),
        cities_covered=unique_cities,
        last_updated=datetime.now().isoformat()
    )

@router.get("/cities", response_model=List[str])
async def get_cities():
    """Get list of available cities."""
    return await db_get_cities()

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a specific product by ID."""
    product = next((p for p in MOCK_PRODUCTS if p.id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/products/city/{city}", response_model=List[Product])
async def get_products_by_city(city: str):
    """Get products available in a specific city."""
    products = [p for p in MOCK_PRODUCTS if p.location.lower() == city.lower()]
    return products[:20]  # Return first 20 results

@router.get("/deals/best", response_model=List[Product])
async def get_best_deals(limit: int = Query(10, ge=1, le=50)):
    """Get best deals (lowest prices)."""
    sorted_products = sorted(MOCK_PRODUCTS, key=lambda p: p.price)
    return sorted_products[:limit]
