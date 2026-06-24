import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, AtSign, MessageCircle, Mail, MapPin } from 'lucide-react';
import founderPhoto from '../assets/founder-2.jpeg';
import { useSiteData } from '../context/SiteDataContext';

export default function Founder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { siteData } = useSiteData();
  const f = siteData.founder;
  const c = siteData.contact;
  const whatsappHref = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent('Hi Yogesh, I want to book a free AI strategy consultation.')}`;

  const socialLinks = [
    { icon: ExternalLink, href: f.linkedinUrl, label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/30' },
    { icon: AtSign, href: f.twitterUrl, label: 'Twitter', color: 'hover:text-sky-400 hover:border-sky-400/30' },
    { icon: MessageCircle, href: whatsappHref, label: 'WhatsApp', color: 'hover:text-emerald-400 hover:border-emerald-400/30' },
    { icon: Mail, href: `mailto:${c.email}`, label: 'Email', color: 'hover:text-rose-400 hover:border-rose-400/30' },
  ];

  return (
    <section id="founder" className="py-24 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
            ✦ Meet the Founder
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <div className="relative max-w-md mx-auto">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-cyan-500/20 blur-2xl" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 opacity-50" />
              <img src={founderPhoto} alt={f.name} className="relative w-full rounded-3xl border border-white/10 shadow-2xl shadow-indigo-500/20" />
              <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.5 }} className="absolute -bottom-4 -right-4 bg-[#0d1524] border border-indigo-500/30 rounded-2xl px-5 py-3 shadow-xl shadow-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white text-sm font-semibold">Available for Projects</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-500 text-xs">{c.location}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">{f.name.split(' ')[0]} <span className="gradient-text">{f.name.split(' ').slice(1).join(' ')}</span></h2>
              <p className="text-indigo-400 font-semibold text-lg">{f.title}</p>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">{f.bio}</p>
            <p className="text-slate-400 leading-relaxed">{f.extendedBio}</p>

            <div className="grid grid-cols-4 gap-4 py-6 border-y border-white/[0.06]">
              {f.highlights.map((h) => (
                <div key={h.label} className="text-center">
                  <div className={`text-2xl font-black ${h.color}`}>{h.value}</div>
                  <div className="text-slate-500 text-xs mt-1">{h.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.08] text-slate-400 text-sm transition-all duration-200 ${color}`}>
                  <Icon className="w-4 h-4" /> {label}
                </a>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 text-sm">
              Book a 1-on-1 with {f.name.split(' ')[0]} →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
