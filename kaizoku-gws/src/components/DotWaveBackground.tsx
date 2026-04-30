"use client";

import { useEffect, useRef } from "react";
import { useBackground } from "@/context/BackgroundContext";

interface Dot {
  x: number;
  y: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  offset: number;
}

export default function DotWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showDotWave } = useBackground();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dots: Dot[] = [];

    const isMobile = window.innerWidth < 768;
    const DOT_SPACING = isMobile ? 36 : 28;
    const DOT_RADIUS = 1.2;
    const WAVE_AMPLITUDE = 10;
    const WAVE_FREQUENCY = 0.018;
    const WAVE_SPEED = 0.012;
    const BASE_OPACITY = 0.25;
    const WAVE_OPACITY_BOOST = 0.35;
    const DOT_COLOR = [79, 209, 255];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let time = 0;

    const buildDots = () => {
      dots = [];
      const cols = Math.ceil(canvas.width / DOT_SPACING) + 1;
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            x: col * DOT_SPACING,
            y: row * DOT_SPACING,
            baseY: row * DOT_SPACING,
            size: DOT_RADIUS,
            opacity: BASE_OPACITY,
            speed: WAVE_SPEED,
            offset: col * WAVE_FREQUENCY * DOT_SPACING,
          });
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildDots();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.baseY, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR[0]}, ${DOT_COLOR[1]}, ${DOT_COLOR[2]}, ${BASE_OPACITY})`;
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += WAVE_SPEED;

      for (const dot of dots) {
        const waveY = Math.sin(dot.x * WAVE_FREQUENCY + time + dot.offset)
          * WAVE_AMPLITUDE;

        const waveY2 = Math.sin(dot.x * WAVE_FREQUENCY * 0.5 + time * 0.7)
          * (WAVE_AMPLITUDE * 0.4);

        const finalY = dot.baseY + waveY + waveY2;

        const wavePeak = (Math.sin(dot.x * WAVE_FREQUENCY + time) + 1) / 2;
        const finalOpacity = BASE_OPACITY + wavePeak * WAVE_OPACITY_BOOST;

        ctx.beginPath();
        ctx.arc(dot.x, finalY, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR[0]}, ${DOT_COLOR[1]}, ${DOT_COLOR[2]}, ${finalOpacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      draw();
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        if (!prefersReducedMotion) {
          draw();
        }
      }
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (!showDotWave) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
