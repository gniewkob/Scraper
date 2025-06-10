import pytest

from scraper.services.price_classifier import classify_price

@pytest.mark.parametrize(
    "price, unit, expected",
    [
        (19.99, "g", "okazja"),
        (20.0, "g", "dobra"),
        (34.99, "g", "dobra"),
        (35.0, "g", "normalna"),
        (39.99, "g", "normalna"),
        (40.0, "g", "droga"),
        (100.0, "10g", "okazja"),
        (350.0, "10g", "normalna"),
        (20.0, "szt", "dobra"),
    ],
)
def test_classify_price(price, unit, expected):
    assert classify_price(price, unit) == expected
