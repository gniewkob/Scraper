import os
from fastapi import FastAPI, Query, Request, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from pathlib import Path
import json
import re
from datetime import datetime
from collections import defaultdict
from math import radians, cos, sin, asin, sqrt
import secrets
import logging
import bcrypt

from sqlalchemy import text

from scraper.core.config.config import DB_PATH, DB_URL
from scraper.core.config.urls import PACKAGE_SIZES
from backend.db import get_engine as build_engine
from scraper.utils.crypto import encrypt, decrypt

CITY_COORDS_FILE = Path(__file__).parent / "data" / "city_coords.json"

STATIC_DIR = str(Path(__file__).parent / "static")
TEMPLATES_DIR = str(Path(__file__).parent / "templates")

SECRET_KEY = os.environ.get("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY environment variable is required")

ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH")
if not ADMIN_PASSWORD_HASH:
    raise RuntimeError("ADMIN_PASSWORD_HASH environment variable is required")

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATES_DIR)


def get_db_engine():
    """Return shared SQLAlchemy engine respecting overrides for tests."""
    return build_engine(DB_URL, DB_PATH)


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


def require_admin(request: Request):
    if not request.session.get("admin"):
        raise HTTPException(status_code=401)


def mask_email(email):
    """Return a masked version of an email address for display."""
    if not email or "@" not in email:
        return email or ""
    local, domain = email.split("@", 1)
    visible = local[:4]
    return f"{visible}***@{domain}"


def mask_phone(phone):
    """Return a masked version of a phone number for display."""
    if not phone:
        return ""
    if len(phone) <= 6:
        return phone
    return f"{phone[:3]}***{phone[-3:]}"


logger = logging.getLogger(__name__)


def send_confirmation_email(email: str, token: str) -> None:
    """Send confirmation token via email. Placeholder implementation.

    In the real system this would dispatch an email containing a link the
    user can follow to confirm the alert.  For now we just log the target
    address and generated URL so tests can assert the behaviour without
    sending actual messages.
    """
    if email:
        confirm_url = f"https://example.com/confirm?token={token}"
        logger.info(
            "Sending confirmation email to %s with link %s", email, confirm_url
        )


def send_confirmation_sms(phone: str, token: str) -> None:
    """Send confirmation token via SMS. Placeholder implementation.

    For SMS we keep the message concise and only log the token, but the link
    could equally be sent here depending on the SMS gateway used.
    """
    if phone:
        logger.info(
            "Sending confirmation SMS to %s with token %s", phone, token
        )


@app.get("/admin/login", response_class=HTMLResponse)
def admin_login_form(request: Request):
    return templates.TemplateResponse("admin_login.html", {"request": request, "error": None})


@app.post("/admin/login", response_class=HTMLResponse)
async def admin_login(request: Request):
    form = await request.form()
    password = form.get("password", "")
    if bcrypt.checkpw(password.encode(), ADMIN_PASSWORD_HASH.encode()):
        request.session["admin"] = True
        return RedirectResponse("/admin", status_code=302)
    return templates.TemplateResponse(
        "admin_login.html", {"request": request, "error": "Błędne hasło"}
    )


@app.get("/admin/logout")
def admin_logout(request: Request):
    request.session.clear()
    return RedirectResponse("/admin/login")


@app.get("/admin", response_class=HTMLResponse)
def admin_panel(request: Request):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login")
    require_admin(request)
    engine = get_db_engine()
    with engine.connect() as conn:
        rows = conn.execute(
            text(
                """
                SELECT ua.product_id, ua.threshold, ua.email_encrypted, ua.phone_encrypted, ua.created, ua.confirmed, p.name
                FROM user_alerts ua
                LEFT JOIN products p ON ua.product_id = p.slug
                ORDER BY ua.id DESC
                """
            )
        ).mappings().all()

    alerts = []
    for row in rows:
        alerts.append(
            {
                "email": mask_email(decrypt(row["email_encrypted"])),
                "phone": mask_phone(decrypt(row["phone_encrypted"])),
                "threshold": row["threshold"],
                "product_name": row["name"] or row["product_id"],
                "created": row["created"],
            }
        )

    return templates.TemplateResponse("admin.html", {"request": request, "alerts": alerts})


@app.get("/api/products", response_class=JSONResponse)
def get_products():
    engine = get_db_engine()
    with engine.connect() as conn:
        rows = conn.execute(text("SELECT DISTINCT name FROM products")).fetchall()

    results = []
    for row in rows:
        name = row[0]
        label = (
            name
            .replace("Cannabis", "")
            .replace("Flos", "")
            .replace("Marihuana Lecznicza Medyczna", "")
            .replace("Medyczna", "")
            .strip()
            .title()
        )
        results.append({"name": name, "label": label})
    return results


