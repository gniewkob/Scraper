// API client for Python/Uvicorn backend communication with mock data fallback
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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Alien OG 🛸",
    strain_type: "hybrid",
    thc_content: 24.5,
    cbd_content: 0.8,
    price: 45.99,
    dispensary: "Green Galaxy 🌌",
    location: "Warszawa",
    distance: 2.3,
    availability: true,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Space Cookies 👽",
    strain_type: "indica",
    thc_content: 22.1,
    cbd_content: 1.2,
    price: 52.5,
    dispensary: "Cosmic Cannabis 🚀",
    location: "Kraków",
    distance: 1.8,
    availability: true,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Galactic Haze ✨",
    strain_type: "sativa",
    thc_content: 26.8,
    cbd_content: 0.5,
    price: 48.75,
    dispensary: "Nebula Dispensary 🌠",
    location: "Gdańsk",
    distance: 3.1,
    availability: false,
    rating: 4.9,
  },
  {
    id: "4",
    name: "UFO Kush 🛸",
    strain_type: "indica",
    thc_content: 21.3,
    cbd_content: 2.1,
    price: 41.25,
    dispensary: "Starlight Medical 🌟",
    location: "Wrocław",
    distance: 4.2,
    availability: true,
    rating: 4.4,
  },
]

const mockStats: StatsResponse = {
  total_products: 1247,
  total_dispensaries: 89,
  avg_price: 47.32,
  cities_covered: 23,
  last_updated: new Date().toISOString(),
}

const mockCities = ["Warszawa", "Kraków", "Gdańsk", "Wrocław", "Poznań", "Łódź", "Katowice"]

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
      console.error("API request failed, using mock data:", error)
      throw new Error("FALLBACK_TO_MOCK")
    }
  }

  async searchProducts(filters: SearchFilters): Promise<SearchResponse> {
    try {
      const params = new URLSearchParams()

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      return await this.request<SearchResponse>(`/api/search?${params.toString()}`)
    } catch (error) {
      let filteredProducts = [...mockProducts]

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

      const prices = filteredProducts.map((p) => p.price)

      return {
        products: filteredProducts,
        total_count: filteredProducts.length,
        avg_price: prices.reduce((a, b) => a + b, 0) / prices.length || 0,
        lowest_price: Math.min(...prices) || 0,
        highest_price: Math.max(...prices) || 0,
      }
    }
  }

  async getStats(): Promise<StatsResponse> {
    try {
      return await this.request<StatsResponse>("/api/stats")
    } catch (error) {
      return mockStats
    }
  }

  async getCities(): Promise<string[]> {
    try {
      return await this.request<string[]>("/api/cities")
    } catch (error) {
      return mockCities
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      return await this.request<Product>(`/api/products/${id}`)
    } catch (error) {
      const product = mockProducts.find((p) => p.id === id)
      if (!product) {
        throw new Error("Product not found")
      }
      return product
    }
  }
}

export const apiClient = new ApiClient()
