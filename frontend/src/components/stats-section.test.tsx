import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { StatsSection } from "./stats-section"

vi.mock("@/lib/api", () => ({
  apiClient: {
    getStats: vi.fn().mockResolvedValue({
      total_products: 10,
      total_dispensaries: 5,
      avg_price: 100,
      cities_covered: 3,
      last_updated: "2 min temu",
    }),
  },
}))

describe("StatsSection", () => {
  it("renders stats and icons", async () => {
    const { container } = render(<StatsSection />)
    expect(await screen.findByText(/Średnia cena/)).toBeTruthy()
    expect(container.querySelector(".lucide-trending-up")).toBeTruthy()
    expect(container.querySelector(".lucide-users")).toBeTruthy()
    expect(container.querySelector(".lucide-map-pin")).toBeTruthy()
    expect(container.querySelector(".lucide-clock")).toBeTruthy()
  })
})
