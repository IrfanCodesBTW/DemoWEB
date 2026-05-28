import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary selection:bg-primary selection:text-background transition-colors duration-300">
        <ThemeProvider>
          <CartProvider>
            <ToastProvider>
              <CustomCursor />
              {children}
            </ToastProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
