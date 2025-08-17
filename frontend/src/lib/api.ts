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

const MOCK_CITIES = [
  "Warszawa",
  "Kraków",
  "Gdańsk",
  "Wrocław",
  "Poznań",
  "Łódź",
  "Katowice",
  "Szczecin",
  "Lublin",
  "Bydgoszcz",
]

const MOCK_STATS: StatsResponse = {
  total_products: 1337,
  total_dispensaries: 42,
  avg_price: 35.5,
  cities_covered: 10,
  last_updated: new Date().toISOString(),
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "🛸 Alien OG",
    strain_type: "hybrid",
    thc_content: 24.5,
    cbd_content: 0.8,
    price: 45.0,
    dispensary: "🌌 Green Galaxy",
    location: "Warszawa",
    availability: true,
    rating: 4.8,
  },
  {
    id: "2",
    name: "🍪 Space Cookies",
    strain_type: "indica",
    thc_content: 22.1,
    cbd_content: 1.2,
    price: 38.5,
    dispensary: "👽 Cosmic Cannabis",
    location: "Kraków",
    availability: true,
    rating: 4.6,
  },
  {
    id: "3",
    name: "🚀 UFO Kush",
    strain_type: "sativa",
    thc_content: 26.8,
    cbd_content: 0.5,
    price: 52.0,
    dispensary: "🌿 Stellar Strains",
    location: "Gdańsk",
    availability: false,
    rating: 4.9,
  },
]

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
      throw error
    }
  }

  async searchProducts(filters: SearchFilters): Promise<SearchResponse> {
    try {
      const params = new URLSearchParams()

      if (filters.city) params.append("city", filters.city)
      if (filters.strain_type) params.append("strain_type", filters.strain_type)
      if (filters.max_price)
        params.append("max_price", filters.max_price.toString())
      if (filters.min_thc) params.append("min_thc", filters.min_thc.toString())
      if (filters.max_thc) params.append("max_thc", filters.max_thc.toString())
      if (filters.min_cbd) params.append("min_cbd", filters.min_cbd.toString())
      if (filters.max_cbd) params.append("max_cbd", filters.max_cbd.toString())
      if (filters.radius) params.append("radius", filters.radius.toString())

      const queryString = params.toString()
      const endpoint = `/search${queryString ? `?${queryString}` : ""}`

      return await this.makeRequest<SearchResponse>(endpoint)
    } catch (error) {
      console.error("Search API error:", error)
      // Instead of using mock data, re-throw the error so the UI can handle it appropriately
      throw error
    }
  }

  async getStats(): Promise<StatsResponse> {
    try {
      return await this.makeRequest<StatsResponse>("/stats")
    } catch (error) {
      console.error("Stats API error:", error)
      // Instead of using mock data, re-throw the error so the UI can handle it appropriately
      throw error
    }
  }

  async getCities(): Promise<string[]> {
    try {
      return await this.makeRequest<string[]>("/cities")
    } catch (error) {
      console.error("Cities API error:", error)
      // Instead of using mock data, re-throw the error so the UI can handle it appropriately
      throw error
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      return await this.makeRequest<Product>(`/products/${id}`)
    } catch (error) {
      console.error("Product API error:", error)
      // Instead of using mock data, re-throw the error so the UI can handle it appropriately
      throw error
    }
  }

  async getProductsByCity(city: string): Promise<Product[]> {
    try {
      return await this.makeRequest<Product[]>(
        `/products/city/${encodeURIComponent(city)}`,
      )
    } catch (error) {
      console.error("Products by city API error:", error)
      // Instead of using mock data, re-throw the error so the UI can handle it appropriately
      throw error
    }
  }

  async getBestDeals(limit = 10): Promise<Product[]> {
    try {
      return await this.makeRequest<Product[]>(`/deals/best?limit=${limit}`)
    } catch (error) {
      console.error("Best deals API error:", error)
      // Instead of using mock data, re-throw the error so the UI can handle it appropriately
      throw error
    }
  }
}

export const apiClient = new ApiClient()
