import React from "react";
import { CheckCircle, FileText, MapPin, Droplets } from "lucide-react";

interface ServiceFormProps {
  activeFormService: { title: string; price: string };
  formatPrice: (price: any) => React.ReactNode;
  resolveServiceDetails: (title: string) => { description: string; image: string };
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitSuccess: boolean;
  isMobileInline?: boolean; // New prop to identify view states
}

const G = {
  100: "#f3f4f6",
  200: "#e5e7eb",
};

export default function ServiceForm({
  activeFormService,
  formatPrice,
  resolveServiceDetails,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  submitSuccess,
  isMobileInline = false,
}: ServiceFormProps) {
  
  // 1. SAFETY GUARD: If activeFormService isn't passed or populated yet, return a safe fallback instead of crashing
  if (!activeFormService || !activeFormService.title) {
    return (
      <div className="w-full bg-white rounded-2xl border p-8 text-center text-gray-500 my-4" style={{ borderColor: G[200] }}>
        <p className="text-sm font-semibold">No active service selected.</p>
        <p className="text-xs text-gray-400 mt-1">Please select an agricultural service option from the main panel.</p>
      </div>
    );
  }

  // 2. Safe execution: The guard above guarantees .title exists now
  const serviceDetails = resolveServiceDetails(activeFormService.title);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-2xl border overflow-hidden w-full grid md:grid-cols-12 relative ${
        isMobileInline ? "max-w-full" : "max-w-5xl animate-in fade-in zoom-in-95 duration-200"
      }`} 
      style={{ borderColor: G[200] }}
    >
      {/* Left Column Context Summary */}
      <div className="md:col-span-4 bg-gray-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r" style={{ borderColor: G[100] }}>
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">Selected Service</span>
          <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {activeFormService.title}
          </h3>
          <div className="h-32 rounded-xl overflow-hidden mb-4 shadow-sm bg-gray-100">
            <img src={serviceDetails?.image || ""} alt={activeFormService.title} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-6">
            {serviceDetails?.description || "No further details available for this selection."}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200 mt-4">
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Estimated Session Cost</div>
          <div className="text-2xl font-black text-green-700 mt-0.5">
            {formatPrice(activeFormService.price)}
            <span className="text-xs font-normal text-gray-500 ml-1">/ session</span>
          </div>
        </div>
      </div>

      {/* Right Column: Advanced Intake Dossier Form Fields */}
      <div className="md:col-span-8 flex flex-col justify-between max-h-[85vh] md:max-h-[90vh] overflow-y-auto">
        <div className="bg-[#1e466e] text-white py-4 px-6 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-200" />
          <h4 className="font-bold text-xs tracking-wide uppercase">Farm Consultancy Intake Dossier</h4>
        </div>

        {submitSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center my-auto min-h-[400px]">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h5 className="text-lg font-bold text-gray-800">Booking Dossier Received</h5>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Thank you! Your crop profiles and agricultural requirements have been successfully registered under Maatitatva administration. An expert agronomist will examine your parameters and contact you to schedule the diagnostic session.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Step 1: Personal Details */}
            <div>
              <h5 className="text-xs font-bold text-gray-800 uppercase border-b pb-1 mb-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Personal Credentials
              </h5>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" name="name" required value={formData?.name || ""} onChange={handleInputChange}
                    placeholder="Enter your full name" className="w-full text-xs px-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
                  <div className="flex rounded-lg border overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 bg-gray-50/50">
                    <span className="bg-gray-100 px-2.5 flex items-center border-r text-[11px] font-semibold text-gray-600">🇮🇳 +91</span>
                    <input 
                      type="tel" name="mobile" required pattern="[0-9]{10}" value={formData?.mobile || ""} onChange={handleInputChange}
                      placeholder="10-digit number" className="w-full text-xs px-3 py-2 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Email Address</label>
                  <input 
                    type="email" name="email" required value={formData?.email || ""} onChange={handleInputChange}
                    placeholder="name@domain.com" className="w-full text-xs px-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Farm Location / State / District</label>
                  <div className="relative">
                    <input 
                      type="text" name="location" required value={formData?.location || ""} onChange={handleInputChange}
                      placeholder="e.g. Dewas, MP" className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Crop & Soil Variables */}
            <div>
              <h5 className="text-xs font-bold text-gray-800 uppercase border-b pb-1 mb-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Land & Crop Parameters
              </h5>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Total Land Size</label>
                  <select 
                    name="landSize" required value={formData?.landSize || ""} onChange={handleInputChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Acreage</option>
                    <option value="1-5">1 - 5 Acres</option>
                    <option value="5-15">5 - 15 Acres</option>
                    <option value="15-30">15 - 30 Acres</option>
                    <option value="30+">More than 30 Acres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Target Crop / Variety</label>
                  <input 
                    type="text" name="cropType" required value={formData?.cropType || ""} onChange={handleInputChange}
                    placeholder="e.g. Soybeans, Cotton, Potatoes" className="w-full text-xs px-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Soil Profile Type (Optional)</label>
                  <select 
                    name="soilType" value={formData?.soilType || ""} onChange={handleInputChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Unknown / Select Profile</option>
                    <option value="Black Soil">Black Soil (Regur)</option>
                    <option value="Red Soil">Red Clay Soil</option>
                    <option value="Alluvial Soil">Alluvial / Silt Soil</option>
                    <option value="Sandy/Loam">Sandy Loam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Irrigation Water Source (Optional)</label>
                  <div className="relative">
                    <select 
                      name="waterSource" value={formData?.waterSource || ""} onChange={handleInputChange}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="">Select Source</option>
                      <option value="Borewell">Deep Borewell</option>
                      <option value="Canal">Canal Irrigation</option>
                      <option value="Rainfed">Rain-fed Farming</option>
                      <option value="Open Well">Open Well / Farm Pond</option>
                    </select>
                    <Droplets className="w-3.5 h-3.5 text-blue-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Session Scheduling Preferences */}
            <div>
              <h5 className="text-xs font-bold text-gray-800 uppercase border-b pb-1 mb-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Consultation Delivery
              </h5>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preferred Meeting Mode</label>
                  <div className="flex gap-3 pt-1">
                    <label className="inline-flex items-center text-xs text-gray-700 cursor-pointer">
                      <input 
                        type="radio" name="consultMode" value="Field Visit" checked={formData?.consultMode === "Field Visit"} onChange={handleInputChange}
                        className="mr-1.5 text-emerald-600 focus:ring-emerald-500"
                      /> On-Field Diagnostics
                    </label>
                    <label className="inline-flex items-center text-xs text-gray-700 cursor-pointer">
                      <input 
                        type="radio" name="consultMode" value="Video Session" checked={formData?.consultMode === "Video Session"} onChange={handleInputChange}
                        className="mr-1.5 text-emerald-600 focus:ring-emerald-500"
                      /> Video Session
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preferred Date</label>
                  <input 
                    type="date" name="prefDate" required value={formData?.prefDate || ""} onChange={handleInputChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Additional Farm Assessment Context</label>
              <textarea 
                name="details" rows={3} value={formData?.details || ""} onChange={handleInputChange}
                className="w-full text-xs px-3 py-2 rounded-lg border bg-gray-50/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <button 
              type="submit" disabled={isSubmitting}
              className="w-full bg-emerald-700 text-white font-bold text-xs uppercase py-3 rounded-xl tracking-wider hover:bg-emerald-800 transition-colors shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Processing Farm Record..." : "Submit Technical Consultation Dossier"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}