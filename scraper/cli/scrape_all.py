"""Skrypt CLI do scrapowania wszystkich produktów.

Dodano obsługę parametrów konfiguracyjnych bazy/API przekazywanych przez
zmienne środowiskowe lub parametry wiersza poleceń.
"""

import argparse
import logging
import os
import time


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--db-type", help="Typ bazy: sqlite, postgresql, mysql, api")
    parser.add_argument("--db-host")
    parser.add_argument("--db-port")
    parser.add_argument("--db-user")
    parser.add_argument("--db-password")
    parser.add_argument("--db-name")
    parser.add_argument("--db-url", help="Pełny URL połączenia do bazy")
    parser.add_argument("--api-url", help="URL API do wysyłki danych")
    parser.add_argument("--headless", action="store_true", help="Wymuś tryb headless")
    return parser.parse_args()


def main():
    args = parse_args()

    # Ustaw zmienne środowiskowe, aby mogły zostać odczytane przez config.py
    if args.db_url:
        os.environ["DB_URL"] = args.db_url
    if args.api_url:
        os.environ["API_URL"] = args.api_url
    if args.db_type:
        os.environ["DB_TYPE"] = args.db_type
    if args.db_host:
        os.environ["DB_HOST"] = args.db_host
    if args.db_port:
        os.environ["DB_PORT"] = args.db_port
    if args.db_user:
        os.environ["DB_USER"] = args.db_user
    if args.db_password:
        os.environ["DB_PASSWORD"] = args.db_password
    if args.db_name:
        os.environ["DB_NAME"] = args.db_name
    if args.headless:
        os.environ["HEADLESS"] = "true"

    # Importy dopiero po ustawieniu zmiennych środowiskowych
    from scraper.core.browser import setup_browser
    from scraper.core.data_extractor import extract_pharmacy_data
    from scraper.core.bootstrap import ensure_schema, init_logging
    from scraper.core.config.urls import PRODUCT_NAMES, get_url_by_name
    from scraper.core.config.config import DEFAULT_HEADLESS

    init_logging()
    logger = logging.getLogger("gdziepolek")
    ensure_schema()

    driver = setup_browser(headless=DEFAULT_HEADLESS)
    scraped = 0

    try:
        for idx, name in enumerate(PRODUCT_NAMES, start=1):
            url = get_url_by_name(name)
            if not url:
                logger.warning(f"[{idx}] ⚠️ Pominięto (brak URL): {name}")
                continue

            logger.info(f"[{idx}] 🔍 Scraping: {name}")
            try:
                extract_pharmacy_data(driver, url)
                logger.info(f"[{idx}] ✅ Gotowe: {name}")
            except Exception as e:
                logger.error(f"[{idx}] ❌ Błąd ekstrakcji – {e}")

            scraped += 1

            if scraped % 10 == 0:
                logger.info("🔄 Restart przeglądarki dla stabilności...")
                driver.quit()
                time.sleep(2)
                driver = setup_browser(headless=DEFAULT_HEADLESS)

            time.sleep(1.5)

    finally:
        driver.quit()
        logger.info("🛑 Zakończono scraping.")


if __name__ == "__main__":
    main()
