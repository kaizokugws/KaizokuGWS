"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Item } from "@/lib/types";

const DRAG_THRESHOLD = 60;

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const animatingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);

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
      if (animatingRef.current || isDraggingRef.current) return;
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
    if (animatingRef.current || isDraggingRef.current) return;
    cleanupAnimation();
    animatingRef.current = true;
    setActiveIndex((prev) => ((prev + 1) % itemCount + itemCount) % itemCount);
    timeoutRef.current = setTimeout(() => {
      animatingRef.current = false;
      timeoutRef.current = undefined;
    }, 500);
  }, [itemCount, cleanupAnimation]);

  const prev = useCallback(() => {
    if (animatingRef.current || isDraggingRef.current) return;
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

  const resolveDrag = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    const delta = currentXRef.current - startXRef.current;

    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      wasDraggedRef.current = true;
      resetAutoplay();
      if (delta < 0) next();
      else prev();
    }
  }, [next, prev, resetAutoplay]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (animatingRef.current) return;
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      currentXRef.current = e.clientX;
      wasDraggedRef.current = false;

      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
        containerRef.current.style.cursor = "grabbing";
      }
    },
    []
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
  }, []);

  const handlePointerUp = useCallback(() => {
    resolveDrag();
  }, [resolveDrag]);

  const handlePointerCancel = useCallback(() => {
    if (!isDraggingRef.current) return;
    resolveDrag();
  }, [resolveDrag]);

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      wasDraggedRef.current = false;
    }
  }, []);

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
      {itemCount > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (animatingRef.current || isDraggingRef.current) return;
              resetAutoplay();
              prev();
            }}
            className={cn(
              "absolute z-20",
              "w-12 h-12 flex items-center justify-center rounded-full",
              "text-white/80 hover:text-white hover:scale-110",
              "transition-all duration-200 cursor-pointer"
            )}
            style={{
              left: "24px",
              top: "160px",
              transform: "translateY(-50%)",
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
              if (animatingRef.current || isDraggingRef.current) return;
              resetAutoplay();
              next();
            }}
            className={cn(
              "absolute z-20",
              "w-12 h-12 flex items-center justify-center rounded-full",
              "text-white/80 hover:text-white hover:scale-110",
              "transition-all duration-200 cursor-pointer"
            )}
            style={{
              right: "24px",
              top: "160px",
              transform: "translateY(-50%)",
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
      <div className="relative h-[320px]">
        <div
          className="absolute inset-0 overflow-hidden rounded-xl"
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-label="Trending games carousel"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "pan-y pinch-zoom", cursor: "grab" }}
        >
          <div className="flex items-center justify-center h-full">
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
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (animatingRef.current || isDraggingRef.current) return;
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
