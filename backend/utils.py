"""Shared utility functions for the backend."""
import logging
import os
from urllib.parse import urlencode

from fastapi import HTTPException, Request
from twilio.rest import Client
import bcrypt

from backend.config import settings

logger = logging.getLogger(__name__)

# Get environment variables (external services)
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")
SENDGRID_FROM = os.getenv("SENDGRID_FROM", "noreply@example.com")
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM = os.getenv("TWILIO_FROM_NUMBER", "")


def mask_email(email: str) -> str:
    """Mask email for privacy."""
    if "@" not in email:
        return email
    local, domain = email.split("@", 1)
    if len(local) <= 1:
        masked = local + "***"
    else:
        masked = local[:4] + "***" if len(local) > 4 else local + "***"
    return f"{masked}@{domain}"


def mask_phone(phone: str) -> str:
    """Mask phone number for privacy."""
    # If it's a short phone (6 digits or less), don't mask
    if len(phone) <= 6:
        return phone
    
    # Keep the prefix and last 3 digits
    if phone.startswith("+"):
        # Extract country code (first 3 chars including +)
        if len(phone) > 6:
            return phone[:3] + "***" + phone[-3:]
    
    # For other formats, mask middle part
    return phone[:3] + "***" + phone[-3:]


def require_admin(request: Request) -> bool:
    """Require admin authentication using bcrypt password hash.

    Expects header: ``Authorization: Bearer <password>`` and verifies against
    ``settings.admin_password_hash``.
    """
    admin_hash = settings.admin_password_hash
    if not admin_hash:
        raise HTTPException(status_code=500, detail="Admin password not configured")

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    password = auth_header[7:]
    try:
        ok = bcrypt.checkpw(password.encode("utf-8"), admin_hash.encode("utf-8"))
    except Exception:
        raise HTTPException(status_code=500, detail="Admin password hash invalid")
    if not ok:
        raise HTTPException(status_code=403, detail="Invalid admin credentials")
    return True


def send_confirmation_email(email: str, token: str) -> bool:
    """Send confirmation email using SendGrid."""
    if not SENDGRID_API_KEY:
        logger.warning(
            "SendGrid API key not configured, skipping email to %s", mask_email(email)
        )
        return False

    try:
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail

        base = settings.confirmation_base_url.rstrip("/")
        confirm_link = f"{base}/confirm?{urlencode({'token': token})}"

        message = Mail(
            from_email=SENDGRID_FROM,
            to_emails=email,
            subject="Confirm your alert registration",
            html_content=f"""
            <p>Please confirm your alert registration by clicking the link below:</p>
            <p><a href="{confirm_link}">Confirm Alert</a></p>
            <p>Or use this token: {token}</p>
            """
        )

        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        logger.info(
            "Sent confirmation email to %s: %s", mask_email(email), response.status_code
        )
        return response.status_code < 300
    except Exception as exc:
        logger.error(
            "Failed to send confirmation email to %s: %s", mask_email(email), exc
        )
        return False


def send_confirmation_sms(phone: str, token: str) -> bool:
    """Send confirmation SMS using Twilio."""
    if not TWILIO_SID or not TWILIO_TOKEN:
        logger.warning(
            "Twilio credentials not configured, skipping SMS to %s", mask_phone(phone)
        )
        return False
    
    try:
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        message = client.messages.create(
            body=f"Your alert confirmation token is: {token}",
            from_=TWILIO_FROM,
            to=phone
        )
        logger.info("Sent confirmation SMS to %s: %s", mask_phone(phone), message.sid)
        return True
    except Exception as exc:
        logger.error(
            "Failed to send confirmation SMS to %s: %s", mask_phone(phone), exc
        )
        return False


def send_confirmation_whatsapp(phone: str, token: str) -> bool:
    """Send confirmation WhatsApp message using Twilio."""
    if not TWILIO_SID or not TWILIO_TOKEN:
        logger.warning(
            "Twilio credentials not configured, skipping WhatsApp to %s", mask_phone(phone)
        )
        return False
    
    try:
        body = f"Your alert confirmation token is: {token}"
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        message = client.messages.create(
            body=body,
            from_=f"whatsapp:{TWILIO_FROM}" if not TWILIO_FROM.startswith("whatsapp:") else TWILIO_FROM,
            to=f"whatsapp:{phone}" if not phone.startswith("whatsapp:") else phone,
        )
        logger.info("Sent confirmation WhatsApp to %s: %s", mask_phone(phone), message.sid)
        return True
    except Exception as exc:
        logger.error(
            "Failed to send confirmation WhatsApp to %s: %s", mask_phone(phone), exc
        )
        return False
