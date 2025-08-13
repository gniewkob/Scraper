from typing import List, Optional
from pydantic import BaseModel, Field, model_validator, EmailStr, constr


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


class AlertRegisterRequest(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[constr(pattern=r"^\+?[0-9\s\-()]{6,20}$")] = None
    threshold: float = Field(..., gt=0)
    product_name: str

    @model_validator(mode="after")
    def at_least_one_contact(cls, m):
        if not (m.email or m.phone):
            raise ValueError("either email or phone must be provided")
        return m


class AlertConfirmRequest(BaseModel):
    token: str
