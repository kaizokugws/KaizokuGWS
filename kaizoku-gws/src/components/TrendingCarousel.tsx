"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Item } from "@/lib/types";

const SLIDE_WIDTH = 100;
const DRAG_SENSITIVITY = 0.35;
const ANIM_DURATION = 2500;
const IDLE_PAUSE = 4500;
const RESUME_DELAY = 3000;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const TrendingCarousel = ({
  items,
  category,
  className,
}: {
  items: Item[];
  category: string;
  className?: string;
}) => {
  const [carouselPos, setCarouselPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const modeRef = useRef<"idle" | "animating" | "dragging">("idle");
  const rAFRef = useRef(0);
  const startXRef = useRef(0);
  const dragBaseRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const animFromRef = useRef(0);
  const animToRef = useRef(0);
  const animStartRef = useRef(0);
  const isDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const isPausedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastRenderRef = useRef(0);

  const itemCount = items.length;

  const nextRef = useRef<() => void>(() => {});
  const prevRef = useRef<() => void>(() => {});

  const startAnimation = (from: number, to: number) => {
    modeRef.current = "animating";
    animFromRef.current = from;
    animToRef.current = to;
    animStartRef.current = performance.now();
  };

  const startIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    if (!isPausedRef.current && !isHoveredRef.current && modeRef.current === "idle") {
      idleTimerRef.current = setTimeout(() => {
        if (modeRef.current === "idle" && !isPausedRef.current && !isHoveredRef.current) {
          const current = posRef.current;
          const target = Math.round(current) + 1;
          startAnimation(current, target);
        }
      }, IDLE_PAUSE);
    }
  };

  const scheduleResume = () => {
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      if (modeRef.current === "idle" && !isHoveredRef.current) {
        isPausedRef.current = false;
        startIdleTimer();
      }
    }, RESUME_DELAY);
  };

  const goNext = () => {
    if (isDraggingRef.current) return;
    clearTimeout(idleTimerRef.current);
    const current = posRef.current;
    const target = Math.round(current) + 1;
    startAnimation(current, target);
    isPausedRef.current = true;
    clearTimeout(pauseTimerRef.current);
    scheduleResume();
  };

  const goPrev = () => {
    if (isDraggingRef.current) return;
    clearTimeout(idleTimerRef.current);
    const current = posRef.current;
    const target = Math.round(current) - 1;
    startAnimation(current, target);
    isPausedRef.current = true;
    clearTimeout(pauseTimerRef.current);
    scheduleResume();
  };

  nextRef.current = goNext;
  prevRef.current = goPrev;

  useEffect(() => {
    const loop = () => {
      if (modeRef.current === "dragging") {
        posRef.current = dragBaseRef.current - dragOffsetRef.current / SLIDE_WIDTH;
      } else if (modeRef.current === "animating") {
        const elapsed = performance.now() - animStartRef.current;
        const t = Math.min(elapsed / ANIM_DURATION, 1);
        const eased = easeOut(t);
        posRef.current = animFromRef.current + (animToRef.current - animFromRef.current) * eased;
        if (t >= 1) {
          posRef.current = animToRef.current;
          modeRef.current = "idle";
          if (isPausedRef.current && !isHoveredRef.current) {
            scheduleResume();
          } else if (!isPausedRef.current && !isHoveredRef.current) {
            startIdleTimer();
          }
        }
      }

      if (Math.abs(posRef.current - lastRenderRef.current) > 0.005) {
        lastRenderRef.current = posRef.current;
        setCarouselPos(posRef.current);
      }

      rAFRef.current = requestAnimationFrame(loop);
    };
    rAFRef.current = requestAnimationFrame(loop);

    startIdleTimer();

    return () => {
      cancelAnimationFrame(rAFRef.current);
      clearTimeout(idleTimerRef.current);
      clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    clearTimeout(idleTimerRef.current);
    isDraggingRef.current = true;
    modeRef.current = "dragging";
    startXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    dragBaseRef.current = posRef.current;
    wasDraggedRef.current = false;
    isPausedRef.current = true;
    clearTimeout(pauseTimerRef.current);

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const rawDelta = e.clientX - startXRef.current;
    dragOffsetRef.current = rawDelta * DRAG_SENSITIVITY;
    if (Math.abs(rawDelta) > 5) wasDraggedRef.current = true;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const current = posRef.current;
    const nearest = Math.round(current);
    startAnimation(current, nearest);

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    handlePointerUp();
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      wasDraggedRef.current = false;
    }
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    isPausedRef.current = true;
    clearTimeout(idleTimerRef.current);
    clearTimeout(pauseTimerRef.current);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (modeRef.current === "idle") {
      scheduleResume();
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
        clearTimeout(idleTimerRef.current);
        isPausedRef.current = true;
        clearTimeout(pauseTimerRef.current);
        prevRef.current();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        clearTimeout(idleTimerRef.current);
        isPausedRef.current = true;
        clearTimeout(pauseTimerRef.current);
        nextRef.current();
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

    const scale = Math.max(0.85, 1 - clampedDist * 0.06);
    const zIndex = Math.max(1, 10 - Math.round(clampedDist * 1.5));
    const opacity = Math.max(0.5, 1 - clampedDist * 0.1);
    const cappedDeg = Math.min(Math.abs(offset) * 3, 5);
    const rotateY = Math.sign(offset) * cappedDeg;
    const xPos = offset * SLIDE_WIDTH;
    const width = `${Math.max(200, 280 - clampedDist * 40)}px`;
    const height = `${Math.max(220, 320 - clampedDist * 50)}px`;

    return { xPos, scale, width, height, opacity, zIndex, rotateY };
  };

  if (itemCount === 0) return null;

  const activeIndex = ((Math.round(carouselPos) % itemCount) + itemCount) % itemCount;

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
              clearTimeout(idleTimerRef.current);
              isPausedRef.current = true;
              clearTimeout(pauseTimerRef.current);
              prevRef.current();
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
              clearTimeout(idleTimerRef.current);
              isPausedRef.current = true;
              clearTimeout(pauseTimerRef.current);
              nextRef.current();
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
            perspective: "1200px",
          }}
        >
          <div className="flex items-center justify-center h-full">
            {items.map((item, i) => {
              const { xPos, scale, width, height, opacity, zIndex, rotateY } = getItemStyle(i, carouselPos);
              return (
                <Link
                  key={item.slug}
                  href={`/${category}/${item.slug}`}
                  onClick={handleLinkClick}
                  className="absolute rounded-xl overflow-hidden group"
                  style={{
                    width,
                    height,
                    transform: `translate3d(${xPos}px, 0, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                  }}
                  draggable={false}
                >
                  <Image
                    className="object-contain"
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
              if (isDraggingRef.current) return;
              clearTimeout(idleTimerRef.current);
              const current = posRef.current;
              startAnimation(current, i);
              isPausedRef.current = true;
              clearTimeout(pauseTimerRef.current);
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
