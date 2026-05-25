'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface PosterModalProps {
  item: any | null;
  onClose: () => void;
}

export default function PosterModal({ item, onClose }: PosterModalProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative pointer-events-auto max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20"
            >
              <XCircle size={24} />
            </button>
            
            <div className="flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="max-w-full max-h-[80vh] block object-contain"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-playfair font-bold text-glow mb-1">{item.title}</h3>
                <p className="text-xs text-neutral-500 uppercase tracking-widest">Added {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
