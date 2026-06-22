'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../lib/content';
import { useTheme } from '../lib/useTheme';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = NAV_LINKS.filter(l => l.label.toLowerCase().includes(query.toLowerCase()));

  const go = (href) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className="cp-topbar">
        <div className="container cp-topbar-inner">
          <span className="serif logo-text">Young Legal House</span>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="cp-trigger" onClick={() => setOpen(true)}>
              <i className="fas fa-search" />
              <span>Navigate</span>
              <kbd>⌘K</kbd>
            </button>
            <button className="cp-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              <i className={`fas ${isDark ? 'fa-moon' : 'fa-sun'}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cp-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="cp-panel"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="cp-input-row">
                <i className="fas fa-search" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Jump to a page..."
                  className="cp-input"
                />
              </div>
              <div className="cp-results">
                {filtered.length === 0 && <div className="cp-empty">No pages found</div>}
                {filtered.map(({ href, label }) => (
                  <button key={href} className={`cp-result ${pathname === href ? 'cp-result-active' : ''}`} onClick={() => go(href)}>
                    <i className="fas fa-arrow-right" />
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .cp-topbar { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid var(--glass-border); background: var(--bg-color); }
        .cp-topbar-inner { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; }
        .logo-text { font-size: 1.2rem; font-weight: 700; }
        .cp-trigger {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 14px; border-radius: 10px;
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          color: var(--grey-text); font-size: 0.84rem; font-weight: 600;
          cursor: pointer; font-family: inherit;
        }
        .cp-trigger kbd { background: var(--panel-bg); padding: 2px 6px; border-radius: 5px; font-size: 0.72rem; }
        .cp-theme-btn { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 50%; width: 38px; height: 38px; color: var(--text-color); cursor: pointer; font-size: 0.9rem; }

        .cp-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(3px);
          display: flex; align-items: flex-start; justify-content: center;
          padding-top: 14vh;
        }
        .cp-panel {
          width: min(560px, 90vw);
          background: var(--bg-color);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        .cp-input-row { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--glass-border); color: var(--grey-text); }
        .cp-input { flex: 1; background: none; border: none; outline: none; color: var(--text-color); font-size: 0.98rem; font-family: inherit; padding: 0; }
        .cp-results { max-height: 320px; overflow-y: auto; padding: 8px; }
        .cp-empty { padding: 18px; text-align: center; color: var(--grey-text); font-size: 0.88rem; }
        .cp-result {
          width: 100%; display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: 10px;
          background: none; border: none; color: var(--text-color);
          font-size: 0.92rem; font-weight: 600; text-align: left;
          cursor: pointer; font-family: inherit;
        }
        .cp-result:hover, .cp-result-active { background: var(--glass-bg); }
        .cp-result i { font-size: 0.75rem; color: var(--grey-text); }
      `}</style>
    </>
  );
}
