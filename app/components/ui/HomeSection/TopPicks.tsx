import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTopPicks } from "@/app/queries/useTopPicks";

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

export default function TopPicks() {
  const { useTopPick } = useTopPicks() as { useTopPick: TopPick[] };

  return (
    <div className="container mx-auto max-w-6xl py-5">
      <div className="mb-8 px-2">
        <h2 className="text-3xl font-bold mb-2">Top Picks</h2>
        <p className="text-gray-600 text-sm">Discover our most popular items</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {useTopPick?.slice(0, 8).map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{ amount: 0.3, once: true }}
          >
            <Link
              href={`/collection/men/${item.slug}`}
              className="bg-white border border-transparent p-1 sm:p-2 hover:border-black transition-colors duration-200 overflow-hidden group block"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-100 w-full h-48 sm:h-56 lg:h-64">
                <Image
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop"
                  }
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw,
                          (max-width: 1200px) 33vw,
                          25vw"
                />
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3">
                <div className="mb-1 sm:mb-2">
                  <span className="inline-block bg-gray-100 text-gray-700 text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full capitalize">
                    {item.category}
                  </span>
                  <span className="ml-1 sm:ml-2 inline-block bg-blue-100 text-blue-700 text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full capitalize">
                    {item.gender}
                  </span>
                </div>

                {/* Price above name */}
                <span className="text-sm sm:text-base font-semibold text-gray-900 block mb-1">
                  {formatCurrency(item.price)}
                </span>

                <h3 className="font-medium text-xs sm:text-sm line-clamp-2 transition-colors">
                  {item.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {useTopPick?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No top picks available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
