# cli/check_alerts.py

import importlib.util
import sys
from pathlib import Path
import logging
import json
import sqlite3
import os
import smtplib
from email.message import EmailMessage
from datetime import datetime
from scraper.core.bootstrap import init_logging, ensure_schema
from scraper.core.config.config import DB_PATH

# 🔧 Inicjalizacja logowania
init_logging()
logger = logging.getLogger("gdziepolek")

# 🔧 Automatyczna synchronizacja struktury bazy
schema_path = Path(__file__).resolve().parents[1] / "services" / "update_schema.py"
if schema_path.exists():
    spec = importlib.util.spec_from_file_location("update_schema", schema_path)
    update_schema = importlib.util.module_from_spec(spec)
    sys.modules["update_schema"] = update_schema
    spec.loader.exec_module(update_schema)
    logger.info("✅ Schemat bazy zaktualizowany.")
else:
    logger.warning("⚠️ Plik update_schema.py nie znaleziony. Upewnij się, że struktura bazy została przygotowana.")
    ensure_schema()

# 📦 Ścieżki
ALERTS_FILE = Path("user_alerts.json")
NOTIFIED_FILE = Path("notified_alerts.json")

# 📧 Konfiguracja SMTP z zmiennych środowiskowych
SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
FROM_EMAIL = os.environ.get("FROM_EMAIL", SMTP_USER)


def load_json(path, default):
    if not path.exists():
        return default
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def load_alerts():
    return load_json(ALERTS_FILE, [])


def load_notified():
    return load_json(NOTIFIED_FILE, {})


def save_notified(data):
    save_json(NOTIFIED_FILE, data)


def send_email(to_address: str, subject: str, body: str) -> bool:
    """Send an email using SMTP configuration.

    Returns True if sending succeeded, otherwise False.
    """
    if not (SMTP_HOST and SMTP_USER and SMTP_PASSWORD):
        logger.warning("⚠️ Brak konfiguracji SMTP – pomijam wysyłkę e-maila.")
        return False

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL or SMTP_USER
    msg["To"] = to_address
    msg.set_content(body)

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        logger.info(f"📧 Wysłano e-mail do {to_address}")
        return True
    except Exception as exc:
        logger.error(f"❌ Błąd wysyłki e-maila do {to_address}: {exc}")
        return False


def fetch_latest_prices():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    query = """
        SELECT product_id, pharmacy_name, price, expiration, fetched_at
        FROM pharmacy_prices
        WHERE (product_id, price, expiration, fetched_at) IN (
            SELECT product_id, price, expiration, MAX(fetched_at)
            FROM pharmacy_prices
            GROUP BY product_id, pharmacy_name, expiration
        )
    """
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()

    prices = {}
    for product_id, pharmacy, price, expiry, fetched in results:
        prices.setdefault(product_id, []).append({
            "pharmacy": pharmacy,
            "price": price,
            "expiration_date": expiry,
            "fetched_at": fetched
        })
    return prices


def check_alerts(alerts, current_prices, notified):
    now = datetime.now().isoformat()
    any_triggered = False

    for alert in alerts:
        product_id = alert.get("product_id")
        threshold = alert.get("threshold")
        email = alert.get("email", "– brak e-maila –")
        prices = current_prices.get(product_id, [])

        for offer in prices:
            key = f"{product_id}|{offer['pharmacy']}|{offer['price']}|{offer['expiration_date']}"
            if offer["price"] <= threshold:
                if notified.get(key) != offer["fetched_at"]:
                    logger.info(
                        f"🔔 NOWY ALERT ({now}): {product_id} "
                        f"w {offer['pharmacy']} - {offer['price']} zł "
                        f"(limit: {threshold} zł, data ważn.: {offer['expiration_date']})"
                    )
                    subject = f"Alert cenowy: {product_id}"
                    body = (
                        f"Produkt: {product_id}\n"
                        f"Apteka: {offer['pharmacy']}\n"
                        f"Cena: {offer['price']} zł (limit {threshold} zł)\n"
                        f"Ważność: {offer['expiration_date'] or 'brak'}"
                    )
                    send_email(email, subject, body)
                    notified[key] = offer["fetched_at"]
                    any_triggered = True
                break  # tylko pierwszy dopasowany alert

    if not any_triggered:
        logger.info("✅ Brak nowych alertów – wszystko pod kontrolą.")
    return notified


if __name__ == "__main__":
    alerts = load_alerts()
    notified = load_notified()

    if not alerts:
        logger.warning("⚠️ Brak aktywnych alertów do sprawdzenia.")
    else:
        prices = fetch_latest_prices()
        updated_notified = check_alerts(alerts, prices, notified)
        save_notified(updated_notified)
