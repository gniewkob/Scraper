import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { ThemeProvider } from "./theme-provider"

describe("ThemeProvider", () => {
  it("renders children", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
    render(
      <ThemeProvider attribute="class">
        <div>Child content</div>
      </ThemeProvider>,
    )
    expect(screen.getByText("Child content")).toBeTruthy()
  })
})
