import { Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">
              STAY IN THE KNOW
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and exclusive
              deals.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">FOLLOW US</h3>
            <div className="flex flex-col gap-4">
              <Link
                href="#"
                className="flex items-center gap-3 hover:text-gray-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 hover:text-gray-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-sm">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 hover:text-gray-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="text-sm">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">SHOP</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/collection/men"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/collection/men"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Men&apos;s Collection
              </Link>
              <Link
                href="/collection/women"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Women&apos;s Collection
              </Link>
              <Link
                href="/collection/accessories"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Accessories
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Sale
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Size Guide
              </Link>
            </nav>
          </div>

          {/* Customer Care Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">
              CUSTOMER CARE
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Shipping & Returns
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Track Order
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Careers
              </Link>
            </nav>
          </div>
        </div>

        {/* Brand Logo */}
        <div className=" border-gray-800 pt-12">
          <h2 className="text-7xl md:text-8xl lg:text-[12rem] font-black tracking-widest text-center">
            URBFIT
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2025 urbfit. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
