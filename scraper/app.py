import sys
import json
import sqlite3
from pathlib import Path
# 🔧 dozwolony dostęp do core i services
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from core.config.config import DB_PATH
from datetime import datetime
from flask import Flask, jsonify, render_template, send_from_directory, request
from services.price_classifier import classify_price

from core.config.urls import (
    PRODUCT_NAMES, get_url_by_name,
    get_product_name, extract_product_id
)
from services.price_classifier import classify_price

app = Flask(__name__, static_folder="static", template_folder="templates")

ALERT_FILE = Path(__file__).parent / "user_alerts.json"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def get_product_name(product_id):
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute("SELECT name FROM products WHERE product_id = ?", (product_id,))
        row = c.fetchone()
        return row[0].replace("Marihuana Lecznicza Medyczna", "").strip() if row else product_id

@app.route("/")
def index():
    from core.config.urls import PRODUCT_NAMES
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        SELECT product_id, MIN(price)
        FROM pharmacy_prices
        GROUP BY product_id
        ORDER BY MIN(price) ASC
        LIMIT 5
    """)
    alerts = [{"product": row[0], "price": row[1]} for row in c.fetchall()]
    conn.close()
    return render_template("index.html", products=PRODUCT_NAMES, alerts=alerts)



@app.route("/api/products")
def get_products():
    results = []
    for name in PRODUCT_NAMES:
        label = (
            name.replace("Cannabis", "")
                .replace("Flos", "")
                .replace("Marihuana Lecznicza Medyczna", "")
                .replace("Medyczna", "")
                .strip()
                .title()
        )
        results.append({"name": name, "label": label})
    return jsonify(results)



@app.route("/api/product/<product_name>")
def get_product_by_name(product_name):
    from urllib.parse import unquote
    decoded_name = unquote(product_name)

    product_url = get_url_by_name(decoded_name)
    if not product_url:
        return jsonify({"error": "Produkt nie znaleziony"}), 404

    product_id = extract_product_id(product_url)
    if not product_id:
        return jsonify({"error": "Nieprawidłowy URL produktu"}), 400

    conn = get_db_connection()
    rows = conn.execute("""
        SELECT *
        FROM pharmacy_prices
        WHERE product_id = ?
        ORDER BY price ASC
    """, (product_id,)).fetchall()
    conn.close()

    offers = []
    trend_data = []
    seen_top3_keys = set()

    for row in rows:
        price = float(row["price"])
        unit = row["unit"]
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        short_expiry = False

        if expiration:
            try:
                days_left = (datetime.fromisoformat(expiration) - datetime.now()).days
                short_expiry = days_left <= 30
            except:
                pass
        addr = row["address"]
        map_url = None
        if addr and "km" not in addr and len(addr) > 5:
            map_url = f"https://www.google.com/maps/search/?api=1&query={addr.replace(' ', '+')}"

        entry = {
            "pharmacy": row["pharmacy_name"],
            "address": row["address"],
            "price": price,
            "unit": unit,
            "expiration": expiration,
            "fetched_at": fetched_at,
            "short_expiry": short_expiry,
            "price_level": classify_price(price, unit or "g"),
            "map_url": map_url or ""
        }


        offers.append(entry)
        trend_data.append({
            "price": price,
            "expiration": expiration,
            "fetched_at": fetched_at
        })

    top3 = []
    for offer in offers:
        key = (offer["pharmacy"], offer["expiration"])
        if key not in seen_top3_keys:
            top3.append(offer)
            seen_top3_keys.add(key)
        if len(top3) >= 3:
            break

    return jsonify({
        "product_id": product_id,
        "product_name": decoded_name,
        "offers": offers,
        "top3": top3,
        "trend": trend_data
    })


@app.route("/api/alerts")
def get_price_alerts():
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT *
        FROM pharmacy_prices
        WHERE price < 35 AND price >= 15
        ORDER BY price ASC
    """).fetchall()
    conn.close()

    alerts = []
    for row in rows:
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        short_expiry = False
        
        if expiration:
            try:
                days_left = (datetime.fromisoformat(expiration) - datetime.now()).days
                short_expiry = days_left <= 30
            except:
                pass
        
        alerts.append({
            "product_id": row["product_id"],
            "product": get_product_name(row["product_id"]).replace("Cannabis", "").strip(),
            "pharmacy": row["pharmacy_name"],
            "price": float(row["price"]),
            "unit": "g",
            "expiration": expiration,
            "fetched_at": fetched_at,
            "short_expiry": short_expiry,
            "map_url": row["map_url"]
        })

    return jsonify(alerts)

