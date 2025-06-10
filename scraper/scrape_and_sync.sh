#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." >/dev/null 2>&1 && pwd)"
VENV_DIR="$PROJECT_DIR/scraper/venv"
SCRIPT="$PROJECT_DIR/scraper/cli/scrape_all.py"
SQLITE="$PROJECT_DIR/data/pharmacy_prices.sqlite"
GEOCODER="$PROJECT_DIR/scraper/services/geocode_pharmacies.py"

REMOTE_USER="${REMOTE_USER:-vetternkraft}"
REMOTE_HOST="${REMOTE_HOST:-s0.mydevil.net}"
REMOTE_PATH="${REMOTE_PATH:-/home/vetternkraft/scraper_workspace/data/pharmacy_prices.sqlite}"
#REMOTE_PATH="/home/vetternkraft/domains/smart.bodora.pl/public_python/pharmacy_prices.sqlite"

cd "$PROJECT_DIR" || exit 1

# Aktywuj virtualenv
source "$VENV_DIR/bin/activate"

# Poprawka: dodaj katalog SCRAPER do PYTHONPATH aby importy pakietowe działały
export PYTHONPATH="$PROJECT_DIR/scraper"

# 🔥 Wymuś PATH, żeby znaleźć Chrome
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/Google Chrome.app/Contents/MacOS:$PATH"

echo "✅ PATH=$PATH"
echo "✅ VIRTUAL_ENV=$VIRTUAL_ENV"
echo "✅ PYTHONPATH=$PYTHONPATH"
which python3
python3 --version

# 🚀 Odpal scraper normalnie (z GUI!)
python3 "$SCRIPT"

if [ $? -ne 0 ]; then
	echo "❌ Selenium scraper failed."
	exit 1
fi

# 🔍 Geokoduj adresy w bazie (przed uploadem!)
if [ -f "$SQLITE" ]; then
	echo "🌍 Geocoding addresses..."
	# Opcjonalnie, test importu:
	# python3 -c "from core.config.config import DB_PATH; print('DB_PATH:', DB_PATH)"
	python3 "$GEOCODER"
	echo "📤 Sending database..."
	scp "$SQLITE" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
else
	echo "❌ No SQLite database found."
fi
