from typing import Optional

import pytest

from scraper.products.pvid import extract_pvid
from scraper.products.urls import build_regional_url


@pytest.mark.parametrize(
    "base_url",
    [
        "https://www.gdziepolek.pl/produkty/131723/jaxx-cannabis-flos",
        "https://www.gdziepolek.pl/produkty/131723/jaxx-cannabis-flos/",
        "/produkty/131723/jaxx-cannabis-flos",
    ],
)
def test_build_regional_url_defaults(base_url: str) -> None:
    url = build_regional_url(base_url)
    assert "/w-slaskim" in url
    assert url.endswith("#stacjonarne")


def test_build_regional_url_with_pvid() -> None:
    url = build_regional_url(
        "https://www.gdziepolek.pl/produkty/131723/jaxx-cannabis-flos",
        pvid="abcd",
    )
    assert "?pvid=abcd#stacjonarne" in url


def test_build_regional_url_with_auto_pvid() -> None:
    class FakeLocator:
        def __init__(self, value: Optional[str]) -> None:
            self._value = value

        def count(self) -> int:
            return 1 if self._value else 0

        @property
        def first(self) -> "FakeLocator":  # pragma: no cover - simple property
            return self

    def get_attribute(self, name: str) -> Optional[str]:
            if name in {"data-pvid", "pvid"}:
                return self._value
            return None

    class FakePage:
        def __init__(self, value: Optional[str]) -> None:
            self._value = value

        def locator(self, _selector: str) -> FakeLocator:
            return FakeLocator(self._value)

        def on(self, _event: str, _callback) -> None:  # pragma: no cover - simulation
            pass

        def wait_for_load_state(self, _state: str) -> None:  # pragma: no cover - simulation
            pass

    page = FakePage("auto123")
    pvid = extract_pvid(page)
    url = build_regional_url(
        "https://www.gdziepolek.pl/produkty/131723/jaxx-cannabis-flos",
        pvid=pvid,
    )
    assert "?pvid=auto123#stacjonarne" in url
