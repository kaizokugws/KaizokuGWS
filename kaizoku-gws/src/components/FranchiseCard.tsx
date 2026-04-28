'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { franchises } from '@/lib/franchises';

interface FranchiseCardProps {
  franchise: typeof franchises[number];
}

export default function FranchiseCard({ franchise }: FranchiseCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const interval = setInterval(() => {
      if (!isPaused) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % franchise.games.length);
          setIsTransitioning(false);
        }, 400);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [franchise.games.length, isPaused]);

  const dotsToShow = Math.min(franchise.games.length, 8);

  return (
    <Link 
      href={`/pc-games?franchise=${franchise.tag}`}
      aria-label={`View all ${franchise.name} games`}
      className="block"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-xl cursor-pointer group
                    border border-white/10 
                    hover:border-[franchise.accentColor]/60
                    transition-all duration-300
                    hover:shadow-[0_0_20px_rgba(accentColor,0.2)]">
        
        {/* Background image with crossfade */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={`/images/${franchise.games[currentImageIndex]}.jpg`}
              alt={`${franchise.name} - ${currentImageIndex + 1} of ${franchise.games.length}`}
              className="absolute inset-0 w-full h-full object-cover
                        transition-opacity duration-400 ease-in-out
                        group-hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t 
                          from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Franchise name */}
          <h3 className="text-white font-bold text-lg leading-tight
                         drop-shadow-lg">
            {franchise.name}
          </h3>
          {/* Game count badge */}
          <span className="text-xs font-mono mt-1 inline-block
                           text-white/60">
            {franchise.games.length} Games
          </span>
        </div>

        {/* Accent glow line at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]
                     opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300"
          style={{ backgroundColor: franchise.accentColor }}
        />

        {/* Image dot indicators */}
        <div className="absolute top-3 right-3 flex gap-1">
          {Array.from({ length: dotsToShow }, (_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === currentImageIndex % dotsToShow 
                  ? franchise.accentColor 
                  : 'rgba(255,255,255,0.3)',
                transform: i === currentImageIndex % dotsToShow ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>

      </div>
    </Link>
  );
}
