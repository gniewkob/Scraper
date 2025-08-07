import os
from pathlib import Path

# Ścieżka do pliku SQLite (w katalogu dashboard) lub z zmiennej środowiskowej
DB_PATH = os.getenv(
    "DB_PATH",
    str(Path(__file__).resolve().parents[3] / "data" / "pharmacy_prices.sqlite"),
)

# Ustawienia połączeń zewnętrznych baz/API
# --------------------------------------------------
# Typ bazy danych (sqlite, postgresql, mysql, api)
DB_TYPE = os.getenv("DB_TYPE", "sqlite")

# Pełny URL połączenia, jeśli podany ma pierwszeństwo
DB_URL = os.getenv("DB_URL")

# Konfiguracja składowa (host, port, poświadczenia)
DB_HOST = os.getenv("DB_HOST", "")
DB_PORT = os.getenv("DB_PORT", "")
DB_USER = os.getenv("DB_USER", "")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "")

# Jeśli nie podano DB_URL, zbuduj go z parametrów powyżej
if not DB_URL and DB_TYPE != "sqlite" and DB_HOST:
    auth = f"{DB_USER}:{DB_PASSWORD}@" if DB_USER or DB_PASSWORD else ""
    port = f":{DB_PORT}" if DB_PORT else ""
    DB_URL = f"{DB_TYPE}://{auth}{DB_HOST}{port}/{DB_NAME}"

# Punkt końcowy API (jeśli wysyłamy dane przez HTTP)
API_URL = os.getenv("API_URL")

# Maksymalny czas oczekiwania na załadowanie strony (w sekundach)
PAGE_LOAD_TIMEOUT = 20

# Domyślny tryb uruchomienia przeglądarki (możesz nadpisać w main.py przez CLI)
DEFAULT_HEADLESS = os.getenv("HEADLESS", "false").lower() in {"1", "true", "yes"}

# Lista proxy (np. "http://host1:port1,http://host2:port2") lub ścieżka do pliku z proxy
PROXY_FILE = os.getenv("PROXY_FILE")
if PROXY_FILE and Path(PROXY_FILE).exists():
    with open(PROXY_FILE, "r", encoding="utf-8") as pf:
        PROXIES = [line.strip() for line in pf if line.strip()]
else:
    proxy_env = os.getenv("PROXY_LIST", "")
    PROXIES = [p.strip() for p in proxy_env.split(",") if p.strip()]
