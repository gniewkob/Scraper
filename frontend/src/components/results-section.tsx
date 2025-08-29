import { MapPin, Star, Leaf, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/api"

interface ResultsSectionProps {
  products: Product[]
  loading: boolean
  searchPerformed: boolean
  totalCount?: number
  limit?: number
  offset?: number
  onPageChange?: (offset: number) => void
}

export function ResultsSection({
  products,
  loading,
  searchPerformed,
  totalCount,
  limit = 10,
  offset = 0,
  onPageChange,
}: ResultsSectionProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
            🚀 Skanowanie galaktyki...
            <Leaf className="w-6 h-6 text-primary rotate-slow" />
          </h3>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="p-6 bg-card/40 backdrop-blur-sm neon-border animate-pulse"
            >
              <div className="h-24 bg-muted/20 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!searchPerformed) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 float-animation">🛸</div>
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
          Gotowy na kosmiczną podróż?
        </h3>
        <p className="text-muted-foreground">
          Użyj wyszukiwarki powyżej, aby znaleźć najlepsze oferty w galaktyce 🌌
        </p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">👽</div>
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
          Brak wyników w tej galaktyce
        </h3>
        <p className="text-muted-foreground">
          Spróbuj zmienić filtry wyszukiwania lub sprawdź inne planety 🪐
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
          🚀 Najlepsze oferty z galaktyki
          <Leaf className="w-6 h-6 text-primary rotate-slow" />
        </h3>
        <Badge variant="secondary" className="text-sm glow-purple">
          {products.length} kosmicznych wyników 🛸
        </Badge>
      </div>

      <div className="grid gap-4">
        {products.map((product, index) => (
          <Card
            // Prefer unique offer_id from backend (pp.id). Fallback to composite.
            key={
              product.offer_id ||
              `${product.id}-${product.pharmacy}-${product.location}-${product.fetched_at || index}`
            }
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
                      {product.name}
                      {product.strain_type &&
                        product.strain_type !== "unknown" && (
                          <Badge variant="outline" className="text-xs">
                            {product.strain_type}
                          </Badge>
                        )}
                      {index === 0 && <span className="text-sm">👑</span>}
                    </h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      🌿 {product.pharmacy}
                    </p>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-primary text-primary-foreground glow-green">
                      🏆 Najlepsza oferta
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    📍 {product.location}
                    {product.distance && ` • ${product.distance.toFixed(1)}km`}
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-foreground">{product.rating}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <Badge
                    variant={product.availability ? "default" : "destructive"}
                    className={product.availability ? "glow-green" : ""}
                  >
                    {product.availability ? "✅ Dostępny" : "⚠️ Niedostępny"}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {product.thc_content && `THC: ${product.thc_content}%`}
                    {product.thc_content && product.cbd_content && " | "}
                    {product.cbd_content && `CBD: ${product.cbd_content}%`}
                    {product.unit && ` • ${product.unit}`}
                  </div>
                </div>

                {product.expiration && (
                  <div className="text-xs text-muted-foreground mt-2">
                    📅 Ważność: {product.expiration}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-foreground">
                      {product.price.toFixed(2)} zł
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Ostatnia aktualizacja: {product.fetched_at}
                  </div>
                </div>

                {(() => {
                  const mapUrl =
                    product.map_url ||
                    (product.location
                      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product.location)}`
                      : undefined)
                  return mapUrl ? (
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 glow-green"
                    >
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        🚀 Teleportuj się
                      </a>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="bg-primary/50 text-primary-foreground"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Brak lokalizacji
                    </Button>
                  )
                })()}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {typeof totalCount === "number" && onPageChange && (
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            className="px-3 py-1 rounded bg-input disabled:opacity-50"
            onClick={() => onPageChange(Math.max(0, offset - limit))}
            disabled={offset <= 0}
          >
            ◀️ Poprzednie
          </button>
          <div className="text-sm text-muted-foreground">
            Strona {Math.floor(offset / limit) + 1} z{" "}
            {Math.max(1, Math.ceil(totalCount / limit))}
          </div>
          <button
            type="button"
            className="px-3 py-1 rounded bg-input disabled:opacity-50"
            onClick={() => onPageChange(offset + limit)}
            disabled={offset + limit >= totalCount}
          >
            Następne ▶️
          </button>
        </div>
      )}
    </div>
  )
}
