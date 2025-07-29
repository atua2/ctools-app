import React, { JSX, useEffect, useRef, useState } from 'react';

const DOT_COUNT = 60;
const MAX_DIST = 120;
const RIPPLE_DURATION = 1000;
const COLORS = ['#00ffc3', '#66ccff', '#ff99cc', '#ffcc66', '#ccccff'];

interface Dot {
  id: number;
  angle: number;
  baseRadius: number;
  orbitSpeed: number;
  amplitude: number;
  size: number;
  offsetX: number;
  offsetY: number;
  lastTouch: number;
  color: string;
}

interface LiveDot {
  x: number;
  y: number;
  radius: number;
  rippleTime: number;
  color: string;
}

function generateDots(width: number, height: number): Dot[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const baseRadius = 100 + Math.random() * 40;
    return {
      id: i,
      angle,
      baseRadius,
      orbitSpeed: 0.001 + Math.random() * 0.0005,
      amplitude: 10 + Math.random() * 10,
      size: 1.5 + Math.random() * 1.5,
      offsetX: 0,
      offsetY: 0,
      lastTouch: 0,
      color: COLORS[i % COLORS.length],
    };
  });
}

export default function TriangleField(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Safe runtime check
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobileScreen = width <= 600;
    setIsMobile(isMobileScreen);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    dotsRef.current = generateDots(width, height);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    let lastPulse = performance.now();
    let animId: number;

    const draw = () => {
      const now = performance.now();
      timeRef.current += 1;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width * (isMobileScreen ? 0.5 : 0.85);
      const centerY = height / 2.8;

      const liveDots: LiveDot[] = dotsRef.current.map((dot) => {
        const t = timeRef.current * dot.orbitSpeed;
        const curAngle = dot.angle + t * 2 * Math.PI;
        const radius = dot.baseRadius + Math.sin(t * 2) * dot.amplitude;
        const homeX = centerX + Math.cos(curAngle) * radius;
        const homeY = centerY + Math.sin(curAngle) * radius;

        const dx = mouseRef.current.x - (homeX + dot.offsetX);
        const dy = mouseRef.current.y - (homeY + dot.offsetY);
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
          dot.offsetX += dx * 0.02;
          dot.offsetY += dy * 0.02;
          if (now - dot.lastTouch > RIPPLE_DURATION) {
            dot.lastTouch = now;
          }
        } else {
          dot.offsetX -= dot.offsetX * 0.05;
          dot.offsetY -= dot.offsetY * 0.05;
        }

        if (now - lastPulse > 3000 && dot.id % 15 === 0) {
          dot.lastTouch = now;
          if (dot.id % 30 === 0) lastPulse = now;
        }

        return {
          x: homeX + dot.offsetX,
          y: homeY + dot.offsetY,
          radius: dot.size,
          rippleTime: dot.lastTouch,
          color: dot.color,
        };
      });

      liveDots.forEach((d) => {
        const age = (now - d.rippleTime) / RIPPLE_DURATION;
        if (age < 1) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, age * 120, 0, Math.PI * 2);
          ctx.strokeStyle = `${d.color}22`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      liveDots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      });

      for (let i = 0; i < liveDots.length; i++) {
        for (let j = i + 1; j < liveDots.length; j++) {
          const a = liveDots[i];
          const b = liveDots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < MAX_DIST) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mx = midX - mouseRef.current.x;
            const my = midY - mouseRef.current.y;
            const proximity = Math.max(0, 1 - Math.hypot(mx, my) / 150);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${
              (1 - dist / MAX_DIST) * 0.4 + proximity * 0.4
            })`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: '#000',
        filter: isMobile ? 'brightness(0.5)' : 'none',
      }}
    />
  );
}
