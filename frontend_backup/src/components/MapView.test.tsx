import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import MapView from './MapView'
import * as leaflet from 'leaflet'

vi.mock('leaflet', () => {
  const map = vi.fn(() => ({
    setView: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  }))
  const tileLayer = vi.fn(() => ({ addTo: vi.fn() }))
  const marker = vi.fn(() => ({ addTo: vi.fn() }))
  const Icon = { Default: { mergeOptions: vi.fn() } }
  return { map, tileLayer, marker, Icon }
})
vi.mock('leaflet/dist/images/marker-icon.png', () => ({ default: 'icon' }), {
  virtual: true,
})
vi.mock(
  'leaflet/dist/images/marker-icon-2x.png',
  () => ({ default: 'icon2x' }),
  { virtual: true },
)
vi.mock(
  'leaflet/dist/images/marker-shadow.png',
  () => ({ default: 'shadow' }),
  { virtual: true },
)

describe('MapView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.VITE_API_URL = ''
  })

  it('does not initialize map when offers are empty', async () => {
    render(<MapView offers={[]} />)
    await new Promise((r) => setTimeout(r, 0))
    expect(leaflet.map).not.toHaveBeenCalled()
  })

  it('initializes map and markers for valid coordinates', async () => {
    const offers = [{ pharmacy_lat: 10, pharmacy_lon: 20 }]
    render(<MapView offers={offers} />)
    await waitFor(() => expect(leaflet.map).toHaveBeenCalled())
    expect(leaflet.marker).toHaveBeenCalledWith([10, 20])
  })

  it('skips map initialization for malformed coordinates', async () => {
    const offers = [{ pharmacy_lat: 10 }, { pharmacy_lon: 20 }]
    render(<MapView offers={offers as any} />)
    await new Promise((r) => setTimeout(r, 0))
    expect(leaflet.map).not.toHaveBeenCalled()
  })
})
