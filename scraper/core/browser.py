import logging
import os
import random
from typing import Optional
from urllib.parse import urlparse

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.common.exceptions import WebDriverException

from scraper.core.config.config import PROXIES
from scraper.core.constants import (
    USER_AGENTS,
    DEFAULT_LOCALE,
    DEFAULT_WINDOW_SIZE,
    DEFAULT_WIDTH,
    DEFAULT_HEIGHT,
)

# 🧠 Używamy jednego loggera globalnego
logger = logging.getLogger(__name__)

def get_random_proxy() -> Optional[str]:
    """Return a random proxy from configuration if available."""
    if PROXIES:
        proxy = random.choice(PROXIES)
        logger.info(f"Using proxy: {proxy}")
        return proxy
    return None

def setup_browser(headless=False, specific_version=None, use_firefox_fallback=True):
    try:
        return setup_chrome_browser(headless=headless, specific_version=specific_version)
    except Exception as e:
        logger.error(f"All Chrome initialization attempts failed: {e}")

        if use_firefox_fallback:
            try:
                logger.info("Attempting to use Firefox as a fallback")
                return setup_firefox_browser(headless=headless)
            except Exception as firefox_err:
                logger.error(f"Firefox fallback also failed: {firefox_err}")

    raise WebDriverException("Failed to initialize any WebDriver with all available options")


def setup_chrome_browser(headless=False, specific_version=None):
    options = ChromeOptions()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-software-rasterizer")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    options.add_argument("--log-level=3")
    options.add_argument("--silent")
    options.add_argument(f"--lang={DEFAULT_LOCALE}")
    options.add_argument(f"--window-size={DEFAULT_WINDOW_SIZE}")

    ua = random.choice(USER_AGENTS)
    options.add_argument(f"--user-agent={ua}")

    proxy = get_random_proxy()
    if proxy:
        options.add_argument(f"--proxy-server={proxy}")

    # Dodaj poniższy argument, żeby okno otwierało się poza ekranem
    options.add_argument("--window-position=-32000,0")
    
    if headless:
        options.add_argument("--headless=new")

    chrome_bin = os.getenv("CHROME_BIN")
    if chrome_bin:
        options.binary_location = chrome_bin

    try:
        driver = webdriver.Chrome(options=options)
        driver.execute_cdp_cmd(
            "Page.addScriptToEvaluateOnNewDocument",
            {"source": "Object.defineProperty(navigator, 'webdriver', { get: () => undefined });"},
        )
        logger.info("Successfully initialized Chrome WebDriver")
        return driver
    except Exception as e:
        logger.error(f"Failed to initialize Chrome WebDriver: {e}")
        raise WebDriverException(f"Chrome WebDriver initialization failed: {e}")


def setup_firefox_browser(headless=False):
    options = FirefoxOptions()
    if headless:
        options.add_argument("--headless")

    ua = random.choice(USER_AGENTS)
    options.set_preference("general.useragent.override", ua)
    options.set_preference("intl.accept_languages", DEFAULT_LOCALE)
    options.add_argument(f"--width={DEFAULT_WIDTH}")
    options.add_argument(f"--height={DEFAULT_HEIGHT}")
    # Disable Firefox automation flag to mimic regular browser
    options.set_preference("dom.webdriver.enabled", False)
    # Remove remaining automation flags
    options.set_preference("useAutomationExtension", False)


    proxy = get_random_proxy()
    if proxy:
        parsed = urlparse(proxy)
        if parsed.hostname and parsed.port:
            options.set_preference("network.proxy.type", 1)
            if parsed.scheme.startswith("socks"):
                options.set_preference("network.proxy.socks", parsed.hostname)
                options.set_preference("network.proxy.socks_port", parsed.port)
            else:
                options.set_preference("network.proxy.http", parsed.hostname)
                options.set_preference("network.proxy.http_port", parsed.port)
                options.set_preference("network.proxy.ssl", parsed.hostname)
                options.set_preference("network.proxy.ssl_port", parsed.port)
            options.set_preference("network.proxy.no_proxies_on", "")

    try:
        driver = webdriver.Firefox(options=options)
        # Align behavior with Chrome by hiding webdriver attribute
        driver.execute_script(
            "Object.defineProperty(navigator, 'webdriver', { get: () => undefined });"
        )
        logger.info("Successfully initialized Firefox WebDriver")
        return driver
    except Exception as e:
        logger.error(f"Failed to initialize Firefox WebDriver: {e}")
        raise WebDriverException(f"Firefox WebDriver initialization failed: {e}")
