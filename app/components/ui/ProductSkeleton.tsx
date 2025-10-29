export function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-white text-black py-20">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="text-gray-400">›</div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="text-gray-400">›</div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — Image Section */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4 w-20">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-full aspect-square bg-gray-200 rounded animate-pulse"
                />
              ))}
              <div className="w-full aspect-square bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <div className="aspect-[3/4] bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="lg:pl-8 space-y-6">
            {/* Title */}
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            {/* Price */}
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"
                />
              ))}
              <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Add to Bag Buttons */}
            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="space-y-4 pt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 w-full bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
