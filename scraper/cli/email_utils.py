"""Utility helpers for sending e-mails via SMTP."""

import logging
import os
import smtplib
from email.message import EmailMessage


logger = logging.getLogger(__name__)

# SMTP configuration from environment variables
SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
FROM_EMAIL = os.environ.get("FROM_EMAIL", SMTP_USER)


def send_email(to_address: str, subject: str, body: str) -> bool:
    """Send an e-mail using SMTP settings.

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

