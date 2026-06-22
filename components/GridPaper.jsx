'use client';

export default function GridPaper() {
  return (
    <div className="grid-paper" aria-hidden="true">
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
      `}</style>
    </div>
  );
}
