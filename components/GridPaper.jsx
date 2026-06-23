'use client';
import { useEffect, useRef } from 'react';

/**
 * AuroraGrid (bold, room-filling, cursor-reactive)
 * A large warm-gold aurora wash follows the cursor across the FULL page
 * height with a wide soft radius, and the architectural grid lines
 * brighten broadly in that same large radius — distinct from the small
 * pinpoint glow before. Big, atmospheric, magazine-editorial feel.
 */
const CELL = 56;

export default function GridPaper() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const eased = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = window.innerWidth, h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = document.documentElement.scrollHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY + window.scrollY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const RADIUS = 520; // big, room-filling

    const draw = () => {
      h = document.documentElement.scrollHeight || window.innerHeight;
      if (canvas.height !== h) canvas.height = h;

      ctx.clearRect(0, 0, w, h);

      eased.current.x += (mouse.current.x - eased.current.x) * 0.08;
      eased.current.y += (mouse.current.y - eased.current.y) * 0.08;
      const { x: mx, y: my } = eased.current;

      if (mx > -1000) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
        grad.addColorStop(0, 'rgba(201,163,90,0.16)');
        grad.addColorStop(0.5, 'rgba(201,163,90,0.07)');
        grad.addColorStop(1, 'rgba(201,163,90,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const startCol = Math.floor((mx - RADIUS) / CELL);
        const endCol = Math.ceil((mx + RADIUS) / CELL);
        const startRow = Math.floor((my - RADIUS) / CELL);
        const endRow = Math.ceil((my + RADIUS) / CELL);

        for (let c = startCol; c <= endCol; c++) {
          for (let r = startRow; r <= endRow; r++) {
            const px = c * CELL, py = r * CELL;
            const dx = px - mx, dy = py - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < RADIUS) {
              const alpha = (1 - dist / RADIUS) * 0.7;
              ctx.beginPath();
              ctx.arc(px, py, 2.8, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(201,163,90,${alpha})`;
              ctx.fill();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw();
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerleave', onLeave);
      };
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="grid-paper" aria-hidden="true">
      <canvas ref={canvasRef} className="grid-canvas" />
      <style>{`
        .grid-paper {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          min-height: 100vh; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--glass-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--glass-border) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.35;
        }
        .grid-canvas { position: absolute; top: 0; left: 0; width: 100%; opacity: 0.95; }
      `}</style>
    </div>
  );
}
