import asyncio
import sys
sys.path.insert(0, '/usr/home/vetternkraft/apps/python/scraper_workspace')

from backend.db import get_engine
from sqlalchemy import text

async def test_cities():
    """Test extracting cities from addresses."""
    engine = get_engine()
    async with engine.begin() as conn:
        rows = (await conn.execute(text("SELECT DISTINCT address FROM pharmacy_prices WHERE address IS NOT NULL LIMIT 100"))).all()
    
    cities = set()
    for (address,) in rows:
        if address and ', ' in address:
            # Format: "ulica, miasto"
            parts = address.rsplit(', ', 1)
            if len(parts) == 2:
                city = parts[1].strip()
                if city:
                    cities.add(city)
    
    print(f"Found {len(cities)} cities:")
    for city in sorted(list(cities))[:20]:
        print(f"  - {city}")

asyncio.run(test_cities())
