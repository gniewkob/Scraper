#!/usr/bin/env python3
"""Simple test script to verify new API endpoints work correctly."""

import asyncio
import json
from backend.routes.search import search_products, get_statistics, get_cities, get_best_deals

async def test_search_endpoint():
    """Test the search endpoint with various filters."""
    print("Testing search endpoint...")
    
    # Mock connection (in real usage, this would be a database connection)
    mock_conn = None
    
    try:
        # Test basic search
        result = await search_products(
            city="Warszawa",
            max_price=100.0,
            limit=10,
            offset=0,
            sort_by="price",
            sort_order="asc",
            conn=mock_conn
        )
        print(f"Search result: {json.dumps(result, indent=2, default=str)}")
        
    except Exception as e:
        print(f"Search test failed: {e}")

async def test_stats_endpoint():
    """Test the statistics endpoint."""
    print("\nTesting stats endpoint...")
    
    mock_conn = None
    
    try:
        result = await get_statistics(conn=mock_conn)
        print(f"Stats result: {json.dumps(result, indent=2, default=str)}")
        
    except Exception as e:
        print(f"Stats test failed: {e}")

async def test_cities_endpoint():
    """Test the cities endpoint."""
    print("\nTesting cities endpoint...")
    
    mock_conn = None
    
    try:
        result = await get_cities(conn=mock_conn)
        print(f"Cities result: {json.dumps(result, indent=2, default=str)}")
        
    except Exception as e:
        print(f"Cities test failed: {e}")

async def test_best_deals_endpoint():
    """Test the best deals endpoint."""
    print("\nTesting best deals endpoint...")
    
    mock_conn = None
    
    try:
        result = await get_best_deals(limit=5, conn=mock_conn)
        print(f"Best deals result: {json.dumps(result, indent=2, default=str)}")
        
    except Exception as e:
        print(f"Best deals test failed: {e}")

async def main():
    """Run all tests."""
    print("Starting API endpoint tests...")
    
    await test_search_endpoint()
    await test_stats_endpoint()
    await test_cities_endpoint()
    await test_best_deals_endpoint()
    
    print("\nAll tests completed!")

if __name__ == "__main__":
    asyncio.run(main())


