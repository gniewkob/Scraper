import json
import os
from pathlib import Path

import pytest

from test_scrape_matrix import TARGET_URL, MIN_OFFERS, write_metrics


@pytest.mark.skipif(not os.getenv("CI"), reason="Playwright tests run only in CI")
@pytest.mark.parametrize("target_url,min_offers", [(TARGET_URL, MIN_OFFERS)])
def test_xhr_capture_then_fetch(target_url: str, min_offers: int) -> None:
    p_sync = pytest.importorskip("playwright.sync_api")
    httpx = pytest.importorskip("httpx")
    if not target_url:
        pytest.skip("TARGET_URL env variable not set")
    with p_sync.sync_playwright() as p:
        browser = p.firefox.launch(headless=True)
        context = browser.new_context(record_har_path="network.har")
        page = context.new_page()
        page.goto(target_url)
        page.wait_for_load_state("networkidle")
        context.close()
        browser.close()

    har_path = Path("network.har")
    assert har_path.exists(), "HAR file not created"
    har = json.loads(har_path.read_text(encoding="utf-8"))
    entries = [e for e in har.get("log", {}).get("entries", []) if e.get("_resourceType") == "xhr"]
    if not entries:
        pytest.skip("No XHR requests captured")
    url = entries[0]["request"]["url"]
    response = httpx.get(url, timeout=10.0)
    data = response.json()
    Path("xhr.json").write_text(json.dumps(data), encoding="utf-8")

    offers = data if isinstance(data, list) else data.get("offers") or data.get("items") or []
    write_metrics(os.getenv("RUNNER", "xhr_capture_then_fetch"), offers)
    assert isinstance(offers, list)
    assert len(offers) >= min_offers
    first = offers[0]
    assert first.get("product")
    assert first.get("pharmacy")
    assert first.get("price")
    assert first.get("expires_at")
