"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, UtensilsCrossed, Calendar, Search, Sun, Moon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { MENU_DATA, CATEGORY_TO_CUISINE } from "@/data/menu";

interface FlatSearchItem {
  name: string;
  price: number;
  isVeg: boolean;
  isSpicy: boolean;
  categoryName: string;
  description?: string;
}

// Flat list of all items for global search
const ALL_ITEMS: FlatSearchItem[] = MENU_DATA.categories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryName: category.name,
  }))
);

const getSearchFoodImage = (name: string, cat: string) => {
  const c = cat.toUpperCase();
  if (c.includes("PRAWN")) return "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=150&auto=format&fit=crop";
  if (c.includes("FISH")) return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=150&auto=format&fit=crop";
  if (c.includes("PLATTER")) return "https://images.unsplash.com/photo-1628294895520-73f248f86f78?q=80&w=150&auto=format&fit=crop";
  if (c.includes("BREAD") || name.toLowerCase().includes("roti") || name.toLowerCase().includes("naan")) return "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=150&auto=format&fit=crop";
  if (c.includes("SOUTH INDIAN") || name.toLowerCase().includes("dosa") || name.toLowerCase().includes("idly")) return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=150&auto=format&fit=crop";
  if (c.includes("RICE") || name.toLowerCase().includes("biryani") || name.toLowerCase().includes("rice")) return "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=150&auto=format&fit=crop";
  if (c.includes("NOODLES") || name.toLowerCase().includes("noodle")) return "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=150&auto=format&fit=crop";
  if (c.includes("SOUP")) return "https://images.unsplash.com/photo-1547592165-e1d17fed6006?q=80&w=150&auto=format&fit=crop";
  if (c.includes("SALAD")) return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=150&auto=format&fit=crop";
  if (c.includes("DESSERT") || name.toLowerCase().includes("jamun")) return "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=150&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?q=80&w=150&auto=format&fit=crop";
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FlatSearchItem[]>([]);
  const [searchSelectedIndex, setSearchSelectedIndex] = useState(0);
  const [status, setStatus] = useState<{ isOpen: boolean; text: string } | null>(null);

  const pathname = usePathname();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Dynamic restaurant open status logic
  useEffect(() => {
    const getRestaurantStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeNum = hours * 60 + minutes;

      // Breakfast: 07:30 AM (450 mins) to 10:30 AM (630 mins)
      const isBreakfast = timeNum >= 450 && timeNum < 630;
      // Main Dining: 12:00 PM (720 mins) to 11:00 PM (1380 mins)
      const isMainDining = timeNum >= 720 && timeNum < 1380;

      if (isBreakfast) {
        return { isOpen: true, text: "Open for Breakfast until 10:30 AM" };
      } else if (isMainDining) {
        return { isOpen: true, text: "Open now until 11:00 PM" };
      } else {
        if (timeNum < 450) {
          return { isOpen: false, text: "Closed • Opens at 7:30 AM" };
        }
        if (timeNum >= 630 && timeNum < 720) {
          return { isOpen: false, text: "Closed • Opens at 12:00 PM" };
        }
        return { isOpen: false, text: "Closed • Opens at 7:30 AM tomorrow" };
      }
    };

    setStatus(getRestaurantStatus());
    const interval = setInterval(() => {
      setStatus(getRestaurantStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll handler with passive listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Body scroll lock when mobile menu or search is open
  useEffect(() => {
    if (isOpen || isSearchOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isSearchOpen]);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matched = ALL_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    ).slice(0, 5);
    setSearchResults(matched);
    setSearchSelectedIndex(0);
  }, [searchQuery]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCartOpen) {
          setIsCartOpen(false);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
          setSearchQuery("");
        } else if (isOpen) {
          setIsOpen(false);
          hamburgerRef.current?.focus();
        }
      }
    },
    [isOpen, isCartOpen, isSearchOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Reservations", path: "/reservations" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-45 transition-[padding,top] duration-300 ease-out px-3 sm:px-4 md:px-8 py-3 md:py-4 ${
          isScrolled ? "top-0 md:top-0" : "top-0"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-[background-color,border-color,padding,box-shadow,border-radius] duration-300 ${
            isScrolled
              ? "bg-background/94 backdrop-blur-xl border-b border-border-custom shadow-sm py-3 px-4 sm:px-6 md:px-8 rounded-none"
              : "bg-transparent py-5 px-3 sm:px-4"
          } flex items-center justify-between`}
        >
          {/* Logo & Dynamic Status Indicator */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex flex-col group cursor-pointer focus-visible-ring rounded-lg">
              <span className="font-display text-2xl font-normal italic tracking-wide text-text-primary group-hover:text-text-secondary transition-colors duration-200">
                Cafe
              </span>
              <span className="text-[8px] tracking-[0.25em] font-mono text-text-secondary -mt-1 uppercase">
                Multi Cuisine
              </span>
            </Link>

            {status && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-custom">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status.isOpen ? "bg-veg" : "bg-nonveg"
                  } animate-pulse-slow`}
                />
                <span className="text-[9px] font-mono font-medium text-text-secondary tracking-wider uppercase">
                  {status.text}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 hover:text-text-primary cursor-pointer focus-visible-ring py-1 px-1.5 ${
                    isActive ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full border border-primary/8 hover:border-primary/25 hover:bg-primary/3 text-text-primary transition-colors duration-200 cursor-pointer focus-visible-ring"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5 animate-spin-slow" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full border border-primary/8 hover:border-primary/25 hover:bg-primary/3 text-text-primary transition-colors duration-200 cursor-pointer focus-visible-ring"
              aria-label="Open search menu"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full border border-primary/8 hover:border-primary/25 hover:bg-primary/3 text-text-primary transition-colors duration-200 cursor-pointer focus-visible-ring"
              aria-label="Open shopping cart"
              id="cart-button"
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[9px] sm:text-[10px] font-bold text-background shadow-md border border-background"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop Book Table CTA with ambient pulse */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0 0 ${theme === "dark" ? "rgba(245, 198, 122, 0.35)" : "rgba(17, 17, 17, 0.25)"}`,
                  `0 0 0 10px ${theme === "dark" ? "rgba(245, 198, 122, 0)" : "rgba(17, 17, 17, 0)"}`,
                  `0 0 0 10px ${theme === "dark" ? "rgba(245, 198, 122, 0)" : "rgba(17, 17, 17, 0)"}`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 6
              }}
              className="rounded-full"
            >
              <Link
                href="/reservations"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/12 hover:border-primary text-text-secondary hover:text-background hover:bg-primary text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 focus-visible-ring cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Book Table
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              ref={hamburgerRef}
              onClick={toggleMenu}
              className="p-2 sm:p-2.5 rounded-full border border-primary/8 hover:border-primary/25 hover:bg-primary/3 text-text-primary md:hidden transition-colors duration-200 cursor-pointer focus-visible-ring"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              id="hamburger-button"
            >
              {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel Overlay Redesign */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <span className="font-display text-2xl italic font-normal tracking-wide text-text-primary">Cafe</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full border border-primary/8 text-text-primary hover:bg-primary/3"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Staggered Nav Links */}
            <nav className="flex flex-col gap-6 my-auto pl-4">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ delay: idx * 0.06, duration: 0.4, ease: [0.0, 0.0, 0.2, 1.0] }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`font-display italic text-4xl transition-colors duration-200 ${
                        isActive ? "text-text-primary font-semibold" : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Overlay Footer */}
            <div className="border-t border-primary/8 pt-6 space-y-3 pl-4">
              <a href="tel:+914012345678" className="block text-sm font-semibold text-text-primary hover:underline">
                Call Host: +91 40 1234 5678
              </a>
              <p className="text-xs text-text-muted font-sans">
                Open Daily: 12pm – 11pm (Breakfast: 7:30am – 10:30am)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Overlay Drawer */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] bg-background/98 backdrop-blur-2xl flex flex-col p-6 sm:p-12 md:p-20 overflow-y-auto"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsSearchOpen(false);
                setSearchQuery("");
              }
              if (searchResults.length > 0) {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSearchSelectedIndex((prev) => (prev + 1) % searchResults.length);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSearchSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  const selectedItem = searchResults[searchSelectedIndex];
                  if (selectedItem) {
                    window.location.href = `/menu?search=${encodeURIComponent(selectedItem.name)}`;
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }
                }
              }
            }}
          >
            {/* Search Header */}
            <div className="flex items-center justify-between border-b border-primary/8 pb-4">
              <span className="text-[10px] tracking-[0.25em] font-mono text-text-muted uppercase">
                Sensory Search
              </span>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 rounded-full border border-primary/8 text-text-primary hover:bg-primary/3"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Container */}
            <div className="mt-12 md:mt-20 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-start">
              <input
                autoFocus
                type="text"
                placeholder="Search dishes, drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-3xl sm:text-4xl md:text-5xl font-display italic font-light bg-transparent text-text-primary border-none outline-none placeholder:text-text-primary/10 focus:ring-0"
              />

              {/* Staggered Search Results */}
              <div className="mt-10 md:mt-16 space-y-4">
                {searchQuery.trim() !== "" && searchResults.length === 0 ? (
                  <div className="text-left py-4">
                    <p className="text-text-muted font-sans text-sm">
                      We don&apos;t have that — but you might love our{" "}
                      <Link
                        href="/menu?search=Incredible%20Special%20Chicken"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="text-text-primary font-semibold underline hover:text-text-secondary"
                      >
                        Incredible Special Chicken →
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {searchResults.map((item, idx) => {
                      const isSelected = idx === searchSelectedIndex;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          onClick={() => {
                            window.location.href = `/menu?search=${encodeURIComponent(item.name)}`;
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          onMouseEnter={() => setSearchSelectedIndex(idx)}
                          className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-colors duration-200 ${
                            isSelected ? "bg-primary/5" : "bg-transparent hover:bg-primary/1.5"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Image Thumbnail */}
                            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-primary/8 shrink-0">
                              <img
                                src={getSearchFoodImage(item.name, item.categoryName)}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-veg" : "bg-nonveg"}`} />
                                <h4 className="text-sm font-semibold text-text-primary">{item.name}</h4>
                              </div>
                              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                                {item.categoryName}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-bold text-text-primary">₹{item.price}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Panel */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
