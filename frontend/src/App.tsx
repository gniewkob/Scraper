import { useState, useEffect } from 'react'
import ProductSelect from './components/ProductSelect'
import CitySelect from './components/CitySelect'
import SortControls from './components/SortControls'
import OffersTable from './components/OffersTable'
import Pagination from './components/Pagination'
import PriceTrendChart from './components/PriceTrendChart'
import MapView from './components/MapView'
import ErrorBanner from './components/ErrorBanner'
import './index.css'
import API from './utils/env'

interface Offer {
  price: number
  price_per_g?: number
  pharmacy?: string
  address?: string
  map_url?: string
  pharmacy_lat?: number
  pharmacy_lon?: number
  price_bucket: string
  is_historical_low: boolean
}

interface TrendPoint {
  fetched_at: string
  price: string
}

function App() {
  const [product, setProduct] = useState('')
  const [city, setCity] = useState('')
  const [offers, setOffers] = useState<Offer[]>([])
  const [trend, setTrend] = useState<TrendPoint[]>([])
  const [sort, setSort] = useState('price')
  const [order, setOrder] = useState('asc')
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const limit = 50

  useEffect(() => {
    document.body.classList.add(localStorage.getItem('theme') || 'dark')
  }, [])

  const toggleTheme = () => {
    const current = document.body.classList.contains('dark') ? 'dark' : 'light'
    const next = current === 'dark' ? 'light' : 'dark'
    document.body.classList.remove(current)
    document.body.classList.add(next)
    localStorage.setItem('theme', next)
  }

  useEffect(() => {
    if (!product) {
      setOffers([])
      setTrend([])
      setTotal(0)
      setError(null)
      return
    }

    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
        sort,
        order,
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
          // ignore abort errors triggered by race conditions
          return
        }
        const message = e instanceof Error ? e.message : String(e)
        console.error('product error', e)
        setError(`Błąd podczas ładowania danych: ${message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [product, city, sort, order, offset])

  return (
    <div className="container py-4">
      <div className="text-end">
        <button
          id="themeToggle"
          onClick={toggleTheme}
          className="btn btn-outline-light btn-sm"
        >
          Zmień motyw
        </button>
      </div>
      <h1 className="text-center mb-4">🌿 Dashboard cen medycznej marihuany</h1>

      <ErrorBanner message={error} />

      <div className="row mb-3">
        <div className="col-md-6 mb-2 mb-md-0">
          <label className="form-label">Wybierz produkt:</label>
          <ProductSelect
            value={product}
            onChange={(v) => {
              setProduct(v)
              setOffset(0)
            }}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Miasto:</label>
          <CitySelect
            value={city}
            onChange={(v) => {
              setCity(v)
              setOffset(0)
            }}
          />
        </div>
      </div>

      {product && (
        <>
          <SortControls
            sort={sort}
            order={order}
            onSortChange={(s) => {
              setSort(s)
              setOffset(0)
            }}
            onOrderChange={(o) => {
              setOrder(o)
              setOffset(0)
            }}
          />

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Ładowanie...</span>
              </div>
            </div>
          )}

          {!loading && offers.length > 0 && (
            <>
              <div className="card p-3 mb-4">
                <h2 className="card-title">🗺️ Najbliższa apteka</h2>
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
              <div className="card p-3 mb-4">
                <h2 className="card-title">💎 Najtańsze oferty</h2>
                <OffersTable offers={offers} />
                <Pagination
                  total={total}
                  limit={limit}
                  offset={offset}
                  onChange={setOffset}
                />
                <div id="countInfo" className="mb-2 text-muted">
                  Wyświetlasz {offset + 1}–{Math.min(offset + limit, total)} z{' '}
                  {total} ofert
                </div>
              </div>
              <div className="card p-3 mb-4">
                <h2 className="card-title">📈 Trend cen wg daty</h2>
                <PriceTrendChart data={trend} />
              </div>
            </>
          )}

          {!loading && offers.length === 0 && !error && (
            <div className="alert alert-info">
              Brak ofert dla wybranego produktu
              {city ? ` w mieście ${city}` : ''}.
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App
