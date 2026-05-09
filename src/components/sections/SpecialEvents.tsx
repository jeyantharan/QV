"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SpecialEvents() {
  return (
    <section id="events" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Abstract Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[var(--accent)]" />
              <span className="text-[var(--accent)] uppercase tracking-widest text-xs font-medium">Celebrate</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-[1.1]">
              Special <br />
              <span className="italic text-neutral-400">Moments</span>
            </h2>
            
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 font-light">
              From intimate family gatherings to festive holiday celebrations, 
              QV Trattoria provides the perfect backdrop for your most cherished occasions. 
              Our space is designed for comfort, connection, and culinary excellence.
            </p>

            <a
              href="tel:+19054788801"
              className="inline-flex items-center gap-4 text-white group"
            >
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--accent)] transition-colors duration-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] group-hover:scale-150 transition-transform duration-500" />
              </span>
              <span className="uppercase tracking-[0.2em] text-xs font-semibold group-hover:text-[var(--accent)] transition-colors duration-500">
                Inquire About Bookings
              </span>
            </a>
          </motion.div>

          {/* Event Categories - Typographic Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((evt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={cn(
                  "relative p-8 rounded-3xl border transition-all duration-700 group cursor-default h-full flex flex-col",
                  idx === 0 
                    ? "bg-[var(--accent)] border-transparent" 
                    : "bg-white/5 border-white/5 hover:border-white/20"
                )}
              >
                <div className="flex justify-between items-start mb-12">
                  <span className={cn(
                    "font-serif text-4xl italic",
                    idx === 0 ? "text-black/30" : "text-white/10"
                  )}>
                    0{idx + 1}
                  </span>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45",
                    idx === 0 ? "bg-black/10 text-black" : "bg-white/10 text-[var(--accent)]"
                  )}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className={cn(
                    "font-serif text-2xl mb-4 tracking-wide",
                    idx === 0 ? "text-black font-semibold" : "text-white"
                  )}>
                    {evt.title}
                  </h3>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    idx === 0 ? "text-black/70" : "text-neutral-400"
                  )}>
                    {evt.description}
                  </p>
                </div>
                
                {/* Decorative background number/letter for the highlighted one */}
                {idx === 0 && (
                  <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-10">
                    <span className="font-serif text-8xl text-black select-none">Q</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

const events = [
  {
    title: "Seasonal Specials",
    description: "Curated menus featuring the freshest ingredients of the season.",
  },
  {
    title: "Holiday Experiences",
    description: "Celebrate Mother's Day, Christmas, and New Years with us.",
  },
  {
    title: "Tasting Events",
    description: "Exclusive chef-curated tasting menus and wine pairings.",
  }
];
