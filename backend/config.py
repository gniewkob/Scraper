"""Application configuration loaded from environment variables."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Settings for the backend service."""

    secret_key: str
    admin_password_hash: str

    twilio_account_sid: str | None = None
    twilio_auth_token: str | None = None
    twilio_whatsapp_from: str | None = None

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

    return Settings()


settings = get_settings()

