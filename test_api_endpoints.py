#!/usr/bin/env python3
"""Test script to verify the new API endpoints work correctly."""

import asyncio
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
        print("✅ Search endpoint test passed")
        print(f"   Response structure: {list(result.keys())}")
        
    except Exception as e:
        print(f"❌ Search test failed: {e}")

async def test_stats_endpoint():
    """Test the statistics endpoint."""
    print("\nTesting stats endpoint...")
    
    mock_conn = None
    
    try:
        result = await get_statistics(conn=mock_conn)
        print("✅ Stats endpoint test passed")
        print(f"   Response structure: {list(result.keys())}")
        
    except Exception as e:
        print(f"❌ Stats test failed: {e}")

async def test_cities_endpoint():
    """Test the cities endpoint."""
    print("\nTesting cities endpoint...")
    
    mock_conn = None
    
    try:
        result = await get_cities(conn=mock_conn)
        print("✅ Cities endpoint test passed")
        print(f"   Response structure: {list(result.keys()) if result else 'Empty'}")
        
    except Exception as e:
        print(f"❌ Cities test failed: {e}")

async def test_best_deals_endpoint():
    """Test the best deals endpoint."""
    print("\nTesting best deals endpoint...")
    
    mock_conn = None
    
    try:
        result = await get_best_deals(limit=5, conn=mock_conn)
        print("✅ Best deals endpoint test passed")
        print(f"   Response structure: {list(result.keys()) if result else 'Empty'}")
        
    except Exception as e:
        print(f"❌ Best deals test failed: {e}")

async def main():
    """Run all tests."""
    print("🚀 Starting API endpoint tests...")
    print("=" * 50)
    
    await test_search_endpoint()
    await test_stats_endpoint()
    await test_cities_endpoint()
    await test_best_deals_endpoint()
    
    print("\n" + "=" * 50)
    print("✨ All tests completed!")

if __name__ == "__main__":
    asyncio.run(main())

