"""Main FastAPI application."""
import asyncio
import hashlib
import logging
import os
import re
from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text

from backend.db import get_engine, dispose_engines, get_connection
from backend.models import Base

# Import utility functions from the new utils module
from backend.utils import (
    mask_email,
    mask_phone,
    require_admin,
    send_confirmation_email,
    send_confirmation_sms,
    send_confirmation_whatsapp,
)

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle."""
    # Startup
    logger.info("Application starting...")
    
    yield
    
    # Shutdown
    logger.info("Application shutting down...")
    await dispose_engines()


app = FastAPI(lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def compute_price_info(offers: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Compute price statistics from offers."""
    if not offers:
        return {
            "min_price": None,
            "max_price": None,
            "avg_price": None,
            "median_price": None,
            "price_range": None,
            "total_offers": 0,
        }
    
    prices = [o["price"] for o in offers if o.get("price") is not None]
    if not prices:
        return {
            "min_price": None,
            "max_price": None,
            "avg_price": None,
            "median_price": None,
            "price_range": None,
            "total_offers": len(offers),
        }
    
    prices.sort()
    min_price = prices[0]
    max_price = prices[-1]
    avg_price = sum(prices) / len(prices)
    
    # Calculate median
    n = len(prices)
    if n % 2 == 0:
        median_price = (prices[n // 2 - 1] + prices[n // 2]) / 2
    else:
        median_price = prices[n // 2]
    
    return {
        "min_price": min_price,
        "max_price": max_price,
        "avg_price": round(avg_price, 2),
        "median_price": round(median_price, 2),
        "price_range": round(max_price - min_price, 2),
        "total_offers": len(offers),
    }


# Import routes after app is defined
from .routes import alerts, products

app.include_router(products.router)
app.include_router(alerts.router)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


# City coordinates cache
_CITY_COORDS_CACHE = None
CITY_COORDS_FILE = os.getenv("CITY_COORDS_FILE", "data/city_coords.json")

@app.get("/api/city_coords/{city}")
def get_city_coords(city: str):
    """Return latitude/longitude for a given city from cached file."""
    from pathlib import Path
    import json
    
    global _CITY_COORDS_CACHE
    
    coords_file = Path(CITY_COORDS_FILE)

    if _CITY_COORDS_CACHE is None:
        if not coords_file.exists():
            raise HTTPException(status_code=404, detail="Coordinates file missing")
        try:
            with open(coords_file, "r", encoding="utf-8") as f:
                _CITY_COORDS_CACHE = json.load(f)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to load coordinates")

    for name, loc in _CITY_COORDS_CACHE.items():
        if name.lower() == city.lower():
            return {"lat": loc["lat"], "lon": loc["lon"]}

    raise HTTPException(status_code=404, detail="City not found")


@app.get("/api/cities")
async def get_cities_endpoint():
    """Return list of unique city names."""
    from backend.db import get_cities
    return await get_cities()

# Import and add medical marijuana API routes
from backend.medical_api import router as medical_router
app.include_router(medical_router)
