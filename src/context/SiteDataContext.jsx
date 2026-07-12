import { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const DEFAULT_SITE_DATA = {
  brand: {
    name: 'Yogesh AI Hub',
    logoUrl: '',
  },

  theme: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#22d3ee',
    background: '#030711',
  },

  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'Results', href: '#case-studies' },
    { label: 'About', href: '#founder' },
    { label: 'FAQ', href: '#faq' },
  ],

  contact: {
    email: 'yogeshkukadiya92@gmail.com',
    phone: '+91 98253 44428',
    whatsapp: '919825344428',
    location: 'Surat, Gujarat, India',
    calendly: 'https://calendly.com/yogeshkukadiya92',
  },

  hero: {
    imageUrl: '',
    badge: 'AI Consultancy · Automation · Startup Studio',
    headline: 'Build AI Systems That Save Time, Reduce Costs & Scale Your Business',
    description:
      'We help businesses implement AI, automate operations, build custom AI tools and launch AI-powered startups — delivering measurable ROI from day one.',
    ctaPrimary: 'Book Free AI Consultation',
    ctaSecondary: 'Explore Solutions',
    trustText: 'Trusted by 50+ businesses',
  },

  stats: [
    { value: 50, suffix: '+', label: 'Projects Delivered', color: 'text-indigo-400' },
    { value: 10000, suffix: '+', label: 'Hours Automated', color: 'text-violet-400' },
    { value: 40, suffix: '+', label: 'Businesses Helped', color: 'text-cyan-400' },
    { value: 25, suffix: '+', label: 'Custom AI Systems Built', color: 'text-emerald-400' },
  ],

  services: [
    { icon: '⚡', title: 'Business Automation', desc: 'Eliminate repetitive work. Automate workflows across your entire operation.', tag: 'Automation', gradient: 'from-amber-900/30 to-transparent', accent: 'border-amber-500/20', tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/20' },
    { icon: '🤖', title: 'AI Agents', desc: 'Deploy intelligent agents that work 24/7 — handling leads, support, and operations autonomously.', tag: 'Agents', gradient: 'from-violet-900/30 to-transparent', accent: 'border-violet-500/20', tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/20' },
    { icon: '🛠️', title: 'Custom AI Tools', desc: 'Purpose-built AI software for your unique business needs.', tag: 'Dev', gradient: 'from-blue-900/30 to-transparent', accent: 'border-blue-500/20', tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/20' },
    { icon: '🚀', title: 'SaaS Products', desc: 'From idea to market-ready SaaS with AI at the core.', tag: 'Product', gradient: 'from-teal-900/30 to-transparent', accent: 'border-teal-500/20', tagColor: 'bg-teal-500/15 text-teal-300 border-teal-500/20' },
    { icon: '💬', title: 'AI Chatbots', desc: 'Conversational AI that understands your business and customers inside out.', tag: 'NLP', gradient: 'from-rose-900/30 to-transparent', accent: 'border-rose-500/20', tagColor: 'bg-rose-500/15 text-rose-300 border-rose-500/20' },
    { icon: '🎓', title: 'AI Training & Workshops', desc: 'Upskill your entire team on AI tools and implementation.', tag: 'Education', gradient: 'from-purple-900/30 to-transparent', accent: 'border-purple-500/20', tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/20' },
    { icon: '🔄', title: 'Process Optimization', desc: 'AI-powered analysis to find and fix bottlenecks.', tag: 'Ops', gradient: 'from-cyan-900/30 to-transparent', accent: 'border-cyan-500/20', tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20' },
  ],

  industries: [
    { icon: '🏭', name: 'Manufacturing', desc: 'Predictive maintenance, quality control, supply chain AI' },
    { icon: '💎', name: 'Jewellery', desc: 'Inventory AI, custom design tools, pricing automation' },
    { icon: '🏥', name: 'Healthcare', desc: 'Patient management, diagnostics AI, workflow automation' },
    { icon: '🎓', name: 'Education', desc: 'Personalized learning, admin automation, AI tutoring' },
    { icon: '💪', name: 'Coaching', desc: 'Client management, progress tracking, AI-powered programs' },
    { icon: '🛒', name: 'Retail', desc: 'Demand forecasting, customer personalization, inventory AI' },
    { icon: '💰', name: 'Finance', desc: 'Risk analysis, fraud detection, reporting automation' },
    { icon: '🤝', name: 'Service Businesses', desc: 'Lead automation, CRM AI, customer support bots' },
  ],

  caseStudies: [
    {
      tag: 'Manufacturing',
      tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
      problem: 'Manual Reporting taking 40+ hours/week',
      solution: 'Built an AI-powered analytics dashboard with automated data pipelines',
      result: 'Real-time insights replacing 3 full-time reporting roles',
      metrics: [
        { value: '80%', label: 'Time Saved' },
        { value: '₹8L', label: 'Monthly Saved' },
        { value: '2 days', label: 'Payback Period' },
      ],
      gradient: 'from-blue-900/30 to-transparent',
      border: 'border-blue-500/15',
    },
    {
      tag: 'E-commerce',
      tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
      problem: 'Customer support overwhelmed with 500+ tickets/day',
      solution: 'Deployed multi-channel AI chatbot with escalation to human agents',
      result: '85% of tickets resolved automatically, 24/7 coverage',
      metrics: [
        { value: '85%', label: 'Auto-resolved' },
        { value: '60%', label: 'Cost Reduction' },
        { value: '3x', label: 'Satisfaction' },
      ],
      gradient: 'from-violet-900/30 to-transparent',
      border: 'border-violet-500/15',
    },
    {
      tag: 'Real Estate',
      tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
      problem: 'Sales leads going cold — 72hr response time',
      solution: 'AI lead qualification + automated WhatsApp follow-up sequences',
      result: 'Instant response, personalized nurturing, 3x conversion rate',
      metrics: [
        { value: '< 2min', label: 'Response Time' },
        { value: '3x', label: 'Productivity' },
        { value: '45%', label: 'More Deals' },
      ],
      gradient: 'from-emerald-900/30 to-transparent',
      border: 'border-emerald-500/15',
    },
  ],

  faqs: [
    { q: 'How long does it take to implement an AI system?', a: 'Most AI projects go from zero to deployed in 4-8 weeks. A simple AI chatbot can be live in 1-2 weeks. A complex multi-system automation takes 6-10 weeks. We always start with a 1-week discovery sprint to define scope and timeline accurately.' },
    { q: 'What if I have no technical knowledge?', a: "Perfect — most of our clients aren't technical. You don't need to understand AI to benefit from it. We handle 100% of the technical side. Your job is to know your business — we translate that into AI systems." },
    { q: 'How much does AI implementation cost?', a: 'Projects typically range from ₹50,000 for a focused automation to ₹5,00,000+ for a full AI system suite. We offer a free AI Audit to scope your project and provide a transparent quote with expected ROI before you commit to anything.' },
    { q: 'Will AI replace my employees?', a: "AI doesn't replace people — it replaces repetitive tasks so your people can focus on high-value work. In every implementation we've done, businesses have grown their team's output without reducing headcount. AI makes your team 3-5x more productive." },
    { q: 'What kinds of processes can be automated with AI?', a: "Any repetitive, rule-based process is a candidate: data entry, report generation, lead follow-up, customer support, invoice processing, scheduling, inventory management, quality checks, content creation and much more. We've automated processes across 15+ business functions." },
    { q: 'Do you work with small businesses or only large enterprises?', a: "We work with businesses of all sizes — from 5-person teams to 500-person companies. Small businesses often see the fastest ROI because even small automations have a big proportional impact. We have packages designed for every stage of growth." },
    { q: 'What happens after the AI system is deployed?', a: "We offer 3 months of free support for every project. After that, we have ongoing maintenance plans starting at ₹10,000/month. Many clients also engage us for continuous improvement — adding new AI capabilities as their business grows." },
    { q: 'Is my business data safe?', a: 'Data security is our top priority. All client data is handled under strict NDA. We use enterprise-grade encryption, access controls and can deploy AI systems on your own infrastructure if required. We never share or use your data for training models.' },
    { q: 'Can you integrate AI with my existing software?', a: 'Yes. We integrate with 100+ business tools including Tally, SAP, Salesforce, Zoho, WhatsApp Business, Google Workspace, Microsoft 365, Shopify, WooCommerce and custom ERP/CRM systems. If it has an API, we can connect it.' },
    { q: 'How do I know if AI is right for my business?', a: "That's exactly what our free AI Audit answers. In a 45-minute session, we analyze your business, identify automation opportunities and tell you exactly what's possible — with realistic ROI projections. Zero commitment required." },
  ],

  testimonials: [
    { name: 'Rahul Sharma', title: 'CEO, TechManufacture Ltd.', location: 'Surat, Gujarat', avatar: '👨‍💼', rating: 5, quote: 'Yogesh transformed our entire reporting system. What used to take our team 40+ hours a week now happens automatically. The ROI was visible within the first month. Absolutely game-changing.', result: '40 hrs/week saved', industry: 'Manufacturing' },
    { name: 'Priya Mehta', title: 'Founder, StyleRetail', location: 'Mumbai, Maharashtra', avatar: '👩‍💼', rating: 5, quote: 'The AI chatbot Yogesh built for us handles 85% of customer queries without any human involvement. Our team is now free to focus on complex issues while the AI handles everything else.', result: '85% support automated', industry: 'Retail' },
    { name: 'Amit Patel', title: 'Director, GoldJewels', location: 'Rajkot, Gujarat', avatar: '🧑‍💼', rating: 5, quote: "We were skeptical about AI in our jewellery business, but Yogesh understood our industry deeply. The inventory AI and custom pricing tool have literally paid for themselves 5x over.", result: '5x investment returned', industry: 'Jewellery' },
    { name: 'Dr. Sneha Joshi', title: 'Director, HealthFirst Clinics', location: 'Ahmedabad, Gujarat', avatar: '👩‍⚕️', rating: 5, quote: 'Our patient management was a nightmare. Yogesh AI Hub built us an intelligent scheduling and follow-up system. No-shows reduced by 60% and patient satisfaction went through the roof.', result: '60% less no-shows', industry: 'Healthcare' },
    { name: 'Vikram Nair', title: 'Co-founder, EduLeap', location: 'Bangalore, Karnataka', avatar: '👨‍🎓', rating: 5, quote: "Within 6 weeks, Yogesh had our AI tutoring platform live. The speed, quality and technical depth were exceptional. He's not just a developer — he's a genuine strategic partner.", result: 'Platform live in 6 weeks', industry: 'Education' },
  ],

  founder: {
    imageUrl: '',
    name: 'Yogesh Patel',
    title: 'Founder & Chief AI Strategist',
    bio: 'Helping businesses adopt AI in a practical way and building AI products that create measurable impact.',
    extendedBio: "With 5+ years of hands-on AI implementation experience across manufacturing, e-commerce, healthcare and service industries, I've seen what works and what doesn't. My approach combines deep technical expertise with a business-first mindset — every AI system I build is designed to generate measurable returns from day one.",
    linkedinUrl: 'https://linkedin.com/in/yogeshkukadiya',
    twitterUrl: 'https://twitter.com/',
    highlights: [
      { value: '5+', label: 'Years in AI', color: 'text-indigo-400' },
      { value: '50+', label: 'Projects', color: 'text-violet-400' },
      { value: '40+', label: 'Businesses', color: 'text-cyan-400' },
      { value: '₹2Cr+', label: 'Value Created', color: 'text-emerald-400' },
    ],
  },

  finalCta: {
    headline: 'Ready To Build With AI?',
    subheadline: "Let's identify the highest ROI opportunities for your business. A free 45-minute AI strategy call — no sales pitch, just actionable insights.",
    buttonPrimary: 'Book Free AI Strategy Call',
    buttonSecondary: 'WhatsApp Yogesh',
  },
};

const SiteDataContext = createContext(null);

function deepMerge(defaults, overrides) {
  if (!overrides || typeof overrides !== 'object') return defaults;
  const result = { ...defaults };
  for (const key of Object.keys(overrides)) {
    if (
      overrides[key] &&
      typeof overrides[key] === 'object' &&
      !Array.isArray(overrides[key]) &&
      defaults[key] &&
      typeof defaults[key] === 'object' &&
      !Array.isArray(defaults[key])
    ) {
      result[key] = deepMerge(defaults[key], overrides[key]);
    } else if (overrides[key] !== undefined && overrides[key] !== null) {
      result[key] = overrides[key];
    }
  }
  return result;
}

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(DEFAULT_SITE_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/site-data`);
        if (!res.ok) return;
        const apiData = await res.json();
        setSiteData(deepMerge(DEFAULT_SITE_DATA, apiData));
      } catch {
        // Backend not running — use defaults
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateSiteData = (newData) => {
    setSiteData(deepMerge(DEFAULT_SITE_DATA, newData));
  };

  return (
    <SiteDataContext.Provider value={{ siteData, setSiteData: updateSiteData, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used inside SiteDataProvider');
  return ctx;
}
