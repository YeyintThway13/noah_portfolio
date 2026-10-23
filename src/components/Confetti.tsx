import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const COLORS = [
  '#c5ff41', // Neon lime
  '#f46c38', // Orange
  '#3b82f6', // Blue
  '#ec4899', // Pink
  '#a855f7', // Purple
  '#10b981', // Emerald
  '#fbbf24'  // Yellow
];

export const Confetti: React.FC<ConfettiProps> = ({ active, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      particlesRef.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 150;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -100 - 20, // Start just above the screen
        size: Math.random() * 8 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2,
        opacity: 1
      });
    }
    particlesRef.current = particles;

    let startTime = Date.now();
    const duration = 4000; // 4 seconds

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      if (elapsed > duration) {
        if (onComplete) onComplete();
        return;
      }

      particlesRef.current.forEach((p) => {
        // Apply physics
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 30) * 0.5; // Swaying wind
        p.rotation += p.rotationSpeed;
        
        // Slow fadeout towards the end
        if (elapsed > duration * 0.6) {
          p.opacity = 1 - (elapsed - duration * 0.6) / (duration * 0.4);
        }

        // Draw particle (rectangle/ribbon shape)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        
        // Render a small rectangle
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};
