"use client"

import { useContext, useEffect, useState } from "react"
import { ListingsContext, type Listing } from "@/context/listings-context"
import ListingCard from "@/components/listing-card"

interface SimilarListingsProps {
  currentListing: Listing
}

export default function SimilarListings({ currentListing }: SimilarListingsProps) {
  const { listings } = useContext(ListingsContext)
  const [similarListings, setSimilarListings] = useState<Listing[]>([])

  useEffect(() => {
    if (currentListing && listings.length > 0) {
      // Find similar listings based on category and type
      const similar = listings.filter(
        (listing) =>
          listing.id !== currentListing.id && // Not the current listing
          (listing.category === currentListing.category || // Same category
            listing.type === currentListing.type), // Or same type (import/export)
      )

      // Sort by relevance (same category AND type first, then just same category, then just same type)
      const sortedSimilar = [...similar].sort((a, b) => {
        const aScore = (a.category === currentListing.category ? 2 : 0) + (a.type === currentListing.type ? 1 : 0)
        const bScore = (b.category === currentListing.category ? 2 : 0) + (b.type === currentListing.type ? 1 : 0)
        return bScore - aScore
      })

      // Limit to 3 listings
      setSimilarListings(sortedSimilar.slice(0, 3))
    }
  }, [currentListing, listings])

  if (similarListings.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">You May Also Be Interested In</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}
