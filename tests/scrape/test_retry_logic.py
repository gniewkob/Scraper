import pytest
from selenium.common.exceptions import TimeoutException

from scraper.utils.retry import retry_on_timeout


@pytest.fixture
def flaky_callable():
    """Simulate a timeout on the first call and success thereafter."""
    attempts = {"count": 0}

    def _inner():
        if attempts["count"] == 0:
            attempts["count"] += 1
            raise TimeoutException("timeout")
        return "success"

    return _inner


def test_retry_on_timeout_recovers(flaky_callable):
    result = retry_on_timeout(flaky_callable, max_attempts=2)
    assert result == "success"
