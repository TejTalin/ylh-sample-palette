'use client';
import { useEffect, useRef } from 'react';

/**
 * ArchitecturalSpotlight (Palette sample)
 * Keeps the static architectural grid as the base layer (this sample's
 * signature), adds the same cursor-following spotlight mechanic as the
 * other two samples, and adds a giant faint scales-of-justice watermark
 * emblem (line-art, oversized) — matching the reference's footer
 * watermark treatment, scaled up as a persistent brand mark.
 */
export default function GridPaper() {
  const spotlightRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const eased = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY + window.scrollY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const tick = () => {
      eased.current.x += (mouse.current.x - eased.current.x) * 0.1;
      eased.current.y += (mouse.current.y - eased.current.y) * 0.1;
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${eased.current.x - 300}px, ${eased.current.y - 300}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (!reduced) rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="grid-paper" aria-hidden="true">
      {/* Giant watermark emblem — scales of justice, line-art */}
      <svg className="scales-watermark" viewBox="0 0 200 200" fill="none">
        <line x1="100" y1="20" x2="100" y2="160" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="50" x2="160" y2="50" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="50" r="2" fill="currentColor" />
        <circle cx="160" cy="50" r="2" fill="currentColor" />
        <path d="M 20 50 Q 40 90 60 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M 140 50 Q 160 90 180 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="70" y1="160" x2="130" y2="160" stroke="currentColor" strokeWidth="1.5" />
        <line x1="100" y1="160" x2="85" y2="175" stroke="currentColor" strokeWidth="1.5" />
        <line x1="100" y1="160" x2="115" y2="175" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div ref={spotlightRef} className="cursor-spotlight" />

      <style>{`
        .grid-paper {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          min-height: 100vh; z-index: 0; pointer-events: none; overflow: hidden;
          background-image:
            linear-gradient(var(--glass-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--glass-border) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.35;
        }
        .scales-watermark {
          position: absolute;
          bottom: -120px; left: 50%;
          width: 900px; height: 900px;
          transform: translateX(-50%);
          color: var(--text-color);
          opacity: 0.05;
        }
        .cursor-spotlight {
          position: absolute; top: 0; left: 0;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,163,90,0.14) 0%, transparent 70%);
          will-change: transform;
        }
        body.light-mode .cursor-spotlight {
          background: radial-gradient(circle, rgba(201,163,90,0.18) 0%, transparent 70%);
        }
        @media (prefers-reduced-motion: reduce) { .cursor-spotlight { display: none; } }
        @media (pointer: coarse) { .cursor-spotlight { display: none; } }
      `}</style>
    </div>
  );
}
