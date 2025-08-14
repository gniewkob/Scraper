import { TrendingUp, Users, MapPin, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    icon: TrendingUp,
    label: "Średnia oszczędność",
    value: "127 zł",
    change: "+12%",
    positive: true,
    emoji: "💰",
  },
  {
    icon: Users,
    label: "Aktywne dispensary",
    value: "248",
    change: "+5",
    positive: true,
    emoji: "🏪",
  },
  {
    icon: MapPin,
    label: "Miasta",
    value: "67",
    change: "+3",
    positive: true,
    emoji: "🌍",
  },
  {
    icon: Clock,
    label: "Ostatnia aktualizacja",
    value: "2 min",
    change: "temu",
    positive: null,
    emoji: "⚡",
  },
]

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-6 bg-card/30 backdrop-blur-sm neon-border hover:bg-card/50 transition-all duration-300 hover:scale-105 glow-green relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 text-lg opacity-30 float-animation">{stat.emoji}</div>
          <div className="absolute inset-0 alien-glow opacity-10"></div>

          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="p-2 bg-primary/20 rounded-lg glow-green">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
          {stat.change && (
            <div
              className={`text-xs flex items-center gap-1 relative z-10 ${
                stat.positive === true
                  ? "text-green-400"
                  : stat.positive === false
                    ? "text-red-400"
                    : "text-muted-foreground"
              }`}
            >
              {stat.positive === true && "🚀"}
              {stat.positive === false && "📉"}
              {stat.change}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
