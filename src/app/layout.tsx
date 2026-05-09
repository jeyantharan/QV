import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "QV Trattoria | Authentic Italian Dining in Queensville",
  description: "Experience authentic Italian dining at QV Trattoria in Queensville. Freshly made pasta, premium ingredients, and unforgettable flavors.",
  openGraph: {
    title: "QV Trattoria | Authentic Italian Dining",
    description: "Freshly made pasta, premium ingredients, and unforgettable flavors in Queensville.",
    url: "https://qvtrattoria.com",
    siteName: "QV Trattoria",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} bg-black font-sans text-neutral-200 antialiased relative`}
      >
        <div className="bg-noise fixed inset-0 z-[-1]"></div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
