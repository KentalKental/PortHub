"use client"

import { useContext, useState } from "react"
import { ChatContext } from "@/context/chat-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

export default function ChatSidebar() {
  const { chats, activeChat, setActiveChat } = useContext(ChatContext)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChats = searchTerm
    ? chats.filter((chat) => chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : chats

  return (
    <div className="w-full md:w-80 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="text-center p-4 text-gray-500">No conversations found</div>
        ) : (
          <ul>
            {filteredChats.map((chat) => (
              <li key={chat.id}>
                <button
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center ${
                    activeChat?.id === chat.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setActiveChat(chat)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3 flex-shrink-0">
                    {chat.user.name.charAt(0)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium truncate">{chat.user.name}</p>
                      <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button className="w-full bg-[#3B82F6] hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>
    </div>
  )
}
