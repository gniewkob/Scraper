Security Rotation Checklist

Use this checklist whenever secrets may have leaked or on a regular cadence.

- Admin Password (bcrypt)
  - Generate a new bcrypt hash:
    - `python - << 'PY'
import bcrypt; pwd=b'CHANGEME_STRONG_PASSWORD'; print(bcrypt.hashpw(pwd, bcrypt.gensalt()).decode())
PY`
  - Update env: `ADMIN_PASSWORD_HASH`
  - Validate: call an admin-only endpoint with header `Authorization: Bearer CHANGEME_STRONG_PASSWORD` (expect 200); with a wrong password (expect 403).

- Secret Key
  - Generate: `openssl rand -base64 48`
  - Update env: `SECRET_KEY`
  - Validate: app starts; session/JWT signing (if used) still works.

- Fernet Key (alerts PII)
  - Generate: `python - << 'PY'
from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())
PY`
  - Update env: `ALERTS_FERNET_KEY`
  - Note: rotating breaks decrypting old records; if needed, add a dual-key decrypt path during transition.

- Database Credentials / URLs
  - Rotate DB user password; update `DB_URL` in Prod, Dev, and CI secrets if used.
  - Validate: run a read/write smoke test to the DB.

- SendGrid
  - Rotate API key; update: `SENDGRID_API_KEY`, `SENDGRID_FROM` if needed.
  - Validate: trigger a confirmation email; confirm receipt.

- SMTP (if used instead of SendGrid)
  - Rotate: `SMTP_PASSWORD`; verify host/port/user.
  - Validate: send a test message.

- Twilio (SMS/WhatsApp)
  - Rotate: `TWILIO_AUTH_TOKEN`; verify `TWILIO_ACCOUNT_SID`, sender numbers.
  - Validate: send an SMS and a WhatsApp message to a test number.

- CORS / Public URLs
  - Confirm `ALLOWED_ORIGINS` and `CONFIRMATION_BASE_URL` are correct for the current environment.

- GitHub Actions
  - Update repository Secrets:
    - `TARGET_URL`, `MIN_OFFERS` (if private)
    - `DB_URL`
    - `MYDEVIL_USER`, `MYDEVIL_HOST`, `MYDEVIL_PATH`, `MYDEVIL_SSH_KEY`
    - `REGISTRY`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`
    - `DEPLOY_KEY`, `DEPLOY_REPO`
    - `BOT_PAT`
  - Optionally set Variables for public preview configs (e.g., `VITE_API_URL`).
  - Validate: re-run CI workflows; deploy pipeline succeeds.

General Notes

- Never commit real `.env` files. Use `.env.example` as reference.
- For production, store secrets in the hosting provider’s secret manager or systemd environment.
- Document who rotated what and when. Consider short TTLs for credentials where feasible.

