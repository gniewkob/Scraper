"""
Moduł inicjalizacyjny dla `modules`:
- Eksportuje funkcje i klasy używane w innych częściach systemu
"""

from .browser import setup_browser
from .data_extractor import (
    extract_pharmacy_listing_data,
    DataExtractionError
)
from .price_validator import verify_price
