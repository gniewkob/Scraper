#!/usr/bin/env python3
"""Migrate products table from SQLite to PostgreSQL."""

import sqlite3
import psycopg2
from datetime import datetime

# PostgreSQL connection
PG_HOST = "pgsql0.mydevil.net"
PG_PORT = 5432
PG_DB = "p11522_scraper"
PG_USER = "p11522_scraper"
PG_PASS = "k_y7_g5WM[8rb{OlgTOElFO15KYk47"

# SQLite connection
SQLITE_DB = "data/pharmacy_prices.sqlite"

def create_slug(name):
    """Create URL-friendly slug from product name."""
    import re
    slug = name.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

def migrate_products():
    """Migrate products from SQLite to PostgreSQL."""
    
    # Connect to SQLite
    sqlite_conn = sqlite3.connect(SQLITE_DB)
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cur = sqlite_conn.cursor()
    
    # Connect to PostgreSQL
    pg_conn = psycopg2.connect(
        host=PG_HOST,
        port=PG_PORT,
        database=PG_DB,
        user=PG_USER,
        password=PG_PASS
    )
    pg_cur = pg_conn.cursor()
    
    try:
        # Get products from SQLite
        sqlite_cur.execute("SELECT product_id, name FROM products")
        products = sqlite_cur.fetchall()
        
        print(f"Found {len(products)} products in SQLite")
        
        # Current timestamp
        now = datetime.now()
        
        # Insert/update products
        for product in products:
            slug = create_slug(product['name'])
            pg_cur.execute("""
                INSERT INTO products (id, slug, name, active, first_seen, last_seen) 
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    slug = EXCLUDED.slug,
                    last_seen = EXCLUDED.last_seen
            """, (
                int(product['product_id']), 
                slug, 
                product['name'], 
                True,
                now,
                now
            ))
        
        pg_conn.commit()
        
        # Verify
        pg_cur.execute("SELECT COUNT(*) FROM products")
        count = pg_cur.fetchone()[0]
        print(f"Successfully migrated {count} products to PostgreSQL")
        
        # Show some products
        pg_cur.execute("SELECT id, slug, name FROM products ORDER BY id LIMIT 5")
        print("\nSample products:")
        for row in pg_cur.fetchall():
            print(f"  ID {row[0]}: {row[2]} (slug: {row[1]})")
        
    except Exception as e:
        print(f"Error: {e}")
        pg_conn.rollback()
    finally:
        sqlite_conn.close()
        pg_conn.close()

if __name__ == "__main__":
    migrate_products()
