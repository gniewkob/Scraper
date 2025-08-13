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
    allow_origins=["http://localhost:3000"],
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
