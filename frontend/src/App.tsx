import React from "react"

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
  const [query] = React.useState("")
  const [unused1] = React.useState(null)
  const [offers] = React.useState<Offer[]>([])
  const [unused2] = React.useState<any[]>([])
  const [unused3] = React.useState(null)
  const [unused4] = React.useState(null)
  const [count] = React.useState(0)

  return (
    <div>
      <h1>🌿 Dashboard cen medycznej marihuany</h1>
      {offers.length > 0 && (
        <ul>
          {offers.map((offer, idx) => (
            <li key={idx}>
              <span data-testid="price-badge">{badgeFor(offer)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
