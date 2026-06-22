'use client';
import { motion } from 'framer-motion';
import PageShell from '../../components/PageShell';
import WordReveal from '../../components/WordReveal';
import TiltCard from '../../components/TiltCard';
import { staggerContainer, staggerItem, VIEW } from '../../lib/motion';
import { TEAM_MEMBERS } from '../../lib/content';

export default function TeamPage() {
  return (
    <PageShell>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="eyebrow" style={{ textAlign: 'center' }}>— Team</p>
        <WordReveal text="Meet Our Team" as="h1" className="serif page-title" style={{ textAlign: 'center' }} />
      </div>
      <motion.div
        className="cards-grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', maxWidth: '780px', margin: '0 auto' }}
        variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="visible" viewport={VIEW}
      >
        {TEAM_MEMBERS.map(({ name, role, image }) => (
          <motion.div key={name} variants={staggerItem}>
            <TiltCard className="glass-card" style={{ textAlign: 'center', padding: '30px 22px' }}>
              <img
                src={image}
                alt={name}
                width={76}
                height={76}
                style={{ width: '76px', height: '76px', borderRadius: '50%', margin: '0 auto 16px', display: 'block', objectFit: 'cover', border: '1px solid var(--glass-border)' }}
              />
              <h3 className="serif" style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{name}</h3>
              <p style={{ color: 'var(--grey-text)', fontSize: '0.85rem' }}>{role}</p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
      <style>{`.eyebrow { font-size: 0.76rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-text); margin-bottom: 14px; }`}</style>
    </PageShell>
  );
}
