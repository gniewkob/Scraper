import { useEffect, useState } from 'react'
import ProductSelect from './components/ProductSelect'
import CitySelect from './components/CitySelect'
import OffersTable from './components/OffersTable'
import PriceTrendChart from './components/PriceTrendChart'
import MapView from './components/MapView'
import API from './utils/env'

type Offer = {
  pharmacy: string
  address: string
  price: number
  unit: string
  fetched_at: string
  pharmacy_lat?: number
  pharmacy_lon?: number
  short_expiry?: boolean
  is_historical_low?: boolean
}

export default function App() {
  const [product, setProduct] = useState('')
  const [city, setCity] = useState('')
  const [offers, setOffers] = useState<Offer[]>([])
  const [trend, setTrend] = useState<{ price: number; fetched_at: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!product) {
      setOffers([])
      setTrend([])
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError('')

    const fetchOffers = async () => {
      const params = new URLSearchParams({
        limit: '50',
        offset: '0',
        sort: 'price',
        order: 'asc',
      })
      if (city) params.append('city', city)

      try {
        const r = await fetch(
          `${API}/api/product/${encodeURIComponent(product)}?${params}`,
          { signal: controller.signal },
        )
        if (!r.ok) throw new Error(`HTTP ${r.status} - ${r.statusText}`)
        const data = await r.json()
        setOffers(data.offers || [])
        setTrend(data.trend || [])
        setTotal(data.total || 0)
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          return
        }
        const message = e instanceof Error ? e.message : String(e)
        console.error('product error', e)
        setError(`Błąd podczas ładowania danych: ${message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
    return () => controller.abort()
  }, [product, city])

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>🌿 Medical Cannabis Price Tracker</h1>
        <p>Compare prices across pharmacies in Poland</p>
      </header>

      {/* Search Section */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
          🔍 Search Products
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Select Product
            </label>
            <ProductSelect value={product} onChange={setProduct} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Filter by City
            </label>
            <CitySelect value={city} onChange={setCity} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {!loading && offers.length > 0 && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{offers.length}</div>
            <div className="stat-label">Available Offers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {Math.min(...offers.map(o => o.price)).toFixed(2)} zł
            </div>
            <div className="stat-label">Lowest Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {Math.max(...offers.map(o => o.price)).toFixed(2)} zł
            </div>
            <div className="stat-label">Highest Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {(offers.reduce((sum, o) => sum + o.price, 0) / offers.length).toFixed(2)} zł
            </div>
            <div className="stat-label">Average Price</div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="spinner-border"></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            Loading prices...
          </p>
        </div>
      )}

      {/* Results Section */}
      {!loading && offers.length > 0 && (
        <>
          {/* Price Table */}
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>
              💊 Prices for {product}
              {city && ` in ${city}`}
            </h2>
            <OffersTable offers={offers} />
          </div>

          {/* Map */}
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>📍 Pharmacy Locations</h2>
            <MapView
              offers={offers}
              center={
                offers.length &&
                offers[0].pharmacy_lat &&
                offers[0].pharmacy_lon
                  ? [offers[0].pharmacy_lat, offers[0].pharmacy_lon]
                  : undefined
              }
            />
          </div>

          {/* Price Trend Chart */}
          {trend.length > 0 && (
            <div className="card">
              <h2 style={{ marginBottom: '1.5rem' }}>📈 Price Trend</h2>
              <PriceTrendChart data={trend} />
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {!loading && product && offers.length === 0 && (
        <div className="alert alert-info" style={{ textAlign: 'center' }}>
          <h3>No offers found</h3>
          <p>Try selecting a different product or removing the city filter</p>
        </div>
      )}
    </div>
  )
}
