"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type TrendingItem = {
  id: string;
  image: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  slug: string;
  is_trending?: boolean;
  is_top_picks?: boolean;
};

export default function HomeTrendingNewClient({
  trendingItems,
}: {
  trendingItems: TrendingItem[];
}) {
  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-10 py-8">
      {/* Heading */}
      <div className="mb-8 px-2">
        <h2 className="text-3xl font-bold mb-2">Trending New</h2>
        <p className="text-gray-600 text-sm">
          Discover what&lsquo;s trending right now
        </p>
      </div>

      {/* Trending items grid */}
      {trendingItems?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {trendingItems.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ amount: 0.3, once: true }}
            >
              <Link
                href={`/${item.gender}/${item.slug}`}
                className="group block overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                    }
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw,
                            (max-width: 1280px) 50vw,
                            33vw"
                  />
                  {/* Product name */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white font-bold text-xl lg:text-2xl leading-tight drop-shadow-2xl transform group-hover:translate-y-[-4px] transition-transform duration-300">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No trending items available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
