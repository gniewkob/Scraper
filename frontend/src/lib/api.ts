// API client for medical cannabis price comparison dashboard
export interface Product {
  id: string
  name: string
  strain_type?: "indica" | "sativa" | "hybrid" | "unknown"
  thc_content?: number
  cbd_content?: number
  price: number
  pharmacy: string // Changed from dispensary to match backend
  location: string
  distance?: number
  availability: boolean
  rating?: number
  unit: string
  expiration?: string
  fetched_at: string
  map_url?: string
  delivery_options?: string
}

export interface SearchFilters {
  city?: string
  strain_type?: string
  max_price?: number
  min_thc?: number
  max_thc?: number
  min_cbd?: number
  max_cbd?: number
  radius?: number
  lat?: number
  lon?: number
  sort_by?: "price" | "rating" | "distance" | "name"
  sort_order?: "asc" | "desc"
}

export interface SearchResponse {
  products: Product[]
  total_count: number
  avg_price: number
  lowest_price: number
  highest_price: number
  limit: number
  offset: number
  sort_by: string
  sort_order: string
}

export interface StatsResponse {
  total_products: number
  total_pharmacies: number
  avg_price: number
  cities_covered: number
  last_updated: string
}

export interface CityInfo {
  name: string
  pharmacy_count: number
  avg_price: number
}

// Build API base url from public env (Next.js exposes NEXT_PUBLIC_* to browser).
// Prefer explicit NEXT_PUBLIC_API_URL. If missing, construct using NEXT_PUBLIC_BACKEND_PORT
// (default 38273) and NEXT_PUBLIC_HOST (default localhost). This avoids accidentally
// pointing to a remote production API on developer machines or CI.
declare const process: any
const NEXT_PUBLIC_API_URL =
  typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_API_URL : undefined
const NEXT_PUBLIC_HOST =
  typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_HOST : undefined
const NEXT_PUBLIC_BACKEND_PORT =
  typeof process !== "undefined"
    ? process.env?.NEXT_PUBLIC_BACKEND_PORT
    : undefined

function defaultApiUrl(): string {
  const host =
    NEXT_PUBLIC_HOST ||
    (typeof window !== "undefined" ? window.location.hostname : "localhost")
  const port = NEXT_PUBLIC_BACKEND_PORT || "38273"
  return `http://${host}:${port}/api`
}

const API_BASE_URL = NEXT_PUBLIC_API_URL || defaultApiUrl()

class ApiClient {
  private async makeRequest<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  async searchProducts(filters: SearchFilters): Promise<SearchResponse> {
    const params = new URLSearchParams()

    if (filters.city) params.append("city", filters.city)
    if (filters.strain_type && filters.strain_type !== "all")
      params.append("strain_type", filters.strain_type)
    if (filters.max_price)
      params.append("max_price", filters.max_price.toString())
    if (filters.min_thc) params.append("min_thc", filters.min_thc.toString())
    if (filters.max_thc) params.append("max_thc", filters.max_thc.toString())
    if (filters.min_cbd) params.append("min_cbd", filters.min_cbd.toString())
    if (filters.max_cbd) params.append("max_cbd", filters.max_cbd.toString())
    if (filters.radius) params.append("radius", filters.radius.toString())
    if (filters.lat) params.append("lat", filters.lat.toString())
    if (filters.lon) params.append("lon", filters.lon.toString())
    if (filters.sort_by) params.append("sort_by", filters.sort_by)
    if (filters.sort_order) params.append("sort_order", filters.sort_order)

    const queryString = params.toString()
    const endpoint = `/search${queryString ? `?${queryString}` : ""}`

    return await this.makeRequest<SearchResponse>(endpoint)
  }

  async getStats(): Promise<StatsResponse> {
    return await this.makeRequest<StatsResponse>("/stats")
  }

  async getCities(): Promise<CityInfo[]> {
    return await this.makeRequest<CityInfo[]>("/cities")
  }

  async getProduct(id: string): Promise<Product> {
    return await this.makeRequest<Product>(`/products/${id}`)
  }

  async getProductsByCity(city: string): Promise<Product[]> {
    return await this.makeRequest<Product[]>(
      `/products/city/${encodeURIComponent(city)}`,
    )
  }

  async getBestDeals(limit = 10): Promise<Product[]> {
    return await this.makeRequest<Product[]>(`/deals/best?limit=${limit}`)
  }
}

export const apiClient = new ApiClient()
