"""Main FastAPI application."""
import json
import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Dict, List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.db import dispose_engines, get_cities
from backend.medical_api import router as medical_router
from backend.routes import alerts, products
from backend.utils import send_confirmation_email, send_confirmation_sms  # noqa: F401

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
# Configure CORS from environment. Provide a comma-separated list in ALLOWED_ORIGINS.
allowed_origins_env = os.getenv("ALLOWED_ORIGINS")
if allowed_origins_env:
    allow_origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]
else:
    # Default to localhost dev origins plus known proxy domains used in production.
    # These proxy domains (smart.bodora.pl and backend.bodora.pl) route to localhost:PORT on the host.
    allow_origins = [
        "http://localhost:3000",
        "http://localhost:38273",
        "https://smart.bodora.pl",  # → localhost:61973
        "https://backend.bodora.pl",  # → localhost:38273
    ]

# By default do not allow credentials unless explicitly enabled in env for trusted deployments.
allow_credentials = os.getenv("ALLOW_CREDENTIALS", "false").lower() in ("1", "true", "yes")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=allow_credentials,
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


# Include routers
app.include_router(products.router)
app.include_router(alerts.router)
app.include_router(medical_router)


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
    return await get_cities()
