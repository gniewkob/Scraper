"""Geokodowanie adresów aptek zapisanych w bazie.

Obsługuje zarówno lokalne SQLite jak i zewnętrzną bazę poprzez
SQLAlchemy. W przypadku konfiguracji API skrypt informuje, że operacja
nie jest wspierana.
"""

import sqlite3
import requests
import time
from urllib.parse import quote

from scraper.core.config.config import DB_PATH, DB_URL, API_URL

ENGINE = None
if DB_URL:
    try:
        from sqlalchemy import create_engine

        ENGINE = create_engine(DB_URL)
    except Exception as e:
        print(f"Nie udało się utworzyć silnika do bazy ({DB_URL}): {e}")
        ENGINE = None

def geocode_address(address):
	"""Zwraca (lat, lon) dla podanego adresu albo (None, None) jeśli nie znalazł."""
	if not address:
		return None, None
	url = f"https://nominatim.openstreetmap.org/search?format=json&q={quote(address)}"
	try:
		headers = {'User-Agent': 'pharmacy-scraper/1.0'}
		resp = requests.get(url, headers=headers, timeout=15)
		data = resp.json()
		if data:
			return float(data[0]['lat']), float(data[0]['lon'])
	except Exception as e:
		print(f"Geocode error: {e} dla adresu: {address}")
	return None, None

def main():
        if API_URL:
                print("Konfiguracja API nie obsługuje lokalnego geokodowania.")
                return

        if ENGINE:
                from sqlalchemy import text

                with ENGINE.begin() as conn:
                        # Sprawdź istnienie kolumn
                        result = conn.execute(text("PRAGMA table_info(pharmacy_prices)"))
                        columns = [row[1] for row in result]
                        if "pharmacy_lat" not in columns or "pharmacy_lon" not in columns:
                                print("Dodaję kolumny pharmacy_lat i pharmacy_lon…")
                                try:
                                        conn.execute(text("ALTER TABLE pharmacy_prices ADD COLUMN pharmacy_lat REAL"))
                                except Exception:
                                        pass
                                try:
                                        conn.execute(text("ALTER TABLE pharmacy_prices ADD COLUMN pharmacy_lon REAL"))
                                except Exception:
                                        pass

                        pharmacies = conn.execute(
                                text(
                                        """
                                        SELECT DISTINCT pharmacy_name, address
                                        FROM pharmacy_prices
                                        WHERE (pharmacy_lat IS NULL OR pharmacy_lon IS NULL)
                                          AND address IS NOT NULL AND address != ''
                                        """
                                )
                        ).fetchall()

                        print(f"Do geokodowania: {len(pharmacies)} adresów.")

                        for i, row in enumerate(pharmacies):
                                pharmacy, address = row[0], row[1]
                                address_clean = address.split('https://')[0].strip() if 'https://' in address else address

                                lat, lon = geocode_address(address_clean)
                                if lat is None or lon is None:
                                        print(f"Próba geokodowania samego miasta z adresu: {address_clean}")
                                        if ',' in address_clean:
                                                city = address_clean.split(',')[-1].strip()
                                                lat, lon = geocode_address(city)

                                if lat is not None and lon is not None:
                                        print(f"[{i+1}/{len(pharmacies)}] {pharmacy}: {address_clean} => {lat}, {lon}")
                                        conn.execute(
                                                text(
                                                        """
                                                        UPDATE pharmacy_prices
                                                        SET pharmacy_lat = :lat, pharmacy_lon = :lon
                                                        WHERE pharmacy_name = :pharmacy AND address = :address
                                                        """
                                                ),
                                                {
                                                        "lat": lat,
                                                        "lon": lon,
                                                        "pharmacy": pharmacy,
                                                        "address": address,
                                                },
                                        )
                                else:
                                        print(f"[{i+1}/{len(pharmacies)}] NIE ZNALEZIONO: {pharmacy}: {address_clean}")

                                time.sleep(1.05)

                print("✅ Geokodowanie zakończone. Możesz już korzystać z filtrowania po lokalizacji w backendzie.")
                return

        # Fallback do lokalnego SQLite
        conn = sqlite3.connect(str(DB_PATH))
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        # Sprawdź czy mamy już kolumny lat/lon
        cur.execute("PRAGMA table_info(pharmacy_prices)")
        columns = [row['name'] for row in cur.fetchall()]
        if "pharmacy_lat" not in columns or "pharmacy_lon" not in columns:
                print("Dodaję kolumny pharmacy_lat i pharmacy_lon…")
                try:
                        cur.execute("ALTER TABLE pharmacy_prices ADD COLUMN pharmacy_lat REAL")
                except sqlite3.OperationalError:
                        pass
                try:
                        cur.execute("ALTER TABLE pharmacy_prices ADD COLUMN pharmacy_lon REAL")
                except sqlite3.OperationalError:
                        pass
                conn.commit()

        # Pobierz unikalne apteka+adres (po co robić to samo kilka razy)
        cur.execute(
                """
                SELECT DISTINCT pharmacy_name, address
                FROM pharmacy_prices
                WHERE (pharmacy_lat IS NULL OR pharmacy_lon IS NULL)
                  AND address IS NOT NULL AND address != ''
                """
        )
        pharmacies = cur.fetchall()
        print(f"Do geokodowania: {len(pharmacies)} adresów.")

        for i, row in enumerate(pharmacies):
                pharmacy, address = row['pharmacy_name'], row['address']
                address_clean = address.split('https://')[0].strip() if 'https://' in address else address

                lat, lon = geocode_address(address_clean)
                if lat is None or lon is None:
                        print(f"Próba geokodowania samego miasta z adresu: {address_clean}")
                        if ',' in address_clean:
                                city = address_clean.split(',')[-1].strip()
                                lat, lon = geocode_address(city)

                if lat is not None and lon is not None:
                        print(f"[{i+1}/{len(pharmacies)}] {pharmacy}: {address_clean} => {lat}, {lon}")
                        # Zaktualizuj WSZYSTKIE rekordy tej apteki/adresu
                        cur.execute(
                                """
                                UPDATE pharmacy_prices
                                SET pharmacy_lat = ?, pharmacy_lon = ?
                                WHERE pharmacy_name = ? AND address = ?
                                """,
                                (lat, lon, pharmacy, address),
                        )
                        conn.commit()
                else:
                        print(f"[{i+1}/{len(pharmacies)}] NIE ZNALEZIONO: {pharmacy}: {address_clean}")

                time.sleep(1.05)  # szanuj limity Nominatim!

        print("✅ Geokodowanie zakończone. Możesz już korzystać z filtrowania po lokalizacji w backendzie.")
        conn.close()

if __name__ == "__main__":
	main()
