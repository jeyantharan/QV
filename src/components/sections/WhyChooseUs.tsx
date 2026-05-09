"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, Award, ChefHat, Heart, Star, CalendarHeart, Wine } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Freshly Made Pasta",
    description: "Prepared daily with care and traditional techniques."
  },
  {
    icon: ChefHat,
    title: "Authentic Recipes",
    description: "Italian-inspired recipes passed down through generations."
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We source only the highest quality simple ingredients."
  },
  {
    icon: Leaf,
    title: "In-House Sauces",
    description: "Every sauce is crafted fresh in our kitchen."
  },
  {
    icon: Wine,
    title: "Elegant Atmosphere",
    description: "A welcoming, high-end environment for your dining."
  },
  {
    icon: Heart,
    title: "Family & Celebrations",
    description: "Perfect for casual dinners and special occasions."
  },
  {
    icon: CalendarHeart,
    title: "Reservation Experience",
    description: "A curated dining journey prepared just for you."
  },
  {
    icon: Star,
    title: "Warm Hospitality",
    description: "Attentive service that treats every guest like family."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-black border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/5 via-black to-black opacity-60" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--accent)] uppercase tracking-widest text-xs font-medium mb-4 block">Our Standard</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Fresh Ingredients. <br className="hidden md:block" />
              <span className="italic text-neutral-400">Authentic Flavors.</span>
            </h2>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={cn(
                "group relative p-8 rounded-2xl bg-[var(--card)] border border-white/5",
                "hover:border-[var(--accent)]/30 hover:bg-white/[0.02] transition-colors duration-500",
                "overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[var(--accent)]/50 transition-all duration-500">
                  <feature.icon className="w-5 h-5 text-[var(--accent-light)]" />
                </div>
                <h3 className="text-white text-lg font-serif mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
