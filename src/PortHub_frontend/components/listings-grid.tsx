"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { ListingsContext, type Listing } from "@/context/listings-context"
import ListingCard from "@/components/listing-card"
import { Loader2 } from "lucide-react"

interface ListingsGridProps {
  type?: "all" | "importers" | "exporters"
}

export default function ListingsGrid({ type = "all" }: ListingsGridProps) {
  const { listings, filteredListings, loading, loadMore } = useContext(ListingsContext)
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([])
  const observerRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let filtered = filteredListings.length > 0 ? filteredListings : listings

    if (type === "importers") {
      filtered = filtered.filter((listing) => listing.type === "importer")
    } else if (type === "exporters") {
      filtered = filtered.filter((listing) => listing.type === "exporter")
    }

    setDisplayedListings(filtered)
  }, [listings, filteredListings, type])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current)
      }
    }
  }, [loading, loadMore])

  if (displayedListings.length === 0 && !loading) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No listings found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div ref={loadingRef} className="flex justify-center mt-8 py-4">
        {loading && (
          <div className="flex items-center">
            <Loader2 className="h-5 w-5 animate-spin mr-2 text-[#3B82F6]" />
            <span className="text-gray-600">Loading more listings...</span>
          </div>
        )}
      </div>
    </div>
  )
}
