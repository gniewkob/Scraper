FROM python:3.11-slim AS builder

WORKDIR /build

# Install dependencies into wheel format for reuse in the runtime image
COPY requirements.txt .
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

FROM python:3.11-slim

WORKDIR /app

# Install the built wheels and cleanup
COPY --from=builder /wheels /wheels
RUN pip install --no-cache /wheels/* && rm -rf /wheels

# Copy only the source code needed at runtime
COPY backend ./backend
COPY scraper ./scraper

EXPOSE 61973

ENV PORT=61973

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT}"]
