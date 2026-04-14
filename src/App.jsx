import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Brain,
  Briefcase,
  ChevronRight,
  Code,
  Cpu,
  Globe,
  Layers,
  Layout,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Share2,
  Sparkles,
  Star,
  Terminal,
  TrendingUp,
  AtSign,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import founderPhoto from './assets/founder-2.jpeg';

const SITE_DATA = {
  brand: { firstName: 'Yogesh', secondName: 'ai hub', logoUrl: '' },
  navLinks: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'process', label: 'Process' },
    { id: 'projects', label: 'Projects' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    badge: 'Digital Growth & Automation',
    titleMain: 'Get More Leads',
    titleHighlight: 'On Autopilot.',
    description:
      'We build AI automation systems that capture leads faster, respond instantly, and help your business scale with less manual work.',
  },
  techStack: ['React', 'Node.js', 'WhatsApp API', 'Meta Graph API', 'Python', 'TailwindCSS', 'AWS', 'MongoDB'],
  stats: [
    { label: 'AI Models Deployed', value: '45+' },
    { label: 'Data Processed (TB)', value: '500+' },
    { label: 'Average Accuracy', value: '98.5%' },
    { label: 'Enterprise Clients', value: '20+' },
  ],
  about: {
    title: 'Meet Yogesh Kukadiya',
    role: 'Lead AI Engineer & Founder',
    description:
      'I specialize in turning AI ideas into practical systems that grow businesses through automation and better decisions.',
    photoUrl: founderPhoto,
  },
  services: [
    { title: 'Software Development', desc: 'Custom software for your workflows and business goals.', icon: Code },
    { title: 'Website Design & Development', desc: 'Fast, responsive and high-converting websites.', icon: Layout },
    { title: 'WhatsApp Automation', desc: 'Automate support and lead capture instantly.', icon: MessageCircle },
    { title: 'Facebook Lead Management', desc: 'Capture and nurture leads for better conversions.', icon: Users },
    { title: 'Social Media Content', desc: 'Build your online presence with strategic content.', icon: Share2 },
  ],
  process: [
    { no: '01', title: 'Discovery', desc: 'Audit your goals, data, and growth opportunities.' },
    { no: '02', title: 'Architecture', desc: 'Design the best automation and AI structure.' },
    { no: '03', title: 'Build', desc: 'Develop, test, and optimize for business impact.' },
    { no: '04', title: 'Deploy', desc: 'Launch with monitoring and continuous improvement.' },
  ],
  projects: [
    { title: 'Predictive Supply Chain Platform', client: 'Global Logistics Inc.', metric: 'Reduced stockouts by 34%' },
    { title: 'Enterprise RAG Knowledge Bot', client: 'FinTech Solutions', metric: 'Saved 40 hrs/week in support' },
    { title: 'Automated Defect Detection', client: 'AutoMfg Corp.', metric: '99.2% detection accuracy' },
  ],
  demoResponses: [
    'Analyzing parameters... enterprise productivity can increase by up to 40% with right AI workflows.',
    'Processing complete. A RAG pipeline is the most reliable approach for your knowledge base.',
    'Model suggestion: fine-tuned Llama for low-latency business Q&A use cases.',
  ],
  contact: {
    email: 'Yogeshkukadiya92@gmail.com',
    phone: '+91 98253 44428',
    location: 'Surat, Gujarat, India',
  },
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoInput, setDemoInput] = useState('');
  const [demoOutput, setDemoOutput] = useState('System ready. Waiting for input...');
  const [isThinking, setIsThinking] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    businessType: '',
    monthlyLeads: '',
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const whatsappMessage = encodeURIComponent('Hi Yogesh, I want AI automation for my business.');
  const whatsappHref = `https://wa.me/919825344428?text=${whatsappMessage}`;
  const calendlyLink = 'https://calendly.com/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const runDemo = (e) => {
    e.preventDefault();
    if (!demoInput.trim()) return;
    setIsThinking(true);
    setDemoOutput('Processing neural pathways...');
    setTimeout(() => {
      const idx = Math.floor(Math.random() * SITE_DATA.demoResponses.length);
      setDemoOutput(SITE_DATA.demoResponses[idx]);
      setIsThinking(false);
    }, 1400);
  };

  const handleLeadInput = (e) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitLeadForm = (e) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setLeadForm({ name: '', phone: '', businessType: '', monthlyLeads: '' });
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <nav className={`fixed top-0 w-full z-50 transition ${scrolled ? 'bg-[#050B14]/90 backdrop-blur-lg border-b border-slate-800' : ''}`}>
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 text-white font-bold text-xl">
            <Brain className="text-blue-400" /> {SITE_DATA.brand.firstName} <span className="text-blue-500">{SITE_DATA.brand.secondName}</span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {SITE_DATA.navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-slate-400 hover:text-white">{link.label}</a>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen((v) => !v)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-slate-800 bg-[#050B14]">
            {SITE_DATA.navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="block py-2 text-slate-300" onClick={() => setIsMenuOpen(false)}>{link.label}</a>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-6 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
              <Sparkles className="w-3 h-3" /> {SITE_DATA.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              {SITE_DATA.hero.titleMain} <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">{SITE_DATA.hero.titleHighlight}</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl">{SITE_DATA.hero.description}</p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <a href="#contact" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center gap-2">Book Free Call <ChevronRight className="w-4 h-4" /></a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-white inline-flex items-center gap-2"><MessageCircle className="w-4 h-4" />WhatsApp Now</a>
              <a href={calendlyLink} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-indigo-600/60 text-indigo-300 hover:bg-indigo-500/10">Book via Calendly</a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0A101D] p-6 font-mono text-green-400">
            <p>{'> _ initializing neural_net...'}</p>
            <p>{'> _ loading weights [100%]'}</p>
            <p>{'> _ system.ready()'}</p>
          </div>
        </div>
      </section>

      <section className="py-8 border-y border-slate-800 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {SITE_DATA.techStack.map((tech) => (
            <span key={tech} className="px-3 py-2 text-sm rounded-full bg-slate-900 border border-slate-800 flex items-center gap-2"><Cpu className="w-4 h-4 text-blue-400" />{tech}</span>
          ))}
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE_DATA.stats.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/30 text-center">
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <img src={SITE_DATA.about.photoUrl} alt={SITE_DATA.about.title} className="w-full max-w-md mx-auto rounded-3xl border border-slate-700" />
          <div>
            <p className="text-purple-400 text-sm uppercase tracking-wider mb-3">About The Founder</p>
            <h2 className="text-4xl font-extrabold text-white">{SITE_DATA.about.title}</h2>
            <p className="text-blue-400 mt-2">{SITE_DATA.about.role}</p>
            <p className="mt-5 text-slate-400 text-lg">{SITE_DATA.about.description}</p>
          </div>
        </div>
      </section>

      <section id="expertise" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-400 text-sm uppercase tracking-wider mb-3 inline-flex items-center gap-2"><Layers className="w-4 h-4" />Our Services</p>
          <h2 className="text-4xl font-extrabold text-white mb-8">Digital Growth Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SITE_DATA.services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="p-6 rounded-2xl border border-slate-800 bg-[#0A101D]">
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-white font-bold text-xl">{s.title}</h3>
                  <p className="text-slate-400 mt-2">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-4 border-y border-slate-800 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-indigo-400 text-sm uppercase tracking-wider mb-3 inline-flex items-center gap-2"><Workflow className="w-4 h-4" />Methodology</p>
          <h2 className="text-4xl font-extrabold text-white mb-8">How We Build AI Systems</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SITE_DATA.process.map((p) => (
              <div key={p.no} className="p-5 rounded-2xl border border-slate-800 bg-[#0A101D]">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold mb-4">{p.no}</div>
                <h3 className="text-white font-bold">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-2">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-teal-400 text-sm uppercase tracking-wider mb-3 inline-flex items-center gap-2"><Briefcase className="w-4 h-4" />Case Studies</p>
          <h2 className="text-4xl font-extrabold text-white mb-8">Proven Real-World Impact</h2>
          <div className="grid lg:grid-cols-3 gap-5">
            {SITE_DATA.projects.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-800 bg-[#0A101D] overflow-hidden">
                <div className="p-6">
                  <p className="text-slate-500 text-sm">{p.client}</p>
                  <h3 className="text-white text-2xl font-bold mt-2">{p.title}</h3>
                </div>
                <div className="px-6 py-4 bg-blue-500/10 border-t border-blue-500/20 text-blue-300 flex items-center gap-2"><TrendingUp className="w-4 h-4" />{p.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-purple-400 text-sm uppercase tracking-wider mb-3 inline-flex items-center gap-2"><Bot className="w-4 h-4" />Interactive Demo</p>
          <h2 className="text-4xl font-extrabold text-white mb-6">Test the AI Brain</h2>
          <div className="rounded-2xl border border-slate-700 bg-[#0A101D] overflow-hidden">
            <div className="p-5 font-mono text-sm bg-[#050B14] text-slate-300 min-h-32">{demoOutput}</div>
            <form onSubmit={runDemo} className="p-4 border-t border-slate-800 flex gap-3">
              <div className="relative flex-1">
                <Terminal className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input value={demoInput} onChange={(e) => setDemoInput(e.target.value)} placeholder="E.g., Analyze the market trend for AI in 2026..." className="w-full bg-[#050B14] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white" />
              </div>
              <button disabled={isThinking || !demoInput.trim()} className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 inline-flex items-center gap-2"><Send className="w-4 h-4" />Generate</button>
            </form>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-800 bg-[#0A101D] p-8">
            <h2 className="text-4xl font-extrabold text-white">Initiate a Project</h2>
            <p className="text-slate-400 mt-3">Ready to integrate advanced digital solutions into your business?</p>
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-3"><Mail className="text-blue-400" />{SITE_DATA.contact.email}</div>
              <div className="flex items-center gap-3"><Phone className="text-purple-400" />{SITE_DATA.contact.phone}</div>
              <div className="flex items-center gap-3"><MapPin className="text-teal-400" />{SITE_DATA.contact.location}</div>
            </div>
          </div>

          <form className="rounded-2xl border border-slate-800 bg-[#0A101D] p-8 space-y-4" onSubmit={submitLeadForm}>
            <input name="name" value={leadForm.name} onChange={handleLeadInput} required className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-white" placeholder="Full Name" />
            <input name="phone" value={leadForm.phone} onChange={handleLeadInput} required className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-white" placeholder="Phone Number" />
            <input name="businessType" value={leadForm.businessType} onChange={handleLeadInput} className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-white" placeholder="Business Type (e.g. Real Estate)" />
            <select name="monthlyLeads" value={leadForm.monthlyLeads} onChange={handleLeadInput} className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-white">
              <option value="">Monthly Leads (Approx.)</option>
              <option value="0-100">0 - 100</option>
              <option value="100-500">100 - 500</option>
              <option value="500-1000">500 - 1000</option>
              <option value="1000+">1000+</option>
            </select>
            <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center justify-center gap-2">Get Free Automation Plan <ArrowRight className="w-4 h-4" /></button>
            {leadSubmitted && (
              <p className="text-emerald-400 text-sm">Thank you! We received your details and will contact you soon.</p>
            )}
          </form>
        </div>
      </section>

      <footer className="py-10 border-t border-slate-800 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400"><AtSign className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400"><Link2 className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400"><Globe className="w-4 h-4" /></a>
        </div>
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Yogesh ai hub. All Rights Reserved. Built with neural precision.</p>
      </footer>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 inline-flex items-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-semibold text-sm">WhatsApp</span>
      </a>
    </div>
  );
}

export default App;

