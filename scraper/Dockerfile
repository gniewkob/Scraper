FROM python:3.11-slim

# Install Chromium and chromedriver
RUN apt-get update && apt-get install -y \
    chromium-driver \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Environment variables for Selenium
ENV CHROME_BIN=/usr/bin/chromium \
    CHROMEDRIVER=/usr/bin/chromedriver \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

# Set work directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app/scraper

# Default command now runs the Celery worker which waits for tasks
CMD ["celery", "-A", "scraper.worker", "worker", "--loglevel=info"]
