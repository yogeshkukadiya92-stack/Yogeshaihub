import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: '🧠',
    title: 'AI Consultancy',
    desc: 'Strategic AI roadmaps tailored to your business. Identify high-ROI automation opportunities and implement AI that actually moves the needle.',
    size: 'large',
    tag: 'Strategy',
    gradient: 'from-indigo-900/40 via-violet-900/20 to-transparent',
    accent: 'border-indigo-500/30',
    tagColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
  },
  {
    icon: '⚡',
    title: 'Business Automation',
    desc: 'Eliminate repetitive work. Automate workflows across your entire operation.',
    size: 'medium',
    tag: 'Automation',
    gradient: 'from-amber-900/30 to-transparent',
    accent: 'border-amber-500/20',
    tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
  },
  {
    icon: '🤖',
    title: 'AI Agents',
    desc: 'Deploy intelligent agents that work 24/7 — handling leads, support, and operations autonomously.',
    size: 'medium',
    tag: 'Agents',
    gradient: 'from-violet-900/30 to-transparent',
    accent: 'border-violet-500/20',
    tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
  },
  {
    icon: '🛠️',
    title: 'Custom AI Tools',
    desc: 'Purpose-built AI software for your unique business needs.',
    size: 'small',
    tag: 'Dev',
    gradient: 'from-blue-900/30 to-transparent',
    accent: 'border-blue-500/20',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  },
  {
    icon: '🚀',
    title: 'SaaS Products',
    desc: 'From idea to market-ready SaaS with AI at the core.',
    size: 'small',
    tag: 'Product',
    gradient: 'from-teal-900/30 to-transparent',
    accent: 'border-teal-500/20',
    tagColor: 'bg-teal-500/15 text-teal-300 border-teal-500/20',
  },
  {
    icon: '💬',
    title: 'AI Chatbots',
    desc: 'Conversational AI that understands your business and customers inside out.',
    size: 'medium',
    tag: 'NLP',
    gradient: 'from-rose-900/30 to-transparent',
    accent: 'border-rose-500/20',
    tagColor: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
  },
  {
    icon: '🎓',
    title: 'AI Training & Workshops',
    desc: 'Upskill your entire team on AI tools and implementation.',
    size: 'medium',
    tag: 'Education',
    gradient: 'from-purple-900/30 to-transparent',
    accent: 'border-purple-500/20',
    tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
  },
  {
    icon: '🔄',
    title: 'Process Optimization',
    desc: 'AI-powered analysis to find and fix bottlenecks.',
    size: 'small',
    tag: 'Ops',
    gradient: 'from-cyan-900/30 to-transparent',
    accent: 'border-cyan-500/20',
    tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  },
];

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function ServiceCard({ s }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl p-6 border ${s.accent} bg-gradient-to-br ${s.gradient} bg-[#0d1524] overflow-hidden group cursor-default flex flex-col gap-4`}
      style={{ background: '#0d1524' }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="text-3xl">{s.icon}</div>
          <span className={`tag-badge border ${s.tagColor}`}>{s.tag}</span>
        </div>
        <h3 className="text-white font-bold text-lg leading-tight">{s.title}</h3>
        <p className="mt-2 text-slate-400 text-sm leading-relaxed">{s.desc}</p>
      </div>
      <div className="relative z-10 mt-auto">
        <a
          href="#contact"
          className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1 font-medium"
        >
          Learn more <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
        </a>
      </div>
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ What We Do
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Every AI Solution<br />
              <span className="gradient-text">Your Business Needs</span>
            </h2>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              From strategy to execution — we cover the full AI implementation stack, customized for your industry and goals.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]"
        >
          {/* Large card - AI Consultancy (spans 2 cols, 2 rows) */}
          <motion.div
            variants={card}
            whileHover={{ y: -4 }}
            className="sm:col-span-2 lg:row-span-2 relative rounded-2xl border border-indigo-500/20 overflow-hidden group cursor-default"
            style={{ background: '#0d1524' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-violet-900/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
            <div className="relative z-10 h-full flex flex-col p-8">
              <div className="flex items-start justify-between">
                <div className="text-5xl mb-4">🧠</div>
                <span className="tag-badge border bg-indigo-500/15 text-indigo-300 border-indigo-500/20">Strategy</span>
              </div>
              <h3 className="text-white font-black text-2xl leading-tight mb-3">AI Consultancy</h3>
              <p className="text-slate-400 leading-relaxed flex-1">
                Strategic AI roadmaps tailored to your business. We identify the highest-ROI automation opportunities, design the right AI architecture, and guide you through every phase of AI adoption — from proof-of-concept to full deployment.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['ROI Analysis', 'AI Roadmap', 'Tech Selection', 'Team Training'].map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Medium cards */}
          {services.slice(1, 8).map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
