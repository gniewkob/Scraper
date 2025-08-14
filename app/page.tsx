import { Header } from "@/components/header"
import { SearchSection } from "@/components/search-section"
import { ResultsSection } from "@/components/results-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        <SearchSection />
        <StatsSection />
        <ResultsSection />
      </div>
    </div>
  )
}
