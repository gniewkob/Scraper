import { useEffect, useRef } from 'react'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
} from 'chart.js'
import 'chartjs-adapter-date-fns'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
)

interface TrendPoint {
  fetched_at: string
  price: string
}

interface Props {
  data: TrendPoint[]
  className?: string
}

export default function PriceTrendChart({ data, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (data.length === 0) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const sorted = [...data].sort(
      (a, b) =>
        new Date(a.fetched_at).getTime() - new Date(b.fetched_at).getTime(),
    )
    const prices = sorted.map((d) => parseFloat(d.price))
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sorted.map((d) => d.fetched_at),
        datasets: [
          {
            label: 'Cena',
            data: prices,
            borderColor: '#0d6efd',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { type: 'time' },
        },
      },
    })
    return () => chart.destroy()
  }, [data])
  if (data.length === 0) {
    return <div className={className}>Brak danych</div>
  }

  return (
    <canvas ref={canvasRef} className={className} style={{ height: 180 }} />
  )
}
