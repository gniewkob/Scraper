# config/selectors.py

PHARMACY_ITEMS_SELECTORS = [
	"li.MuiListItem-root",             # dokładny kontener oferty
	"li[class*='ListItem']",           # fallback dla komponentów MUI
	"li"                               # ogólny fallback
]

NAME_SELECTORS = [
	"div.tss-hhnaft-contents > a.MuiTypography-root.MuiTypography-h2",
	"a[href*='/apteki/']",
	"div[class*='contents'] a"
]

ADDRESS_SELECTORS = [
	"div.tss-hhnaft-contents > p.MuiTypography-root.MuiTypography-body1",
	"div[class*='contents'] p"
]

PRICE_SELECTORS = [
	"span[class*='priceExp']",             # najczęściej występująca forma
	"div[class*='price']",                 # fallback
	"p.MuiTypography-root.MuiTypography-body1"  # czasem cena ukryta tutaj
]

AVAILABILITY_SELECTORS = [
	"span[class*='quantity']",
	".tss-h4quo3-quantity"
]

UPDATED_SELECTORS = [
	"p.MuiTypography-root.MuiTypography-body2",
	"div[class*='update']"
]

EXPIRATION_SELECTORS = [
	"div[class*='expiration']",
	"div:contains('➔')"
]

PAGE_VERIFICATION_SELECTORS = [
	"header",
	"footer",
	"nav",
	".main",
	"#content",
	".search-results"
]
