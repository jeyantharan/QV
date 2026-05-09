"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    title: "Fresh Pasta Specialties",
    image: "/pasta.png",
    delay: 0.1
  },
  {
    title: "Classic Italian Desserts",
    image: "/desert.png",
    delay: 0.2
  },
  {
    title: "Seafood Creations",
    image: "/seafood_professional.png",
    delay: 0.3
  },
  {
    title: "Signature Appetizers",
    image: "/apper.png",
    delay: 0.4
  }
];

export default function SignatureFavorites() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-[var(--background)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-[var(--accent)] uppercase tracking-widest text-xs font-medium mb-4 block">The Menu</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Crafted Fresh.<br />
              <span className="italic text-neutral-400">Served with Passion.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/main-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[var(--accent)] text-black px-6 py-3 rounded-full font-medium text-sm font-sans uppercase tracking-widest transition-all duration-300 hover:scale-105"
            >
              View Main Menu
            </a>
            <a
              href="/bar-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium text-sm font-sans uppercase tracking-widest transition-all duration-300"
            >
              Bar Menu
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, idx) => (
            <a
              key={idx}
              href="/main-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: category.delay }}
                className="w-full h-full"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  loading="eager"
                />
                {/* Premium Card Structure */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Subtle Gold Ring on Hover */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-[var(--accent)]/40 rounded-2xl transition-colors duration-700 z-20 pointer-events-none" />

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                  {/* Text Container with slight glassmorphism on hover */}
                  <div className="relative p-6 -m-6 rounded-xl overflow-hidden translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="w-8 h-px bg-[var(--accent)] block mb-4 transition-all duration-700 group-hover:w-16 shadow-[0_0_10px_var(--accent)]" />
                      <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 drop-shadow-md">{category.title}</h3>
                      <p className="text-[var(--accent)] text-sm font-light uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
                        Signature Selection
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
