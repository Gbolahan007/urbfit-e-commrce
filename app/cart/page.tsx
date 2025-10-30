"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useCartStore } from "./store";
import Image from "next/image";

export default function CartPage() {
  const [promoCode, setPromoCode] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Zustand store actions
  const cart = useCartStore((state) => state.cart);
  const getTotal = useCartStore((state) => state.getCartTotal);
  const increaseItem = useCartStore((state) => state.increaseItemQuantity);
  const decreaseItem = useCartStore((state) => state.decreaseItemQuantity);
  const deleteItem = useCartStore((state) => state.deleteItem);

  if (!isMounted) return null; // 👈 render nothing until client-side mount

  // ✅ Calculate totals
  const subtotal = getTotal();
  const deliveryCost = 4.95;
  const total = subtotal;

  return (
    <div className="min-h-screen bg-white text-black mt-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold mb-2">
              Shopping Bag ({cart.length})
            </h1>
            <p className="text-sm sm:text-base">
              Your bag contains {cart.length} items and comes to a total of £
              {subtotal.toFixed(2)}
            </p>
          </div>

          <button className="flex items-center text-black hover:text-gray-700 text-sm sm:text-base">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            Shop More
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex items-start gap-6">
                    {/* ✅ Product Image - stays on the left, same size */}
                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* ✅ Product Details - stays on the right */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm font-medium text-gray-600">
                            In Stock
                          </p>
                        </div>
                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                          <p className="font-semibold text-lg">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">W79-021</p>
                        </div>
                      </div>

                      {/* Size + Quantity (unchanged) */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
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

                      {/* Action Buttons (unchanged) */}
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto">
                          Save For Later
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Bottom Shop More Link */}
            {cart.length > 0 && (
              <button className="flex items-center text-black hover:text-gray-700 mt-4 text-sm sm:text-base">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                Shop More
              </button>
            )}

            {/* Summary for Mobile */}
            {cart.length > 0 && (
              <div className="lg:hidden bg-gray-50 p-6 rounded-lg mt-6">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold">£{total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm">
                    Excluding UK standard delivery (Normally £
                    {deliveryCost.toFixed(2)})
                  </p>
                  <p className="text-sm">
                    FREE Delivery to Store (Subject to Availability)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Summary */}
          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-lg">Total:</span>
                    <span className="text-2xl font-semibold">
                      £{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition-colors mb-4">
                  Checkout
                </button>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Promo Code</span>
                    <span className="text-xs text-gray-500">
                      Applied during Checkout
                    </span>
                  </div>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Promo Code"
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Divider */}
                <div className="text-center text-gray-500 my-4">OR</div>

                {/* Apple Pay Button */}
                <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                  Buy with <span className="text-xl">&#63743;</span> Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
