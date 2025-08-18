"""Database ORM models used by the application."""
from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, text
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

    def __repr__(self) -> str:  # pragma: no cover - debug helper
        return f"<Product slug={self.slug!r} name={self.name!r}>"


class NotificationFailure(Base):
    """Record notification delivery failures."""

    __tablename__ = "notification_failures"

    id = Column(Integer, primary_key=True, autoincrement=True)
    destination = Column(String(255), nullable=False)
    payload = Column(Text, nullable=True)
    error = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
