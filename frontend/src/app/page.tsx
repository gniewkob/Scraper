"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchSection } from "@/components/search-section"
import { ResultsSection } from "@/components/results-section"
import { StatsSection } from "@/components/stats-section"
import { apiClient, type SearchFilters, type Product } from "@/lib/api"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [lastFilters, setLastFilters] = useState<SearchFilters | null>(null)
  const [mode, setMode] = useState<'cheapest' | 'deals'>('cheapest')

  const handleSearch = async (filters: SearchFilters, m: 'cheapest' | 'deals' = mode) => {
    setLoading(true)
    setSearchPerformed(true)

    try {
      setMode(m)
      setLastFilters(filters)
      if (m === 'deals') {
        const deals = await apiClient.getBestDeals(filters.limit || 10)
        setProducts(deals)
        setTotalCount(deals.length)
      } else {
        const response = await apiClient.searchProducts(filters)
        setProducts(response.products)
        setTotalCount(response.total_count)
      }
    } catch (error) {
      console.error("Search failed:", error)
      setProducts([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }

  // Initial search: default to 10 cheapest across all
  useEffect(() => {
    handleSearch({ limit: 10, sort_by: "price", sort_order: "asc", offset: 0 }, 'cheapest')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (newOffset: number) => {
    if (!lastFilters) return
    handleSearch({ ...lastFilters, offset: newOffset }, 'cheapest')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 cannabis-pattern">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        <SearchSection
          onSearch={handleSearch}
          isLoading={loading}
          onFiltersChange={(partial) => setLastFilters(partial || {})}
        />
        <StatsSection filters={lastFilters || undefined} />
        <ResultsSection
          products={products}
          loading={loading}
          searchPerformed={searchPerformed}
          totalCount={mode === 'cheapest' ? totalCount : undefined}
          limit={lastFilters?.limit || 10}
          offset={lastFilters?.offset || 0}
          onPageChange={mode === 'cheapest' ? handlePageChange : undefined}
        />
      </div>
    </div>
  )
}
