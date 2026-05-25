'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PosterModal from '@/components/ui/PosterModal';

export default function HighlightsGallery({ initialPosters }: { initialPosters: any[] }) {
  const [viewingItem, setViewingItem] = useState<any | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialPosters.map((poster, index) => (
          <motion.div
            key={poster._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setViewingItem(poster)}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 hover:border-[var(--accent)]/30 transition-all duration-700 cursor-pointer"
          >
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
              <img 
                src={poster.imageUrl} 
                alt={poster.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h4 className="text-2xl font-playfair font-bold text-white">{poster.title}</h4>
              <p className="text-neutral-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">Click to view</p>
            </div>
          </motion.div>
        ))}
      </div>

      <PosterModal item={viewingItem} onClose={() => setViewingItem(null)} />
    </div>
  );
}
