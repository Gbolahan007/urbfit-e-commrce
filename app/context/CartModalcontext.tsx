"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CartModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const CartModalContext = createContext<CartModalContextType | undefined>(
  undefined
);

export function CartModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <CartModalContext.Provider
      value={{ isOpen, openModal, closeModal, toggleModal }}
    >
      {children}
    </CartModalContext.Provider>
  );
}

export function useCartModal() {
  const context = useContext(CartModalContext);
  if (context === undefined) {
    throw new Error("useCartModal must be used within a CartModalProvider");
  }
  return context;
}
