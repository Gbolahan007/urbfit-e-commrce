export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative">
        {/* Animated Circle */}
        <div className="w-32 h-32 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>

        {/* Brand Name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-[0.3em] animate-pulse">
              URBFIT
            </h1>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-20">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-black rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-black rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-black rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
      </div>
    </div>
  );
}
