from datetime import datetime, timedelta, timezone

from backend.routes.utils import compute_price_info


def test_compute_price_info_handles_naive_expiration():
    now = datetime(2024, 1, 1, tzinfo=timezone.utc)
    expiration = (now + timedelta(days=10)).replace(tzinfo=None).isoformat()
    price_per_g, display_price, short_expiry = compute_price_info(
        100, "100 g", 1, expiration, now
    )
    assert price_per_g == 1
    assert display_price == 1
    assert short_expiry is True


def test_compute_price_info_handles_aware_expiration():
    now = datetime(2024, 1, 1, tzinfo=timezone.utc)
    expiration = (now + timedelta(days=40)).isoformat()
    price_per_g, display_price, short_expiry = compute_price_info(
        100, "100 g", 1, expiration, now
    )
    assert price_per_g == 1
    assert display_price == 1
    assert short_expiry is False
