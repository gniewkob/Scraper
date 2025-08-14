"use client"

import { useState } from "react"
import { MapPin, Leaf, Sparkles } from "lucide-react"
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
    <Card className="p-8 mb-12 bg-card/50 backdrop-blur-sm neon-border shadow-2xl cannabis-pattern relative overflow-hidden">
      <div className="absolute top-4 right-4 text-2xl opacity-20 float-animation">🌿</div>
      <div className="absolute bottom-4 left-4 text-xl opacity-15 float-animation" style={{ animationDelay: "1s" }}>
        🛸
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary glow-green" />🌱 Wybierz produkt
          </label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger className="bg-input border-border hover:border-primary/50 transition-colors neon-border">
              <SelectValue placeholder="🔍 Wszystkie produkty..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cbd-oil">🌿 Olej CBD</SelectItem>
              <SelectItem value="thc-flower">🔥 Susz THC</SelectItem>
              <SelectItem value="cbd-capsules">💊 Kapsułki CBD</SelectItem>
              <SelectItem value="tinctures">🧪 Nalewki</SelectItem>
              <SelectItem value="edibles">🍪 Produkty jadalne</SelectItem>
              <SelectItem value="concentrates">💎 Koncentraty</SelectItem>
              <SelectItem value="vapes">💨 Waporyzatory</SelectItem>
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
              <SelectValue placeholder="🌍 Wszystkie miasta..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warszawa">🏛️ Warszawa</SelectItem>
              <SelectItem value="krakow">🏰 Kraków</SelectItem>
              <SelectItem value="gdansk">⚓ Gdańsk</SelectItem>
              <SelectItem value="wroclaw">🌉 Wrocław</SelectItem>
              <SelectItem value="poznan">🎭 Poznań</SelectItem>
              <SelectItem value="katowice">⛏️ Katowice</SelectItem>
              <SelectItem value="lodz">🧵 Łódź</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground opacity-0">Search</label>
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
                <Sparkles className="w-4 h-4" />🚀 Znajdź najlepsze oferty
              </div>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
