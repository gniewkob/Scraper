# Repository Guidelines

## Project Structure & Modules
- `scraper/`: Python scraper (CLI, services, utils). Entrypoint: `python -m scraper.cli.scrape_all`.
- `backend/`: FastAPI app (`main.py`, `routes/`, `models.py`, `templates/`, `static/`).
- `frontend/`: React + Vite + TypeScript (`src/`). Optional UI replacing legacy templates.
- `tests/`: Pytest suites (`api/`, `scrape/`, `e2e/`, etc.). Config in `pytest.ini`.
- `loadtests/`: Locust scenarios.  `scripts/`: CI helpers, URL validators.
- Infra: `docker-compose.yml`, `Dockerfile.*`, `.env` (do not commit secrets).

## Build, Test, and Development
- Python env: `python -m venv venv && source venv/bin/activate && pip install -r requirements.txt -r requirements-ci.txt`.
- Scraper (local): `python -m scraper.cli.scrape_all --headless --db-url sqlite:///data/pharmacy_prices.sqlite`.
- Backend (dev): `uvicorn backend.main:app --reload --port 38273` → open `http://localhost:38273`.
- Frontend: `cd frontend && npm install` then `npm run dev` (or `npm run build`, `npm run preview`, `npm test`) → open `http://localhost:61973`.
- Tests: run `pytest` (or `pytest -q -k keyword`). Test paths default to `tests/` and files `test_*.py`.

## Coding Style & Naming
- Python: 4‑space indent (`.editorconfig`). Follow PEP 8; module names `snake_case`, classes `PascalCase`, functions/vars `snake_case`.
- Frontend: ESLint + Prettier (`npm run lint`, `npm run format`). TS strict in `tsconfig*.json`.
- Config/constants: keep in `scraper/core/config/` or `backend/config.py`; prefer env via `python-dotenv`.

## Testing Guidelines
- Prefer deterministic unit tests around parsers, DB accessors, and API routes.
- Naming: mirror module path, e.g., `tests/scrape/test_data_extractor.py`.
- E2E/UI tests may require Playwright/Firefox (`playwright install --with-deps firefox`).
- Add fixtures in `tests/conftest.py`; avoid network calls (use fakes/mocks).

## Commit & Pull Requests
- Commits: Conventional Commits (enforced by `commitlint`), e.g., `feat(backend): add alerts api`.
- PRs: clear description, linked issues (`Closes #123`), steps to test, screenshots for UI, and migration notes if DB changes.
- Keep PRs focused and small; include `frontend`/`backend`/`scraper` scope in title when relevant.

## Security & Configuration
- Never commit `.env` or secrets. Required keys include `SECRET_KEY`, `ADMIN_PASSWORD_HASH`, and DB config (`DB_URL` or `DB_PATH`).
- Twilio/SMTP keys are optional; code degrades gracefully when absent.
