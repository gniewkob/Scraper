import os
from fastapi import FastAPI, Query, Request, HTTPException, Depends
from fastapi.responses import JSONResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from pathlib import Path
import json
import re
from datetime import datetime, timezone
from collections import defaultdict
from math import radians, cos, sin, asin, sqrt
import secrets
import logging
import bcrypt

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from typing import AsyncGenerator, Optional

from pydantic_settings import BaseSettings
from fastapi_csrf_protect import CsrfProtect

from scraper.core.config.config import DB_PATH, DB_URL
try:
    from scraper.core.config.urls import PACKAGE_SIZES
except ModuleNotFoundError:  # pragma: no cover - fallback for tests
    PACKAGE_SIZES = {}
from backend.db import get_engine as build_engine
from scraper.utils.crypto import encrypt, decrypt
try:
    from scraper.services.price_classifier import PriceClassifier
except ModuleNotFoundError:  # pragma: no cover - fallback for tests
    class PriceClassifier:  # type: ignore
        def __init__(self, db_path: str, *args, **kwargs):
            self.db_path = db_path

        def classify_price(self, product_id: str, price: str, unit: str):
            import sqlite3

            conn = sqlite3.connect(self.db_path)
            try:
                cur = conn.execute(
                    "SELECT product_type FROM product_type_mapping WHERE product_id = ?",
                    (product_id,),
                )
                row = cur.fetchone()
                product_type = row[0] if row else "default"

                cur = conn.execute(
                    "SELECT super_deal, deal, normal FROM price_thresholds WHERE product_type = ?",
                    (product_type,),
                )
                thresh = cur.fetchone()
                classification = ""
                if thresh:
                    p = float(price)
                    super_deal, deal, normal = thresh
                    if p <= super_deal:
                        classification = "🔥 super okazja"
                    elif p <= deal:
                        classification = "okazja"
                    elif p <= normal:
                        classification = "normalna cena"
                    else:
                        classification = "drogo"

                cur = conn.execute(
                    "SELECT min_price FROM price_statistics WHERE product = ?",
                    (product_id,),
                )
                hist = cur.fetchone()
                is_low = False
                if hist:
                    try:
                        is_low = float(price) <= float(hist[0])
                    except Exception:
                        is_low = False
                return {"classification": classification, "is_historical_low": is_low}
            finally:
                conn.close()


_price_classifier: Optional[PriceClassifier] = None


def get_price_classifier() -> PriceClassifier:
    """Return a shared PriceClassifier instance.

    Recreates the classifier if the database path has changed to ensure tests
    can override ``DB_PATH`` and still get a valid instance.
    """

    global _price_classifier
    if _price_classifier is None or getattr(_price_classifier, "db_path", None) != DB_PATH:
        _price_classifier = PriceClassifier(DB_PATH)
    return _price_classifier

CITY_COORDS_FILE = Path(__file__).parent / "data" / "city_coords.json"

STATIC_DIR = str(Path(__file__).parent / "static")
TEMPLATES_DIR = str(Path(__file__).parent / "templates")

SECRET_KEY = os.environ.get("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY environment variable is required")

ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH")
if not ADMIN_PASSWORD_HASH:
    raise RuntimeError("ADMIN_PASSWORD_HASH environment variable is required")

class CsrfSettings(BaseSettings):
    secret_key: str = SECRET_KEY
    token_location: str = "body"
    token_key: str = "csrf-token"


@CsrfProtect.load_config
def get_csrf_config():
    return CsrfSettings()


csrf = CsrfProtect()

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATES_DIR)


@app.middleware("http")
async def csrf_middleware(request: Request, call_next):
    if request.url.path == "/admin/login" and request.method == "POST":
        # store the form data on the request.state instead of the private attribute
        request.state.form = await request.form()
    response = await call_next(request)
    return response


def get_db_engine():
    """Return shared SQLAlchemy engine respecting overrides for tests."""
    return build_engine(DB_URL, DB_PATH)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    engine = get_db_engine()
    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    async with session_factory() as session:
        yield session


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


def login_page(request: Request, error: str | None = None):
    token, signed = csrf.generate_csrf_tokens()
    context = {"request": request, "error": error, "csrf_token": token}
    response = templates.TemplateResponse("admin_login.html", context)
    csrf.set_csrf_cookie(signed, response)
    return response


@app.get("/admin/login", response_class=HTMLResponse)
def admin_login_form(request: Request):
    return login_page(request)


@app.post("/admin/login", response_class=HTMLResponse)
async def admin_login(request: Request, csrf_protect: CsrfProtect = Depends()):
    # Retrieve form data stored by the middleware; fall back to parsing the
    # request directly if it was not set to avoid AttributeError.
    form = getattr(request.state, "form", None)
    if form is None:
        form = await request.form()
    try:
        await csrf_protect.validate_csrf(request)
    except Exception:
        return login_page(request, error="Nieprawidłowy token CSRF")
    password = form.get("password", "")
    if bcrypt.checkpw(password.encode(), ADMIN_PASSWORD_HASH.encode()):
        request.session["admin"] = True
        return RedirectResponse("/admin", status_code=302)
    return login_page(request, error="Błędne hasło")


