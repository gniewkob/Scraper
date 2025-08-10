#!/usr/bin/env bash
set -euo pipefail

pytest -vv tests/scrape/test_offers_flow.py
