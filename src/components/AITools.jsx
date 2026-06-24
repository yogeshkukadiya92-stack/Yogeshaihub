import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Play, X, Zap } from 'lucide-react';

const tools = [
  {
    name: 'AI Sales Assistant',
    icon: '🤖',
    tag: 'Sales',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    desc: 'Qualifies leads, answers questions, books demos — automatically, 24/7.',
    preview: {
      title: 'Live Conversation Preview',
      messages: [
        { from: 'user', text: 'What does your product do?' },
        { from: 'ai', text: 'Great question! We help businesses like yours save 40% on operational costs. Are you currently using any automation tools? 🎯' },
        { from: 'user', text: 'Not really, we do everything manually.' },
        { from: 'ai', text: 'Perfect opportunity then! I can schedule a 15-min demo with Yogesh. Does tomorrow 3 PM work? ✨' },
      ],
    },
    stats: ['3x Lead Conversion', '24/7 Active', '<2sec Response'],
  },
  {
    name: 'AI Report Analyzer',
    icon: '📊',
    tag: 'Analytics',
    tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    desc: 'Upload any business report. Get instant AI-powered insights and recommendations.',
    preview: {
      title: 'Report Analysis',
      messages: [
        { from: 'system', text: '📁 Q3-Sales-Report.pdf uploaded' },
        { from: 'ai', text: '✅ Analysis complete. Found 3 critical insights:\n1. Revenue up 23% — driven by Product A\n2. Customer churn spiked in segment B\n3. Top opportunity: upsell to 240 existing clients' },
      ],
    },
    stats: ['80% Time Saved', 'Any Format', 'Instant Insights'],
  },
  {
    name: 'AI Customer Support',
    icon: '💬',
    tag: 'Support',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    desc: 'Resolve 85% of support tickets automatically. Escalate complex issues to humans seamlessly.',
    preview: {
      title: 'Support Agent Preview',
      messages: [
        { from: 'user', text: 'I need to cancel my order #4521' },
        { from: 'ai', text: 'I found Order #4521 — ₹2,499 placed on June 20. I can process the cancellation now and issue a full refund in 3-5 days. Proceed? ✅' },
        { from: 'user', text: 'Yes please' },
        { from: 'ai', text: '✅ Cancellation processed. Refund of ₹2,499 initiated. You\'ll receive a confirmation email shortly.' },
      ],
    },
    stats: ['85% Auto-resolve', '60% Cost Cut', '4.9★ Rating'],
  },
  {
    name: 'AI Content Engine',
    icon: '✍️',
    tag: 'Marketing',
    tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
    desc: 'Generate on-brand content for social, email, ads and SEO — at scale.',
    preview: {
      title: 'Content Generation',
      messages: [
        { from: 'user', text: 'Write a LinkedIn post about our new AI product launch' },
        { from: 'ai', text: '🚀 The future of [your industry] is here.\n\nWe just launched [Product] — built with AI to help you do X in half the time.\n\nEarly access: [link]\n\n#AI #Innovation #Startup' },
      ],
    },
    stats: ['10x Faster', 'On-Brand', 'Multi-channel'],
  },
  {
    name: 'Lead Qualification Agent',
    icon: '🎯',
    tag: 'Sales Ops',
    tagColor: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
    desc: 'Scores and qualifies every lead instantly. Route hot leads to sales, nurture cold ones automatically.',
    preview: {
      title: 'Lead Scoring Dashboard',
      messages: [
        { from: 'system', text: '📥 New lead: Rajesh Kumar, CEO, 50-person company' },
        { from: 'ai', text: '🔥 SCORE: 92/100 — HOT LEAD\n✅ Budget: ₹5-10L\n✅ Decision maker\n✅ Urgency: Immediate\n→ Routing to Yogesh\'s calendar...' },
      ],
    },
    stats: ['95% Accuracy', 'Instant Score', '3x Conversions'],
  },
];

function PreviewModal({ tool, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-2xl border border-white/[0.08] overflow-hidden"
        style={{ background: '#0d1524' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <div className="text-white font-bold text-sm">{tool.name}</div>
              <div className="text-slate-500 text-xs">{tool.preview.title}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
          {tool.preview.messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                  msg.from === 'user'
                    ? 'bg-indigo-600 text-white'
                    : msg.from === 'system'
                    ? 'bg-white/5 border border-white/10 text-slate-400 w-full text-center rounded-lg'
                    : 'bg-white/[0.05] border border-white/[0.08] text-slate-300'
                }`}
              >
                {msg.from === 'ai' && <span className="text-indigo-400 font-bold mr-1">AI:</span>}
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <div className="flex items-center gap-1.5 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        <div className="p-4 border-t border-white/[0.05] bg-white/[0.01]">
          <a
            href="#contact"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <Zap className="w-4 h-4" /> Build This For My Business
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function AITools() {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="tools" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ AI Tools Showcase
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              See Our AI Tools<br />
              <span className="gradient-text">In Action</span>
            </h2>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Click any tool to see a live preview of how it works in a real business scenario.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={card}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col gap-4 group cursor-pointer"
              style={{ background: '#0d1524' }}
              onClick={() => setSelected(tool)}
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{tool.icon}</div>
                <span className={`tag-badge border ${tool.tagColor}`}>{tool.tag}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{tool.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.stats.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-400">
                    {s}
                  </span>
                ))}
              </div>
              <button className="mt-auto flex items-center gap-2 text-xs text-slate-500 group-hover:text-indigo-400 transition-colors font-medium">
                <Play className="w-3.5 h-3.5" /> Live Preview
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <PreviewModal tool={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
