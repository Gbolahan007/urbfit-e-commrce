import Image from "next/image";
import { getProductCategory } from "@/app/_lib/data-service";
import { ChevronDown, Heart, Star } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
    gender: string;
  };
}

interface FilterButtonProps {
  label: string;
}

interface StarRatingProps {
  rating?: number;
}

async function page({ params }: PageProps) {
  const category = await getProductCategory(params.gender, params.id);

  console.log(category);
  const FilterButton = ({ label }: FilterButtonProps) => (
    <button className="flex items-center justify-between px-6 py-3 bg-white border border-gray-300 rounded hover:border-gray-400 transition-colors min-w-[140px]">
      <span className="text-gray-800 font-medium">{label}</span>
      <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
    </button>
  );

  const StarRating = ({ rating = 4.5 }: StarRatingProps) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : index === fullStars && hasHalfStar
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-black bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-2">{params.id}</h1>
        <p className="text-gray-600 text-center mb-8">
          {category.length} products
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <FilterButton label="Style" />
          <FilterButton label="Size" />
          <FilterButton label="Colour" />
          <FilterButton label="Body Fit" />
          <FilterButton label="Brands" />
          <button className="text-gray-700 underline font-medium hover:text-gray-900">
            Show more filters
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-gray-700 font-medium">Sort: Relevance</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {category.map((product) => (
            <Link
              key={product.id}
              href={`/${product.gender}/${product.slug}`}
              className="group relative bg-white rounded-lg overflow-hidden block"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 
                 (max-width: 1200px) 50vw, 
                 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Favorite Button */}
                <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                  {product.name}
                </h3>
                <div className="mb-2">
                  <StarRating rating={4.5} />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  £{product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
