#!/usr/bin/env bash
set -euo pipefail

playwright install --with-deps firefox

# Install frontend dependencies before running tests
cd frontend
npm ci
cd ..

export ALERTS_FERNET_KEY='acRBwexXv_Ubx9mb9Ou7nSbrBIoJb7Qh3PhQTtoxXIM='
export SECRET_KEY='test-secret'
export ADMIN_PASSWORD_HASH='$2b$12$HfbZ..QaPVG.SyrWTKpU3ut88KwkjTKi1eEPZ/BGbc06mgS/jTfq2'

pytest -vv

