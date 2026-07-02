import React, { useState } from "react";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronRight, ChevronLeft, Star,
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Truck,
  Shield, RotateCcw, Headphones, Plus, Minus, Trash2, Tag, Package,
  CheckCircle, Filter, Grid, List, Eye, Calendar, Clock, ArrowRight,
  Leaf, Home, LayoutGrid, LogOut, CreditCard, Award, BarChart2,
  Users, Store, Percent, FileText, Droplets
} from "lucide-react";

const G = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d",
  950: "#052e16"
};

const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const FONT_BODY = "font-sans";
const FONT_DISPLAY = "'Playfair Display', serif";
const PAGE_BG = "#f9fbf9";

const Logo = function SafeLogoFallback({ size = "medium" }) {
  const isLarge = size === "large";
  return (
    <div className="flex items-center gap-3 justify-center">
      <div className={`rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-extrabold shadow-md ${isLarge ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-lg'}`}>
        MT
      </div>
      <div className="text-left">
        <h1 className={`font-extrabold tracking-tight text-gray-950 leading-none ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          Maati <span className="text-emerald-700">Tatva</span>
        </h1>
        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Agro Industries</p>
      </div>
    </div>
  );
};

const CustomIcons = {
  Sprout: () => (
    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  Wheat: () => (
    <svg className="w-6 h-6 text-emerald-600 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 7l4 4M12 11l-4 4M12 15l4 4" />
    </svg>
  ),
  Handshake: () => (
    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Apple: () => (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393.007a3 3 0 002.503 2.503C14.993 5.38 15 5.25 15 5.118a3 3 0 00-2.503-2.503A4.5 4.5 0 0012 3zm0 0a4.5 4.5 0 00-4.5 4.5c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5A4.5 4.5 0 0012 3z" />
    </svg>
  ),
  Flask: () => (
    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.066a2 2 0 00-1.022.547l-1.393 1.393a2 2 0 00-.585 1.414V20a2 2 0 002 2h14.771a2 2 0 002-2v-1.586a2 2 0 00-.585-1.414l-1.393-1.393z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M12 3v10" />
    </svg>
  ),
  Grass: () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 21V10a4 4 0 018 0v11M12 21V6a4 4 0 018 0v15M18 21V3" />
    </svg>
  )
};

export function AboutPage(props: any) {
  const { navigate } = props;

  /* State to handle the smart solutions and company commitments tabs */
  const [activePillar, setActivePillar] = useState("farming");

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: PAGE_BG }}>
      
      <div 
        className="relative text-white overflow-hidden py-16 md:py-24" 
        style={{ 
          background: `linear-gradient(135deg, ${G[950]}, ${G[800]})`,
        }}
      >
        {/* Subtle Decorative Grid Pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className={`${CONTAINER} relative z-10 text-center px-4 max-w-5xl mx-auto`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 
            99.99% Pure & 100% Organic Certified
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6" 
            style={{ fontFamily: FONT_DISPLAY, lineHeight: 1.15 }}
          >
            Maati Tatva Agro Industries
          </h1>
          
          <p className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-8 text-emerald-100/90">
            India's premier certified Ayurvedic, Medicinal, and Herbal product ecosystem. Empowering thousands of small-holder farmers through direct, sustainable cultivation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/30 border border-emerald-500/20">
              <Shield className="w-4 h-4 text-emerald-400" /> Government Audited Systems
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/30 border border-emerald-500/20">
              <Users className="w-4 h-4 text-emerald-400" /> 6,000+ Direct Active Farmers
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/30 border border-emerald-500/20">
              <Award className="w-4 h-4 text-emerald-400" /> Premium Global Standards
            </span>
          </div>
        </div>
      </div>

      <div className={`${CONTAINER} -mt-8 relative z-20 px-4 max-w-6xl mx-auto`}>
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 grid md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-5">
            <div className="text-emerald-700 font-bold text-sm tracking-wide uppercase flex items-center gap-2">
              <span className="w-8 h-[2px] bg-emerald-600 rounded"></span> The Maati Tatva Difference
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: FONT_DISPLAY }}>
              Direct Farmer Contracts for Elite Authenticity
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Unlike ordinary traders, we build <strong className="text-emerald-800">direct, legally secured contracts</strong> with our farmers. This complete transparency ensures our products are strictly free from synthetic hormones, heavy metals, or toxic chemical residue.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Established with an absolute vision to scale India's ancient medicinal plants to global heights, our journey is supported by dedicated agriculturalists, organic auditors, and wellness specialists.
            </p>
          </div>

          <div className="md:col-span-5 bg-gradient-to-br from-emerald-50 to-green-100/60 p-6 md:p-8 rounded-2xl border border-emerald-100/40 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 text-emerald-200/30 opacity-40">
              <CustomIcons.Wheat />
            </div>
            <h3 className="text-base font-bold text-emerald-950 mb-4 flex items-center gap-2">
              <Shield className="text-emerald-700 w-5 h-5" /> True Organic Assurance
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex gap-3">
                <CheckCircle className="text-emerald-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">99.99% Active Efficacy</h4>
                  <p className="text-xs text-gray-500">Rigidly inspected from selected seeds to vacuum packaging.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-emerald-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Strict Zero-Chemical Policy</h4>
                  <p className="text-xs text-gray-500">Cultivated via bio-fertilizers, organic neem cakes, and compost.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-emerald-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Eco-Conscious Packaging</h4>
                  <p className="text-xs text-gray-500">Sustainably packed to keep raw enzymes and freshness intact.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className={`${CONTAINER} py-16 px-4 max-w-6xl mx-auto`}>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: FONT_DISPLAY }}>Our Agricultural Impact</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">Empowering the roots of Indian medicinal plant farming.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              val: "6,000+", 
              title: "Active Farmer Network", 
              desc: "Working with us directly or indirectly in the herbal sector.", 
              icon: <Users className="w-6 h-6" />
            },
            { 
              val: "2,500+", 
              title: "Certified Organic Group", 
              desc: "Fully verified and audited medicinal specialist farmers.", 
              icon: <Award className="w-6 h-6" />
            },
            { 
              val: "1,000+", 
              title: "Farmers in Conversion", 
              desc: "Transitioning through strict 2nd and 3rd year organic audits.", 
              icon: <CustomIcons.Sprout />
            },
            { 
              val: "100%", 
              title: "Government Certified", 
              desc: "Audited by Indian organic agencies for absolute compliance.", 
              icon: <Shield className="w-6 h-6" />
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600 group-hover:w-2.5 transition-all"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-extrabold text-gray-950 tracking-tight">{item.val}</span>
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
              </div>
              <h3 className="font-extrabold text-sm text-gray-900 mb-1.5">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50/40 border-y border-emerald-100/50 py-16 px-4">
        <div className={`${CONTAINER} max-w-6xl mx-auto`}>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-emerald-800">Our Pillars</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2" style={{ fontFamily: FONT_DISPLAY }}>Sustainable Ecosystem</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Maati Tatva operates as a collaborative technology, financial, and marketing partner for agricultural groups. Click a tab to explore our strict standards:
              </p>

              {/* Pillars Selection List */}
              <div className="space-y-3">
                {[
                  { id: "farming", title: "Contract Farming Safety", icon: <CustomIcons.Handshake /> },
                  { id: "tech", title: "Hi-Tech Farm Solutions", icon: <CustomIcons.Sprout /> },
                  { id: "commitment", title: "Facilities & Commitments", icon: <Droplets size={18} /> },
                  { id: "vision", title: "Our Vision & Goals", icon: <Leaf size={18} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePillar(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 font-semibold transition-all text-sm ${
                      activePillar === tab.id
                        ? "bg-white text-emerald-800 shadow-md border-l-4 border-emerald-600"
                        : "text-gray-600 hover:bg-white/50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Content Panel */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[360px] flex flex-col justify-between">
              
              {activePillar === "farming" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <CustomIcons.Handshake />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Contract Farming & Farmer Safeguards</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We practice fair-contract agriculture tailored exclusively to match global buyers' specifications. Crucially, our frameworks prioritize the protection of regional growers:
                  </p>
                  <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100 space-y-2">
                    <h4 className="text-xs text-amber-900 font-bold flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-700" /> Legally Verified Protective Clauses:
                    </h4>
                    <ul className="text-xs text-amber-900/95 list-disc list-inside space-y-1 pl-1">
                      <li>Purchasing prices are strictly fixed on contracts and are **never** allowed to fall below Government MSP.</li>
                      <li>The **absolute title and ownership of the farmland remains securely with the farmer** at all times.</li>
                      <li>High-grade bio-inputs, organic seeds, and technical training are fully sponsored by Maati Tatva.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activePillar === "tech" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <CustomIcons.Sprout />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Hi-Tech Modern Smart Solutions</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Traditional farming can be physically demanding and economically volatile. We guide our growers with precise agricultural tools to cut down physical labor and reduce expenses:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex gap-2">
                      <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Protected Cultivation</h4>
                        <p className="text-[11px] text-gray-500">Shielding sensitive herbal plants from harsh weather and pests.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Information Systems</h4>
                        <p className="text-[11px] text-gray-500">Real-time soil analysis, weather monitoring, and health tracking.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Direct Logistics</h4>
                        <p className="text-[11px] text-gray-500">Directly linking fields to state-of-the-art warehouses, minimizing waste.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Eco-Efficiency</h4>
                        <p className="text-[11px] text-gray-500">Resource-optimized farming strategies that reduce daily operations costs.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePillar === "commitment" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <Droplets className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Premium Agricultural Infrastructure</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    High-quality organic yield is directly connected to advanced resources. We pledge to equip our partner farmers with necessary tools so they never face operational constraints:
                  </p>
                  <div className="bg-gradient-to-r from-emerald-800 to-green-950 rounded-2xl p-5 text-white flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Droplets className="text-emerald-300 w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Standardized Drip Irrigation Systems</h4>
                      <p className="text-xs text-emerald-100/90 mt-1">
                        Providing advanced drip and micro-sprinkler setups to conserve water resources while maximizing yield in semi-arid zones.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePillar === "vision" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Corporate Vision & Goals</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      <strong>Our Vision:</strong> To scale Ayurvedic cultivation sustainably while establishing direct corridors for Indian herbs worldwide, boosting local grower economies.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> 100% Organic Schemes
                      </div>
                      <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Fair Price Trade Rules
                      </div>
                      <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Local Economic Welfare
                      </div>
                      <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Client Satisfaction
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                <span>Maati Tatva Operations Desk</span>
                <span className="text-emerald-700 font-extrabold">Active Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${CONTAINER} py-16 px-4 max-w-6xl mx-auto`}>
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          
          {/* Corporate Profile Card */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 -z-10 opacity-60"></div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block mb-2">Corporate Leadership</span>
              <h3 className="text-2xl font-bold text-gray-950 mb-6" style={{ fontFamily: FONT_DISPLAY }}>Office Desk</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Chief Executive Officer</div>
                    <div className="text-sm font-bold text-gray-800">Mr. Ayush Khatod</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Year of Establishment</div>
                    <div className="text-sm font-bold text-gray-800">2019 (Operational from 2018)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <BarChart2 size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Business Constitution</div>
                    <div className="text-sm font-bold text-gray-800">Sole Partnership Firm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 mt-6">
              <div className="text-[9px] text-emerald-800 font-extrabold uppercase tracking-wider mb-1">Taxation Registration</div>
              <div className="text-xs font-mono font-bold text-emerald-950 flex justify-between items-center">
                <span>GSTIN: 23AANCM8802G1ZF</span>
                <span className="text-[9px] bg-emerald-700 text-white px-1.5 py-0.5 rounded-full font-sans uppercase">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Dashboard */}
          <div className="md:col-span-8 bg-gradient-to-br from-emerald-950 to-emerald-900 rounded-3xl p-8 text-white relative flex flex-col justify-between">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"></div>
            <div>
              <span className="text-xs font-extrabold tracking-widest text-emerald-300 uppercase block mb-2">Verified Financials</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: FONT_DISPLAY }}>Maati Tatva Corporate Desk</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">Annual Turnover</div>
                  <div className="text-xl font-bold text-white">₹4 to 5 Crores</div>
                  <div className="text-xs text-emerald-100/70 mt-1">Steady volume in certified organic trade channels.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">Employment Power</div>
                  <div className="text-xl font-bold text-white">11 to 25 Direct Experts</div>
                  <div className="text-xs text-emerald-100/70 mt-1">Excluding thousands of regional farmer families.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">Markets Covered</div>
                  <div className="text-xl font-bold text-white">All India Reach</div>
                  <div className="text-xs text-emerald-100/70 mt-1">Connecting remote valleys with central logistics.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">Core Integrity</div>
                  <div className="text-xl font-bold text-white">100% Genuine Extracts</div>
                  <div className="text-xs text-emerald-100/70 mt-1">Zero artificial fillers, pesticides, or GMOs.</div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-emerald-200/70 mt-6 pt-4 border-t border-emerald-800/60 leading-relaxed">
              *All values reflect current compliance parameters verified in mutual cooperation with Mr. Ayush Khatod, CEO of Maati Tatva Agro Industries.
            </p>
          </div>

        </div>
      </div>

      <div className="bg-white border-y border-gray-100 py-16 px-4">
        <div className={`${CONTAINER} max-w-6xl mx-auto`}>
          <div className="text-center mb-12">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider block mb-2">Our Quality Approved Crop Range</span>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: FONT_DISPLAY }}>What We Cultivate & Manufacture</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm mt-3">We are fully engaged in manufacturing and trading clean, certified botanical classes.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Ayurvedic Products", tag: "Certified Formulas", icon: <CustomIcons.Flask /> },
              { title: "Herbal Products", tag: "Organic Extract", icon: <CustomIcons.Sprout /> },
              { title: "Ayurvedic Seeds", tag: "High Germination", icon: <CustomIcons.Wheat /> },
              { title: "Natural Leaves", tag: "Shade Dried", icon: <Leaf className="text-emerald-600" /> },
              { title: "Herbal Roots", tag: "Hygienically Washed", icon: <CustomIcons.Sprout /> },
              { title: "Natural Herb", tag: "Active Compounds", icon: <CustomIcons.Flask /> },
              { title: "Natural Grass", tag: "Aromatic Species", icon: <CustomIcons.Grass /> },
              { title: "Ayurvedic Fruits", tag: "Naturally Ripened", icon: <CustomIcons.Apple /> }
            ].map((cat, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50/50 hover:bg-emerald-50/30 rounded-2xl p-5 border border-gray-100/80 transition-all duration-300 text-center flex flex-col items-center justify-between group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-800 mb-1">{cat.title}</h4>
                  <span className="text-[10px] bg-white text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                    {cat.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${CONTAINER} pt-16 px-4 max-w-5xl mx-auto text-center`}>
        <div className="bg-emerald-50/30 border border-emerald-100/70 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-950 mb-4" style={{ fontFamily: FONT_DISPLAY }}>
            Looking for Bulk Supplies or Strategic Trade Alliances?
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Join hands with Maati Tatva's fair-trade framework. We are bound to expand our premium certified Herbal and Ayurvedic crops worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate?.("contact")}
              className="px-6 py-3 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-all shadow-md flex items-center gap-2"
            >
              Contact Our Office <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => navigate?.("products")}
              className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-all shadow-sm"
            >
              Browse Crop Catalogue
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutPage;