"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
];

const menuLinks = [
  { name: "Main Menu", href: "/main-menu.pdf" },
  { name: "Bar Menu", href: "/bar-menu.pdf" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl relative flex items-center justify-between">
          <Link href="/" className="z-50 shrink-0">
            <Image
              src="/QV Final Logo.svg"
              alt="QV Trattoria Logo"
              width={160}
              height={200}
              priority
              unoptimized
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-14" : "h-20"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            <div 
              className="relative group"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 text-neutral-300 hover:text-[var(--accent)] transition-colors tracking-wide text-sm font-medium uppercase",
                  isMenuOpen && "text-[var(--accent)]"
                )}
              >
                Menu
                <motion.span
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  className="inline-block"
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48"
                  >
                    <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden py-2 shadow-2xl">
                      {menuLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-6 py-3 text-sm text-neutral-300 hover:text-[var(--accent)] hover:bg-white/5 transition-all"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-300 hover:text-[var(--accent)] transition-colors tracking-wide text-sm font-medium uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+19054788801"
              className="flex items-center gap-2 group border border-[var(--accent)]/30 bg-[var(--accent)]/5 hover:bg-[var(--accent)]/15 text-[var(--accent)] px-5 py-2.5 rounded-full transition-all duration-300"
            >
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="font-medium tracking-wide text-sm">+1 905 478 8801</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 z-50 text-[var(--accent)]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-28 px-6 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              <div className="flex flex-col gap-4 mb-2">
                <span className="text-[var(--accent)] uppercase tracking-widest text-xs font-medium">Digital Menus</span>
                {menuLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif text-neutral-200 hover:text-[var(--accent)]"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              <div className="h-px w-16 bg-white/10 mx-auto my-2" />

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-neutral-200 hover:text-[var(--accent)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-16 bg-[var(--border)] mx-auto my-4" />
              <a
                href="tel:+19054788801"
                className="flex items-center justify-center gap-2 text-[var(--accent)] text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>+1 905 478 8801</span>
              </a>
              <p className="text-neutral-500 text-sm mt-4">
                20497 Leslie St, Queensville
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
