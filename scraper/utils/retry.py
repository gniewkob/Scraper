import logging
from typing import Callable, TypeVar

from selenium.common.exceptions import TimeoutException as SeleniumTimeout

try:  # Playwright is optional in some environments
    from playwright.sync_api import TimeoutError as PlaywrightTimeout
except Exception:  # pragma: no cover - fallback if Playwright missing
    PlaywrightTimeout = TimeoutError  # type: ignore

T = TypeVar("T")

logger = logging.getLogger("gdziepolek")


def retry_on_timeout(func: Callable[..., T], max_attempts: int = 3, *args, **kwargs) -> T:
    """Execute ``func`` with retries on timeout.

    Each attempt is logged. The function stops retrying after a successful
    call or after ``max_attempts`` failures, re-raising the last exception.
    """
    for attempt in range(1, max_attempts + 1):
        func_name = getattr(func, "__name__", repr(func))
        logger.info("Attempt %s/%s for %s", attempt, max_attempts, func_name)
        try:
            result = func(*args, **kwargs)
        except (SeleniumTimeout, PlaywrightTimeout, TimeoutError) as exc:  # noqa: B902
            logger.warning(
                "Timeout on attempt %s/%s for %s: %s", attempt, max_attempts, func_name, exc
            )
            if attempt == max_attempts:
                raise
        else:
            logger.info("Attempt %s for %s succeeded", attempt, func_name)
            return result
    # This line should never be reached but satisfies type checkers
    raise RuntimeError("retry_on_timeout exhausted without result")
