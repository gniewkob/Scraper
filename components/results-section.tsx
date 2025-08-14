import { MapPin, Star, Clock, Leaf, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mockResults = [
  {
    id: 1,
    pharmacy: "🌿 Green Galaxy Dispensary",
    product: "Olej CBD 10% 👽",
    price: 189.99,
    originalPrice: 249.99,
    location: "Warszawa, Mokotów",
    distance: "2.3 km",
    rating: 4.8,
    reviews: 127,
    availability: "Dostępny",
    lastUpdated: "5 min temu",
    discount: 24,
    quality: "Premium 💎",
  },
  {
    id: 2,
    pharmacy: "🛸 Cosmic Cannabis Co.",
    product: "Olej CBD 10% 🌱",
    price: 199.99,
    originalPrice: 259.99,
    location: "Warszawa, Śródmieście",
    distance: "4.1 km",
    rating: 4.6,
    reviews: 89,
    availability: "Ostatnie sztuki",
    lastUpdated: "12 min temu",
    discount: 23,
    quality: "Organic 🌿",
  },
  {
    id: 3,
    pharmacy: "🔥 Space Herb Station",
    product: "Olej CBD 10% ✨",
    price: 219.99,
    originalPrice: 279.99,
    location: "Warszawa, Wola",
    distance: "6.8 km",
    rating: 4.9,
    reviews: 203,
    availability: "Dostępny",
    lastUpdated: "8 min temu",
    discount: 21,
    quality: "Lab Tested 🧪",
  },
]

export function ResultsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
          🚀 Najlepsze oferty z galaktyki
          <Leaf className="w-6 h-6 text-primary rotate-slow" />
        </h3>
        <Badge variant="secondary" className="text-sm glow-purple">
          {mockResults.length} kosmicznych wyników 🛸
        </Badge>
      </div>

      <div className="grid gap-4">
        {mockResults.map((result, index) => (
          <Card
            key={result.id}
            className={`p-6 bg-card/40 backdrop-blur-sm neon-border hover:bg-card/60 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
              index === 0 ? "ring-2 ring-primary/30 glow-green" : ""
            }`}
          >
            <div className="absolute top-4 right-4 text-xl opacity-20 float-animation">
              {index === 0 ? "👑" : index === 1 ? "🛸" : "🌿"}
            </div>
            <div className="absolute inset-0 alien-glow opacity-5"></div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 relative z-10">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                      {result.pharmacy}
                      {index === 0 && <span className="text-sm">👑</span>}
                    </h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      {result.product}
                      <Badge variant="outline" className="text-xs">
                        {result.quality}
                      </Badge>
                    </p>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-primary text-primary-foreground glow-green">🏆 Najlepsza oferta</Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />📍 {result.location} • {result.distance}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-foreground">{result.rating}</span>
                    <span className="text-muted-foreground">({result.reviews} 👥)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <Badge
                    variant={result.availability === "Dostępny" ? "default" : "destructive"}
                    className={result.availability === "Dostępny" ? "glow-green" : ""}
                  >
                    {result.availability === "Dostępny" ? "✅ Dostępny" : "⚠️ Ostatnie sztuki"}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />⏰ {result.lastUpdated}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-foreground">{result.price.toFixed(2)} zł</span>
                    <Badge variant="secondary" className="text-green-400 glow-green">
                      🔥 -{result.discount}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-through">{result.originalPrice.toFixed(2)} zł</p>
                  <p className="text-xs text-green-400 font-medium">
                    💰 Oszczędzasz {(result.originalPrice - result.price).toFixed(2)} zł
                  </p>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 glow-green">
                  <Zap className="w-4 h-4 mr-2" />🚀 Teleportuj się
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center pt-8">
        <Button variant="outline" className="border-border hover:bg-secondary/50 bg-transparent glow-purple">
          🛸 Załaduj więcej kosmicznych ofert
        </Button>
      </div>
    </div>
  )
}
