"""Tests for the FastAPI backend."""

import pytest
from fastapi.testclient import TestClient

from backend.main import app
import json


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


def test_alerts_grouped_city_filter(client):
    all_groups = client.get('/api/alerts_grouped').json()
    assert isinstance(all_groups, list)

    city = client.get('/api/cities').json()[0]
    city_groups = client.get(f'/api/alerts_grouped?city={city}').json()
    assert isinstance(city_groups, list)
    assert len(city_groups) <= len(all_groups)

    empty_groups = client.get('/api/alerts_grouped?city=NonexistentCity').json()
    assert empty_groups == []


def test_register_alert_missing_field(client, monkeypatch, tmp_path):
    monkeypatch.setattr('backend.main.ALERT_FILE', tmp_path / 'alerts.json', raising=False)
    resp = client.post('/api/alerts/register', json={"email": "a@b.com", "threshold": 30})
    assert resp.status_code == 400


def test_register_alert_success(client, monkeypatch, tmp_path):
    monkeypatch.setattr('backend.main.ALERT_FILE', tmp_path / 'alerts.json', raising=False)
    data = {"email": "a@b.com", "threshold": 30, "product_name": "Test"}
    resp = client.post('/api/alerts/register', json=data)
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}
    with open(tmp_path / 'alerts.json', 'r', encoding='utf-8') as f:
        alerts = json.load(f)
    assert alerts[-1]["email"] == "a@b.com"

