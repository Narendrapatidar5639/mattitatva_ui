import React, { useState } from "react";
import {
  ChevronRight, ArrowRight, X
} from "lucide-react";
import type { Page, Product, CartItem } from "../types";
import {
  CONTAINER,
  FONT_BODY,
  FONT_DISPLAY,
  FONT_LABEL,
  G,
  PRIMARY,
} from "../constants/theme";
import { ALL_PRODUCTS, HOME_SERVICES, TESTIMONIALS } from "../data/appData";
import { formatPrice } from "../utils/formatPrice";
import {
  AutoScrollTestimonials,
  GridProductCard,
  HeroCarousel,
  LatestNewsMarquee,
  MobileShopBar,
  PagePattern,
  SectionHeading,
  FeatureTicker,
} from "../components";
import { EventsCalendarSection } from "./Events";

// आपका सर्विस फॉर्म कॉम्पोनेंट
import ServiceForm from "./ServiceForm"; 

export function HomePage(props: any) {
  const {
    cartItems,
    setCartItems,
    wishlist,
    filterBrand,
    setFilterBrand,
    addToCart,
    toggleWishlist,
    navigate,
    products = ALL_PRODUCTS,
  } = props;

  // --- स्टेट और हैंडलर्स ताकि फॉर्म डायरेक्ट फुल स्क्रीन पेज की तरह खुले ---
  const [activeFormService, setActiveFormService] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", location: "", landSize: "",
    cropType: "", soilType: "", waterSource: "", consultMode: "Field Visit",
    prefDate: "", details: "I am looking for an expert consultancy session."
  });

  // प्रोडक्ट्स फ़िल्टर करने के लिए हेल्पर (लैपटॉप के लिए 5 और मोबाइल के लिए पूरे 10 तक ताकि स्क्रॉल हो सके)
  const getBrandProducts = (brandId: string, limit = 10) => {
    return products.filter(p => p.brand === brandId).slice(0, limit);
  };

  const resolveServiceDetails = (title: string) => {
    const matched = HOME_SERVICES.find((s) => s.title === title);
    if (title.toLowerCase().includes("contract")) {
      return {
        description: "End-to-end institutional contract farming management with guaranteed buyback agreements and expert supervision.",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200"
      };
    }
    return {
      description: matched?.desc || "Comprehensive technical consultation guidance.",
      image: matched?.image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200"
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setActiveFormService(null);
        setSubmitSuccess(false);
      }, 2000);
    }, 1000);
  };

  if (activeFormService) {
    return (
      <PagePattern className="!bg-[#f8f9fa] h-screen overflow-hidden">
        <div className="w-full h-screen overflow-y-auto bg-[#f8f9fa] py-6 px-4 md:px-12 relative z-50">
          <button 
            onClick={() => {
              setActiveFormService(null);
              window.scrollTo({ top: 0 });
            }}
            className="absolute top-4 right-4 md:right-12 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-200 transition-colors cursor-pointer text-xs font-bold"
          >
            <X className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <div className="max-w-5xl mx-auto pt-8 pb-16">
            <ServiceForm 
              activeFormService={{
                title: activeFormService.title,
                price: activeFormService.price || "1600.00"
              }}
              formatPrice={formatPrice}
              resolveServiceDetails={resolveServiceDetails}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
            />
          </div>
        </div>
      </PagePattern>
    );
  }

  const displayServices = [...HOME_SERVICES];
  if (!displayServices.some(s => s.title.toLowerCase().includes("contract"))) {
    displayServices.push({
      id: "contract-farming-opt",
      title: "Contract Farming Support",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=600",
      desc: "End-to-end contract farming operational assistance and corporate legal compliance.",
      page: "contract-farming"
    });
  }

  const productCategories = [
    { id: "organic", title: "Organic Products", label: "Organic" },
    { id: "ayurved", title: "Ayurveda Products", label: "Ayurveda" },
    { id: "maatifresh", title: "Maatifresh Products", label: "Maatifresh" },
    { id: "doctor", title: "Doctor Recommended", label: "Doctor Recommended" },
  ];

  return (
    <PagePattern className="!bg-[#f8f9fa]">
      <div className="w-full min-h-screen bg-[#f8f9fa] relative overflow-x-hidden">
        
        {/* BACKGROUND DECORATIVE STICKERS */}
        <div className="hidden lg:block absolute left-[-20px] top-[15%] w-24 h-24 opacity-20 pointer-events-none z-0 select-none animate-pulse">
          <img src="/leaf.png" alt="sticker" className="w-full h-full object-contain transform rotate-45" />
        </div>
        <div className="hidden lg:block absolute right-[-15px] top-[32%] w-20 h-20 opacity-15 pointer-events-none z-0 select-none">
          <img src="/tea-leaf.png" alt="sticker" className="w-full h-full object-contain transform -rotate-12" />
        </div>
        <div className="hidden lg:block absolute left-[-10px] top-[55%] w-24 h-24 opacity-25 pointer-events-none z-0 select-none">
          <img src="/olives.png" alt="sticker" className="w-full h-full object-contain transform rotate-90" />
        </div>
        <div className="hidden lg:block absolute right-[-30px] top-[75%] w-28 h-28 opacity-20 pointer-events-none z-0 select-none">
          <img src="/leaf.png" alt="sticker" className="w-full h-full object-contain transform -rotate-45" />
        </div>

        <MobileShopBar
          activeId={filterBrand}
          onSelect={id => { setFilterBrand(id); navigate("products"); }}
        />
        
        <HeroCarousel onShop={() => navigate("products")} onServices={() => navigate("services")} />
        <FeatureTicker />

        {/* PRODUCT CONTAINER GROUP */}
        <div className="w-full py-2 px-3 md:px-12 bg-transparent max-w-full space-y-8 mt-4 relative z-10 mobile-compact-descriptions">
          
          {productCategories.map((category) => {
            const categoryProducts = getBrandProducts(category.id, 10);
            
            return (
              <div key={category.id} className="w-full bg-transparent">
                <div className="flex justify-between items-center mb-3 border-b pb-1.5" style={{ borderColor: "#bc6c2540" }}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: PRIMARY }} />
                    <h3 className="font-bold text-base md:text-lg text-gray-900 tracking-tight capitalize" style={{ fontFamily: FONT_DISPLAY }}>
                      {category.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => { setFilterBrand(category.id); navigate("products"); }}
                    className="group flex items-center gap-0.5 text-gray-700 hover:text-emerald-900 font-bold text-xs transition-colors"
                  >
                    <span>View All {category.label}</span>
                    <ChevronRight size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* UI FIX: मोबाइल पर 2 कार्ड्स दिखे और हॉरिजॉन्टल स्क्रॉलिंग हो, लैपटॉप पर फिक्स 5 ग्रिड कॉलम दिखे */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-3 w-full scrollbar-none pb-2 md:pb-0">
                  {categoryProducts.map((product, idx) => (
                    <div 
                      key={product.id} 
                      className={`w-[calc(50%-6px)] min-w-[calc(50%-6px)] md:w-full md:min-w-0 h-auto max-h-[320px] md:max-h-none shadow-sm rounded-xl overflow-hidden bg-white transition-all hover:shadow-md border flex-shrink-0 ${
                        idx >= 5 ? 'md:hidden' : ''
                      }`} 
                      style={{ borderColor: PRIMARY }}
                    >
                      <GridProductCard
                        product={product}
                        onAddToCart={addToCart}
                        onWishlist={() => toggleWishlist(product)}
                        onView={() => navigate("product-detail", product)}
                        wishlisted={wishlist.includes(product.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>

        {/* LATEST NEWS MARQUEE */}
        <LatestNewsMarquee />

        {/* CUSTOM SERVICES GRID SECTION */}
        <div className="w-full max-w-6xl mx-auto px-6 md:px-16 py-12 bg-transparent relative z-10">
          <div className="flex flex-col items-center text-center mb-16 border-b pb-4 relative" style={{ borderColor: "#bc6c2530" }}>
            <div className="flex items-center gap-2 justify-center">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: PRIMARY }} />
              <h3 className="font-bold text-xl md:text-2xl text-gray-900 tracking-tight capitalize" style={{ fontFamily: FONT_DISPLAY }}>
                Our Agricultural Services
              </h3>
            </div>

            <button
              onClick={() => navigate("services")}
              className="group flex items-center gap-1 text-gray-600 hover:text-emerald-900 font-bold text-xs mt-2 transition-colors cursor-pointer"
            >
              <span>View All Services</span>
              <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full justify-items-center">
            {displayServices.slice(0, 4).map((s, index) => {
              const blockBgColor = index % 2 === 0 ? "#333a42" : "#f18c22";

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveFormService(s);
                    setTimeout(() => window.scrollTo({ top: 0 }), 50);
                  }}
                  className="w-full max-w-[250px] aspect-square bg-[#f0f2f5] rounded-xl p-4 flex flex-col items-center justify-between relative cursor-pointer border border-gray-200/80 transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
                >
                  <div className="w-26 h-26 rounded-full border-4 border-white shadow-md overflow-hidden bg-white z-20 absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <img
                      src="https://img.freepik.com/premium-photo/tree-with-root-system-transverse-arrangement-soil-going-deep-into-ground-water-absorption-system_172447-9160.jpg"
                      alt="Service Plant Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="h-10 w-full"></div>

                  <div 
                    style={{ backgroundColor: blockBgColor }}
                    className="w-full rounded-xl py-3 px-4 flex items-center justify-center text-center relative shadow-inner mt-1 mb-3 flex-grow min-h-[95px]"
                  >
                    <h4 
                      className="text-white font-bold text-xs md:text-sm leading-snug tracking-wide" 
                      style={{ fontFamily: FONT_DISPLAY }}
                    >
                      {s.title}
                    </h4>

                    <div 
                      style={{ borderTopColor: blockBgColor }}
                      className="absolute -bottom-3.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[14px] z-10"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* UPCOMING EVENTS CALENDAR SECTION */}
        <div className="w-full px-4 md:px-12 py-6 bg-transparent relative z-10 home-mobile-events-container">
          <section aria-labelledby="home-events-calendar-heading" className="w-full bg-white rounded-3xl p-4 shadow-sm border border-gray-100/80">
            <EventsCalendarSection embedded />
          </section>
          
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-none {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @media (max-width: 767px) {
              .home-mobile-events-container .flex.flex-col.space-y-4,
              .home-mobile-events-container .space-y-4,
              .home-mobile-events-container [class*="space-y-"] {
                display: flex !important;
                flex-direction: row !important;
                gap: 12px !important;
                overflow-x: auto !important;
                padding-bottom: 12px !important;
                scrollbar-width: none;
              }
              .home-mobile-events-container .flex.flex-col.space-y-4::-webkit-scrollbar,
              .home-mobile-events-container .space-y-4::-webkit-scrollbar {
                display: none;
              }
              .home-mobile-events-container .flex.flex-col.space-y-4 > *,
              .home-mobile-events-container .space-y-4 > * {
                min-width: 280px !important;
                max-width: 280px !important;
                flex-shrink: 0 !important;
                margin-top: 0 !important;
              }
              
              /* मोबाइल व्यू कॉम्पैक्ट स्टाइलिंग */
              .mobile-compact-descriptions p,
              .mobile-compact-descriptions .text-sm,
              .mobile-compact-descriptions .text-xs {
                font-size: 10px !important;
                line-height: 1.2 !important;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .mobile-compact-descriptions h4,
              .mobile-compact-descriptions h3 {
                font-size: 12px !important;
                margin-bottom: 1px !important;
              }
              .mobile-compact-descriptions .p-3, 
              .mobile-compact-descriptions .p-4 {
                padding: 6px !important;
              }
              .mobile-compact-descriptions button {
                padding: 4px 8px !important;
                font-size: 10px !important;
              }
            }
          `}} />
        </div>

        {/* ABOUT MATTITATVA BLOCK */}
        <div className="text-[#3D2516] font-sans py-4 px-4 md:px-12 max-w-full mx-auto selection:bg-[#E9DCC6] relative z-10">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 rounded-3xl border shadow-sm" style={{ borderColor: G[100] }}>
            <div className="col-span-1 md:col-span-5 rounded-2xl overflow-hidden h-64 md:h-96 shadow-sm relative w-full bg-gray-50">
              <img
                src="https://img.freepik.com/premium-photo/tree-with-root-system-transverse-arrangement-soil-going-deep-into-ground-water-absorption-system_172447-9160.jpg"
                alt="About Plant Roots"
                className="w-full h-full object-contain md:object-cover"
              />
            </div>
            <div className="col-span-1 md:col-span-7 space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: PRIMARY, fontFamily: FONT_DISPLAY }}>
                About Mattitatva
              </h2>
              <p className="leading-relaxed text-xs md:text-sm" style={{ color: "#6F5845" }}>
                MattiTatva is deeply committed to fostering a healthier, modern lifestyle through sustainable agriculture and holistic wellness. We firmly believe in the innate, uncompromised purity of nature's soil and strive to narrow down the growing gap between traditional organic ecosystems and urban consumers. By preserving ancient farming heritage and employing technical agricultural support, we bring pure, authentic Ayurvedic options straight from fertile fields into your daily life. Our mission ensures eco-friendly practices that protect the earth while nourishing families, offering an organic bridge that reconnects humanity with ancestral health systems, ensuring trusted quality, vitality, and true well-being.
              </p>
              <div>
                <a href="#" className="inline-block text-xs font-bold border-b-2 pb-0.5 transition hover:opacity-75" style={{ color: PRIMARY, borderColor: PRIMARY }}>
                  Read More
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER TESTIMONIALS */}
        <div className="w-full bg-transparent pt-6 relative overflow-hidden z-10">
          <section className={`${CONTAINER} py-10 pb-12 px-4 md:px-12 rounded-t-[2.5rem] bg-gradient-to-b from-[#F4EBE1]/90 to-[#EADBC8]/70 border-t-2 border-[#3E2723]/10 relative`} aria-labelledby="home-testimonials-heading">
            <div className="relative z-20">
              <SectionHeading id="home-testimonials-heading" title="What Our Customers Say" subtitle="Trusted by farmers across Maharashtra and beyond" />
              <div className="mt-4">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <AutoScrollTestimonials items={TESTIMONIALS} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PagePattern>
  );
}