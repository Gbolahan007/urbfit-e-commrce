"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  Share2,
  Truck,
  ChevronLeft,
  ChevronRight,
  Info,
  PackageOpen,
  Star,
  StarHalf,
  ChevronDown,
} from "lucide-react";
import ProductAccordion from "@/app/components/ui/products/ProductAccordion";
import { useCartStore } from "@/app/cart/store";
import { useCartModal } from "@/app/context/CartModalcontext";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  slug: string;
  image2?: string;
  category: string;
  gender: string;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const { openModal } = useCartModal();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError("Please select a size before adding to bag.");
      return;
    }
    setSizeError("");
    addItem({ ...product, selectedSize });
    openModal();
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Product not found</p>
      </div>
    );
  }

  const images = [product.image, product.image2, product.image, product.image2];
  const thumbnails = [
    product.image,
    product.image2,
    product.image,
    product.image2,
  ];

  const sizes =
    product.category &&
    ["shoes", "sneakers", "boots"].includes(product.category.toLowerCase())
      ? [
          "40",
          "40.5",
          "41",
          "41.5",
          "42",
          "42.5",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
        ]
      : ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-white text-black py-20 ">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-sm mt-8">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="text-gray-400">›</li>
            <li>
              <a href="/men" className="hover:underline">
                Men
              </a>
            </li>
            <li className="text-gray-400">›</li>
            <li>
              <a href="/jumpers-cardigans" className="hover:underline">
                {product.category}
              </a>
            </li>
            <li className="text-gray-400">›</li>
            <li className="text-gray-600 truncate max-w-md">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4 w-20">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 overflow-hidden aspect-square relative ${
                    selectedImage === index ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={thumb || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}

              {/* Buy the Look */}
              <button className="flex flex-col items-center justify-center border-2 border-gray-200 rounded aspect-square hover:border-black transition-colors">
                <PackageOpen className="w-8 h-8 mb-1" />
                <span className="text-xs font-medium text-center leading-tight">
                  BUY THE
                  <br />
                  LOOK
                </span>
              </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Arrows */}
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="lg:pl-8 ">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-normal text-black pr-8">
                {product.name}
              </h1>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-black" />
              </button>
            </div>

            <div className="text-3xl font-semibold mb-4 text-black">
              ${product.price.toFixed(2)}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-black text-black" />
                ))}
                <StarHalf className="w-5 h-5 fill-black text-black" />
              </div>
              <span className="text-sm font-medium text-black">4.5</span>
              <span className="text-sm text-gray-600">(32)</span>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-black">SIZE:</span>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Info className="w-4 h-4 text-black" />
                  Find your Fit Assistant size
                </a>
              </div>

              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded appearance-none bg-white cursor-pointer hover:border-gray-400 transition-colors text-black"
                >
                  <option value="">Please select</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
              </div>

              {sizeError && (
                <p className="text-red-500 text-sm mt-2">{sizeError}</p>
              )}
            </div>

            {/* Add to Bag */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white font-semibold py-4 px-6 transition-colors"
              >
                ADD TO BAG
              </button>
              <button className="p-4 border-2 border-gray-300 rounded hover:border-black transition-colors">
                <Heart className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3 mb-4">
                <Truck className="w-5 h-5 mt-0.5 flex-shrink-0 text-black" />
                <p className="text-sm text-black">
                  Free delivery on qualifying orders.
                </p>
              </div>

              <a
                href="#"
                className="text-sm underline hover:no-underline inline-flex items-center gap-1 text-black"
              >
                View our Delivery & Returns Policy
                <ChevronRight className="w-4 h-4 text-black" />
              </a>
            </div>

            <div className="mt-8">
              <ProductAccordion product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
