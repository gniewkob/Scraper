"""Tests for masking helper functions."""

from backend.utils import mask_email, mask_phone


def test_mask_email():
    assert mask_email("john@example.com") == "john***@example.com"
    assert mask_email("a@b.com") == "a***@b.com"


def test_mask_phone():
    assert mask_phone("+481234567") == "+48***567"
    assert mask_phone("123456") == "123456"

