import { Leaf, TrendingDown, MapPin } from "lucide-react"

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-3 bg-primary/20 rounded-full glow-animation">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-black text-foreground">Porównaj Ceny</h1>
      </div>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">Medycznej Marihuany</h2>

      <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto font-sans">
        Najlepsze oferty w Twojej okolicy. Znajdź najlepszą ofertę w kilka sekund!
      </p>

      <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-primary" />
          <span>Najniższe ceny</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Lokalne apteki</span>
        </div>
      </div>
    </header>
  )
}
