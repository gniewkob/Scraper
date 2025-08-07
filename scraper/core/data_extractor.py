# core/data_extractor.py

"""Utilities for parsing single pharmacy offer elements.

The previous implementation fetched pages directly and performed database
insertion within this module.  In order to provide a cleaner API and avoid
duplicate inserts, this module now focuses solely on transforming a Selenium
``WebElement`` representing a pharmacy offer into a Python dictionary with the
parsed data.  Responsibility for persisting data has moved to callers (e.g.
``scrape_product`` in ``main.py``).
"""

from __future__ import annotations

import re
import urllib.parse
import logging
from typing import Any, Dict, List, Optional

from selenium.webdriver.common.by import By

from scraper.services.price_validator import parse_price_unit

logger = logging.getLogger("gdziepolek")


def extract_pharmacy_data(element: Any, product_id: Any) -> Optional[Dict[str, Any]]:
    """Parse a single pharmacy offer ``element``.

    Parameters
    ----------
    element: Selenium ``WebElement``
        Element with structure matching ``li.MuiListItem-root`` from the page.
    product_id: Any
        Identifier of the product being scraped.  Included in the returned
        dictionary for convenience.

    Returns
    -------
    dict or None
        Dictionary with extracted data or ``None`` when no valid price offers
        were found.
    """

    try:
        name_el = element.find_element(By.CSS_SELECTOR, "a[href*='/apteki/']")
        name = name_el.text.strip()
        href = name_el.get_attribute("href")

        address = ""
        address_els = element.find_elements(By.CSS_SELECTOR, "p")
        if len(address_els) >= 2:
            addr_text = address_els[1].text.strip()
            if "km" not in addr_text.lower():
                address = addr_text

        map_url = (
            f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote(address)}"
            if address
            else ""
        )

        offers_block = element.find_element(By.CSS_SELECTOR, "div[class*='offers']")
        p_elements = offers_block.find_elements(By.TAG_NAME, "p")

        offers: List[Dict[str, Any]] = []
        availability: Optional[str] = None
        updated: Optional[str] = None
        expiration_hint: Optional[str] = None
        last_expiration = ""

        for p in p_elements:
            text = p.text.strip().lower()
            spans = p.find_elements(By.TAG_NAME, "span")

            if "sztuk" in text or "ostatnia" in text or "niepełne" in text:
                availability = p.text.strip()
                continue
            elif "temu" in text:
                updated = p.text.strip()
                continue
            elif "ważność" in text:
                expiration_hint = "short"
                continue

            if "➔" in text:
                match = re.search(r"(\d{4}-\d{2}-\d{2})", text)
                if match:
                    last_expiration = match.group(1)

                price_text = next(
                    (s.text.strip() for s in spans if "priceExp" in s.get_attribute("class")),
                    None,
                )

                if price_text:
                    try:
                        price, unit = parse_price_unit(price_text)
                        offers.append({"expiration": last_expiration, "price": price, "unit": unit})
                        last_expiration = ""
                    except Exception as e:  # pragma: no cover - defensive log
                        logger.error(f"⚠️ Błąd ceny ➔+priceExp: {price_text} → {e}")
                continue

            price_text = next(
                (s.text.strip() for s in spans if "priceExp" in s.get_attribute("class")),
                None,
            )

            if price_text:
                expiration = last_expiration or ""
                if expiration_hint == "short":
                    expiration = "krótki termin"

                try:
                    price, unit = parse_price_unit(price_text)
                    offers.append({"expiration": expiration, "price": price, "unit": unit})
                    last_expiration = ""
                except Exception as e:  # pragma: no cover - defensive log
                    logger.debug(f"⚠️ Błąd konwersji ceny fallback: {price_text} → {e}")
                continue

        if not offers:
            logger.debug("✖️ Oferta pominięta — brak poprawnych cen.")
            return None

        return {
            "product_id": product_id,
            "name": name,
            "href": href,
            "address": address,
            "map_url": map_url,
            "availability": availability,
            "updated": updated,
            "offers": offers,
        }

    except Exception as e:  # pragma: no cover - defensive log
        logger.error(f"❌ Błąd ekstrakcji – {e}")
        raise

