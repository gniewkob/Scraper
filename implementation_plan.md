# Plan wdrożenia nowego frontendu z Vercel (branch: new-layout)

## Podsumowanie zmian
Branch `new-layout` zawiera przeprojektowany frontend w technologii Next.js 15 z motywem konopnym (cannabis-themed) i ciemnym interfejsem.

## Główne cechy nowego designu:
1. **Motyw kosmiczny/konopny** - grafiki UFO, kosmiczne tło, zielono-fioletowa paleta kolorów
2. **Next.js 15** zamiast Vite/React
3. **Komponenty UI** z Radix UI i shadcn/ui
4. **Tailwind CSS v4** dla stylizacji
5. **TypeScript** dla type safety
6. **Mock data fallback** gdy backend jest niedostępny

## Struktura aplikacji:
```
app/
  ├── globals.css       # Globalne style z motywem konopnym
  ├── layout.tsx        # Główny layout aplikacji
  ├── page.tsx          # Strona główna
  └── loading.tsx       # Stan ładowania

components/
  ├── header.tsx        # Nagłówek z grafiką UFO
  ├── search-section.tsx # Sekcja wyszukiwania
  ├── results-section.tsx # Wyniki wyszukiwania
  ├── stats-section.tsx  # Statystyki
  └── ui/               # Komponenty UI (shadcn)

lib/
  ├── api.ts           # Klient API z mock data
  └── utils.ts         # Funkcje pomocnicze
```

## Plan wdrożenia:

### Faza 1: Przygotowanie środowiska
1. **Backup aktualnego stanu**
   ```bash
   git stash save "backup-current-state-$(date +%Y%m%d-%H%M%S)"
   ```

2. **Utworzenie nowej gałęzi wdrożeniowej**
   ```bash
   git checkout -b implement-new-layout
   ```

### Faza 2: Migracja do Next.js
1. **Zachowanie backendu**
   - Backend pozostaje bez zmian w Python/FastAPI
   - Działa na porcie 38273

2. **Instalacja Next.js frontendu**
   ```bash
   # Usunięcie starego frontendu Vite
   rm -rf frontend/
   
   # Checkout plików z new-layout
   git checkout origin/new-layout -- app/ components/ lib/ styles/ public/
   git checkout origin/new-layout -- package.json pnpm-lock.yaml
   git checkout origin/new-layout -- next.config.mjs postcss.config.mjs tsconfig.json
   git checkout origin/new-layout -- components.json
   ```

3. **Instalacja zależności**
   ```bash
   # Instalacja pnpm jeśli nie ma
   npm install -g pnpm
   
   # Instalacja pakietów
   pnpm install
   ```

### Faza 3: Konfiguracja API
1. **Aktualizacja lib/api.ts**
   - Zmiana API_BASE_URL na `http://localhost:38273/api`
   - Dostosowanie endpointów do istniejącego backendu:
     - `/api/offers` → produkty
     - `/api/cities` → lista miast
     - `/api/products` → lista produktów
     - `/api/stats` → statystyki

2. **Mapowanie danych**
   - Dostosowanie interfejsów TypeScript do struktury danych z backendu
   - Konwersja pól (np. `pharmacy_name` → `dispensary`)

### Faza 4: Integracja z istniejącym backendem
1. **CORS w backendzie** - upewnienie się że FastAPI pozwala na połączenia z Next.js
2. **Proxy API** w next.config.mjs dla development
3. **Environment variables** w .env.local:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:38273/api
   ```

### Faza 5: Dostosowanie komponentów
1. **Mapowanie danych cannabis na rzeczywiste dane**:
   - Produkty medycznej marihuany
   - Apteki zamiast dispensaries
   - Ceny w PLN
   - Polski język w interfejsie

2. **Zachowanie funkcjonalności**:
   - Wyszukiwanie po mieście
   - Filtrowanie po produkcie
   - Sortowanie po cenie
   - Mapa z markerami aptek

### Faza 6: Uruchomienie i testy
1. **Build produkcyjny Next.js**
   ```bash
   pnpm build
   ```

2. **Uruchomienie serwera**
   ```bash
   # Backend (FastAPI) na porcie 38273
   ./manage.sh start backend
   
   # Frontend (Next.js) na porcie 3000
   pnpm start
   ```

3. **Testy funkcjonalne**:
   - Sprawdzenie ładowania danych z API
   - Test wyszukiwania i filtrowania
   - Weryfikacja mapy
   - Responsywność na różnych urządzeniach

### Faza 7: Deployment
1. **Opcja A: Vercel** (zalecana dla Next.js)
   - Push do GitHub
   - Połączenie z Vercel
   - Automatyczny deployment

2. **Opcja B: Self-hosted**
   - Build statyczny: `pnpm build && pnpm export`
   - Serwowanie przez nginx/Apache
   - PM2 dla procesu Node.js

## Ryzyka i rozwiązania:
1. **Niekompatybilność API** → Mock data jako fallback
2. **Problemy z CORS** → Proxy w Next.js lub konfiguracja FastAPI
3. **Brakujące dane** → Wykorzystanie istniejących danych z bazy PostgreSQL

## Harmonogram:
- Faza 1-2: 30 minut
- Faza 3-4: 1 godzina  
- Faza 5: 1 godzina
- Faza 6-7: 30 minut
**Całkowity czas**: ~3 godziny

## Polecenia do szybkiego wdrożenia:
```bash
# 1. Backup i nowa gałąź
git stash save "backup-$(date +%Y%m%d-%H%M%S)"
git checkout -b implement-new-layout

# 2. Pobranie nowego frontendu
git checkout origin/new-layout -- app/ components/ lib/ styles/ public/ *.json *.mjs *.config.* tsconfig.json

# 3. Instalacja
npm install -g pnpm
pnpm install

# 4. Konfiguracja
echo "NEXT_PUBLIC_API_URL=http://localhost:38273/api" > .env.local

# 5. Build i start
pnpm build
pnpm start
```
