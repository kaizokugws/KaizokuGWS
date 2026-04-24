'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const clampedPercent = Math.min(100, Math.max(0, scrollPercent));
      
      if (barRef.current) {
        barRef.current.style.width = `${clampedPercent}%`;
      }
      rafRef.current = null;
    };

    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div 
        ref={barRef}
        className="h-full bg-[#4FD1FF] will-change-[width] scroll-progress-bar"
        style={{ boxShadow: '0 0 8px rgba(79, 209, 255, 0.8), 0 0 2px rgba(79, 209, 255, 1)' }}
      />
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center bg-[#4FD1FF] text-[#0B0D10] rounded-full shadow-[0_0_20px_rgba(79,209,255,0.4)] hover:shadow-[0_0_30px_rgba(79,209,255,0.6)] hover:scale-110 transition-all duration-200"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}