"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "glass" | "gold";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle =
    "relative inline-flex items-center justify-center font-semibold uppercase tracking-widest transition-all duration-300 focus-visible-ring cursor-pointer select-none rounded-full disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-accent hover:from-primary-light hover:to-accent-light text-background shadow-lg border border-gold/30 hover:border-gold/50 shadow-primary/10 hover:shadow-primary/20",
    secondary:
      "border border-gold text-gold hover:bg-gold hover:text-background",
    glass:
      "bg-glass border border-glass-border hover:bg-glass-hover text-text-primary hover:border-gold/30",
    gold:
      "bg-gradient-to-r from-gold to-gold-soft text-background hover:brightness-110",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3.5 text-xs",
    lg: "px-8 py-4.5 text-sm",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
