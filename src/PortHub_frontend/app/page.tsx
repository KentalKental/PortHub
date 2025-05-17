import SearchFilters from "@/components/search-filters"
import MarketplacePage from "@/components/marketplace-page"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">PortHub Marketplace</h1>
        <p className="text-gray-600">Connect with importers and exporters worldwide</p>
      </div>

      <SearchFilters />
      <MarketplacePage />
    </div>
  )
}
