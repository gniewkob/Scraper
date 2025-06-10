import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture(scope="module")
def client():
    """Create a TestClient for the FastAPI app."""
    with TestClient(app) as c:
        yield c


def test_get_products(client):
    response = client.get('/api/products')
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)
    assert products, 'Product list should not be empty'
    assert {'name', 'label'} <= set(products[0].keys())


def test_get_product_by_name(client):
    products = client.get('/api/products').json()
    product_name = products[0]['name']
    response = client.get(f'/api/product/{product_name}')
    assert response.status_code == 200
    data = response.json()
    assert 'offers' in data
    assert 'total' in data
    assert isinstance(data['offers'], list)


def test_get_product_not_found(client):
    response = client.get('/api/product/non-existent-product')
    assert response.status_code == 404


def test_get_cities(client):
    response = client.get('/api/cities')
    assert response.status_code == 200
    cities = response.json()
    assert isinstance(cities, list)
    assert cities, 'Cities list should not be empty'
    assert isinstance(cities[0], str)
