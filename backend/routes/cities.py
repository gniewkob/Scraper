import json
import re
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, JSONResponse, HTTPException
from sqlalchemy import text

from backend.db import get_engine

router = APIRouter()

CITY_COORDS_FILE = Path(__file__).resolve().parent.parent / "data" / "city_coords.json"
_CITY_COORDS_CACHE: Optional[dict] = None


@router.get("/api/cities", response_class=JSONResponse)
async def get_cities():
    engine = get_engine()
    async with engine.connect() as conn:
        rows = (
            await conn.execute(
                text(
                    "SELECT DISTINCT address FROM pharmacy_prices WHERE address IS NOT NULL AND address != ''"
                )
            )
        ).fetchall()
    cities = set()
    for (address,) in rows:
        if "," in address:
            city_part = address.split(",")[-1].strip()
            city = re.sub(r"^\d{2}-\d{3}\s*", "", city_part)
            if city:
                cities.add(city)
    return sorted(cities)


@router.get("/api/city_coords/{city}", response_class=JSONResponse)
def get_city_coords(city: str):
    global _CITY_COORDS_CACHE

    if _CITY_COORDS_CACHE is None:
        if not CITY_COORDS_FILE.exists():
            raise HTTPException(status_code=404, detail="Coordinates file missing")
        try:
            with open(CITY_COORDS_FILE, "r", encoding="utf-8") as f:
                _CITY_COORDS_CACHE = json.load(f)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to load coordinates")

    for name, loc in _CITY_COORDS_CACHE.items():
        if name.lower() == city.lower():
            return {"lat": loc["lat"], "lon": loc["lon"]}

    raise HTTPException(status_code=404, detail="City not found")

