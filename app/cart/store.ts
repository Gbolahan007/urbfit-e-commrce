import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
  selectedSize: string;
}

interface CartState {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "totalPrice">) => void;
  deleteItem: (id: string) => void;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  clearItem: () => void;
  getItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // Add item
      addItem: (item) => {
        const { cart } = get();
        const existingItem = cart.find((i) => i.id === item.id);

        let updatedCart;

        if (existingItem) {
          updatedCart = cart.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                  totalPrice: (i.quantity + 1) * i.price,
                }
              : i
          );
        } else {
          updatedCart = [
            ...cart,
            { ...item, quantity: 1, totalPrice: item.price },
          ];
        }

        set({ cart: updatedCart });
      },

      // Delete item
      deleteItem: (id) => {
        const updatedCart = get().cart.filter((item) => item.id !== id);
        set({ cart: updatedCart });
      },

      // Increase quantity
      increaseItemQuantity: (id) => {
        const { cart } = get();
        const updatedCart = cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        );

        set({ cart: updatedCart });
      },

      // Decrease quantity
      decreaseItemQuantity: (id) => {
        const { cart } = get();
        const item = cart.find((i) => i.id === id);

        let updatedCart;
        if (item && item.quantity > 1) {
          updatedCart = cart.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: i.quantity - 1,
                  totalPrice: (i.quantity - 1) * i.price,
                }
              : i
          );
        } else {
          updatedCart = cart.filter((i) => i.id !== id);
        }

        set({ cart: updatedCart });
      },

      // Count items
      getItemCount: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // Cart total
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Check if in cart
      isInCart: (id) => {
        const { cart } = get();
        return cart.some((item) => item.id === id);
      },

      // Get quantity
      getItemQuantity: (id) => {
        const { cart } = get();
        const item = cart.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },

      // Clear all
      clearItem: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
