#!/bin/bash

PROJECT_DIR="/Users/gniewko/Repos/Scraper"
VENV_DIR="$PROJECT_DIR/venv"
SCRIPT="$PROJECT_DIR/cli/scrape_all.py"
SQLITE="$PROJECT_DIR/pharmacy_prices.sqlite"
GEOCODER="$PROJECT_DIR/services/geocode_pharmacies.py"

REMOTE_USER="vetternkraft"
REMOTE_HOST="s0.mydevil.net"
REMOTE_PATH="/home/vetternkraft/scraper_workspace/data/pharmacy_prices.sqlite"
#REMOTE_PATH="/home/vetternkraft/domains/smart.bodora.pl/public_python/pharmacy_prices.sqlite"

cd "$PROJECT_DIR" || exit 1

source "$VENV_DIR/bin/activate"

# 🔥 Wymuś PATH, żeby znaleźć Chrome
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/Google Chrome.app/Contents/MacOS:$PATH"

echo "✅ PATH=$PATH"
echo "✅ VIRTUAL_ENV=$VIRTUAL_ENV"
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
	python3 "$GEOCODER"
	echo "📤 Sending database..."
	scp "$SQLITE" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
else
	echo "❌ No SQLite database found."
fi
