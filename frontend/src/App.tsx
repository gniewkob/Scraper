import React, { useState } from "react"

interface Offer {
  price: number
  price_bucket: string
  is_historical_low: boolean
}

function badgeFor(offer: Offer): string {
  if (offer.is_historical_low) return "🔥"
  if (offer.price_bucket === "okazja") return "💰"
  return "😐"
}

export default function App() {
  const [query] = useState("")
  const [unused1] = useState(null)
  const [offers] = useState<Offer[]>([])
  const [unused2] = useState<any[]>([])
  const [unused3] = useState(null)
  const [unused4] = useState(null)
  const [count] = useState(0)

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
