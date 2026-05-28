"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Compass,
  MapPin,
  Phone,
  Clock,
  Plus,
  Minus,
  X,
  ChevronLeft,
  Calendar,
  Users,
  CheckCircle,
  HelpCircle,
  Sparkles
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingSpices } from "@/components/ui/FloatingSpices";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import confetti from "canvas-confetti";

export default function HomePage() {
  const { cart, addToCart, updateQuantity } = useCart();
  const { showToast } = useToast();

  // Selected dish for quick detail modal
  const [selectedDish, setSelectedDish] = useState<any | null>(null);

  // Gallery tilt state
  const [tiltStyle, setTiltStyle] = useState<Record<number, string>>({});

  // Lightbox gallery modal
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Reservation form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    occasion: "None",
    requests: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const timeSlots = ["12:30 PM", "01:30 PM", "07:00 PM", "08:00 PM", "09:00 PM"];

  // Floating label active states
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});

  const featuredDishes = [
    {
      name: "Tandoori Non-Veg Platter",
      categoryName: "COMBO PLATTERS",
      course: "Mains / Platters",
      description: "A chef's masterpiece featuring selected clay-oven fire-grilled chicken pieces, mahi mahi fish, fresh prawns & tender skewered mutton kebabs served with mint cream.",
      price: 605,
      isVeg: false,
      isSpicy: false,
      isHero: true,
      image: "https://images.unsplash.com/photo-1628294895520-73f248f86f78?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Incredible Special Chicken",
      categoryName: "INDIAN NON VEGETARIAN",
      course: "Chef Signature",
      description: "Rich, aromatic, slow-cooked boneless chicken in a golden saffron & cashew gravy infused with cardamom.",
      price: 495,
      isVeg: false,
      isSpicy: false,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Paneer Tikka Masala",
      categoryName: "MAIN COURSE INDIAN VEGETARIAN",
      course: "Mains Vegetarian",
      description: "Char-grilled soft paneer tikka cubes cooked in a savory onion, vine tomato & butter gravy.",
      price: 275,
      isVeg: true,
      isSpicy: false,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Paneer Chilli",
      categoryName: "STARTERS VEGETARIAN",
      course: "Starter",
      description: "Wok-tossed fresh cottage cheese fingers with green bell peppers, dark soy sauce, spring onion, ginger & chilli.",
      price: 255,
      isVeg: true,
      isSpicy: true,
      image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const categories = [
    { name: "Starters", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop", count: "15 items" },
    { name: "Mains", image: "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?q=80&w=400&auto=format&fit=crop", count: "24 items" },
    { name: "South Indian", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400&auto=format&fit=crop", count: "14 items" },
    { name: "Oriental", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop", count: "8 items" },
    { name: "Continental", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop", count: "12 items" },
    { name: "Desserts", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop", count: "13 items" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1628294895520-73f248f86f78?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop"
  ];

  const reviews = [
    {
      name: "Aarav Mehta",
      role: "Fine Dining Critic",
      quote: "The Incredible Special Chicken is out of this world. The spices are robust yet perfectly layered. A true culinary masterpiece.",
      rating: 5,
      source: "via Google Reviews"
    },
    {
      name: "Sneha Reddy",
      role: "Local Food Blogger",
      quote: "Savouring the Ghee Dosa at 8 AM and heading back for the Chinese Veg Platter for dinner. This is the ultimate multi-cuisine dining destination.",
      rating: 5,
      source: "via TripAdvisor"
    },
    {
      name: "Vikram Kapoor",
      role: "Regular Guest",
      quote: "The booking process is seamless, the ambient lighting is gorgeous, and the service feels premium. An absolute luxury experience in Secunderabad.",
      rating: 5,
      source: "via Zomato Gold"
    }
  ];

  // Gallery mouse tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;
    setTiltStyle((prev) => ({
      ...prev,
      [idx]: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`
    }));
  };

  const handleMouseLeave = (idx: number) => {
    setTiltStyle((prev) => ({
      ...prev,
      [idx]: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    }));
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.date) errors.date = "Please select a date";
    if (!formData.time) errors.time = "Please select a time slot";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast("Please complete all required fields", "error");
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const code = "CF-" + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(code);
      setBookingConfirmed(true);
      showToast("Reservation request sent successfully!", "success");
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#111111", "#FAF9F5", "#8A8880"]
      });
    }, 1500);
  };

  const resetBookingForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "2",
      date: "",
      time: "",
      occasion: "None",
      requests: ""
    });
    setBookingConfirmed(false);
    setBookingCode("");
  };

  return (
    <>
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#FAF9F5]">
        <FloatingSpices />

        {/* Ken Burns image background overlay (luminosity blend) */}
        <motion.div
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-[0.25]"
        />

        {/* SVG Noise Grain Texture Overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.05))] mix-blend-overlay" />

        {/* Main centered Hero Text */}
        <div className="max-w-4xl mx-auto px-4 text-center z-10 space-y-6 sm:space-y-8 mt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-[10px] sm:text-xs font-semibold font-sans tracking-[0.22em] text-[#8A8880] uppercase">
              EST. 2018 · PARK LANE SECUNDERABAD · MULTI CUISINE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-cinematic-hero text-[#111111] font-display italic font-light tracking-tight leading-none"
          >
            Where Fire <br /> Meets Flour
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-[#555550] max-w-xl mx-auto font-sans font-light leading-relaxed"
          >
            Hand-crafted clay-oven roasts, wood-fired sizzles, and delicate confectionaries. Made with locally sourced ingredients for sensory anticipation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.10em] shadow-md transition-all duration-300 transform hover:scale-[1.02] min-h-[48px]"
            >
              Reserve Tonight
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/15 text-[#555550] hover:text-black hover:border-black text-xs font-semibold uppercase tracking-[0.10em] transition-all duration-300 min-h-[48px]"
            >
              View Menu Book
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 text-[#8A8880]"
        >
          <span className="text-[9px] font-sans tracking-[0.16em] uppercase">scroll to explore</span>
          <ChevronRight className="h-4 w-4 rotate-90" />
        </motion.div>
      </section>

      {/* SECTION 2: THE MOOD BAR */}
      <section className="relative w-full bg-[#F4F2EC] border-y border-border-custom z-10 py-5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-3 divide-x divide-black/8 text-center items-center">
          <div className="space-y-1">
            <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.12em] text-[#8A8880] uppercase">Open Today</p>
            <h4 className="font-display italic text-lg sm:text-2xl font-normal text-black leading-none">12pm – 11pm</h4>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.12em] text-[#8A8880] uppercase">Avg. Rating</p>
            <h4 className="font-display italic text-lg sm:text-2xl font-normal text-black leading-none">★ 4.9 <span className="text-xs font-sans not-italic text-[#8A8880]">(1,200+ reviews)</span></h4>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.12em] text-[#8A8880] uppercase">Est. Wait</p>
            <h4 className="font-display italic text-lg sm:text-2xl font-normal text-black leading-none">~25 min</h4>
          </div>
        </div>
      </section>

      {/* SECTION 3: SIGNATURE DISHES (Chef's Table Asymmetric Grid) */}
      <section className="py-20 sm:py-28 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Stacked labels */}
          <div className="text-left mb-12 sm:mb-16 space-y-1.5">
            <span className="text-[10px] tracking-[0.18em] font-sans text-[#8A8880] uppercase block">TONIGHT'S PICKS</span>
            <h2 className="font-display italic text-4xl sm:text-5xl text-[#111111] font-light leading-none">What We&apos;re Proud Of</h2>
          </div>

          {/* Asymmetric Dish Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {featuredDishes.map((dish, idx) => {
              const cartItem = cart.find((i) => i.menuItem.name === dish.name);
              const qty = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  key={dish.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.98 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.75, ease: [0.0, 0.0, 0.2, 1.0] }
                    }
                  }}
                  className={`relative flex flex-col rounded-xl overflow-hidden bg-[#FAF9F5] border border-black/8 hover:border-black/20 transition-colors duration-300 group cursor-pointer ${
                    dish.isHero ? "md:col-span-6" : "md:col-span-3"
                  }`}
                  onClick={() => setSelectedDish(dish)}
                >
                  {/* Image container with custom clip path reveal animation */}
                  <div
                    className={`relative w-full overflow-hidden shrink-0 ${
                      dish.isHero ? "h-[300px] sm:h-[380px]" : "h-[220px]"
                    }`}
                  >
                    <motion.div
                      variants={{
                        hidden: { clipPath: "inset(0 0 100% 0)" },
                        visible: {
                          clipPath: "inset(0 0 0% 0)",
                          transition: { duration: 0.9, delay: 0.1, ease: [0.0, 0.0, 0.2, 1.0] }
                        }
                      }}
                      className="w-full h-full relative"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </motion.div>

                    {/* Quick View slide-up overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-white/94 backdrop-blur-sm border-t border-black/8 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] font-sans tracking-[0.14em] text-black font-semibold uppercase">
                        View Culinary Stage
                      </span>
                    </div>

                    {/* Dietary badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span
                        className={`text-[8px] font-sans tracking-wider font-bold uppercase px-2.5 py-1 rounded-full border ${
                          dish.isVeg
                            ? "bg-green-50 border-green-200 text-veg"
                            : "bg-red-50 border-red-200 text-nonveg"
                        }`}
                      >
                        {dish.isVeg ? "VEG" : "NON-VEG"}
                      </span>
                      {dish.isSpicy && (
                        <span className="text-[8px] font-sans tracking-wider font-bold uppercase px-2.5 py-1 rounded-full border bg-red-50 border-red-200 text-nonveg">
                          🌶 SPICY
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[9px] font-sans tracking-[0.15em] text-[#8A8880] uppercase">
                        {dish.course}
                      </span>
                      <h3
                        className={`font-display italic font-normal text-black ${
                          dish.isHero ? "text-2xl sm:text-3xl" : "text-lg"
                        }`}
                      >
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#555550] line-clamp-2 leading-relaxed font-light font-sans">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/6">
                      {/* Monospaced price */}
                      <div className="flex items-baseline font-mono text-black">
                        <span className="text-[10px] text-[#8A8880] mr-1">₹</span>
                        <span className="text-base font-bold">{dish.price}</span>
                      </div>

                      {/* Add to order trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({ name: dish.name, price: dish.price, isVeg: dish.isVeg, isSpicy: dish.isSpicy });
                        }}
                        className="text-[10px] font-sans font-semibold tracking-wider text-black border border-black/15 hover:bg-black hover:text-white px-3.5 py-1.5 rounded-full transition-colors"
                      >
                        Plating {qty > 0 ? `(${qty})` : "+"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: MENU CATEGORIES */}
      <section className="py-16 sm:py-20 bg-[#FAF9F5] border-y border-border-custom relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-left mb-10 space-y-1">
            <span className="text-[10px] tracking-[0.18em] font-sans text-[#8A8880] uppercase block">THE KITCHEN MAP</span>
            <h2 className="font-display italic text-3xl sm:text-4xl text-black font-light leading-none">Map of Culinary Fires</h2>
          </div>

          {/* Horizontal scroll grid */}
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/menu?cuisine=All Cuisines`}
                className="w-[200px] h-[280px] shrink-0 relative rounded-2xl overflow-hidden border border-black/8 hover:border-black/20 group cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-left space-y-1">
                  <h3 className="font-display italic text-2xl text-white font-light group-hover:text-[#FAF9F5] transition-colors flex items-center justify-between">
                    {cat.name}
                    <ChevronRight className="h-4 w-4 transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white" />
                  </h3>
                  <p className="text-[10px] font-mono text-white/50">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: RESERVATION STRIP */}
      <section className="py-20 sm:py-24 bg-[#F4F2EC] relative z-10 border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] tracking-[0.18em] font-sans text-[#8A8880] uppercase block">BOOK A TABLE</span>
            <h2 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-black font-light leading-none">Join Us Tonight</h2>
            <p className="text-xs sm:text-sm text-[#555550] leading-relaxed font-light font-sans max-w-sm">
              We prepare the tables ahead of your arrival. Secure private visual space or dining lounge table assignments.
            </p>

            {/* Hours Block */}
            <div className="space-y-2 pt-4 border-t border-black/8 font-mono text-xs text-[#555550]">
              <div className="flex justify-between">
                <span>Mon – Thu:</span>
                <span className="text-black font-semibold">12:00 PM – 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri – Sat:</span>
                <span className="text-black font-semibold">12:00 PM – 11:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-black font-semibold">11:00 AM – 09:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-black/8 shadow-sm">
            <AnimatePresence mode="wait">
              {bookingConfirmed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="h-16 w-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-veg">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display italic text-2xl text-black">Booking Confirmed!</h3>
                    <p className="text-xs text-[#555550] max-w-xs mx-auto font-sans font-light leading-relaxed">
                      Your table reservation is secured. We sent updates to your contacts. Reference Code: <strong className="font-mono text-black">{bookingCode}</strong>
                    </p>
                  </div>
                  <button
                    onClick={resetBookingForm}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black text-black hover:bg-black hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                  >
                    Reserve Another Table
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative border border-black/10 focus-within:border-black rounded-lg p-2 transition-colors">
                      <label
                        className={`absolute left-3 transition-all duration-200 font-sans tracking-wide text-xs ${
                          focusState.name || formData.name
                            ? "top-1 text-[8px] text-[#8A8880] uppercase"
                            : "top-4 text-xs text-[#8A8880]"
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onFocus={() => setFocusState((prev) => ({ ...prev, name: true }))}
                        onBlur={() => setFocusState((prev) => ({ ...prev, name: false }))}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-transparent text-sm border-none outline-none pt-4 pb-1 text-black focus:ring-0"
                      />
                      {formErrors.name && <p className="text-[9px] text-red-500 mt-1 font-sans">{formErrors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="relative border border-black/10 focus-within:border-black rounded-lg p-2 transition-colors">
                      <label
                        className={`absolute left-3 transition-all duration-200 font-sans tracking-wide text-xs ${
                          focusState.phone || formData.phone
                            ? "top-1 text-[8px] text-[#8A8880] uppercase"
                            : "top-4 text-xs text-[#8A8880]"
                        }`}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onFocus={() => setFocusState((prev) => ({ ...prev, phone: true }))}
                        onBlur={() => setFocusState((prev) => ({ ...prev, phone: false }))}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-transparent text-sm border-none outline-none pt-4 pb-1 text-black focus:ring-0"
                      />
                      {formErrors.phone && <p className="text-[9px] text-red-500 mt-1 font-sans">{formErrors.phone}</p>}
                    </div>

                    {/* Date */}
                    <div className="relative border border-black/10 rounded-lg p-2">
                      <label className="text-[8px] text-[#8A8880] uppercase tracking-wide block">Booking Date *</label>
                      <input
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-transparent text-sm border-none outline-none pt-1 pb-1 text-black focus:ring-0"
                      />
                      {formErrors.date && <p className="text-[9px] text-red-500 mt-1 font-sans">{formErrors.date}</p>}
                    </div>

                    {/* Time slots */}
                    <div className="relative border border-black/10 rounded-lg p-2">
                      <label className="text-[8px] text-[#8A8880] uppercase tracking-wide block">Time Slot *</label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                        className="w-full bg-transparent text-sm border-none outline-none pt-1 pb-1 text-black focus:ring-0 cursor-pointer"
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {formErrors.time && <p className="text-[9px] text-red-500 mt-1 font-sans">{formErrors.time}</p>}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="relative border border-black/10 focus-within:border-black rounded-lg p-2 transition-colors">
                    <label
                      className={`absolute left-3 transition-all duration-200 font-sans tracking-wide text-xs ${
                        focusState.requests || formData.requests
                          ? "top-1 text-[8px] text-[#8A8880] uppercase"
                          : "top-4 text-xs text-[#8A8880]"
                      }`}
                    >
                      Special Requests (Allergies, Kids, Occasion)
                    </label>
                    <textarea
                      name="requests"
                      value={formData.requests}
                      onFocus={() => setFocusState((prev) => ({ ...prev, requests: true }))}
                      onBlur={() => setFocusState((prev) => ({ ...prev, requests: false }))}
                      onChange={(e) => setFormData((prev) => ({ ...prev, requests: e.target.value }))}
                      rows={2}
                      className="w-full bg-transparent text-sm border-none outline-none pt-4 pb-1 text-black focus:ring-0 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black hover:bg-[#111111] text-white font-semibold uppercase tracking-widest text-xs transition-colors duration-200 disabled:opacity-50 min-h-[48px]"
                  >
                    {isSubmitting ? "Placing Table Reservation..." : "Confirm Table Reservation"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 6: ABOUT / CHEF'S STORY */}
      <section className="py-20 sm:py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chef Image left with subtle vignette edges */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-black/8 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop"
              alt="Executive Kitchen Master Chef plating pasta"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
          </div>

          {/* Text Right */}
          <div className="lg:col-span-7 space-y-6 text-left pl-0 lg:pl-6">
            <span className="text-[10px] tracking-[0.18em] font-sans text-[#8A8880] uppercase block">OUR STORY</span>
            <h2 className="font-display italic text-4xl sm:text-5xl text-black font-light leading-none">The Chef&apos;s Sanctuary</h2>
            <p className="text-xs sm:text-sm text-[#555550] leading-relaxed font-light font-sans">
              Plates are maps, and fires are voices. We believe in preparing dishes that satisfy your hunger before they ever reach the table. We curate five distinct hearths under one single roof, employing authentic clay ovens for flatbreads and steel woks for glazing Momos and noodles.
            </p>
            <p className="text-xs sm:text-sm text-[#555550] leading-relaxed font-light font-sans">
              Our master culinary architects ground the dry spices daily and monitor live baking hearths. This is the sensory fine dining arrival we built in Kalasiguda, Secunderabad.
            </p>

            <div className="italic font-display text-lg text-black pt-2">
              — Chef&apos;s Executive Kitchen
            </div>

            {/* Counters row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/8 text-left font-sans">
              <div>
                <h4 className="font-display italic text-3xl sm:text-4xl text-black">8+</h4>
                <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.12em] text-[#8A8880] uppercase mt-1">Years Open</p>
              </div>
              <div>
                <h4 className="font-display italic text-3xl sm:text-4xl text-black">120+</h4>
                <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.12em] text-[#8A8880] uppercase mt-1">Delicacies</p>
              </div>
              <div>
                <h4 className="font-display italic text-3xl sm:text-4xl text-black">4.9</h4>
                <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.12em] text-[#8A8880] uppercase mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: GALLERY (Masonry Grid with Hover Tilt) */}
      <section className="py-16 sm:py-20 bg-[#FAF9F5] border-y border-border-custom relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="max-w-xl mx-auto space-y-1 mb-12 sm:mb-16">
            <span className="text-[10px] tracking-[0.18em] font-sans text-[#8A8880] uppercase block">VISUAL POETRY</span>
            <h2 className="font-display italic text-3xl sm:text-4xl text-black font-light leading-none">The Sensory Gallery</h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl border border-black/8 bg-white cursor-pointer select-none"
                style={{
                  transform: tiltStyle[idx] || "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                  transition: "transform 0.15s ease-out"
                }}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                onClick={() => setActivePhotoIdx(idx)}
              >
                <img
                  src={img}
                  alt={`Sensory dining view ${idx + 1}`}
                  className="w-full h-auto object-cover max-h-[420px]"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[9px] font-sans tracking-[0.12em] uppercase font-bold text-white bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                    View Image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: REVIEWS */}
      <section className="py-20 sm:py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="max-w-xl mx-auto space-y-1 mb-12 sm:mb-16">
            <span className="text-[10px] tracking-[0.18em] font-sans text-[#8A8880] uppercase block">GUEST SENTIMENT</span>
            <h2 className="font-display italic text-3xl sm:text-4xl text-black font-light leading-none">Whispers of Praise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F5] p-8 rounded-2xl border border-black/6 flex flex-col justify-between space-y-6 hover:border-black/20 transition-all duration-300"
              >
                <div className="space-y-4 relative">
                  {/* Pull Quote Large mark */}
                  <span className="absolute -top-6 -left-3 font-display italic text-6xl text-black/10 select-none">
                    &ldquo;
                  </span>
                  <div className="flex gap-1 text-black">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-display italic text-lg sm:text-xl text-[#111111] leading-relaxed relative z-10 pt-2">
                    {rev.quote}
                  </p>
                </div>
                <div className="pt-4 border-t border-black/8 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-black uppercase tracking-wider">{rev.name}</h4>
                    <p className="text-[10px] text-[#8A8880] mt-0.5">{rev.role}</p>
                  </div>
                  <span className="text-[9px] font-mono text-[#8A8880] uppercase tracking-wider">
                    {rev.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISH QUICK DETAIL MODAL */}
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
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl z-10"
            >
              {/* Modal Banner */}
              <div className="relative h-64 w-full overflow-hidden bg-[#FAF9F5]">
                <img src={selectedDish.image} alt={selectedDish.name} className="h-full w-full object-cover" />
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-[#8A8880] uppercase tracking-widest">{selectedDish.course}</span>
                  <h3 className="font-display italic text-3xl text-black leading-tight">{selectedDish.name}</h3>
                </div>

                <p className="text-xs sm:text-sm text-[#555550] leading-relaxed font-sans font-light">
                  {selectedDish.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-black/8">
                  <div className="flex items-baseline font-mono text-black">
                    <span className="text-xs text-[#8A8880] mr-1">₹</span>
                    <span className="text-xl font-bold">{selectedDish.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        name: selectedDish.name,
                        price: selectedDish.price,
                        isVeg: selectedDish.isVeg,
                        isSpicy: selectedDish.isSpicy
                      });
                      setSelectedDish(null);
                      showToast(`Added ${selectedDish.name} to order`, "success");
                    }}
                    className="px-6 py-3 rounded-full bg-black hover:bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoIdx(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center z-10"
              onKeyDown={(e) => {
                if (e.key === "Escape") setActivePhotoIdx(null);
                if (e.key === "ArrowRight") {
                  setActivePhotoIdx((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
                }
                if (e.key === "ArrowLeft") {
                  setActivePhotoIdx((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
                }
              }}
              tabIndex={0}
            >
              <button
                onClick={() => setActivePhotoIdx(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                onClick={() =>
                  setActivePhotoIdx((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))
                }
                className="absolute -left-4 sm:left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <img
                src={galleryImages[activePhotoIdx]}
                alt={`Lightbox view ${activePhotoIdx + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10"
              />

              <button
                onClick={() =>
                  setActivePhotoIdx((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))
                }
                className="absolute -right-4 sm:right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
