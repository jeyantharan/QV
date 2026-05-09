"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Margaret Z",
    text: "Food has been outstanding, have already been there twice. Calamari perfectly seasoned and tender, all of the pastas so far were delicious, will definitely become a regular dinner spot!!",
    rating: 5,
    date: "Recent Review"
  },
  {
    name: "Kayla Mouzos",
    text: "Delicious food, reasonable prices. Perfect date night spot!",
    rating: 5,
    date: "Recent Review"
  },
  {
    name: "Sleepy Paws Training Resort",
    text: "Had the spinach salad. Best spinach salad I've ever had !! The brushetta was very good. Pasta is fresh made.",
    rating: 5,
    date: "Recent Review"
  }
];

export default function CustomerExperience() {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[var(--accent)] uppercase tracking-widest text-xs font-medium mb-4 block">Testimonials</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Loved by <span className="italic text-neutral-400">Our Guests</span>
            </h2>
            
            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed mb-10 max-w-xl">
              <p>
                We're grateful for the incredible support from our community and the amazing feedback from our guests.
              </p>
              <p>
                From full-house evenings to glowing 5-star reviews, every visit and every shared experience motivates us to continue serving quality food with passion.
              </p>
              <p className="text-white font-medium italic">
                Thank you for supporting local dining and being part of the QV Trattoria family.
              </p>
            </div>
          </motion.div>

          <div className="relative">
            {/* Desktop Decorative Element */}
            <div className="hidden lg:block absolute -inset-10 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-6">
              {testimonials.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-[var(--card)] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-serif text-white text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{review.name}</h4>
                        <span className="text-neutral-500 text-xs">{review.date}</span>
                      </div>
                    </div>
                    {/* Google SVG approximation icon */}
                    <div className="w-6 h-6 opacity-80">
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                    ))}
                  </div>
                  
                  <p className="text-neutral-300 italic text-sm md:text-base">"{review.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
