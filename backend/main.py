from fastapi import FastAPI, Query, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
import sqlite3
import json
import re
from datetime import datetime
from collections import defaultdict
from math import radians, cos, sin, asin, sqrt

from scraper.core.config.config import DB_PATH
ALERT_FILE = Path(__file__).parent / "user_alerts.json"

STATIC_DIR = str(Path(__file__).parent / "static")
TEMPLATES_DIR = str(Path(__file__).parent / "templates")

app = FastAPI()
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATES_DIR)

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
	return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/products", response_class=JSONResponse)
def get_products():
	conn = sqlite3.connect(DB_PATH)
	rows = conn.execute("SELECT DISTINCT name FROM products").fetchall()
	conn.close()
	results = []
	for row in rows:
		label = (
			row[0]
			.replace("Cannabis", "")
			.replace("Flos", "")
			.replace("Marihuana Lecznicza Medyczna", "")
			.replace("Medyczna", "")
			.strip()
			.title()
		)
		results.append({"name": row[0], "label": label})
	return results

def haversine(lat1, lon1, lat2, lon2):
	# Zwraca dystans w km między dwoma punktami
	R = 6371  # km
	lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
	dlat = radians(lat2 - lat1)
	dlon = radians(lon2 - lon1)
	a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
	c = 2 * asin(sqrt(a))
	return R * c

@app.get("/api/product/{product_name}", response_class=JSONResponse)
def get_product_by_name(
	product_name: str,
	limit: int = Query(50, ge=1, le=100),
	offset: int = Query(0, ge=0),
	sort: str = Query("price"),
	order: str = Query("asc"),
	city: str = Query(None),
	lat: float = Query(None),
	lon: float = Query(None),
	radius: float = Query(None)
):
	from urllib.parse import unquote
	decoded_name = unquote(product_name)
	conn = sqlite3.connect(DB_PATH)
	conn.row_factory = sqlite3.Row
	row = conn.execute("SELECT product_id FROM products WHERE name = ?", (decoded_name,)).fetchone()
	if not row:
		return JSONResponse({"error": "Produkt nie znaleziony"}, status_code=404)
	product_id = row["product_id"]

	allowed_sort = {"price", "expiration", "fetched_at"}
	allowed_order = {"asc", "desc"}
	sort_sql = sort if sort in allowed_sort else "price"
	order_sql = order if order in allowed_order else "asc"

	query = "SELECT * FROM pharmacy_prices WHERE product_id = ?"
	params = [product_id]

	if city:
		query += " AND (address LIKE ? OR address LIKE ?)"
		params.append(f"%, {city}")
		params.append(f"% {city}")

	query += f" ORDER BY {sort_sql} {order_sql} LIMIT ? OFFSET ?"
	params += [limit, offset]
	rows = conn.execute(query, params).fetchall()

	count_query = "SELECT COUNT(*) FROM pharmacy_prices WHERE product_id = ?"
	count_params = [product_id]
	if city:
		count_query += " AND (address LIKE ? OR address LIKE ?)"
		count_params.append(f"%, {city}")
		count_params.append(f"% {city}")
	total = conn.execute(count_query, count_params).fetchone()[0]
	conn.close()

	offers = []
	now = datetime.now()
	MINIMUM_DISPLAY_PRICE = 10

	for row in rows:
		price = float(row["price"])
		if price < MINIMUM_DISPLAY_PRICE:
			continue
		# --- Filtr promień od lokalizacji użytkownika ---
		if lat is not None and lon is not None and radius is not None:
			plat = row["pharmacy_lat"]
			plon = row["pharmacy_lon"]
			if plat is None or plon is None:
				continue
			distance = haversine(lat, lon, plat, plon)
			if distance > radius:
				continue
		expiration = row["expiration"]
		fetched_at = row["fetched_at"]
		short_expiry = False
		if expiration:
			try:
				days_left = (datetime.fromisoformat(expiration) - now).days
				short_expiry = days_left <= 30
			except:
				pass
		offers.append({
			"pharmacy": row["pharmacy_name"],
			"address": row["address"],
			"price": price,
			"unit": row["unit"],
			"expiration": expiration,
			"fetched_at": fetched_at,
			"short_expiry": short_expiry,
			"map_url": row["map_url"] or "",
			"pharmacy_lat": row["pharmacy_lat"],
			"pharmacy_lon": row["pharmacy_lon"]
		})

	# --- budujemy trend i top3 (POZA pętlą for) ---
	trend_data = []
	seen_top3_keys = set()
	top3 = []
	for offer in offers:
		trend_data.append({
			"price": offer["price"],
			"expiration": offer["expiration"],
			"fetched_at": offer["fetched_at"]
		})
		key = (offer["pharmacy"], offer["expiration"])
		if key not in seen_top3_keys and len(top3) < 3:
			top3.append(offer)
			seen_top3_keys.add(key)

	return {
		"offers": offers,
		"total": total,
		"limit": limit,
		"offset": offset,
		"sort": sort_sql,
		"order": order_sql,
		"top3": top3,
		"trend": trend_data
	}

