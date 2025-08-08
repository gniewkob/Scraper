FROM python:3.11-slim AS builder

WORKDIR /build

# Build dependency wheels
COPY scraper/requirements.txt ./requirements.txt
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# Copy the scraper source for the runtime image
COPY scraper /src/scraper

FROM python:3.11-slim

# Install Chromium only in the runtime stage
RUN apt-get update && apt-get install -y \
    chromium-driver \
    chromium \
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/chromium \
    CHROMEDRIVER=/usr/bin/chromedriver \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

# Install dependencies from the built wheels
COPY --from=builder /wheels /wheels
RUN pip install --no-cache /wheels/* && rm -rf /wheels

# Copy only the application source code
COPY --from=builder /src/scraper /app/scraper
COPY backend /app/backend

CMD ["celery", "-A", "scraper.worker", "worker", "--loglevel=info"]
