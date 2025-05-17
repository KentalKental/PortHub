"use client"

import { useContext, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ListingsContext } from "@/context/listings-context"
import { UserContext } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ListingCard from "@/components/listing-card"
import { ArrowLeft, Mail, MapPin, Calendar, Edit, MessageSquare } from "lucide-react"
import Link from "next/link"


import type { User } from "@/context/user-context"
import type { Listing } from "@/context/listings-context"


export default function ProfilePage() {
  const router = useRouter()
  const { id } = useParams()
  const { users } = useContext(UserContext)
  const { listings } = useContext(ListingsContext)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [userListings, setUserListings] = useState<{ imports: Listing[]; exports: Listing[] }>({
    imports: [],
    exports: [],
  })

  

  useEffect(() => {
    if (users.length > 0 && id) {
      const foundUser = users.find((u) => u.id === id)
      setUser(foundUser)
    }
  }, [users, id])

  useEffect(() => {
    if (user && listings.length > 0) {
      const imports = listings.filter((listing) => listing.userId === user.id && listing.type === "importer")
      const exports = listings.filter((listing) => listing.userId === user.id && listing.type === "exporter")
      setUserListings({ imports, exports })
    }
  }, [user, listings])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  const isCurrentUser = user.id === "current-user" // In a real app, check against authenticated user

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-1 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"></div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-4xl mb-4">
                {user.name.charAt(0)}
              </div>
              {!isCurrentUser && (
                <div className="flex gap-2 w-full">
                  <Button className="flex-1 bg-[#3B82F6] hover:bg-blue-600">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Link href={`/chat?user=${user.id}`} className="flex-1">
                    <Button className="w-full bg-[#8B5CF6] hover:bg-purple-600">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </Link>
                </div>
              )}
              {isCurrentUser && (
                <Button className="w-full" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
                  <p className="text-gray-600 mb-2">{user.role}</p>
                </div>
                {user.verified && <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="flex items-center font-medium">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {user.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="flex items-center font-medium">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {user.memberSince}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-600">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All Listings</TabsTrigger>
          <TabsTrigger value="imports">Imports ({userListings.imports.length})</TabsTrigger>
          <TabsTrigger value="exports">Exports ({userListings.exports.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {userListings.imports.length === 0 && userListings.exports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Listings Yet</h3>
              <p className="text-gray-500 mb-4">This user hasn't created any listings yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...userListings.imports, ...userListings.exports].map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="imports">
          {userListings.imports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Import Listings</h3>
              <p className="text-gray-500 mb-4">This user hasn't created any import listings yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.imports.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="exports">
          {userListings.exports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Export Listings</h3>
              <p className="text-gray-500 mb-4">This user hasn't created any export listings yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.exports.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
