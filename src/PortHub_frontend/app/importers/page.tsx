import ListingsGrid from "@/components/listings-grid"
import SearchFilters from "@/components/search-filters"

export default function ImportersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Importers</h1>
        <p className="text-gray-600">Browse buyers looking to import goods</p>
      </div>

      <SearchFilters />

      <div className="mt-8">
        <ListingsGrid type="importers" />
      </div>
    </div>
  )
}
