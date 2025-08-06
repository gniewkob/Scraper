import argparse
import sqlite3
from pathlib import Path
from typing import List

from scraper.core.config.config import DB_PATH

TABLES = [
    "pharmacy_prices",
    "products",
    "user_alerts",
    "notified_alerts",
]


def merge_databases(target: str, sources: List[str]) -> None:
    with sqlite3.connect(target) as conn:
        for src in sources:
            src_path = Path(src)
            if not src_path.exists():
                print(f"⚠️ Pominięto brakujący plik: {src}")
                continue
            conn.execute(f"ATTACH DATABASE '{src}' AS src_db")
            for table in TABLES:
                try:
                    conn.execute(
                        f"INSERT OR IGNORE INTO {table} SELECT * FROM src_db.{table}"
                    )
                except sqlite3.OperationalError:
                    continue
            conn.execute("DETACH DATABASE src_db")


def main() -> None:
    parser = argparse.ArgumentParser(description="Scal pliki SQLite z pracowników")
    parser.add_argument("sources", nargs="+", help="Ścieżki do baz SQLite do scalenia")
    parser.add_argument(
        "--target", default=DB_PATH, help="Docelowa baza danych (domyślnie główna baza)"
    )
    args = parser.parse_args()

    merge_databases(args.target, args.sources)


if __name__ == "__main__":
    main()

