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
      throw error
    }
  }

  async searchProducts(filters: SearchFilters): Promise<SearchResponse> {
    try {
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

      return await this.makeRequest<SearchResponse>(endpoint)
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filteredProducts = [...MOCK_PRODUCTS]

      if (filters.city) {
        filteredProducts = filteredProducts.filter((p) =>
          p.location.toLowerCase().includes(filters.city!.toLowerCase()),
        )
      }

      if (filters.strain_type) {
        filteredProducts = filteredProducts.filter((p) => p.strain_type === filters.strain_type)
      }

      if (filters.max_price) {
        filteredProducts = filteredProducts.filter((p) => p.price <= filters.max_price!)
      }

      return {
        products: filteredProducts,
        total_count: filteredProducts.length,
        avg_price: filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length,
        lowest_price: Math.min(...filteredProducts.map((p) => p.price)),
        highest_price: Math.max(...filteredProducts.map((p) => p.price)),
      }
    }
  }

  async getStats(): Promise<StatsResponse> {
    try {
      return await this.makeRequest<StatsResponse>("/stats")
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return MOCK_STATS
    }
  }

  async getCities(): Promise<string[]> {
    try {
      return await this.makeRequest<string[]>("/cities")
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return MOCK_CITIES
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      return await this.makeRequest<Product>(`/products/${id}`)
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0]
    }
  }

  async getProductsByCity(city: string): Promise<Product[]> {
    try {
      return await this.makeRequest<Product[]>(`/products/city/${encodeURIComponent(city)}`)
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return MOCK_PRODUCTS.filter((p) => p.location.toLowerCase().includes(city.toLowerCase()))

    }
  }

  async getBestDeals(limit = 10): Promise<Product[]> {
    try {
      return await this.makeRequest<Product[]>(`/deals/best?limit=${limit}`)
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 350))
      return MOCK_PRODUCTS.slice(0, limit)
    }
  }
}

export const apiClient = new ApiClient()
