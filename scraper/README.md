# Pharmacy Price Verification Framework

This project is a structured Selenium test automation framework designed to verify pharmacy pricing information from online pharmaceutical websites. It uses modular components for browser automation, data extraction, and price validation.

## Project Overview

The framework is designed to:
- Scrape pharmacy websites for medication pricing data
- Validate price information is correctly displayed
- Extract and store pharmacy details in a structured format
- Provide detailed logging and error handling
- Generate JSON output of verified pharmacy data

## Project Structure

```
selenium/
│
├── config/                    # Configuration files
│   ├── __init__.py            # Package initialization
│   └── urls.py                # URL configuration and validation
│
├── modules/                   # Core functionality modules
│   ├── __init__.py            # Module exports
│   ├── browser.py             # Browser setup and management
│   ├── data_extractor.py      # Pharmacy data extraction
│   └── price_validator.py     # Price validation logic
│
├── pages/                     # Page Object Model classes (for future expansion)
│   └── __init__.py
│
├── tests/                     # Test cases
│   ├── __init__.py            # Test package with logging setup
│   └── test_pharmacy_data.py  # Pharmacy data tests
│
├── error_screenshots/         # Error screenshots for debugging
├── logs/                      # Test execution logs
├── reports/                   # Test reports
├── README.md                  # Project documentation
└── requirements.txt           # Project dependencies
```

## Setup

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Make sure you have Chrome browser installed (the framework uses ChromeDriver by default)

## Configuration

### URL Configuration

The framework comes pre-configured with URLs to pharmacy product pages in the `config/urls.py` file. You can:

- Modify the `URLS` list to target different product pages
- Update the `PRODUCT_NAMES` dictionary to map product IDs to human-readable names
- Adjust `VALID_URL_PATTERNS` to match your target website structure

### Test Configuration

Test parameters can be adjusted in the test files:
- `TIMEOUT` - Wait time for elements to appear (default: 10 seconds)
- `PHARMACY_ITEMS_SELECTOR` - CSS selector for pharmacy elements

## Running Tests

Run all tests:
```
pytest
```

Run with HTML report:
```
pytest --html=reports/report.html
```

Run a specific test:
```
pytest tests/test_pharmacy_data.py::test_price_extraction
```

Run tests with verbose output:
```
pytest -v
```

## Test Output

The framework produces several types of output:

1. **Console Logs**: Detailed test execution information in the console
2. **Log Files**: Test logs are saved to `pharmacy_tests.log`
3. **JSON Data**: Extracted pharmacy data saved to `pharmacies_[product_id].json`
4. **Error Screenshots**: Automatically captured on test failures in `error_screenshots/`
5. **HTML Reports**: When using the `--html` flag

## Core Modules

### Browser Module

Handles WebDriver setup and configuration:
```python
from modules.browser import setup_browser
driver = setup_browser(headless=True)
```

### Price Validator

Validates if price information is correctly displayed:
```python
from modules.price_validator import verify_price
has_price, price_text = verify_price(element)
```

### Data Extractor

Extracts complete pharmacy information from webpage elements:
```python
from modules.data_extractor import extract_pharmacy_data
pharmacy_data = extract_pharmacy_data(element)
```

## Troubleshooting

### Common Issues

1. **WebDriver Issues**:
   - The framework uses webdriver-manager to automatically download the correct ChromeDriver
   - If you encounter driver issues, try updating Chrome or clearing the `~/.wdm` directory

2. **Element Not Found Errors**:
   - Check if the website structure has changed
   - Verify the selectors in the test files
   - Increase the `TIMEOUT` value for slow connections

3. **Price Extraction Failing**:
   - Inspect the error screenshots to see the actual page state
   - Check if the price format on the website has changed
   - Update the regex pattern in `price_validator.py` if needed

### Debug Mode

For more detailed logs, add debug flags:
```
pytest -v --log-cli-level=DEBUG
```

## Framework Features

- Modular architecture with separation of concerns
- Automatic WebDriver management
- Detailed logging and error screenshots
- Data extraction with validation
- JSON output for further processing
- HTML reporting through pytest plugins
- Cross-browser testing support (configurable in browser.py)

## Synchronizing the SQLite database

The script `scrape_and_sync.sh` can run the scraper, geocode addresses and upload the resulting `data/pharmacy_prices.sqlite` to a remote server.

By default the upload uses `rsync` with the `--compress` and `--partial` options, sending only the differences:

```bash
./scrape_and_sync.sh
```

You can override the destination with environment variables:

```bash
REMOTE_USER=alice \
REMOTE_HOST=example.org \
REMOTE_PATH=/path/on/server/pharmacy_prices.sqlite \
./scrape_and_sync.sh
```

If `rsync` is unavailable the script falls back to a compressed transfer using `gzip` and `scp`. The remote file will have the `.gz` extension and needs to be unpacked:

```bash
gunzip pharmacy_prices.sqlite.gz
```