def haversine(lat1, lon1, lat2, lon2):
    # Zwraca dystans w km między dwoma punktami
    R = 6371  # km
    lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    )
    c = 2 * asin(sqrt(a))
    return R * c


def compute_price_info(price, unit, product_id, expiration, now=None):
    """Compute helper values for price information."""
    if now is None:
        now = datetime.now()

    short_expiry = False
    if expiration:
        try:
            days_left = (datetime.fromisoformat(expiration) - now).days
            short_expiry = days_left <= 30
        except Exception:
            pass

    price_per_g = None
    if unit:
        match = re.search(r"(\d+(?:[.,]\d+)?)\s*g", unit)
        if match:
            grams = float(match.group(1).replace(",", "."))
            if grams:
                price_per_g = price / grams

    if price_per_g is None and price >= 100:
        pkg = PACKAGE_SIZES.get(product_id)
        if pkg:
            price_per_g = price / pkg

    display_price = price_per_g if price_per_g is not None else price
    return price_per_g, display_price, short_expiry


@app.get("/api/product/{product_name}", response_class=JSONResponse)
def get_product_by_name(
    product_name: str,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    sort: str = Query("price"),
    order: str = Query("asc"),
    city: str = Query(None),
    lat: float = Query(None),
    lon: float = Query(None),
    radius: float = Query(None),
):
    from urllib.parse import unquote

    decoded_name = unquote(product_name)
    engine = get_db_engine()
    with engine.connect() as conn:
        row = conn.execute(
            text("SELECT id, slug FROM products WHERE name = :name"),
            {"name": decoded_name},
        ).mappings().first()
    if not row:
        return JSONResponse({"error": "Produkt nie znaleziony"}, status_code=404)
    product_id = row["id"]
    product_slug = row["slug"]

    allowed_sort = {"price", "expiration", "fetched_at"}
    allowed_order = {"asc", "desc"}
    sort_sql = sort if sort in allowed_sort else "price"
    order_sql = order if order in allowed_order else "asc"

    base_query = """
        SELECT *,
               ROW_NUMBER() OVER (
                   PARTITION BY pharmacy_name, expiration
                   ORDER BY datetime(fetched_at) DESC
               ) AS rn
        FROM pharmacy_prices
        WHERE product_id = :pid
          AND (expiration IS NULL OR DATE(expiration) >= DATE('now'))
    """
    params = {"pid": product_id}

    if city:
        base_query += " AND (address LIKE :city1 OR address LIKE :city2)"
        params.update({"city1": f"%, {city}", "city2": f"% {city}"})

    query = (
        f"SELECT * FROM ({base_query}) WHERE rn = 1 ORDER BY {sort_sql} {order_sql} "
        "LIMIT :limit OFFSET :offset"
    )
    query_params = {**params, "limit": limit, "offset": offset}

    with engine.connect() as conn:
        rows = conn.execute(text(query), query_params).mappings().all()
        total = conn.execute(
            text(f"SELECT COUNT(*) FROM ({base_query}) WHERE rn = 1"), params
        ).scalar()

    offers = []
    now = datetime.now()
    MINIMUM_DISPLAY_PRICE = 10

    for row in rows:
        price = float(row["price"])
        if price < MINIMUM_DISPLAY_PRICE:
            continue
        # --- Filtr promień od lokalizacji użytkownika ---
        if lat is not None and lon is not None and radius is not None:
            plat = row["pharmacy_lat"]
            plon = row["pharmacy_lon"]
            if plat is None or plon is None:
                continue
            distance = haversine(lat, lon, plat, plon)
            if distance > radius:
                continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, product_slug, expiration, now
        )
        offer = {
            "pharmacy": row["pharmacy_name"],
            "address": row["address"],
            "price": display_price,
            "unit": unit,
            "expiration": expiration,
            "fetched_at": fetched_at,
            "short_expiry": short_expiry,
            "map_url": row["map_url"] or "",
            "pharmacy_lat": row["pharmacy_lat"],
            "pharmacy_lon": row["pharmacy_lon"],
        }
        if price_per_g is not None:
            offer["price_per_g"] = price_per_g
        offers.append(offer)

    # --- budujemy trend i top3 (POZA pętlą for) ---
    trend_data = []
    seen_top3_keys = set()
    top3 = []
    for offer in offers:
        trend_data.append(
            {
                "price": offer["price"],
                "expiration": offer["expiration"],
                "fetched_at": offer["fetched_at"],
            }
        )
        key = (offer["pharmacy"], offer["expiration"])
        if key not in seen_top3_keys and len(top3) < 3:
            top3.append(offer)
            seen_top3_keys.add(key)

    return {
        "offers": offers,
        "total": total,
        "limit": limit,
        "offset": offset,
        "sort": sort_sql,
        "order": order_sql,
        "top3": top3,
        "trend": trend_data,
    }