# --------- ALERTY I GRUPOWANIE ---------
@app.get("/api/alerts", response_class=JSONResponse)
def get_price_alerts():
	conn = sqlite3.connect(DB_PATH)
	conn.row_factory = sqlite3.Row
	rows = conn.execute("""
		SELECT * FROM pharmacy_prices
		WHERE price < 35 AND price >= 10
		ORDER BY price ASC
	""").fetchall()
	conn.close()

	alerts = []
	now = datetime.now()
	for row in rows:
		expiration = row["expiration"]
		fetched_at = row["fetched_at"]
		short_expiry = False
		if expiration:
			try:
				days_left = (datetime.fromisoformat(expiration) - now).days
				short_expiry = days_left <= 30
			except:
				pass

		alerts.append({
			"product_id": row["product_id"],
			"product": row["product_id"],
			"pharmacy": row["pharmacy_name"],
			"price": float(row["price"]),
			"unit": "g",
			"expiration": expiration,
			"fetched_at": fetched_at,
			"short_expiry": short_expiry,
			"map_url": row["map_url"]
		})

	return alerts

@app.get("/api/alerts_filtered", response_class=JSONResponse)
def get_filtered_alerts():
	conn = sqlite3.connect(DB_PATH)
	conn.row_factory = sqlite3.Row
	cur = conn.cursor()

	cur.execute("""
		SELECT *
		FROM pharmacy_prices AS p
		WHERE fetched_at = (
			SELECT MAX(fetched_at)
			FROM pharmacy_prices
			WHERE
				product_id = p.product_id AND
				pharmacy_name = p.pharmacy_name AND
				price = p.price AND
				expiration = p.expiration
		)
	""")
	rows = cur.fetchall()
	conn.close()

	alerts = []
	now = datetime.now()

	for row in rows:
		price = float(row["price"])
		if price < 10:
			continue
		expiration = row["expiration"]
		fetched_at = row["fetched_at"]
		short_expiry = False

		if expiration:
			try:
				days_left = (datetime.fromisoformat(expiration) - now).days
				short_expiry = days_left <= 30
			except:
				pass

		alerts.append({
			"product_id": row["product_id"],
			"product": row["product_id"],
			"pharmacy": row["pharmacy_name"],
			"price": float(row["price"]),
			"unit": row["unit"],
			"expiration": expiration,
			"fetched_at": fetched_at,
			"availability": row["availability"],
			"updated": row["updated"],
			"map_url": row["map_url"],
			"short_expiry": short_expiry
		})

	return alerts

@app.get("/api/alerts_grouped", response_class=JSONResponse)
def get_grouped_alerts():
	conn = sqlite3.connect(DB_PATH)
	conn.row_factory = sqlite3.Row
	cur = conn.cursor()
	cur.execute("SELECT * FROM pharmacy_prices WHERE price IS NOT NULL")
	rows = cur.fetchall()
	conn.close()

	grouped = defaultdict(list)
	now = datetime.now()

	for row in rows:
		price = float(row["price"])
		if price < 10:
			continue
		expiration = row["expiration"]
		fetched_at = row["fetched_at"]
		short_expiry = False
		if expiration:
			try:
				days_left = (datetime.fromisoformat(expiration) - now).days
				short_expiry = days_left <= 30
			except:
				pass

		offer = {
			"pharmacy": row["pharmacy_name"],
			"price": float(row["price"]),
			"unit": row["unit"],
			"expiration": expiration,
			"fetched_at": fetched_at,
			"availability": row["availability"],
			"updated": row["updated"],
			"map_url": row["map_url"],
			"short_expiry": short_expiry
		}

		grouped[row["product_id"]].append(offer)

	results = []
	conn2 = sqlite3.connect(DB_PATH)  # Otwórz nowe połączenie tylko do pobierania nazw
	for product_id, offers in grouped.items():
		if not offers:
			continue
		row = conn2.execute("SELECT name FROM products WHERE product_id = ?", (product_id,)).fetchone()
		name = row[0] if row else product_id
		min_price = min(o["price"] for o in offers)
		results.append({
			"product_id": product_id,
			"product": name,  # <- teraz jest przyjazna nazwa
			"min_price": min_price,
			"offers": sorted(offers, key=lambda x: x["price"])
		})
	conn2.close()
	return results

# --------- ALERTY: rejestracja i lista ---------
@app.post("/api/alerts/register", response_class=JSONResponse)
async def register_alert(request: Request):
	data = await request.json()
	email = data.get("email")
	threshold = data.get("threshold")
	product_name = data.get("product_name")

	if not email or not threshold:
		return JSONResponse({"status": "error", "message": "Brakuje danych"}, status_code=400)

	alerts = []
	if ALERT_FILE.exists():
		try:
			with open(ALERT_FILE, "r", encoding="utf-8") as f:
				alerts = json.load(f)
		except:
			alerts = []

	alerts.append({
		"email": email,
		"threshold": threshold,
		"product_name": product_name,
		"created": datetime.now().isoformat()
	})

	with open(ALERT_FILE, "w", encoding="utf-8") as f:
		json.dump(alerts, f, indent=2, ensure_ascii=False)

	return {"status": "ok"}

@app.get("/api/alerts/list", response_class=JSONResponse)
def list_alerts():
	if not ALERT_FILE.exists():
		return []
	try:
		with open(ALERT_FILE, "r", encoding="utf-8") as f:
			alerts = json.load(f)
	except:
		alerts = []
	return alerts

@app.get("/api/cities", response_class=JSONResponse)
def get_cities():
	conn = sqlite3.connect(DB_PATH)
	rows = conn.execute("SELECT DISTINCT address FROM pharmacy_prices WHERE address IS NOT NULL AND address != ''").fetchall()
	conn.close()
	cities = set()
	for (address,) in rows:
		if "," in address:
			city_part = address.split(",")[-1].strip()
			# Usuń kod pocztowy jeśli jest (np. "01-234 Warszawa" → "Warszawa")
			city = re.sub(r"^\d{2}-\d{3}\s*", "", city_part)
			if city:
				cities.add(city)
	return sorted(cities)