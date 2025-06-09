#!/bin/bash

# Set script directory as the current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Activate virtual environment using relative path
source ./venv/bin/activate

# Add current directory to PATH for chromedriver
export PATH="$PATH:$SCRIPT_DIR"

# Create logs directory if it doesn't exist
mkdir -p logs

# Run the script with proper logging
python3 cli/scrape_all.py >> logs/cron_last.log 2>&1

# Log success message
echo "$(date) - Scraper completed" >> logs/cron_last.log
