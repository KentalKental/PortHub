import ListingsGrid from "@/components/listings-grid"
import SearchFilters from "@/components/search-filters"

export default function ExportersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Exporters</h1>
        <p className="text-gray-600">Browse sellers offering to export goods</p>
      </div>

      <SearchFilters />

      <div className="mt-8">
        <ListingsGrid type="exporters" />
      </div>
    </div>
  )
}
