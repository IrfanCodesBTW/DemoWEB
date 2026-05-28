"use client";

import React, { useState, useEffect, useMemo, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowUpDown, RefreshCw, Sparkles, X, ShoppingBag, Eye, SlidersHorizontal, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MENU_DATA, CATEGORY_TO_CUISINE, MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface FlatMenuItem extends MenuItem {
  categoryName: string;
  cuisineName: string;
}

// Flat list of all items with their category and cuisine pre-mapped
const ALL_ITEMS: FlatMenuItem[] = MENU_DATA.categories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryName: category.name,
    cuisineName: CATEGORY_TO_CUISINE[category.name] || "Indian",
  }))
);

const CUISINES = ["All Cuisines", "Indian", "Chinese", "South Indian", "Oriental", "Continental"];

const getSearchFoodImage = (name: string, cat: string) => {
  const c = cat.toUpperCase();
  if (c.includes("PRAWN")) return "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=600&auto=format&fit=crop";
  if (c.includes("FISH")) return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop";
  if (c.includes("PLATTER")) return "https://images.unsplash.com/photo-1628294895520-73f248f86f78?q=80&w=600&auto=format&fit=crop";
  if (c.includes("BREAD") || name.toLowerCase().includes("roti") || name.toLowerCase().includes("naan")) return "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop";
  if (c.includes("SOUTH INDIAN") || name.toLowerCase().includes("dosa") || name.toLowerCase().includes("idly")) return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600&auto=format&fit=crop";
  if (c.includes("RICE") || name.toLowerCase().includes("biryani") || name.toLowerCase().includes("rice")) return "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop";
  if (c.includes("NOODLES") || name.toLowerCase().includes("noodle")) return "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop";
  if (c.includes("SOUP")) return "https://images.unsplash.com/photo-1547592165-e1d17fed6006?q=80&w=600&auto=format&fit=crop";
  if (c.includes("SALAD")) return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop";
  if (c.includes("DESSERT") || name.toLowerCase().includes("jamun")) return "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?q=80&w=600&auto=format&fit=crop";
};

