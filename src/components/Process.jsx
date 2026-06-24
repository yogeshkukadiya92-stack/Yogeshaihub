import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    no: '01',
    title: 'Discovery',
    icon: '🔎',
    desc: 'Deep dive into your business — goals, workflows, pain points, data sources and current tech stack. We map every process that could benefit from AI.',
    duration: '1-2 days',
    output: 'Business Process Map',
    color: 'indigo',
  },
  {
    no: '02',
    title: 'AI Audit',
    icon: '📋',
    desc: 'Systematic audit of all automation opportunities. We rank them by ROI, complexity and implementation speed to build the perfect roadmap.',
    duration: '2-3 days',
    output: 'AI Opportunity Report',
    color: 'violet',
  },
  {
    no: '03',
    title: 'Strategy',
    icon: '🗺️',
    desc: 'Design the AI architecture, tech stack, data pipelines and integration points. Define KPIs, success metrics and timeline with you.',
    duration: '1 week',
    output: 'AI Strategy Blueprint',
    color: 'purple',
  },
  {
    no: '04',
    title: 'Build',
    icon: '⚙️',
    desc: 'Agile development with weekly demos. We build, test and refine in tight cycles — you see progress every step of the way.',
    duration: '3-6 weeks',
    output: 'Working AI System',
    color: 'cyan',
  },
  {
    no: '05',
    title: 'Deploy',
    icon: '🚀',
    desc: 'Production deployment with monitoring, alerts and fallback systems. Team training and documentation included in every project.',
    duration: '1 week',
    output: 'Live AI System',
    color: 'emerald',
  },
  {
    no: '06',
    title: 'Scale',
    icon: '📈',
    desc: 'Monthly performance reviews, system optimization and expansion to new use cases. Your AI systems grow as your business grows.',
    duration: 'Ongoing',
    output: 'Growth Roadmap',
    color: 'teal',
  },
];

const colorMap = {
  indigo: { bg: 'bg-indigo-500/10 border-indigo-500/20', text: 'text-indigo-400', glow: 'shadow-indigo-500/25', active: 'border-indigo-500/40 bg-indigo-900/20' },
  violet: { bg: 'bg-violet-500/10 border-violet-500/20', text: 'text-violet-400', glow: 'shadow-violet-500/25', active: 'border-violet-500/40 bg-violet-900/20' },
  purple: { bg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-400', glow: 'shadow-purple-500/25', active: 'border-purple-500/40 bg-purple-900/20' },
  cyan: { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-400', glow: 'shadow-cyan-500/25', active: 'border-cyan-500/40 bg-cyan-900/20' },
  emerald: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', glow: 'shadow-emerald-500/25', active: 'border-emerald-500/40 bg-emerald-900/20' },
  teal: { bg: 'bg-teal-500/10 border-teal-500/20', text: 'text-teal-400', glow: 'shadow-teal-500/25', active: 'border-teal-500/40 bg-teal-900/20' },
};

export default function Process() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const c = colorMap[steps[active].color];

  return (
    <section id="process" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ Our Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            How We Deliver<br />
            <span className="gradient-text">AI That Works</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Step Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            {steps.map((step, i) => {
              const sc = colorMap[step.color];
              const isActive = active === i;
              return (
                <button
                  key={step.no}
                  onClick={() => setActive(i)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-300 flex items-center gap-4 ${
                    isActive ? `${sc.active} shadow-lg ${sc.glow}` : 'border-white/[0.05] hover:border-white/[0.10] hover:bg-white/[0.02]'
                  }`}
                  style={{ background: isActive ? undefined : '#0d1524' }}
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg flex-shrink-0 ${isActive ? sc.bg : 'bg-white/[0.04] border-white/[0.06]'}`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${isActive ? sc.text : 'text-slate-600'}`}>{step.no}</span>
                      <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.title}</span>
                    </div>
                    {isActive && (
                      <div className={`text-xs mt-0.5 ${sc.text}`}>{step.duration}</div>
                    )}
                  </div>
                  {isActive && (
                    <div className={`w-1.5 h-1.5 rounded-full ${sc.bg.replace('bg-', 'bg-').split('/')[0]}-400 animate-pulse flex-shrink-0`} />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Detail Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl border p-8 ${c.active}`}
              style={{ background: '#0d1524' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl border ${c.bg} flex items-center justify-center text-3xl shadow-lg ${c.glow}`}>
                  {steps[active].icon}
                </div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-1`}>
                    Step {steps[active].no}
                  </div>
                  <h3 className="text-white font-black text-2xl">{steps[active].title}</h3>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-8">{steps[active].desc}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className={`rounded-xl border p-4 ${c.bg}`}>
                  <div className={`text-xs font-bold uppercase tracking-wide ${c.text} mb-1`}>Duration</div>
                  <div className="text-white font-bold">{steps[active].duration}</div>
                </div>
                <div className={`rounded-xl border p-4 ${c.bg}`}>
                  <div className={`text-xs font-bold uppercase tracking-wide ${c.text} mb-1`}>Deliverable</div>
                  <div className="text-white font-bold text-sm">{steps[active].output}</div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 text-sm disabled:opacity-30 hover:text-white hover:border-white/20 transition-all"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                  disabled={active === steps.length - 1}
                  className={`px-4 py-2 rounded-lg border text-sm disabled:opacity-30 transition-all ${c.bg} ${c.text} hover:opacity-80`}
                >
                  Next Step →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
