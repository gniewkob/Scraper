from typing import List, Optional
from pydantic import BaseModel


class Offer(BaseModel):
    pharmacy: Optional[str]
    address: Optional[str]
    price: float
    unit: Optional[str] = None
    expiration: Optional[str] = None
    fetched_at: str
    short_expiry: Optional[bool] = None
    map_url: Optional[str] = None
    pharmacy_lat: Optional[float] = None
    pharmacy_lon: Optional[float] = None
    price_per_g: Optional[float] = None
    price_bucket: str
    is_historical_low: bool


class TrendEntry(BaseModel):
    price: float
    expiration: Optional[str] = None
    fetched_at: str


class ProductOffersResponse(BaseModel):
    offers: List[Offer]
    total: int
    limit: int
    offset: int
    sort: str
    order: str
    top3: List[Offer]
    trend: List[TrendEntry]
