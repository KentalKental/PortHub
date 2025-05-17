"use client"

import { createContext, useState, useCallback, type ReactNode } from "react"
import { generateMockChats } from "@/lib/mock-chat-data"

// Define types for chat
export interface ChatUser {
  id: string
  name: string
  status: string
}

export interface ChatMessage {
  sender: string
  text: string
  time: string
}

export interface Chat {
  id: string
  user: ChatUser
  messages: ChatMessage[]
  lastMessage: string
  lastMessageTime: string
}

// Define the context type
interface ChatContextType {
  chats: Chat[]
  activeChat: Chat | null
  loading: boolean
  setActiveChat: (chat: Chat | null) => void
  initializeChats: () => void
  sendMessage: (text: string) => void
}

// Create context with default values
export const ChatContext = createContext<ChatContextType>({
  chats: [],
  activeChat: null,
  loading: false,
  setActiveChat: () => {},
  initializeChats: () => {},
  sendMessage: () => {},
})

interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize chats
  const initializeChats = useCallback(() => {
    setLoading(true)
    try {
      // Simulate API call with mock data
      const data = generateMockChats()
      setChats(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching chats:", error)
      setLoading(false)
    }
  }, [])

  // Send a message
  const sendMessage = useCallback(
    (text: string) => {
      if (!activeChat) return

      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      const newMessage: ChatMessage = {
        sender: "user",
        text,
        time: timeString,
      }

      // Update the active chat with the new message
      const updatedChat = {
        ...activeChat,
        messages: [...activeChat.messages, newMessage],
        lastMessage: text,
        lastMessageTime: timeString,
      }

      // Update the chats array
      const updatedChats = chats.map((chat) => (chat.id === activeChat.id ? updatedChat : chat))
      setChats(updatedChats)
      setActiveChat(updatedChat)

      // Simulate a reply after a delay
      setTimeout(
        () => {
          const replyMessage: ChatMessage = {
            sender: "other",
            text: getRandomReply(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }

          const chatWithReply = {
            ...updatedChat,
            messages: [...updatedChat.messages, replyMessage],
            lastMessage: replyMessage.text,
            lastMessageTime: replyMessage.time,
          }

          const chatsWithReply = chats.map((chat) => (chat.id === activeChat.id ? chatWithReply : chat))
          setChats(chatsWithReply)
          setActiveChat(chatWithReply)
        },
        1000 + Math.random() * 2000,
      ) // Random delay between 1-3 seconds
    },
    [activeChat, chats],
  )

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        loading,
        setActiveChat,
        initializeChats,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

// Helper function to generate random replies
function getRandomReply(): string {
  const replies = [
    "That sounds interesting. Can you tell me more?",
    "I'll need to check our inventory for that.",
    "What quantities are you looking for?",
    "We can definitely discuss this further.",
    "Do you have any specific requirements?",
    "I can offer a competitive price for that.",
    "When would you need this by?",
    "We've worked with similar products before.",
    "Let me check with our logistics team.",
    "That's within our export capabilities.",
    "We import similar goods regularly.",
    "What's your timeline for this order?",
    "We could arrange a sample shipment first.",
    "I'd be interested in establishing a long-term partnership.",
    "What payment terms are you comfortable with?",
  ]

  return replies[Math.floor(Math.random() * replies.length)]
}
