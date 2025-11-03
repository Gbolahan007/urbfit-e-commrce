import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-black mb-2">URBFIT</h1>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h2 className="text-9xl font-bold text-black leading-none">404</h2>
        </div>

        {/* Message */}
        <h3 className="text-3xl font-bold text-black mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/collection"
            className="px-8 py-3 bg-white text-black font-semibold rounded border-2 border-black hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/collection"
              className="text-black hover:underline font-medium"
            >
              Activewear
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/collection"
              className="text-black hover:underline font-medium"
            >
              Footwear
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/collection"
              className="text-black hover:underline font-medium"
            >
              Accessories
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/brands"
              className="text-black hover:underline font-medium"
            >
              All Brands
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
