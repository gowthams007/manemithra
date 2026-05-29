import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mane Mithra | Premium Immersive Interior Design Studio",
  description: "Transforming Houses Into Dream Homes. Premium Interior Design & Complete Home Solutions Crafted For Modern Living in Bangalore.",
  keywords: ["Interior Designers Bangalore", "Home Interior Design", "Modular Kitchen", "Residential Interiors", "Luxury Interior Design", "Turnkey Interior Solutions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9F7F4] text-[#1A1A1A] selection:bg-[#D4AF37]/30 selection:text-[#111827]">
        {children}
      </body>
    </html>
  );
}
