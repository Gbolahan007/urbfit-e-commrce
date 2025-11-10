"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";

interface CartModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  selectedColor: string | undefined;
  setSelectedColor: (color: string | undefined) => void;
  // Search functionality
  search: string;
  setSearch: (search: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  wrapperRef: React.RefObject<HTMLDivElement> | null;
}

const CartModalContext = createContext<CartModalContextType | undefined>(
  undefined
);

export function CartModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <CartModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        toggleModal,
        selectedColor,
        setSelectedColor,
        search,
        setSearch,
        isDropdownOpen,
        setIsDropdownOpen,
        wrapperRef,
      }}
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
