"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatSidebar from "@/components/chat/chat-sidebar-single"
import type { Listing } from "@/context/listings-context"

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const isImporter = listing.type === "importer"
  const itemName = listing.itemName
  const userName = listing.userName

  // Prevent navigation when clicking the chat button
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
    <>
      <Link href={`/listing/${listing.id}`}>
        <Card className="h-full transition-all hover:shadow-md flex flex-col">
          <CardHeader className={`pb-2 ${isImporter ? "bg-[#3B82F6]/10" : "bg-[#8B5CF6]/10"}`}>
            <div className="flex justify-between items-start">
              <Badge
                variant="outline"
                className={`${isImporter ? "bg-[#3B82F6] text-white" : "bg-[#8B5CF6] text-white"}`}
              >
                {isImporter ? "Importing" : "Exporting"}
              </Badge>
              <Badge variant="outline">{listing.category}</Badge>
            </div>
            <h3 className="font-bold text-lg mt-2">
              {isImporter ? "Looking for" : "Selling"}: {itemName}
            </h3>
          </CardHeader>

          <CardContent className="pt-4 flex-grow">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Posted by</p>
                <p>{userName}</p>
              </div>

              {isImporter ? (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Location</p>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {listing.currentLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Desired Source</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {listing.desiredSourceRegions?.map((region) => (
                        <Badge key={region} className="bg-[#8B5CF6] text-white text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Based in</p>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {listing.basedIn}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Export Destinations</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {listing.exportLimitations && listing.exportLimitations.length > 3 ? (
                        <>
                          {listing.exportLimitations.slice(0, 3).map((region) => (
                            <Badge key={region} className="bg-[#8B5CF6] text-white text-xs">
                              {region}
                            </Badge>
                          ))}
                          <Badge variant="outline" className="text-xs">
                            +{listing.exportLimitations.length - 3} more
                          </Badge>
                        </>
                      ) : (
                        listing.exportLimitations?.map((region) => (
                          <Badge key={region} className="bg-[#8B5CF6] text-white text-xs">
                            {region}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t text-sm text-gray-500 mt-auto py-3 flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Posted: {listing.date}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-[#4F6BF6] hover:text-[#4F6BF6]/90 hover:bg-[#4F6BF6]/10"
              onClick={handleChatClick}
              type="button"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat
            </Button>
          </CardFooter>
        </Card>
      </Link>

      {/* Individual Chat Sidebar for this specific listing */}
      <ChatSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        user={{
          id: listing.userId,
          name: userName,
          listing: itemName,
          listingId: listing.id,
        }}
      />
    </>
  )
}
