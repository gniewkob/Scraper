import json
import logging
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from pathlib import Path
import bcrypt
import time

from sqlalchemy import text

from scraper.core.config.config import DB_PATH, DB_URL
from backend.db import (
    get_engine as build_engine,
    get_cities as fetch_cities,
    dispose_engines,
)
from scraper.utils.crypto import decrypt, _get_fernet
from .config import settings
from .routes.utils import compute_price_info
from twilio.rest import Client
from scraper.cli.email_utils import send_email
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest
from fastapi_csrf_protect import CsrfProtect
from pydantic import BaseModel

STATIC_DIR = str(Path(__file__).parent / "static")
TEMPLATES_DIR = str(Path(__file__).parent / "templates")
CITY_COORDS_FILE = Path(__file__).resolve().parent / "data" / "city_coords.json"
_CITY_COORDS_CACHE: Optional[dict] = None

SECRET_KEY = settings.secret_key
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY environment variable is required")

ADMIN_PASSWORD_HASH = settings.admin_password_hash
if not ADMIN_PASSWORD_HASH:
    raise RuntimeError("ADMIN_PASSWORD_HASH environment variable is required")

# Ensure encryption key is available at startup
try:
    _get_fernet()
except RuntimeError as exc:
    raise RuntimeError("ALERTS_FERNET_KEY environment variable is required") from exc

app = FastAPI()

origins = [
    origin.strip()
    for origin in settings.allowed_origins.split(",")
    if origin.strip()
]

methods = ["GET", "POST", "OPTIONS"]
headers = ["Authorization", "Content-Type"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=headers,
)
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATES_DIR)

TWILIO_SID = settings.twilio_account_sid
TWILIO_TOKEN = settings.twilio_auth_token
TWILIO_FROM = settings.twilio_whatsapp_from

logger = logging.getLogger(__name__)


class CsrfSettings(BaseModel):
    secret_key: str = SECRET_KEY


@CsrfProtect.load_config
def get_csrf_config() -> CsrfSettings:  # pragma: no cover - simple config hook
    return CsrfSettings()

def send_confirmation_email(email: str, token: str) -> bool:
    if not email:
        return False
    base_url = settings.confirmation_base_url.rstrip("/")
    confirm_url = f"{base_url}/confirm?token={token}"
    subject = "Potwierdzenie alertu cenowego"
    body = f"Kliknij link, aby potwierdzić alert: {confirm_url}"
    return send_email(email, subject, body)

def send_confirmation_sms(phone: str, token: str) -> bool:
    if not phone:
        return False
    if not (TWILIO_SID and TWILIO_TOKEN and TWILIO_FROM):
        logger.warning("Twilio configuration missing; skipping SMS to %s", phone)
        return False
    base_url = settings.confirmation_base_url.rstrip("/")
    confirm_url = f"{base_url}/confirm?token={token}"
    body = f"Potwierdź alert: {confirm_url}"
    try:
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        message = client.messages.create(
            body=body,
            from_=f"whatsapp:{TWILIO_FROM}" if not TWILIO_FROM.startswith("whatsapp:") else TWILIO_FROM,
            to=f"whatsapp:{phone}" if not phone.startswith("whatsapp:") else phone,
        )
        logger.info("Sent confirmation WhatsApp to %s: %s", phone, message.sid)
        return True
    except Exception as exc:
        logger.error("Failed to send confirmation WhatsApp to %s: %s", phone, exc)
        return False

from .routes import alerts, products

app.include_router(products.router)
app.include_router(alerts.router)


@app.on_event("shutdown")
async def shutdown_event() -> None:
    """Dispose database engines on application shutdown."""
    await dispose_engines()


def get_db_engine():
    """Return shared SQLAlchemy engine respecting overrides for tests."""
    return build_engine(DB_URL, DB_PATH)


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# Routes to serve Leaflet marker images from root path (for compatibility)
@app.get("/distmarker-icon-2x.png")
def get_distmarker_icon_2x():
    return FileResponse(
        Path(STATIC_DIR) / "distmarker-icon-2x.png", media_type="image/png"
    )


@app.get("/distmarker-shadow.png")
def get_distmarker_shadow():
    return FileResponse(
        Path(STATIC_DIR) / "distmarker-shadow.png", media_type="image/png"
    )


@app.get("/marker-icon.png")
def get_marker_icon():
    return FileResponse(Path(STATIC_DIR) / "marker-icon.png", media_type="image/png")


@app.get("/marker-icon-2x.png")
def get_marker_icon_2x():
    return FileResponse(Path(STATIC_DIR) / "marker-icon-2x.png", media_type="image/png")


@app.get("/marker-shadow.png")
def get_marker_shadow():
    return FileResponse(Path(STATIC_DIR) / "marker-shadow.png", media_type="image/png")


def require_admin(request: Request):
    if not request.session.get("admin"):
        raise HTTPException(status_code=401)


def mask_email(email: Optional[str]) -> str:
    """Return a masked version of an email address for display."""
    if not email or "@" not in email:
        return email or ""
    local, domain = email.split("@", 1)
    visible = local[: settings.email_mask_visible_chars]
    return f"{visible}***@{domain}"


