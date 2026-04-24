'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = scrollTop / scrollHeight;
      setProgress(Math.min(100, Math.max(0, scrollPercent * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div 
        className="h-full bg-[#4FD1FF] transition-all duration-100 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 8px rgba(79, 209, 255, 0.8), 0 0 2px rgba(79, 209, 255, 1)' : 'none'
        }}
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