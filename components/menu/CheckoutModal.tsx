"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, CreditCard, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import confetti from "canvas-confetti";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { total, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "dinein", // dinein | takeaway | delivery
    address: "",
    tableNum: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (formData.type === "dinein" && !formData.tableNum.trim()) {
      newErrors.tableNum = "Table Number is required for dine-in";
    }

    if (formData.type === "delivery" && !formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

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
      showToast("Please check the form for errors", "error");
      return;
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Order placed successfully! Preparing your feast.", "success");

      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#111111", "#FAF9F5", "#8A8880"],
      });
    }, 1800);
  };

  const handleFinish = () => {
    clearCart();
    setIsSuccess(false);
    onSuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isSuccess ? undefined : onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-primary/8 bg-background shadow-2xl z-10 text-text-primary"
          >
            {/* Success View */}
            {isSuccess ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-6">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-veg/10 border border-veg/20">
                  <CheckCircle className="h-10 w-10 text-veg" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border border-veg/20"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display italic text-2xl font-light text-text-primary">
                    Order Confirmed!
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto font-sans font-light">
                    Thank you for dining with us. Your culinary journey is being prepared by our master chefs.
                  </p>
                </div>

                <div className="w-full bg-surface p-5 rounded-xl border border-primary/8 space-y-3 text-left text-xs font-mono text-text-secondary">
                  <div className="flex justify-between">
                    <span>Order Name:</span>
                    <span className="text-text-primary font-bold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining Type:</span>
                    <span className="text-text-primary font-bold uppercase">{formData.type}</span>
                  </div>
                  {formData.type === "dinein" && (
                    <div className="flex justify-between">
                      <span>Table Number:</span>
                      <span className="text-text-primary font-bold">{formData.tableNum}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-primary/5 pt-2 font-bold text-sm">
                    <span>Amount Paid:</span>
                    <span className="text-text-primary">₹{total}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-light text-background font-semibold uppercase tracking-widest text-xs shadow-md transition-colors cursor-pointer min-h-[44px]"
                >
                  Return to Menu
                </button>
              </div>
            ) : (
              /* Checkout Form View */
              <form onSubmit={handleSubmit} className="flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary/8 shrink-0">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-text-primary" />
                    <h2 className="font-display text-lg font-semibold uppercase tracking-wider">Checkout</h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-full border border-primary/8 hover:bg-primary/3 text-text-primary transition-colors cursor-pointer"
                    aria-label="Close checkout"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface text-left">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-primary/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                      placeholder="e.g. Rahul Sharma"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-primary/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                        placeholder="e.g. rahul@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-primary/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                        placeholder="10-digit mobile"
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Service Type Selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="type" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Dining Option *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-primary/10 text-sm text-text-primary focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="dinein">Dine-In (At Table)</option>
                      <option value="takeaway">Takeaway (Self Pick-up)</option>
                      <option value="delivery">Home Delivery</option>
                    </select>
                  </div>

                  {/* Conditional Table Number */}
                  {formData.type === "dinein" && (
                    <div className="space-y-1.5">
                      <label htmlFor="tableNum" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Table Number *
                      </label>
                      <input
                        type="text"
                        id="tableNum"
                        name="tableNum"
                        value={formData.tableNum}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-primary/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                        placeholder="e.g. Table 12"
                      />
                      {errors.tableNum && <p className="text-[10px] text-red-500 font-medium">{errors.tableNum}</p>}
                    </div>
                  )}

                  {/* Conditional Address */}
                  {formData.type === "delivery" && (
                    <div className="space-y-1.5">
                      <label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Delivery Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-primary/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
                        placeholder="Enter full delivery address"
                      />
                      {errors.address && <p className="text-[10px] text-red-500 font-medium">{errors.address}</p>}
                    </div>
                  )}

                  {/* Special Notes */}
                  <div className="space-y-1.5">
                    <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Special Cooking Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-primary/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
                      placeholder="e.g. Make it extra spicy / No onions"
                    />
                  </div>
                </div>

                {/* Footer Submitting */}
                <div className="p-6 border-t border-primary/8 bg-background flex items-center justify-between shrink-0">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Total Payable</p>
                    <p className="text-xl font-bold font-mono text-text-primary">₹{total}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-background text-xs font-semibold uppercase tracking-widest shadow-md disabled:opacity-50 transition-all duration-300 cursor-pointer min-h-[44px]"
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