def mask_phone(phone: Optional[str]) -> str:
    """Return a masked version of a phone number for display."""
    if not phone:
        return ""
    if len(phone) <= settings.phone_mask_min_length:
        return phone
    return (
        f"{phone[: settings.phone_mask_visible_prefix]}***"
        f"{phone[-settings.phone_mask_visible_suffix:]}"
    )


@app.get("/healthz")
def healthz():
    """Liveness probe."""
    return {"status": "ok"}


@app.get("/readyz")
async def readyz():
    """Readiness probe with DB check."""
    engine = get_db_engine()
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        return {"status": "ready"}
    except Exception as exc:  # pragma: no cover - defensive
        raise HTTPException(status_code=503, detail=f"db not ready: {exc}")


@app.get("/metrics")
def metrics() -> Response:
    """Prometheus metrics endpoint."""
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)


@app.get("/api/cities")
async def get_cities_endpoint():
    """Return list of unique city names using shared helper."""
    return await fetch_cities()


@app.get("/api/city_coords/{city}")
def get_city_coords(city: str):
    """Return latitude/longitude for a given city from cached file."""
    global _CITY_COORDS_CACHE

    if _CITY_COORDS_CACHE is None:
        if not CITY_COORDS_FILE.exists():
            raise HTTPException(status_code=404, detail="Coordinates file missing")
        try:
            with open(CITY_COORDS_FILE, "r", encoding="utf-8") as f:
                _CITY_COORDS_CACHE = json.load(f)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to load coordinates")

    for name, loc in _CITY_COORDS_CACHE.items():
        if name.lower() == city.lower():
            return {"lat": loc["lat"], "lon": loc["lon"]}

    raise HTTPException(status_code=404, detail="City not found")




@app.get("/admin/login", response_class=HTMLResponse)
def admin_login_form(request: Request, csrf: CsrfProtect = CsrfProtect()):
    token = csrf.create_csrf_token()
    response = templates.TemplateResponse(
        "admin_login.html", {"request": request, "error": None, "csrf_token": token}
    )
    csrf.set_csrf_cookie(response)
    return response


@app.post("/admin/login", response_class=HTMLResponse)
async def admin_login(request: Request, csrf: CsrfProtect = CsrfProtect()):
    form = await request.form()
    token = form.get("csrf-token")
    try:
        csrf.validate_csrf(token)
    except Exception:
        return templates.TemplateResponse(
            "admin_login.html",
            {"request": request, "error": "Nieprawidłowy token CSRF", "csrf_token": csrf.create_csrf_token()},
            status_code=400,
        )
    password = form.get("password", "")
    # simple session-based rate limiting
    locked_until = request.session.get("admin_lock_until")
    if locked_until and time.time() < float(locked_until):
        return templates.TemplateResponse(
            "admin_login.html",
            {"request": request, "error": "Zbyt wiele prób. Spróbuj ponownie później."},
        )

    if bcrypt.checkpw(password.encode(), ADMIN_PASSWORD_HASH.encode()):
        request.session["admin"] = True
        request.session.pop("admin_failed", None)
        request.session.pop("admin_lock_until", None)
        return RedirectResponse("/admin", status_code=302)
    # failed attempt
    attempts = int(request.session.get("admin_failed", 0)) + 1
    request.session["admin_failed"] = attempts
    if attempts >= 5:
        request.session["admin_lock_until"] = time.time() + 60
    return templates.TemplateResponse(
        "admin_login.html",
        {"request": request, "error": "Błędne hasło"},
    )


@app.get("/admin/logout")
def admin_logout(request: Request):
    request.session.clear()
    return RedirectResponse("/admin/login")


@app.get("/admin", response_class=HTMLResponse)
async def admin_panel(request: Request):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login")
    require_admin(request)
    engine = get_db_engine()
    async with engine.begin() as conn:
        rows = (
            (
                await conn.execute(
                    text(
                        """
                    SELECT ua.product_id, ua.threshold, ua.email_encrypted, ua.phone_encrypted, ua.created, ua.confirmed, p.name
                    FROM user_alerts ua
                    LEFT JOIN products p ON ua.product_id = p.id
                    ORDER BY ua.id DESC
                    """
                    )
                )
            )
            .mappings()
            .all()
        )

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

    return templates.TemplateResponse(
        "admin.html", {"request": request, "alerts": alerts}
    )


# Routes for /images/ path (used by compiled React component)
@app.get("/images/marker-icon.png")
def get_images_marker_icon():
    return FileResponse(
        Path(STATIC_DIR) / "images" / "marker-icon.png", media_type="image/png"
    )


@app.get("/images/marker-icon-2x.png")
def get_images_marker_icon_2x():
    return FileResponse(
        Path(STATIC_DIR) / "images" / "marker-icon-2x.png", media_type="image/png"
    )


@app.get("/images/marker-shadow.png")
def get_images_marker_shadow():
    return FileResponse(
        Path(STATIC_DIR) / "images" / "marker-shadow.png", media_type="image/png"
    )
