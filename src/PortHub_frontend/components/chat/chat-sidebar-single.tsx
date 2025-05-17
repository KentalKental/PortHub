"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
}

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    listing: string
    listingId: string
  }
}

export default function ChatSidebar({ isOpen, onClose, user }: ChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatId = `chat-${user.id}-${user.listingId}`
  const initializedRef = useRef(false)

  // Load previous messages from localStorage if they exist
  useEffect(() => {
    if (isOpen && !initializedRef.current) {
      initializedRef.current = true

      const savedMessages = localStorage.getItem(chatId)
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      } else {
        // Only add initial message if no saved messages exist
        const initialMessage: Message = {
          id: "1",
          senderId: user.id,
          text: `Hello, I'm interested in discussing about "${user.listing}". Is it still available?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages([initialMessage])
      }
    }

    // Reset the initialized flag when the chat is closed
    if (!isOpen) {
      initializedRef.current = false
    }
  }, [isOpen, user, chatId])

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(chatId, JSON.stringify(messages))
    }
  }, [messages, chatId])

  // Scroll to bottom when messages change, but only within the chat container
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ block: "nearest" })
      }, 100)
    }
  }, [messages, isOpen])

  const handleSendMessage = (e: React.MouseEvent | React.KeyboardEvent | null) => {
    // Prevent form submission which causes page reload/scroll
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: "me",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prevMessages) => [...prevMessages, newMsg])
      setNewMessage("")

      // Scroll to messages end without affecting page scroll
      if (messagesEndRef.current) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ block: "nearest" })
        }, 100)
      }

      // Simulate reply after a delay
      setTimeout(
        () => {
          const replyMsg: Message = {
            id: (Date.now() + 1).toString(),
            senderId: user.id,
            text: getRandomReply(),
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }
          setMessages((prevMessages) => [...prevMessages, replyMsg])
        },
        1000 + Math.random() * 2000,
      ) // Random delay between 1-3 seconds
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 bg-white shadow-lg z-50 transition-transform duration-300 transform w-full sm:w-96",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-[#4F6BF6] text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-xs text-white/80">Re: {user.listing}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            className="p-1 rounded-full hover:bg-blue-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] p-3 rounded-lg",
                message.senderId === "me"
                  ? "bg-[#4F6BF6] text-white ml-auto rounded-br-none"
                  : "bg-white border border-gray-200 rounded-bl-none",
              )}
            >
              <p className={message.senderId === "me" ? "text-white" : "text-gray-800"}>{message.text}</p>
              <p
                className={cn("text-xs mt-1 text-right", message.senderId === "me" ? "text-blue-100" : "text-gray-500")}
              >
                {message.timestamp}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleSendMessage(e)
                  return false
                }
              }}
            />
            <Button
              type="button"
              size="icon"
              className="bg-[#4F6BF6] hover:bg-[#4F6BF6]/90"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSendMessage(e)
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to generate random replies
function getRandomReply(): string {
  const replies = [
    "Yes, it's still available. What details would you like to know?",
    "Thank you for your interest. Can you tell me more about your requirements?",
    "I'd be happy to discuss this further. What's your timeline?",
    "We can definitely work something out. Do you have any specific questions?",
    "Yes, I'm the seller. Would you like to discuss pricing or specifications?",
    "Thanks for reaching out. Are you looking for a long-term partnership?",
    "I appreciate your interest. What quantities are you looking for?",
    "This is still available. Would you like to discuss shipping options?",
    "Yes, we can provide more details. What's most important for you to know?",
    "I'm glad you're interested. Do you have experience with this type of product?",
  ]

  return replies[Math.floor(Math.random() * replies.length)]
}
