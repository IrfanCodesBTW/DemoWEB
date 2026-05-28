import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cafe The Multi Cuisine Restaurant | Luxury Indian Fusion & Fine Dining",
  description: "Experience premium multi-cuisine fine dining at Cafe The Multi Cuisine Restaurant. Savour luxury Indian Fusion, authentic Chinese, South Indian, Oriental, and Continental culinary art in Secunderabad.",
  keywords: [
    "Cafe The Multi Cuisine Restaurant",
    "Secunderabad Restaurants",
    "Luxury Dining Hyderabad",
    "Indian Fusion Cuisine",
    "Chinese Starters",
    "South Indian Breakfast",
    "Oriental Main Course",
    "Continental Desserts",
    "Park Lane Kalasiguda",
  ],
  authors: [{ name: "Cafe The Multi Cuisine Restaurant" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111] selection:bg-black selection:text-white">
        <CartProvider>
          <ToastProvider>
            <CustomCursor />
            {children}
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
