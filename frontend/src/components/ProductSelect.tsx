import { useEffect, useState } from 'react'
import API from '../utils/env'

interface Product {
  id: number
  name: string
  label: string
}

interface ProductSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function ProductSelect({ value, onChange }: ProductSelectProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('Fetching products from:', `${API}/api/products`)
    fetch(`${API}/api/products`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON")
        }
        return res.json()
      })
      .then(data => {
        console.log('Products loaded:', data)
        setProducts(data)
        setError(null)
      })
      .catch(err => {
        console.error('Failed to load products:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="spinner-border spinner-border-sm" />
  }

  if (error) {
    return <div className="alert alert-danger">Error loading products: {error}</div>
  }

  if (products.length === 0) {
    return <div className="alert alert-warning">No products available</div>
  }

  return (
    <select 
      className="form-select" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select a product...</option>
      {products.map(product => (
        <option key={product.id} value={product.name}>
          {product.label || product.name}
        </option>
      ))}
    </select>
  )
}
