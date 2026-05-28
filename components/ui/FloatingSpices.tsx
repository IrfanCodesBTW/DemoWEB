"use client";

import React, { useEffect, useRef } from "react";

interface SpiceParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  spin: number;
  opacity: number;
}

export const FloatingSpices: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check user preference for motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: SpiceParticle[] = [];

    const colors = [
      "rgba(200, 150, 62, 0.30)",  // Gold dust
      "rgba(212, 98, 26, 0.25)",   // Saffron
      "rgba(164, 108, 50, 0.22)",  // Bronze
      "rgba(139, 30, 18, 0.15)",   // Deep red
    ];

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 250);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Initialize particles — fewer on mobile for performance
    const initParticles = () => {
      const count = window.innerWidth < 768 ? 15 : 28;
      particles = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: -(Math.random() * 0.35 + 0.1),
          speedX: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.015,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };
    initParticles();

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.spin;

        // Reset if floats off top or sides
        if (p.y < -15) {
          p.y = h + 15;
          p.x = Math.random() * w;
        }
        if (p.x < -15 || p.x > w + 15) {
          p.x = Math.random() * w;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />;
};
