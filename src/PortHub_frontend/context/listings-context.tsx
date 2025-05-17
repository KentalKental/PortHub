"use client"

import { createContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { generateMockListings } from "@/lib/mock-data"

// Define types for listings
export interface Listing {
  id: string
  type: "importer" | "exporter"
  userName: string
  userId: string
  itemName: string
  category: string
  date: string
  featured: boolean
  currentLocation?: string
  desiredSourceRegions?: string[]
  basedIn?: string
  exportLimitations?: string[]
}

// Define the context type
interface ListingsContextType {
  listings: Listing[]
  filteredListings: Listing[]
  loading: boolean
  hasMore: boolean
  categories: string[]
  loadMore: () => void
  applyFilters: (filters: {
    searchTerm?: string
    category?: string
    sortBy?: string
    type?: string
  }) => void
}

// Create context with default values
export const ListingsContext = createContext<ListingsContextType>({
  listings: [],
  filteredListings: [],
  loading: false,
  hasMore: false,
  categories: [],
  loadMore: () => {},
  applyFilters: () => {},
})

interface ListingsProviderProps {
  children: ReactNode
}

export function ListingsProvider({ children }: ListingsProviderProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [categories, setCategories] = useState<string[]>([])

  // Initial data load
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      try {
        // Simulate API call with mock data
        const data = generateMockListings(12)
        setListings(data)

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((item) => item.category))]
        setCategories(uniqueCategories)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching listings:", error)
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // Load more data for infinite scroll
  const loadMore = useCallback(() => {
    if (!hasMore || loading) return

    setLoading(true)

    // Simulate API call with delay
    setTimeout(() => {
      const newData = generateMockListings(8)

      if (newData.length === 0) {
        setHasMore(false)
      } else {
        setListings((prev) => [...prev, ...newData])
        setPage((prev) => prev + 1)
      }

      setLoading(false)
    }, 800)
  }, [hasMore, loading])

  // Apply filters
  const applyFilters = useCallback(
    ({
      searchTerm,
      category,
      sortBy,
      type,
    }: {
      searchTerm?: string
      category?: string
      sortBy?: string
      type?: string
    }) => {
      let filtered = [...listings]

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(
          (item) =>
            item.itemName.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            (item.type === "importer" &&
              item.desiredSourceRegions?.some((region) => region.toLowerCase().includes(term))) ||
            (item.type === "exporter" &&
              item.exportLimitations?.some((limitation) => limitation.toLowerCase().includes(term))),
        )
      }

      // Apply category filter
      if (category && category !== "all") {
        filtered = filtered.filter((item) => item.category === category)
      }

      // Apply type filter
      if (type) {
        filtered = filtered.filter((item) => item.type === type)
      }

      // Apply sorting
      if (sortBy === "oldest") {
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      } else {
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }

      setFilteredListings(filtered)
    },
    [listings],
  )

  return (
    <ListingsContext.Provider
      value={{
        listings,
        filteredListings,
        loading,
        hasMore,
        categories,
        loadMore,
        applyFilters,
      }}
    >
      {children}
    </ListingsContext.Provider>
  )
}
