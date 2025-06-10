import sqlite3
import re
from scraper.core.config.config import DB_PATH


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def get_offers(city=None, product=None, min_price=None, max_price=None):
    conn = get_connection()
    query = """
        SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url, 
               p.product_id, pr.name as product_name
        FROM pharmacy_prices p
        LEFT JOIN products pr ON p.product_id = pr.product_id
        WHERE 1=1
    """
    params = []
    if city:
        query += " AND lower(p.address) LIKE ?"
        params.append(f"%{city.lower()}%")
    if product:
        query += " AND lower(pr.name) LIKE ?"
        params.append(f"%{product.lower()}%")
    if min_price is not None:
        query += " AND p.price >= ?"
        params.append(min_price)
    if max_price is not None:
        query += " AND p.price <= ?"
        params.append(max_price)
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_products():
    conn = get_connection()
    rows = conn.execute("SELECT product_id, name FROM products").fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_cities():
    conn = get_connection()
    rows = conn.execute("SELECT DISTINCT address FROM pharmacy_prices").fetchall()
    conn.close()
    # Wyłuskuj miasto regexem z adresu typu "XX-XXX Miasto"
    cities = set()
    city_regex = re.compile(r"\d{2}-\d{3}\s+([\wąćęłńóśźżA-Z]+)", re.IGNORECASE)
    for row in rows:
        address = row["address"]
        match = city_regex.search(address or "")
        if match:
            cities.add(match.group(1))
    return sorted(list(cities))
