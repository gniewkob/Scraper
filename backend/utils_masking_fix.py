def mask_email(email: str) -> str:
    """Mask email for privacy."""
    if "@" not in email:
        return email
    local, domain = email.split("@", 1)
    if len(local) <= 1:
        masked = local + "***"
    else:
        masked = local[:4] + "***" if len(local) > 4 else local + "***"
    return f"{masked}@{domain}"


def mask_phone(phone: str) -> str:
    """Mask phone number for privacy."""
    # If it's a short phone (6 digits or less), don't mask
    if len(phone) <= 6:
        return phone
    
    # Keep the prefix and last 3 digits
    if phone.startswith("+"):
        # Extract country code (first 3 chars including +)
        if len(phone) > 6:
            return phone[:3] + "***" + phone[-3:]
    
    # For other formats, mask middle part
    return phone[:3] + "***" + phone[-3:]
