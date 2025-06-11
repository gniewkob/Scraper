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
# or: python -m scraper.cli.scrape_all --headless
```

Dodaj flagę `--headless`, aby uruchomić scraper bez otwierania okna przeglądarki.

**Wyniki działania:**

* Szczegółowe logi i raporty (HTML/console)
* Zrzuty ekranu błędów (error\_screenshots/)
* Dane w formie JSON oraz finalnie w bazie SQLite (`data/pharmacy_prices.sqlite`)
* ChromeDriver dostarcza `webdriver-manager`, dlatego binarka nie jest w repozytorium
* Baza `data/pharmacy_prices.sqlite` jest generowana podczas scrapingu

---

## 2. Synchronizacja danych na serwer (rsync)

Po zakończeniu scrapingu/testów, **baza SQLite** jest przesyłana na serwer:

```bash
rsync -av ~/scraper_workspace/scraper/pharmacy_prices.sqlite \
  vetternkraft@server:/home/vetternkraft/scraper_workspace/data/pharmacy_prices.sqlite
```

*Baza ląduje w katalogu `/home/vetternkraft/scraper_workspace/data/`.*

Skrypt `scraper/scrape_and_sync.sh` automatyzuje ten proces.
Zdalne dane możesz zmienić przez zmienne środowiskowe:

* `REMOTE_USER` – nazwa użytkownika (domyślnie `vetternkraft`)
* `REMOTE_HOST` – adres serwera (domyślnie `s0.mydevil.net`)
* `REMOTE_PATH` – ścieżka do pliku na serwerze
  (domyślnie `/home/vetternkraft/scraper_workspace/data/pharmacy_prices.sqlite`)

---

## 3. Backend Dashboard & API (na serwerze, MyDevil)

**Katalog:** `/home/vetternkraft/scraper_workspace/backend/`

Aplikacja FastAPI udostępniająca REST API oraz dashboard (w przyszłości nowoczesny frontend).
Korzysta z bazy SQLite synchronizowanej powyżej.

### Panel administracyjny

Po uruchomieniu backendu dostępny jest prosty panel pod adresem `/admin`. Panel wymaga zalogowania, a formularz logowania znajduje się pod `/admin/login`. Hasło podawane jest w zmiennej środowiskowej `ADMIN_PASSWORD` (domyślnie `admin`).
Hasło można ustawić np. tak:

```bash
export ADMIN_PASSWORD="moje_super_haslo"
```

Panel pozwala podejrzeć listę zapisanych alertów cenowych.
Użytkownik może zapisać się na alert cenowy z poziomu dashboardu,
wskazując konkretny produkt oraz maksymalną cenę.

Do wysyłki powiadomień służy skrypt `scraper/cli/check_alerts.py`. Uruchomiony
cyklicznie (np. z crona) sprawdza aktualne ceny i wysyła e-mail lub wiadomość
WhatsApp, gdy oferta spełni podany próg. Konfiguracja SMTP odbywa się przez
zmienne środowiskowe `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`
oraz opcjonalnie `FROM_EMAIL`. Dla WhatsApp używane jest Twilio – podaj
`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` oraz `TWILIO_WHATSAPP_FROM`.

Przykład użycia:

```bash
SMTP_HOST=smtp.example.com \
SMTP_USER=u@example.com \
SMTP_PASSWORD=sekret \
python -m scraper.cli.check_alerts
```

### Aktywacja środowiska Python (virtualenv):

```bash
alias workon_scraper="source ~/.virtualenvs/scraper/bin/activate"
workon_scraper
pip install -r requirements.txt  # m.in. python-multipart do obsługi formularzy
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

* `/api/products` – lista dostępnych produktów
* `/api/product/{nazwa_produktu}` – zwraca oferty, trend cenowy i TOP3;
  obsługuje parametry `limit`, `offset`, `sort`, `order`, `city`, `lat`, `lon` i
  `radius`. Gdy jednostka zawiera ilość (np. `10g`) lub cena oferty przekracza
  100 zł (a produkt ma zdefiniowaną wielkość w `PACKAGE_SIZES`), pojawia się pole
  `price_per_g`.
* `/api/alerts` – aktualne najlepsze ceny
* `/api/alerts_filtered` – unikalne oferty z najnowszych danych
* `/api/alerts_grouped` – grupowanie alertów (opcjonalny parametr `city`)
* `/api/alerts/register` – (POST) rejestracja alertu cenowego
* `/api/alerts/list` – lista zapisanych alertów
* `/api/cities` – lista wykrytych miast w bazie

Przykład użycia:

```
GET http://localhost:61973/api/product/Paracetamol?limit=5&city=Warszawa
```

---

## 6. FAQ i wskazówki

* **Backend działa na porcie 61973** – aby udostępnić publicznie, ustaw reverse proxy w panelu MyDevil lub własnym Apache/nginx.
* **Aby backend korzystał z najnowszych danych**, synchronizuj bazę po każdym scrapingu (rsync).
* **Selenium/testy i pobieranie danych uruchamiaj wyłącznie lokalnie** (ze wsparciem X/Chrome).
* **Wymagania backendu**: FastAPI, Uvicorn, python-multipart (`pip install -r requirements.txt`)
* **Wszystkie polecenia zakładają katalog główny:**
  `/home/vetternkraft/scraper_workspace/`

---

## 7. TODO / Plany rozwojowe

* [ ] Nowoczesny frontend (React/Vue/Svelte)
* [ ] Mapy i geolokalizacja (Leaflet.js, promień, marker najbliższej apteki)
* [ ] Panel administracyjny (edycja produktów/ofert)
* [x] Alerty cenowe (e-mail; SMS/webhook w planach)
* [ ] Publiczne API dla zewnętrznych aplikacji

---

## 8. Narzędzia developerskie

Katalog `tools/` zawiera skrypty pomocnicze niewykorzystywane w środowisku
produkcyjnym. Plik `cron_test.py` służy do diagnozowania konfiguracji cron oraz
sprawdzenia, czy Selenium i Chrome działają poprawnie. Skrypt generuje logi z
informacjami o systemie oraz wykonuje proste uruchomienie przeglądarki.

## 9. Uruchamianie testów

W katalogu projektu znajdują się testy Pytest dla scraperów i backendu.
Najważniejsze testy API znajdują się w pliku `tests/test_backend.py`.
Aby je uruchomić lokalnie, aktywuj środowisko i wykonaj:

```bash
pip install -r requirements.txt
python -m pytest
```
Można również uruchomić pojedynczy test, np.:

```bash
python -m pytest tests/test_backend.py
```

---

**Masz pytania lub chcesz rozwinąć projekt?**
Odezwij się przez GitHub/e-mail lub zgłoś issue w repozytorium!

---