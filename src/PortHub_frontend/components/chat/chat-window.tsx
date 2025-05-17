"use client"

import type React from "react"

import { useContext, useEffect, useRef, useState } from "react"
import { ChatContext } from "@/context/chat-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Phone, Video, Info } from "lucide-react"

export default function ChatWindow() {
  const { activeChat, sendMessage } = useContext(ChatContext)
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat?.messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(message)
      setMessage("")
    }
  }

  if (!activeChat) return null

  return (
    <div className="flex-grow flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">
            {activeChat.user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium">{activeChat.user.name}</h3>
            <p className="text-xs text-gray-500">{activeChat.user.status}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {activeChat.messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === "user"
                    ? "bg-[#3B82F6] text-white rounded-br-none"
                    : "bg-white border border-gray-200 rounded-bl-none"
                }`}
              >
                <p className={msg.sender === "user" ? "text-white" : "text-gray-800"}>{msg.text}</p>
                <p className={`text-xs mt-1 text-right ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" className="bg-[#3B82F6] hover:bg-blue-600">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
