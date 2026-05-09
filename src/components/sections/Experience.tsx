"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Experience() {
  return (
    <section id="experience" className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect via Framer Motion or fixed attachment */}
      <div className="absolute inset-0 z-0 object-fixed">
        <div className="relative w-full h-full">
          <Image
            src="/PHOTO-2026-05-08-08-32-19.jpg"
            alt="Authentic Dining Experience at QV Trattoria"
            fill
            className="object-cover object-center opacity-80"
            sizes="100vw"
            quality={90}
            priority
          />
          {/* Cinematic Vignette blending into sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-black/40 to-[var(--background)] backdrop-blur-[1px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-px bg-[var(--accent)]" />
            <Image
              src="/QV Final Logo.svg"
              alt="QV Logo Mark"
              width={40}
              height={50}
              unoptimized
              className="w-auto h-8 opacity-80"
            />
            <span className="w-16 h-px bg-[var(--accent)]" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8">
            Experience the <span className="italic text-[var(--accent)]">Difference</span>
          </h2>

          <div className="space-y-6 text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            <p>
              At QV Trattoria, we believe good food begins with quality ingredients and genuine passion.
            </p>
            <p>
              Every dish is prepared fresh, every sauce is carefully crafted, and every guest is welcomed like family.
            </p>
            <p className="text-white italic">
              "Our guests appreciate the freshness, quality, and care that go into every plate — and we're proud to create an experience worth coming back for."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
