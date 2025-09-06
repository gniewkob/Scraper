# Changelog

## v0.1.1 — 2025-09-06

- Release workflow: extract only the current tag section from CHANGELOG when creating GitHub Releases.
- No functional code changes.

## v0.1.0 — 2025-09-06

- Docker: Add `.dockerignore` to reduce build context and speed up CI builds.
- Docker: Harden `Dockerfile.scrape` by setting noninteractive apt and exporting `CHROME_BIN`/PATH for system Chromium/Chromedriver.
- Result: Faster, more reliable scraper image builds; fewer cancellations/timeouts in CI.
