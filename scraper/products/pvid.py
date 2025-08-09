from __future__ import annotations
from typing import Optional

from playwright.sync_api import Page


def extract_pvid(page: Page) -> Optional[str]:
    """Extract the `pvid` parameter from a Playwright page.

    The function first tries to read the value from DOM attributes and
    falls back to sniffing network responses for a ``pvid`` query
    parameter.  If nothing is found ``None`` is returned.
    """
    try:
        locator = page.locator("[data-pvid], [pvid]")
        if locator.count():
            attr = locator.first.get_attribute("data-pvid") or locator.first.get_attribute("pvid")
            if attr:
                return attr.strip()
    except Exception:
        pass

    pvid_holder: dict[str, Optional[str]] = {"value": None}

    def handle_response(response) -> None:  # pragma: no cover - simple callback
        url = getattr(response, "url", "")
        if "pvid=" in url and pvid_holder["value"] is None:
            pvid_holder["value"] = url.split("pvid=")[-1].split("&")[0]

    try:
        page.on("response", handle_response)
        page.wait_for_load_state("networkidle")
    except Exception:
        pass

    return pvid_holder["value"]
