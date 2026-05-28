"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Flame, Eye, X } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  item: MenuItem;
  categoryName: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, categoryName }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [showDetail, setShowDetail] = useState(false);

  // Find if item is already in the cart
  const cartItem = cart.find((i) => i.menuItem.name === item.name);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Unsplash high fidelity food image maps
  const getFoodImage = (name: string, cat: string) => {
    const c = cat.toUpperCase();
    if (c.includes("PRAWN")) {
      return "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("FISH")) {
      return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("PLATTER")) {
      return "https://images.unsplash.com/photo-1628294895520-73f248f86f78?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("BREAD") || name.toLowerCase().includes("roti") || name.toLowerCase().includes("naan")) {
      return "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("SOUTH INDIAN") || name.toLowerCase().includes("dosa") || name.toLowerCase().includes("idly") || name.toLowerCase().includes("wada")) {
      return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("RICE") || name.toLowerCase().includes("biryani") || name.toLowerCase().includes("rice")) {
      return "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("NOODLES") || name.toLowerCase().includes("noodle") || name.toLowerCase().includes("chopsuey")) {
      return "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("SOUP")) {
      return "https://images.unsplash.com/photo-1547592165-e1d17fed6006?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("SALAD")) {
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("DESSERT") || c.includes("CURD") || name.toLowerCase().includes("jamun") || name.toLowerCase().includes("halwa")) {
      return "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("MOMO") || name.toLowerCase().includes("dumpling")) {
      return "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop";
    }
    if (c.includes("DAL")) {
      return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop";
    }
    if (name.toLowerCase().includes("paneer") || name.toLowerCase().includes("sabzi") || c.includes("VEGETARIAN")) {
      return "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?q=80&w=600&auto=format&fit=crop";
  };

  const imageUrl = getFoodImage(item.name, categoryName);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-card overflow-hidden rounded-2xl flex flex-col h-full border border-primary/8 hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background"
      >
        {/* Image Banner */}
        <div
          onClick={() => setShowDetail(true)}
          className="relative h-44 sm:h-48 w-full overflow-hidden shrink-0 group cursor-pointer"
        >
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

          {/* Quick View slide-up overlay */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-background/94 backdrop-blur-sm border-t border-primary/6 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-[9px] font-sans tracking-[0.12em] text-text-primary font-semibold uppercase flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              VIEW DETAILS
            </span>
          </div>

          {/* Veg/Non-Veg Indicators */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                item.isVeg
                  ? "bg-veg/10 border-veg/20 text-veg"
                  : "bg-nonveg/10 border-nonveg/20 text-nonveg"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${item.isVeg ? "bg-veg" : "bg-nonveg"}`} />
              {item.isVeg ? "Veg" : "Non-Veg"}
            </div>

            {item.isSpicy && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-nonveg/10 border border-nonveg/20 text-nonveg backdrop-blur-md">
                <Flame className="h-3 w-3" />
                Spicy
              </div>
            )}
          </div>
        </div>

        {/* Content details */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 sm:gap-4 bg-surface">
          <div className="space-y-1.5" onClick={() => setShowDetail(true)}>
            <div className="flex justify-between items-start gap-2 cursor-pointer">
              <h3 className="font-display text-sm sm:text-base font-semibold text-text-primary line-clamp-1 group-hover:text-text-primary">
                {item.name}
              </h3>
              <div className="flex items-baseline font-mono text-text-primary shrink-0">
                <span className="text-[9px] text-text-muted mr-0.5">₹</span>
                <span className="text-sm font-bold">{item.price}</span>
              </div>
            </div>
            {item.description && (
              <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed line-clamp-2 font-light font-sans cursor-pointer">
                {item.description}
              </p>
            )}
          </div>

          {/* Cart controls */}
          <div className="shrink-0 pt-2 border-t border-primary/6">
            {quantity > 0 ? (
              <div className="flex items-center justify-between border border-primary/15 rounded-xl bg-background p-0.5">
                <button
                  onClick={() => updateQuantity(item.name, quantity - 1)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                  aria-label="Decrease item quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs font-mono font-bold text-text-primary">{quantity} added</span>
                <button
                  onClick={() => updateQuantity(item.name, quantity + 1)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                  aria-label="Increase item quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(item)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary/15 hover:border-primary bg-background hover:bg-primary hover:text-background text-xs font-semibold uppercase tracking-wider text-text-secondary transition-colors duration-200 cursor-pointer min-h-[40px]"
              >
                <Plus className="h-3.5 w-3.5" />
                Add to Order
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* DISH DETAIL MODAL */}
      <AnimatePresence>
        {showDetail && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetail(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-primary/10 bg-background shadow-2xl z-10"
            >
              {/* Modal Banner */}
              <div className="relative h-64 w-full overflow-hidden bg-surface">
                <Image src={imageUrl} alt={item.name} fill className="object-cover" />
                <button
                  onClick={() => setShowDetail(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background text-text-primary transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-4 text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">{categoryName}</span>
                  <h3 className="font-display italic text-3xl text-text-primary leading-tight">{item.name}</h3>
                </div>

                {item.description && (
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-light">
                    {item.description}
                  </p>
                )}

                <div className="flex gap-2">
                  <span
                    className={`text-[8px] font-sans tracking-wider font-bold uppercase px-2.5 py-1 rounded-full border ${
                      item.isVeg
                        ? "bg-veg/10 border-veg/20 text-veg"
                        : "bg-nonveg/10 border-nonveg/20 text-nonveg"
                    }`}
                  >
                    {item.isVeg ? "VEGETARIAN" : "NON-VEGETARIAN"}
                  </span>
                  {item.isSpicy && (
                    <span className="text-[8px] font-sans tracking-wider font-bold uppercase px-2.5 py-1 rounded-full border bg-nonveg/10 border border-nonveg/20 text-nonveg">
                      🌶 SPICY DISH
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-primary/8">
                  <div className="flex items-baseline font-mono text-text-primary">
                    <span className="text-xs text-text-muted mr-1">₹</span>
                    <span className="text-xl font-bold">{item.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(item);
                      setShowDetail(false);
                    }}
                    className="px-6 py-3 rounded-full bg-primary hover:bg-primary-light text-background text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
