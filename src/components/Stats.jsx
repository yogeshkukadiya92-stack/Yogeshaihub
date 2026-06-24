import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

function Counter({ target, suffix, color, started }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span className={`text-4xl sm:text-5xl font-black ${color}`}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { siteData } = useSiteData();
  const stats = siteData.stats;

  return (
    <section ref={ref} className="py-16 border-y border-white/[0.05] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <Counter target={s.value} suffix={s.suffix} color={s.color} started={inView} />
              <div className="mt-2 text-sm text-slate-500 font-medium">{s.label}</div>
              <div className={`mx-auto mt-3 w-10 h-0.5 rounded-full ${s.color.replace('text-', 'bg-')} opacity-40 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
