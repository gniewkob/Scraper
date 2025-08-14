#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." >/dev/null 2>&1 && pwd)"
VENV_DIR="$PROJECT_DIR/scraper/venv"
SQLITE="$PROJECT_DIR/data/pharmacy_prices.sqlite"
GEOCODER="scraper.services.geocode_pharmacies"

REMOTE_USER="${REMOTE_USER:-vetternkraft}"
REMOTE_HOST="${REMOTE_HOST:-s0.mydevil.net}"
REMOTE_PATH="${REMOTE_PATH:-/home/vetternkraft/workspaces/scraper_workspace/data/pharmacy_prices.sqlite}"

cd "$PROJECT_DIR" || exit 1

# Aktywuj virtualenv
source "$VENV_DIR/bin/activate"


# 🔥 Wymuś PATH, żeby znaleźć Chrome
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/Google Chrome.app/Contents/MacOS:$PATH"

echo "✅ PATH=$PATH"
echo "✅ VIRTUAL_ENV=$VIRTUAL_ENV"
which python3
python3 --version

# 🚀 Odpal scraper normalnie (z GUI!)
python3 -m scraper.cli.scrape_all

if [ $? -ne 0 ]; then
	echo "❌ Selenium scraper failed."
	exit 1
fi

# 🔍 Geokoduj adresy w bazie (przed uploadem!)
if [ -f "$SQLITE" ]; then
	echo "🌍 Geocoding addresses..."
	# Opcjonalnie, test importu:
	# python3 -c "from core.config.config import DB_PATH; print('DB_PATH:', DB_PATH)"
        python3 -m $GEOCODER
        echo "📤 Sending database..."
        if command -v rsync >/dev/null 2>&1; then
            rsync -av --compress --partial "$SQLITE" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
        else
            echo "ℹ️ rsync not found, using gzip + scp"
            COMPRESSED_DB="${SQLITE}.gz"
            gzip -c "$SQLITE" > "$COMPRESSED_DB"
            scp "$COMPRESSED_DB" "$REMOTE_USER@$REMOTE_HOST:${REMOTE_PATH}.gz"
            rm -f "$COMPRESSED_DB"
        fi
else
        echo "❌ No SQLite database found."
fi