@app.get("/admin/logout")
def admin_logout(request: Request):
    request.session.clear()
    return RedirectResponse("/admin/login")


@app.get("/admin", response_class=HTMLResponse)
async def admin_panel(
    request: Request, session: AsyncSession = Depends(get_db)
):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login")
    require_admin(request)
    result = await session.execute(
        text(
            """
            SELECT ua.product_id, ua.threshold, ua.email_encrypted, ua.phone_encrypted, ua.created, ua.confirmed, p.name
            FROM user_alerts ua
            LEFT JOIN products p ON ua.product_id = p.id
            WHERE p.active = 1
            ORDER BY ua.id DESC
            """
        )
    )
    rows = result.mappings().all()

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
async def get_products(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        text("SELECT id, name FROM products WHERE active = 1")
    )
    rows = result.mappings().all()

    results = []
    for row in rows:
        pid = row["id"]
        name = row["name"]
        label = (
            name
            .replace("Cannabis", "")
            .replace("Flos", "")
            .replace("Marihuana Lecznicza Medyczna", "")
            .replace("Medyczna", "")
            .strip()
            .title()
        )
        results.append({"id": pid, "name": name, "label": label})
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
        now = datetime.now(tz=timezone.utc)
    elif now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)

    short_expiry = False
    if expiration:
        try:
            expiry_dt = datetime.fromisoformat(expiration)
            if expiry_dt.tzinfo is None:
                expiry_dt = expiry_dt.replace(tzinfo=timezone.utc)
            days_left = (expiry_dt - now).days
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
        pkg = PACKAGE_SIZES.get(str(product_id))
        if pkg:
            price_per_g = price / pkg

    display_price = price_per_g if price_per_g is not None else price
    return price_per_g, display_price, short_expiry


