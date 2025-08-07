import os
from functools import lru_cache
from typing import Optional

from cryptography.fernet import Fernet


@lru_cache(maxsize=1)
def _get_fernet() -> Fernet:
    key = os.environ.get("ALERTS_FERNET_KEY")
    if not key:
        raise RuntimeError("ALERTS_FERNET_KEY environment variable is not set")
    return Fernet(key)


def encrypt(text: Optional[str]) -> Optional[str]:
    if text is None:
        return None
    f = _get_fernet()
    return f.encrypt(text.encode()).decode()


def decrypt(token: Optional[str]) -> Optional[str]:
    if token is None:
        return None
    f = _get_fernet()
    return f.decrypt(token.encode()).decode()
