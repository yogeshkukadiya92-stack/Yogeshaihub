import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowUp, Sparkles } from 'lucide-react';

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

const whatsappHref = `https://wa.me/919825344428?text=${encodeURIComponent('Hi Yogesh, I want to book a free AI strategy consultation.')}`;

function StickyActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

function AuditBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white py-2.5 px-4 flex items-center justify-center gap-3 text-sm font-medium"
    >
      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
      <span>
        <strong>🎯 Free AI Audit:</strong> Book your free 45-min AI opportunity assessment — no commitment.{' '}
        <a href="#contact" className="underline underline-offset-2 hover:no-underline">
          Claim Free Audit →
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-2 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#030711] text-slate-300">
      {/* Announcement banner */}
      <AuditBanner />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Social Proof Stats */}
        <Stats />

        {/* Section 3: Services - Bento Grid */}
        <Services />

        {/* Section 4: Industries */}
        <Industries />

        {/* Section 5: AI Opportunity Calculator */}
        <Calculator />

        {/* Section 6: Case Studies */}
        <CaseStudies />

        {/* Section 7: Startup Studio */}
        <StartupStudio />

        {/* Section 8: AI Tools Showcase */}
        <AITools />

        {/* Section 9: Why Yogesh AI Hub */}
        <WhyUs />

        {/* Section 10: Process */}
        <Process />

        {/* Section 11: Founder */}
        <Founder />

        {/* Section 12: Testimonials */}
        <Testimonials />

        {/* Section 13: FAQ */}
        <FAQ />

        {/* Section 14: Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Actions */}
      <StickyActions />
    </div>
  );
}
