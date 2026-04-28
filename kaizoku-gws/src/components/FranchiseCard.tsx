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
      className="block group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="relative overflow-hidden rounded-2xl cursor-pointer border border-white/10 
                   transition-all duration-300 ease-out will-change-transform"
        style={{
          '--accent': franchise.accentColor,
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${franchise.accentColor}60`;
          e.currentTarget.style.boxShadow = `0 8px 32px ${franchise.accentColor}20`;
          e.currentTarget.style.transform = 'scale(1.04)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Portrait image container with fixed aspect ratio */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={`/images/${franchise.games[currentImageIndex]}.jpg`}
              alt={`${franchise.name} - ${currentImageIndex + 1} of ${franchise.games.length}`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ 
                opacity: isTransitioning ? 0 : 1,
                scale: isTransitioning ? 1.05 : 1
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              loading="lazy"
            />
          </AnimatePresence>
          
          {/* Multi-layer gradient overlay for premium look */}
          <div className="absolute inset-0 bg-gradient-to-t 
                         from-black/95 via-black/30 to-transparent 
                         pointer-events-none" />
          
          {/* Subtle glassmorphism overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                         transition-opacity duration-500 pointer-events-none
                         bg-gradient-to-br from-white/[0.03] to-transparent" />
        </div>

        {/* Bottom content - repositioned to bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
          <h3 
            className="text-white font-bold text-lg md:text-xl leading-tight mb-1.5"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
          >
            {franchise.name}
          </h3>
          <span 
            className="text-sm font-mono text-white/70"
          >
            {franchise.games.length} Games
          </span>
        </div>

        {/* Accent glow line at bottom with hover reveal */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 
                     group-hover:opacity-100 transition-all duration-500 ease-out"
          style={{ 
            backgroundColor: franchise.accentColor,
            boxShadow: `0 0 12px ${franchise.accentColor}60`
          }}
        />

        {/* Image dot indicators - refined */}
        <div className="absolute top-3 right-3 flex gap-1.5 z-10">
          {Array.from({ length: dotsToShow }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: i === currentImageIndex % dotsToShow 
                  ? franchise.accentColor 
                  : 'rgba(255,255,255,0.3)',
                transform: i === currentImageIndex % dotsToShow ? 'scale(1.4)' : 'scale(1)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                boxShadow: i === currentImageIndex % dotsToShow 
                  ? `0 0 6px ${franchise.accentColor}80` 
                  : 'none'
              }}
            />
          ))}
        </div>

        {/* Optional: Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-700 pointer-events-none
                       overflow-hidden rounded-2xl">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                         transition-transform duration-1000 ease-out
                         bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>

      </div>
    </Link>
  );
}
