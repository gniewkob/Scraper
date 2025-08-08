import os
import sys
from pathlib import Path
from urllib.parse import urljoin

try:
    from playwright.sync_api import sync_playwright
except ImportError:  # pragma: no cover - import guard
    sys.stderr.write(
        "Skrypt wymaga pakietu 'playwright'. Zainstaluj go poleceniem 'pip install playwright'.\n"
    )
    sys.exit(1)


CONFIG_FILE = Path(__file__).resolve().parents[1] / "config" / "products.env"


def normalize_url(url: str, base: str) -> str:
    """Return absolute URL without trailing slash."""
    return urljoin(base, url).rstrip("/")


def read_config(base_url: str) -> set[str]:
    paths = set()
    with open(CONFIG_FILE, "r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line:
                paths.add(normalize_url(line, base_url))
    return paths


def collect_page_urls(page, base_url: str) -> set[str]:
    urls = set()
    for element in page.locator("a[href^='/produkty/']").all():
        href = element.get_attribute("href")
        if href:
            urls.add(normalize_url(href, base_url))
    return urls


def click_load_more(page) -> None:
    while True:
        button = None
        for text in ["Pokaż więcej", "Załaduj więcej"]:
            locator = page.get_by_text(text, exact=True)
            if locator.count():
                button = locator
                break
        if not button:
            break
        button.click()
        page.wait_for_load_state("networkidle")


def main(target_url: str) -> None:
    config_urls = read_config(target_url)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(target_url)
        click_load_more(page)
        page_urls = collect_page_urls(page, target_url)
        browser.close()

    missing_on_page = sorted(config_urls - page_urls)
    missing_in_config = sorted(page_urls - config_urls)

    print("W konfiguracji, ale brak na stronie:")
    for url in missing_on_page:
        print(url)
    print("\nNa stronie, ale brak w konfiguracji:")
    for url in missing_in_config:
        print(url)


if __name__ == "__main__":
    target = os.environ.get("TARGET_URL")
    if len(sys.argv) > 1:
        target = sys.argv[1]
    if not target:
        sys.stderr.write(
            "Usage: TARGET_URL=<url> python scripts/verify_product_urls.py [url]\n"
        )
        sys.exit(1)
    main(target)
