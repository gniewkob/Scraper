from __future__ import annotations


from typing import Optional


def build_regional_url(base_url: str, region: str = "w-slaskim", pvid: Optional[str] = None) -> str:
    """Return a regional URL for a product page."""
    url = f"{base_url.rstrip('/')}/apteki/{region}"
    if pvid is not None:
        url += f"?pvid={pvid}"
    return f"{url}#stacjonarne"
