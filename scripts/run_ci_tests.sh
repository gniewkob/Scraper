#!/usr/bin/env bash
set -euo pipefail

playwright install --with-deps firefox
pytest -vv
