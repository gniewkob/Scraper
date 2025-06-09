from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import sqlite3
import os
import re

DB_PATH = "data/pharmacy_prices.sqlite"

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

def get_db():
	conn = sqlite3.connect(DB_PATH)
	conn.row_factory = sqlite3.Row
	return conn

def get_all_offers():
	conn = get_db()
	rows = conn.execute(
		"""
		SELECT p.pharmacy_name, p.address, p.price, p.unit, p.expiration, p.map_url, 
			   p.product_id, pr.name as product_name
		FROM pharmacy_prices p
		LEFT JOIN products pr ON p.product_id = pr.product_id
		"""
	).fetchall()
	conn.close()
	return [dict(row) for row in rows]

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
	return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/cities", response_class=JSONResponse)
def api_cities():
	offers = get_all_offers()
	# Wyłuskuj miasto z adresu – prosty regex na "XX-XXX Miasto"
	city_regex = re.compile(r"\d{2}-\d{3}\s+([\wąćęłńóśźżA-Z]+)", re.IGNORECASE)
	cities = set()
	for o in offers:
		match = city_regex.search(o["address"] or "")
		if match:
			cities.add(match.group(1))
	return sorted(list(cities))

@app.get("/api/offers", response_class=JSONResponse)
def api_offers(city: str = None, product: str = None):
	offers = get_all_offers()
	result = offers
	if city:
		# Filtrowanie po mieście wyłuskanym z adresu
		city = city.lower()
		result = [
			o for o in result
			if (o["address"] and city in o["address"].lower())
			or (o.get("city") and city in o["city"].lower())
		]
	if product:
		product = product.lower()
		result = [
			o for o in result
			if o["product_name"] and product in o["product_name"].lower()
		]
	return result
