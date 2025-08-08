from __future__ import annotations


def build_regional_url(base_url: str, region: str = "w-slaskim", pvid: str | None = None) -> str:
    """Return a regional URL for a product page."""
    url = f"{base_url.rstrip('/')}/apteki/{region}"
    if pvid is not None:
        url += f"?pvid={pvid}"
    return f"{url}#stacjonarne"
