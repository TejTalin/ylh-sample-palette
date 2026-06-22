'use client';
import { useEffect, useRef } from 'react';

/**
 * GridPaper (cursor-reactive)
 * The static architectural grid stays as a faint base layer (CSS only,
 * no motion cost). On top, a soft radial spotlight follows the cursor
 * and a handful of nearby grid-intersection points glow brighter the
 * closer the cursor gets to them — distinct from Sample 1 (node network,
 * pull) and Sample 2 (particle field, push): here, nothing moves position,
 * only brightness/glow reacts, matching the architectural, precise feel.
 */
const CELL = 56; // must match the CSS background-size below

export default function GridPaper() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = window.innerWidth, h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const RADIUS = 180;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouse.current;

      if (mx > -1000) {
        // soft spotlight glow following the cursor
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
        grad.addColorStop(0, 'rgba(201,163,90,0.06)');
        grad.addColorStop(1, 'rgba(201,163,90,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // glow nearby grid intersections
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
              const alpha = (1 - dist / RADIUS) * 0.55;
              ctx.beginPath();
              ctx.arc(px, py, 2.4, 0, Math.PI * 2);
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
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--glass-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--glass-border) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.35;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }
        .grid-canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.9; }
      `}</style>
    </div>
  );
}
