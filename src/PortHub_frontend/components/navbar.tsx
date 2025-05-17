"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MessageSquare, User, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatContext } from "@/context/chat-context"
import { useContext } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setActiveChat } = useContext(ChatContext)

  // Create a separate chat button handler to ensure it works correctly
  const handleChatClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation() // Prevent event bubbling
    // This is a simplified version - in a real implementation, you would use the openChat function
    // For now, we'll just navigate to the chat page
    window.location.href = "/chat"
  }

  const navLinks = [
    { href: "/", label: "Marketplace", icon: <Store size={18} /> },
    {
      href: "#",
      label: "Chat",
      icon: <MessageSquare size={18} />,
      onClick: handleChatClick,
    },
    { href: "/profile/current-user", label: "My Profile", icon: <User size={18} /> },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#3B82F6]">PortHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-gray-600 hover:text-[#3B82F6] transition-colors flex items-center gap-2",
                  pathname === link.href && "text-[#3B82F6] font-medium",
                )}
                onClick={link.onClick}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-gray-600 hover:text-[#3B82F6] transition-colors px-2 py-1 flex items-center gap-2",
                    pathname === link.href && "text-[#3B82F6] font-medium",
                  )}
                  onClick={(e) => {
                    if (link.onClick) {
                      link.onClick(e)
                    } else {
                      setIsMenuOpen(false)
                    }
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
