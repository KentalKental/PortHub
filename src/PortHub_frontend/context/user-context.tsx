"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { generateMockUsers } from "@/lib/mock-user-data"

// Define types for users
export interface User {
  id: string
  name: string
  role: string
  location: string
  memberSince: string
  bio: string
  verified: boolean
}

// Define the context type
interface UserContextType {
  users: User[]
  currentUser: User | null
  loading: boolean
}

// Create context with default values
export const UserContext = createContext<UserContextType>({
  users: [],
  currentUser: null,
  loading: false,
})

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        // Simulate API call with mock data
        const data = generateMockUsers()

        // Set the first user as the current user for demo purposes
        const mockCurrentUser: User = {
          id: "current-user",
          name: "Your Name",
          role: "Trader",
          location: "New York, United States",
          memberSince: "January 2023",
          bio: "Experienced trader specializing in electronics and technology products. Looking to expand my network of suppliers and buyers globally.",
          verified: true,
        }

        setUsers([mockCurrentUser, ...data])
        setCurrentUser(mockCurrentUser)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
