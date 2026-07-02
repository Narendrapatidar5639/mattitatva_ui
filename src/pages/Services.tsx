import React, { useState } from "react";
import { ArrowRight, X, Sprout, ShieldCheck, Activity, Check } from "lucide-react";
import ServiceForm from "./ServiceForm"; // Importing the newly separated Form file

const G = {
  950: "#030712"
};
const PRIMARY = "#047857"; 

interface RichServiceDetails {
  description: string;
  benefits: { title: string; desc: string }[];
  image: string;
}

// Updated Directory Data with new requirements (Irrigation removed)
const SERVICE_DATA_DIRECTORY: Record<string, RichServiceDetails> = {
  "organic farming advisory": {
    description: "Organic farming is a sustainable agricultural method that avoids synthetic fertilizers, harmful pesticides, and genetically modified seeds. It focuses deeply on natural organic inputs like compost, green manures, bio-fertilizers, and eco-friendly biological pest control systems to maintain long-term soil health, biological diversity, and sustainable field productivity.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
    benefits: [
      { title: "Higher Market Value", desc: "Certified organic grains, vegetables, and fruits fetch premium rates up to 40% higher in trade hubs." },
      { title: "Low Input Cost", desc: "Systematically replaces expensive imported chemical compounds with localized organic formulations." },
      { title: "Long-Term Soil Fertility", desc: "Nurtures the underground microbial ecosystem, restoring soil structure for future generations." }
    ]
  },
  "soil testing & nutrition": {
    description: "Soil health analysis is the foundational step of modern precision agriculture. Our scientific soil testing program maps the presence of essential macro-nutrients (NPK), micro-nutrients, organic carbon percentage, and soil pH levels across your farmland to eliminate chemical overuse.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    benefits: [
      { title: "Optimized Fertilizer Budget", desc: "Saves up to 30% on unnecessary chemical purchases by identifying exact deficiencies." },
      { title: "Maximum Crop Yield Potential", desc: "Ensures plants receive a balanced diet during critical vegetative and flowering phases." },
      { title: "Prevent Acidification", desc: "Regular testing warns against rising salinity and pH imbalances before permanent damage occurs." }
    ]
  },
  "precision drone spraying": {
    description: "Smart drone spraying leverages advanced aerial automation to apply liquid crop protectors, micro-nutrients, and bio-pesticides with unparalleled precision. Traditional hand-spraying methods suffer from uneven distribution whereas multi-rotor drones utilize fine-atomization nozzles.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200",
    benefits: [
      { title: "90% Water Conservation", desc: "Uses highly concentrated ultra-low-volume spray technology, saving thousands of liters per acre." },
      { title: "Rapid Field Coverage", desc: "Completes an entire acre of spraying in less than 8 minutes, avoiding sudden pest infestations." },
      { title: "Zero Operator Health Hazard", desc: "Completely eliminates physical human contact with toxic chemical mist, ensuring total safety." }
    ]
  },
  "integrated pest management": {
    description: "Integrated Pest Management (IPM) is an environmentally sensitive approach to crop protection that combines biological, cultural, and mechanical controls. Rather than continuously blanket-spraying chemicals, our experts map pest life cycles to deploy pheromone traps.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c3aa?auto=format&fit=crop&q=80&w=1200",
    benefits: [
      { title: "Residue-Free Crops", desc: "Produces high-quality harvests with zero chemical residues, satisfying strict compliance norms." },
      { title: "Prevents Pest Resistance", desc: "Multi-layered biological and mechanical disruptions prevent pests from developing immunity." },
      { title: "Preserves Natural Predators", desc: "Keeps beneficial bugs, honeybees, and soil microbes alive to naturally suppress breakouts." }
    ]
  },
  "get franchise": {
    description: "Join Maatitatva's growing network and establish a premier AgTech enablement center in your territory. Our franchise model empowers local entrepreneurs with advanced agricultural testing tools, supply chains, corporate marketing systems, and certified training pathways to build a highly profitable localized enterprise.",
    image: "https://images.unsplash.com/photo-1605000797499-95a58c0369ac?auto=format&fit=crop&q=80&w=1200",
    benefits: [
      { title: "Established Brand Value", desc: "Instantly deploy Maatitatva's identity and trusted operational agronomy guidelines locally." },
      { title: "End-to-End AgTech Inventory", desc: "Direct access to precision instruments, high-grade organic formulations, and specialized drones." },
      { title: "Continuous Technical Support", desc: "Get real-time advisory pipelines backed directly by our chief agricultural scientists." }
    ]
  },
  "near by store": {
    description: "Locate and connect directly with your nearest authorized Maatitatva retail outlet. Every brick-and-mortar hub is packed with modern analytical testing setups, verified biological seed treatments, organic inputs, and on-site expert consult desks built to provide answers immediately.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    benefits: [
      { title: "Instant Soil & Input Sourcing", desc: "Walk in to collect physical formulations or drop samples directly for priority processing." },
      { title: "Localized Agronomist Access", desc: "Book immediate sit-down diagnostic reviews tailored precisely to your pin-code ecosystem." },
      { title: "Live Product Demonstrations", desc: "See new precision spray setups and test results running live before choosing layouts." }
    ]
  }
};

interface ServiceItem {
  id: string;
  title: string;
  price: string;
}

