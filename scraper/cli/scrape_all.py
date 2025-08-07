"""Skrypt CLI do scrapowania wszystkich produktów.

Dodano obsługę parametrów konfiguracyjnych bazy/API przekazywanych przez
zmienne środowiskowe lub parametry wiersza poleceń.
"""

import argparse
import logging
import os
import time
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path


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
    parser.add_argument("--workers", type=int, default=1, help="Liczba równoległych procesów")
    return parser.parse_args()


def chunked(seq, n_chunks):
    if n_chunks <= 0:
        return [seq]
    size = (len(seq) + n_chunks - 1) // n_chunks
    return [seq[i:i + size] for i in range(0, len(seq), size)]


def worker(products, db_url, headless):
    os.environ["DB_URL"] = db_url
    if db_url.startswith("sqlite:///"):
        os.environ["DB_PATH"] = db_url.replace("sqlite:///", "")
        os.environ["DB_TYPE"] = "sqlite"

    from importlib import reload
    from scraper.core.config import config as cfg
    reload(cfg)

    from scraper.core.bootstrap import ensure_schema, init_logging
    from scraper.core.browser import setup_browser
    from scraper.core.main import scrape_product
    from scraper.core.config.urls import get_url_by_name, extract_product_id

    init_logging()
    logger = logging.getLogger("gdziepolek")
    ensure_schema()

    driver = setup_browser(headless=headless)
    scraped = 0

    try:
        for idx, name in enumerate(products, start=1):
            url = get_url_by_name(name)
            if not url:
                logger.warning(f"[{idx}] ⚠️ Pominięto (brak URL): {name}")
                continue

            logger.info(f"[{idx}] 🔍 Scraping: {name}")
            try:
                product_id = extract_product_id(url)
                scrape_product(driver, url, product_id)
                logger.info(f"[{idx}] ✅ Gotowe: {name}")
            except Exception as e:
                logger.error(f"[{idx}] ❌ Błąd ekstrakcji – {e}")

            scraped += 1

            if scraped % 10 == 0:
                logger.info("🔄 Restart przeglądarki dla stabilności...")
                driver.quit()
                time.sleep(2)
                driver = setup_browser(headless=headless)

            time.sleep(1.5)

    finally:
        driver.quit()
        logger.info("🛑 Zakończono scraping w procesie.")


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

    from scraper.core.config.urls import PRODUCT_NAMES
    from scraper.core.config.config import DB_URL, DB_PATH, DEFAULT_HEADLESS

    num_workers = max(1, args.workers)
    num_workers = min(num_workers, len(PRODUCT_NAMES))
    product_chunks = chunked(PRODUCT_NAMES, num_workers)

    if DB_URL and not DB_URL.startswith("sqlite"):
        db_urls = [DB_URL] * len(product_chunks)
    else:
        base_path = Path(DB_URL.replace("sqlite:///", "")) if DB_URL else Path(DB_PATH)
        db_urls = []
        for i in range(len(product_chunks)):
            worker_path = base_path.parent / f"{base_path.stem}_worker_{i}{base_path.suffix}"
            worker_path.parent.mkdir(parents=True, exist_ok=True)
            db_urls.append(f"sqlite:///{worker_path}")

    with ProcessPoolExecutor(max_workers=len(product_chunks)) as executor:
        futures = []
        for products, db_url in zip(product_chunks, db_urls):
            futures.append(executor.submit(worker, products, db_url, DEFAULT_HEADLESS))
        for f in futures:
            f.result()


if __name__ == "__main__":
    main()
