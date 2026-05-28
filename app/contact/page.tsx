"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock, Send, Globe, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();

  const handleQuickAction = (action: string) => {
    if (action === "map") {
      window.open("https://maps.google.com/?q=Park+Lane+Secunderabad+Telangana+500003", "_blank");
    } else {
      showToast(`${action} action triggered successfully`, "info");
    }
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Message sent successfully! We will write back soon.", "success");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background text-text-primary pb-24">
        {/* Page Header */}
        <section className="relative pt-32 pb-10 overflow-hidden text-center bg-surface border-b border-border-custom">
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
            <span className="text-[10px] tracking-[0.25em] font-mono text-text-muted uppercase block">Connect With Us</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-light italic text-text-primary leading-none">
              Contact & Directions
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed font-sans font-light">
              Find our coordinates, verify our operational schedules, or drop us a quick query. Located at Park Lane, Secunderabad.
            </p>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Details column */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            {/* Quick Actions Card */}
            <div className="p-6 rounded-2xl border border-border-custom bg-surface flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <h2 className="font-display italic text-2xl font-light text-text-primary pb-2 border-b border-border-custom">
                  Direct Coordinates
                </h2>

                <ul className="space-y-4 text-xs text-text-secondary">
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 text-text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary uppercase tracking-wider text-[10px]">Our Location</p>
                      <p className="mt-1 leading-relaxed">
                        1-2-40, 41 & 43, Park Ln, Kalasiguda, Secunderabad, Telangana 500003
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Phone className="h-5 w-5 text-text-primary shrink-0" />
                    <div>
                      <p className="font-semibold text-text-primary uppercase tracking-wider text-[10px]">Phone Lines</p>
                      <a href="tel:+914012345678" className="hover:text-primary font-semibold mt-0.5 block transition-colors">
                        +91 40 1234 5678
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Mail className="h-5 w-5 text-text-primary shrink-0" />
                    <div>
                      <p className="font-semibold text-text-primary uppercase tracking-wider text-[10px]">Email Coordinates</p>
                      <a href="mailto:info@cafemulticuisine.com" className="hover:text-primary font-semibold mt-0.5 block transition-colors">
                        info@cafemulticuisine.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="h-5 w-5 text-text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary uppercase tracking-wider text-[10px]">Operating Hours</p>
                      <p className="mt-1 text-text-secondary font-sans font-light">Breakfast: 07:30 AM – 10:30 AM</p>
                      <p className="text-text-secondary font-sans font-light">All-Day Dining: 07:00 AM – 11:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Actions Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border-custom">
                <button
                  onClick={() => handleQuickAction("map")}
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-primary/15 text-text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-background transition-colors duration-200 cursor-pointer focus-visible-ring min-h-[44px]"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Get Directions
                </button>
                <a
                  href="tel:+914012345678"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-primary hover:bg-primary-light text-background text-[10px] font-bold uppercase tracking-wider shadow-md transition-colors duration-200 cursor-pointer text-center focus-visible-ring min-h-[44px]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Host
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="p-6 rounded-2xl border border-border-custom bg-surface">
              <h3 className="font-display italic text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-text-primary" />
                Quick Message
              </h3>
              <form onSubmit={handleMessageSubmit} className="space-y-3.5">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border-custom text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:bg-surface-2 transition-all"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border-custom text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:bg-surface-2 transition-all"
                />
                <textarea
                  required
                  placeholder="Write your message..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border-custom text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:bg-surface-2 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/15 hover:border-primary bg-background hover:bg-primary hover:text-background text-[10px] font-bold uppercase tracking-wider text-text-secondary transition-colors duration-200 cursor-pointer focus-visible-ring min-h-[44px]"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Coordinates
                </button>
              </form>
            </div>
          </div>

          {/* Maps Column */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-border-custom bg-surface min-h-[350px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2736239129524!2d78.48154101188371!3d17.446580983377755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a30452d7dd5%3A0xe53bc1be1350a41d!2sPark%20Ln%2C%20Secunderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1716954200000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cafe Location Map"
              className="absolute inset-0 grayscale contrast-125 opacity-90 dark:invert dark:hue-rotate-180 dark:opacity-75"
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
