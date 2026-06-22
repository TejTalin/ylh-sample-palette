'use client';
import { motion } from 'framer-motion';
import PageShell from '../../components/PageShell';
import WordReveal from '../../components/WordReveal';
import { fadeUp, VIEW } from '../../lib/motion';
import { EVENT_INFO } from '../../lib/content';

export default function EventsPage() {
  return (
    <PageShell>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="eyebrow" style={{ textAlign: 'center' }}>— Events</p>
        <WordReveal text="Events & Competitions" as="h1" className="serif page-title" style={{ textAlign: 'center' }} />
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} className="glass-card" style={{ maxWidth: '720px', margin: '0 auto', padding: '44px 34px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', padding: '4px 14px', border: '1px solid var(--glass-border)', borderRadius: '2px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: '18px' }}>Live Event</span>
        <h2 className="serif" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '6px' }}>{EVENT_INFO.name}</h2>
        <p style={{ fontStyle: 'italic', color: 'var(--grey-text)', marginBottom: '20px' }}>{EVENT_INFO.tagline}</p>
        <p style={{ color: 'var(--grey-text)', lineHeight: 1.8, maxWidth: '540px', margin: '0 auto 28px', fontSize: '0.92rem' }}>{EVENT_INFO.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0', marginBottom: '28px', textAlign: 'left', border: '1px solid var(--glass-border)' }}>
          {[
            ['Date', EVENT_INFO.date], ['Fee', EVENT_INFO.fee], ['Deadline', EVENT_INFO.deadline],
            ['Winner', EVENT_INFO.prizeWinner], ['Runner-up', EVENT_INFO.prizeRunner],
          ].map(([k, v], i) => (
            <div key={k} style={{ padding: '14px 16px', borderRight: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--grey-text)', marginBottom: '4px' }}>{k}</div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{v}</div>
            </div>
          ))}
        </div>

        <a href="#" className="pill pill-solid">Register for Trivia</a>
      </motion.div>
      <style>{`.eyebrow { font-size: 0.76rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-text); margin-bottom: 14px; }`}</style>
    </PageShell>
  );
}
