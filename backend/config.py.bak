"""Application configuration loaded from environment variables."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    """Settings for the backend service."""

    secret_key: str
    admin_password_hash: str

    twilio_account_sid: str | None = None
    twilio_auth_token: str | None = None
    twilio_whatsapp_from: str | None = Field(default=None, alias="TWILIO_WHATSAPP_FROM")
    # Backward-compatible alias
    twilio_sms_from: str | None = Field(default=None, alias="TWILIO_SMS_FROM")

    confirmation_base_url: str = "https://example.com"
    allowed_origins: str = "http://localhost:5173,http://localhost:3000,http://localhost:61973"

    alerts_min_price: float = 10
    alerts_max_price: float = 35

    # Pricing display/config
    min_display_price: float = 10
    short_expiry_days: int = 30

    email_mask_visible_chars: int = 4
    phone_mask_min_length: int = 6
    phone_mask_visible_prefix: int = 3
    phone_mask_visible_suffix: int = 3

    db_pool_size: int = 5
    db_max_overflow: int = 10

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    """Return a cached instance of :class:`Settings`."""

    s = Settings()
    if not s.twilio_whatsapp_from and s.twilio_sms_from:
        object.__setattr__(s, "twilio_whatsapp_from", s.twilio_sms_from)
    return s


settings = get_settings()