function MenuContent() {
  const searchParams = useSearchParams();
  const { cart, addToCart } = useCart();
  const { showToast } = useToast();

  const urlCuisine = searchParams.get("cuisine") || "All Cuisines";
  const urlSearch = searchParams.get("search") || "";

  // Filter & Search states
  const [selectedCuisine, setSelectedCuisine] = useState(urlCuisine);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [vegOnly, setVegOnly] = useState<boolean | null>(null); // null = all, true = veg, false = non-veg
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");

  // Selected item details modal
  const [selectedDish, setSelectedDish] = useState<FlatMenuItem | null>(null);

  // Active Category Spy
  const [activeCategory, setActiveCategory] = useState("");

  // Sync params from URL
  useEffect(() => {
    const qCuisine = searchParams.get("cuisine");
    if (qCuisine && CUISINES.includes(qCuisine)) {
      setSelectedCuisine(qCuisine);
    }
    const qSearch = searchParams.get("search");
    if (qSearch) {
      setSearchQuery(qSearch);
    }
  }, [searchParams]);

  // Reset states
  const handleResetFilters = () => {
    setSelectedCuisine("All Cuisines");
    setSearchQuery("");
    setVegOnly(null);
    setSortBy("name");
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...ALL_ITEMS];

    if (selectedCuisine !== "All Cuisines") {
      result = result.filter((item) => item.cuisineName === selectedCuisine);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    if (vegOnly !== null) {
      result = result.filter((item) => item.isVeg === vegOnly);
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCuisine, searchQuery, vegOnly, sortBy]);

  // Group filtered items by category for row layout rendering
  const itemsByCategory = useMemo(() => {
    const groups: Record<string, FlatMenuItem[]> = {};
    filteredItems.forEach((item) => {
      if (!groups[item.categoryName]) {
        groups[item.categoryName] = [];
      }
      groups[item.categoryName].push(item);
    });
    return groups;
  }, [filteredItems]);

  const activeCategories = useMemo(() => {
    return Object.keys(itemsByCategory);
  }, [itemsByCategory]);

  // Set up intersection observer scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll(".menu-category-section");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, [itemsByCategory]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // accounting for sticky headers
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setActiveCategory(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary pb-24">
      {/* Page Header */}
      <div className="relative pt-28 sm:pt-36 pb-10 overflow-hidden bg-surface border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-3 relative z-10">
          <span className="text-[10px] tracking-[0.25em] font-mono text-text-muted uppercase block">Savoury Collections</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-light italic text-text-primary leading-none">
            The Culinary Library
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed font-sans font-light">
            An editorial registry of clay-oven delicacies, fiery Chinese plates, traditional ghee dosas, and custom cold brews.
          </p>
        </div>
      </div>

      {/* Sticky Tab Category Bar (below header) */}
      {activeCategories.length > 0 && (
        <div className="sticky top-[64px] z-30 bg-background/94 backdrop-blur-xl border-b border-border-custom py-2.5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-2 overflow-x-auto scrollbar-none scroll-smooth">
            {activeCategories.map((catName) => {
              const isActive = activeCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => scrollToSection(catName)}
                  className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase shrink-0 transition-all duration-300 relative cursor-pointer min-h-[36px] ${
                    isActive ? "text-background bg-primary" : "text-text-secondary hover:text-text-primary bg-surface-2 hover:bg-surface-3"
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main filters container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border-custom shadow-sm space-y-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input Box */}
            <div className="relative w-full lg:max-w-md focus-within:ring-2 focus-within:ring-primary rounded-xl overflow-hidden border border-border-custom">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search starters, biryani, dosas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                id="menu-search"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted hover:text-text-primary cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Selection Toggles */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto justify-end">
              {/* Veg Toggle Buttons */}
              <div className="flex rounded-xl border border-border-custom p-0.5 bg-background shrink-0">
                <button
                  onClick={() => setVegOnly(vegOnly === true ? null : true)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer min-h-[34px] ${
                    vegOnly === true
                      ? "bg-veg/10 text-veg border border-veg/20"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Veg Only
                </button>
                <button
                  onClick={() => setVegOnly(vegOnly === false ? null : false)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer min-h-[34px] ${
                    vegOnly === false
                      ? "bg-nonveg/10 text-nonveg border border-nonveg/20"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Non-Veg Only
                </button>
              </div>

              {/* Sorting */}
              <div className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-custom bg-background shrink-0 text-xs">
                <ArrowUpDown className="h-3.5 w-3.5 text-text-primary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "name" | "price-asc" | "price-desc")}
                  className="bg-transparent text-text-primary font-semibold uppercase tracking-wider focus:outline-none cursor-pointer min-h-[28px]"
                  aria-label="Sort menu items"
                >
                  <option value="name">Sort: A-Z</option>
                  <option value="price-asc">Price: Low-High</option>
                  <option value="price-desc">Price: High-Low</option>
                </select>
              </div>

              {/* Reset Filter Button */}
              <button
                onClick={handleResetFilters}
                className="p-2 rounded-xl border border-border-custom hover:border-primary text-text-secondary hover:bg-primary/5 transition-colors duration-200 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Reset All Filters"
                aria-label="Reset all filters"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Cuisine selection strip */}
          <div className="space-y-1.5 border-t border-border-custom pt-3">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
              {CUISINES.map((c) => {
                const isActive = selectedCuisine === c;
                return (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCuisine(c);
                    }}
                    className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase shrink-0 transition-colors duration-200 cursor-pointer min-h-[36px] ${
                      isActive
                        ? "bg-primary text-background"
                        : "border border-border-custom hover:border-primary/25 text-text-secondary hover:text-text-primary bg-surface"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-text-muted font-mono mb-6 uppercase tracking-wider gap-2">
          <span>Found {filteredItems.length} culinary masterpieces</span>
          {vegOnly !== null && (
            <span className="flex items-center gap-1 text-text-primary bg-primary/10 px-3 py-1 rounded-full border border-border-custom">
              <Sparkles className="h-3.5 w-3.5" />
              {vegOnly ? "Vegetarian Only" : "Non-Vegetarian Only"} active
            </span>
          )}
        </div>

        {/* Row List grouped by category */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-border-custom bg-surface">
            <h3 className="font-display italic text-lg text-text-primary font-semibold">No Masterpieces Found</h3>
            <p className="text-xs text-text-secondary mt-1 max-w-[280px] mx-auto leading-relaxed font-sans font-light">
              We couldn&apos;t match that in our registry. Select a suggestion or clear search inputs.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-6 py-2.5 rounded-full border border-primary text-text-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary hover:text-background transition-colors duration-200 cursor-pointer min-h-[44px]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {activeCategories.map((catName) => {
              const categoryItems = itemsByCategory[catName];
              return (
                <div key={catName} id={catName} className="menu-category-section space-y-4 scroll-mt-24">
                  {/* Category Header with centered thin lines */}
                  <div className="flex items-center justify-center gap-4 my-8">
                    <div className="h-[1px] bg-border-custom flex-1" />
                    <span className="text-[10px] tracking-[0.25em] font-mono text-text-muted uppercase">
                      — {catName} —
                    </span>
                    <div className="h-[1px] bg-border-custom flex-1" />
                  </div>

                  {/* Category Row Items */}
                  <div className="divide-y divide-border-custom bg-surface border border-border-custom rounded-2xl overflow-hidden">
                    {categoryItems.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => setSelectedDish(item)}
                        className="flex items-center justify-between p-4 sm:p-5 hover:bg-surface-3 transition-colors duration-200 cursor-pointer group"
                      >
                        <div className="flex-1 pr-6 space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${item.isVeg ? "bg-veg" : "bg-nonveg"}`} />
                            <h4 className="font-display italic text-base sm:text-lg text-text-primary group-hover:text-text-primary font-semibold">
                              {item.name}
                            </h4>
                            {item.isSpicy && (
                              <span className="text-[8px] font-sans bg-nonveg/10 border border-nonveg/20 text-nonveg px-2 py-0.5 rounded-full uppercase font-bold shrink-0">
                                🌶 SPICY
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-text-secondary leading-relaxed font-sans font-light max-w-2xl line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Right elements: price and arrow indicator */}
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-baseline font-mono text-text-primary font-bold text-sm sm:text-base">
                            <span className="text-[10px] text-text-muted mr-0.5">₹</span>
                            <span>{item.price}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-text-primary transform translate-x-0 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DISH DETAIL MODAL */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border-custom bg-surface shadow-2xl z-10"
            >
              {/* Modal Banner */}
              <div className="relative h-64 w-full overflow-hidden bg-surface-2">
                <img
                  src={getSearchFoodImage(selectedDish.name, selectedDish.categoryName)}
                  alt={selectedDish.name}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background text-text-primary transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-4 text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">{selectedDish.categoryName}</span>
                  <h3 className="font-display italic text-3xl text-text-primary leading-tight">{selectedDish.name}</h3>
                </div>

                {selectedDish.description && (
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-light">
                    {selectedDish.description}
                  </p>
                )}

                <div className="flex gap-2">
                  <span
                    className={`text-[8px] font-sans tracking-wider font-bold uppercase px-2.5 py-1 rounded-full border ${
                      selectedDish.isVeg
                        ? "bg-veg/10 border-veg/20 text-veg"
                        : "bg-nonveg/10 border-nonveg/20 text-nonveg"
                    }`}
                  >
                    {selectedDish.isVeg ? "VEGETARIAN" : "NON-VEGETARIAN"}
                  </span>
                  {selectedDish.isSpicy && (
                    <span className="text-[8px] font-sans tracking-wider font-bold uppercase px-2.5 py-1 rounded-full border bg-nonveg/10 border border-nonveg/20 text-nonveg">
                      🌶 SPICY DISH
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-custom">
                  <div className="flex items-baseline font-mono text-text-primary">
                    <span className="text-xs text-text-muted mr-1">₹</span>
                    <span className="text-xl font-bold">{selectedDish.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedDish);
                      setSelectedDish(null);
                      showToast(`Added ${selectedDish.name} to order`, "success");
                    }}
                    className="px-6 py-3 rounded-full bg-primary hover:bg-primary-light text-background text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex flex-col items-center justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border-custom">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
            </div>
            <p className="text-xs text-text-muted mt-4 font-mono uppercase tracking-widest">
              Loading culinary vault...
            </p>
          </div>
        }
      >
        <MenuContent />
      </Suspense>
      <Footer />
    </>
  );
}
