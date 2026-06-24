import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const cases = [
  {
    tag: 'Manufacturing',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    problem: 'Manual Reporting taking 40+ hours/week',
    solution: 'Built an AI-powered analytics dashboard with automated data pipelines',
    result: 'Real-time insights replacing 3 full-time reporting roles',
    metrics: [
      { value: '80%', label: 'Time Saved' },
      { value: '₹8L', label: 'Monthly Saved' },
      { value: '2 days', label: 'Payback Period' },
    ],
    gradient: 'from-blue-900/30 to-transparent',
    border: 'border-blue-500/15',
  },
  {
    tag: 'E-commerce',
    tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
    problem: 'Customer support overwhelmed with 500+ tickets/day',
    solution: 'Deployed multi-channel AI chatbot with escalation to human agents',
    result: '85% of tickets resolved automatically, 24/7 coverage',
    metrics: [
      { value: '85%', label: 'Auto-resolved' },
      { value: '60%', label: 'Cost Reduction' },
      { value: '3x', label: 'Satisfaction' },
    ],
    gradient: 'from-violet-900/30 to-transparent',
    border: 'border-violet-500/15',
  },
  {
    tag: 'Real Estate',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    problem: 'Sales leads going cold — 72hr response time',
    solution: 'AI lead qualification + automated WhatsApp follow-up sequences',
    result: 'Instant response, personalized nurturing, 3x conversion rate',
    metrics: [
      { value: '< 2min', label: 'Response Time' },
      { value: '3x', label: 'Productivity' },
      { value: '45%', label: 'More Deals' },
    ],
    gradient: 'from-emerald-900/30 to-transparent',
    border: 'border-emerald-500/15',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="case-studies" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ Case Studies
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Real Results,<br />
              <span className="gradient-text">Real Businesses</span>
            </h2>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Not just prototypes. These are live AI systems delivering measurable ROI for real businesses.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid lg:grid-cols-3 gap-6"
        >
          {cases.map((c) => (
            <motion.div
              key={c.tag}
              variants={card}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-2xl border ${c.border} overflow-hidden group cursor-default flex flex-col`}
              style={{ background: '#0d1524' }}
            >
              <div className={`p-6 flex-1 bg-gradient-to-br ${c.gradient}`}>
                <span className={`tag-badge border ${c.tagColor} inline-block mb-4`}>{c.tag}</span>

                {/* Problem */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-rose-300 font-semibold uppercase tracking-wide mb-2">
                    <div className="w-1 h-1 rounded-full bg-rose-400" />
                    Problem
                  </div>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">{c.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-indigo-300 font-semibold uppercase tracking-wide mb-2">
                    <div className="w-1 h-1 rounded-full bg-indigo-400" />
                    Solution
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{c.solution}</p>
                </div>

                {/* Result */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold uppercase tracking-wide mb-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    Result
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{c.result}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="border-t border-white/[0.05] p-5 bg-white/[0.01]">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-white font-black text-lg">{m.value}</div>
                      <div className="text-slate-500 text-xs">{m.label}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 text-xs font-medium flex items-center justify-center gap-1.5 hover:text-white hover:border-white/10 transition-colors group/btn">
                  Read Full Case Study
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
