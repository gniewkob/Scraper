# core/bootstrap.py
import importlib.util
import os
import sys
import logging
import logging.config
from pathlib import Path
from datetime import datetime

# Determine log level from environment with fallback to ERROR
LOG_LEVEL = getattr(
    logging, os.getenv("SCRAPER_LOG_LEVEL", "ERROR").upper(), logging.ERROR
)


logger = logging.getLogger(__name__)

def ensure_schema():
    schema_path = Path(__file__).resolve().parents[1] / "services" / "update_schema.py"
    if not schema_path.exists():
        print("⚠️ Nie znaleziono update_schema.py – pomiń synchronizację.")
        return
    spec = importlib.util.spec_from_file_location("update_schema", schema_path)
    update_schema = importlib.util.module_from_spec(spec)
    sys.modules["update_schema"] = update_schema
    spec.loader.exec_module(update_schema)
    logger.info("✅ Struktura bazy została zaktualizowana.")

def init_logging():
    config_path = Path(__file__).resolve().parents[2] / "logging.config"
    if config_path.exists():
        logging.config.fileConfig(config_path, disable_existing_loggers=False)
        logging.getLogger().setLevel(LOG_LEVEL)
    else:
        logging.basicConfig(level=LOG_LEVEL)
