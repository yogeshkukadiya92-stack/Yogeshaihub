import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Rocket } from 'lucide-react';

const stages = [
  { icon: '💡', label: 'Idea', desc: 'Validate your AI startup concept with market research and feasibility analysis', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10 border-amber-500/20' },
  { icon: '🔍', label: 'Validation', desc: 'Customer discovery, problem-solution fit and competitive landscape', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-500/10 border-blue-500/20' },
  { icon: '⚙️', label: 'MVP', desc: 'Build your minimum viable AI product in 4-8 weeks with core features', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-500/10 border-violet-500/20' },
  { icon: '🚀', label: 'Launch', desc: 'Go to market with a tested product, pricing strategy and growth playbook', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-500/10 border-rose-500/20' },
  { icon: '📈', label: 'Scale', desc: 'Growth engineering, user acquisition, product-led growth and optimization', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { icon: '💰', label: 'Funding Ready', desc: 'Investor deck, metrics dashboard, due diligence prep and VC introductions', color: 'from-cyan-500 to-sky-500', bg: 'bg-cyan-500/10 border-cyan-500/20' },
];

export default function StartupStudio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="startup" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ Startup Studio
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            From Idea to <span className="gradient-text">AI Startup</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            We're not just consultants. We're co-builders. Yogesh AI Hub acts as your technical co-founder, taking your AI startup from concept to fundable company.
          </p>
        </motion.div>

        {/* Timeline - Desktop horizontal, Mobile vertical */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-px bg-gradient-to-r from-amber-500/30 via-violet-500/50 to-cyan-500/30" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-4"
              >
                {/* Node */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-14 h-14 rounded-2xl border ${stage.bg} flex items-center justify-center text-2xl relative z-10 cursor-default shadow-lg`}
                  >
                    {stage.icon}
                  </motion.div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stage.color} opacity-10 blur-lg`} />
                  {/* Step number */}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#030711] border border-white/10 flex items-center justify-center">
                    <span className="text-xs text-slate-400 font-bold">{i + 1}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{stage.label}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{stage.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 relative rounded-2xl border border-indigo-500/20 p-8 sm:p-10 overflow-hidden"
          style={{ background: '#0d1524' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-violet-900/20 to-transparent rounded-2xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white font-black text-2xl mb-1">Launch Your AI Startup</h3>
                <p className="text-slate-400 text-sm max-w-md">
                  Have an AI startup idea? Let's validate it, build the MVP and get you to market — fast.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 whitespace-nowrap"
            >
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
