import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-[#3B82F6] mb-4">PortHub</h3>
            <p className="text-gray-600 mb-4">
              Connecting importers and exporters worldwide. Find the right trading partners for your business needs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#3B82F6] transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-600 hover:text-[#3B82F6] transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="/profile/current-user" className="text-gray-600 hover:text-[#3B82F6] transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>PortHub</p>
              <p>123 Trade Street</p>
              <p>Business District, BZ 10001</p>
              <p className="mt-2">contact@porthub.com</p>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PortHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
