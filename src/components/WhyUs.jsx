import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const reasons = [
  { icon: '🏢', title: 'Business First Approach', desc: 'We don\'t lead with technology — we lead with your business outcomes. Every AI system is designed around measurable ROI.' },
  { icon: '⚡', title: 'Practical AI Implementation', desc: 'No theoretical demos. We build AI that works in your real environment, with your real data, for your real team.' },
  { icon: '🔧', title: 'Custom Built Solutions', desc: 'Off-the-shelf tools don\'t fit your business. We build from scratch, tailored to your exact workflows and requirements.' },
  { icon: '🚄', title: 'Rapid Development', desc: 'From concept to deployed AI system in weeks, not months. Our battle-tested frameworks accelerate delivery without compromising quality.' },
  { icon: '🤝', title: 'Long-Term Partnership', desc: 'We\'re not project-based consultants. We become your dedicated AI team — evolving systems as your business grows.' },
  { icon: '📈', title: 'ROI Focused', desc: 'Every engagement starts with a clear ROI target. If we can\'t show measurable impact, we don\'t take the project.' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="why-us" className="py-24 border-t border-white/[0.04] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ Why Choose Us
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Why Yogesh<br />
              <span className="gradient-text">AI Hub?</span>
            </h2>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Hundreds of AI consultancies exist. Here's why businesses choose us over the rest.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={card}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl p-6 border border-white/[0.06] cursor-default"
              style={{ background: '#0d1524' }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-2xl mb-5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300">
                {r.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2.5 group-hover:text-indigo-300 transition-colors">{r.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          {[
            '🔒 NDA Protected',
            '⚡ 4-8 Week Delivery',
            '🌍 Remote & On-site',
            '📞 24/7 Support',
            '✅ Free AI Audit',
            '💯 ROI Guarantee',
          ].map((b) => (
            <div
              key={b}
              className="px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 text-sm font-medium"
            >
              {b}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
