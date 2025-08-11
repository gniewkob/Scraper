#!/usr/bin/env bash
set -euo pipefail

playwright install --with-deps firefox
(cd frontend && npm ci)
pytest -vv
