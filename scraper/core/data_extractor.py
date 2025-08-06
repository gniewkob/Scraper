# core/data_extractor.py

import re
import time
import traceback
import urllib.parse
import logging
from pathlib import Path
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from scraper.core.config.urls import extract_product_id
from scraper.services.db import insert_prices
from scraper.services.price_validator import parse_price_unit

logger = logging.getLogger("gdziepolek")

def scroll_lazy_load(driver, pause=1.0):
    last_height = driver.execute_script(
        "const container = document.querySelector('[class*=MuiList-root]'); return container?.scrollHeight || 0"
    )
    while True:
        driver.execute_script(
            "const container = document.querySelector('[class*=MuiList-root]'); if (container) container.scrollTo(0, container.scrollHeight);"
        )
        time.sleep(pause)
        new_height = driver.execute_script(
            "const container = document.querySelector('[class*=MuiList-root]'); return container?.scrollHeight || 0"
        )
        if new_height == last_height:
            break
        last_height = new_height

def extract_pharmacy_data(driver, url):
    product_id = extract_product_id(url)
    driver.get(url)
    
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "li.MuiListItem-root div[class*='offers']"))
        )
        time.sleep(1.2)
    except:
        logger.warning("⚠️ Nie znaleziono elementów ofert")
        return
    
    scroll_lazy_load(driver)
    offer_elements = driver.find_elements(By.CSS_SELECTOR, "li.MuiListItem-root")
    logger.debug(f"🔎 Znaleziono {len(offer_elements)} ofert.")
    
    for idx, el in enumerate(offer_elements, 1):
        try:
            name_el = el.find_element(By.CSS_SELECTOR, "a[href*='/apteki/']")
            name = name_el.text.strip()
            href = name_el.get_attribute("href")
    
            address = ""
            address_els = el.find_elements(By.CSS_SELECTOR, "p")
            if len(address_els) >= 2:
                addr_text = address_els[1].text.strip()
                if "km" not in addr_text.lower():
                    address = addr_text
    
            map_url = f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote(address)}" if address else ""
    
            offers_block = el.find_element(By.CSS_SELECTOR, "div[class*='offers']")
            p_elements = offers_block.find_elements(By.TAG_NAME, "p")
    
            offers = []
            availability = None
            updated = None
            expiration_hint = None
            last_expiration = ""
    
            logger.debug(f"🧾 Oferta {idx}: {name} ({address}) — przetwarzanie {len(p_elements)} linii")
    
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
    
                    price_text = next((s.text.strip() for s in spans if "priceExp" in s.get_attribute("class")), None)
    
                    if price_text:
                        try:
                            price, unit = parse_price_unit(price_text)
                            offers.append({
                                "expiration": last_expiration,
                                "price": price,
                                "unit": unit
                            })
                            last_expiration = ""
                        except Exception as e:
                            logger.error(f"⚠️ Błąd ceny ➔+priceExp: {price_text} → {e}")
                    continue
    
                price_text = next((s.text.strip() for s in spans if "priceExp" in s.get_attribute("class")), None)

                if price_text:
                    expiration = last_expiration or ""
                    if expiration_hint == "short":
                        expiration = "krótki termin"
    
                    try:
                        price, unit = parse_price_unit(price_text)
                        offers.append({
                            "expiration": expiration,
                            "price": price,
                            "unit": unit
                        })
                        last_expiration = ""
                    except Exception as e:
                        logger.debug(f"⚠️ Błąd konwersji ceny fallback: {price_text} → {e}")
                    continue
    
            if not offers:
                logger.debug(f"✖️ Oferta {idx}: pominięta — brak poprawnych cen.")
                continue
    
            if len(offers) > 1:
                logger.debug(f"🔍 Oferta {idx} zawiera wiele cen:")
                for o in offers:
                    logger.debug(f"   → {o['price']} zł ({o['expiration']})")
    
            logger.debug(f"✅ [{idx}] {name} – dodano {len(offers)} cen")
    
            insert_prices({
                "product_id": product_id,
                "name": name,
                "href": href,
                "address": address,
                "map_url": map_url,
                "availability": availability,
                "updated": updated,
                "offers": offers
            })
    
        except Exception as e:
            logger.error(f"❌ [{idx}] Błąd ekstrakcji – {e}")
            traceback.print_exc()
            try:
                with open(f"logs/{product_id}_extract_error_{idx}.html", "w", encoding="utf-8") as f:
                    f.write(el.get_attribute("outerHTML"))
            except:
                pass
