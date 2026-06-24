import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Eye, EyeOff, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Lock, Unlock, Settings } from 'lucide-react';
import { useSiteData, DEFAULT_SITE_DATA } from '../context/SiteDataContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/* ─── Small reusable inputs ─── */
function Field({ label, value, onChange, multiline = false, rows = 3, placeholder = '' }) {
  const cls = 'w-full bg-[#030711] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all';
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</label>}
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={cls} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-xl border border-white/[0.06] p-5" style={{ background: '#0d1524' }}>
      <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function AddBtn({ onClick, label = 'Add Item' }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg px-3 py-2 transition-all"
    >
      <Plus className="w-3.5 h-3.5" /> {label}
    </button>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick} className="p-1.5 rounded-md text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}

/* ─── TAB PANELS ─── */
function GeneralTab({ data, onChange }) {
  const c = data.contact;
  const set = (k, v) => onChange({ contact: { ...c, [k]: v } });
  return (
    <div className="space-y-4">
      <SectionCard title="Contact Info">
        <Field label="Email" value={c.email} onChange={(v) => set('email', v)} />
        <Field label="Phone" value={c.phone} onChange={(v) => set('phone', v)} />
        <Field label="WhatsApp Number (numbers only)" value={c.whatsapp} onChange={(v) => set('whatsapp', v)} placeholder="919825344428" />
        <Field label="Location" value={c.location} onChange={(v) => set('location', v)} />
        <Field label="Calendly URL" value={c.calendly} onChange={(v) => set('calendly', v)} />
      </SectionCard>
    </div>
  );
}

function HeroTab({ data, onChange }) {
  const h = data.hero;
  const set = (k, v) => onChange({ hero: { ...h, [k]: v } });
  return (
    <div className="space-y-4">
      <SectionCard title="Hero Content">
        <Field label="Badge Text" value={h.badge} onChange={(v) => set('badge', v)} />
        <Field label="Main Headline" value={h.headline} onChange={(v) => set('headline', v)} multiline rows={2} />
        <Field label="Description" value={h.description} onChange={(v) => set('description', v)} multiline rows={3} />
        <Field label="Primary Button Text" value={h.ctaPrimary} onChange={(v) => set('ctaPrimary', v)} />
        <Field label="Secondary Button Text" value={h.ctaSecondary} onChange={(v) => set('ctaSecondary', v)} />
        <Field label="Trust Text (below buttons)" value={h.trustText} onChange={(v) => set('trustText', v)} />
      </SectionCard>
    </div>
  );
}

function StatsTab({ data, onChange }) {
  const stats = data.stats;
  const update = (i, k, v) => {
    const next = stats.map((s, idx) => idx === i ? { ...s, [k]: k === 'value' ? Number(v) : v } : s);
    onChange({ stats: next });
  };
  return (
    <div className="space-y-3">
      {stats.map((s, i) => (
        <SectionCard key={i} title={`Stat ${i + 1}`}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Number" value={s.value} onChange={(v) => update(i, 'value', v)} />
            <Field label="Suffix (e.g. +, %)" value={s.suffix} onChange={(v) => update(i, 'suffix', v)} />
          </div>
          <Field label="Label" value={s.label} onChange={(v) => update(i, 'label', v)} />
        </SectionCard>
      ))}
    </div>
  );
}

