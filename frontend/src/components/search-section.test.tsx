import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SearchSection } from './search-section'

vi.mock('@/lib/api', () => ({
  apiClient: {
    getCities: vi.fn().mockResolvedValue(['Warszawa']),
  },
}))

describe('SearchSection', () => {
  it('renders labels and icons', () => {
    const { container } = render(
      <SearchSection onSearch={vi.fn()} isLoading={false} />,
    )

    expect(screen.getByText(/Wybierz produkt/)).toBeTruthy()
    expect(screen.getByText(/Miasto/)).toBeTruthy()
    expect(container.querySelector('.lucide-leaf')).toBeTruthy()
    expect(container.querySelector('.lucide-map-pin')).toBeTruthy()
    expect(container.querySelector('.lucide-sparkles')).toBeTruthy()
  })
})