# --------- ALERTY I GRUPOWANIE ---------
@app.get("/api/alerts", response_class=JSONResponse)
def get_price_alerts():
    engine = get_db_engine()
    with engine.connect() as conn:
        rows = conn.execute(
            text(
                """
                SELECT * FROM pharmacy_prices
                WHERE price < 35 AND price >= 10
                  AND (expiration IS NULL OR DATE(expiration) >= DATE('now'))
                ORDER BY price ASC
                """
            )
        ).mappings().all()

    alerts = []
    now = datetime.now()
    for row in rows:
        price = float(row["price"])
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, row["product_id"], expiration, now
        )

        offer = {
            "product_id": row["product_id"],
            "product": row["product_id"],
            "pharmacy": row["pharmacy_name"],
            "price": display_price,
            "unit": "g",
            "expiration": expiration,
            "fetched_at": fetched_at,
            "short_expiry": short_expiry,
            "map_url": row["map_url"],
        }
        if price_per_g is not None:
            offer["price_per_g"] = price_per_g

        alerts.append(offer)

    return alerts


@app.get("/api/alerts_filtered", response_class=JSONResponse)
def get_filtered_alerts():
    engine = get_db_engine()
    with engine.connect() as conn:
        rows = conn.execute(
            text(
                """
                SELECT p.*, pr.slug, pr.name
                FROM pharmacy_prices AS p
                LEFT JOIN products pr ON p.product_id = pr.id
                WHERE fetched_at = (
                    SELECT MAX(fetched_at)
                    FROM pharmacy_prices
                    WHERE
                        product_id = p.product_id AND
                        pharmacy_name = p.pharmacy_name AND
                        price = p.price AND
                        expiration = p.expiration
                )
                  AND (p.expiration IS NULL OR DATE(p.expiration) >= DATE('now'))
                """
            )
        ).mappings().all()

    alerts = []
    now = datetime.now()

    for row in rows:
        price = float(row["price"])
        if price < 10:
            continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, row["slug"], expiration, now
        )

        offer = {
            "product_id": row["slug"],
            "product": row["name"] or row["slug"],
            "pharmacy": row["pharmacy_name"],
            "price": display_price,
            "unit": row["unit"],
            "expiration": expiration,
            "fetched_at": fetched_at,
            "availability": row["availability"],
            "updated": row["updated"],
            "map_url": row["map_url"],
            "short_expiry": short_expiry,
        }
        if price_per_g is not None:
            offer["price_per_g"] = price_per_g

        alerts.append(offer)

    return alerts


@app.get("/api/alerts_grouped", response_class=JSONResponse)
def get_grouped_alerts(city: str = Query(None)):
    engine = get_db_engine()
    base_query = """
        SELECT p.*, pr.slug, pr.name,
               ROW_NUMBER() OVER (
                   PARTITION BY p.product_id, p.pharmacy_name, p.expiration, p.price
                   ORDER BY datetime(p.fetched_at) DESC
               ) AS rn
        FROM pharmacy_prices p
        LEFT JOIN products pr ON p.product_id = pr.id
        WHERE p.price IS NOT NULL
          AND (p.expiration IS NULL OR DATE(p.expiration) >= DATE('now'))
    """
    params = {}
    if city:
        base_query += " AND (p.address LIKE :city1 OR p.address LIKE :city2)"
        params.update({"city1": f"%, {city}", "city2": f"% {city}"})

    query = f"SELECT * FROM ({base_query}) WHERE rn = 1"
    with engine.connect() as conn:
        rows = conn.execute(text(query), params).mappings().all()

    grouped = defaultdict(list)
    names = {}
    now = datetime.now()

    for row in rows:
        price = float(row["price"])
        if price < 10:
            continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, row["slug"], expiration, now
        )

        address = row["address"] or ""
        city_match = address.split(",")[-1].strip() if "," in address else address
        city = re.sub(r"^\d{2}-\d{3}\s*", "", city_match) if city_match else ""

        offer = {
            "pharmacy": row["pharmacy_name"],
            "price": display_price,
            "unit": row["unit"],
            "expiration": expiration,
            "fetched_at": fetched_at,
            "availability": row["availability"],
            "updated": row["updated"],
            "map_url": row["map_url"],
            "short_expiry": short_expiry,
            "city": city,
        }
        if price_per_g is not None:
            offer["price_per_g"] = price_per_g

        slug = row["slug"] or ""
        grouped[slug].append(offer)
        names[slug] = row["name"] or slug

    results = []
    for slug, offers in grouped.items():
        if not offers:
            continue
        min_price = min(o["price"] for o in offers)
        results.append(
            {
                "product_id": slug,
                "product": names.get(slug, slug),
                "min_price": min_price,
                "offers": sorted(offers, key=lambda x: x["price"]),
            }
        )
    return results


