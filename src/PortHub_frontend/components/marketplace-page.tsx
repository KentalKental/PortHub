"use client"

import { useEffect, useRef, useContext } from "react"
import { ListingsContext } from "@/context/listings-context"
import ListingCard from "@/components/listing-card"
import { Loader2 } from "lucide-react"

export default function MarketplacePage() {
  const { filteredListings, listings, loading, loadMore } = useContext(ListingsContext)
  const loaderRef = useRef<HTMLDivElement>(null)

  const displayedListings = filteredListings.length > 0 ? filteredListings : listings

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [loading, loadMore])

  if (displayedListings.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No listings found.</p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center items-center py-8 mt-4">
        {loading && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#3B82F6]" />
            <span className="text-gray-600">Loading more listings...</span>
          </div>
        )}
      </div>
    </div>
  )
}
