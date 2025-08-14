#!/bin/bash
set -e

# Determine directories
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

IMAGE_NAME="scraper-runner"

# Build the Docker image
docker build -f "$SCRIPT_DIR/Dockerfile" -t "$IMAGE_NAME" "$PROJECT_ROOT"

# Ensure data directory exists and run container
mkdir -p "$PROJECT_ROOT/data"

docker run --rm \
  -e DISPLAY="${DISPLAY:-:99}" \
  -e DB_PATH="${DB_PATH:-/app/data/pharmacy_prices.sqlite}" \
  -e HEADLESS="${HEADLESS:-true}" \
  -v "$PROJECT_ROOT/data":/app/data \
  "$IMAGE_NAME" python -m scraper.cli.scrape_all "$@"
