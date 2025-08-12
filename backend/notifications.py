from __future__ import annotations

import json
import logging
from typing import Any

import httpx
from tenacity import AsyncRetrying, stop_after_attempt, wait_exponential
from prometheus_client import Counter
from sqlalchemy.ext.asyncio import async_sessionmaker

from .db import get_engine
from .models import NotificationFailure

logger = logging.getLogger(__name__)

NOTIFICATION_SUCCESS = Counter(
    "notification_success_total",
    "Total successful notifications",
)
NOTIFICATION_FAILURE = Counter(
    "notification_failure_total",
    "Total failed notifications",
)


async def log_notification_failure(
    destination: str, payload: dict[str, Any], error: str
) -> None:
    """Persist notification failure details for later analysis."""
    engine = get_engine()
    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    async with session_factory() as session:
        failure = NotificationFailure(
            destination=destination,
            payload=json.dumps(payload),
            error=error,
        )
        session.add(failure)
        await session.commit()


async def send_notification(url: str, payload: dict[str, Any]) -> None:
    """Send a notification with retries and metrics."""
    async with httpx.AsyncClient() as client:
        try:
            async for attempt in AsyncRetrying(
                stop=stop_after_attempt(3),
                wait=wait_exponential(min=1, max=10),
                reraise=True,
            ):
                with attempt:
                    response = await client.post(url, json=payload)
                    response.raise_for_status()
            NOTIFICATION_SUCCESS.inc()
        except Exception as exc:  # noqa: BLE001 - broad for logging
            NOTIFICATION_FAILURE.inc()
            logger.error("Notification failed for %s: %s", url, exc)
            await log_notification_failure(url, payload, str(exc))
            raise
