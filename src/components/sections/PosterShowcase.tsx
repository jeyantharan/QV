'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import PosterModal from '@/components/ui/PosterModal';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PosterShowcase({ posters }: { posters: any[] }) {
  const [viewingItem, setViewingItem] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!posters || posters.length === 0) return null;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  }, [posters.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  }, [posters.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const getVisiblePosters = () => {
    const prev = (currentIndex - 1 + posters.length) % posters.length;
    const next = (currentIndex + 1) % posters.length;
    return [
      { item: posters[prev], position: 'left' },
      { item: posters[currentIndex], position: 'center' },
      { item: posters[next], position: 'right' },
    ];
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-10">
      <div className="relative h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
        
        {/* Animated Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-[500px] h-[500px] bg-[var(--accent)]/20 blur-[100px] rounded-full animate-pulse transition-all duration-1000"></div>
        </div>

        <AnimatePresence initial={false} custom={direction}>
          {getVisiblePosters().map((config, i) => (
            <motion.div
              key={`${config.item._id}-${config.position}`}
              custom={direction}
              initial={{ 
                opacity: 0, 
                scale: config.position === 'center' ? 0.8 : 0.6,
                x: config.position === 'left' ? -300 : config.position === 'right' ? 300 : 0
              }}
              animate={{ 
                opacity: config.position === 'center' ? 1 : 0.4,
                scale: config.position === 'center' ? 1 : 0.8,
                x: config.position === 'left' ? -350 : config.position === 'right' ? 350 : 0,
                zIndex: config.position === 'center' ? 20 : 10,
                filter: config.position === 'center' ? 'blur(0px)' : 'blur(4px)',
              }}
              exit={{ 
                opacity: 0,
                scale: 0.6,
                x: direction > 0 
                  ? (config.position === 'left' ? -600 : config.position === 'center' ? -300 : 0)
                  : (config.position === 'right' ? 600 : config.position === 'center' ? 300 : 0)
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 30,
              }}
              onClick={() => config.position === 'center' ? setViewingItem(config.item) : config.position === 'left' ? prevSlide() : nextSlide()}
              className="absolute cursor-pointer w-[280px] md:w-[380px] aspect-[4/5]"
            >
              <div className={`relative w-full h-full rounded-2xl overflow-hidden border ${config.position === 'center' ? 'border-[var(--accent)]/40 shadow-[0_0_50px_rgba(224,175,69,0.2)]' : 'border-white/10'}`}>
                <img 
                  src={config.item.imageUrl} 
                  alt={config.item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Visual Accent for Center Item */}
                {config.position === 'center' && (
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-black/60 backdrop-blur-md border border-[var(--accent)]/30 rounded-full p-2 text-[var(--accent)]">
                      <Sparkles size={16} />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 text-center to-transparent flex flex-col justify-end p-8">
                  <h4 className={`font-playfair font-bold text-white transition-all duration-500 ${config.position === 'center' ? 'text-2xl md:text-3xl opacity-100 translate-y-0' : 'text-xl opacity-0 translate-y-4'}`}>
                    {config.item.title}
                  </h4>
                  {config.position === 'center' && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[var(--accent)] text-xs font-bold tracking-[0.2em] mt-3 uppercase"
                    >
                      Click to View
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation & Controls */}
      <div className="flex flex-col items-center mt-8 space-y-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center gap-3">
            {posters.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`transition-all duration-500 rounded-full ${i === currentIndex ? 'w-10 h-2 bg-[var(--accent)] shadow-[0_0_10px_rgba(224,175,69,0.5)]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <Link 
          href="/highlights"
          className="group flex items-center gap-4 bg-white/5 hover:bg-[var(--accent)]/10 py-4 px-12 rounded-full border border-white/10 hover:border-[var(--accent)]/30 transition-all text-xs font-bold tracking-[0.3em] uppercase text-neutral-300"
        >
          Explore All
          <ArrowRight size={18} className="text-[var(--accent)] group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <PosterModal item={viewingItem} onClose={() => setViewingItem(null)} />
    </div>
  );
}
