// API client for Python/Uvicorn backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

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

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    try {
      const response = await fetch(url, {
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
      console.error("API request failed:", error)
      throw error
    }
  }

  async searchProducts(filters: SearchFilters): Promise<SearchResponse> {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return this.request<SearchResponse>(`/api/search?${params.toString()}`)
  }

  async getStats(): Promise<StatsResponse> {
    return this.request<StatsResponse>("/api/stats")
  }

  async getCities(): Promise<string[]> {
    return this.request<string[]>("/api/cities")
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/api/products/${id}`)
  }
}

export const apiClient = new ApiClient()
