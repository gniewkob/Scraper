import { MapPin, Star, Leaf, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/api";

interface ResultsSectionProps {
  products: Product[];
  loading: boolean;
  searchPerformed: boolean;
}

export function ResultsSection({
  products,
  loading,
  searchPerformed,
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
    );
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
    );
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
    );
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
            key={product.id}
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
                      🌿 {product.dispensary}
                      {index === 0 && <span className="text-sm">👑</span>}
                    </h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      {product.name}
                      <Badge variant="outline" className="text-xs">
                        {product.strain_type} 💎
                      </Badge>
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
                    {product.distance && ` • ${product.distance}km`}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-foreground">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <Badge
                    variant={product.availability ? "default" : "destructive"}
                    className={product.availability ? "glow-green" : ""}
                  >
                    {product.availability ? "✅ Dostępny" : "⚠️ Niedostępny"}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    THC: {product.thc_content}% | CBD: {product.cbd_content}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-foreground">
                      {product.price.toFixed(2)} zł
                    </span>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 glow-green">
                  <Zap className="w-4 h-4 mr-2" />
                  🚀 Teleportuj się
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
