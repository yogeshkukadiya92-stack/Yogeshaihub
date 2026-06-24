import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react';

const whatsappHref = `https://wa.me/919825344428?text=${encodeURIComponent('Hi Yogesh, I want to book a free AI strategy consultation.')}`;
const calendlyLink = 'https://calendly.com/yogeshkukadiya92';

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-violet-950/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-8">
            ✦ Start Today — Free
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Ready To{' '}
            <span className="gradient-text">Build</span>
            <br />
            With AI?
          </h2>

          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Let's identify the highest ROI opportunities for your business. A free 45-minute AI strategy call — no sales pitch, just actionable insights.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={calendlyLink}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-2xl shadow-indigo-500/30 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Book Free AI Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold text-base hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Yogesh
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            {['✅ No commitment required', '✅ 45-min free call', '✅ Actionable AI roadmap', '✅ Honest ROI estimate'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 rounded-2xl border border-white/[0.07] p-8 grid sm:grid-cols-3 gap-6 text-left"
            style={{ background: '#0d1524' }}
          >
            {[
              { icon: '📧', label: 'Email', value: 'yogeshkukadiya92@gmail.com', href: 'mailto:yogeshkukadiya92@gmail.com' },
              { icon: '📱', label: 'Phone / WhatsApp', value: '+91 98253 44428', href: whatsappHref },
              { icon: '📍', label: 'Location', value: 'Surat, Gujarat, India', href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label}>
                <div className="flex items-center gap-2 mb-2">
                  <span>{icon}</span>
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">{label}</span>
                </div>
                {href ? (
                  <a href={href} className="text-slate-300 hover:text-white transition-colors text-sm font-medium" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {value}
                  </a>
                ) : (
                  <span className="text-slate-300 text-sm font-medium">{value}</span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
