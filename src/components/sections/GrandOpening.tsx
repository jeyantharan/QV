"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

export default function GrandOpening() {
  return (
    <section className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#E0AF4515,transparent_60%)]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text Content - Left Side (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-3 mb-8 bg-[var(--accent)]/10 px-4 py-2 rounded-full border border-[var(--accent)]/20">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-[var(--accent)] uppercase tracking-[0.2em] text-[10px] font-bold">Official Launch Event</span>
            </div>

            <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-[1.1]">
              The Wait <br />
              <span className="italic text-neutral-400 font-light">Is Over.</span>
            </h2>

            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed mb-10">
              <p>
                The time has finally come: <span className="text-white font-medium">QV Trattoria is opening its doors!</span>
              </p>
              <p className="font-light">
                Join us for an evening of fresh pastas, fine wine, and authentic flavors in the heart of Queensville. 
                Bring your loved ones and let's celebrate together.
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 gap-6 mb-12">
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/30 transition-colors group">
                <Calendar className="w-6 h-6 text-[var(--accent)]" />
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-0.5">When</p>
                  <p className="text-white font-medium">Wednesday, May 27 @ 4:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/30 transition-colors group">
                <MapPin className="w-6 h-6 text-[var(--accent)]" />
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-0.5">Where</p>
                  <p className="text-white font-medium">20497 Leslie St, Queensville</p>
                </div>
              </div>
            </div>

            <p className="text-[var(--accent)] font-serif italic text-xl">
              "We can't wait to serve you."
            </p>
          </motion.div>

          {/* Image Poster - Right Side (60%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 order-1 lg:order-2 w-full flex justify-center"
          >
            <div className="relative w-full max-w-[550px] group">
              {/* Outer soft glow based on image presence */}
              <div className="absolute -inset-4 bg-[var(--accent)]/10 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                <img 
                  src="/grand.jpg" 
                  alt="Grand Opening Poster" 
                  className="w-full h-auto block"
                />
                
                {/* Visual Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              
              {/* Floating Element for Creativity */}
              <div className="absolute -bottom-6 -right-6 lg:-right-10 w-24 h-24 lg:w-32 lg:h-32 bg-[var(--background)] border border-white/10 rounded-full flex flex-col items-center justify-center text-center p-2 shadow-2xl backdrop-blur-md">
                <span className="text-[var(--accent)] font-serif italic text-lg lg:text-2xl leading-none">May</span>
                <span className="text-white font-bold text-xl lg:text-3xl leading-none">27</span>
                <div className="w-8 h-px bg-white/20 my-1 md:my-2" />
                <span className="text-neutral-400 uppercase tracking-tighter text-[8px] lg:text-[10px] font-bold">Save the date</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
