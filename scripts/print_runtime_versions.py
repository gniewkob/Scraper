#!/usr/bin/env python
"""Print versions of core runtime dependencies.

Run after activating your venv and installing requirements:

    python scripts/print_runtime_versions.py

Outputs lines like: ``package==1.2.3``; if a package is missing, prints a note.
"""
from __future__ import annotations

import importlib
import sys

try:
    from importlib import metadata as importlib_metadata  # Python 3.8+
except Exception:  # pragma: no cover
    import importlib_metadata  # type: ignore


def get_version(pkg: str) -> str | None:
    try:
        # First try metadata (works even if module name != dist name)
        return importlib_metadata.version(pkg)
    except Exception:
        # Try importing and reading __version__
        try:
            mod = importlib.import_module(pkg)
            return getattr(mod, "__version__", None) or getattr(mod, "version", None)
        except Exception:
            return None


def main() -> int:
    packages = [
        # Backend/API
        "fastapi",
        "starlette",
        "pydantic",
        "pydantic-settings",
        "sqlalchemy",
        "alembic",
        "uvicorn",
        "httpx",
        "requests",
        # Misc used in repo
        "email-validator",
        "fastapi-csrf-protect",
        "geopy",
        "jinja2",
        "python-multipart",
        "itsdangerous",
        "twilio",
        "cryptography",
        "aiosqlite",
        "celery",
        "selenium",
    ]

    for name in packages:
        ver = get_version(name)
        if ver:
            print(f"{name}=={ver}")
        else:
            print(f"{name} not installed")
    return 0


if __name__ == "__main__":
    sys.exit(main())

