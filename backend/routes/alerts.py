import logging
import uuid
import re
from collections import defaultdict
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, Query, Request
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncConnection

from scraper.utils.crypto import encrypt, decrypt
from backend.db import get_connection
from .utils import compute_price_info
from backend.utils import (
    send_confirmation_email,
    send_confirmation_sms,
    require_admin,
    mask_email,
    mask_phone,
)
from backend.schemas import AlertRegisterRequest, AlertConfirmRequest
from backend.config import settings

router = APIRouter()

logger = logging.getLogger(__name__)


@router.get("/api/alerts", response_class=JSONResponse)
async def get_price_alerts(conn: AsyncConnection = Depends(get_connection)):
    """Return active price alerts sorted by price.

    Parameters
    ----------
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    list[dict]
        Alert entries with pricing details.
    """

    query = text(
        """
        SELECT * FROM pharmacy_prices
        WHERE price < :max_price AND price >= :min_price
          AND (expiration IS NULL OR DATE(expiration) >= DATE('now'))
        ORDER BY price ASC
        """
    )
    rows = (
        await conn.execute(
            query,
            {
                "min_price": settings.alerts_min_price,
                "max_price": settings.alerts_max_price,
            },
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


@router.get("/api/alerts_filtered", response_class=JSONResponse)
async def get_filtered_alerts(conn: AsyncConnection = Depends(get_connection)):
    """Return deduplicated alerts with the latest price per pharmacy.

    Parameters
    ----------
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    list[dict]
        Filtered alert entries.
    """

    rows = (
        (
            await conn.execute(
                text(
                    """
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
                  AND (p.expiration IS NULL OR DATE(p.expiration) >= DATE('now'))
                """
                )
            )
        )
        .mappings()
        .all()
    )

    alerts = []
    now = datetime.now()
    for row in rows:
        price = float(row["price"])
        if price < float(settings.min_display_price):
            continue
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


@router.get("/api/alerts_grouped", response_class=JSONResponse)
async def get_grouped_alerts(
    city: Optional[str] = Query(
        None,
        min_length=1,
        max_length=50,
        pattern=r"^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$",
    ),
    conn: AsyncConnection = Depends(get_connection),
):
    """Retrieve alerts grouped by product, optionally filtered by city.

    Parameters
    ----------
    city : str, optional
        City name to narrow results.
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    list[dict]
        Grouped alert information for each product.
    """
    base_query = """
        SELECT *,
               ROW_NUMBER() OVER (
                   PARTITION BY product_id, pharmacy_name, expiration, price
                   ORDER BY datetime(fetched_at) DESC
               ) AS rn
        FROM pharmacy_prices
        WHERE price IS NOT NULL
          AND (expiration IS NULL OR DATE(expiration) >= DATE('now'))
    """
    params = {}
    if city:
        base_query += " AND (address LIKE :city1 OR address LIKE :city2)"
        params.update({"city1": f"%, {city}", "city2": f"% {city}"})

    query = f"SELECT * FROM ({base_query}) WHERE rn = 1"
    rows = (await conn.execute(text(query), params)).mappings().all()

    grouped = defaultdict(list)
    now = datetime.now()
    for row in rows:
        price = float(row["price"])
        if price < float(settings.min_display_price):
            continue
        expiration = row["expiration"]
        fetched_at = row["fetched_at"]
        unit = row["unit"]
        price_per_g, display_price, short_expiry = compute_price_info(
            price, unit, row["product_id"], expiration, now
        )
        address = row["address"] or ""
        city_match = address.split(",")[-1].strip() if "," in address else address
        city_clean = re.sub(r"^\d{2}-\d{3}\s*", "", city_match) if city_match else ""
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
            "city": city_clean,
        }
        if price_per_g is not None:
            offer["price_per_g"] = price_per_g
        grouped[row["product_id"]].append(offer)

    results = []
    for product_id, offers in grouped.items():
        if not offers:
            continue
        row = (
            await conn.execute(
                text("SELECT name FROM products WHERE id = :pid"),
                {"pid": product_id},
            )
        ).first()
        name = row[0] if row else product_id
        min_price = min(o["price"] for o in offers)
        results.append(
            {
                "product_id": product_id,
                "product": name,
                "min_price": min_price,
                "offers": sorted(offers, key=lambda x: x["price"]),
            }
        )
    return results


@router.post("/api/alerts/register", response_class=JSONResponse)
async def register_alert(
    payload: AlertRegisterRequest,
    background_tasks: BackgroundTasks,
    conn: AsyncConnection = Depends(get_connection),
):
    """Register a new user alert for a product threshold.

    Parameters
    ----------
    payload : AlertRegisterRequest
        Incoming request containing alert details.
    background_tasks : BackgroundTasks
        FastAPI task manager for deferred notification sending.
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    dict
        Status message indicating success or failure.
    """

    email = payload.email
    phone = payload.phone
    threshold = payload.threshold
    product_name = payload.product_name

    token = uuid.uuid4().hex
    row = (
        await conn.execute(
            text("SELECT id FROM products WHERE lower(name) = :name"),
            {"name": product_name.lower()},
        )
    ).first()
    if not row:
        return JSONResponse(
            {"status": "error", "message": "Nieznany produkt"},
            status_code=400,
        )
    await conn.execute(
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

    if email:
        background_tasks.add_task(send_confirmation_email, email, token)
    if phone:
        background_tasks.add_task(send_confirmation_sms, phone, token)
    return {"status": "ok"}


@router.post("/api/alerts/confirm", response_class=JSONResponse)
async def confirm_alert(
    payload: AlertConfirmRequest, conn: AsyncConnection = Depends(get_connection)
):
    """Confirm an alert registration using a token.

    Parameters
    ----------
    payload : AlertConfirmRequest
        Incoming request with confirmation token.
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    dict
        Status message indicating success or failure.
    """

    token = payload.token

    row = (
        await conn.execute(
            text("SELECT id FROM user_alerts WHERE token = :token"),
            {"token": token},
        )
    ).first()
    if not row:
        return JSONResponse(
            {"status": "error", "message": "Nieprawidłowy token"}, status_code=400
        )
    await conn.execute(
        text("UPDATE user_alerts SET confirmed = 1, token = NULL WHERE id = :id"),
        {"id": row[0]},
    )

    return {"status": "ok"}


@router.get("/api/alerts/list", response_class=JSONResponse)
async def list_alerts(
    request: Request, conn: AsyncConnection = Depends(get_connection)
):
    """List registered alerts with decrypted contact information.

    Parameters
    ----------
    conn : AsyncConnection
        Database connection provided by dependency injection.

    Returns
    -------
    list[dict]
        Alert entries for all users.
    """

    # Require admin session to access PII
    require_admin(request)

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

    results = []
    for row in rows:
        email_plain = decrypt(row["email_encrypted"]) if row["email_encrypted"] else None
        phone_plain = decrypt(row["phone_encrypted"]) if row["phone_encrypted"] else None
        results.append(
            {
                "email": mask_email(email_plain),
                "phone": mask_phone(phone_plain),
                "threshold": row["threshold"],
                "product_name": row["name"] or row["product_id"],
                "created": row["created"],
                "product_id": row["product_id"],
                "confirmed": bool(row["confirmed"]),
            }
        )
    return results
