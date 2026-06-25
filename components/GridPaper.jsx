'use client';

/**
 * ArchitecturalGrid (Palette sample)
 * Static grid + giant scales-of-justice watermark, full page height.
 * Cursor light now lives in the global CursorSpotlight.
 */
export default function GridPaper() {
  return (
    <div className="grid-paper" aria-hidden="true">
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
      <style>{`
        .grid-paper {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          min-height: 100vh; z-index: 0; pointer-events: none; overflow: hidden;
          background-image:
            linear-gradient(var(--glass-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--glass-border) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.5;
        }
        .scales-watermark {
          position: absolute;
          bottom: -120px; left: 50%;
          width: 900px; height: 900px;
          transform: translateX(-50%);
          color: var(--text-color);
          opacity: 0.07;
        }
      `}</style>
    </div>
  );
}
