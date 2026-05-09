"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      // Skip the cameraman's shadow from 2.0s to 4.0s
      if (time >= 2.0 && time < 4.0) {
        videoRef.current.currentTime = 4.0;
      }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-[var(--background)]">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Video Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <video
                ref={videoRef}
                src="/resturant.MP4"
                autoPlay
                loop
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-black/10 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none" />
            </motion.div>
            
            {/* Subtle decorative glow to enhance depth */}
            <div className="absolute -inset-10 bg-[var(--accent)]/5 blur-3xl rounded-full -z-10 pointer-events-none" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative z-10 pt-10 lg:pt-0"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[var(--accent)]" />
              <span className="text-[var(--accent)] uppercase tracking-widest text-xs font-medium">Our Story</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              A Taste of Italy, <br />
              <span className="text-neutral-400 italic">Made Fresh Every Day</span>
            </h2>

            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed font-light">
              <p>
                QV Trattoria was created with one goal — to serve authentic Italian food made with care, quality, and freshness.
              </p>
              <p>
                We take pride in making freshly made pasta, handcrafted sauces, and dishes prepared using simple, fresh ingredients. Every recipe is thoughtfully prepared to bring comfort, flavor, and an elevated dining experience to every guest.
              </p>
              <p>
                From creamy Alfredo and rich Bolognese to seafood specialties and classic desserts like Tiramisu, our menu is designed for those who appreciate quality food and authentic flavors.
              </p>
              <p>
                Whether you're joining us for a casual dinner, family gathering, date night, or special occasion, we're here to make every visit memorable.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 pt-10 border-t border-white/10"
            >
              <Image
                src="/QV Final Logo.svg"
                alt="QV Trattoria Logo"
                width={120}
                height={150}
                unoptimized
                className="w-auto h-16 opacity-70"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
