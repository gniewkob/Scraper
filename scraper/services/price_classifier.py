import sqlite3
from datetime import datetime
import re
from typing import Dict, Optional, Tuple
import sys
from pathlib import Path
from scraper.core.config.config import DB_PATH

class PriceClassifier:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path

    def get_product_type(self, product: str) -> str:
        """Determine product type based on product name or mapping."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # Check existing mapping
            cursor.execute("""
                SELECT product_type 
                FROM product_type_mapping 
                WHERE product_id = ?
            """, (product,))
            result = cursor.fetchone()
            
            if result:
                return result[0]
                
            # Default to "default" type if no mapping exists
            return "default"

    def get_thresholds(self, product_type: str) -> Dict[str, float]:
        """Get price thresholds for given product type."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT super_deal, deal, normal
                FROM price_thresholds
                WHERE product_type = ?
                ORDER BY updated_at DESC
                LIMIT 1
            """, (product_type,))
            result = cursor.fetchone()
            
            if result:
                return {
                    "super_deal": result[0],
                    "deal": result[1],
                    "normal": result[2]
                }
            
            # Fallback to default thresholds
            cursor.execute("""
                SELECT super_deal, deal, normal
                FROM price_thresholds
                WHERE product_type = 'default'
                ORDER BY updated_at DESC
                LIMIT 1
            """)
            result = cursor.fetchone()
            return {
                "super_deal": result[0],
                "deal": result[1],
                "normal": result[2]
            }

    def normalize_price(self, price: str, unit: str) -> Tuple[float, str]:
        """Normalize price to standard unit."""
        try:
            price_value = float(price.replace(",", ".").replace(" zł", "").strip())
            
            # Handle gram units
            gram_match = re.search(r"(\d+)[ ]?g", unit)
            if gram_match:
                grams = int(gram_match.group(1))
                return price_value / grams, "1g"
                
            # Handle milliliter units
            ml_match = re.search(r"(\d+)[ ]?ml", unit)
            if ml_match:
                ml = int(ml_match.group(1))
                return price_value / ml, "1ml"
                
            return price_value, unit
            
        except (ValueError, AttributeError):
            return None, unit

    def is_historical_low(self, product: str, price: float) -> bool:
        """Check if price is at or near historical low."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT min_price
                FROM price_statistics
                WHERE product = ?
                ORDER BY calculated_at DESC
                LIMIT 1
            """, (product,))
            result = cursor.fetchone()
            
            if result and result[0]:
                min_price = float(result[0])
                # Consider within 5% of historical low as a historical low
                return price <= min_price * 1.05
            return False

    def classify_price(self, product: str, price: str, unit: str) -> Dict:
        """Classify price with extended information."""
        try:
            # Get product type and thresholds
            product_type = self.get_product_type(product)
            thresholds = self.get_thresholds(product_type)
            
            # Normalize price
            price_value, normalized_unit = self.normalize_price(price, unit)
            if price_value is None:
                return {"classification": "?", "error": "Invalid price format"}
            
            # Get base classification
            if price_value < thresholds["super_deal"]:
                classification = "🔥 super okazja"
            elif price_value < thresholds["deal"]:
                classification = "okazja"
            elif price_value < thresholds["normal"]:
                classification = "normalna cena"
            else:
                classification = "drogo"
                
            # Check if it's a historical low
            is_low = self.is_historical_low(product, price_value)
            
            return {
                "classification": classification,
                "normalized_price": price_value,
                "normalized_unit": normalized_unit,
                "product_type": product_type,
                "is_historical_low": is_low,
                "thresholds_used": thresholds
            }
            
        except Exception as e:
            return {"classification": "?", "error": str(e)}

    def update_price_classification(self, product: str, price: str, unit: str) -> None:
        """Update price classification in database."""
        classification_data = self.classify_price(product, price, unit)
        
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE price_history
                SET 
                    price_classification = ?,
                    normalized_price = ?,
                    normalized_unit = ?,
                    historical_low = ?
                WHERE product = ? AND price = ?
            """, (
                classification_data["classification"],
                classification_data["normalized_price"],
                classification_data["normalized_unit"],
                classification_data["is_historical_low"],
                product,
                price
            ))
            conn.commit()

 
def classify_price(price: float, unit: str) -> str:
    """
    Klasyfikuje cenę jednostkową jako:
    - < 20 zł → okazja
    - < 35 zł → dobra
    - < 40 zł → normalna
    - >= 40 zł → droga

    Obsługuje jednostki typu 10g → dzieli cenę przez 10
    """
    # przeskaluj jeśli np. cena jest za 10g
    if unit and unit.strip().lower() == "10g":
        price = price / 10

    if price < 20:
        return "okazja"
    elif price < 35:
        return "dobra"
    elif price < 40:
        return "normalna"
    else:
        return "droga"
            
            



