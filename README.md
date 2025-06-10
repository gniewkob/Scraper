# Pharmacy Price Verification & Dashboard

**Kompleksowe rozwiązanie do automatycznego scrapingu, weryfikacji i prezentacji cen leków oraz ofert aptek.**

---

## 1. Scraper & Test Automation (lokalnie, Mac/PC)

**Katalog:** `/home/vetternkraft/scraper_workspace/scraper/`

Modularny framework Selenium do pobierania i walidacji ofert aptecznych, obsługujący dynamiczne strony (renderowane JS).  
Zawiera automatyczne testy Pytest, logowanie, zrzuty ekranu i raportowanie wyników.

**Uruchamianie:**
```bash
cd ~/scraper_workspace/scraper/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pytest
# or: python -m scraper.cli.scrape_all
```

**Wyniki działania:**

* Szczegółowe logi i raporty (HTML/console)
* Zrzuty ekranu błędów (error\_screenshots/)
* Dane w formie JSON oraz finalnie w bazie SQLite:
  **`~/scraper_workspace/scraper/pharmacy_prices.sqlite`**

---

## 2. Synchronizacja danych na serwer (rsync)

Po zakończeniu scrapingu/testów, **baza SQLite** jest przesyłana na serwer:

```bash
rsync -av ~/scraper_workspace/scraper/pharmacy_prices.sqlite \
  vetternkraft@server:/home/vetternkraft/scraper_workspace/data/pharmacy_prices.sqlite
```

*Baza ląduje w katalogu `/home/vetternkraft/scraper_workspace/data/`.*

---

## 3. Backend Dashboard & API (na serwerze, MyDevil)

**Katalog:** `/home/vetternkraft/scraper_workspace/backend/`

Aplikacja FastAPI udostępniająca REST API oraz dashboard (w przyszłości nowoczesny frontend).
Korzysta z bazy SQLite synchronizowanej powyżej.

### Aktywacja środowiska Python (virtualenv):

```bash
alias workon_scraper="source ~/.virtualenvs/scraper/bin/activate"
workon_scraper
```

### Uruchomienie backendu:

```bash
cd ~/scraper_workspace/backend/
uvicorn main:app --host 127.0.0.1 --port 61973
```

* Domyślna ścieżka do bazy: `../data/pharmacy_prices.sqlite`
* Aplikacja nasłuchuje tylko na localhost (reverse proxy polecane do wystawienia na domenę).

---

## 4. Struktura katalogów projektu

```
/home/vetternkraft/scraper_workspace/
├── backend/         # FastAPI, API, dashboard
│   ├── main.py
│   ├── db.py
│   └── __init__.py
├── scraper/         # Selenium scraper, testy, moduły
│   ├── main.py
│   └── ...
├── data/            # Baza SQLite (synchronizowana)
│   └── pharmacy_prices.sqlite
├── requirements.txt # Główne wymagania backendu (FastAPI, uvicorn, itp.)
├── README.md
└── ...
```

---

## 5. Dostępne endpointy API

* `/api/offers?city=Miasto&product=Produkt&min_price=20&max_price=50`
* `/api/products`
* `/api/cities`

Przykład użycia:

```
GET http://localhost:61973/api/offers?city=Warszawa&product=Ibuprofen
```

---

## 6. FAQ i wskazówki

* **Backend działa na porcie 61973** – aby udostępnić publicznie, ustaw reverse proxy w panelu MyDevil lub własnym Apache/nginx.
* **Aby backend korzystał z najnowszych danych**, synchronizuj bazę po każdym scrapingu (rsync).
* **Selenium/testy i pobieranie danych uruchamiaj wyłącznie lokalnie** (ze wsparciem X/Chrome).
* **Wymagania backendu**: FastAPI, Uvicorn (`pip install -r requirements.txt`)
* **Wszystkie polecenia zakładają katalog główny:**
  `/home/vetternkraft/scraper_workspace/`

---

## 7. TODO / Plany rozwojowe

* [ ] Nowoczesny frontend (React/Vue/Svelte)
* [ ] Mapy i geolokalizacja (Leaflet.js, promień, marker najbliższej apteki)
* [ ] Panel administracyjny (edycja produktów/ofert)
* [ ] Alerty cenowe (email/SMS/webhook)
* [ ] Publiczne API dla zewnętrznych aplikacji

---

**Masz pytania lub chcesz rozwinąć projekt?**
Odezwij się przez GitHub/e-mail lub zgłoś issue w repozytorium!

```

---