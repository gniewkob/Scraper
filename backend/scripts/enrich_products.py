#!/usr/bin/env python3
"""Script to enrich product data with missing information for frontend integration.

This script analyzes product names and descriptions to:
1. Determine strain types (indica, sativa, hybrid)
2. Extract THC/CBD content percentages
3. Categorize products by medical use
4. Update the database with enriched information
"""

import asyncio
import logging
import re
from typing import Dict, List, Optional, Tuple
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncConnection

from backend.db import get_connection

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Product classification patterns
STRAIN_PATTERNS = {
    "indica": [
        r"indica",
        r"kush",
        r"og",
        r"purple",
        r"afghan",
        r"hash",
        r"northern lights",
        r"blueberry",
        r"granddaddy",
        r"bubba"
    ],
    "sativa": [
        r"sativa",
        r"haze",
        r"durban",
        r"jack",
        r"lemon",
        r"orange",
        r"mango",
        r"amnesia",
        r"super silver",
        r"green crack"
    ],
    "hybrid": [
        r"hybrid",
        r"skunk",
        r"white",
        r"trainwreck",
        r"girl scout",
        r"wedding cake",
        r"gelato",
        r"cookies",
        r"runtz",
        r"mimosa"
    ]
}

# THC/CBD content extraction patterns
THC_PATTERNS = [
    r"thc[:\s]*(\d+(?:\.\d+)?)",
    r"(\d+(?:\.\d+)?)\s*%?\s*thc",
    r"thc\s*(\d+(?:\.\d+)?)",
    r"(\d+(?:\.\d+)?)\s*thc"
]

CBD_PATTERNS = [
    r"cbd[:\s]*(\d+(?:\.\d+)?)",
    r"(\d+(?:\.\d+)?)\s*%?\s*cbd",
    r"cbd\s*(\d+(?:\.\d+)?)",
    r"(\d+(?:\.\d+)?)\s*cbd"
]

# Product categories
PRODUCT_CATEGORIES = {
    "flower": ["flos", "flower", "bud", "herb"],
    "extract": ["extract", "oil", "concentrate", "wax", "shatter"],
    "edible": ["edible", "gummy", "chocolate", "cookie"],
    "topical": ["topical", "cream", "ointment", "salve"],
    "tincture": ["tincture", "drops", "sublingual"]
}


def classify_strain_type(product_name: str) -> str:
    """Classify product as indica, sativa, or hybrid based on name patterns."""
    product_name_lower = product_name.lower()
    
    # Count matches for each strain type
    strain_scores = {}
    for strain_type, patterns in STRAIN_PATTERNS.items():
        score = 0
        for pattern in patterns:
            if re.search(pattern, product_name_lower):
                score += 1
        strain_scores[strain_type] = score
    
    # Return the strain type with highest score, or "unknown" if no matches
    if not any(strain_scores.values()):
        return "unknown"
    
    return max(strain_scores.items(), key=lambda x: x[1])[0]


def extract_thc_content(product_name: str) -> Optional[float]:
    """Extract THC content percentage from product name."""
    product_name_lower = product_name.lower()
    
    for pattern in THC_PATTERNS:
        match = re.search(pattern, product_name_lower)
        if match:
            try:
                return float(match.group(1))
            except (ValueError, TypeError):
                continue
    
    return None


def extract_cbd_content(product_name: str) -> Optional[float]:
    """Extract CBD content percentage from product name."""
    product_name_lower = product_name.lower()
    
    for pattern in CBD_PATTERNS:
        match = re.search(pattern, product_name_lower)
        if match:
            try:
                return float(match.group(1))
            except (ValueError, TypeError):
                continue
    
    return None


def categorize_product(product_name: str) -> str:
    """Categorize product by type based on name patterns."""
    product_name_lower = product_name.lower()
    
    for category, patterns in PRODUCT_CATEGORIES.items():
        for pattern in patterns:
            if pattern in product_name_lower:
                return category
    
    return "unknown"


