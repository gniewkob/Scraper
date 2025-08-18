import os
import sys
import tempfile
from pathlib import Path

import bcrypt
import pytest
from alembic import command
from alembic.config import Config
from cryptography.fernet import Fernet

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

os.environ.setdefault("SECRET_KEY", "test-secret")
os.environ.setdefault(
    "ADMIN_PASSWORD_HASH", bcrypt.hashpw(b"admin", bcrypt.gensalt()).decode()
)
os.environ["DB_URL"] = ""
os.environ.setdefault("ALERTS_FERNET_KEY", Fernet.generate_key().decode())


@pytest.fixture()
def migrated_db(monkeypatch):
    """Create a temporary SQLite database and apply migrations."""
    with tempfile.NamedTemporaryFile(suffix=".sqlite", delete=False) as tmp:
        db_file = tmp.name

    monkeypatch.setattr("backend.main.DB_PATH", db_file, raising=False)
    monkeypatch.setattr("backend.main.DB_URL", f"sqlite:///{db_file}", raising=False)
    monkeypatch.setattr("scraper.core.config.config.DB_PATH", db_file, raising=False)
    monkeypatch.setattr(
        "scraper.core.config.config.DB_URL", f"sqlite:///{db_file}", raising=False
    )

    from backend import db as backend_db

    backend_db._ENGINE_CACHE.clear()
    cfg = Config("backend/alembic.ini")
    command.upgrade(cfg, "head")

    try:
        yield db_file
    finally:
        backend_db._ENGINE_CACHE.clear()
        if os.path.exists(db_file):
            os.remove(db_file)
