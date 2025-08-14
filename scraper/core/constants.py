"""Shared constants for browser and scraping configuration."""

DEFAULT_WIDTH = 1280
DEFAULT_HEIGHT = 900
DEFAULT_VIEWPORT = {"width": DEFAULT_WIDTH, "height": DEFAULT_HEIGHT}
DEFAULT_WINDOW_SIZE = f"{DEFAULT_WIDTH},{DEFAULT_HEIGHT}"
DEFAULT_LOCALE = "pl-PL"

USER_AGENTS = [
    # Popular desktop user agents for rotation
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:117.0) Gecko/20100101 Firefox/117.0",
]
