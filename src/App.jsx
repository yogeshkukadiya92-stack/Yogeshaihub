import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowUp, Sparkles, Settings } from 'lucide-react';

import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Industries from './components/Industries';
import Calculator from './components/Calculator';
import CaseStudies from './components/CaseStudies';
import StartupStudio from './components/StartupStudio';
import AITools from './components/AITools';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Founder from './components/Founder';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

/* ─── Sticky WhatsApp + Scroll-to-top ─── */
function StickyActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { siteData } = useSiteData();
  const whatsappHref = `https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent('Hi Yogesh, I want to book a free AI strategy consultation.')}`;

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-xl bg-[#0d1524] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold shadow-xl shadow-emerald-500/30 transition-colors text-sm"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </motion.a>
    </div>
  );
}

/* ─── Free AI Audit announcement banner ─── */
function AuditBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white py-2.5 px-4 flex items-center justify-center gap-3 text-sm font-medium"
    >
      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
      <span>
        <strong>🎯 Free AI Audit:</strong> Book your free 45-min AI opportunity assessment — no commitment.{' '}
        <a href="#contact" className="underline underline-offset-2 hover:no-underline" onClick={() => setDismissed(true)}>
          Claim Free Audit →
        </a>
      </span>
      <button onClick={() => setDismissed(true)} className="ml-2 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity" aria-label="Dismiss">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ─── Exit intent popup ─── */
function ExitIntentPopup() {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { siteData } = useSiteData();
  const whatsappHref = `https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent('Hi Yogesh, I want to book a free AI strategy consultation.')}`;

  useEffect(() => {
    if (dismissed) return;
    const handler = (e) => {
      if (e.clientY <= 10 && !shown) { setShown(true); }
    };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, [shown, dismissed]);

  if (!shown || dismissed) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDismissed(true)}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 25 }} className="w-full max-w-md rounded-2xl border border-white/[0.08] p-8 relative text-center" style={{ background: '#0d1524' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setDismissed(true)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        <div className="text-4xl mb-4">🎯</div>
        <h3 className="text-white font-black text-2xl mb-2">Wait — Get Your Free AI Audit</h3>
        <p className="text-slate-400 text-sm mb-6">Before you go, let us identify the top 3 AI opportunities in your business — completely free. No pitch, just value.</p>
        <div className="flex flex-col gap-3">
          <a href="#contact" onClick={() => setDismissed(true)} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-lg">
            Yes, I Want My Free AI Audit
          </a>
          <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={() => setDismissed(true)} className="w-full py-3 rounded-xl border border-emerald-500/30 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/10 transition-colors">
            <MessageCircle className="w-4 h-4 inline mr-1.5" /> WhatsApp Yogesh Now
          </a>
          <button onClick={() => setDismissed(true)} className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
            No thanks, I'll figure it out myself
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Admin trigger button (hidden in footer area) ─── */
function AdminTrigger({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      title="Open Admin Panel"
      className="fixed bottom-6 left-6 z-50 w-9 h-9 rounded-xl bg-[#0d1524] border border-white/[0.06] flex items-center justify-center text-slate-700 hover:text-slate-400 hover:border-white/10 transition-all"
    >
      <Settings className="w-4 h-4" />
    </button>
  );
}

/* ─── Main site content (inside provider) ─── */
function SiteContent() {
  const [adminOpen, setAdminOpen] = useState(false);

  // Keyboard shortcut: Ctrl+Shift+A
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') setAdminOpen(true);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#030711] text-slate-300">
      {/* Announcement banner */}
      <AuditBanner />

      {/* Navigation (offset by banner height when banner visible) */}
      <div className="pt-10">
        <Nav />
      </div>

      {/* Main content */}
      <main>
        <Hero />
        <Stats />
        <Services />
        <Industries />
        <Calculator />
        <CaseStudies />
        <StartupStudio />
        <AITools />
        <WhyUs />
        <Process />
        <Founder />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />

      {/* Sticky actions */}
      <StickyActions />

      {/* Exit intent popup */}
      <ExitIntentPopup />

      {/* Admin trigger (hidden gear icon, bottom-left) */}
      <AdminTrigger onOpen={() => setAdminOpen(true)} />

      {/* Admin panel slide-in */}
      <AnimatePresence>
        {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <SiteContent />
    </SiteDataProvider>
  );
}
