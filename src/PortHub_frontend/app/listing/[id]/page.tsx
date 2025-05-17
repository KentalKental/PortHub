"use client"

import type React from "react"

import { useContext, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ListingsContext, type Listing } from "@/context/listings-context"
import { UserContext, type User } from "@/context/user-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, Package, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import ChatSidebar from "@/components/chat/chat-sidebar-single"
import SimilarListings from "@/components/similar-listings"

export default function ListingDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const { listings } = useContext(ListingsContext)
  const { users } = useContext(UserContext)
  const [listing, setListing] = useState<Listing | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    if (listings.length > 0 && id) {
      const foundListing = listings.find((item) => item.id === id)
      if (foundListing) {
        setListing(foundListing)
      }
    }
  }, [listings, id])

  useEffect(() => {
    if (listing && users.length > 0) {
      const foundUser = users.find((u) => u.id === listing.userId)
      if (foundUser) {
        setUser(foundUser)
      }
    }
  }, [listing, users])

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  const isImporter = listing.type === "importer"
  const headerBgColor = isImporter ? "bg-[#3B82F6]" : "bg-[#8B5CF6]"
  const userName = user?.name || listing.userName

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Prevent any default behavior
    if (e.nativeEvent) {
      e.nativeEvent.preventDefault()
    }
    setIsChatOpen(true)
    return false
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to marketplace
      </Button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Header */}
        <div className={`p-6 ${headerBgColor} text-white`}>
          <h1 className="text-2xl font-bold mb-3">
            {isImporter ? "Looking for" : "Selling"}: {listing.itemName}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
              {isImporter ? "Importing" : "Exporting"}
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">{listing.category}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Listing Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Listing Details</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 mb-1">Posted by</p>
                  <p className="font-medium">{userName}</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Date Posted</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <p>{listing.date}</p>
                  </div>
                </div>

                {isImporter ? (
                  <div>
                    <p className="text-gray-500 mb-1">Current Location</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <p>{listing.currentLocation}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500 mb-1">Based in</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <p>{listing.basedIn}</p>
                    </div>
                  </div>
                )}

                {isImporter ? (
                  <div>
                    <p className="text-gray-500 mb-1">Desired Source Regions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {listing.desiredSourceRegions?.map((region, index) => (
                        <Badge key={index} className="bg-[#8B5CF6] text-white">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500 mb-1">Export Destinations</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {listing.exportLimitations?.map((limitation, index) => (
                        <Badge key={index} className="bg-[#8B5CF6] text-white">
                          {limitation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-gray-500 mb-1">Price</p>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                    <p>Negotiable</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Minimum Order</p>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-gray-400" />
                    <p>Not specified</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Lead Time</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <p>To be discussed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 mb-1">Description</p>
                  <p>
                    {isImporter
                      ? `Looking for ${listing.itemName}. Please contact for more details about requirements and specifications.`
                      : `${listing.itemName} available for export. Please contact for more details about specifications and pricing.`}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Requirements</p>
                  <p>
                    {isImporter
                      ? "Looking for reliable suppliers with consistent quality and timely delivery."
                      : "Looking for serious buyers interested in establishing a business relationship."}
                  </p>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                  <p className="mb-4">
                    Interested in this listing? Contact the poster directly to discuss details and negotiate terms.
                  </p>
                  <Button className="w-full bg-[#4F6BF6] hover:bg-[#4F6BF6]/90" onClick={handleChatClick} type="button">
                    Contact {userName}
                  </Button>
                </div>

                <div className="pt-4">
                  <Link href={`/profile/${listing.userId}`}>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings Section */}
      {listing && <SimilarListings currentListing={listing} />}

      {/* Chat Sidebar */}
      <ChatSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        user={{
          id: listing.userId,
          name: userName,
          listing: listing.itemName,
          listingId: listing.id,
        }}
      />
    </div>
  )
}
