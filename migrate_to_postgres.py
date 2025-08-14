#!/usr/bin/env python3
"""Migrate SQLite data to PostgreSQL."""

import sqlite3
import psycopg2
from psycopg2.extras import execute_values
import sys

# PostgreSQL connection
PG_HOST = "pgsql0.mydevil.net"
PG_PORT = 5432
PG_DB = "p11522_scraper"
PG_USER = "p11522_scraper"
PG_PASS = "k_y7_g5WM[8rb{OlgTOElFO15KYk47"

# SQLite connection
SQLITE_DB = "data/pharmacy_prices.sqlite"

def migrate_data():
    """Migrate data from SQLite to PostgreSQL."""
    
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
        # First, check what we have in PostgreSQL
        pg_cur.execute("SELECT COUNT(*) FROM pharmacy_prices")
        pg_count = pg_cur.fetchone()[0]
        print(f"Current PostgreSQL records: {pg_count}")
        
        # Get data from SQLite
        sqlite_cur.execute("SELECT COUNT(*) FROM pharmacy_prices")
        sqlite_count = sqlite_cur.fetchone()[0]
        print(f"SQLite records to migrate: {sqlite_count}")
        
        # Clear PostgreSQL table (backup first if needed)
        response = input("Do you want to clear existing PostgreSQL data? (yes/no): ")
        if response.lower() == 'yes':
            pg_cur.execute("TRUNCATE TABLE pharmacy_prices CASCADE")
            print("PostgreSQL table cleared")
        
        # Fetch all SQLite data
        sqlite_cur.execute("""
            SELECT product_id, pharmacy_name, address, price, unit, 
                   expiration, fetched_at, availability, updated, 
                   map_url, pharmacy_lat, pharmacy_lon
            FROM pharmacy_prices
        """)
        
        rows = sqlite_cur.fetchall()
        
        # Prepare data for bulk insert
        data = []
        for row in rows:
            data.append((
                row['product_id'],
                row['pharmacy_name'],
                row['address'],
                row['price'],
                row['unit'],
                row['expiration'],
                row['fetched_at'],
                row['availability'],
                row['updated'],
                row['map_url'],
                row['pharmacy_lat'],
                row['pharmacy_lon']
            ))
        
        # Bulk insert into PostgreSQL
        print(f"Inserting {len(data)} records...")
        execute_values(
            pg_cur,
            """
            INSERT INTO pharmacy_prices 
            (product_id, pharmacy_name, address, price, unit, expiration, 
             fetched_at, availability, updated, map_url, pharmacy_lat, pharmacy_lon)
            VALUES %s
            ON CONFLICT (product_id, pharmacy_name, price, expiration, fetched_at) 
            DO UPDATE SET
                address = EXCLUDED.address,
                unit = EXCLUDED.unit,
                availability = EXCLUDED.availability,
                updated = EXCLUDED.updated,
                map_url = EXCLUDED.map_url,
                pharmacy_lat = EXCLUDED.pharmacy_lat,
                pharmacy_lon = EXCLUDED.pharmacy_lon
            """,
            data
        )
        
        pg_conn.commit()
        
        # Verify migration
        pg_cur.execute("SELECT COUNT(*) FROM pharmacy_prices")
        new_count = pg_cur.fetchone()[0]
        print(f"Migration complete! New PostgreSQL record count: {new_count}")
        
        # Check GPS coordinates
        pg_cur.execute("SELECT COUNT(*) FROM pharmacy_prices WHERE pharmacy_lat IS NOT NULL AND pharmacy_lon IS NOT NULL")
        gps_count = pg_cur.fetchone()[0]
        print(f"Records with GPS coordinates: {gps_count}")
        
    except Exception as e:
        print(f"Error during migration: {e}")
        pg_conn.rollback()
        sys.exit(1)
    finally:
        sqlite_conn.close()
        pg_conn.close()

if __name__ == "__main__":
    migrate_data()
