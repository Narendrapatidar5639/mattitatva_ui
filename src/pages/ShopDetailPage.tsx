import React, { useState, useEffect } from "react";
import { 
  Phone, MessageSquare, Star 
} from "lucide-react";

const THEME_COLORS = {
  bgLight: "#F5F3EE",          // सॉफ्ट वाइट / बेज
  cardBg: "#FFFFFF",           // क्लीन वाइट कार्ड्स
  primaryGreen: "#1B4332",     // गहरा समृद्ध ग्रीन (सस्टेनेबिलिटी फील)
  soilBrown: "#9C6644",        // सॉइल / क्ले ब्राउन
  textDark: "#262524",         
  textMuted: "#6B7280",        
};

// सजावटी पत्ती (Leaf) का SVG कंपोनेंट
const DecorativeLeaf = ({ className = "" }) => (
  <svg className={`opacity-15 pointer-events-none select-none ${className}`} width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 22C2 22 6 18 12 17C18 16 22 12 22 6C22 4 20 2 18 2C12 2 8 6 7 12C6 18 2 22 2 22Z" fill={THEME_COLORS.primaryGreen} />
    <path d="M12 17C14.5 14.5 17.5 10.5 18 2" stroke="#FFF" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

const MOCK_SHOP_DETAIL = {
  name: "Earth & Clay Art Studio",
  category: "Authorized Mattitatva Dealer",
  location: "Auroville, Puducherry",
  address: "Full Address: 11-11 Daven Road, Auroville, Puducherry",
  phone: "+91234556 7888",
  whatsapp: "+91234556 7888",
  
  description: "I with passion for my creating sustainable, traditional, clay items. I invite to easy room creativity and experience to home and from of artisan handcrafted planters. Each item is carefully curated to show we creating a traditional and eco-friendly atmosphere. Our studio focuses on minimal waste, native techniques, and bringing the soothing touch of clay into your modern living spaces.",
  ownerName: "Lakshmi Devi",
  ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format",

  galleryImages: [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&fit=crop&auto=format"
  ],

  testimonials: [
    { id: 1, name: "Arun Kumar", comment: "Absolutely love my new planters!", rating: 5 },
    { id: 2, name: "Nama Smith", comment: "Beautiful textures and soil-friendly materials.", rating: 5 },
    { id: 3, name: "Priya Sharma", comment: "The clay items add a beautiful earthiness to my home.", rating: 5 },
    { id: 4, name: "Naman P.", comment: "Excellent support and very secure delivery.", rating: 4 },
    { id: 5, name: "John Doe", comment: "Pure craftsmanship. Highly recommended for eco-lovers.", rating: 5 },
    { id: 6, name: "Anita Desai", comment: "Stunning designs and authentic traditional textures.", rating: 5 },
    { id: 7, name: "Vikram Singh", comment: "The quality of the planters exceeds expectations.", rating: 5 },
    { id: 8, name: "Elena R.", comment: "Fast shipping and safely packaged. Beautiful art pieces.", rating: 4 },
    { id: 9, name: "Rajesh Patel", comment: "Brings traditional vibe right into modern living rooms.", rating: 5 },
    { id: 10, name: "Sophia M.", comment: "The best authorized Mattitatva store experience!", rating: 5 }
  ]
};

export function ShopDetailPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % MOCK_SHOP_DETAIL.galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen font-sans selection:bg-emerald-800 selection:text-white relative overflow-x-hidden" style={{ backgroundColor: THEME_COLORS.bgLight }}>
      
      {/* पत्तियों का बैकग्राउंड एलीमेंट */}
      <div className="absolute top-10 right-0 overflow-hidden w-32 h-32 opacity-20 pointer-events-none">
        <DecorativeLeaf className="w-full h-full rotate-45" />
      </div>
      <div className="absolute top-[40%] left-[-20px] overflow-hidden w-24 h-24 opacity-20 pointer-events-none">
        <DecorativeLeaf className="w-full h-full -rotate-45" />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-continuous {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-continuous:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* बदलाव 1: space-y-16 से घटाकर space-y-8 किया गया (Sections के बीच का गैप कम करने के लिए) */}
      <div className="w-full py-8 space-y-8 relative z-10">
        
        {/* मुख्य शीर्षक */}
        <div className="px-4 sm:px-6 md:px-12 flex items-center gap-3">
          <h1 className="text-4xl font-serif font-bold tracking-tight" style={{ color: THEME_COLORS.primaryGreen }}>
            Shop Detail
          </h1>
          <DecorativeLeaf className="w-8 h-8 opacity-40 -rotate-12 mt-2" />
        </div>

        {/* ================= SECTION 1: TOP HERO CONTAINER ================= */}
        <div className="px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* लेफ्ट side: इमेज + शॉप डिटेल्स */}
            <div className="rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between" style={{ backgroundColor: THEME_COLORS.cardBg }}>
              
              {/* दुकान की मुख्य इमेज */}
              <div className="w-full h-56 sm:h-64 overflow-hidden shadow-inner flex-shrink-0">
                <img 
                  src={MOCK_SHOP_DETAIL.galleryImages[0]} 
                  alt={MOCK_SHOP_DETAIL.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* डिटेल्स और बटन्स कंटेंट एरिया */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase font-bold tracking-wider" style={{ color: THEME_COLORS.soilBrown }}>
                      {MOCK_SHOP_DETAIL.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight" style={{ color: THEME_COLORS.textDark }}>
                    {MOCK_SHOP_DETAIL.name}
                  </h2>
                  <p className="text-sm font-semibold" style={{ color: THEME_COLORS.primaryGreen }}>
                    {MOCK_SHOP_DETAIL.location}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: THEME_COLORS.textMuted }}>
                    {MOCK_SHOP_DETAIL.address}
                  </p>
                </div>

                {/* कॉन्टैक्ट बटन्स */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: THEME_COLORS.textMuted }}>
                    Direct Contacts
                  </span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={`tel:${MOCK_SHOP_DETAIL.phone}`} className="flex items-center gap-3 text-sm font-bold p-3 rounded-xl bg-stone-50 border hover:shadow-sm transition-all flex-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: THEME_COLORS.soilBrown }}>
                        <Phone size={13} />
                      </div>
                      <span className="truncate" style={{ color: THEME_COLORS.textDark }}>{MOCK_SHOP_DETAIL.phone}</span>
                    </a>
                    <a href={`https://wa.me/${MOCK_SHOP_DETAIL.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-bold p-3 rounded-xl bg-stone-50 border hover:shadow-sm transition-all flex-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: THEME_COLORS.primaryGreen }}>
                        <MessageSquare size={13} />
                      </div>
                      <span className="truncate" style={{ color: THEME_COLORS.textDark }}>{MOCK_SHOP_DETAIL.whatsapp}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* राइट साइड: फुल हाइट लोकेशन मैप */}
            <div className="w-full min-h-[380px] md:min-h-full relative">
              <div 
                onClick={() => window.open(`http://maps.google.com/?q=${encodeURIComponent(MOCK_SHOP_DETAIL.address)}`, "_blank")}
                className="w-full h-full bg-[#E3DFD5] rounded-2xl overflow-hidden relative flex flex-col justify-end p-5 border border-stone-300/60 shadow-sm cursor-pointer hover:border-stone-400 transition-all min-h-[380px]"
              >
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#2e5a44_1px,transparent_1px)] [background-size:20px_20px]"></div>
                
                {/* फ्लोटिंग डेकोरेटिव लीफ मैप पर */}
                <DecorativeLeaf className="absolute top-4 right-4 rotate-90 w-12 h-12 opacity-20 text-emerald-900" />

                <div className="relative bg-white/95 backdrop-blur-sm p-4 rounded-xl w-full shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-stone-200">
                  <div>
                    <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Live Map Router</p>
                    <p className="text-xs sm:text-sm font-bold" style={{ color: THEME_COLORS.textDark }}>Navigate directly to Earth & Clay</p>
                  </div>
                  <button className="text-white text-[11px] font-bold px-5 py-2.5 rounded-lg transition-transform active:scale-95 whitespace-nowrap self-stretch sm:self-auto text-center shadow-sm" style={{ backgroundColor: THEME_COLORS.soilBrown }}>
                    GET DIRECTIONS
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* सेपरेटर (मार्जिन कम किया गया) */}
        <div className="flex justify-center items-center gap-4 opacity-20 px-4 my-2">
          <div className="h-[1px] bg-stone-400 flex-1 max-w-[100px]"></div>
          <DecorativeLeaf className="w-6 h-6 rotate-12" />
          <div className="h-[1px] bg-stone-400 flex-1 max-w-[100px]"></div>
        </div>

        {/* ================= SECTION 2: EDGE-TO-EDGE GALLERY WITH ROAD BOUNDARIES ================= */}
        {/* बदलाव 2: इमेजेस की हाइट लैपटॉप व्यू में md:h-64 की गई और ऊपर-नीचे रोड जैसी Boundaries डिजाइन ऐड की गई */}
        <div className="w-full space-y-3 relative">
          <div className="px-4 sm:px-6 md:px-12 flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold font-serif" style={{ color: THEME_COLORS.textDark }}>Gallery of Shop</h3>
              <p className="text-xs text-stone-500 mt-0.5">Sleek layout extending across the screen. Auto-looping items.</p>
            </div>
          </div>

          {/* Road Boundary Outer Wrap */}
          <div className="w-full relative">
            {/* Top Boundary Line */}
            <div className="w-full border-t border-b-2 border-stone-400/60 bg-stone-300/40 h-1.5 mb-1 flex justify-around opacity-70">
              <div className="w-4 h-full bg-stone-400/40 dynamic-dashed"></div>
              <div className="w-4 h-full bg-stone-400/40 dynamic-dashed"></div>
              <div className="w-4 h-full bg-stone-400/40 dynamic-dashed"></div>
            </div>

            <div className="w-full bg-stone-200/40 py-4 overflow-hidden relative border-y border-stone-300">
              <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${galleryIndex * 20}%)` }}>
                {[...MOCK_SHOP_DETAIL.galleryImages, ...MOCK_SHOP_DETAIL.galleryImages].map((img, idx) => (
                  <div key={idx} className="w-[75vw] sm:w-[40vw] md:w-[28vw] h-44 md:h-64 px-2 flex-shrink-0"> {/* लैपटॉप के लिए md:h-64 */}
                    <div className="w-full h-full overflow-hidden shadow-md rounded-xl border border-white">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-all duration-300 hover:scale-105" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Boundary Line */}
            <div className="w-full border-b border-t-2 border-stone-400/60 bg-stone-300/40 h-1.5 mt-1 flex justify-around opacity-70">
              <div className="w-4 h-full bg-stone-400/40 dynamic-dashed"></div>
              <div className="w-4 h-full bg-stone-400/40 dynamic-dashed"></div>
              <div className="w-4 h-full bg-stone-400/40 dynamic-dashed"></div>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-2">
            {MOCK_SHOP_DETAIL.galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setGalleryIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === galleryIndex ? 'w-6' : 'bg-stone-300'}`}
                style={{ backgroundColor: idx === galleryIndex ? THEME_COLORS.primaryGreen : undefined }}
              />
            ))}
          </div>
        </div>

        {/* सेपरेटर (मार्जिन कम किया गया) */}
        <div className="flex justify-center items-center gap-4 opacity-20 px-4 my-2">
          <div className="h-[1px] bg-stone-400 flex-1 max-w-[100px]"></div>
          <DecorativeLeaf className="w-6 h-6 -rotate-45" />
          <div className="h-[1px] bg-stone-400 flex-1 max-w-[100px]"></div>
        </div>

        {/* ================= SECTION 3: SHOPKEEPER'S NOTE ================= */}
        <div className="w-full space-y-4 relative">
          <div className="px-8 sm:px-16 md:px-32 flex items-center justify-between">
            <h3 className="text-2xl font-bold font-serif" style={{ color: THEME_COLORS.textDark }}>
              Shopkeeper’s Note
            </h3>
            <DecorativeLeaf className="w-8 h-8 opacity-30 rotate-45" />
          </div>
          
          <div className="px-8 sm:px-16 md:px-32 w-full">
            <div className="rounded-2xl p-6 sm:p-10 md:p-12 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-stretch gap-8 min-h-[380px] relative overflow-hidden" style={{ backgroundColor: THEME_COLORS.cardBg }}>
              
              {/* बैकग्राउंड एस्थेटिक लीफ */}
              <DecorativeLeaf className="absolute bottom-[-10px] left-[-10px] w-24 h-24 opacity-5 rotate-90" />

              <div className="w-full md:w-[65%] flex flex-col justify-between space-y-6 relative z-10">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold font-serif md:text-2xl flex items-center gap-2" style={{ color: THEME_COLORS.primaryGreen }}>
                    <span>A Word from the Shopkeeper</span>
                  </h4>
                  <p className="text-sm md:text-base leading-relaxed text-justify text-stone-600">
                    {MOCK_SHOP_DETAIL.description}
                  </p>
                </div>

                {/* बदलाव 3: डिज़क्रिप्शन के नीचे व्यवस्थित रूप से Shopkeeper Name और कॉल/व्हाट्सएप बटन्स जोड़े गए */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Store Owner</p>
                    <p className="text-base font-bold font-serif" style={{ color: THEME_COLORS.textDark }}>
                      {MOCK_SHOP_DETAIL.ownerName}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-stone-500 hidden lg:inline">Connect directly:</span>
                    <a 
                      href={`tel:${MOCK_SHOP_DETAIL.phone}`} 
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-95" 
                      style={{ backgroundColor: THEME_COLORS.soilBrown }}
                    >
                      <Phone size={14} />
                      <span>Call Owner</span>
                    </a>
                    <a 
                      href={`https://wa.me/${MOCK_SHOP_DETAIL.whatsapp}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-95" 
                      style={{ backgroundColor: THEME_COLORS.primaryGreen }}
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* शॉपकीपर फोटो फ्रेम */}
              <div className="w-full md:w-[35%] min-h-[260px] md:min-h-full relative flex-shrink-0">
                <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl" style={{ backgroundColor: THEME_COLORS.soilBrown }}></div>
                <div className="absolute inset-0 rounded-xl overflow-hidden border-4 border-white shadow-md">
                  <img 
                    src={MOCK_SHOP_DETAIL.ownerImage} 
                    alt={MOCK_SHOP_DETAIL.ownerName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* सेपरेटर (मार्जिन कम किया गया) */}
        <div className="flex justify-center items-center gap-4 opacity-20 px-4 my-2">
          <div className="h-[1px] bg-stone-400 flex-1 max-w-[100px]"></div>
          <DecorativeLeaf className="w-6 h-6 rotate-90" />
          <div className="h-[1px] bg-stone-400 flex-1 max-w-[100px]"></div>
        </div>

        {/* ================= SECTION 4: 10 CUSTOMER TESTIMONIALS (MARQUEE) ================= */}
        <div className="w-full space-y-4 pt-2">
          <div className="px-4 sm:px-6 md:px-12 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold font-serif" style={{ color: THEME_COLORS.textDark }}>
                What Our Community Says
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Continuous seamless traveling animation of 10 customer notes.</p>
            </div>
            <DecorativeLeaf className="w-7 h-7 opacity-30 -rotate-90" />
          </div>

          <div className="w-full overflow-hidden relative bg-stone-200/20 py-4">
            <div className="animate-marquee-continuous gap-6 px-4">
              
              {MOCK_SHOP_DETAIL.testimonials.map((item) => (
                <div 
                  key={`first-${item.id}`} 
                  className="w-[280px] sm:w-[320px] p-5 rounded-xl border border-stone-200/60 shadow-sm flex flex-col justify-between space-y-3 flex-shrink-0 bg-white"
                >
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" className="text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs italic font-medium leading-relaxed text-stone-600">
                    "{item.comment}"
                  </p>
                  <h5 className="text-xs font-bold pt-2 border-t border-stone-100 flex items-center justify-between" style={{ color: THEME_COLORS.primaryGreen }}>
                    <span>{item.name}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider">Verified</span>
                  </h5>
                </div>
              ))}

              {/* Loop निरन्तरता के लिए डुप्लिकेट सेट */}
              {MOCK_SHOP_DETAIL.testimonials.map((item) => (
                <div 
                  key={`second-${item.id}`} 
                  className="w-[280px] sm:w-[320px] p-5 rounded-xl border border-stone-200/60 shadow-sm flex flex-col justify-between space-y-3 flex-shrink-0 bg-white"
                >
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" className="text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs italic font-medium leading-relaxed text-stone-600">
                    "{item.comment}"
                  </p>
                  <h5 className="text-xs font-bold pt-2 border-t border-stone-100 flex items-center justify-between" style={{ color: THEME_COLORS.primaryGreen }}>
                    <span>{item.name}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider">Verified</span>
                  </h5>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}