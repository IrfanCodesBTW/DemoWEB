"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users, Gift, Armchair, HelpCircle, CheckCircle, ArrowRight, ArrowLeft, MapPin, Phone, Minus, Plus } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/context/ToastContext";
import confetti from "canvas-confetti";

export default function ReservationsPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    occasion: "None",
    seating: "Main Dining Room",
    requests: "",
  });

  const [partySize, setPartySize] = useState(2);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Input field focus tracking for floating labels
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});

  const timeSlots = [
    { time: "07:30 AM", status: "available" },
    { time: "08:30 AM", status: "full" },
    { time: "09:30 AM", status: "available" },
    { time: "10:30 AM", status: "available" },
    { time: "12:30 PM", status: "available" },
    { time: "01:30 PM", status: "available" },
    { time: "02:30 PM", status: "full" },
    { time: "07:00 PM", status: "available" },
    { time: "08:00 PM", status: "available" },
    { time: "09:00 PM", status: "full" },
    { time: "10:00 PM", status: "available" }
  ];

  const occasions = ["None", "Birthday", "Anniversary", "Business Dinner", "Date Night", "Family Gathering"];
  const seatingPreferences = ["Main Dining Room", "Luxury Family Cabin", "Window-Side View", "Open-Air Terrace"];

  const daysOfWeek = [
    { name: "Monday", hours: "12:00 PM – 10:00 PM" },
    { name: "Tuesday", hours: "12:00 PM – 10:00 PM" },
    { name: "Wednesday", hours: "12:00 PM – 10:00 PM" },
    { name: "Thursday", hours: "12:00 PM – 10:00 PM" },
    { name: "Friday", hours: "12:00 PM – 11:30 PM" },
    { name: "Saturday", hours: "12:00 PM – 11:30 PM" },
    { name: "Sunday", hours: "11:00 AM – 09:00 PM" }
  ];

  const [currentDayName, setCurrentDayName] = useState("");
  useEffect(() => {
    setCurrentDayName(new Date().toLocaleDateString("en-US", { weekday: "long" }));
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.date) newErrors.date = "Please select a booking date";
    if (!formData.time) newErrors.time = "Please select a dining time slot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the validation errors before submitting", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const code = "CF-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(code);
      setBookingConfirmed(true);
      showToast("Table reserved successfully!", "success");

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#111111", "#FAF9F5", "#8A8880"],
      });
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      occasion: "None",
      seating: "Main Dining Room",
      requests: "",
    });
    setPartySize(2);
    setBookingConfirmed(false);
    setBookingRef("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background text-text-primary pb-24">
        {/* Page Header */}
        <section className="relative pt-32 pb-10 overflow-hidden text-center bg-surface border-b border-primary/8">
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
            <span className="text-[10px] tracking-[0.25em] font-mono text-text-muted uppercase block">Reservation Center</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-light italic text-text-primary leading-none">
              Reserve Your Evening
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed font-sans font-light">
              Register table reservations for private dining spaces or open lounge allocations at Kalasiguda, Secunderabad.
            </p>
          </div>
        </section>

        {/* Booking Container (Split Layout) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: Booking Form */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {bookingConfirmed ? (
                /* Success View */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 rounded-2xl border border-primary/8 bg-surface shadow-sm text-center space-y-8"
                >
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-veg/10 border border-veg/20 mx-auto">
                    <CheckCircle className="h-10 w-10 text-veg animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display italic text-3xl font-light text-text-primary">
                      Table Reserved!
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary max-w-xs mx-auto leading-relaxed font-sans font-light">
                      Your dining reservation is registered. Please save your reference ticket below. We look forward to hosting you!
                    </p>
                  </div>

                  {/* Ticket Details */}
                  <div className="bg-background border border-primary/8 rounded-xl p-5 text-left space-y-3 font-mono text-xs text-text-secondary">
                    <div className="flex justify-between border-b border-primary/5 pb-2.5">
                      <span className="text-text-muted">Booking Reference:</span>
                      <span className="text-text-primary font-bold text-sm">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Guest Name:</span>
                      <span className="text-text-primary font-bold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Party Size:</span>
                      <span className="text-text-primary font-bold">{partySize} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Date:</span>
                      <span className="text-text-primary font-bold">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Time Slot:</span>
                      <span className="text-text-primary font-bold">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Seating Pref:</span>
                      <span className="text-text-primary font-bold">{formData.seating}</span>
                    </div>
                    {formData.occasion !== "None" && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Occasion:</span>
                        <span className="text-text-primary font-bold">{formData.occasion}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-light text-background text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer min-h-[48px]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Book Another Table
                  </button>
                </motion.div>
              ) : (
                /* Booking Form View */
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 rounded-2xl border border-primary/8 bg-surface shadow-sm space-y-6"
                >
                  <h3 className="font-display italic text-2xl font-light text-text-primary pb-2 border-b border-primary/5 text-left">
                    Dining Specifications
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="relative border border-primary/10 focus-within:border-primary rounded-lg p-2.5 bg-background transition-colors">
                      <label
                        className={`absolute left-3 transition-all duration-200 font-sans tracking-wide text-xs ${
                          focusState.name || formData.name
                            ? "-top-1.5 bg-background px-1 text-[8px] text-text-muted uppercase"
                            : "top-3.5 text-xs text-text-muted"
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onFocus={() => setFocusState((prev) => ({ ...prev, name: true }))}
                        onBlur={() => setFocusState((prev) => ({ ...prev, name: false }))}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-sm border-none outline-none pt-2 pb-0.5 text-text-primary focus:ring-0"
                      />
                      {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="relative border border-primary/10 focus-within:border-primary rounded-lg p-2.5 bg-background transition-colors">
                      <label
                        className={`absolute left-3 transition-all duration-200 font-sans tracking-wide text-xs ${
                          focusState.email || formData.email
                            ? "-top-1.5 bg-background px-1 text-[8px] text-text-muted uppercase"
                            : "top-3.5 text-xs text-text-muted"
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onFocus={() => setFocusState((prev) => ({ ...prev, email: true }))}
                        onBlur={() => setFocusState((prev) => ({ ...prev, email: false }))}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-sm border-none outline-none pt-2 pb-0.5 text-text-primary focus:ring-0"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="relative border border-primary/10 focus-within:border-primary rounded-lg p-2.5 bg-background transition-colors">
                      <label
                        className={`absolute left-3 transition-all duration-200 font-sans tracking-wide text-xs ${
                          focusState.phone || formData.phone
                            ? "-top-1.5 bg-background px-1 text-[8px] text-text-muted uppercase"
                            : "top-3.5 text-xs text-text-muted"
                        }`}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onFocus={() => setFocusState((prev) => ({ ...prev, phone: true }))}
                        onBlur={() => setFocusState((prev) => ({ ...prev, phone: false }))}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-sm border-none outline-none pt-2 pb-0.5 text-text-primary focus:ring-0"
                        placeholder={focusState.phone ? "e.g. 9876543210" : ""}
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Booking Date */}
                    <div className="relative border border-primary/10 focus-within:border-primary rounded-lg p-2.5 bg-background">
                      <label className="text-[8px] text-text-muted uppercase tracking-wide block mb-1">
                        Booking Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-transparent text-sm border-none outline-none text-text-primary focus:ring-0 cursor-pointer"
                      />
                      {errors.date && <p className="text-[10px] text-red-500 mt-1">{errors.date}</p>}
                    </div>
                  </div>

                  {/* CUSTOM STEPPER: Party Size Selector */}
                  <div className="space-y-2 border-t border-primary/5 pt-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                      <Users className="h-4 w-4 text-text-primary" />
                      Number of Guests *
                    </label>
                    <div className="flex items-center gap-4 bg-background border border-primary/10 rounded-xl p-1 max-w-[200px]">
                      <button
                        type="button"
                        onClick={() => setPartySize((p) => Math.max(1, p - 1))}
                        className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-primary/3 text-text-secondary hover:text-text-primary cursor-pointer"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="flex-1 text-center font-mono font-bold text-sm text-text-primary">
                        {partySize} {partySize === 1 ? "Guest" : "Guests"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPartySize((p) => Math.min(20, p + 1))}
                        className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-primary/3 text-text-secondary hover:text-text-primary cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* VISUAL PICKER: Available Time Slots */}
                  <div className="space-y-2.5 border-t border-primary/5 pt-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                      <Clock className="h-4 w-4 text-text-primary" />
                      Available Dining Hours *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = formData.time === slot.time;
                        const isFull = slot.status === "full";

                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={isFull}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, time: slot.time }));
                              if (errors.time) {
                                setErrors((prev) => {
                                  const copy = { ...prev };
                                  delete copy.time;
                                  return copy;
                                });
                              }
                            }}
                            className={`px-3 py-2 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[38px] border ${
                              isFull
                                ? "bg-surface-2 border-primary/5 text-text-muted/40 line-through cursor-not-allowed"
                                : isSelected
                                ? "bg-primary border-primary text-background"
                                : "bg-background border-primary/10 hover:border-primary text-text-secondary hover:text-text-primary"
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                    {errors.time && <p className="text-[10px] text-red-500">{errors.time}</p>}
                  </div>

                  {/* Seating Preference & Occasions dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-primary/5 pt-4">
                    <div className="space-y-1.5">
                      <label htmlFor="seating" className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                        <Armchair className="h-3.5 w-3.5 text-text-primary" />
                        Seating preferences
                      </label>
                      <select
                        id="seating"
                        name="seating"
                        value={formData.seating}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-background text-xs text-text-primary cursor-pointer focus:outline-none focus:border-primary"
                      >
                        {seatingPreferences.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="occasion" className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                        <Gift className="h-3.5 w-3.5 text-text-primary" />
                        Occasion Selection
                      </label>
                      <select
                        id="occasion"
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-background text-xs text-text-primary cursor-pointer focus:outline-none focus:border-primary"
                      >
                        {occasions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="relative border border-primary/10 focus-within:border-primary rounded-lg p-2.5 bg-background transition-colors border-t border-primary/5 pt-4">
                    <label
                      className={`absolute left-3 transition-all duration-200 font-sans tracking-wide text-xs ${
                        focusState.requests || formData.requests
                          ? "-top-1.5 bg-background px-1 text-[8px] text-text-muted uppercase"
                          : "top-3.5 text-xs text-text-muted"
                      }`}
                    >
                      Special Requests / Cooking Notes
                    </label>
                    <textarea
                      name="requests"
                      value={formData.requests}
                      onFocus={() => setFocusState((prev) => ({ ...prev, requests: true }))}
                      onBlur={() => setFocusState((prev) => ({ ...prev, requests: false }))}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full bg-transparent text-sm border-none outline-none pt-4 pb-0.5 text-text-primary focus:ring-0 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary-light text-background font-semibold uppercase tracking-widest text-xs transition-colors duration-200 disabled:opacity-50 min-h-[48px] cursor-pointer"
                  >
                    {isSubmitting ? "Securing Table Assignment..." : "Confirm Table Reservation"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Coordinates / Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-primary/8 bg-surface space-y-6 flex-1 flex flex-col justify-between text-left">
              <div className="space-y-6">
                <h3 className="font-display italic text-2xl font-light text-text-primary pb-2 border-b border-primary/5">
                  Direct Coordinates
                </h3>

                <ul className="space-y-5 text-xs text-text-secondary">
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 text-text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary uppercase tracking-wider text-[10px]">Our Location</p>
                      <p className="mt-1 leading-relaxed">
                        1-2-40, 41 & 43, Park Ln, Kalasiguda, Secunderabad, Telangana 500003
                      </p>
                      <a
                        href="https://maps.google.com/?q=Park+Lane+Secunderabad+Telangana+500003"
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-primary font-semibold underline block mt-2 hover:text-text-secondary"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-3 items-center">
                    <Phone className="h-5 w-5 text-text-primary shrink-0" />
                    <div>
                      <p className="font-semibold text-text-primary uppercase tracking-wider text-[10px]">Phone Line</p>
                      <a href="tel:+914012345678" className="text-text-primary font-semibold hover:underline block mt-0.5">
                        +91 40 1234 5678
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <Clock className="h-5 w-5 text-text-primary shrink-0 mt-0.5" />
                    <div className="w-full">
                      <p className="font-semibold text-text-primary uppercase tracking-wider text-[10px] mb-2">Operating Hours</p>
                      
                      {/* Weekly Schedule with Today highlighted */}
                      <div className="space-y-1.5 w-full">
                        {daysOfWeek.map((day) => {
                          const isToday = day.name === currentDayName;
                          return (
                            <div
                              key={day.name}
                              className={`flex justify-between font-mono text-[11px] p-1 rounded ${
                                isToday
                                  ? "bg-primary text-background font-bold px-2"
                                  : "text-text-secondary"
                              }`}
                            >
                              <span>{day.name}:</span>
                              <span>{day.hours}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map block with custom styling */}
              <div className="mt-6 border-t border-primary/5 pt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2736239129524!2d78.48154101188371!3d17.446580983377755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a30452d7dd5%3A0xe53bc1be1350a41d!2sPark%20Ln%2C%20Secunderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1716954200000!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cafe Location Map"
                  className="rounded-xl grayscale contrast-125 border border-primary/8 dark:invert dark:hue-rotate-180 dark:opacity-75"
                />
              </div>
            </div>
          </div>

        </section>
      </div>

      <Footer />
    </>
  );
}
