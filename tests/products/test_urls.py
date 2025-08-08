import pytest

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
