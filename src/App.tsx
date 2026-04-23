import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  FlaskConical,
  Truck,
  Zap,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Mail,
  Building2
} from 'lucide-react';
import { TechnicalScene } from './components/TechnicalScene';
import { BackgroundFluid } from './components/BackgroundFluid';
import { SmoothScroll } from './components/SmoothScroll';
import logo from './assets/Logo.svg';

const services = [
  {
    title: "Lab Management",
    description: "Routing samples to accredited labs (NABL/International) and managing the precise testing schedule.",
    icon: <FlaskConical className="w-8 h-8 text-electric-cyan" />,
    stats: "NABL Accredited Partners"
  },
  {
    title: "Quality Compliance",
    description: "End-to-end management of Testing & Certification lifecycle for high-precision engineering components.",
    icon: <ShieldCheck className="w-8 h-8 text-electric-cyan" />,
    stats: "Audit-Ready Quality"
  },
  {
    title: "Logistics & Traceability",
    description: "Managing sample deliveries and ensuring 100% traceability of parts and materials via documentation packaging.",
    icon: <Truck className="w-8 h-8 text-electric-cyan" />,
    stats: "100% Material Traceability"
  },
  {
    title: "High-Urgency Support",
    description: "Priority access for delivery-critical escalations and rapid response for mission-critical aerospace programs.",
    icon: <Zap className="w-8 h-8 text-electric-cyan" />,
    stats: "Rapid Escalation Handling"
  }
];