@app.get("/api/product/{product_name}", response_class=JSONResponse)
async def get_product_by_name(
    product_name: str,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    sort: str = Query("price"),
    order: str = Query("asc"),
    city: str = Query(None),
    lat: float = Query(None),
    lon: float = Query(None),
    radius: float = Query(None),
    min_price: float = Query(None, ge=0),
    classifier: PriceClassifier = Depends(get_price_classifier),
    session: AsyncSession = Depends(get_db),
):
    from urllib.parse import unquote

    decoded_name = unquote(product_name)
    result = await session.execute(
        text("SELECT id FROM products WHERE name = :name AND active = 1"),
        {"name": decoded_name},
    )
    row = result.mappings().first()
    if not row:
        return JSONResponse({"error": "Produkt nie znaleziony"}, status_code=404)
    product_id = row["id"]

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
          AND price IS NOT NULL
          AND (expiration IS NULL OR DATE(expiration) >= DATE('now'))
    """
    params = {"pid": product_id}

    if min_price is not None:
        base_query += " AND price >= :min_price"
        params["min_price"] = min_price

    if city:
        base_query += " AND (address LIKE :city1 OR address LIKE :city2)"
        params.update({"city1": f"%, {city}", "city2": f"% {city}"})

    query = (
        f"SELECT * FROM ({base_query}) WHERE rn = 1 ORDER BY {sort_sql} {order_sql} "
        "LIMIT :limit OFFSET :offset"
    )
    query_params = {**params, "limit": limit, "offset": offset}

    result = await session.execute(text(query), query_params)
    rows = result.mappings().all()
    result_total = await session.execute(
        text(f"SELECT COUNT(*) FROM ({base_query}) WHERE rn = 1"), params
    )
    total = result_total.scalar()

    offers = []
    now = datetime.now(tz=timezone.utc)
    MINIMUM_DISPLAY_PRICE = 10

    for row in rows:
        price = float(row["price"])
        if price < MINIMUM_DISPLAY_PRICE:
            continue
        if min_price is not None and price < min_price:
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
            price, unit, product_id, expiration, now
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
        try:
            classification_data = classifier.classify_price(
                str(product_id), str(price), unit or ""
            )
            bucket_map = {
                "🔥 super okazja": "super_okazja",
                "okazja": "okazja",
                "normalna cena": "normalnie",
                "drogo": "drogo",
            }
            classification = classification_data.get("classification", "")
            offer["price_bucket"] = bucket_map.get(classification, "unknown")
            offer["is_historical_low"] = classification_data.get(
                "is_historical_low", False
            )
        except Exception:
            offer["price_bucket"] = "unknown"
            offer["is_historical_low"] = False
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

    try:
        trend_data.sort(key=lambda x: datetime.fromisoformat(x["fetched_at"]))
    except Exception:
        trend_data.sort(key=lambda x: x["fetched_at"])

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
async def get_price_alerts(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        text(
            """
            SELECT p.*
            FROM pharmacy_prices p
            JOIN products pr ON p.product_id = pr.id
            WHERE pr.active = 1
              AND p.price < 35 AND p.price >= 10
              AND (p.expiration IS NULL OR DATE(p.expiration) >= DATE('now'))
            ORDER BY p.price ASC
            """
        )
    )
    rows = result.mappings().all()

    alerts = []
    now = datetime.now(tz=timezone.utc)
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
async def get_filtered_alerts(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        text(
            """
            SELECT p.*, pr.id as product_id, pr.name
            FROM pharmacy_prices AS p
            LEFT JOIN products pr ON p.product_id = pr.id
            WHERE pr.active = 1
              AND fetched_at = (
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
    )
    rows = result.mappings().all()

    alerts = []
    now = datetime.now(tz=timezone.utc)

    for row in rows:
        price = float(row["price"])
        if price < 10:
            continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, row["product_id"], expiration, now
        )

        offer = {
            "product_id": row["product_id"],
            "product": row["name"] or row["product_id"],
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
async def get_grouped_alerts(
    city: str = Query(None), session: AsyncSession = Depends(get_db)
):
    base_query = """
        SELECT p.*, pr.id as product_id, pr.name,
               ROW_NUMBER() OVER (
                   PARTITION BY p.product_id, p.pharmacy_name, p.expiration, p.price
                   ORDER BY datetime(p.fetched_at) DESC
               ) AS rn
        FROM pharmacy_prices p
        LEFT JOIN products pr ON p.product_id = pr.id
        WHERE p.price IS NOT NULL
          AND pr.active = 1
          AND (p.expiration IS NULL OR DATE(p.expiration) >= DATE('now'))
    """
    params = {}
    if city:
        base_query += " AND (p.address LIKE :city1 OR p.address LIKE :city2)"
        params.update({"city1": f"%, {city}", "city2": f"% {city}"})

    query = f"SELECT * FROM ({base_query}) WHERE rn = 1"
    result = await session.execute(text(query), params)
    rows = result.mappings().all()

    grouped = defaultdict(list)
    names = {}
    now = datetime.now(tz=timezone.utc)

    for row in rows:
        price = float(row["price"])
        if price < 10:
            continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, row["product_id"], expiration, now
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

        pid = row["product_id"]
        grouped[pid].append(offer)
        names[pid] = row["name"] or pid

    results = []
    for pid, offers in grouped.items():
        if not offers:
            continue
        min_price = min(o["price"] for o in offers)
        results.append(
            {
                "product_id": pid,
                "product": names.get(pid, pid),
                "min_price": min_price,
                "offers": sorted(offers, key=lambda x: x["price"]),
            }
        )
    return results


# --------- ALERTY: rejestracja i lista ---------
@app.post("/api/alerts/register", response_class=JSONResponse)
async def register_alert(
    request: Request, session: AsyncSession = Depends(get_db)
):
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
    result = await session.execute(
        text("SELECT id FROM products WHERE name = :name AND active = 1"),
        {"name": product_name},
    )
    row = result.first()
    if not row:
        return JSONResponse(
            {"status": "error", "message": "Nieznany produkt"},
            status_code=400,
        )
    await session.execute(
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
    await session.commit()

    # send confirmation via email or SMS
    if email:
        send_confirmation_email(email, token)
    if phone:
        send_confirmation_sms(phone, token)

    return {"status": "ok"}


@app.post("/api/alerts/confirm", response_class=JSONResponse)
async def confirm_alert(
    request: Request, session: AsyncSession = Depends(get_db)
):
    data = await request.json()
    token = data.get("token")
    if not token:
        return JSONResponse({"status": "error", "message": "Brak tokenu"}, status_code=400)

    result = await session.execute(
        text("SELECT id FROM user_alerts WHERE token = :token"),
        {"token": token},
    )
    row = result.first()
    if not row:
        return JSONResponse(
            {"status": "error", "message": "Nieprawidłowy token"}, status_code=400
        )
    await session.execute(
        text("UPDATE user_alerts SET confirmed = 1, token = NULL WHERE id = :id"),
        {"id": row[0]},
    )
    await session.commit()

    return {"status": "ok"}


@app.get("/api/alerts/list", response_class=JSONResponse)
async def list_alerts(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        text(
            """
            SELECT ua.product_id, ua.threshold, ua.email_encrypted, ua.phone_encrypted, ua.created, ua.confirmed, p.name
            FROM user_alerts ua
            LEFT JOIN products p ON ua.product_id = p.id
            WHERE p.active = 1
            ORDER BY ua.id DESC
            """
        )
    )
    rows = result.mappings().all()

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
async def get_cities(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        text(
            "SELECT DISTINCT address FROM pharmacy_prices WHERE address IS NOT NULL AND address != ''"
        )
    )
    rows = result.fetchall()
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
