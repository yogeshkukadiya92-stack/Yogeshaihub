import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Calculator, TrendingUp, Clock, IndianRupee, Users } from 'lucide-react';

function Slider({ label, icon: Icon, min, max, step, value, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
          <Icon className="w-4 h-4 text-indigo-400" />
          {label}
        </div>
        <span className="text-white font-bold text-sm bg-indigo-500/15 border border-indigo-500/20 px-3 py-1 rounded-full">
          {format(value)}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-indigo-500/40 border-2 border-indigo-400 transition-all duration-150 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

function formatINR(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export default function CalculatorSection() {
  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(300);
  const [calculated, setCalculated] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const monthlyRepetitiveHours = employees * hoursPerWeek * 4;
  const monthlyCost = monthlyRepetitiveHours * hourlyCost;
  const monthlySavings = Math.round(monthlyCost * 0.65);
  const hoursSaved = Math.round(monthlyRepetitiveHours * 0.65);
  const annualSavings = monthlySavings * 12;
  const roi = monthlySavings > 0 ? Math.round((monthlySavings / 30000) * 100) : 0;

  const handleCalculate = () => setCalculated(true);

  return (
    <section id="calculator" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ ROI Calculator
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Calculate Your <span className="gradient-text">AI Savings</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            See exactly how much time and money AI automation can save your business every month.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Input Panel */}
          <div className="rounded-2xl border border-white/[0.07] p-8 space-y-8" style={{ background: '#0d1524' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-white font-bold">Your Business Details</div>
                <div className="text-slate-500 text-xs">Adjust sliders to match your situation</div>
              </div>
            </div>

            <Slider
              label="Number of Employees"
              icon={Users}
              min={1}
              max={500}
              step={1}
              value={employees}
              onChange={setEmployees}
              format={(v) => `${v} people`}
            />
            <Slider
              label="Hours Spent on Repetitive Work (per week)"
              icon={Clock}
              min={1}
              max={40}
              step={1}
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              format={(v) => `${v} hrs/week`}
            />
            <Slider
              label="Average Hourly Cost per Employee"
              icon={IndianRupee}
              min={100}
              max={2000}
              step={50}
              value={hourlyCost}
              onChange={setHourlyCost}
              format={(v) => `₹${v}/hr`}
            />

            <button
              onClick={handleCalculate}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Calculate My AI Savings
            </button>
          </div>

          {/* Results Panel */}
          <AnimatePresence mode="wait">
            {calculated ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-emerald-500/20 p-8 relative overflow-hidden"
                style={{ background: '#0d1524' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 text-sm font-semibold">AI Savings Report Generated</span>
                  </div>

                  <div className="mb-6">
                    <div className="text-slate-400 text-sm mb-1">Estimated Monthly Savings</div>
                    <div className="text-5xl font-black text-white">{formatINR(monthlySavings)}</div>
                    <div className="text-emerald-400 text-sm mt-1">+{hoursSaved} hours saved per month</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: 'Annual Savings', value: formatINR(annualSavings), color: 'text-indigo-400' },
                      { label: 'Monthly Hours Freed', value: `${hoursSaved}h`, color: 'text-violet-400' },
                      { label: 'ROI vs AI Investment', value: `${roi}%`, color: 'text-amber-400' },
                      { label: 'Cost Reduction', value: '65%', color: 'text-emerald-400' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
                        <div className={`text-xl font-black ${color}`}>{value}</div>
                        <div className="text-slate-500 text-xs mt-1">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Current Cost</span>
                      <span>With AI</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div
                          className="bg-emerald-500 rounded-full transition-all duration-1000"
                          style={{ width: '35%' }}
                        />
                        <div className="flex-1 bg-white/[0.02]" />
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">65% cost reduction achievable</div>
                  </div>

                  <a
                    href="#contact"
                    className="mt-6 w-full py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500/25 transition-colors"
                  >
                    Book Free AI Audit → Get These Savings
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                className="rounded-2xl border border-white/[0.06] p-8 flex flex-col items-center justify-center text-center gap-6"
                style={{ background: '#0d1524' }}
              >
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-indigo-400 opacity-60" />
                </div>
                <div>
                  <div className="text-white font-bold mb-2">Your Savings Report</div>
                  <div className="text-slate-500 text-sm max-w-xs">
                    Adjust the sliders and click calculate to see how much AI can save your business.
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs opacity-40">
                  {['Monthly Savings', 'Annual ROI', 'Hours Freed', 'Cost Reduction'].map((l) => (
                    <div key={l} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
                      <div className="h-5 bg-white/10 rounded mb-2" />
                      <div className="h-3 bg-white/5 rounded text-xs text-slate-500">{l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
