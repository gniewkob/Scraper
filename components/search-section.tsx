"use client"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

export function SearchSection() {
  const [product, setProduct] = useState("")
  const [city, setCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <Card className="p-8 mb-12 bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            Wybierz produkt
          </label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger className="bg-input border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Wszystkie produkty..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cbd-oil">Olej CBD</SelectItem>
              <SelectItem value="thc-flower">Susz THC</SelectItem>
              <SelectItem value="cbd-capsules">Kapsułki CBD</SelectItem>
              <SelectItem value="tinctures">Nalewki</SelectItem>
              <SelectItem value="edibles">Produkty jadalne</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Miasto
          </label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="bg-input border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Wszystkie miasta..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warszawa">Warszawa</SelectItem>
              <SelectItem value="krakow">Kraków</SelectItem>
              <SelectItem value="gdansk">Gdańsk</SelectItem>
              <SelectItem value="wroclaw">Wrocław</SelectItem>
              <SelectItem value="poznan">Poznań</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground opacity-0">Search</label>
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Wyszukiwanie...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Wyszukaj oferty
              </div>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
