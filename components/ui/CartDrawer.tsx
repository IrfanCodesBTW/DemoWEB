"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CheckoutModal } from "@/components/menu/CheckoutModal";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, subtotal, gst, total } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isCheckoutOpen) {
        onClose();
      }
    },
    [isOpen, isCheckoutOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-md bg-background border-l border-primary/8 shadow-2xl text-text-primary"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-primary/8">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-text-primary" />
                  <h2 className="font-display text-lg font-semibold uppercase tracking-wider">Your Order</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-primary/8 hover:bg-primary/3 text-text-primary transition-colors duration-200 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close cart drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3 bg-surface">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 border border-primary/8">
                      <ShoppingBag className="h-7 w-7 text-text-muted" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-secondary">Your cart is empty</p>
                      <p className="text-xs text-text-muted mt-1 max-w-[240px] font-sans font-light">
                        Add items from our premium multi-cuisine menu to get started.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 rounded-full border border-primary text-text-primary hover:bg-primary hover:text-background text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer min-h-[44px]"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.menuItem.name}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-background border border-primary/6"
                    >
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full shrink-0 ${
                              item.menuItem.isVeg ? "bg-veg" : "bg-nonveg"
                            }`}
                            title={item.menuItem.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                          />
                          <h3 className="text-sm font-semibold text-text-primary truncate">
                            {item.menuItem.name}
                          </h3>
                        </div>
                        <p className="text-xs text-text-secondary mt-1 font-mono font-bold">₹{item.menuItem.price}</p>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-primary/10 rounded-lg bg-surface">
                          <button
                            onClick={() => updateQuantity(item.menuItem.name, item.quantity - 1)}
                            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors duration-150 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.menuItem.name, item.quantity + 1)}
                            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors duration-150 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => removeFromCart(item.menuItem.name)}
                          className="p-2 text-text-muted hover:text-red-500 transition-colors duration-150 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Calculations */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-primary/8 bg-background space-y-4">
                  <div className="space-y-2 text-sm font-medium">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>GST (18%)</span>
                      <span className="font-mono">₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-text-primary border-t border-primary/5 pt-2 text-base font-bold">
                      <span>Grand Total</span>
                      <span className="font-mono text-text-primary">₹{total}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-background font-semibold uppercase tracking-widest text-xs shadow-md transition-colors duration-200 cursor-pointer focus-visible-ring min-h-[48px]"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};
