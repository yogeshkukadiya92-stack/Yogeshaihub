import { Brain, ExternalLink, AtSign, Globe, MessageCircle, Share2, Link2 } from 'lucide-react';

const whatsappHref = `https://wa.me/919825344428?text=${encodeURIComponent('Hi Yogesh, I want to book a free AI strategy consultation.')}`;

const links = {
  Services: [
    { label: 'AI Consultancy', href: '#services' },
    { label: 'Business Automation', href: '#services' },
    { label: 'AI Agents', href: '#services' },
    { label: 'Custom AI Tools', href: '#services' },
    { label: 'SaaS Development', href: '#services' },
    { label: 'AI Startup MVP', href: '#startup' },
  ],
  Company: [
    { label: 'About Yogesh', href: '#founder' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Process', href: '#process' },
    { label: 'AI Tools Showcase', href: '#tools' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  Industries: [
    { label: 'Manufacturing', href: '#industries' },
    { label: 'Healthcare', href: '#industries' },
    { label: 'Retail', href: '#industries' },
    { label: 'Education', href: '#industries' },
    { label: 'Finance', href: '#industries' },
    { label: 'Jewellery', href: '#industries' },
  ],
};

const socials = [
  { icon: ExternalLink, href: 'https://linkedin.com/in/yogeshkukadiya', label: 'LinkedIn' },
  { icon: AtSign, href: 'https://twitter.com/', label: 'Twitter' },
  { icon: MessageCircle, href: whatsappHref, label: 'WhatsApp' },
  { icon: Globe, href: 'https://instagram.com/', label: 'Instagram' },
  { icon: Link2, href: 'https://github.com/', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <a href="#hero" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Yogesh<span className="gradient-text"> AI Hub</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-5">
              AI Consultancy · Business Automation · AI Startup Studio. Helping businesses in India and beyond harness the power of AI.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Yogesh AI Hub. All rights reserved. Built in Surat, India 🇮🇳
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span>·</span>
            <span>Made with ❤️ & AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
