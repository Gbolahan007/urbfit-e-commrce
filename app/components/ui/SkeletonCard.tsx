"use client";

export function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col">
      {/* Image Skeleton */}
      <div className="aspect-[3/4] bg-gray-200 rounded-lg" />

      {/* Text Skeletons */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
