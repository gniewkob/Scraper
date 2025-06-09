import re
from typing import Optional, Tuple
from selenium.webdriver.common.by import By

def verify_price(element) -> Tuple[bool, Optional[str]]:
    try:
        price_spans = element.find_elements(
            By.CSS_SELECTOR,
            ".tss-1oxhpw5-offers .tss-1u6comz-priceExp .acc span"
        )
        for span in price_spans:
            text = span.text.strip()
            if "zł" in text:
                return True, text
        return False, None
    except Exception as e:
        print(f"⚠️ verify_price() exception: {e}")
        return False, None
     
def parse_price_unit(price_str: str) -> tuple[float, str]:
    """
    Przetwarza tekst w formacie '56,00 zł / g' lub '43,98 zł / 10g'
    i zwraca: (56.00, 'g')
    """
    price = 0.0
    unit = "g"

    if not price_str:
        return (0.0, unit)

    # 🛡️ Zabezpieczenie: wymuś string
    price_str = str(price_str).lower().replace(" ", "").replace("zl", "zł")

    match = re.search(r'(\d+,\d+)\s*zł\s*/\s*(\w+)', price_str)
    if match:
        price = float(match.group(1).replace(",", "."))
        unit = match.group(2)
    else:
        match = re.search(r'(\d+,\d+)', price_str)
        if match:
            price = float(match.group(1).replace(",", "."))

    return (price, unit)

def normalize_unit(unit: str) -> str:
    """
    Normalizuje jednostki: np. 'G' → 'g', '10G' → '10g'
    """
    if not unit:
        return "g"
    return unit.lower().strip().replace(" ", "")


# --- TESTY ---

if __name__ == "__main__":
    from unittest.mock import Mock
    from types import SimpleNamespace

    def test_verify_price():
        print("== TEST: poprawna cena ==")
        mock_element = Mock()
        price_elem = SimpleNamespace(text="29,99 zł")
        mock_element.find_elements.return_value = [price_elem]

        result, price_text = verify_price(mock_element)
        assert result is True
        assert "29,99" in price_text
        print("✅ Cena rozpoznana poprawnie:", price_text)

        print("\n== TEST: brak ceny ==")
        mock_element2 = Mock()
        mock_element2.find_elements.return_value = []

        result2, price_text2 = verify_price(mock_element2)
        assert result2 is False
        assert price_text2 is None
        print("✅ Cena nierozpoznana poprawnie (brak elementów)")

    test_verify_price()