@app.route("/api/alerts_filtered")
def get_filtered_alerts():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""
        SELECT *
        FROM pharmacy_prices AS p
        WHERE fetched_at = (
            SELECT MAX(fetched_at)
            FROM pharmacy_prices
            WHERE
                product_id = p.product_id AND
                pharmacy_name = p.pharmacy_name AND
                price = p.price AND
                expiration = p.expiration
        )
    """)

    rows = cur.fetchall()
    conn.close()

    alerts = []
    now = datetime.now()

    for row in rows:
        price = float(row["price"])
        if price < 15:
            continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        short_expiry = False

        if expiration:
            try:
                days_left = (datetime.fromisoformat(expiration) - now).days
                short_expiry = days_left <= 30
            except:
                pass

        alerts.append({
            "product_id": row["product_id"],
            "product": get_product_name(row["product_id"]).replace("Cannabis", "").strip(),
            "pharmacy": row["pharmacy_name"],
            "price": float(row["price"]),
            "unit": row["unit"],
            "expiration": expiration,
            "fetched_at": fetched_at,
            "availability": row["availability"],
            "updated": row["updated"],
            "map_url": row["map_url"],
            "short_expiry": short_expiry
        })

    return jsonify(alerts)

@app.route("/api/alerts_grouped")
def get_grouped_alerts():
    from collections import defaultdict

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("SELECT * FROM pharmacy_prices WHERE price IS NOT NULL")
    rows = cur.fetchall()
    conn.close()

    grouped = defaultdict(list)
    now = datetime.now()

    for row in rows:
        price = float(row["price"])
        if price < 15:
            continue  # ⛔️ pomijamy za tanie oferty
            
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        short_expiry = False

        if expiration:
            try:
                days_left = (datetime.fromisoformat(expiration) - now).days
                short_expiry = days_left <= 30
            except:
                pass

        offer = {
            "pharmacy": row["pharmacy_name"],
            "price": float(row["price"]),
            "unit": row["unit"],
            "expiration": expiration,
            "fetched_at": fetched_at,
            "availability": row["availability"],
            "updated": row["updated"],
            "map_url": row["map_url"],
            "short_expiry": short_expiry
        }

        grouped[row["product_id"]].append(offer)

    results = []
    for product_id, offers in grouped.items():
        if not offers:
            continue  # pomiń produkty bez ofert powyżej 15 zł
        
        name = get_product_name(product_id).replace("Cannabis", "").strip()
        min_price = min(o["price"] for o in offers)
        results.append({
            "product_id": product_id,
            "product": name,
            "min_price": min_price,
            "offers": sorted(offers, key=lambda x: x["price"])
        })

    return jsonify(results)

@app.route("/api/alerts/register", methods=["POST"])
def register_alert():
    data = request.json
    email = data.get("email")
    threshold = data.get("threshold")
    product_name = data.get("product_name")

    if not email or not threshold:
        return jsonify({"status": "error", "message": "Brakuje danych"}), 400

    if product_name and product_name not in PRODUCT_NAMES:
        return jsonify({"status": "error", "message": "Nieznany produkt"}), 400

    alerts = []
    if ALERT_FILE.exists():
        try:
            with open(ALERT_FILE, "r", encoding="utf-8") as f:
                alerts = json.load(f)
        except:
            alerts = []

    alerts.append({
        "email": email,
        "threshold": threshold,
        "product_name": product_name,
        "created": datetime.now().isoformat()
    })

    with open(ALERT_FILE, "w", encoding="utf-8") as f:
        json.dump(alerts, f, indent=2, ensure_ascii=False)

    return jsonify({"status": "ok"})



@app.route("/api/alerts/list", methods=["GET"])
def list_alerts():
    if not ALERT_FILE.exists():
        return jsonify([])

    try:
        with open(ALERT_FILE, "r", encoding="utf-8") as f:
            alerts = json.load(f)
    except:
        alerts = []

    return jsonify(alerts)


@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("static", filename)


if __name__ == "__main__":
    app.run(debug=True)
