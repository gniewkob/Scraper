# Scraper – pełny przewodnik (dev/prod/CI)

> **Cel:** Po jednorazowym przeczytaniu każdy nowy dev/agent potrafi uruchomić lokalny scraper, backend i interfejs z danymi – bez dodatkowych pytań.

---

> **Minimalna wersja Pythona:** 3.10

## 1. Architektura

```
Scraper  ──→  Baza danych  ──→  Backend API  ──→  Frontend
(Selenium/Playwright)    (SQLite/PostgreSQL)   (FastAPI)      (React/HTML)
```

1. **Scraper** pobiera oferty z portali (domyślnie URL-e z `scraper/core/config/urls.py`), zapisuje je do bazy lokalnej lub zdalnej.
2. **Baza danych** (domyślnie `data/pharmacy_prices.sqlite`) przechowuje historię cen oraz listę produktów.
3. **Backend API** (FastAPI) udostępnia REST i szablony HTML, zasilając interfejs.
4. **Frontend** (React lub „legacy” w `/backend/templates`) renderuje dashboard i wykresy cen.

---

## 2. Konfiguracja środowiska

### Minimalny plik `.env` (w katalogu głównym)

```env
# DB
DB_URL=sqlite:///data/pharmacy_prices.sqlite
# lub postgresql://user:pass@host:port/pharmacy

# Frontend/Backend
SECRET_KEY=zmień_mnie
ADMIN_PASSWORD_HASH=<bcrypt_hash_hasła_admina>

# Scraper
HEADLESS=true         # uruchamiaj przeglądarkę bez GUI
```

### Pozostałe zmienne (opcjonalne)

| Nazwa             | Opis                                                                                 |
|-------------------|---------------------------------------------------------------------------------------|
| `DB_PATH`         | Ścieżka do pliku SQLite (gdy nie podasz `DB_URL`)                                     |
| `DB_TYPE`         | `sqlite`, `postgresql`, `mysql`, `api`                                                |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | parametry budowania `DB_URL`                   |
| `API_URL`         | zamiast bazy – wysyłka danych do zewnętrznego API                                     |
| `SUMMARY_EMAIL`   | adres do wysłania krótkiego podsumowania pracy scrapera                               |
| `CELERY_BROKER_URL` | broker dla kontenera `scraper` w Dockerze (np. `redis://redis:6379/0`)              |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `FROM_EMAIL` | konfiguracja serwera SMTP dla wysyłki e-maili |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SMS_FROM` | dane logowania do Twilio do wysyłki SMS        |
| `CONFIRMATION_BASE_URL` | bazowy URL używany w linkach potwierdzających (domyślnie https://example.com) |
| `ALLOWED_ORIGINS` | lista domen (rozdzielona przecinkami) do CORS (domyślnie http://localhost:5173,http://localhost:3000) |
| `ALERTS_MIN_PRICE`, `ALERTS_MAX_PRICE` | minimalna i maksymalna cena w endpointzie `/api/alerts` (domyślnie 10 i 35) |
| `EMAIL_MASK_VISIBLE_CHARS` | ile znaków lokalnej części e‑maila pozostaje odkrytych (domyślnie 4) |
| `PHONE_MASK_MIN_LENGTH` | minimalna długość numeru telefonu, aby zastosować maskowanie (domyślnie 6) |
| `PHONE_MASK_VISIBLE_PREFIX`, `PHONE_MASK_VISIBLE_SUFFIX` | ile cyfr pokazujemy na początku i końcu numeru (domyślnie po 3) |

### Tunel SSH do PostgreSQL (MyDevil)

Jeśli baza PostgreSQL działa na serwerze MyDevil:

```bash
ssh -L 5432:127.0.0.1:5432 user@s0.mydevil.net
# w innym oknie
export DB_URL=postgresql://pguser:pgpass@localhost:5432/pharmacy
```

Tymczasowy tunel przekieruje lokalny port 5432 na serwer.

---

## 3. Uruchomienie lokalne

### 3.1. Wymagania

- Python 3.10+
- Node.js (tylko przy pracy z front-endem React)
- Firefox z zainstalowanymi bibliotekami systemowymi

### 3.2. Instalacja zależności i Playwright

```bash
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt -r requirements-ci.txt
playwright install --with-deps firefox
```
Pakiet `email-validator` jest wymagany przez Pydantic do walidacji adresów e-mail i jest instalowany razem z powyższymi zależnościami.

### 3.3. Scraper (CLI)

```bash
# zapis do SQLite
python -m scraper.cli.scrape_all --headless --db-url sqlite:///data/pharmacy_prices.sqlite
```

Wyniki: `data/pharmacy_prices.sqlite`, logi w `scraper/logs/`, podsumowanie w `scraper/logs/scrape_metrics.log`.

Argumenty CLI:
- `--headless` – uruchamia przeglądarkę bez GUI (można też ustawić zmienną środowiskową `HEADLESS`).

### 3.4. Backend + UI

```bash
export SECRET_KEY=devsecret
export ADMIN_PASSWORD_HASH=<bcrypt_hash>
PORT=61973 uvicorn backend.main:app --reload --port $PORT
```

Otwórz `http://localhost:61973` – pojawi się panel z listą ofert i trendem cenowym.
*Jeśli w bazie brak danych, najpierw uruchom scraper.*

