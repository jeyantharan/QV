"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Premium Italian Pasta"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-[var(--accent)] font-serif italic text-xl md:text-2xl mb-6 tracking-wide">
            “Freshly made pasta, simple ingredients, and unforgettable flavors.”
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-glow leading-tight mb-8"
        >
          Authentic Italian
          <br className="hidden md:block" />
          <span className="text-white"> Dining in Queensville</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-neutral-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12"
        >
          At QV Trattoria, every plate is crafted with passion using fresh ingredients, 
          homemade sauces, and authentic Italian recipes. 
          <span className="hidden md:inline"> From rich pasta dishes to handcrafted appetizers, we bring people together over quality food.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="tel:+19054788801"
            className="group relative inline-flex items-center justify-center gap-3 bg-[var(--accent)] text-black px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-x-0 bottom-0 h-0 bg-white/20 transition-all group-hover:h-full" />
            <Phone className="w-5 h-5 relative z-10" />
            <span className="relative z-10 uppercase tracking-wider text-sm font-semibold">Call Now</span>
          </a>
          
          <a
            href="#menu"
            className="group relative inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-white/10 hover:border-white/40"
          >
            <span className="relative z-10 uppercase tracking-wider text-sm font-semibold">View Menu</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator components */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[var(--accent)] text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--accent)] opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
