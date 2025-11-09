"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type TopPick = {
  id: string;
  image: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  slug: string;
  is_top_picks?: boolean;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function HomeTopPicksClient({
  topPicks,
}: {
  topPicks: TopPick[];
}) {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Top Picks</h2>
            <p className="text-gray-600">Discover our most popular items</p>
          </div>
          <div className="text-sm text-gray-500">
            {topPicks?.length || 0} items
          </div>
        </div>

        {topPicks?.length > 0 ? (
          <div className="relative">
            {/* Horizontal scroll */}
            <div
              className="flex gap-6 overflow-x-auto pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {topPicks.slice(0, 8).map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/${item.gender}/${item.slug}`}
                  className="flex-shrink-0 w-72 group cursor-pointer"
                  style={{
                    animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop"
                        }
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        priority
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Tags */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg capitalize">
                          {item.category}
                        </span>
                        <span className="bg-black backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg capitalize">
                          {item.gender}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 flex-1 group-hover:text-gray-600 transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(item.price)}
                        </span>
                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Fade edges */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-500 text-lg">
              No top picks available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