**Statyczne zasoby:** Pliki CSS/JS w szablonach (Bootstrap, Chart.js, Leaflet) są pobierane z CDN z atrybutami `integrity` i `crossorigin`. Jeśli wolisz trzymać je lokalnie (np. do pracy offline), umieść je w katalogu `backend/static/` i zaktualizuj odwołania w szablonach.

---

## 4. Docker

W pełni zautomatyzowane środowisko (backend, scraper worker, PostgreSQL, Redis):

```bash
cp .env.example .env   # uzupełnij wymagane wartości
docker-compose up --build
# produkcyjnie:
# docker-compose up -d
```

Serwisy:

| Kontener   | Funkcja                                          |
|------------|--------------------------------------------------|
| `backend`  | FastAPI na porcie `61973` (zmienne `PORT`)       |
| `scraper`  | Celery worker pobierający zadania                |
| `db`       | PostgreSQL                                      |
| `redis`    | broker wiadomości                                |

---

## 5. CI / GitHub Actions

- `deploy.yml` – testy, budowa obrazów Docker i (opcjonalne) wdrożenie na serwer.
- `scrape-matrix.yml` – testuje scraper (Playwright) dla wielu kombinacji wejściowych.
- Sekrety wymagane przez `deploy.yml`: `REGISTRY`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`, `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_KEY`, `DEPLOY_PATH`.

Commity muszą spełniać standard [Conventional Commits](https://www.conventionalcommits.org/) i są weryfikowane w CI przez `npx commitlint --from=HEAD~1 --to=HEAD`.

---

## 6. Dynamiczna lista produktów i kryteria aktywności

1. **Źródło prawdy:** `scraper/core/config/urls.py` zawiera listę URL‑i produktów.
2. **Podczas scrapingu** `services.db.sync_products()`:
   - dodaje nowe rekordy do tabeli `products`,
   - ustawia `active=True` dla wykrytych produktów,
   - oznacza `active=False` te, których w danym przebiegu nie znaleziono.
3. **Backend** (`/api/products`) zwraca wyłącznie produkty `active=1`. Dzięki temu UI automatycznie podaje aktualną listę bez edycji kodu.
4. **Reaktywacja produktu** – wystarczy ponownie dodać URL do listy lub wysłać odpowiedni wpis przez API.

---

## 7. Interpretacja `summary.txt`

Po każdym uruchomieniu `scrape_all` tworzony jest tekstowy raport:

```
Start: 2024-05-15T12:00:00
End:   2024-05-15T12:05:42
Runtime: 342.10s
Offers scraped: 128
```

- **Start / End** – znaczniki czasu rozpoczęcia i zakończenia.
- **Runtime** – czas wykonania w sekundach.
- **Offers scraped** – liczba unikalnych ofert zapisanych do bazy.

Zależnie od konfiguracji, raport zapisywany jest jako `summary.txt` albo dopisywany do `scraper/logs/scrape_metrics.log`. Możesz wysłać go mailem ustawiając `SUMMARY_EMAIL`.

---

## 8. Wyłączenie wykresu / włączenie etykiet

### Wersja React (`frontend/`)

- W `src/App.tsx` wykres znajduje się w akordeonie:
  ```tsx
  <PriceTrendChart data={trend} className="price-trend-canvas" />
  ```
  - **Wyłączenie**: usuń powyższą linię lub ustaw `chartOpen` na `false`.
- W `src/components/PriceTrendChart.tsx` można włączyć etykiety/dział legendy:
  ```ts
  options: {
    plugins: {
      legend: { display: true },          // etykiety serii
      // tooltip, dataLabels itp. wg potrzeb
    },
  }
  ```
  Przy potrzeby wyświetlania wartości nad punktami doinstaluj `chartjs-plugin-datalabels`.

### Wersja legacy (`backend/templates/index_legacy.html`)

- Komentarz/usuń `<canvas id="priceTrendChart">` aby ukryć wykres.
- Etykiety osi i legendę konfiguruje funkcja `renderPriceChart` w `backend/static/dashboard.combined.js`.

---

## 9. Checklista wdrożenia na MyDevil

### Backend (FastAPI + reverse proxy)

1. **Katalog na serwerze**: `~/scraper_workspace/backend/`.
2. Stwórz i aktywuj wirtualne środowisko, zainstaluj `pip install -r requirements.txt`.
3. Ustaw w `.env` zmienne (`SECRET_KEY`, `ADMIN_PASSWORD_HASH`, `DB_URL` wskazujący na SQLite lub PostgreSQL).
4. Uruchom `uvicorn` w tle (np. `scripts/restart_uvicorn.sh` + cron `@reboot`).
5. W panelu MyDevil ustaw **reverse proxy** do portu backendu (`http://localhost:61973` → subdomena).

