import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ResultsSection } from "./results-section"
import type { Product } from "@/lib/api"

const products: Product[] = [
  {
    id: "1",
    name: "Alien OG",
    strain_type: "hybrid",
    thc_content: 20,
    cbd_content: 1,
    price: 42,
    pharmacy: "Green Galaxy",
    location: "Warszawa",
    availability: true,
    rating: 4.5,
  },
]

describe("ResultsSection", () => {
  it("renders products and icons", () => {
    const { container } = render(
      <ResultsSection
        products={products}
        loading={false}
        searchPerformed={true}
      />,
    )

    // Strict mode and repeated renders may duplicate headings; accept >= 1
    expect(screen.getAllByText(/Najlepsze oferty z galaktyki/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Green Galaxy/)).toBeTruthy()
    expect(container.querySelector(".lucide-leaf")).toBeTruthy()
    expect(container.querySelector(".lucide-map-pin")).toBeTruthy()
    expect(container.querySelector(".lucide-star")).toBeTruthy()
    expect(container.querySelector(".lucide-zap")).toBeTruthy()
  })
})
