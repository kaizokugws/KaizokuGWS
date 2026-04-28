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
      <div 
        className="relative overflow-hidden rounded-2xl cursor-pointer group border"
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: '1px',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${franchise.accentColor}60`;
          e.currentTarget.style.boxShadow = `0 0 20px rgba(${franchise.accentColor.replace('#', '')},0.2)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Background image with crossfade - SHORTER height */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={`/images/${franchise.games[currentImageIndex]}.jpg`}
              alt={`${franchise.name} - ${currentImageIndex + 1} of ${franchise.games.length}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              style={{ transition: 'opacity 0.4s ease-in-out' }}
            />
          </AnimatePresence>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t 
                          from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Franchise name */}
          <h3 
            className="text-[#E6EDF3] font-bold text-xl leading-tight"
                         style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
          >
            {franchise.name}
          </h3>
          {/* Game count badge */}
          <span 
            className="text-sm font-mono mt-1.5 inline-block text-[#9AA4AF]"
          >
            {franchise.games.length} Games
          </span>
        </div>

        {/* Accent glow line at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ 
            backgroundColor: franchise.accentColor,
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
        />

        {/* Image dot indicators */}
        <div className="absolute top-3 right-3 flex gap-1.5">
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
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

      </div>
    </Link>
  );
}
