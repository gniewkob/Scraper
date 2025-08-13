import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || ''

interface Product {
  name: string
  label: string
}

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function ProductSelect({ value, onChange }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(setProducts)
      .catch((e) => console.error('products error', e))
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-select"
    >
      <option value="">Wybierz produkt...</option>
      {products.map((p) => (
        <option key={p.name} value={p.name}>
          {p.label}
        </option>
      ))}
    </select>
  )
}
