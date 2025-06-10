#!/bin/bash

PORT=61973
LOGFILE="/usr/home/vetternkraft/scraper_workspace/uvicorn_scraper.log"
WORKDIR="/usr/home/vetternkraft/scraper_workspace"

cd "$WORKDIR" || exit 1

# Aktywuj virtualenv
source /usr/home/vetternkraft/.virtualenvs/scraper/bin/activate

# Uruchom uvicorn w tle
nohup uvicorn backend.main:app --host 127.0.0.1 --port $PORT --reload >> "$LOGFILE" 2>&1 &
