# Medical Cannabis Price Monitoring System: Architecture & Features Summary

## System Overview

This application represents a specialized monitoring system for tracking medical cannabis product prices across pharmacies in the Silesian region of Poland. The system employs web scraping technology to collect price data from gdziepolek.pl, stores it in a structured database, and provides both analytical tools and visualization interfaces.

## Key Architectural Components

### 1. Data Collection Layer
- **Selenium WebDriver Framework** with robust fallback mechanisms
- **Page Object Model** implementation for maintainable web scraping
- **Region-specific URL filtering** focused on Silesian pharmacies
- **Specialized data extractors** for:
  - THC/CBD percentage identification
  - Product expiry date monitoring
  - Brand and manufacturer information
  - Polish-specific price formatting

### 2. Data Storage Layer
- **SQLite database** with dedicated schema for price history
- **Migration support** for schema evolution
- **Normalized data storage** handling Polish price formats
- **Multi-dimensional data model** tracking:
  - Products (with THC/CBD specifics)
  - Pharmacies (with location data)
  - Prices (with historical tracking)
  - Availability (with expiration information)

### 3. Analysis Layer
- **Price classification system** calibrated for medical cannabis market:
  - 🔥 Super deal (< 20 PLN)
  - Deal (< 35 PLN)
  - Normal price (< 40 PLN) 
  - Expensive (≥ 40 PLN)
- **Trend analysis tools** for price fluctuation tracking
- **Market opportunity identification** logic
- **Regional availability mapping**

### 4. Presentation Layer
- **FastAPI-based web application** with RESTful API endpoints
- **Interactive dashboard** with Chart.js visualization
- **Responsive design** for multi-device access
- **Real-time data updates** and filtering

## Specialized Features

### Medical Cannabis-Specific Functionality
1. **Product categorization** by THC/CBD content
2. **Expiry date tracking** (critical for medical products)
3. **Regional availability monitoring** within Silesian healthcare system
4. **Standardized product naming** for consistent identification
5. **Treatment affordability analysis** tools

### Technical Implementation Highlights
1. **Browser automation resilience** with multiple fallback mechanisms
2. **Polish currency handling** (comma as decimal separator, zł symbol)
3. **Anti-detection techniques** for reliable web scraping
4. **Headless browser support** for server deployment
5. **Comprehensive error handling** with visual debugging

## Target Users & Benefits

1. **Medical Cannabis Patients**
   - Find most affordable treatment options
   - Monitor product availability in nearby pharmacies
   - Track price trends for budgeting purposes

2. **Healthcare Providers**
   - Guide patients to affordable medication sources
   - Monitor regional product availability
   - Track market pricing dynamics

3. **Market Analysts**
   - Track pricing trends in emerging medical cannabis sector
   - Monitor regional distribution patterns
   - Analyze affordability and access metrics

4. **Regulatory Stakeholders**
   - Market transparency information
   - Price and availability monitoring
   - Regional access pattern visualization

## Technical Architecture Diagram

```
┌───────────────────┐     ┌─────────────────────┐     ┌───────────────────┐
│  Data Collection  │     │   Data Processing   │     │  Data Presentation │
│  ---------------  │     │   --------------    │     │  ---------------   │
│  - Selenium       │     │   - SQLite DB       │     │  - FastAPI app     │
│  - WebDriver      │──→  │   - Price Analysis  │──→  │  - Chart.js        │
│  - Page Objects   │     │   - Classification  │     │  - API Endpoints   │
└───────────────────┘     └─────────────────────┘     └───────────────────┘
         │                          ↑                           │
         │                          │                           │
         └──────────────────────────┴───────────────────────────┘
                            JSON Data Exchange
```

## Conclusion

This specialized pharmacy price monitoring system demonstrates how targeted software architecture can address specific domain needs - in this case, the emerging medical cannabis market in Poland with focus on the Silesian region. The application provides crucial price transparency in a specialized healthcare segment where affordability and access remain significant concerns for patients.