const DEFAULT_HOME_SERVICES = [
  { id: "1", title: "Organic Farming Advisory", price: "₹ 1,500.00" },
  { id: "2", title: "Soil Testing & Nutrition", price: "₹ 1,200.00" },
  { id: "3", title: "Precision Drone Spraying", price: "₹ 2,400.00" },
  { id: "4", title: "Integrated Pest Management", price: "₹ 1,800.00" },
  { id: "5", title: "Get Franchise", price: "₹ 15,000.00" },
  { id: "6", title: "Near By Store", price: "₹ 0.00" }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <ServicesPage services={DEFAULT_HOME_SERVICES} />
    </div>
  );
}

export function ServicesPage(props: { services?: ServiceItem[] }) {
  const servicesList: ServiceItem[] = props.services || DEFAULT_HOME_SERVICES;
  const [activeFormService, setActiveFormService] = useState<ServiceItem | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    landSize: "",
    cropType: "",
    soilType: "",
    waterSource: "",
    consultMode: "Field Visit",
    prefDate: "",
    details: "I am looking for an expert consultancy session. Kindly schedule an appraisal and share the quotation."
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openServiceForm = (service: any) => {
    setActiveFormService(service);
    setSubmitSuccess(false);
  };

  const closeFormModal = () => {
    setActiveFormService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setActiveFormService(null);
        setFormData({ 
          name: "", email: "", mobile: "", location: "", landSize: "", 
          cropType: "", soilType: "", waterSource: "", consultMode: "Field Visit", prefDate: "",
          details: "I am looking for an expert consultancy session. Kindly schedule an appraisal and share the quotation." 
        });
      }, 2500);
    }, 1200);
  };

  function formatPrice(price: any): React.ReactNode {
    const numericValue = typeof price === "string" ? Number(price.replace(/[^\d.-]/g, "")) : Number(price);
    if (Number.isNaN(numericValue)) return "₹ 1,600.00";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(numericValue);
  }

  const resolveServiceDetails = (title: string): RichServiceDetails => {
    const lowerTitle = title.toLowerCase();
    const key = Object.keys(SERVICE_DATA_DIRECTORY).find(
      (k) => lowerTitle.includes(k) || k.includes(lowerTitle)
    );
    if (key) return SERVICE_DATA_DIRECTORY[key];

    return {
      description: `Our comprehensive ${title} program introduces verified testing methodologies combined with experienced agricultural engineering consultants.`,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200",
      benefits: [
        { title: "Higher Market Value", desc: "Products certified under our guidance fetch premium market prices." },
        { title: "Low Input Cost", desc: "Systematically reduces reliance on expensive chemical compound bags." },
        { title: "Long-term Soil Health", desc: "Nurtures active organic soil layers to restore baseline biological fertility." }
      ]
    };
  };

  return (
    /* Changed max-w width classes to max-w-none to allow full edge-to-edge layouts */
    <div className="w-full max-w-none py-12 px-4 sm:px-8 md:px-12 mx-auto">
      {/* Header Banner */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-green-700 px-3 py-1 bg-green-50 rounded-full">Our Offerings</span>
        <h1 className="text-4xl font-extrabold mt-3 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>
          Comprehensive Agricultural Services
        </h1>
        <p className="text-base text-gray-500 mt-2 max-w-2xl mx-auto">
          Providing end-to-end modern solutions from soil health assessment to final harvest optimization.
        </p>
      </div>

      {/* Maatitatva Brand Introduction Section */}
      <div className="w-full mb-20 p-8 rounded-3xl border border-emerald-100 bg-emerald-50/30 grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Maatitatva Core Advantage
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            At **Maatitatva**, we bridge traditional farming wisdom with revolutionary modern AgTech solutions. Our mission revolves entirely around nurturing soil fertility (Matti) and decoding its essential elements (Tatva) to restore biological equilibrium.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 text-xs font-medium text-emerald-800">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-50 shadow-sm">
            <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Regenerative Soil Conditioning</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-50 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Eco-Safe Protective Management</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-50 shadow-sm">
            <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Precision Data Yield Dashboards</span>
          </div>
        </div>
      </div>

      {/* Services Grid Content layout (Stretched to Full Screen Width) */}
      <div className="space-y-12 w-full">
        {servicesList.map((s, index: number) => {
          const isImageLeft = index % 2 === 0;
          const richDetails = resolveServiceDetails(s.title);

          return (
            <div key={s.id} className="space-y-6 w-full">
              <div 
                className={`flex flex-col md:flex-row items-start gap-8 lg:gap-16 border-2 border-gray-100 p-6 sm:p-10 rounded-3xl bg-white shadow-sm transition-all hover:border-emerald-100 ${
                  isImageLeft ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 md:sticky md:top-6">
                  <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-sm group border border-gray-100 bg-gray-50">
                    <img 
                      src={richDetails.image} alt={s.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Text Content block layout */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 bg-gray-100 rounded-md text-gray-600">
                      Service #{index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.title}
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                      What is {s.title}?
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {richDetails.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Benefits of {s.title} for Farmers
                    </h3>
                    <div className="space-y-4">
                      {richDetails.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-3.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{benefit.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA Block */}
                  <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Session Fee:</span>
                      <span className="text-xl font-bold text-green-700">
                        {s.price ? formatPrice(s.price) : "₹ 1,600.00"}
                      </span>
                    </div>

                    <button
                      onClick={() => openServiceForm(s)}
                      className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <span>Book Consultancy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unified Overlay Modal: Works cleanly across ALL viewports (including mobile) */}
      {activeFormService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl my-auto">
            {/* Close modal handle visible across all screens */}
            <button 
              onClick={closeFormModal}
              className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
            <ServiceForm 
              activeFormService={activeFormService}
              formatPrice={formatPrice}
              resolveServiceDetails={resolveServiceDetails}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}