"use client";

import { useCartStore } from "@/app/cart/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreVertical, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartModal } from "../context/CartModalcontext";

export default function CartModal() {
  const { isOpen, closeModal } = useCartModal();
  const cart = useCartStore((state) => state.cart);
  const getTotal = useCartStore((state) => state.getCartTotal);
  const increaseItem = useCartStore((state) => state.increaseItemQuantity);
  const decreaseItem = useCartStore((state) => state.decreaseItemQuantity);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const clearCart = useCartStore((state) => state.clearItem);
  const router = useRouter();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = getTotal();

  console.log(cart);

  const handleViewBag = () => {
    closeModal();
    router.push("/cart");
  };

  const handleCheckout = () => {
    closeModal();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full hidden sm:block mt-2 w-[420px] bg-white shadow-2xl border border-gray-200 z-50"
          onMouseLeave={closeModal}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">
              {itemCount} ITEM{itemCount !== 1 ? "S" : ""} IN BAG
            </h2>
            <button className="text-black hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="max-h-[400px] overflow-y-auto">
            {cart.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                Your bag is empty
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${index}`}
                  className="px-6 py-4 border-b border-gray-100"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-black text-sm mb-1">
                          {item.name}
                        </h3>

                        {/* Delete button */}
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-1">
                        Size: {item.selectedSize}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => decreaseItem(item.id)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 text-black rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseItem(item.id)}
                          className="w-6 h-6 flex text-black items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-medium text-green-600 mt-1">
                        In Stock
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-black">
                        £{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              {/* Total */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-black">Total</span>
                <span className="text-lg font-semibold text-black">
                  £{total.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleViewBag}
                  className="flex-1 py-3 px-4 border-2 border-black text-black font-semibold hover:bg-gray-50 transition-colors"
                >
                  VIEW BAG
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-3 px-4 bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
                >
                  CHECKOUT
                </button>
                <button
                  onClick={() => clearCart()}
                  className="w-full py-2 text-sm text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  CLEAR BAG
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
