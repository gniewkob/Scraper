import pytest

from scraper.services.price_classifier import classify_price
from scraper.services.price_validator import parse_price_unit

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


@pytest.mark.parametrize(
    "text, expected_price, expected_unit",
    [
        ("43,98 zł/g", 43.98, "g"),
        ("500 zł/g", 500.0, "g"),
        ("100 zł/10g", 100.0, "10g"),
    ],
)
def test_parse_price_unit_integer(text, expected_price, expected_unit):
    price, unit = parse_price_unit(text)
    assert price == expected_price
    assert unit == expected_unit
