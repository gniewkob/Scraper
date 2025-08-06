import os
from pathlib import Path

# Ścieżka do pliku SQLite (w katalogu dashboard) lub z zmiennej środowiskowej
DB_PATH = os.getenv(
    "DB_PATH",
    str(Path(__file__).resolve().parents[3] / "data" / "pharmacy_prices.sqlite"),
)

# Maksymalny czas oczekiwania na załadowanie strony (w sekundach)
PAGE_LOAD_TIMEOUT = 20

# Domyślny tryb uruchomienia przeglądarki (możesz nadpisać w main.py przez CLI)
DEFAULT_HEADLESS = os.getenv("HEADLESS", "false").lower() in {"1", "true", "yes"}
