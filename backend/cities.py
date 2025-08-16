"""Shared list of available cities for the API and database helpers."""

CITY_LIST = [
    "Warszawa",
    "Kraków",
    "Gdańsk",
    "Wrocław",
    "Poznań",
    "Łódź",
    "Katowice",
    "Szczecin",
    "Lublin",
    "Bydgoszcz",
    "Białystok",
    "Gdynia",
    "Częstochowa",
    "Radom",
    "Sosnowiec",
    "Toruń",
    "Kielce",
    "Rzeszów",
    "Gliwice",
    "Zabrze",
]


def get_city_list() -> list[str]:
    """Return a copy of the configured city names."""

    return list(CITY_LIST)
