import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import PriceTrendChart from './PriceTrendChart'
import { Chart } from 'chart.js'

vi.mock('chart.js', () => {
  const Chart = vi.fn().mockImplementation(() => ({ destroy: vi.fn() }))
  Chart.register = vi.fn()
  return {
    Chart,
    LineController: class {},
    LineElement: class {},
    PointElement: class {},
    LinearScale: class {},
    TimeScale: class {},
    Tooltip: class {},
    Filler: class {},
  }
})
vi.mock('chartjs-adapter-date-fns', () => ({}), { virtual: true })

describe('PriceTrendChart', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(HTMLCanvasElement.prototype as any).getContext = vi.fn(() => ({}))
    process.env.VITE_API_URL = ''
  })

  it('shows message when no data', () => {
    render(<PriceTrendChart data={[]} />)
    expect(screen.getByText('Brak danych')).toBeTruthy()
    expect(Chart).not.toHaveBeenCalled()
  })

  it('renders chart with sorted data', async () => {
    const data = [
      { fetched_at: '2024-01-02', price: '2.50' },
      { fetched_at: '2024-01-01', price: '3.00' },
    ]
    render(<PriceTrendChart data={data} />)
    await waitFor(() => expect(Chart).toHaveBeenCalled())
    const config = (Chart as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][1]
    expect(config.data.labels).toEqual(['2024-01-01', '2024-01-02'])
    expect(config.data.datasets[0].data).toEqual([3, 2.5])
  })
})
