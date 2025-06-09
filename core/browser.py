import logging
import platform
import subprocess
from typing import Optional

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.common.exceptions import WebDriverException, SessionNotCreatedException

from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager

# 🔇 Wyciszenie komunikatów webdriver-managera
logging.getLogger("WDM").setLevel(logging.CRITICAL)

# 🧠 Używamy jednego loggera globalnego
logger = logging.getLogger("gdziepolek")

FALLBACK_CHROME_DRIVER_VERSIONS = [
    "135.0.7049.96", "135.0.5435.2", "135.0.5432.10",
    "134.0.5376.126", "134.0.5376.39", "133.0.5304.19",
    "132.0.5230.25", "122.0.6261.94", "121.0.6167.85",
    "120.0.6099.109", "119.0.6045.105", "118.0.5993.70",
    "117.0.5938.92", "116.0.5845.96", "115.0.5790.102", "114.0.5735.90"
]

def get_chrome_version():
    try:
        system = platform.system()
        if system == "Darwin":
            process = subprocess.run(
                ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "--version"],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
            )
            version = process.stdout.strip().split("Google Chrome ")[1].split()[0]
        elif system == "Windows":
            process = subprocess.run(
                ["reg", "query", "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon", "/v", "version"],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
            )
            version = process.stdout.strip().split()[-1]
        elif system == "Linux":
            process = subprocess.run(
                ["google-chrome", "--version"],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
            )
            version = process.stdout.strip().split("Google Chrome ")[1].split()[0]
        else:
            return None

        logger.info(f"Detected full Chrome version: {version}")
        return version
    except Exception as e:
        logger.warning(f"Failed to get Chrome version: {e}")
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

    # Dodaj poniższy argument, żeby okno otwierało się poza ekranem
    options.add_argument("--window-position=-32000,0")
    
    if headless:
        options.add_argument("--headless=new")

    chrome_version = get_chrome_version()
    version_fallbacks = [specific_version] if specific_version else []

    if chrome_version:
        version_parts = chrome_version.split('.')
        major_version = version_parts[0]
        version_fallbacks += [
            chrome_version,
            f"{major_version}.0.{version_parts[2] if len(version_parts) > 2 else '0'}.{version_parts[3] if len(version_parts) > 3 else '0'}",
            f"{major_version}.0.0.0"
        ]

        for fallback in FALLBACK_CHROME_DRIVER_VERSIONS:
            if fallback not in version_fallbacks:
                version_fallbacks.append(fallback)
    else:
        version_fallbacks = FALLBACK_CHROME_DRIVER_VERSIONS

    for version in version_fallbacks:
        try:
            logger.debug(f"Trying ChromeDriver version: {version}")
            driver = webdriver.Chrome(
                service=ChromeService(ChromeDriverManager(version=version).install()),
                options=options
            )
            driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
                "source": "Object.defineProperty(navigator, 'webdriver', { get: () => undefined });"
            })
            logger.info(f"✓ SUCCESS: Initialized ChromeDriver {version}")
            return driver
        except Exception as e:
            logger.warning(f"❌ ChromeDriver {version} failed: {e}")
            continue

    try:
        logger.info("Trying system ChromeDriver")
        driver = webdriver.Chrome(options=options)
        return driver
    except Exception as e:
        logger.warning(f"System ChromeDriver failed: {e}")

    raise WebDriverException("All ChromeDriver attempts failed")


def setup_firefox_browser(headless=False):
    options = FirefoxOptions()
    if headless:
        options.add_argument("--headless")

    try:
        driver = webdriver.Firefox(
            service=FirefoxService(GeckoDriverManager().install()),
            options=options
        )
        logger.info("Successfully initialized Firefox WebDriver")
        return driver
    except Exception as e:
        logger.error(f"Failed to initialize Firefox WebDriver: {e}")
        raise WebDriverException(f"Firefox WebDriver initialization failed: {e}")
