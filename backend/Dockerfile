FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

COPY backend /app/backend
COPY scraper /app/scraper

FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /install /usr/local
COPY --from=builder /app/backend /app/backend
COPY --from=builder /app/scraper /app/scraper

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
