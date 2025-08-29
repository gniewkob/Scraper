"use client"

import { useState, useEffect } from "react"
import { MapPin, Leaf, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { apiClient, type SearchFilters, type CityInfo, fetchProductOptions, type ProductOption } from "@/lib/api"

interface SearchSectionProps {
  onSearch: (filters: SearchFilters, mode: 'cheapest' | 'deals') => void
  isLoading: boolean
  onFiltersChange?: (filters: Partial<SearchFilters>) => void
}

export function SearchSection({ onSearch, isLoading, onFiltersChange }: SearchSectionProps) {
  const [product, setProduct] = useState("")
  const [city, setCity] = useState("")
  const [productName, setProductName] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [cities, setCities] = useState<CityInfo[]>([])
  const [citiesLoading, setCitiesLoading] = useState(true)
  const [supportsStrain, setSupportsStrain] = useState<boolean>(true)
  const [productOptions, setProductOptions] = useState<ProductOption[]>([])
  const [mode, setMode] = useState<'cheapest' | 'deals'>('cheapest');

  // (initial live stats emission is handled by the effect below on mount)

  useEffect(() => {
    const loadCities = async () => {
      try {
        setCitiesLoading(true)
        const citiesData = await apiClient.getCities()
        setCities(citiesData)
      } catch (error) {
        console.error("Failed to load cities:", error)
        // Fallback to empty array - let user know there was an error
        setCities([])
      } finally {
        setCitiesLoading(false)
      }
    }
    const loadProducts = async () => {
      const opts = await fetchProductOptions()
      setProductOptions(opts)
    }
    const loadCaps = async () => {
      try {
        const caps = await apiClient.getCapabilities()
        if (caps && caps.strain_filter === false) {
          setSupportsStrain(false)
          setProduct("")
        }
      } catch (_) {
        // ignore — default is true
      }
    }
    loadCities()
    loadProducts()
    loadCaps()
  }, [])

  const handleSearch = () => {
    const filters: SearchFilters = { limit: 10, sort_by: "price", sort_order: "asc", mode }

    if (city && city !== "all") filters.city = city
    if (productName && productName !== "all") filters.product_name = productName
    if (product && product !== "all") filters.strain_type = product
    if (maxPrice) filters.max_price = Number.parseFloat(maxPrice)

    onSearch(filters, mode)
  }

  // Notify parent about selector changes for live stats
  useEffect(() => {
    const partial: Partial<SearchFilters> = {}
    if (city && city !== 'all') partial.city = city
    if (productName && productName !== 'all') partial.product_name = productName
    if (product && product !== 'all') partial.strain_type = product
    if (maxPrice) {
      const v = Number.parseFloat(maxPrice)
      if (!Number.isNaN(v)) partial.max_price = v
    }
    if (onFiltersChange) onFiltersChange(partial)
  }, [city, productName, product, maxPrice])

  return (
    <Card className="p-8 mb-12 bg-card/50 backdrop-blur-sm neon-border shadow-2xl cannabis-pattern relative overflow-hidden">
      <div className="absolute top-4 right-4 text-2xl opacity-20 float-animation">🌿</div>
      <div className="absolute bottom-4 left-4 text-xl opacity-15 float-animation" style={{ animationDelay: "1s" }}>🛸</div>
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          className={`px-3 py-1 rounded ${mode === 'cheapest' ? 'bg-primary text-primary-foreground' : 'bg-input'}`}
          onClick={() => setMode('cheapest')}
        >
          🔥 Najniższe ceny
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded ${mode === 'deals' ? 'bg-primary text-primary-foreground' : 'bg-input'}`}
          onClick={() => setMode('deals')}
        >
          🚀 Najlepsze okazje
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {supportsStrain && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary glow-green" />
            🌱 Wybierz produkt
          </label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger className="bg-input border-border hover:border-primary/50 transition-colors neon-border">
              <SelectValue placeholder="🔍 Wszystkie produkty..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌿 Wszystkie</SelectItem>
              <SelectItem value="indica">🌙 Indica</SelectItem>
              <SelectItem value="sativa">☀️ Sativa</SelectItem>
              <SelectItem value="hybrid">🌈 Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            🔎 Nazwa produktu
          </label>
          <Select value={productName} onValueChange={setProductName}>
            <SelectTrigger className="bg-input border-border hover:border-primary/50 transition-colors neon-border">
              <SelectValue placeholder="np. Bedrocan, S-Lab..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌿 Wszystkie produkty</SelectItem>
              {productOptions.map((p) => (
                <SelectItem key={p.id} value={p.name}>{p.label || p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent glow-purple" />
            🏙️ Miasto
          </label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="bg-input border-border hover:border-accent/50 transition-colors neon-border">
              <SelectValue placeholder={citiesLoading ? "🔄 Ładowanie..." : "🌍 Wszystkie miasta..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌍 Wszystkie miasta</SelectItem>
              {cities.map((cityInfo) => (
                <SelectItem key={cityInfo.name} value={cityInfo.name}>
                  🏛️ {cityInfo.name} ({cityInfo.pharmacy_count} aptek)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            💰 Maks. cena (zł)
          </label>
          <Input
            type="number"
            placeholder="np. 300"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-input border-border hover:border-primary/50 transition-colors neon-border"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground opacity-0">
            Search
          </label>
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg glow-green"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                🔍 Skanowanie galaktyki...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                🚀 Znajdź najlepsze oferty
              </div>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
