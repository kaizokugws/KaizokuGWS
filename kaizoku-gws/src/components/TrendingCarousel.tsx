"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Item } from "@/lib/types";

const TrendingCarousel = ({
  items,
  category,
  className,
}: {
  items: Item[];
  category: string;
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragRef = useRef({ isDragging: false, startX: 0, currentX: 0, wasDragged: false });

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  const endDrag = useCallback(() => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    const delta = dragRef.current.currentX - dragRef.current.startX;
    if (Math.abs(delta) > 50) {
      dragRef.current.wasDragged = true;
      if (delta < 0) next();
      else prev();
    }
  }, [next, prev]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { isDragging: true, startX: e.clientX, currentX: e.clientX, wasDragged: false };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.currentX = e.clientX;
  };

  const handleMouseUp = endDrag;
  const handleMouseLeave = endDrag;

  const handleTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { isDragging: true, startX: e.touches[0].clientX, currentX: e.touches[0].clientX, wasDragged: false };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.currentX = e.touches[0].clientX;
  };

  const handleTouchEnd = endDrag;

  const handleLinkClick = (e: React.MouseEvent) => {
    if (dragRef.current.wasDragged) {
      e.preventDefault();
      dragRef.current.wasDragged = false;
    }
  };

  const getIndex = (offset: number) =>
    (activeIndex + offset + items.length) % items.length;

  return (
    <div className={cn("relative w-full animate-fadeIn select-none", className)}>
      <div
        className="relative h-[320px] overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-center h-full">
          {items.map((item, i) => {
            const offset = ((i - activeIndex + items.length) % items.length);
            const isCenter = offset === 0;
            const distance = Math.min(offset, items.length - offset);
            const scale = isCenter ? 1 : Math.max(0.7, 1 - distance * 0.15);
            const zIndex = isCenter ? 10 : 10 - distance;

            return (
              <Link
                key={item.slug}
                href={`/${category}/${item.slug}`}
                onClick={handleLinkClick}
                className="absolute rounded-xl overflow-hidden transition-all duration-500 ease-out group"
                style={{
                  width: isCenter ? '280px' : `${220 - distance * 30}px`,
                  height: isCenter ? '320px' : `${280 - distance * 40}px`,
                  transform: `translateX(${offset === 0 ? 0 : offset < items.length / 2 ? 120 + (distance - 1) * 80 : -(120 + (distance - 1) * 80)}px) scale(${scale})`,
                  opacity: isCenter ? 1 : Math.max(0.3, 1 - distance * 0.25),
                  zIndex,
                }}
              >
                <Image
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg text-white truncate">
                    {item.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeIndex ? "w-8 bg-[#4FD1FF]" : "w-2 bg-[#333] hover:bg-[#555]"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export { TrendingCarousel };