"use client";

import { useEffect, useRef } from "react";
import { useBackground } from "@/context/BackgroundContext";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
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
    let stars: Star[] = [];

    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 60 : 120;
    const CONNECTION_DISTANCE = 120;
    const MAX_SPEED = 0.15;
    const MIN_RADIUS = 0.5;
    const MAX_RADIUS = 1.5;
    const AURORA_BANDS = isMobile ? 3 : 5;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildStars();
    };

    const buildStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * MAX_SPEED,
          vy: (Math.random() - 0.5) * MAX_SPEED,
          radius: MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS),
          opacity: 0.2 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const updateStars = (time: number) => {
      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.06;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(79, 209, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawStars = () => {
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${star.opacity})`;
        ctx.fill();
      }
    };

    const drawAurora = (time: number) => {
      for (let i = 0; i < AURORA_BANDS; i++) {
        const yBase = (canvas.height * 0.25) + (i * canvas.height * 0.15);
        const alpha = 0.03 + (i * 0.005);

        const gradient = ctx.createLinearGradient(
          0, yBase - 60,
          canvas.width, yBase + 60
        );

        const shift1 = Math.sin(time * 0.0003 + i * 0.8) * 0.5 + 0.5;
        const shift2 = Math.cos(time * 0.0005 + i * 1.2) * 0.5 + 0.5;

        gradient.addColorStop(0, `rgba(34, 197, 94, ${alpha * shift1})`);
        gradient.addColorStop(0.3, `rgba(79, 209, 255, ${alpha * shift2 * 0.5})`);
        gradient.addColorStop(0.6, `rgba(34, 197, 94, ${alpha * shift1 * 0.7})`);
        gradient.addColorStop(1, `rgba(34, 197, 94, ${alpha * shift2})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, yBase - 60, canvas.width, 120);
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAurora(0);
      drawStars();
    };

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateStars(timestamp);
      drawAurora(timestamp);
      drawConnections();
      drawStars();
      animationId = requestAnimationFrame(animate);
    };

    resize();

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animate(0);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        if (!prefersReducedMotion) {
          animate(0);
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
