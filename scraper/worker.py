"""Celery worker for running scraper tasks."""

from celery import Celery
import os

# Broker URL is required for Celery. Redis is assumed by default but can be
# overridden via the ``CELERY_BROKER_URL`` environment variable.
celery = Celery(
    "scraper",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
)


@celery.task(name="scraper.run")
def run_scraper() -> None:
    """Execute the main scraping routine as an asynchronous task."""
    from scraper.cli.scrape_all import main

    main()
