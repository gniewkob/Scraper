# core/bootstrap.py
import importlib.util
import sys
import logging
from pathlib import Path
from datetime import datetime

# 🔧 Zmienna sterująca poziomem logowania (zmień na logging.DEBUG, INFO, WARNING, ERROR, CRITICAL)
LOG_LEVEL = logging.ERROR  # 🔁 Zmieniasz tutaj i działa wszędzie

def ensure_schema():
	schema_path = Path(__file__).resolve().parents[1] / "services" / "update_schema.py"
	if not schema_path.exists():
		print("⚠️ Nie znaleziono update_schema.py – pomiń synchronizację.")
		return
	spec = importlib.util.spec_from_file_location("update_schema", schema_path)
	update_schema = importlib.util.module_from_spec(spec)
	sys.modules["update_schema"] = update_schema
	spec.loader.exec_module(update_schema)
	logging.getLogger("gdziepolek").info("✅ Struktura bazy została zaktualizowana.")

def init_logging():
	log_dir = Path(__file__).resolve().parents[1] / "logs"
	log_dir.mkdir(parents=True, exist_ok=True)
	log_file = log_dir / f"scrape_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

	# Handlery
	file_handler = logging.FileHandler(log_file)
	file_handler.setLevel(LOG_LEVEL)

	console_handler = logging.StreamHandler()
	console_handler.setLevel(LOG_LEVEL)

	# Format
	formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(message)s', "%Y-%m-%d %H:%M:%S")
	file_handler.setFormatter(formatter)
	console_handler.setFormatter(formatter)

	# Logger główny
	logger = logging.getLogger("gdziepolek")
	logger.setLevel(LOG_LEVEL)
	logger.addHandler(file_handler)
	logger.addHandler(console_handler)
