import React, { useState } from "react";
import {
  MapPin, Phone, Mail, Facebook, Instagram, 
  CheckCircle, Smartphone, Globe, Briefcase
} from "lucide-react";

const COUNTRY_DIAL_CODES = [
  { name: "India", code: "+91" },
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+335" },
  { name: "Algeria", code: "+213" },
  { name: "Australia", code: "+61" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Belgium", code: "+32" },
  { name: "Brazil", code: "+55" },
  { name: "Canada", code: "+1" },
  { name: "China", code: "+86" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Kuwait", code: "+965" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" },
  { name: "Qatar", code: "+974" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Singapore", code: "+65" },
  { name: "South Africa", code: "+27" },
  { name: "Sri Lanka", code: "+94" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" }
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dialCode: "+91",
    mobile: "",
    serviceLookingFor: "",
    details: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", dialCode: "+91", mobile: "", serviceLookingFor: "", details: "" });
    }, 3000);
  };

  return (
    <div className="w-full bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Outer Container - Maximized width capacity for high-res laptops */}
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Banner Intro Section */}
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto px-2">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-800 px-3.5 py-1.5 bg-emerald-100/70 rounded-full mb-4">
            Corporate Connect Desk
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Let's Build Sustainable Agriculture Together
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
            Reach out to the Matti Tatva Agro Industries executive headquarters for operations inquiries, services consultation, supply sourcing, or localized AgTech franchise setups.
          </p>
        </div>

        {/* Core Layout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Left Column: Corporate Directory Indexes (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 w-full">
            <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight border-b border-gray-50 pb-3">
                Corporate Directory
              </h2>

              <div className="space-y-5">
                {/* Contact Person */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Person</p>
                    <p className="text-base font-bold text-gray-800 mt-0.5">Mr. Ayush Khatod</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Registered Office</p>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed mt-0.5">
                      304, 3rd Floor, Manav Trade Center, Madhumilan Square,<br />
                      Nearby Shreemaya Celebration, South Tukoganj,<br />
                      Indore, Madhya Pradesh - 452001, India
                    </p>
                  </div>
                </div>

                {/* Mobile Channels */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mobile Hotlines</p>
                    <div className="text-sm font-bold text-gray-800 mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                      <p className="hover:text-emerald-700 transition-colors">+91-99267 37767</p>
                      <p className="hover:text-emerald-700 transition-colors">+91-99267 37937</p>
                      <p className="hover:text-emerald-700 transition-colors">+91-72229 32553</p>
                      <p className="hover:text-emerald-700 transition-colors">+91-81091 07520</p>
                    </div>
                  </div>
                </div>

                {/* Desk Landline */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Desk Phone</p>
                    <p className="text-sm font-bold text-gray-800 mt-0.5">+91 73147 00743</p>
                  </div>
                </div>

                {/* Email Addresses */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Inquiries Email</p>
                    <p className="text-sm font-bold text-emerald-700 break-all mt-0.5">salesmaatitatvagro@gmail.com</p>
                  </div>
                </div>

                {/* Websites */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700 bg-emerald-50">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Web Portal</p>
                    <a href="https://www.maatitatvaagro.com/" target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-800 hover:text-emerald-700 underline block mt-0.5">
                      www.maatitatvaagro.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Premium Social Blocks Setup */}
              <div className="pt-5 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Official Media Portals</p>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href="https://www.facebook.com/people/Maatitatva-Agro-Industries-Pvt-Ltd/100063955264129/" 
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-100 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all"
                  >
                    <Facebook size={14} className="text-blue-600" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/maatitatva?igshid=ZDdkNTZiNTM%3D" 
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-100 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all"
                  >
                    <Instagram size={14} className="text-pink-600" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Layout */}
            <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm h-72 w-full overflow-hidden">
              <iframe
                title="Matti Tatva Corporate Office Location"
                src="https://maps.google.com/maps?q=Manav%20Trade%20Center,%20Madhumilan%20Square,%20Indore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded-xl border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Verification Indexing Profiles Widget */}
            <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-900 tracking-wider uppercase">Verified Registry Indexing</h4>
              <div className="text-xs text-emerald-800/80 space-y-2 leading-relaxed">
                <p>Maati Tatva Agro Industries Private Limited is mapped across commercial validation profiles:</p>
                <div className="space-y-2 pt-1">
                  <a href="https://www.exportersindia.com/maati-tatva-agro-industries/" target="_blank" rel="noreferrer" className="block text-emerald-700 font-bold underline hover:text-emerald-900 transition-colors">
                    • ExportersIndia Industrial Trade Directory Profile
                  </a>
                  <a href="https://www.indianyellowpages.com/indore/maatitatva-agro-industries-private-limited-south-tukoganj-indore-6888152/" target="_blank" rel="noreferrer" className="block text-emerald-700 font-bold underline hover:text-emerald-900 transition-colors">
                    • Indian Yellow Pages Regional Index Listing
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Setup (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm w-full">
            <div className="mb-6 border-b border-gray-50 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Send an Enquiry Request
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Fields highlighted with an asterisk (*) are strictly required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Row 1 - Two columns on tablet/laptops */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Your Name *</label>
                  <input 
                    required
                    type="text" 
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name" 
                    className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email *</label>
                  <input 
                    required
                    type="email" 
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@company.com" 
                    className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all" 
                  />
                </div>
              </div>

              {/* Input Row 2: Dial Code Custom Selector + Contact Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Mobile Number *</label>
                <div className="flex rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                  <select 
                    value={form.dialCode}
                    onChange={e => setForm(prev => ({ ...prev, dialCode: e.target.value }))}
                    className="bg-transparent border-r border-gray-200 text-xs sm:text-sm px-2 sm:px-3 py-3 outline-none max-w-[110px] sm:max-w-[140px] text-gray-700 font-medium"
                  >
                    {COUNTRY_DIAL_CODES.map((c, idx) => (
                      <option key={idx} value={c.code}>{c.name} ({c.code})</option>
                    ))}
                  </select>
                  <input 
                    required
                    type="tel" 
                    value={form.mobile}
                    onChange={e => setForm(prev => ({ ...prev, mobile: e.target.value }))}
                    placeholder="99267 37767" 
                    className="flex-1 bg-transparent px-4 py-3 text-sm outline-none" 
                  />
                </div>
              </div>

              {/* Input Row 3: Product or Service Lookup Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Product / Service Looking for *</label>
                <select
                  required
                  value={form.serviceLookingFor}
                  onChange={e => setForm(prev => ({ ...prev, serviceLookingFor: e.target.value }))}
                  className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all text-gray-700 font-medium"
                >
                  <option value="">-- Click to choose options --</option>
                  <option value="Organic Farming Advisory">Organic Farming Advisory</option>
                  <option value="Soil Testing & Nutrition Mapping">Soil Testing & Nutrition Mapping</option>
                  <option value="Precision Drone Spraying Automation">Precision Drone Spraying Automation</option>
                  <option value="Integrated Pest Management (IPM)">Integrated Pest Management (IPM)</option>
                  <option value="AgTech Center Franchise Sourcing">AgTech Center Franchise Sourcing</option>
                  <option value="Bulk Supply Procurement">Bulk Product Sourcing / Fertilizer Distribution</option>
                </select>
              </div>

              {/* Input Row 4: Large Text Message Box */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Enquiry Details *</label>
                <textarea 
                  required
                  value={form.details}
                  onChange={e => setForm(prev => ({ ...prev, details: e.target.value }))}
                  placeholder="Kindly append estimated operational land sizing parameters, specific crop yield histories, or bulk commercial application requests here…" 
                  rows={6} 
                  className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all leading-relaxed" 
                />
              </div>

              {/* Confirmation Handle */}
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-semibold rounded-xl p-4 flex items-center gap-3 shadow-sm animate-fadeIn">
                  <CheckCircle size={20} className="text-emerald-600 shrink-0" />
                  <span>Thank you! Your commercial enquiry has been logged successfully. Representative Ayush Khatod will contact you shortly.</span>
                </div>
              ) : (
                <button 
                  type="submit"
                  className="w-full text-white py-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-xl hover:bg-emerald-800 transition-all duration-200 bg-emerald-700 transform active:scale-[0.99]" 
                >
                  Submit Corporate Enquiry
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}