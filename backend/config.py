"""Backend configuration constants with environment overrides."""

import os

EMAIL_MASK_VISIBLE_CHARS = int(os.getenv("EMAIL_MASK_VISIBLE_CHARS", "4"))
"""Number of characters to show at start of email addresses."""

PHONE_MASK_MIN_LENGTH = int(os.getenv("PHONE_MASK_MIN_LENGTH", "6"))
"""Minimum phone length before masking is applied."""

PHONE_MASK_VISIBLE_PREFIX = int(os.getenv("PHONE_MASK_VISIBLE_PREFIX", "3"))
"""Digits to show at the start of a masked phone number."""

PHONE_MASK_VISIBLE_SUFFIX = int(os.getenv("PHONE_MASK_VISIBLE_SUFFIX", "3"))
"""Digits to show at the end of a masked phone number."""
