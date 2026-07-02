// src/pages/GetFranchise.tsx
import React, { useState } from "react";
import { 
  CheckCircle, 
  Award, 
  Landmark, 
  Users, 
  ShieldCheck, 
  LineChart, 
  Network, 
  Sprout, 
  Cpu, 
  MapPin, 
  FileText, 
  Briefcase 
} from "lucide-react";

export function GetFranchisePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    investmentBracket: "",
    experience: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", mobile: "", location: "", investmentBracket: "", experience: "" });
    }, 3000);
  };

  const coreFunctions = [
    {
      icon: <Sprout size={24} />,
      title: "Premium Agri-Input Retail",
      desc: "Serve as the official regional node distributing premium organic fertilizers, specialized bio-nutrients, and crop protection catalogs directly manufactured by Maati Tatva."
    },
    {
      icon: <Cpu size={24} />,
      title: "Tech-Enabled Services Center",
      desc: "Operate as a high-tech service hub facilitating localized drone spraying operations, real-time soil testing labs, and IoT-driven precision agriculture support for local farmers."
    },
    {
      icon: <Network size={24} />,
      title: "Community Agri-Network Hub",
      desc: "Act as a trusted bridge connecting rural farming clusters with corporate agronomy experts, offering scientific counseling and market linkage infrastructure."
    }
  ];

  const perks = [
    { icon: <Award size={22} />, title: "Brand Equity", desc: "Operate under the trusted, certified banner of Maati Tatva Agro Industries." },
    { icon: <Landmark size={22} />, title: "Supply Chain Stability", desc: "Direct logistical pipelines eliminate middle-man margins completely." },
    { icon: <LineChart size={22} />, title: "Proven High Returns", desc: "Highly optimized service margins with rapid predictable ROI curves." },
    { icon: <Users size={22} />, title: "Full Operational Stack", desc: "Complete ERP software training, technical handholding, and localized marketing support." }
  ];

  const operationalSteps = [
    { step: "01", title: "Feasibility Mapping", desc: "Our team assesses your proposed location for zone viability, regional agricultural acreage, and competition data." },
    { step: "02", title: "Regulatory Documentation", desc: "Streamlined clearance of necessary licenses, fertilizer commercial distribution permits, and lease finalization." },
    { step: "03", title: "Infrastructure Setup", desc: "Standardized modern interior design deployment, inventory allocation, and tech-testing dashboard integration." },
    { step: "04", title: "Launch & Support", desc: "Inaugural marketing campaigns, agronomy dashboard activation, and onboarding your region's farming clusters." }
  ];

  return (
    <div className="w-full bg-gray-50/60 py-12 px-4 sm:px-6 lg:px-8 xl:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto w-full space-y-16">
        
        {/* Hero Banner Section */}
        <div className="text-center max-w-3xl mx-auto px-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 px-3.5 py-1.5 bg-emerald-100/70 rounded-full mb-4">
            <Network size={14} className="text-emerald-700 animate-pulse" /> National Expansion Program 2026
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Launch Your Own Maati Tatva <span className="text-emerald-700">AgTech Franchise</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
            Empower local farming communities with cutting-edge agriculture inputs and modern technologies while generating robust, structured retail yields. Join India's fastest-growing sustainable agriculture network.
          </p>
        </div>

        {/* SECTION 1: Concept Breakdown (What is a Franchise Center?) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
                What is a Maati Tatva Franchise Center?
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                It is not just a store—it is a modern, tech-driven **rural empowerment node**. Every franchise center integrates physical supply distribution with live digital service provisioning to act as a one-stop ecosystem for the modern Indian farmer.
              </p>
            </div>

            <div className="space-y-4">
              {coreFunctions.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50 border border-emerald-100 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Conceptual Flow Graph / Diagram Simulation */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-inner space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-800/20 rounded-full blur-3xl"></div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Ecosystem Architecture</span>
              <h3 className="text-xl font-bold mt-1">The Unified Network Flow</h3>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-3.5 bg-white/10 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">HQ</div>
                  <span className="text-xs font-medium">Maati Tatva Plants & R&D Labs</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Direct Pipeline</span>
              </div>

              <div className="flex justify-center my-1">
                <div className="h-6 w-0.5 border-l-2 border-dashed border-emerald-500/50"></div>
              </div>

              <div className="p-4 bg-emerald-800 rounded-xl border-2 border-emerald-500 shadow-md flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-900 font-bold shadow-sm">
                  <Network size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">YOUR FRANCHISE CENTER</h4>
                  <p className="text-[11px] text-emerald-200 mt-0.5">Exclusive Regional Distribution & Service Control</p>
                </div>
              </div>

              <div className="flex justify-center my-1">
                <div className="h-6 w-0.5 border-l-2 border-dashed border-emerald-500/50"></div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <p className="text-[11px] font-bold text-emerald-300">Retail Sales</p>
                  <p className="text-[9px] text-gray-300 mt-0.5">Bio-fertilizers</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <p className="text-[11px] font-bold text-emerald-300">Drone Ops</p>
                  <p className="text-[9px] text-gray-300 mt-0.5">Acreage Spraying</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <p className="text-[11px] font-bold text-emerald-300">Soil Testing</p>
                  <p className="text-[9px] text-gray-300 mt-0.5">Digital Assays</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Split Columns - Perks & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Left Column: Perks & Partner Pipeline */}
          <div className="lg:col-span-5 space-y-6 w-full">
            <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  Commercial Benefits & Perks
                </h2>
                <p className="text-xs text-gray-400 mt-1">What you unlock as an official ecosystem partner</p>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                {perks.map((p, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50 border border-emerald-100">
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{p.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Standard Note */}
            <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl flex gap-3.5 items-start">
              <ShieldCheck className="text-emerald-700 shrink-0 mt-0.5" size={20} />
              <div className="text-xs text-emerald-800/80 leading-relaxed">
                <p className="font-bold text-emerald-900 mb-1">Corporate Validation Clause</p>
                All franchise allocation operations are subject to regional zoning restrictions, grid feasibility analysis, and clear regulatory compliance parameters set by local agricultural authorities.
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm w-full">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Franchise Registration Request
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Please provide highly accurate business and commercial data fields below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1"><Users size={12} /> Applicant Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full legal name" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1"><FileText size={12} /> Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="name@domain.com" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">📞 Mobile Number *</label>
                  <input required type="tel" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="10-digit primary number" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1"><MapPin size={12} /> Proposed Location *</label>
                  <input required type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g., Indore, Madhya Pradesh" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1"><Landmark size={12} /> Planned Capital Setup *</label>
                  <select required value={form.investmentBracket} onChange={e => setForm(p => ({ ...p, investmentBracket: e.target.value }))} className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 text-gray-700 font-medium">
                    <option value="">Select allocation bracket</option>
                    <option value="5-10L">₹5 Lakhs - ₹10 Lakhs</option>
                    <option value="10-20L">₹10 Lakhs - ₹20 Lakhs</option>
                    <option value="20L+">₹20 Lakhs +</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1"><Briefcase size={12} /> Business Background *</label>
                  <select required value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 text-gray-700 font-medium">
                    <option value="">Select industrial range</option>
                    <option value="none">No prior business background</option>
                    <option value="1-3">1 - 3 Years of retail/agri experience</option>
                    <option value="3+">More than 3 Years of enterprise leadership</option>
                  </select>
                </div>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm font-semibold rounded-xl p-4 flex items-center gap-3 shadow-sm transition-all animate-fadeIn">
                  <CheckCircle size={20} className="text-emerald-600 shrink-0" />
                  <span>Application Logged! The Maati Tatva Corporate Expansion Board will review your structural profile shortly.</span>
                </div>
              ) : (
                <button type="submit" className="w-full text-white py-4 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-xl hover:bg-emerald-800 transition-all bg-emerald-700 transform active:scale-[0.99]">
                  Submit Corporate Application
                </button>
              )}
            </form>
          </div>
        </div>

        {/* SECTION 3: Onboarding Pipeline Flow */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-sm space-y-8 w-full">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">The Deployment Onboarding Pipeline</h2>
            <p className="text-xs text-gray-500 leading-relaxed">From initial application filing to your center's commercial launch</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {operationalSteps.map((item, index) => (
              <div key={index} className="bg-gray-50/70 border border-gray-100 rounded-2xl p-5 space-y-3 relative group hover:bg-white hover:shadow-md transition-all">
                <span className="text-2xl font-black text-emerald-100 group-hover:text-emerald-200 transition-colors block font-mono">
                  {item.step}
                </span>
                <h4 className="text-sm font-extrabold text-gray-800 tracking-tight">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}