#!/bin/bash

# Set script directory and project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Activate virtual environment using relative path
source "$SCRIPT_DIR/venv/bin/activate"

# Add current directory to PATH for chromedriver
export PATH="$PATH:$SCRIPT_DIR"

# Create logs directory if it doesn't exist
mkdir -p "$SCRIPT_DIR/logs"

# Run the script with proper logging
python3 -m scraper.cli.scrape_all >> "$SCRIPT_DIR/logs/cron_last.log" 2>&1

# Log success message
echo "$(date) - Scraper completed" >> "$SCRIPT_DIR/logs/cron_last.log"
