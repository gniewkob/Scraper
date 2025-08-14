// API client for medical marijuana price comparison dashboard
export interface Product {
  id: string
  name: string
  strain_type: "indica" | "sativa" | "hybrid"
  thc_content: number
  cbd_content: number
  price: number
  dispensary: string
  location: string
  distance?: number
  availability: boolean
  rating: number
  image_url?: string
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
}

export interface SearchResponse {
  products: Product[]
  total_count: number
  avg_price: number
  lowest_price: number
  highest_price: number
}

export interface StatsResponse {
  total_products: number
  total_dispensaries: number
  avg_price: number
  cities_covered: number
  last_updated: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://smart.bodora.pl/api"

class ApiClient {
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
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
    if (filters.strain_type) params.append("strain_type", filters.strain_type)
    if (filters.max_price) params.append("max_price", filters.max_price.toString())
    if (filters.min_thc) params.append("min_thc", filters.min_thc.toString())
    if (filters.max_thc) params.append("max_thc", filters.max_thc.toString())
    if (filters.min_cbd) params.append("min_cbd", filters.min_cbd.toString())
    if (filters.max_cbd) params.append("max_cbd", filters.max_cbd.toString())
    if (filters.radius) params.append("radius", filters.radius.toString())

    const queryString = params.toString()
    const endpoint = `/search${queryString ? `?${queryString}` : ""}`

    return this.makeRequest<SearchResponse>(endpoint)
  }

  async getStats(): Promise<StatsResponse> {
    return this.makeRequest<StatsResponse>("/stats")
  }

  async getCities(): Promise<string[]> {
    return this.makeRequest<string[]>("/cities")
  }

  async getProduct(id: string): Promise<Product> {
    return this.makeRequest<Product>(`/products/${id}`)
  }

  async getProductsByCity(city: string): Promise<Product[]> {
    return this.makeRequest<Product[]>(`/products/city/${encodeURIComponent(city)}`)
  }

  async getBestDeals(limit = 10): Promise<Product[]> {
    return this.makeRequest<Product[]>(`/deals/best?limit=${limit}`)
  }
}

export const apiClient = new ApiClient()
