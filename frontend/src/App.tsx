import React from "react"

export interface Offer {
  price: number
  price_bucket: string
  is_historical_low: boolean
}

export function badgeFor(offer: Offer): string {
  if (offer.is_historical_low) return "🔥"
  if (offer.price_bucket === "okazja") return "💰"
  return "😐"
}

export function App({ offers = [] }: { offers?: Offer[] }) {
  return (
    <div>
      <h1>🌿 Dashboard cen medycznej marihuany</h1>
      {offers.length > 0 && (
        <ul>
          {offers.map((offer, idx) => (
            <li key={idx} data-testid="price-badge">
              {badgeFor(offer)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
