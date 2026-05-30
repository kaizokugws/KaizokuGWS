"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Item } from "@/lib/types";

const DRAG_THRESHOLD = 60;
const ANIMATION_DURATION = 250;

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
  const animatingRef = useRef(false);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);

  const itemCount = items.length;

  const nextRef = useRef<() => void>(() => {});
  const prevRef = useRef<() => void>(() => {});

  const goTo = (index: number) => {
    if (animatingRef.current || isDraggingRef.current) return;
    clearTimeout(animTimerRef.current);
    animatingRef.current = true;
    setActiveIndex(((index % itemCount) + itemCount) % itemCount);
    animTimerRef.current = setTimeout(() => {
      animatingRef.current = false;
    }, ANIMATION_DURATION);
  };

  const next = () => {
    if (animatingRef.current || isDraggingRef.current) return;
    clearTimeout(animTimerRef.current);
    animatingRef.current = true;
    setActiveIndex((prev) => ((prev + 1) % itemCount + itemCount) % itemCount);
    animTimerRef.current = setTimeout(() => {
      animatingRef.current = false;
    }, ANIMATION_DURATION);
  };

  const prev = () => {
    if (animatingRef.current || isDraggingRef.current) return;
    clearTimeout(animTimerRef.current);
    animatingRef.current = true;
    setActiveIndex((prev) => ((prev - 1) % itemCount + itemCount) % itemCount);
    animTimerRef.current = setTimeout(() => {
      animatingRef.current = false;
    }, ANIMATION_DURATION);
  };

  nextRef.current = next;
  prevRef.current = prev;

  const resetAutoplay = () => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => nextRef.current(), 3000);
  };

  useEffect(() => {
    autoTimerRef.current = setInterval(() => nextRef.current(), 3000);
    return () => {
      clearInterval(autoTimerRef.current);
      clearTimeout(animTimerRef.current);
    };
  }, []);

  const resolveDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    const delta = currentXRef.current - startXRef.current;

    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      wasDraggedRef.current = true;
      resetAutoplay();
      if (delta < 0) nextRef.current();
      else prevRef.current();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (animatingRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    wasDraggedRef.current = false;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    resolveDrag();
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    resolveDrag();
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      wasDraggedRef.current = false;
    }
  };

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
        prevRef.current();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        resetAutoplay();
        nextRef.current();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, []);

  const getItemStyle = (index: number) => {
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
  };

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
              prevRef.current();
            }}
            className="absolute z-20 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
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
              nextRef.current();
            }}
            className="absolute z-20 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
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
                  className="absolute rounded-xl overflow-hidden transition-all duration-[250ms] ease-out group"
                  style={style}
                  draggable={false}
                >
                  <Image
                    className="object-contain transition-transform duration-[250ms] group-hover:scale-105"
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
              clearTimeout(animTimerRef.current);
              animatingRef.current = true;
              setActiveIndex(
                ((i % itemCount) + itemCount) % itemCount
              );
              resetAutoplay();
              animTimerRef.current = setTimeout(() => {
                animatingRef.current = false;
              }, ANIMATION_DURATION);
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
