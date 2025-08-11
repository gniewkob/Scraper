import os
import json
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from pathlib import Path
import bcrypt

from sqlalchemy import text

from scraper.core.config.config import DB_PATH, DB_URL
from backend.db import get_engine as build_engine, get_cities as fetch_cities
from scraper.utils.crypto import decrypt, _get_fernet
from .routes.utils import compute_price_info

STATIC_DIR = str(Path(__file__).parent / "static")
TEMPLATES_DIR = str(Path(__file__).parent / "templates")
CITY_COORDS_FILE = Path(__file__).resolve().parent / "data" / "city_coords.json"
_CITY_COORDS_CACHE: Optional[dict] = None

SECRET_KEY = os.environ.get("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY environment variable is required")

ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH")
if not ADMIN_PASSWORD_HASH:
    raise RuntimeError("ADMIN_PASSWORD_HASH environment variable is required")

# Ensure encryption key is available at startup
try:
    _get_fernet()
except RuntimeError as exc:
    raise RuntimeError("ALERTS_FERNET_KEY environment variable is required") from exc

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATES_DIR)

from .routes import alerts, products

app.include_router(products.router)
app.include_router(alerts.router)


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
def admin_login_form(request: Request):
    return templates.TemplateResponse(
        "admin_login.html", {"request": request, "error": None}
    )


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
async def admin_panel(request: Request):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login")
    require_admin(request)
    engine = get_db_engine()
    async with engine.connect() as conn:
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

