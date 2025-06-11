import re
from typing import Optional

# 🔗 Lista wszystkich realnych URL-i produktów
URLS = [
	"https://www.gdziepolek.pl/produkty/119768/cannabis-flos-thc-20-cbd-1-aurora-pink-kush-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=279313#stacjonarne",
	"https://www.gdziepolek.pl/produkty/121591/cannabis-flos-thc-22-cbd-1-s-lab-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=282135#stacjonarne",
	"https://www.gdziepolek.pl/produkty/98013/cannabis-sativa-l-red-no-2-canopy-growth-jack-haze-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=244917#stacjonarne",
	"https://www.gdziepolek.pl/produkty/100242/cannabis-flos-thc-22-cbd-1-aurora-deutschland-gmbh-ghost-train-haze-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=249328#stacjonarne",
	"https://www.gdziepolek.pl/produkty/117668/cannabis-flos-thc-18-cbd-1-s-lab-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=275549#stacjonarne",
	"https://www.gdziepolek.pl/produkty/119767/cannabis-flos-thc-22-cbd-1-aurora-delahaze-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=279312#stacjonarne",
	"https://www.gdziepolek.pl/produkty/126179/cannabis-flos-thc-25-cbd-0-5-canopy-growth-original-gangster-deluxe-d-krypton-marihuana-lec/apteki/w-slaskim?pvid=288749#stacjonarne",
	"https://www.gdziepolek.pl/produkty/130324/cannabis-flos-cosma-thc-21-cbd-1-mac-monkey-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=294865#stacjonarne",
	"https://www.gdziepolek.pl/produkty/130323/cannabis-flos-cosma-thc-20-cbd-1-balasa-gorilla-girl-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=294864#stacjonarne",
	"https://www.gdziepolek.pl/produkty/117669/cannabis-flos-thc-18-cbd-1-tilray-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=275550#stacjonarne",
	"https://www.gdziepolek.pl/produkty/115281/cannabis-flos-thc-20-cbd-0-5-canopy-growth-bakerstreet-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=273578#stacjonarne",
	"https://www.gdziepolek.pl/produkty/100241/cannabis-flos-thc-8-cbd-8-aurora-deutschland-gmbh-equiposa-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=249327#stacjonarne",
	"https://www.gdziepolek.pl/produkty/120136/cannabis-flos-thc-22-cbd-1-four-20-pharma-gmbh-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=279924#stacjonarne",
	"https://www.gdziepolek.pl/produkty/115101/cannabis-extractum-normatum-thc-10-cbd1-vetos-farma-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=271348#stacjonarne",
	"https://www.gdziepolek.pl/produkty/119464/cannabis-extractum-normatum-thc-2-cbd-1-canpoland-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=278831#stacjonarne",
	"https://www.gdziepolek.pl/produkty/129653/cannabis-flos-cantourage-thc-25-cbd-1-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=293647#stacjonarne",
	"https://www.gdziepolek.pl/produkty/118793/ekstrakt-do-waporyzacji-extractum-purum-80-thc-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=277628#stacjonarne",
	"https://www.gdziepolek.pl/produkty/100243/cannabis-flos-thc-20-cbd-1-aurora-deutschland-gmbh-la-confidential-marihuana-lecznicza-medyczna/apteki/w-slaskim?pvid=249329#stacjonarne"
]

# 📦 Mapowanie: id i nazwy produktów
PRODUCT_NAME_TO_URL = {}
PRODUCT_ID_TO_NAME = {}

# 🧠 Ekstrakcja product_id z URL-a
def extract_product_id(url: str) -> Optional[str]:
	match = re.search(r"/produkty/(\d+)", url)
	return match.group(1) if match else None

# 🔁 Budowa map
for url in URLS:
	product_id = extract_product_id(url)

	match = re.search(r'/produkty/\d+/([^/]+)', url)
	raw_name = match.group(1).replace("-", " ") if match else f"Produkt {product_id}"
	name = raw_name.title().replace("Marihuana Lecznicza Medyczna", "").strip()

	PRODUCT_NAME_TO_URL[name] = url
	PRODUCT_ID_TO_NAME[product_id] = name

# 📋 Lista nazw do dropdowna
PRODUCT_NAMES = list(PRODUCT_NAME_TO_URL.keys())

# 🎁 Wielkości opakowań (w gramach) dla poszczególnych product_id
# Służy do wyliczania ceny za gram, gdy jednostka nie podaje gramatury
PACKAGE_SIZES = {
    "100241": 10,
    "100242": 1,
    "119767": 10,
    "119768": 10,
}

# 🔁 Pomocnicze funkcje
def get_url_by_name(name: str) -> Optional[str]:
	return PRODUCT_NAME_TO_URL.get(name)

def get_product_name(product_id: str) -> str:
	return PRODUCT_ID_TO_NAME.get(product_id, f"Produkt {product_id}")
