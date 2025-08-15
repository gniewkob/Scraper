import React, { useState } from 'react'

interface Offer {
  price: number
  price_bucket: string
  is_historical_low: boolean
}

function getBadgeLabel(offer: Offer): string {
  if (offer.is_historical_low) return '🔥'
  if (offer.price_bucket === 'okazja') return '💰'
  return '😐'
}

export default function App() {
  const [query] = useState('')
  const [unused1] = useState(null)
  const [offers] = useState<Offer[]>([])
  const [unused2] = useState<any[]>([])
  const [unused3] = useState(null)
  const [unused4] = useState(null)
  const [count] = useState(0)

  return (
    <div className="container py-4">
      <div className="text-end">
        <button id="themeToggle" className="btn btn-outline-light btn-sm">
          Zmień motyw
        </button>
      </div>
      <h1 className="text-center mb-4">🌿 Dashboard cen medycznej marihuany</h1>
      <div className="row mb-3">
        <div className="col-md-6 mb-2 mb-md-0">
          <label className="form-label">Wybierz produkt:</label>
          <select className="form-select">
            <option value="" selected>
              Wybierz produkt...
            </option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Miasto:</label>
          <select className="form-select">
            <option value="" selected>
              Wszystkie miasta...
            </option>
          </select>
        </div>
      </div>
      {offers.length > 0 && (
        <ul>
          {offers.map((offer, idx) => (
            <li key={idx} data-testid="price-badge">
              {getBadgeLabel(offer)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
