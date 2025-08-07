# Pharmacy Price Verification & Dashboard

**Kompleksowe rozwiązanie do automatycznego scrapingu, weryfikacji i prezentacji cen leków oraz ofert aptek.**

---

## Quick start with Docker Compose

Zarówno lokalnie jak i podczas wdrożenia cały stos uruchomisz poleceniem:

```bash
docker-compose up --build
```

Uruchomione zostaną trzy usługi:

* **backend** – FastAPI dostępne pod `http://localhost:8000`
* **scraper** – moduł Selenium wykonujący pobieranie danych
* **db** – baza PostgreSQL do przechowywania wyników

Aby uruchomić kontenery w tle (np. w środowisku produkcyjnym), użyj:

```bash
docker-compose up -d
```

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
* Dane w formie JSON oraz finalnie w bazie SQLite (`data/pharmacy_prices.sqlite`)
* ChromeDriver dostarcza `webdriver-manager`, dlatego binarka nie jest w repozytorium
* Baza `data/pharmacy_prices.sqlite` jest generowana podczas scrapingu

**Poziom logowania:**
Ustaw zmienną środowiskową `SCRAPER_LOG_LEVEL` (np. `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`), aby dostosować szczegółowość logów. Domyślnie `ERROR`.

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
Domyślnie korzysta z bazy SQLite synchronizowanej powyżej, ale dzięki
SQLAlchemy może łączyć się także z PostgreSQL/MySQL.

### Konfiguracja bazy danych

Połączenie do bazy definiują zmienne środowiskowe:

- `DB_URL` – pełny URL (np. `postgresql://user:pass@host/db`).
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` – używane do
  zbudowania `DB_URL`, jeśli nie podano go bezpośrednio.
- `DB_POOL_SIZE` – rozmiar puli połączeń (domyślnie `5`).
- `DB_MAX_OVERFLOW` – dodatkowe połączenia poza pulą (domyślnie `10`).

Migracje schematu wykonywane są za pomocą Alembic:

```bash
alembic -c backend/alembic.ini upgrade head
```

### Panel administracyjny

Po uruchomieniu backendu dostępny jest prosty panel pod adresem `/admin`. Panel wymaga zalogowania, a formularz logowania znajduje się pod `/admin/login`. Hasz hasła administracyjnego musi znajdować się w zmiennej środowiskowej `ADMIN_PASSWORD_HASH`.

Przykład wygenerowania i ustawienia hasza hasła:

```bash
python - <<'PY'
import bcrypt
print(bcrypt.hashpw(b"moje_super_haslo", bcrypt.gensalt()).decode())
PY
export ADMIN_PASSWORD_HASH="wklej_tutaj_wygenerowany_hasz"
```

Dodatkowo aplikacja wymaga ustawienia klucza sesji w zmiennej `SECRET_KEY`. Obie wartości powinny być ustawione na bezpieczne przed wdrożeniem.

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
  `radius`. Gdy jednostka zawiera ilość (np. `10g`) albo cena oferty wynosi co
  najmniej 100 zł i produkt ma zdefiniowany rozmiar w `PACKAGE_SIZES`, pole
  `price_per_g` przedstawia cenę za gram. Przy niższych cenach bez jawnej
  ilości `price_per_g` nie jest dodawane.
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
* [x] Mapy i geolokalizacja (Leaflet.js, promień, marker najbliższej apteki)
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

## 10. GitHub Actions Deployment

Repozytorium zawiera workflow `deploy.yml`, który uruchamia testy, buduje i publikuje obrazy Docker oraz aktualizuje serwer po wypchnięciu zmian do gałęzi `main`.

Aby wdrożenie działało, w ustawieniach repozytorium dodaj następujące sekrety:

- `REGISTRY` – adres rejestru obrazów (np. `ghcr.io/uzytkownik`),
- `REGISTRY_USERNAME` i `REGISTRY_PASSWORD` – dane logowania do rejestru,
- `DEPLOY_HOST` – adres serwera docelowego,
- `DEPLOY_USER` – użytkownik SSH,
- `DEPLOY_KEY` – klucz prywatny używany do logowania,
- `DEPLOY_PATH` – katalog aplikacji na serwerze.

W zależności od środowiska możesz dodać również `DEPLOY_PORT` lub inne zmienne wykorzystywane w skrypcie.

---

**Masz pytania lub chcesz rozwinąć projekt?**
Odezwij się przez GitHub/e-mail lub zgłoś issue w repozytorium!

---