"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const animatingRef = useRef(false);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    previousX: 0,
    velocity: 0,
    wasDragged: false,
  });

  const itemCount = items.length;

  const cleanupAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    animatingRef.current = false;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animatingRef.current || dragRef.current.isDragging) return;
      cleanupAnimation();
      animatingRef.current = true;
      setActiveIndex(((index % itemCount) + itemCount) % itemCount);
      timeoutRef.current = setTimeout(() => {
        animatingRef.current = false;
        timeoutRef.current = undefined;
      }, 500);
    },
    [itemCount, cleanupAnimation]
  );

  const next = useCallback(() => {
    if (animatingRef.current || dragRef.current.isDragging) return;
    cleanupAnimation();
    animatingRef.current = true;
    setActiveIndex((prev) => ((prev + 1) % itemCount + itemCount) % itemCount);
    timeoutRef.current = setTimeout(() => {
      animatingRef.current = false;
      timeoutRef.current = undefined;
    }, 500);
  }, [itemCount, cleanupAnimation]);

  const prev = useCallback(() => {
    if (animatingRef.current || dragRef.current.isDragging) return;
    cleanupAnimation();
    animatingRef.current = true;
    setActiveIndex((prev) => ((prev - 1) % itemCount + itemCount) % itemCount);
    timeoutRef.current = setTimeout(() => {
      animatingRef.current = false;
      timeoutRef.current = undefined;
    }, 500);
  }, [itemCount, cleanupAnimation]);

  const resetAutoplay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(next, 3000);
  }, [next]);

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      cleanupAnimation();
    };
  }, [next, cleanupAnimation]);

  const commitDrag = useCallback(() => {
    const drag = dragRef.current;
    if (!drag.isDragging) return;
    drag.isDragging = false;

    const delta = drag.currentX - drag.startX;
    const absDelta = Math.abs(delta);

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    if (absDelta > 50 || (Math.abs(drag.velocity) > 0.5 && absDelta > 20)) {
      drag.wasDragged = true;
      resetAutoplay();
      if (delta < 0) next();
      else prev();
    }

    if (trackRef.current) {
      const duration = Math.min(400, 150 + absDelta * 1.5);
      trackRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      trackRef.current.style.transform = "translate3d(0px, 0, 0)";
    }
  }, [next, prev, resetAutoplay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.isDragging) return;
      const dx = Math.abs(e.touches[0].clientX - dragRef.current.startX);
      const dy = Math.abs(e.touches[0].clientY - dragRef.current.startY);
      if (dx > dy && dx > 10) {
        e.preventDefault();
      }
    };

    container.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => container.removeEventListener("touchmove", onTouchMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        resetAutoplay();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        resetAutoplay();
        next();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [next, prev, resetAutoplay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const preventDrag = (e: Event) => e.preventDefault();
    const imgs = container.querySelectorAll("img");
    imgs.forEach((img) => img.addEventListener("dragstart", preventDrag));
    return () => {
      imgs.forEach((img) => img.removeEventListener("dragstart", preventDrag));
    };
  }, [items]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (animatingRef.current) return;
    const drag = dragRef.current;
    drag.isDragging = true;
    drag.startX = e.clientX;
    drag.startY = e.clientY;
    drag.currentX = e.clientX;
    drag.previousX = e.clientX;
    drag.velocity = 0;
    drag.wasDragged = false;

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return;
    const drag = dragRef.current;
    drag.velocity = e.clientX - drag.previousX;
    drag.previousX = e.clientX;
    drag.currentX = e.clientX;

    const delta = e.clientX - drag.startX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${delta}px, 0, 0)`;
    }
  };

  const handleMouseUp = () => {
    commitDrag();
  };

  const handleMouseLeave = () => {
    if (!dragRef.current.isDragging) return;
    commitDrag();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (animatingRef.current) return;
    const touch = e.touches[0];
    const drag = dragRef.current;
    drag.isDragging = true;
    drag.startX = touch.clientX;
    drag.startY = touch.clientY;
    drag.currentX = touch.clientX;
    drag.previousX = touch.clientX;
    drag.velocity = 0;
    drag.wasDragged = false;

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.isDragging) return;
    const touch = e.touches[0];
    const drag = dragRef.current;
    drag.velocity = touch.clientX - drag.previousX;
    drag.previousX = touch.clientX;
    drag.currentX = touch.clientX;

    const delta = touch.clientX - drag.startX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${delta}px, 0, 0)`;
    }
  };

  const handleTouchEnd = () => {
    commitDrag();
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (dragRef.current.wasDragged) {
      e.preventDefault();
      dragRef.current.wasDragged = false;
    }
  };

  const getItemStyle = useCallback(
    (index: number) => {
      const offset = ((index - activeIndex + itemCount) % itemCount);
      const isCenter = offset === 0;
      const distance = Math.min(offset, itemCount - offset);
      const scale = isCenter ? 1 : Math.max(0.7, 1 - distance * 0.15);
      const zIndex = isCenter ? 10 : 10 - distance;

      const xPos =
        offset === 0
          ? 0
          : offset < itemCount / 2
            ? 120 + (distance - 1) * 80
            : -(120 + (distance - 1) * 80);

      return {
        width: isCenter ? "280px" : `${220 - distance * 30}px`,
        height: isCenter ? "320px" : `${280 - distance * 40}px`,
        transform: `translate3d(${xPos}px, 0, 0) scale(${scale})`,
        opacity: isCenter ? 1 : Math.max(0.3, 1 - distance * 0.25),
        zIndex,
      } as const;
    },
    [activeIndex, itemCount]
  );

  if (itemCount === 0) return null;

  return (
    <div className={cn("relative w-full animate-fadeIn select-none", className)}>
      <div
        className="relative h-[320px] overflow-hidden"
        tabIndex={0}
        role="region"
        aria-label="Trending games carousel"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        <div
          ref={trackRef}
          className="flex items-center justify-center h-full"
          style={{ willChange: "transform" }}
        >
          {items.map((item, i) => {
            const style = getItemStyle(i);
            return (
              <Link
                key={item.slug}
                href={`/${category}/${item.slug}`}
                onClick={handleLinkClick}
                className="absolute rounded-xl overflow-hidden transition-all duration-500 ease-out group"
                style={style}
                draggable={false}
              >
                <Image
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  draggable={false}
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

        {itemCount > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (animatingRef.current || dragRef.current.isDragging) return;
                resetAutoplay();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              aria-label="Previous game"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (animatingRef.current || dragRef.current.isDragging) return;
                resetAutoplay();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              aria-label="Next game"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (animatingRef.current || dragRef.current.isDragging) return;
              cleanupAnimation();
              animatingRef.current = true;
              setActiveIndex(
                ((i % itemCount) + itemCount) % itemCount
              );
              resetAutoplay();
              timeoutRef.current = setTimeout(() => {
                animatingRef.current = false;
                timeoutRef.current = undefined;
              }, 500);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-8 bg-[#4FD1FF]"
                : "w-2 bg-[#333] hover:bg-[#555]"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { TrendingCarousel };