# --------- ALERTY: rejestracja i lista ---------
@app.post("/api/alerts/register", response_class=JSONResponse)
async def register_alert(request: Request):
    data = await request.json()
    email = data.get("email")
    phone = data.get("phone")
    threshold = data.get("threshold")
    product_name = data.get("product_name")

    if ((not email and not phone) or threshold is None or not product_name):
        return JSONResponse(
            {"status": "error", "message": "Brakuje danych"}, status_code=400
        )

    token = secrets.token_urlsafe(16)
    engine = get_db_engine()
    with engine.connect() as conn:
        row = conn.execute(
            text("SELECT slug FROM products WHERE name = :name"),
            {"name": product_name},
        ).first()
        if not row:
            return JSONResponse(
                {"status": "error", "message": "Nieznany produkt"},
                status_code=400,
            )
        conn.execute(
            text(
                """
                INSERT INTO user_alerts (product_id, threshold, email_encrypted, phone_encrypted, created, token, confirmed)
                VALUES (:pid, :threshold, :email, :phone, :created, :token, 0)
                """
            ),
            {
                "pid": row[0],
                "threshold": threshold,
                "email": encrypt(email) if email else None,
                "phone": encrypt(phone) if phone else None,
                "created": datetime.now().isoformat(),
                "token": token,
            },
        )
        conn.commit()

    # send confirmation via email or SMS
    if email:
        send_confirmation_email(email, token)
    if phone:
        send_confirmation_sms(phone, token)

    return {"status": "ok"}


@app.post("/api/alerts/confirm", response_class=JSONResponse)
async def confirm_alert(request: Request):
    data = await request.json()
    token = data.get("token")
    if not token:
        return JSONResponse({"status": "error", "message": "Brak tokenu"}, status_code=400)

    engine = get_db_engine()
    with engine.connect() as conn:
        row = conn.execute(
            text("SELECT id FROM user_alerts WHERE token = :token"),
            {"token": token},
        ).first()
        if not row:
            return JSONResponse({"status": "error", "message": "Nieprawidłowy token"}, status_code=400)
        conn.execute(
            text("UPDATE user_alerts SET confirmed = 1, token = NULL WHERE id = :id"),
            {"id": row[0]},
        )
        conn.commit()

    return {"status": "ok"}


@app.get("/api/alerts/list", response_class=JSONResponse)
def list_alerts():
    engine = get_db_engine()
    with engine.connect() as conn:
        rows = conn.execute(
            text(
                """
                SELECT ua.product_id, ua.threshold, ua.email_encrypted, ua.phone_encrypted, ua.created, ua.confirmed, p.name
                FROM user_alerts ua
                LEFT JOIN products p ON ua.product_id = p.slug
                ORDER BY ua.id DESC
                """
            )
        ).mappings().all()

    results = []
    for row in rows:
        results.append(
            {
                "email": decrypt(row["email_encrypted"]),
                "phone": decrypt(row["phone_encrypted"]),
                "threshold": row["threshold"],
                "product_name": row["name"] or row["product_id"],
                "created": row["created"],
                "product_id": row["product_id"],
                "confirmed": bool(row["confirmed"]),
            }
        )
    return results


@app.get("/api/cities", response_class=JSONResponse)
def get_cities():
    engine = get_db_engine()
    with engine.connect() as conn:
        rows = conn.execute(
            text("SELECT DISTINCT address FROM pharmacy_prices WHERE address IS NOT NULL AND address != ''")
        ).fetchall()
    cities = set()
    for (address,) in rows:
        if ',' in address:
            city_part = address.split(',')[-1].strip()
            # Usuń kod pocztowy jeśli jest (np. "01-234 Warszawa" → "Warszawa")
            city = re.sub(r'^\d{2}-\d{3}\s*', '', city_part)
            if city:
                cities.add(city)
    return sorted(cities)


@app.get("/api/city_coords/{city}", response_class=JSONResponse)
def get_city_coords(city: str):
    if not CITY_COORDS_FILE.exists():
        raise HTTPException(status_code=404, detail="Coordinates file missing")
    try:
        with open(CITY_COORDS_FILE, "r", encoding="utf-8") as f:
            coords = json.load(f)
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to load coordinates")

    for name, loc in coords.items():
        if name.lower() == city.lower():
            return {"lat": loc["lat"], "lon": loc["lon"]}

    raise HTTPException(status_code=404, detail="City not found")
