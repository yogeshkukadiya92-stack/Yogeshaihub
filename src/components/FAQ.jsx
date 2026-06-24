import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-indigo-500/30 bg-indigo-900/10' : 'border-white/[0.06] hover:border-white/10'
      }`}
      style={{ background: isOpen ? undefined : '#0d1524' }}
    >
      <button onClick={onToggle} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
        <span className={`font-semibold text-sm leading-snug transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>
          {faq.q}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'border-white/10 text-slate-500'
        }`}>
          {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <div className="px-6 pb-6">
              <div className="w-full h-px bg-white/[0.06] mb-4" />
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { siteData } = useSiteData();
  const faqs = siteData.faqs;

  return (
    <section id="faq" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Common Questions<br /><span className="gradient-text">Answered</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Everything you need to know about working with Yogesh AI Hub. Still have questions? Let's chat.
          </p>
        </motion.div>

        {inView && (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-4">Have more questions?</p>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.08] text-slate-300 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 text-sm font-medium">
            Ask Yogesh directly →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