### Frontend (React)

1. **Build statycznych plików**:
   ```bash
   npm --prefix frontend run build
   ```
   Powstaje katalog `frontend/dist/` z plikami HTML, JS i CSS.
2. **Upload na hosting** – skopiuj zawartość `dist/` do katalogu serwowanego przez MyDevil
   (`public_html` lub ścieżka reverse‑proxy), np.:
   ```bash
   scp -r frontend/dist/* user@server:/home/user/public_html/
   ```
3. **Zmienna środowiskowa API** – jeśli backend działa pod inną domeną/prefiksem, ustaw podczas budowy
   `VITE_API_URL` wskazującą na endpoint, np.:
   ```bash
   VITE_API_URL=https://api.example.com npm --prefix frontend run build
   ```

### Scraper (CI lub lokalny cron)

**Opcja CI:**

- GitHub Action uruchamia `python -m scraper.cli.scrape_all`.
- Po zakończeniu plik bazy (lub eksport JSON) wysyłany na serwer:
  ```bash
  rsync -av data/pharmacy_prices.sqlite user@server:/home/user/scraper_workspace/data/
  ```
- Klucz SSH dodaj do sekretów repozytorium.

**Opcja lokalna:**

1. Na swoim komputerze `./scraper/scrape_and_sync.sh`.
2. Skrypt synchronizuje bazę na serwer przez `rsync` lub `scp`.
3. Jeżeli baza na serwerze to PostgreSQL, przed scraperem otwórz tunel:
   `ssh -L 5432:127.0.0.1:5432 user@s0.mydevil.net` i ustaw `DB_URL` na lokalny port.

---

## 10. Oczekiwana weryfikacja (acceptance)

1. **Świeży QA** klonuje repo.
2. Wykonuje kroki z sekcji 3 (instalacja zależności, `playwright install`, uruchomienie scrapera).
3. Uruchamia backend (`uvicorn`) i otwiera `http://localhost:61973`.
4. Widzi w UI listę produktów, tabelę ofert oraz – jeśli nie wyłączył – wykres trendu.

Po przejściu powyższych kroków cały system działa lokalnie z realnymi danymi.

## 11. FreeBSD (docelowy hosting) i zarezerwowane porty

Na docelowym hostingu (FreeBSD) frontend i backend są wystawione przez reverse-proxy
na stałych, zarezerwowanych portach. Używamy proxy-domen które mapują na localhost:PORT
na maszynie (bez dodatkowej konfiguracji proxy). Zalecane ustawienia środowiskowe:

- BACKEND_PORT=38273  # zarezerwowany port dla backendu
- FRONTEND_PORT=61973 # zarezerwowany port dla frontendu
- ALLOWED_ORIGINS=https://smart.bodora.pl,https://backend.bodora.pl
- NEXT_PUBLIC_API_URL=https://backend.bodora.pl/api  # (opcjonalnie) preferowany dla frontendu

Przykładowe uruchomienie (w FreeBSD rc / skrypcie systemowym):

```sh
export BACKEND_PORT=38273
export FRONTEND_PORT=61973
export ALLOWED_ORIGINS="https://smart.bodora.pl,https://backend.bodora.pl"
export NEXT_PUBLIC_API_URL="https://backend.bodora.pl/api"
# uruchom backend
uvicorn backend.main:app --host 127.0.0.1 --port $BACKEND_PORT --workers 4 &
# build frontend statyczny (jeśli używasz build+upload)
cd frontend && NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL npm run build
```

Uwaga: `smart.bodora.pl` i `backend.bodora.pl` są proxy i nie wymagają dodatkowej konfiguracji
aplikacji — proxy po prostu przekierowuje ruch do `localhost:PORT` na hoście.

## 12. Testy

Uruchamianie testów lokalnie (dev):

```bash
# aktywuj venv z wymaganymi pakietami
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-ci.txt
pytest -q
```

Jeżeli testy zależą od usług zewnętrznych (np. baza, playwright), upewnij się, że są uruchomione
lub skorzystaj z fixtureów/zmiennych środowiskowych wymaganych przez testy (zobacz `pytest.ini`).

Jeżeli chcesz, mogę uruchomić testy w Twoim repo i przekazać wynik tutaj.
