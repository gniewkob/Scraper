"""Main FastAPI application."""
import json
import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Dict, List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.db import dispose_engines, get_cities, get_engine
from backend.capabilities import refresh_capabilities, get_capabilities
import os
from backend.medical_api import router as medical_router
from backend.routes import alerts, products, search
from backend.utils import send_confirmation_sms  # noqa: F401

logger = logging.getLogger(__name__)


def send_confirmation_email(to_email: str) -> bool:
    """Simulate sending a confirmation email.

    The real application would dispatch an email containing a confirmation
    link or token.  For testing purposes we simply return ``True`` to mimic a
    successful send operation.
    """

    return True


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle."""
    # Startup
    logger.info("Application starting...")
    # Detect DB-driven capabilities once at startup
    try:
        engine = get_engine()
        async with engine.begin() as conn:
            await refresh_capabilities(conn)
        logger.info(f"Capabilities: {get_capabilities()}")
    except Exception as e:
        logger.warning(f"Capability detection skipped due to error: {e}")

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
    # Expand localhost/127.0.0.1 counterparts automatically for convenience in dev
    try:
        from urllib.parse import urlparse
        extras = []
        for origin in allow_origins:
            parsed = urlparse(origin)
            host = parsed.hostname
            port = f":{parsed.port}" if parsed.port else ""
            if host == "localhost":
                extras.append(f"{parsed.scheme}://127.0.0.1{port}")
            elif host == "127.0.0.1":
                extras.append(f"{parsed.scheme}://localhost{port}")
        for e in extras:
            if e not in allow_origins:
                allow_origins.append(e)
    except Exception:
        pass
else:
    # Default to localhost dev origins plus known proxy domains used in production.
    # These proxy domains (smart.bodora.pl and backend.bodora.pl) route to localhost:PORT on the host.
    # Include both localhost and 127.0.0.1 variants to avoid CORS preflight failures in some setups.
    allow_origins = [
        # Common dev servers
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:61973",
        "http://127.0.0.1:61973",
        # Backend direct access (useful when opening static dashboard directly)
        "http://localhost:38273",
        "http://127.0.0.1:38273",
        # Known proxy domains used in development / preview
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
# Enable mock API only when explicitly requested (default off)
if os.getenv("ENABLE_MOCK_API", "false").lower() in ("1", "true", "yes"): 
    app.include_router(medical_router)
app.include_router(search.router)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.get("/api/capabilities")
async def capabilities():
    """Return runtime feature flags derived from DB schema."""
    return get_capabilities()


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
