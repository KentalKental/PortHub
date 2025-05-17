import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ListingsProvider } from "@/context/listings-context"
import { UserProvider } from "@/context/user-context"
import { ChatProvider } from "@/context/chat-context"
import React, { ReactNode } from "react";


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PortHub",
  description: "A marketplace forum for importers and exporters",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F2F2F2] min-h-screen flex flex-col`}>
        <UserProvider>
          <ListingsProvider>
            <ChatProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </ChatProvider>
          </ListingsProvider>
        </UserProvider>
      </body>
    </html>
  )
}
