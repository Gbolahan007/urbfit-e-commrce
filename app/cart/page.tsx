"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Minus, Plus, Trash2, Heart } from "lucide-react";
import { useCartStore } from "./store";
import Image from "next/image";

export default function CartPage() {
  const [promoCode, setPromoCode] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCartStore((state) => state.cart);
  const getTotal = useCartStore((state) => state.getCartTotal);
  const increaseItem = useCartStore((state) => state.increaseItemQuantity);
  const decreaseItem = useCartStore((state) => state.decreaseItemQuantity);
  const deleteItem = useCartStore((state) => state.deleteItem);

  if (!isMounted) return null;

  //  Calculate totals
  const subtotal = getTotal();
  const deliveryCost = 4.95;
  const total = subtotal;

  return (
    <div className="min-h-screen bg-white text-black pt-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto  px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
              Shopping Bag ({cart.length})
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              {cart.length} {cart.length === 1 ? "item" : "items"} • £
              {subtotal.toFixed(2)}
            </p>
          </div>

          <button className="flex items-center text-black hover:text-gray-700 text-sm self-start sm:self-auto">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Shop More
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 sm:p-6"
                >
                  <div className="flex gap-3 sm:gap-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      {/* Header - Name and Price */}
                      <div className="flex justify-between gap-2 mb-2 sm:mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-lg mb-0.5 sm:mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-green-600">
                            In Stock
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-base sm:text-lg">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* MOBILE LAYOUT - Size & Quantity side by side, Actions below */}
                      <div className="block sm:hidden  space-y-3 mt-auto">
                        {/* Size and Quantity Row */}
                        <div className="flex items-center gap-2">
                          {/* Size Selector - Compact */}
                          <div className="flex items-center gap-1.5 flex-1">
                            <label className="text-xs font-medium text-gray-700 whitespace-nowrap">
                              Size
                            </label>
                            <select
                              defaultValue={item.selectedSize}
                              className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black bg-white"
                            >
                              <option value="XS">XS</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                              <option value="30 R">30 R</option>
                              <option value="32 R">32 R</option>
                              <option value="34 R">34 R</option>
                            </select>
                          </div>

                          {/* Quantity Selector - Compact */}
                          <div className="flex items-center gap-1.5 flex-1">
                            <label className="text-xs font-medium text-gray-700 whitespace-nowrap">
                              Qty
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-1">
                              <button
                                onClick={() => decreaseItem(item.id)}
                                className="px-2 py-1.5 hover:bg-gray-100 transition-colors active:bg-gray-200"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="flex-1 text-center py-1.5 border-x border-gray-300 text-xs font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseItem(item.id)}
                                className="px-2 py-1.5 hover:bg-gray-100 transition-colors active:bg-gray-200"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons Row - Icon buttons */}
                        <div className="flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors active:bg-gray-100">
                            <Heart className="w-3.5 h-3.5" />
                            Save
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors active:bg-red-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* DESKTOP LAYOUT - Original layout for larger screens */}
                      <div className="hidden sm:block mt-auto">
                        {/* Size + Quantity */}
                        <div className="flex items-center gap-4 mb-4">
                          {/* Size Selector */}
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Size</label>
                            <select
                              defaultValue={item.selectedSize}
                              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            >
                              <option value="XS">XS</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                              <option value="30 R">30 R</option>
                              <option value="32 R">32 R</option>
                              <option value="34 R">34 R</option>
                            </select>
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">
                              Quantity
                            </label>
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => decreaseItem(item.id)}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseItem(item.id)}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                            Save For Later
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Bottom Shop More Link */}
            {cart.length > 0 && (
              <button className="flex items-center text-black hover:text-gray-700 mt-2 sm:mt-4 text-sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Shop More
              </button>
            )}
          </div>

          {/* Checkout Summary */}
          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 sticky top-4 sm:top-8">
                {/* Total */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base sm:text-lg font-medium">
                      Total:
                    </span>
                    <span className="text-xl sm:text-2xl font-bold">
                      £{total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Excl. delivery (£{deliveryCost.toFixed(2)})
                  </p>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors mb-3 sm:mb-4 text-sm sm:text-base">
                  Checkout
                </button>

                {/* Promo Code */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm font-medium">
                      Promo Code
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      Apply at checkout
                    </span>
                  </div>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Divider */}
                <div className="text-center text-gray-500 my-3 sm:my-4 text-xs sm:text-sm">
                  OR
                </div>

                {/* Apple Pay Button */}
                <button className="w-full bg-black text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  Buy with <span className="text-lg sm:text-xl">&#63743;</span>{" "}
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
