# Pharmacy Price Monitoring System - Structural Analysis

## Application Overview

The application is a comprehensive pharmacy price monitoring system that scrapes medication pricing data from pharmacy websites (specifically gdziepolek.pl), stores the data in a SQLite database, and provides an interface for analyzing and visualizing price trends. The system focuses on tracking medical cannabis product prices across different pharmacies in the Silesian region of Poland.

### Specialized Purpose

* **Primary Focus**: Medical cannabis product price monitoring and availability
* **Geographic Scope**: Specifically targets pharmacies in the Silesian region (w-slaskim) of Poland
* **Data Source**: Exclusively scrapes data from gdziepolek.pl pharmacy aggregator
* **Product Range**: Tracks various medical cannabis products including different THC/CBD ratios and brands

## Core Architecture Components

### 1. Data Collection System (Selenium-based Web Scraper)

The application uses Selenium WebDriver to automate browser interactions with gdziepolek.pl:

- **Browser Module** (`modules/browser.py`): Provides robust browser initialization with fallback mechanisms for different Chrome versions and Firefox as a last resort.
- **Data Extractor** (`modules/data_extractor.py`): Extracts structured data from pharmacy listings, including:
  - Pharmacy name and URL
  - Physical address
  - Product price and unit
  - Product availability
  - Expiry date information
  - Last updated timestamp
- **Page Object Model** (`pages/` directory): Implements the Page Object design pattern with `BasePage` providing common functionality and `PharmacyListPage` for specific pharmacy listing operations.

### 2. Data Storage and Persistence

Data is stored in a SQLite database (`pharmacy_prices.sqlite`) with a schema that includes:

- Product details and identifiers
- Pharmacy information and location
- Price history with timestamps
- Availability and opportunity classification

The `update_schema.py` script handles database schema migrations, adding new columns when needed, while `modules/db.py` provides database access functions.

### 3. Data Analysis and Reporting

- **Price Analysis** (`analyze_prices.py`): Offers various analytical views of the pricing data:
  - Lowest historical prices by product
  - Price trends over time
  - Daily price summaries
- **Price Classification**: The system categorizes prices into:
  - 🔥 super okazja (super deal): < 20 PLN
  - okazja (deal): < 35 PLN
  - normalna cena (normal price): < 40 PLN
  - drogo (expensive): ≥ 40 PLN

These thresholds are specifically calibrated for medical cannabis products in the Polish market, providing users with quick visual indicators of relative value compared to typical market prices.

### 4. Web Interface (FastAPI Application)

The current version exposes a dashboard powered by FastAPI:

- **API Endpoints** (`backend/main.py`):
  - `/api/products`: lists all monitored products
  - `/api/product/{name}`: details and price history for a product
  - `/api/alerts`: currently detected price opportunities
- **Dashboard UI** (`templates/index.html` & `static/dashboard.combined.js`):
  - interactive price trend charts using Chart.js
  - product selection dropdown
  - Best deals listing
  - Lowest price comparisons per product

## Key Functionality

1. **Automated Data Collection**: 
   - The system scrapes product pages from gdziepolek.pl for medical cannabis products
   - It extracts structured data including prices, pharmacy details, and availability
   - Data collection can be run in headless mode for server environments
   - Specialized extraction of medical cannabis-specific data such as:
     * THC/CBD percentages from product names
     * Product expiry dates (critical for medical cannabis)
     * Regional pharmacy availability within Silesian voivodeship
     * Product brand/manufacturer information

2. **Historical Price Tracking**:
   - All price points are stored with timestamps for trend analysis
   - The system retains historical data to identify price fluctuations

3. **Best Deal Identification**:
   - Automatically identifies and categorizes pricing opportunities
   - Provides "hot deals" listings based on predefined price thresholds

4. **Data Visualization**:
   - Generates line charts showing price trends over time
   - Allows users to select specific products for detailed analysis

5. **Error Resilience**:
   - Implements robust WebDriver initialization with multiple fallback options
   - Handles website structure changes through configurable selectors
   - Provides detailed logging for troubleshooting

## Configuration and Customization

The application allows configuration through:

1. **URL Configuration** (`config/urls.py`):
   - Predefined list of product URLs to monitor
   - Product name mapping for human-readable display
   - URL validation patterns
   - Region-specific filtering (currently focused on "w-slaskim" parameter)
   - Cannabis product identification by IDs and standardized naming

2. **Application Settings** (`config/config.py`):
   - Database path settings
   - Browser configuration (headless mode, timeouts)
   - Directory structure for logs and reports

3. **Data Export**:
   - Generates JSON reports of scraping results
   - Timestamps exports for tracking purposes

## Technical Implementation Details

1. **Browser Automation**:
   - Uses advanced Selenium WebDriver setup with compatibility for newer Chrome versions
   - Implements anti-detection techniques (disabling webdriver flags)
   - Provides headless mode for server environments

2. **Price Normalization**:
   - Handles various price formats (e.g., "33,00 zł" → 33.0)
   - Ensures consistent data storage and comparison
   - Specifically processes Polish currency notation (comma as decimal separator, zł symbol)
   - Normalizes unit pricing for different cannabis product quantities/formats

3. **Error Handling**:
   - Custom exception classes (`DataExtractionError`)
   - Screenshots on errors for debugging
   - Detailed logging throughout the application

## Execution Flow

1. The main script (`main.py`) fetches URLs for pharmacy products based on optional region filtering
2. It initializes a WebDriver instance and navigates to each product page
3. For each page, it extracts pharmacy listings and their data
4. The data is stored in the SQLite database and exported as JSON
5. The FastAPI application (`backend/main.py`) provides a web interface to browse and analyze this data
6. Users can interact with the dashboard to explore price trends and find best deals

## Conclusion

The application is a comprehensive solution for monitoring pharmacy prices, providing both automated data collection and interactive analysis capabilities. Its modular design and separation of concerns make it maintainable and extensible for future enhancements.

### Special Significance

This specialized focus on medical cannabis products in the Silesian region makes the application a valuable tool for:

1. **Patient Access**: Helps patients find the most affordable sources for prescribed medical cannabis
2. **Price Transparency**: Creates market transparency in a relatively new and evolving medical product segment
3. **Regulatory Monitoring**: Tracks availability of regulated medical products across different pharmacy locations
4. **Treatment Affordability**: Identifies significant price variations that can impact treatment affordability
5. **Market Analysis**: Provides data for analyzing pricing trends in the emerging medical cannabis market in Poland

