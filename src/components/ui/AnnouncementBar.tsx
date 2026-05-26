"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="absolute top-0 left-0 right-0 h-8 md:h-10 bg-[var(--accent)] text-black flex items-center justify-center z-[60] overflow-hidden"
    >
      <div className="container mx-auto flex items-center justify-center gap-4">
        <Sparkles className="w-4 h-4 animate-pulse hidden sm:block" />
        <p className="text-xs md:text-sm font-bold tracking-widest uppercase">
          ✨ The wait is over: QV Trattoria is officially opening May 27 @ 4 PM! ✨
        </p>
        <Sparkles className="w-4 h-4 animate-pulse hidden sm:block" />
      </div>
      
      {/* Moving shine effect */}
      <motion.div 
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
      />
    </motion.div>
  );
}
