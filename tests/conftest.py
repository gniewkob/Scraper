import sys
import os
from pathlib import Path
import bcrypt
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


import pytest


@pytest.fixture()
def migrated_db(tmp_path, monkeypatch):
    """Create a temporary SQLite database and apply migrations."""
    db_file = tmp_path / "test.sqlite"
    monkeypatch.setattr("backend.main.DB_PATH", str(db_file), raising=False)
    monkeypatch.setattr("backend.main.DB_URL", f"sqlite:///{db_file}", raising=False)
    monkeypatch.setattr(
        "scraper.core.config.config.DB_PATH", str(db_file), raising=False
    )
    monkeypatch.setattr(
        "scraper.core.config.config.DB_URL", f"sqlite:///{db_file}", raising=False
    )
    from backend import db as backend_db

    backend_db._ENGINE_CACHE.clear()
    cfg = Config("backend/alembic.ini")
    command.upgrade(cfg, "head")
    return db_file
