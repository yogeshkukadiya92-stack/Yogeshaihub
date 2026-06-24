import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSiteData } from '../context/SiteDataContext';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const card = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } };

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { siteData } = useSiteData();
  const industries = siteData.industries;

  return (
    <section id="industries" className="py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ Industries
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            We Serve <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-slate-400 max-w-lg text-sm leading-relaxed">
            Whether you're in manufacturing, healthcare, or retail — we have deep domain knowledge to implement AI that fits your specific workflows.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <motion.div key={ind.name} variants={card} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="group relative rounded-2xl p-6 border border-white/[0.06] cursor-default overflow-hidden" style={{ background: '#0d1524' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/10 group-hover:to-violet-500/5 transition-all duration-500 rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-3xl mb-3">{ind.icon}</div>
                <h3 className="text-white font-bold text-base mb-1.5">{ind.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