async def enrich_products(conn: AsyncConnection) -> None:
    """Enrich all products with missing information."""
    
    # Get all products
    products_query = "SELECT id, name FROM products WHERE active = true"
    products = (await conn.execute(text(products_query))).mappings().all()
    
    logger.info(f"Found {len(products)} active products to enrich")
    
    enriched_count = 0
    for product in products:
        product_id = product["id"]
        product_name = product["name"]
        
        # Analyze product name
        strain_type = classify_strain_type(product_name)
        thc_content = extract_thc_content(product_name)
        cbd_content = extract_cbd_content(product_name)
        category = categorize_product(product_name)
        
        # Update product with enriched data
        update_query = """
            UPDATE products 
            SET strain_type = :strain_type,
                thc_content = :thc_content,
                cbd_content = :cbd_content,
                category = :category
            WHERE id = :product_id
        """
        
        await conn.execute(text(update_query), {
            "strain_type": strain_type,
            "thc_content": thc_content,
            "cbd_content": cbd_content,
            "category": category,
            "product_id": product_id
        })
        
        enriched_count += 1
        
        if enriched_count % 10 == 0:
            logger.info(f"Enriched {enriched_count}/{len(products)} products")
    
    await conn.commit()
    logger.info(f"Successfully enriched {enriched_count} products")


async def update_pharmacy_ratings(conn: AsyncConnection) -> None:
    """Update pharmacy ratings based on price consistency and availability."""
    
    # Get pharmacy statistics
    pharmacy_stats_query = """
        SELECT 
            pharmacy_name,
            COUNT(*) as total_offers,
            AVG(price) as avg_price,
            STDDEV(price) as price_std,
            COUNT(CASE WHEN availability = 'available' THEN 1 END) as available_count
        FROM pharmacy_prices 
        WHERE price > 0
        GROUP BY pharmacy_name
        HAVING COUNT(*) >= 5
    """
    
    pharmacy_stats = (await conn.execute(text(pharmacy_stats_query))).mappings().all()
    
    logger.info(f"Calculating ratings for {len(pharmacy_stats)} pharmacies")
    
    for pharmacy in pharmacy_stats:
        pharmacy_name = pharmacy["pharmacy_name"]
        total_offers = pharmacy["total_offers"]
        avg_price = pharmacy["avg_price"]
        price_std = pharmacy["price_std"] or 0
        available_count = pharmacy["available_count"]
        
        # Calculate rating based on multiple factors
        # 1. Price consistency (lower std dev = higher rating)
        price_consistency = max(0, 5 - (price_std / avg_price * 10)) if avg_price > 0 else 3
        
        # 2. Availability (higher availability = higher rating)
        availability_score = (available_count / total_offers) * 5 if total_offers > 0 else 3
        
        # 3. Offer volume (more offers = slight rating boost)
        volume_score = min(5, 3 + (total_offers / 20))
        
        # Calculate final rating
        final_rating = (price_consistency + availability_score + volume_score) / 3
        
        # Update pharmacy rating
        update_query = """
            UPDATE pharmacy_prices 
            SET pharmacy_rating = :rating
            WHERE pharmacy_name = :pharmacy_name
        """
        
        await conn.execute(text(update_query), {
            "rating": round(final_rating, 1),
            "pharmacy_name": pharmacy_name
        })
    
    await conn.commit()
    logger.info("Successfully updated pharmacy ratings")


async def update_availability_status(conn: AsyncConnection) -> None:
    """Update availability status based on existing availability field."""
    
    # Map existing availability values to standardized status
    availability_mapping = {
        "available": "available",
        "in stock": "available",
        "dostępny": "available",
        "out of stock": "out_of_stock",
        "niedostępny": "out_of_stock",
        "unavailable": "out_of_stock"
    }
    
    # Update availability_status based on availability field
    update_query = """
        UPDATE pharmacy_prices 
        SET availability_status = CASE 
            WHEN availability IS NULL THEN 'unknown'
            WHEN LOWER(availability) IN ('available', 'in stock', 'dostępny') THEN 'available'
            WHEN LOWER(availability) IN ('out of stock', 'niedostępny', 'unavailable') THEN 'out_of_stock'
            ELSE 'unknown'
        END
        WHERE availability_status IS NULL
    """
    
    await conn.execute(text(update_query))
    await conn.commit()
    logger.info("Successfully updated availability status")


async def main():
    """Main function to run all enrichment tasks."""
    logger.info("Starting product enrichment process...")
    
    conn = await get_connection()
    try:
        # Enrich products with strain types and content
        await enrich_products(conn)
        
        # Update pharmacy ratings
        await update_pharmacy_ratings(conn)
        
        # Update availability status
        await update_availability_status(conn)
        
        logger.info("Product enrichment completed successfully!")
        
    except Exception as e:
        logger.error(f"Enrichment failed: {e}")
        await conn.rollback()
        raise
    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(main())
