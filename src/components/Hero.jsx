import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const whatsappHref = `https://wa.me/919825344428?text=${encodeURIComponent('Hi Yogesh, I want to book a free AI strategy consultation.')}`;

const workflowSteps = [
  { id: 1, label: 'Business Problem', icon: '🎯', color: 'from-rose-500/20 to-orange-500/20', border: 'border-rose-500/30', dot: 'bg-rose-400' },
  { id: 2, label: 'AI Analysis', icon: '🧠', color: 'from-violet-500/20 to-indigo-500/20', border: 'border-violet-500/30', dot: 'bg-violet-400' },
  { id: 3, label: 'Automation', icon: '⚡', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', dot: 'bg-cyan-400' },
  { id: 4, label: 'Growth', icon: '📈', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
];

function WorkflowAnimation() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % 4), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-900/30 via-violet-900/20 to-cyan-900/20 blur-2xl" />

      <div className="relative glass-card rounded-2xl p-6 border border-white/[0.07]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs text-slate-500 ml-2 font-mono">ai.workflow.engine</span>
        </div>

        {/* Workflow nodes */}
        <div className="flex flex-col gap-3">
          {workflowSteps.map((step, i) => (
            <div key={step.id}>
              <motion.div
                animate={active >= i ? { opacity: 1, x: 0 } : { opacity: 0.4, x: -4 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r ${step.color} border ${step.border} transition-all duration-300 ${active === i ? 'shadow-lg' : ''}`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${step.dot} ${active === i ? 'animate-pulse' : ''}`} />
                  {active === i && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${step.dot} opacity-30`}
                      animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
                <span className="text-xl">{step.icon}</span>
                <div className="flex-1">
                  <span className="text-white text-sm font-semibold">{step.label}</span>
                </div>
                {active > i && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center"
                  >
                    <span className="text-emerald-400 text-xs">✓</span>
                  </motion.div>
                )}
              </motion.div>
              {i < workflowSteps.length - 1 && (
                <div className="ml-[22px] my-1 flex flex-col gap-0.5">
                  {[0, 1, 2].map((d) => (
                    <motion.div
                      key={d}
                      className="w-0.5 h-1 rounded-full"
                      animate={active > i ? { backgroundColor: '#6366f1' } : { backgroundColor: '#1e293b' }}
                      transition={{ delay: d * 0.1 }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Processing indicator */}
        <div className="mt-5 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-mono">Processing...</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-full"
              animate={{ width: [`${(active / 3) * 100}%`] }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Live metrics */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[['Tasks', '2.4k'], ['Saved', '₹1.2M'], ['Time', '89%']].map(([k, v]) => (
            <div key={k} className="bg-white/[0.03] rounded-lg p-2.5 text-center">
              <div className="text-white font-bold text-sm">{v}</div>
              <div className="text-slate-500 text-xs">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6">
                <Sparkles className="w-3 h-3" />
                AI Consultancy · Automation · Startup Studio
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
            >
              Build AI Systems That{' '}
              <span className="gradient-text">Save Time,</span>{' '}
              Reduce Costs{' '}
              <span className="text-slate-400">&</span>{' '}
              <span className="gradient-text">Scale</span> Your Business
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg"
            >
              We help businesses implement AI, automate operations, build custom AI tools and launch AI-powered startups — delivering measurable ROI from day one.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300"
              >
                Book Free AI Consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 font-medium"
              >
                Explore Solutions <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex items-center gap-6">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {['🟢', '🟣', '🔵'].map((e, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs">{e}</div>
                  ))}
                </div>
                <span className="text-sm text-slate-400">Trusted by 50+ businesses</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Workflow Animation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorkflowAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
