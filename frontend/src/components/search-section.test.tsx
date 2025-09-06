import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { SearchSection } from "./search-section"

vi.mock("@/lib/api", () => ({
  apiClient: {
    getCities: vi.fn().mockResolvedValue([
      { name: "Warszawa", pharmacy_count: 10, avg_price: 0 },
    ]),
    getCapabilities: vi.fn().mockResolvedValue({ strain_filter: true }),
  },
  fetchProductOptions: vi
    .fn()
    .mockResolvedValue([{ id: "p1", name: "Alien OG", label: "Alien OG" }]),
}))

describe("SearchSection", () => {
  it("renders labels and icons", () => {
    const { container } = render(
      <SearchSection onSearch={vi.fn()} isLoading={false} />,
    )

    expect(screen.getByText(/Wybierz produkt/)).toBeTruthy()
    expect(screen.getByText(/Miasto/)).toBeTruthy()
    expect(container.querySelector(".lucide-leaf")).toBeTruthy()
    expect(container.querySelector(".lucide-map-pin")).toBeTruthy()
    expect(container.querySelector(".lucide-sparkles")).toBeTruthy()
  })
})
