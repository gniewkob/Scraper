"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchSection } from "@/components/search-section"
import { ResultsSection } from "@/components/results-section"
import { StatsSection } from "@/components/stats-section"
import { apiClient, type SearchFilters, type Product } from "@/lib/api"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSearch = async (filters: SearchFilters) => {
    setLoading(true)
    setSearchPerformed(true)

    try {
      const response = await apiClient.searchProducts(filters)
      setProducts(response.products)
    } catch (error) {
      console.error("Search failed:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 cannabis-pattern">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        <SearchSection onSearch={handleSearch} isLoading={loading} />
        <StatsSection />
        <ResultsSection products={products} loading={loading} searchPerformed={searchPerformed} />
      </div>
    </div>
  )
}
