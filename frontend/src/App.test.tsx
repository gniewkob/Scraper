import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
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

import App from './App'

describe('App', () => {
  it('shows error banner on API failure', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    } as Response)

    render(<App />)

    expect(
      await screen.findByText(/Błąd podczas ładowania danych/),
    ).toBeTruthy()
  })
})
