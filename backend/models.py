"""Database ORM models used by the application."""
from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, Float, text
from sqlalchemy.orm import declarative_base

# shared declarative base for ORM models
Base = declarative_base()


class Product(Base):
    """Product available for sale."""

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    slug = Column(String(255), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    active = Column(Boolean, nullable=False, default=True, server_default=text("true"))
    first_seen = Column(DateTime, default=datetime.utcnow)
    last_seen = Column(DateTime, default=datetime.utcnow)
    
    # New fields for frontend integration
    strain_type = Column(String(50), nullable=True)  # indica, sativa, hybrid, unknown
    thc_content = Column(Float, nullable=True)  # THC percentage
    cbd_content = Column(Float, nullable=True)  # CBD percentage
    category = Column(String(100), nullable=True)  # Product category
    image_url = Column(String(500), nullable=True)  # Product image URL

    def __repr__(self) -> str:  # pragma: no cover - debug helper
        return f"<Product slug={self.slug!r} name={self.name!r}>"


class PharmacyPrice(Base):
    """Pharmacy price information for products."""

    __tablename__ = "pharmacy_prices"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, nullable=False)
    pharmacy_name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=True)
    price = Column(Float, nullable=True)
    unit = Column(String(50), nullable=True)
    expiration = Column(String(50), nullable=True)
    fetched_at = Column(String(50), nullable=False)
    availability = Column(String(50), nullable=True)
    updated = Column(String(50), nullable=True)
    map_url = Column(String(255), nullable=True)
    pharmacy_lat = Column(Float, nullable=True)
    pharmacy_lon = Column(Float, nullable=True)
    
    # New fields for frontend integration
    distance = Column(Float, nullable=True)  # Distance from user location
    availability_status = Column(String(50), nullable=True)  # Available, Out of stock, etc.
    pharmacy_rating = Column(Float, nullable=True)  # Pharmacy rating (1-5)
    delivery_options = Column(String(200), nullable=True)  # Delivery, pickup, etc.

    def __repr__(self) -> str:  # pragma: no cover - debug helper
        return f"<PharmacyPrice product_id={self.product_id!r} pharmacy={self.pharmacy_name!r} price={self.price!r}>"


class NotificationFailure(Base):
    """Record notification delivery failures."""

    __tablename__ = "notification_failures"

    id = Column(Integer, primary_key=True, autoincrement=True)
    destination = Column(String(255), nullable=False)
    payload = Column(Text, nullable=True)
    error = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
