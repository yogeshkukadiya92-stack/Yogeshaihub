import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    title: 'CEO, TechManufacture Ltd.',
    location: 'Surat, Gujarat',
    avatar: '👨‍💼',
    rating: 5,
    quote: 'Yogesh transformed our entire reporting system. What used to take our team 40+ hours a week now happens automatically. The ROI was visible within the first month. Absolutely game-changing.',
    result: '40 hrs/week saved',
    industry: 'Manufacturing',
  },
  {
    name: 'Priya Mehta',
    title: 'Founder, StyleRetail',
    location: 'Mumbai, Maharashtra',
    avatar: '👩‍💼',
    rating: 5,
    quote: 'The AI chatbot Yogesh built for us handles 85% of customer queries without any human involvement. Our team is now free to focus on complex issues while the AI handles everything else.',
    result: '85% support automated',
    industry: 'Retail',
  },
  {
    name: 'Amit Patel',
    title: 'Director, GoldJewels',
    location: 'Rajkot, Gujarat',
    avatar: '🧑‍💼',
    rating: 5,
    quote: 'We were skeptical about AI in our jewellery business, but Yogesh understood our industry deeply. The inventory AI and custom pricing tool have literally paid for themselves 5x over.',
    result: '5x investment returned',
    industry: 'Jewellery',
  },
  {
    name: 'Dr. Sneha Joshi',
    title: 'Director, HealthFirst Clinics',
    location: 'Ahmedabad, Gujarat',
    avatar: '👩‍⚕️',
    rating: 5,
    quote: 'Our patient management was a nightmare. Yogesh AI Hub built us an intelligent scheduling and follow-up system. No-shows reduced by 60% and patient satisfaction went through the roof.',
    result: '60% less no-shows',
    industry: 'Healthcare',
  },
  {
    name: 'Vikram Nair',
    title: 'Co-founder, EduLeap',
    location: 'Bangalore, Karnataka',
    avatar: '👨‍🎓',
    rating: 5,
    quote: 'Within 6 weeks, Yogesh had our AI tutoring platform live. The speed, quality and technical depth were exceptional. He\'s not just a developer — he\'s a genuine strategic partner.',
    result: 'Platform live in 6 weeks',
    industry: 'Education',
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < count ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const prev = () => setCurrent((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((v) => (v + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ Client Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Businesses <span className="gradient-text">Love Working</span><br />With Us
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Don't take our word for it. Here's what our clients say after implementing AI with Yogesh AI Hub.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/[0.08] p-8 sm:p-10 relative overflow-hidden"
            style={{ background: '#0d1524' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/15 to-transparent rounded-2xl" />
            <div className="absolute top-0 right-0 text-[120px] leading-none opacity-5 pointer-events-none select-none">"</div>

            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-white/[0.08] flex items-center justify-center text-2xl flex-shrink-0">
                  {testimonials[current].avatar}
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold">{testimonials[current].name}</div>
                  <div className="text-slate-400 text-sm">{testimonials[current].title}</div>
                  <div className="text-slate-600 text-xs">{testimonials[current].location}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Stars count={testimonials[current].rating} />
                  <span className="tag-badge bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">{testimonials[current].industry}</span>
                </div>
              </div>

              <blockquote className="text-slate-300 text-lg leading-relaxed mb-6">
                "{testimonials[current].quote}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold">
                  ✅ {testimonials[current].result}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2 bg-indigo-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mini testimonial cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid md:grid-cols-3 gap-4"
        >
          {testimonials.slice(0, 3).map((t, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`text-left rounded-xl p-4 border transition-all duration-300 ${
                current === i ? 'border-indigo-500/30 bg-indigo-900/10' : 'border-white/[0.05] hover:border-white/10'
              }`}
              style={{ background: current === i ? undefined : '#0d1524' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{t.avatar}</span>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.industry}</div>
                </div>
              </div>
              <Stars count={t.rating} />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
