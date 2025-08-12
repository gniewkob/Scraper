# cli/check_alerts.py

import importlib.util
import sys
from pathlib import Path
import logging
import json
import sqlite3
import os
from datetime import datetime
from twilio.rest import Client
from scraper.core.bootstrap import init_logging, ensure_schema
from scraper.core.config.config import DB_PATH
from scraper.cli.email_utils import send_email
from scraper.utils.crypto import decrypt

# 🔧 Inicjalizacja logowania
init_logging()
logger = logging.getLogger(__name__)

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
NOTIFIED_FILE = Path("notified_alerts.json")

# 📱 Konfiguracja Twilio WhatsApp
TWILIO_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_FROM = os.environ.get("TWILIO_WHATSAPP_FROM")


def load_json(path, default):
    if not path.exists():
        return default
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def load_alerts():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT product_id, threshold, email_encrypted, phone_encrypted FROM user_alerts WHERE confirmed = 1"
    )
    rows = cursor.fetchall()
    conn.close()
    alerts = []
    for pid, threshold, email_e, phone_e in rows:
        alerts.append(
            {
                "product_id": pid,
                "threshold": threshold,
                "email": decrypt(email_e),
                "phone": decrypt(phone_e),
            }
        )
    return alerts


def load_notified():
    return load_json(NOTIFIED_FILE, {})


def save_notified(data):
    save_json(NOTIFIED_FILE, data)


def send_whatsapp(to_number: str, body: str) -> bool:
    """Send a WhatsApp message using Twilio API."""
    if not (TWILIO_SID and TWILIO_TOKEN and TWILIO_FROM):
        logger.warning("⚠️ Brak konfiguracji Twilio – pomijam wysyłkę WhatsApp.")
        return False
    try:
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        message = client.messages.create(
            body=body,
            from_=f"whatsapp:{TWILIO_FROM}" if not TWILIO_FROM.startswith("whatsapp:") else TWILIO_FROM,
            to=f"whatsapp:{to_number}" if not to_number.startswith("whatsapp:") else to_number,
        )
        logger.info(f"📲 Wysłano WhatsApp do {to_number}: {message.sid}")
        return True
    except Exception as exc:
        logger.error(f"❌ Błąd wysyłki WhatsApp do {to_number}: {exc}")
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
        email = alert.get("email")
        phone = alert.get("phone")
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
                    if email:
                        send_email(email, subject, body)
                    if phone:
                        send_whatsapp(phone, body)
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
