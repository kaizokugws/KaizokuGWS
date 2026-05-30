"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Item } from "@/lib/types";

const SLIDE_WIDTH = 120;
const DRAG_SENSITIVITY = 0.35;
const ARROW_DURATION = 100;
const SETTLE_DURATION = 400;
const AUTOPLAY_INTERVAL = 5000;
const RESUME_DELAY = 3000;
const ROTATION_ANGLE = -18;

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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [settleDuration, setSettleDuration] = useState(ARROW_DURATION);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const rAFRef = useRef(0);

  const itemCount = items.length;

  const nextRef = useRef<() => void>(() => {});
  const prevRef = useRef<() => void>(() => {});

  const cancelAnimTimer = () => {
    clearTimeout(animTimerRef.current);
    animTimerRef.current = undefined;
  };

  const goTo = (index: number) => {
    if (animatingRef.current || isDraggingRef.current) return;
    cancelAnimTimer();
    animatingRef.current = true;
    setActiveIndex(((index % itemCount) + itemCount) % itemCount);
    setSettleDuration(ARROW_DURATION);
    animTimerRef.current = setTimeout(() => {
      animatingRef.current = false;
    }, ARROW_DURATION);
  };

  const next = () => {
    if (animatingRef.current || isDraggingRef.current) return;
    cancelAnimTimer();
    animatingRef.current = true;
    setActiveIndex((prev) => ((prev + 1) % itemCount + itemCount) % itemCount);
    setSettleDuration(ARROW_DURATION);
    animTimerRef.current = setTimeout(() => {
      animatingRef.current = false;
    }, ARROW_DURATION);
  };

  const prev = () => {
    if (animatingRef.current || isDraggingRef.current) return;
    cancelAnimTimer();
    animatingRef.current = true;
    setActiveIndex((prev) => ((prev - 1) % itemCount + itemCount) % itemCount);
    setSettleDuration(ARROW_DURATION);
    animTimerRef.current = setTimeout(() => {
      animatingRef.current = false;
    }, ARROW_DURATION);
  };

  nextRef.current = next;
  prevRef.current = prev;

  const startAutoplay = () => {
    isPausedRef.current = false;
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => nextRef.current(), AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    clearInterval(autoTimerRef.current);
    isPausedRef.current = true;
  };

  const scheduleResume = () => {
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        startAutoplay();
      }
    }, RESUME_DELAY);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      clearInterval(autoTimerRef.current);
      cancelAnimTimer();
      clearTimeout(pauseTimerRef.current);
      cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      wasDraggedRef.current = false;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (animatingRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    wasDraggedRef.current = false;
    stopAutoplay();
    cancelAnimTimer();
    clearTimeout(pauseTimerRef.current);

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
      containerRef.current.style.cursor = "grabbing";
    }

    const updateLoop = () => {
      if (isDraggingRef.current) {
        setDragOffset(dragOffsetRef.current);
        rAFRef.current = requestAnimationFrame(updateLoop);
      }
    };
    rAFRef.current = requestAnimationFrame(updateLoop);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const rawDelta = e.clientX - startXRef.current;
    dragOffsetRef.current = rawDelta * DRAG_SENSITIVITY;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    cancelAnimationFrame(rAFRef.current);

    const finalOffset = dragOffsetRef.current;
    const totalSlideDrift = -finalOffset / SLIDE_WIDTH;
    const nearestSlide = Math.round(totalSlideDrift);
    const clamped = ((nearestSlide % itemCount) + itemCount) % itemCount;

    if (nearestSlide !== 0) {
      wasDraggedRef.current = true;
      setActiveIndex((prev) => ((prev + clamped) % itemCount + itemCount) % itemCount);
    } else if (finalOffset === 0) {
      wasDraggedRef.current = false;
    }

    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
    setSettleDuration(SETTLE_DURATION);

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    scheduleResume();
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    handlePointerUp();
  };

  const handleMouseEnter = () => {
    stopAutoplay();
    clearTimeout(pauseTimerRef.current);
  };

  const handleMouseLeave = () => {
    scheduleResume();
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
        stopAutoplay();
        clearTimeout(pauseTimerRef.current);
        prevRef.current();
        scheduleResume();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stopAutoplay();
        clearTimeout(pauseTimerRef.current);
        nextRef.current();
        scheduleResume();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, []);

  const getItemStyle = (index: number, effectiveIdx: number) => {
    const rawOffset = index - effectiveIdx;
    let offset = rawOffset;
    const half = itemCount / 2;
    while (offset > half) offset -= itemCount;
    while (offset < -half) offset += itemCount;

    const absDist = Math.abs(offset);
    const clampedDist = Math.min(absDist, 5);

    const scale = Math.max(0.7, 1 - clampedDist * 0.15);
    const zIndex = Math.max(1, 10 - Math.round(clampedDist));
    const opacity = Math.max(0.3, 1 - clampedDist * 0.25);
    const rotateY = offset * ROTATION_ANGLE;

    let xPos;
    if (absDist < 1) {
      xPos = offset * SLIDE_WIDTH;
    } else {
      const sign = offset >= 0 ? 1 : -1;
      xPos = sign * (SLIDE_WIDTH + (absDist - 1) * 80);
    }

    const width = `${Math.max(160, 280 - clampedDist * 90)}px`;
    const height = `${Math.max(200, 320 - clampedDist * 120)}px`;

    return { xPos, scale, width, height, opacity, zIndex, rotateY };
  };

  if (itemCount === 0) return null;

  const effectiveIndex = isDragging
    ? activeIndex - dragOffset / SLIDE_WIDTH
    : activeIndex;

  return (
    <div
      className={cn("relative w-full animate-fadeIn select-none", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {itemCount > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (animatingRef.current || isDraggingRef.current) return;
              stopAutoplay();
              clearTimeout(pauseTimerRef.current);
              prevRef.current();
              scheduleResume();
            }}
            className="absolute z-30 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            style={{
              left: "20px",
              top: "50%",
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
              stopAutoplay();
              clearTimeout(pauseTimerRef.current);
              nextRef.current();
              scheduleResume();
            }}
            className="absolute z-30 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            style={{
              right: "20px",
              top: "50%",
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
          style={{
            touchAction: "pan-y pinch-zoom",
            cursor: "grab",
            perspective: "1000px",
          }}
        >
          <div className="flex items-center justify-center h-full">
            {items.map((item, i) => {
              const { xPos, scale, width, height, opacity, zIndex, rotateY } = getItemStyle(i, effectiveIndex);
              return (
                <Link
                  key={item.slug}
                  href={`/${category}/${item.slug}`}
                  onClick={handleLinkClick}
                  className={cn(
                    "absolute rounded-xl overflow-hidden group",
                    isDragging ? "" : "transition-all ease-out"
                  )}
                  style={{
                    width,
                    height,
                    transform: `translate3d(${xPos}px, 0, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                    transitionDuration: isDragging ? "0ms" : `${settleDuration}ms`,
                  }}
                  draggable={false}
                >
                  <Image
                    className={cn(
                      "object-contain",
                      isDragging ? "" : "transition-transform duration-100 group-hover:scale-105"
                    )}
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
              cancelAnimTimer();
              animatingRef.current = true;
              setActiveIndex(((i % itemCount) + itemCount) % itemCount);
              setSettleDuration(ARROW_DURATION);
              stopAutoplay();
              clearTimeout(pauseTimerRef.current);
              animTimerRef.current = setTimeout(() => {
                animatingRef.current = false;
              }, ARROW_DURATION);
              scheduleResume();
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
