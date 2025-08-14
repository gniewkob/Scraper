import { Leaf, TrendingDown, MapPin, Zap } from "lucide-react"

export function Header() {
  return (
    <header className="text-center mb-12 relative">
      <div className="absolute top-0 left-1/4 w-8 h-8 alien-glow rounded-full float-animation opacity-30"></div>
      <div
        className="absolute top-10 right-1/3 w-6 h-6 alien-glow rounded-full float-animation opacity-20"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-3 bg-primary/20 rounded-full glow-green relative">
          <Leaf className="w-8 h-8 text-primary rotate-slow" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-full blur-sm"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-black text-foreground">🌿 Porównaj Ceny 🛸</h1>
      </div>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">Medycznej Marihuany 👽</h2>

      <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto font-sans">
        🚀 Najlepsze oferty w Twojej okolicy. Znajdź najlepszą "zielonkę" w kilka sekund!
        <br />
        <span className="text-sm opacity-75">✨ Cosmic prices for earthly medicine ✨</span>
      </p>

      <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 glow-green p-2 rounded-lg">
          <TrendingDown className="w-4 h-4 text-primary" />
          <span>🔥 Najniższe ceny</span>
        </div>
        <div className="flex items-center gap-2 glow-purple p-2 rounded-lg">
          <MapPin className="w-4 h-4 text-accent" />
          <span>🏪 Lokalne dispensary</span>
        </div>
        <div className="flex items-center gap-2 glow-green p-2 rounded-lg">
          <Zap className="w-4 h-4 text-primary" />
          <span>⚡ Szybka dostawa</span>
        </div>
      </div>
    </header>
  )
}
