import sqlite3
import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture()
def client_with_data(migrated_db):
    """Create a test client with sample data in the database."""
    conn = sqlite3.connect(migrated_db)
    
    # Insert sample product
    conn.execute("""
        INSERT INTO products (id, slug, name, active, first_seen, last_seen) 
        VALUES (1, 'test-product', 'Test Product', 1, '2023-01-01', '2023-01-01')
    """)
    
    # Insert sample pharmacy prices
    conn.execute("""
        INSERT INTO pharmacy_prices 
        (id, product_id, pharmacy_name, address, price, unit, expiration, fetched_at, availability, updated, map_url)
        VALUES 
        (1, 1, 'Pharmacy A', '123 Main St, Warsaw', 100.0, 'g', '2024-12-31', '2023-01-01T10:00:00', 'Available', '2 hours ago', 'https://maps.google.com/?q=123+Main+St,+Warsaw'),
        (2, 1, 'Pharmacy B', '456 Oak Ave, Krakow', 95.0, 'g', '2024-12-31', '2023-01-01T10:00:00', 'Available', '1 hour ago', 'https://maps.google.com/?q=456+Oak+Ave,+Krakow')
    """)
    
    conn.commit()
    conn.close()

    with TestClient(app) as c:
        yield c


def test_medical_search_products(client_with_data):
    """Test the medical search endpoint with real database data."""
    response = client_with_data.get('/api/search')
    assert response.status_code == 200
    data = response.json()
    
    # Verify the response structure
    assert 'products' in data
    assert 'total_count' in data
    assert 'avg_price' in data
    assert 'lowest_price' in data
    assert 'highest_price' in data
    
    # Verify we got products from the database
    assert len(data['products']) > 0
    assert data['total_count'] > 0
    
    # Verify product structure
    product = data['products'][0]
    assert 'id' in product
    assert 'name' in product
    assert 'strain_type' in product
    assert 'thc_content' in product
    assert 'cbd_content' in product
    assert 'price' in product
    assert 'dispensary' in product
    assert 'location' in product
    assert 'availability' in product
    assert 'rating' in product


def test_medical_search_products_with_city_filter(client_with_data):
    """Test the medical search endpoint with city filter."""
    response = client_with_data.get('/api/search?city=warsaw')
    assert response.status_code == 200
    data = response.json()
    
    # Verify we got products filtered by city
    assert len(data['products']) > 0
    # All products should be from Warsaw
    for product in data['products']:
        assert 'warsaw' in product['location'].lower()


def test_medical_search_products_with_price_filter(client_with_data):
    """Test the medical search endpoint with price filter."""
    response = client_with_data.get('/api/search?max_price=98')
    assert response.status_code == 200
    data = response.json()
    
    # Verify we got products filtered by price
    assert len(data['products']) > 0
    # All products should be <= 98
    for product in data['products']:
        assert product['price'] <= 98


def test_medical_stats(client_with_data):
    """Test the medical stats endpoint with real database data."""
    response = client_with_data.get('/api/stats')
    assert response.status_code == 200
    data = response.json()
    
    # Verify the response structure
    assert 'total_products' in data
    assert 'total_dispensaries' in data
    assert 'avg_price' in data
    assert 'cities_covered' in data
    assert 'last_updated' in data
    
    # Verify we got real data
    assert data['total_products'] >= 0
    assert data['total_dispensaries'] >= 0
    assert data['avg_price'] >= 0
    assert data['cities_covered'] >= 0


def test_medical_cities(client_with_data):
    """Test the medical cities endpoint."""
    response = client_with_data.get('/api/medical/cities')
    assert response.status_code == 200
    data = response.json()
    
    # Verify we got a list of cities
    assert isinstance(data, list)
    # The cities should come from the backend.cities module
    assert len(data) > 0


def test_medical_get_product(client_with_data):
    """Test getting a specific product by ID."""
    response = client_with_data.get('/api/products/1')
    assert response.status_code == 200
    data = response.json()
    
    # Verify the response structure
    assert 'id' in data
    assert 'name' in data
    assert 'strain_type' in data
    assert 'thc_content' in data
    assert 'cbd_content' in data
    assert 'price' in data
    assert 'dispensary' in data
    assert 'location' in data
    assert 'availability' in data
    assert 'rating' in data
    
    # Verify we got the correct product
    assert data['id'] == '1'


def test_medical_get_product_not_found(client_with_data):
    """Test getting a non-existent product."""
    response = client_with_data.get('/api/products/999')
    assert response.status_code == 404


def test_medical_get_products_by_city(client_with_data):
    """Test getting products by city."""
    response = client_with_data.get('/api/products/city/warsaw')
    assert response.status_code == 200
    data = response.json()
    
    # Verify we got a list of products
    assert isinstance(data, list)
    # All products should be from Warsaw
    for product in data:
        assert 'warsaw' in product['location'].lower()


def test_medical_get_best_deals(client_with_data):
    """Test getting best deals."""
    response = client_with_data.get('/api/deals/best?limit=5')
    assert response.status_code == 200
    data = response.json()
    
    # Verify we got a list of products
    assert isinstance(data, list)
    # Products should be sorted by price (ascending)
    if len(data) > 1:
        for i in range(len(data) - 1):
            assert data[i]['price'] <= data[i + 1]['price']