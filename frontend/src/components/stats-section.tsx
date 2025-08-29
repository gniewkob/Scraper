"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Users, MapPin, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { apiClient, type StatsResponse, type SearchFilters } from "@/lib/api"

interface Props { filters?: Partial<SearchFilters> | null }

export function StatsSection({ filters }: Props) {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const statsData = await apiClient.getStats(filters || undefined)
        setStats(statsData)
      } catch (error) {
        console.error("Failed to load stats:", error)
        setError("Nie udało się załadować statystyk")
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [filters])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            className="p-6 bg-card/30 backdrop-blur-sm neon-border animate-pulse"
          >
            <div className="h-16 bg-muted/20 rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            className="p-6 bg-card/30 backdrop-blur-sm neon-border"
          >
            <div className="text-center text-muted-foreground">
              <div className="text-lg mb-2">⚠️</div>
              <div className="text-sm">{error || "Błąd ładowania"}</div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const statsDisplay = [
    {
      icon: TrendingUp,
      label: "Średnia cena",
      value: `${stats.avg_price.toFixed(0)} zł`,
      change: "+12%",
      positive: true,
      emoji: "💰",
    },
    {
      icon: Users,
      label: "Aktywne apteki",
      value: stats.total_pharmacies.toString(),
      change: "+5",
      positive: true,
      emoji: "🏪",
    },
    {
      icon: MapPin,
      label: "Miasta",
      value: stats.cities_covered.toString(),
      change: "+3",
      positive: true,
      emoji: "🌍",
    },
    {
      icon: Clock,
      label: "Ostatnia aktualizacja",
      value: stats.last_updated.split(" ")[0] || "Dzisiaj",
      change: stats.last_updated.split(" ").slice(1).join(" ") || "Teraz",
      positive: null,
      emoji: "⚡",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {statsDisplay.map((stat, index) => (
        <Card
          key={index}
          className="p-6 bg-card/30 backdrop-blur-sm neon-border hover:bg-card/50 transition-all duration-300 hover:scale-105 glow-green relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 text-lg opacity-30 float-animation">
            {stat.emoji}
          </div>
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
