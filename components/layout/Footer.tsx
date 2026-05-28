"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, UtensilsCrossed } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com",
      svg: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      svg: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      svg: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-surface border-t border-border-custom pt-14 sm:pt-16 pb-8 px-4 md:px-8 z-10">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] pointer-events-none gold-glow opacity-10 -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
        {/* Info Column */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 border border-border-custom">
              <UtensilsCrossed className="h-5 w-5 text-text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-wider text-text-primary">CAFE</span>
              <span className="text-[9px] tracking-[0.25em] font-mono text-text-secondary -mt-1 uppercase">
                Multi Cuisine
              </span>
            </div>
          </Link>
          <p className="text-xs text-text-muted leading-relaxed">
            Luxury Indian Fusion × Modern Premium Dining. Experience hand-crafted dishes curated by culinary masterminds.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-border-custom hover:border-primary/20 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-200 focus-visible-ring cursor-pointer"
                aria-label={`Visit our ${social.name} page`}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-text-primary">Explore</h3>
          <ul className="space-y-2.5 text-xs text-text-secondary">
            <li>
              <Link href="/" className="hover:text-primary transition-colors duration-200 focus-visible-ring cursor-pointer py-1 inline-block">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-primary transition-colors duration-200 focus-visible-ring cursor-pointer py-1 inline-block">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors duration-200 focus-visible-ring cursor-pointer py-1 inline-block">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/reservations" className="hover:text-primary transition-colors duration-200 focus-visible-ring cursor-pointer py-1 inline-block">
                Book a Table
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors duration-200 focus-visible-ring cursor-pointer py-1 inline-block">
                Contact & Find Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Timings */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-text-primary">Dining Hours</h3>
          <ul className="space-y-3 text-xs text-text-secondary">
            <li className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-text-primary">Breakfast (South Indian)</p>
                <p className="text-text-muted mt-0.5">07:30 AM – 10:30 AM</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-text-primary">All-Day Dining</p>
                <p className="text-text-muted mt-0.5">07:00 AM – 11:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-text-primary">Get In Touch</h3>
          <ul className="space-y-3 text-xs text-text-secondary">
            <li className="flex gap-2.5">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                1-2-40, 41 & 43, Park Ln, Kalasiguda, Secunderabad, Telangana 500003
              </span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a href="tel:+914012345678" className="hover:text-primary transition-colors duration-200 focus-visible-ring cursor-pointer">
                +91 40 1234 5678
              </a>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a href="mailto:info@cafemulticuisine.com" className="hover:text-primary transition-colors duration-200 focus-visible-ring cursor-pointer">
                info@cafemulticuisine.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div className="max-w-7xl mx-auto border-t border-border-custom pt-8 text-center text-[11px] text-text-muted font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {currentYear} Cafe The Multi Cuisine Restaurant. All rights reserved.</p>
        <p className="tracking-wide">
          Designed for Premium Culinary Experiences
        </p>
      </div>
    </footer>
  );
};
