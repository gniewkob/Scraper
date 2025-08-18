from unittest.mock import MagicMock

from selenium.webdriver.common.by import By

from scraper.core.data_extractor import extract_pharmacy_data


def _mock_span(text: str) -> MagicMock:
    span = MagicMock()
    span.text = text
    span.get_attribute.return_value = "priceExp"
    return span


def test_extract_pharmacy_data_returns_dict():
    """extract_pharmacy_data should parse element and return data dict."""

    root = MagicMock()

    # name element
    name_el = MagicMock()
    name_el.text = "Apteka Testowa"
    name_el.get_attribute.return_value = "https://example.com/apteki/test"

    # address elements
    addr1 = MagicMock()
    addr1.text = "adres"
    addr2 = MagicMock()
    addr2.text = "ul. Testowa 1"

    # offers block with one price paragraph
    price_span = _mock_span("12,34 zł / szt")
    price_p = MagicMock()
    price_p.text = ""
    price_p.find_elements.return_value = [price_span]

    offers_block = MagicMock()
    offers_block.find_elements.return_value = [price_p]

    def find_element_side_effect(by, value):
        if by == By.CSS_SELECTOR and value == "a[href*='/apteki/']":
            return name_el
        if by == By.CSS_SELECTOR and value == "div[class*='offers']":
            return offers_block
        raise AssertionError(f"Unexpected selector: {by} {value}")

    def find_elements_side_effect(by, value):
        if by == By.CSS_SELECTOR and value == "p":
            return [addr1, addr2]
        raise AssertionError(f"Unexpected selector: {by} {value}")

    root.find_element.side_effect = find_element_side_effect
    root.find_elements.side_effect = find_elements_side_effect

    data = extract_pharmacy_data(root, product_id=123)

    assert data is not None
    assert data["name"] == "Apteka Testowa"
    assert data["href"].endswith("/apteki/test")
    assert data["address"] == "ul. Testowa 1"
    assert data["product_id"] == 123
    assert data["offers"][0]["price"] == 12.34
    assert data["offers"][0]["unit"] == "szt"

