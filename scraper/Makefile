# 🏁 Domyślny cel
.DEFAULT_GOAL := help

# 🧪 AKTUALIZACJA SCHEMATU
init:
	@echo "🔧 Aktualizacja struktury bazy danych..."
	python3 services/update_schema.py

# 🔍 SCRAPOWANIE – wszystkie produkty
scrape:
	@echo "🔍 Scraping all products (GUI browser)..."
	python3 services/update_schema.py
	python3 cli/scrape_all.py

# 🔍 SCRAPOWANIE – headless
scrape-headless:
	@echo "🔍 Scraping all products (headless)..."
	python3 services/update_schema.py
	python3 core/main.py --headless

# 🔍 SCRAPUJ KONKRETNY PRODUKT
scrape-product:
	@echo "🔍 Scraping product ID: $(PRODUCT)"
	python3 services/update_schema.py
	python3 core/main.py --product $(PRODUCT)

# 🔍 SCRAPUJ PRODUKT (HEADLESS)
scrape-product-headless:
	@echo "🔍 Scraping product ID: $(PRODUCT) (headless)"
	python3 services/update_schema.py
	python3 core/main.py --product $(PRODUCT) --headless

# 📈 ANALIZA CEN CLI
analyze:
	@echo "📈 Running CLI analysis..."
	python3 services/update_schema.py
	python3 cli/analyze_prices.py --trend

# 🚨 ALERTY CENOWE
alerts:
	@echo "🚨 Pokazuję okazje cenowe..."
	python3 services/update_schema.py
	python3 cli/check_alerts.py

# 📦 PODGLĄD BAZY
check:
	@echo "🔍 Wyświetlam ostatnie wpisy z bazy..."
	python3 services/update_schema.py
	python3 cli/check_db.py

# 🧼 CZYSZCZENIE PLIKÓW I LOGÓW
clean:
	@echo "🧹 Czyszczenie danych i logów..."
	rm -rf data/*.json logs/*.log


reset-db:
	@echo "🗑️ Usuwam starą bazę..."
	rm -f pharmacy_prices.sqlite
	@echo "🧱 Tworzę nową strukturę..."
	python3 services/update_schema.py


# 🆘 POMOC
help:
	@echo ""
	@echo "🛠️  Dostępne komendy:"
	@echo ""
	@echo "  make init                    - Inicjalizacja / aktualizacja bazy"
	@echo "  make scrape                  - Scrape all products (GUI browser)"
	@echo "  make scrape-headless         - Scrape all products (headless)"
	@echo "  make scrape-product PRODUCT=ID         - Scrape specific product"
	@echo "  make scrape-product-headless PRODUCT=ID - Headless for product"
	@echo "  make analyze                 - Run price analysis CLI"
	@echo "  make alerts                  - Show low price alerts"
	@echo "  make check                   - Show last rows from DB"
	@echo "  make clean                   - Delete logs and JSON files"
	@echo ""
