-- Table: offers
CREATE TABLE IF NOT EXISTS offers (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	product_id TEXT NOT NULL,
	pharmacy_name TEXT NOT NULL,
	location TEXT NOT NULL,
	price_value REAL NOT NULL,
	price_unit TEXT,
	price_text TEXT,
	availability TEXT,
	note TEXT,
	expires TEXT,
	last_updated TEXT,
	fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
