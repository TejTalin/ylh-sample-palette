'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell';
import WordReveal from '../components/WordReveal';
import Ticker from '../components/Ticker';
import { fadeUp, staggerContainer, staggerItem, VIEW } from '../lib/motion';
import { OFFER_CARDS, LAW_AREAS } from '../lib/content';

export default function HomePage() {
  return (
    <PageShell>
      {/* MAGAZINE HERO — full-bleed, oversized, right-aligned eyebrow */}
      <motion.section
        className="mag-hero"
        variants={staggerContainer(0.1, 0.05)} initial="hidden" whileInView="visible" viewport={VIEW}
      >
        <motion.p variants={fadeUp} className="eyebrow eyebrow-right">— India&apos;s Legal Student Community</motion.p>
        <WordReveal text="Young Legal House" as="h1" className="serif mag-title" />
        <motion.p variants={fadeUp} className="mag-pull-quote">
          &ldquo;A community bridging the gap between legal theory and execution.&rdquo;
        </motion.p>
        <motion.div variants={fadeUp} className="mag-hero-actions">
          <Link href="/join" className="pill pill-solid">Join the Community</Link>
          <Link href="/blogs" className="pill pill-ghost">Read Legal Insights</Link>
        </motion.div>
      </motion.section>

      <motion.div initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} className="mag-ticker">
        <Ticker text="FLAGSHIP EVENT — LEX NOCTIS / CRIMINAL LAW TRIVIA / 15 JUNE 2026 / REGISTRATIONS NOW OPEN / CLICK TO REGISTER" />
      </motion.div>

      {/* MAGAZINE SPLIT — oversized numeral + text split per feature, alternating sides */}
      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} className="mag-features">
        <p className="eyebrow">— What We Offer</p>
        <WordReveal text="Built for the way law students work" as="h2" className="serif mag-section-title" />
        {OFFER_CARDS.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEW}
            className={`mag-split ${i % 2 === 1 ? 'mag-split-reverse' : ''}`}
          >
            <span className="mag-split-num">0{i + 1}</span>
            <div className="mag-split-body">
              <i className={`fas ${item.icon}`} />
              <h3 className="serif">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* TAGS — wide, full-bleed marquee-style row */}
      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} className="mag-tags-section">
        <p className="eyebrow">— Legal Insights</p>
        <WordReveal text="Every domain of practice" as="h2" className="serif mag-section-title" />
        <motion.div className="mag-tag-flow" variants={staggerContainer(0.04, 0.1)} initial="hidden" whileInView="visible" viewport={VIEW}>
          {LAW_AREAS.map(area => (
            <motion.div key={area} variants={staggerItem}>
              <Link href="/blogs" className="mag-tag">{area}</Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA — large pull-quote style close */}
      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} className="mag-cta">
        <p className="eyebrow">— Join Us</p>
        <WordReveal text="Be Part of the Movement" as="h2" className="serif mag-cta-title" />
        <p className="mag-cta-text">Join law students across India building their careers through YLH.</p>
        <div className="mag-cta-actions">
          <Link href="/join" className="pill pill-solid">Join the Community</Link>
          <Link href="/contact" className="pill pill-ghost">Get in Touch</Link>
        </div>
      </motion.section>

      <style>{`
        .eyebrow { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .eyebrow-right { text-align: right; }

        .mag-hero { padding: 36px 0 0; text-align: right; }
        .mag-title { font-size: clamp(3.2rem, 10vw, 8rem); font-weight: 600; line-height: 0.94; margin-bottom: 32px; text-align: right; justify-content: flex-end; }
        .mag-pull-quote { font-size: clamp(1.3rem, 2.6vw, 1.8rem); font-style: italic; color: var(--grey-text); max-width: 680px; margin: 0 0 32px auto; line-height: 1.5; }
        .mag-hero-actions { display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; }

        .mag-ticker { margin: 56px 0 80px; }

        .mag-features { margin-bottom: 80px; }
        .mag-section-title { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 600; margin-bottom: 48px; max-width: 760px; }
        .mag-split { display: grid; grid-template-columns: 220px 1fr; gap: 36px; padding: 44px 0; border-top: 1px solid var(--glass-border); align-items: start; }
        .mag-split-reverse { grid-template-columns: 1fr 220px; }
        .mag-split-reverse .mag-split-num { order: 2; text-align: right; }
        .mag-split-num { font-family: 'Cormorant Garamond', serif; font-size: 5.5rem; font-weight: 600; color: var(--accent); opacity: 0.85; line-height: 1; }
        .mag-split-body i { font-size: 1.3rem; margin-bottom: 14px; display: block; color: var(--accent); }
        .mag-split-body h3 { font-size: 1.7rem; margin-bottom: 12px; }
        .mag-split-body p { color: var(--grey-text); font-size: 1rem; line-height: 1.8; max-width: 600px; }

        .mag-tags-section { margin-bottom: 80px; }
        .mag-tag-flow { display: flex; flex-wrap: wrap; gap: 10px; }
        .mag-tag { display: inline-block; padding: 10px 20px; border: 1px solid var(--glass-border); border-radius: 2px; font-size: 0.9rem; font-weight: 500; color: var(--text-color); text-decoration: none; }
        .mag-tag:hover { background: var(--glass-bg); }

        .mag-cta { border-top: 1px solid var(--glass-border); padding-top: 56px; text-align: center; }
        .mag-cta-title { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 600; margin-bottom: 18px; text-align: center; justify-content: center; }
        .mag-cta-text { color: var(--grey-text); font-size: 1.05rem; max-width: 480px; margin: 0 auto 28px; }
        .mag-cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 760px) {
          .mag-hero, .mag-hero-actions, .mag-pull-quote { text-align: left; justify-content: flex-start; margin-left: 0; margin-right: 0; }
          .mag-title { text-align: left; justify-content: flex-start; }
          .mag-split, .mag-split-reverse { grid-template-columns: 1fr; gap: 14px; }
          .mag-split-reverse .mag-split-num { order: 0; text-align: left; }
        }
      `}</style>
    </PageShell>
  );
}
