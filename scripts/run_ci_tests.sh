#!/usr/bin/env bash
set -euo pipefail

playwright install --with-deps firefox

# Install frontend dependencies before running tests
cd frontend
npm ci
cd ..

pytest -vv
