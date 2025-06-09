from pathlib import Path

# Ścieżka do pliku SQLite (w katalogu dashboard)
DB_PATH = Path("pharmacy_prices.sqlite")

# Maksymalny czas oczekiwania na załadowanie strony (w sekundach)
PAGE_LOAD_TIMEOUT = 20

# Domyślny tryb uruchomienia przeglądarki (możesz nadpisać w main.py przez CLI)
DEFAULT_HEADLESS = False

# Minimalna rozsadna cena
MINIMUM_DISPLAY_PRICE=10
