'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Item } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PerspectiveCarouselProps {
  items: Item[];
  category: string;
  className?: string;
}

export function PerspectiveCarousel({ items, category, className }: PerspectiveCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slide = (dir: 'left' | 'right') => {
    setActiveIndex((prev) => {
      if (dir === 'left') {
        return (prev - 1 + items.length) % items.length;
      }
      return (prev + 1) % items.length;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const moveLeft = () => slide('left');
  const moveRight = () => slide('right');

  return (
    <div className={cn("relative w-full max-w-5xl mx-auto perspective-carousel", className)}>
      <div className="relative h-[420px] flex items-center justify-center overflow-hidden">
        <button onClick={moveLeft} className="absolute left-4 z-50 w-12 h-12 rounded-full bg-[#141414]/90 border border-[#333] flex items-center justify-center text-white hover:bg-[#ff3e3e] transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative flex items-center justify-center w-full h-full">
          {[...Array(5)].map((_, offsetIdx) => {
            const itemIdx = (activeIndex + offsetIdx - 2 + items.length) % items.length;
            const item = items[itemIdx];
            const isCenter = offsetIdx === 2;
            const isLeft = offsetIdx < 2;
            const isRight = offsetIdx > 2;
            
            return (
              <Link
                key={`${item.slug}-${offsetIdx}-${activeIndex}`}
                href={`/${category}/${item.slug}`}
                className={cn(
                  "absolute rounded-xl overflow-hidden shadow-2xl",
                  isCenter && "z-30",
                  (isLeft && offsetIdx === 1) || (isRight && offsetIdx === 3) && "z-20",
                  (isLeft && offsetIdx === 0) || (isRight && offsetIdx === 4) && "z-10"
                )}
                style={{
                  width: isCenter ? '240px' : (offsetIdx === 1 || offsetIdx === 3) ? '200px' : '160px',
                  height: isCenter ? '320px' : (offsetIdx === 1 || offsetIdx === 3) ? '260px' : '200px',
                  transform: `translateX(${
                    isCenter ? 0 :
                    offsetIdx === 1 ? 80 :
                    offsetIdx === 3 ? -80 :
                    offsetIdx === 0 ? 160 :
                    offsetIdx === 4 ? -160 : 0
                  }px) scale(${
                    isCenter ? 1 :
                    offsetIdx === 1 || offsetIdx === 3 ? 0.85 :
                    0.7
                  })`,
                  opacity: isCenter ? 1 : (offsetIdx === 1 || offsetIdx === 3) ? 0.8 : 0.4,
                  transition: 'transform 500ms ease-out, opacity 500ms ease-out, left 500ms ease-out, right 500ms ease-out',
                }}
              >
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className={cn("font-bold text-white truncate", isCenter ? "text-xl" : "text-sm")}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400">{item.category}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <button onClick={moveRight} className="absolute right-4 z-50 w-12 h-12 rounded-full bg-[#141414]/90 border border-[#333] flex items-center justify-center text-white hover:bg-[#ff3e3e] transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => slide(idx > activeIndex ? 'right' : 'left')}
            className={cn(
              "h-2 rounded-full transition-all",
              idx === activeIndex ? "w-10 bg-[#ff3e3e]" : "w-2 bg-[#333] hover:bg-[#444]"
            )}
          />
        ))}
      </div>
    </div>
  );
}