function ServicesTab({ data, onChange }) {
  const services = data.services;
  const [collapsed, setCollapsed] = useState(services.map(() => true));

  const update = (i, k, v) => {
    const next = services.map((s, idx) => idx === i ? { ...s, [k]: v } : s);
    onChange({ services: next });
  };
  const remove = (i) => {
    onChange({ services: services.filter((_, idx) => idx !== i) });
    setCollapsed((c) => c.filter((_, idx) => idx !== i));
  };
  const add = () => {
    onChange({ services: [...services, { icon: '✨', title: 'New Service', desc: 'Description...', tag: 'New', gradient: 'from-indigo-900/30 to-transparent', accent: 'border-indigo-500/20', tagColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20' }] });
    setCollapsed((c) => [...c, false]);
  };
  const toggle = (i) => setCollapsed((c) => c.map((v, idx) => idx === i ? !v : v));

  return (
    <div className="space-y-3">
      {services.map((s, i) => (
        <div key={i} className="rounded-xl border border-white/[0.06]" style={{ background: '#0d1524' }}>
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggle(i)}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{s.icon}</span>
              <span className="text-white text-sm font-medium">{s.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <RemoveBtn onClick={(e) => { e.stopPropagation(); remove(i); }} />
              {collapsed[i] ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronUp className="w-4 h-4 text-slate-500" />}
            </div>
          </div>
          {!collapsed[i] && (
            <div className="px-4 pb-4 space-y-3 border-t border-white/[0.05] pt-4">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Emoji Icon" value={s.icon} onChange={(v) => update(i, 'icon', v)} placeholder="⚡" />
                <Field label="Title" value={s.title} onChange={(v) => update(i, 'title', v)} />
                <Field label="Tag Badge" value={s.tag} onChange={(v) => update(i, 'tag', v)} />
              </div>
              <Field label="Description" value={s.desc} onChange={(v) => update(i, 'desc', v)} multiline rows={2} />
            </div>
          )}
        </div>
      ))}
      <AddBtn onClick={add} label="Add Service" />
    </div>
  );
}

function IndustriesTab({ data, onChange }) {
  const industries = data.industries;
  const update = (i, k, v) => {
    const next = industries.map((ind, idx) => idx === i ? { ...ind, [k]: v } : ind);
    onChange({ industries: next });
  };
  const remove = (i) => onChange({ industries: industries.filter((_, idx) => idx !== i) });
  const add = () => onChange({ industries: [...industries, { icon: '🏢', name: 'New Industry', desc: 'Description...' }] });

  return (
    <div className="space-y-3">
      {industries.map((ind, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06]" style={{ background: '#0d1524' }}>
          <input value={ind.icon} onChange={(e) => update(i, 'icon', e.target.value)} className="w-12 bg-[#030711] border border-white/[0.08] rounded-lg p-2 text-center text-lg" />
          <input value={ind.name} onChange={(e) => update(i, 'name', e.target.value)} className="flex-1 bg-[#030711] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-slate-200" placeholder="Industry Name" />
          <input value={ind.desc} onChange={(e) => update(i, 'desc', e.target.value)} className="flex-[2] bg-[#030711] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-slate-200" placeholder="Short description..." />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn onClick={add} label="Add Industry" />
    </div>
  );
}

function CaseStudiesTab({ data, onChange }) {
  const cases = data.caseStudies;
  const update = (i, k, v) => {
    const next = cases.map((c, idx) => idx === i ? { ...c, [k]: v } : c);
    onChange({ caseStudies: next });
  };
  const updateMetric = (ci, mi, k, v) => {
    const next = cases.map((c, idx) => {
      if (idx !== ci) return c;
      const metrics = c.metrics.map((m, midx) => midx === mi ? { ...m, [k]: v } : m);
      return { ...c, metrics };
    });
    onChange({ caseStudies: next });
  };
  const remove = (i) => onChange({ caseStudies: cases.filter((_, idx) => idx !== i) });
  const add = () => onChange({
    caseStudies: [...cases, {
      tag: 'New', tagColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
      problem: 'Problem...', solution: 'Solution...', result: 'Result...',
      metrics: [{ value: '0%', label: 'Metric 1' }, { value: '0%', label: 'Metric 2' }, { value: '0x', label: 'Metric 3' }],
      gradient: 'from-indigo-900/30 to-transparent', border: 'border-indigo-500/15',
    }]
  });

  return (
    <div className="space-y-4">
      {cases.map((c, i) => (
        <SectionCard key={i} title={`Case Study ${i + 1} — ${c.tag}`}>
          <div className="flex justify-between items-start">
            <Field label="Industry Tag" value={c.tag} onChange={(v) => update(i, 'tag', v)} />
            <RemoveBtn onClick={() => remove(i)} />
          </div>
          <Field label="Problem" value={c.problem} onChange={(v) => update(i, 'problem', v)} multiline rows={2} />
          <Field label="Solution" value={c.solution} onChange={(v) => update(i, 'solution', v)} multiline rows={2} />
          <Field label="Result" value={c.result} onChange={(v) => update(i, 'result', v)} multiline rows={2} />
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Metrics (3 boxes)</label>
            <div className="grid grid-cols-3 gap-2">
              {c.metrics.map((m, mi) => (
                <div key={mi} className="space-y-1">
                  <input value={m.value} onChange={(e) => updateMetric(i, mi, 'value', e.target.value)} className="w-full bg-[#030711] border border-white/[0.08] rounded-lg px-2 py-1.5 text-sm text-white text-center font-bold" placeholder="80%" />
                  <input value={m.label} onChange={(e) => updateMetric(i, mi, 'label', e.target.value)} className="w-full bg-[#030711] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-slate-400 text-center" placeholder="Time Saved" />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      ))}
      <AddBtn onClick={add} label="Add Case Study" />
    </div>
  );
}

function FAQTab({ data, onChange }) {
  const faqs = data.faqs;
  const update = (i, k, v) => {
    const next = faqs.map((f, idx) => idx === i ? { ...f, [k]: v } : f);
    onChange({ faqs: next });
  };
  const remove = (i) => onChange({ faqs: faqs.filter((_, idx) => idx !== i) });
  const add = () => onChange({ faqs: [...faqs, { q: 'New Question?', a: 'Answer...' }] });

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-white/[0.06] p-4 space-y-2" style={{ background: '#0d1524' }}>
          <div className="flex items-start gap-2">
            <span className="text-xs text-indigo-400 font-bold mt-2">Q{i + 1}</span>
            <textarea
              value={faq.q}
              onChange={(e) => update(i, 'q', e.target.value)}
              rows={2}
              className="flex-1 bg-[#030711] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none"
            />
            <RemoveBtn onClick={() => remove(i)} />
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xs text-slate-500 font-bold mt-2">A</span>
            <textarea
              value={faq.a}
              onChange={(e) => update(i, 'a', e.target.value)}
              rows={3}
              className="flex-1 bg-[#030711] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 resize-none"
            />
          </div>
        </div>
      ))}
      <AddBtn onClick={add} label="Add FAQ" />
    </div>
  );
}

function TestimonialsTab({ data, onChange }) {
  const testimonials = data.testimonials;
  const [collapsed, setCollapsed] = useState(testimonials.map(() => true));

  const update = (i, k, v) => {
    const next = testimonials.map((t, idx) => idx === i ? { ...t, [k]: k === 'rating' ? Number(v) : v } : t);
    onChange({ testimonials: next });
  };
  const remove = (i) => {
    onChange({ testimonials: testimonials.filter((_, idx) => idx !== i) });
    setCollapsed((c) => c.filter((_, idx) => idx !== i));
  };
  const add = () => {
    onChange({ testimonials: [...testimonials, { name: 'Client Name', title: 'CEO, Company', location: 'City, State', avatar: '👤', rating: 5, quote: 'Testimonial text...', result: 'Key result', industry: 'Industry' }] });
    setCollapsed((c) => [...c, false]);
  };
  const toggle = (i) => setCollapsed((c) => c.map((v, idx) => idx === i ? !v : v));

  return (
    <div className="space-y-3">
      {testimonials.map((t, i) => (
        <div key={i} className="rounded-xl border border-white/[0.06]" style={{ background: '#0d1524' }}>
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggle(i)}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{t.avatar}</span>
              <div>
                <div className="text-white text-sm font-medium">{t.name}</div>
                <div className="text-slate-500 text-xs">{t.industry}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RemoveBtn onClick={(e) => { e.stopPropagation(); remove(i); }} />
              {collapsed[i] ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronUp className="w-4 h-4 text-slate-500" />}
            </div>
          </div>
          {!collapsed[i] && (
            <div className="px-4 pb-4 space-y-3 border-t border-white/[0.05] pt-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Avatar Emoji" value={t.avatar} onChange={(v) => update(i, 'avatar', v)} />
                <Field label="Rating (1-5)" value={t.rating} onChange={(v) => update(i, 'rating', v)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" value={t.name} onChange={(v) => update(i, 'name', v)} />
                <Field label="Title" value={t.title} onChange={(v) => update(i, 'title', v)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Location" value={t.location} onChange={(v) => update(i, 'location', v)} />
                <Field label="Industry" value={t.industry} onChange={(v) => update(i, 'industry', v)} />
              </div>
              <Field label="Quote" value={t.quote} onChange={(v) => update(i, 'quote', v)} multiline rows={3} />
              <Field label="Result Badge (e.g. 40 hrs/week saved)" value={t.result} onChange={(v) => update(i, 'result', v)} />
            </div>
          )}
        </div>
      ))}
      <AddBtn onClick={add} label="Add Testimonial" />
    </div>
  );
}

function FounderTab({ data, onChange }) {
  const f = data.founder;
  const set = (k, v) => onChange({ founder: { ...f, [k]: v } });
  return (
    <div className="space-y-4">
      <SectionCard title="Founder Details">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name" value={f.name} onChange={(v) => set('name', v)} />
          <Field label="Title / Role" value={f.title} onChange={(v) => set('title', v)} />
        </div>
        <Field label="Short Bio (Hero quote)" value={f.bio} onChange={(v) => set('bio', v)} multiline rows={2} />
        <Field label="Extended Bio (Detail paragraph)" value={f.extendedBio} onChange={(v) => set('extendedBio', v)} multiline rows={4} />
        <Field label="LinkedIn URL" value={f.linkedinUrl} onChange={(v) => set('linkedinUrl', v)} />
        <Field label="Twitter/X URL" value={f.twitterUrl} onChange={(v) => set('twitterUrl', v)} />
      </SectionCard>
      <SectionCard title="Highlight Stats (4 cards)">
        {f.highlights.map((h, i) => (
          <div key={i} className="flex gap-2">
            <input value={h.value} onChange={(e) => set('highlights', f.highlights.map((hh, idx) => idx === i ? { ...hh, value: e.target.value } : hh))} className="w-24 bg-[#030711] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white text-center font-bold" />
            <input value={h.label} onChange={(e) => set('highlights', f.highlights.map((hh, idx) => idx === i ? { ...hh, label: e.target.value } : hh))} className="flex-1 bg-[#030711] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-slate-300" />
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

/* ─── MAIN ADMIN PANEL ─── */
const TABS = [
  { id: 'general', label: 'General', icon: '⚙️' },
  { id: 'hero', label: 'Hero', icon: '🏠' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'services', label: 'Services', icon: '🛠️' },
  { id: 'industries', label: 'Industries', icon: '🏭' },
  { id: 'cases', label: 'Case Studies', icon: '📁' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
  { id: 'founder', label: 'Founder', icon: '👤' },
];

export default function AdminPanel({ onClose }) {
  const { siteData, setSiteData } = useSiteData();
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [showKey, setShowKey] = useState(false);

  const currentData = draft || siteData;

  const handleLogin = async () => {
    if (!adminKey.trim()) { setAuthError('Admin key zaruri che.'); return; }
    try {
      const res = await fetch(`${API_BASE}/api/site-data`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(siteData),
      });
      if (res.status === 401) { setAuthError('Wrong admin key. Try again.'); return; }
      setAuthenticated(true);
      setDraft(JSON.parse(JSON.stringify(siteData)));
      setAuthError('');
    } catch {
      // If backend not running, allow offline editing with any non-empty key
      setAuthenticated(true);
      setDraft(JSON.parse(JSON.stringify(siteData)));
      setAuthError('');
    }
  };

  const patchDraft = (changes) => {
    setDraft((prev) => ({ ...prev, ...changes }));
    setSaveResult(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/site-data`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(draft),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSaveResult({ ok: false, msg: err.error || 'Save failed.' });
        return;
      }
      setSiteData(draft);
      setSaveResult({ ok: true, msg: 'Saved successfully! Changes are live.' });
    } catch {
      // Backend not running — apply changes locally only
      setSiteData(draft);
      setSaveResult({ ok: true, msg: 'Applied locally. Backend not running — restart server to persist.' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset to defaults? Current changes will be lost.')) {
      setDraft(JSON.parse(JSON.stringify(DEFAULT_SITE_DATA)));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-stretch justify-end"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="w-full max-w-2xl flex flex-col border-l border-white/[0.07] shadow-2xl"
        style={{ background: '#0a1020' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Admin Panel</div>
              <div className="text-slate-500 text-xs">Yogesh AI Hub — Site Editor</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {!authenticated ? (
          /* Login gate */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-sm space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-white font-bold text-lg">Admin Login</h2>
                <p className="text-slate-500 text-sm mt-1">Enter your admin key to continue</p>
              </div>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={adminKey}
                  onChange={(e) => { setAdminKey(e.target.value); setAuthError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Admin Key"
                  className="w-full bg-[#030711] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500/50 pr-12"
                />
                <button
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {authError}
                </div>
              )}
              <button
                onClick={handleLogin}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                Login to Admin
              </button>
              <p className="text-slate-600 text-xs text-center">
                Admin key is set via <code className="text-slate-500">ADMIN_API_KEY</code> env variable on the server.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-1 px-4 pt-3 pb-0 overflow-x-auto flex-shrink-0 border-b border-white/[0.06]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'text-white border-indigo-500 bg-white/[0.03]'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                  }`}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeTab === 'general' && <GeneralTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'hero' && <HeroTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'stats' && <StatsTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'services' && <ServicesTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'industries' && <IndustriesTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'cases' && <CaseStudiesTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'faq' && <FAQTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'testimonials' && <TestimonialsTab data={currentData} onChange={patchDraft} />}
              {activeTab === 'founder' && <FounderTab data={currentData} onChange={patchDraft} />}
            </div>

            {/* Footer actions */}
            <div className="border-t border-white/[0.06] px-5 py-4 flex-shrink-0">
              <AnimatePresence>
                {saveResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-2 text-sm mb-3 px-3 py-2 rounded-lg border ${
                      saveResult.ok
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                    }`}
                  >
                    {saveResult.ok ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                    {saveResult.msg}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