const timelineSteps = [
  { title: "Lab Routing", description: "Identifying laboratories with specific aerospace-grade equipment." },
  { title: "Testing Lifecycle", description: "Coordinating vibration, heat, and pressure resistance validations." },
  { title: "Audit Verification", description: "Gathering technical datasheets and validation certificates." },
  { title: "Documentation Collation", description: "Final traceability packaging and audit-ready delivery." }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-electric-cyan/30">
      {/* Premium Experience Controllers */}
      <SmoothScroll />

      {/* Liquid Glass Background System */}
      <BackgroundFluid />
      <div className="diffusion-layer" />
      <div className="structural-grid" />
      <div className="noise-overlay" />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 ${isScrolled
          ? 'py-4 glass-morphism border-b border-white/10 !rounded-none shadow-2xl'
          : 'py-10 bg-transparent border-none'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Adomers Logo"
              className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10' : 'h-16'
                }`}
            />
          </div>

          <div
            className={`hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 ${isScrolled ? 'opacity-100' : 'opacity-80 hover:opacity-100'
              }`}
          >
            <a href="#services" className="hover:text-electric-cyan transition-colors">Services</a>
            <a href="#operations" className="hover:text-electric-cyan transition-colors">Operations</a>
            <a
              href="#enquiry"
              className={`px-8 py-3 rounded-full border transition-all duration-500 font-bold ${isScrolled
                ? 'border-electric-cyan text-electric-cyan hover:bg-electric-cyan hover:text-black shadow-[0_0_20px_rgba(0,255,255,0.2)]'
                : 'border-white/20 text-white hover:border-white/50 bg-white/5'
                }`}
            >
              Initiate Program
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-sm z-[60] glass-morphism !rounded-none shadow-[0_0_100px_rgba(0,0,0,0.5)] md:hidden border-l border-white/10"
      >
        <div className="flex flex-col h-full p-10">
          <div className="flex justify-end mb-16">
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white">
              <X className="w-10 h-10" />
            </button>
          </div>

          <div className="flex flex-col gap-10 text-3xl font-black tracking-tighter italic">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-electric-cyan transition-colors">SERVICES</a>
            <a href="#operations" onClick={() => setIsMenuOpen(false)} className="hover:text-electric-cyan transition-colors">OPERATIONS</a>
            <a
              href="#enquiry"
              onClick={() => setIsMenuOpen(false)}
              className="mt-10 px-8 py-5 bg-electric-cyan text-black rounded-2xl text-center text-xl font-bold shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            >
              INITIATE PROGRAM
            </a>
          </div>

          <div className="mt-auto pt-10 border-t border-white/10">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="h-10 opacity-50" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Aerospace Precision</p>
            </div>
          </div>
        </div>
      </motion.div>


      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <TechnicalScene />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-electric-cyan font-bold tracking-widest uppercase mb-4 text-sm sm:text-base">
              Adomers Aerospace & Engineering
            </h2>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              PRECISION <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">CONSULTANCY</span><br />
              FOR AEROSPACE
            </h1>
            <p className="text-lg md:text-xl text-titanium-silver max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Based in Hyderabad's aerospace hub, we bridge the gap between manufacturing and certification with clinical precision and high-urgency QA expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#enquiry" className="px-12 py-5 bg-electric-cyan text-black font-bold rounded-full hover:scale-105 transition-transform cyan-glow flex items-center justify-center gap-2">
                INITIATE PROGRAM <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#services" className="px-12 py-5 glass-morphism font-bold !rounded-full hover:bg-white/5 transition-colors border border-white/20">
                VIEW CAPABILITIES
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="services" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-electric-cyan font-bold tracking-widest uppercase mb-4">Core Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-black">TECHNICAL CONCIERGE</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full auto-rows-[minmax(300px,auto)]">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${idx === 0 || idx === 3 ? "md:col-span-7" : "md:col-span-5"
                  } bento-item group flex flex-col justify-between`}
              >
                <div>
                  <div className="mb-6 p-4 glass-morphism !rounded-2xl inline-block group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                  <p className="text-titanium-silver leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-electric-cyan font-bold">
                    {service.stats}
                  </span>
                  <ChevronRight className="w-5 h-5 text-electric-cyan/50 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations Timeline */}
      <section id="operations" className="py-24 px-6 relative px-6">
        <div className="max-w-7xl mx-auto glass-morphism p-12 md:p-20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="md:w-1/3">
              <h2 className="text-electric-cyan font-bold tracking-widest uppercase mb-4 text-sm">Our Workflow</h2>
              <h3 className="text-4xl font-black mb-6 leading-tight">TRACEABILITY TIMELINE</h3>
              <p className="text-titanium-silver mb-8">
                Every component we handle follows a high-precision lifecycle ensures it meets rigorous international safety and quality standards before delivery.
              </p>
              <div className="p-6 glass-morphism !rounded-2xl border-l-4 !border-l-electric-cyan">
                <p className="italic text-sm text-white/80">
                  "In aerospace, the documentation is as important as the part itself."
                </p>
              </div>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative z-10 glass-morphism !bg-white/5 p-8 group hover:border-electric-cyan/50 transition-colors">
                  <span className="text-6xl font-black absolute -top-4 -right-4 text-white/5 group-hover:text-electric-cyan/10 transition-colors">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xl font-bold mb-3 text-electric-cyan italic underline underline-offset-8">
                    {step.title}
                  </h4>
                  <p className="text-sm text-titanium-silver">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form section */}
      <section id="enquiry" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2">
            <h2 className="text-electric-cyan font-bold tracking-widest uppercase mb-4">Program Initiation</h2>
            <h3 className="text-5xl md:text-7xl font-black mb-12">SECURE YOUR <br />SCHEDULE</h3>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="p-4 glass-morphism !rounded-xl text-electric-cyan">
                  <Building2 />
                </div>
                <div>
                  <h5 className="font-bold text-lg">Hub Operations</h5>
                  <p className="text-titanium-silver">Hyderabad, India</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="p-4 glass-morphism !rounded-xl text-electric-cyan">
                  <Mail />
                </div>
                <div>
                  <h5 className="font-bold text-lg">Technical Enquiry</h5>
                  <p className="text-titanium-silver">contact@adomersgroup.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 glass-morphism p-12 cyber-form-container">
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus('submitting');

                const formData = new FormData(e.currentTarget);
                formData.append("access_key", "c778401e-d116-42ea-8f42-c8e88e20ec40");
                formData.append("subject", "New Aerospace Program Requisition / Adomers");

                try {
                  const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                  });
                  const data = await response.json();
                  if (data.success) {
                    setFormStatus('success');
                    (e.target as HTMLFormElement).reset();
                  } else {
                    setFormStatus('error');
                  }
                } catch (err) {
                  setFormStatus('error');
                }
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-titanium-silver mb-2 ml-1">Contact Name</label>
                  <input name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 cyan-glow-focus transition-all" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-titanium-silver mb-2 ml-1">Organization</label>
                  <input name="organization" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 cyan-glow-focus transition-all" required />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-titanium-silver mb-2 ml-1">Work Email Address</label>
                <input name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 cyan-glow-focus transition-all" required />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-titanium-silver mb-2 ml-1">Program Urgency</label>
                <select name="urgency" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 cyan-glow-focus transition-all">
                  <option className="bg-space-charcoal">High Urgency (Escalation)</option>
                  <option className="bg-space-charcoal">Medium Urgency (Standard Audit)</option>
                  <option className="bg-space-charcoal">Standard (Future Planning)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-titanium-silver mb-2 ml-1">Technical Requirements Brief</label>
                <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 cyan-glow-focus transition-all" placeholder="Specify test protocols or material specifications..." required></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-5 bg-electric-cyan text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cyan-glow uppercase tracking-widest flex items-center justify-center gap-3 ${formStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  'TRANSMIT REQUISITION'
                )}
              </button>

              {formStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-electric-cyan text-sm text-center font-bold"
                >
                  TRANSMISSION SUCCESSFUL. Technical team alerted.
                </motion.p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-400 text-sm text-center font-bold">
                  TRANSMISSION ERROR. Please verify connection or use email link.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Adomers Logo" className="h-6 w-auto object-contain opacity-50" />
            <span className="text-sm font-bold tracking-wider opacity-40 uppercase">
              Adomers Aerospace & Engineering Pvt Ltd © 2026
            </span>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-[0.2em] font-medium text-titanium-silver opacity-60">
            <span>Hyderabad, TS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
