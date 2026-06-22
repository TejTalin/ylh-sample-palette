'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/PageShell';
import WordReveal from '../../components/WordReveal';
import { CONTACT_INFO } from '../../lib/content';
import { useFakeSubmit } from '../../lib/useFakeSubmit';

export default function ContactPage() {
  const { status, errorMessage, submit, reset } = useFakeSubmit();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); submit(); };

  return (
    <PageShell>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="eyebrow" style={{ textAlign: 'center' }}>— Contact</p>
        <WordReveal text="Get in Touch" as="h1" className="serif page-title" style={{ textAlign: 'center' }} />
        <p style={{ color: 'var(--grey-text)', maxWidth: '480px', margin: '0 auto' }}>Have a question or want to collaborate? Reach out below.</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '36px 32px' }}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
              <motion.i className="fas fa-check-circle" style={{ fontSize: '2.2rem', marginBottom: '14px', display: 'block' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 16, delay: 0.1 }} />
              <p style={{ color: 'var(--grey-text)', marginBottom: '16px' }}>Message sent. We&apos;ll get back to you at <strong>{form.email}</strong> shortly.</p>
              <button className="pill pill-ghost" onClick={() => { reset(); setForm({ name: '', email: '', message: '' }); }}>Send another message</button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div><label>Full Name</label><input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} disabled={status === 'loading'} required /></div>
              <div><label>Email</label><input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} disabled={status === 'loading'} required /></div>
              <div><label>Message</label><textarea name="message" rows={4} placeholder="Type your message..." value={form.message} onChange={handleChange} disabled={status === 'loading'} required /></div>
              {status === 'error' && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="form-error-banner">{errorMessage}</motion.div>}
              <button type="submit" className="pill pill-solid" style={{ marginTop: '6px' }} disabled={status === 'loading'} aria-busy={status === 'loading'}>
                {status === 'loading' && <span className="btn-spinner" />}
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <p style={{ textAlign: 'center', color: 'var(--grey-text)', fontSize: '0.85rem', marginTop: '20px' }}>
        Or email us at <strong>{CONTACT_INFO.email}</strong>
      </p>
      <style>{`.eyebrow { font-size: 0.76rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-text); margin-bottom: 14px; }`}</style>
    </PageShell>
  );
}
