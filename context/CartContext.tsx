"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/data/menu";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  gst: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem("cafe_cart");
        if (stored) {
          setCart(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error reading cart from localStorage", e);
      }
      setIsHydrated(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("cafe_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
    }
  }, [cart, isHydrated]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItem.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.name === item.name
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart((prev) => prev.filter((i) => i.menuItem.name !== itemName));
  };

  const updateQuantity = (itemName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemName);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.menuItem.name === itemName ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18); // 18% GST as requested
  const total = subtotal + gst;

  return (
    <CartContext.Provider
      value={{
        cart: isHydrated ? cart : [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: isHydrated ? cartCount : 0,
        subtotal: isHydrated ? subtotal : 0,
        gst: isHydrated ? gst : 0,
        total: isHydrated ? total : 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
