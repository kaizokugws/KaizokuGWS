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

interface AuroraRibbon {
  yOffset: number;
  amplitude: number;
  frequency: number;
  speed: number;
  opacity: number;
  thickness: number;
  phaseOffset: number;
}

export default function DotWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showDotWave } = useBackground();

  useEffect(() => {
    if (!showDotWave) return;

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

    const auroraRibbons: AuroraRibbon[] = [
      { yOffset: 0.3, amplitude: 80, frequency: 0.003, speed: 0.00000094, opacity: 0.04, thickness: 100, phaseOffset: 0 },
      { yOffset: 0.45, amplitude: 60, frequency: 0.004, speed: 0.0000007, opacity: 0.035, thickness: 80, phaseOffset: 1.5 },
      { yOffset: 0.55, amplitude: 90, frequency: 0.0025, speed: 0.00000117, opacity: 0.03, thickness: 120, phaseOffset: 3 },
      { yOffset: 0.7, amplitude: 50, frequency: 0.005, speed: 0.00000085, opacity: 0.025, thickness: 70, phaseOffset: 4.5 },
      { yOffset: 0.2, amplitude: 70, frequency: 0.0035, speed: 0.00000103, opacity: 0.02, thickness: 90, phaseOffset: 2 },
    ];

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
          opacity: 0.4 + Math.random() * 0.5,
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
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.14;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(79, 209, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
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

    const drawAuroraRibbon = (ribbon: AuroraRibbon, time: number) => {
      const baseY = canvas.height * ribbon.yOffset;
      const points: { x: number; y: number }[] = [];
      const steps = canvas.width / 2;

      for (let i = 0; i <= steps; i++) {
        const x = i * 2;
        const wave1 = Math.sin(x * ribbon.frequency + time * ribbon.speed * 1000 + ribbon.phaseOffset) * ribbon.amplitude;
        const wave2 = Math.sin(x * ribbon.frequency * 1.7 + time * ribbon.speed * 600 + ribbon.phaseOffset * 2) * ribbon.amplitude * 0.5;
        const wave3 = Math.cos(x * ribbon.frequency * 0.8 + time * ribbon.speed * 400 + ribbon.phaseOffset * 0.5) * ribbon.amplitude * 0.3;
        
        const y = baseY + wave1 + wave2 + wave3;
        points.push({ x, y });
      }

      const gradient = ctx.createLinearGradient(
        0, baseY - ribbon.thickness,
        canvas.width, baseY + ribbon.thickness
      );

      const greenShift = Math.sin(time * ribbon.speed * 500 + ribbon.phaseOffset) * 0.5 + 0.5;
      const cyanShift = Math.cos(time * ribbon.speed * 700 + ribbon.phaseOffset * 1.5) * 0.5 + 0.5;

      gradient.addColorStop(0, `rgba(34, 197, 94, ${ribbon.opacity * greenShift * 0.3})`);
      gradient.addColorStop(0.2, `rgba(34, 197, 94, ${ribbon.opacity * greenShift})`);
      gradient.addColorStop(0.5, `rgba(56, 180, 120, ${ribbon.opacity * 0.7})`);
      gradient.addColorStop(0.8, `rgba(79, 209, 255, ${ribbon.opacity * cyanShift * 0.5})`);
      gradient.addColorStop(1, `rgba(34, 197, 94, ${ribbon.opacity * greenShift * 0.3})`);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      for (let band = 1; band <= 3; band++) {
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const y = points[i].y + (band * ribbon.thickness * 0.4);
          if (i === 0) ctx.moveTo(points[i].x, y);
          else {
            const prevY = points[i - 1].y + (band * ribbon.thickness * 0.4);
            const xc = (points[i - 1].x + points[i].x) / 2;
            const yc = (prevY + y) / 2;
            ctx.quadraticCurveTo(points[i - 1].x, prevY, xc, yc);
          }
        }
        ctx.strokeStyle = `rgba(34, 197, 94, ${ribbon.opacity * 0.5 * (1 - band * 0.3)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawAurora = (time: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const ribbon of auroraRibbons) {
        drawAuroraRibbon(ribbon, time);
      }
      ctx.restore();
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
  }, [showDotWave]);

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
