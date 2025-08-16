import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Header } from "./header"

describe("Header", () => {
  it("renders header text and icons", () => {
    const { container } = render(<Header />)
    expect(screen.getByText(/Porównaj Ceny/)).toBeTruthy()
    expect(screen.getByText(/Medycznej Marihuany/)).toBeTruthy()
    expect(container.querySelector(".lucide-leaf")).toBeTruthy()
    expect(container.querySelector(".lucide-trending-down")).toBeTruthy()
    expect(container.querySelector(".lucide-map-pin")).toBeTruthy()
    expect(container.querySelector(".lucide-zap")).toBeTruthy()
  })
})
