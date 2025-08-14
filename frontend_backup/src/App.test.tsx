import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useEffect } from 'react'

vi.mock('./components/ProductSelect', () => ({
  default: ({ onChange }: { onChange: (v: string) => void }) => {
    useEffect(() => {
      onChange('test-product')
    }, [onChange])
    return <div />
  },
}))
vi.mock('./components/CitySelect', () => ({ default: () => <div /> }))
vi.mock('./components/SortControls', () => ({ default: () => <div /> }))
vi.mock('./components/OffersTable', () => ({ default: () => <div /> }))
vi.mock('./components/Pagination', () => ({ default: () => <div /> }))
vi.mock('./components/PriceTrendChart', () => ({ default: () => <div /> }))
vi.mock('./components/MapView', () => ({ default: () => <div /> }))

describe('App', () => {
  beforeEach(() => {
    vi.resetModules()
    process.env.VITE_API_URL = ''
  })

  it('shows error banner on API failure', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    } as Response)

    const { default: App } = await import('./App')
    render(<App />)

    expect(
      await screen.findByText(/Błąd podczas ładowania danych/),
    ).toBeTruthy()
  })
})
