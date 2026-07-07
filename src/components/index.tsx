import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronRight, ChevronLeft, Star,
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Truck,
  Shield, RotateCcw, Headphones, Plus, Minus, Trash2, Tag, Package,
  CheckCircle, Filter, Grid, List, Eye, Calendar, Clock, ArrowRight,
  Leaf, Home, LayoutGrid, LogOut, CreditCard, Bell as BellIcon,
  Award, BarChart2, Stethoscope, Sprout, Apple, FlaskConical, Smartphone,
  Linkedin, Users, Store, Percent, Handshake, FileText, Droplets, Wheat, Bug, Cog
} from "lucide-react";
import type { Page, Product } from "../types";
import { BRAND_CATEGORIES, BRAND_SHOP_CATEGORIES, HOME_NEWS, HOME_SERVICES, SERVICE_ICONS, TESTIMONIALS, HERO_SLIDES } from "../data/appData";
import { LOGO_SRC } from "../constants/branding";
import { CONTAINER, FONT_BODY, FONT_DISPLAY, FONT_LABEL, G, PAGE_BG, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT, PRODUCT_SCROLL_ITEM } from "../constants/theme";
import { formatPrice } from "../utils/formatPrice";

const logoImg = LOGO_SRC;

/**
 * Clean & Fixed PagePattern Layout
 * Isme sticky background shapes pointer-events-none layer me set hain,
 * jisse content selection aur links completely unblocked rahenge.
 */
export function PagePattern({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white min-h-full relative overflow-x-hidden ${className}`}>
      {/* GLOBAL LAYOUT STICKERS CONTAINER (POINTER-EVENTS-NONE) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Top Right Organic Accent Leaf */}
        <div className="absolute top-[12%] -right-16 w-48 h-48 opacity-15 rotate-45 transform scale-x-[-1]">
          <Leaf size="100%" className="text-emerald-800" strokeWidth={1} />
        </div>
        
        {/* Mid-Layout Subtle Earth Core Sprout */}
        <div className="absolute top-[42%] -left-12 w-40 h-40 opacity-10 -rotate-12">
          <Sprout size="100%" className="text-amber-800" strokeWidth={1} />
        </div>

        {/* Lower Section Organic Wheat Pattern */}
        <div className="absolute bottom-[28%] -right-14 w-52 h-52 opacity-15 rotate-12">
          <Wheat size="100%" className="text-amber-700" strokeWidth={1} />
        </div>

        {/* Footer Accent Top Corner Leaf */}
        <div className="absolute bottom-[8%] -left-16 w-44 h-44 opacity-20 rotate-45">
          <Leaf size="100%" className="text-emerald-700" strokeWidth={0.75} />
        </div>
      </div>

      {/* RENDER SYSTEM CONTENT OVER THE SYSTEM ASSETS */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export function HeroCarousel({ onShop, onServices }: { onShop: () => void; onServices: () => void }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[idx];

  return (
    <section className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[460px] lg:max-h-[500px] overflow-hidden bg-gray-900">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full max-h-[500px] object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      <div className={`relative z-20 h-full flex items-center ${CONTAINER}`}>
        <div className="max-w-xl text-white">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 bg-white/15 backdrop-blur-sm border border-white/20">
            {slide.tag}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-3 whitespace-pre-line" style={{ fontFamily: FONT_DISPLAY }}>
            {slide.title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/85 mb-5 max-w-md leading-relaxed">{slide.subtitle}</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button onClick={onShop} className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm text-white flex items-center gap-2 hover:opacity-90" style={{ background: PRIMARY }}>
              Shop Now <ArrowRight size={14} />
            </button>
            <button onClick={onServices} className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm border-2 border-white/50 text-white hover:bg-white/10">
              Explore Services
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="h-1.5 rounded-full transition-all"
            style={{ width: i === idx ? 24 : 8, background: i === idx ? "#fff" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </section>
  );
}

export function ScrollToTop({ pageKey }: { pageKey: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pageKey]);
  return null;
}

export function MobileShopBar({ activeId, onSelect }: { activeId: string | null; onSelect: (id: string) => void }) {
  return (
    <section className="lg:hidden w-full pt-2 pb-1" aria-label="Shop categories">
      <div className={`${CONTAINER}`}>
        <div
          className="flex items-center gap-2.5 rounded-full border bg-gray-50 px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm overflow-x-auto scroll-smooth"
          style={{ borderColor: G[200], scrollbarWidth: "none" }}
        >
          <span
            className="flex-shrink-0 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 pl-0.5"
            style={{ fontFamily: FONT_LABEL }}
          >
            Store
          </span>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {BRAND_SHOP_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelect(cat.id)}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 hover:shadow-sm active:scale-[0.98]"
                style={activeId === cat.id
                  ? { background: PRIMARY, color: "white", borderColor: PRIMARY }
                  : { background: "white", color: "#374151", borderColor: G[200] }}
              >
                <span className="text-base leading-none" aria-hidden="true">{cat.logo}</span>
                <span className="max-w-[88px] sm:max-w-none truncate">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryStrip({ activeId, onSelect }: { activeId: string | null; onSelect: (id: string) => void }) {
  return (
    <div className={`${CONTAINER} py-3 border-t hidden lg:block`} style={{ borderColor: G[100], background: G[50] }}>
      <div className="grid grid-cols-4 gap-3 w-full">
        {BRAND_SHOP_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className="flex items-center justify-center gap-2.5 rounded-full border font-bold transition-all duration-300 hover:shadow-md w-full py-3 px-3 text-sm xl:text-base nav-link-laptop"
            style={activeId === cat.id
              ? { background: PRIMARY, color: "white", borderColor: PRIMARY }
              : { background: "white", color: "#374151", borderColor: G[200] }}
          >
            <span className="text-xl sm:text-2xl leading-none">{cat.logo}</span>
            <span className="whitespace-nowrap truncate">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-300"} />
      ))}
    </div>
  );
}

export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const h = { small: "h-10", default: "h-12 sm:h-14", large: "h-16 sm:h-[72px]" }[size];
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <img src={logoImg} alt="Matti Tatva" className={`${h} w-auto object-contain`} />
      <div className="hidden sm:block leading-tight max-w-[220px] lg:max-w-[280px] xl:max-w-none">
        <p className="text-xs lg:text-base xl:text-[17px] font-bold tracking-wide leading-snug" style={{ color: PRIMARY, fontFamily: FONT_BODY }}>MATTI TATVA AGRO INDUSTRIES PVT. LTD.</p>
      </div>
    </div>
  );
}

export function SectionHeading({ title, subtitle, align = "center", id }: { title: string; subtitle?: string; align?: "center" | "left"; id?: string }) {
  return (
    <div className={`mb-5 ${align === "center" ? "text-center" : "text-left"}`}>
      <p className="text-[10px] uppercase tracking-[0.25em] mb-1.5 font-medium" style={{ fontFamily: FONT_LABEL, color: PRIMARY }}>Matti Tatva</p>
      <h2 id={id} className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-gray-900 leading-tight" style={{ fontFamily: FONT_DISPLAY }}>
        {title}
      </h2>
      {subtitle && <p className={`text-xs md:text-sm mt-1.5 text-gray-500 max-w-lg ${align === "center" ? "mx-auto" : ""}`} style={{ fontFamily: FONT_BODY }}>{subtitle}</p>}
      {align === "center" && (
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY})` }} />
          <Leaf size={12} style={{ color: PRIMARY }} />
          <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(90deg, ${PRIMARY}, transparent)` }} />
        </div>
      )}
    </div>
  );
}

export function NearbyStoreIcon({ size = 18, active = false }: { size?: number; active?: boolean }) {
  const color = active ? PRIMARY : "currentColor";
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size + 4, height: size + 4 }}>
      <Home size={size} style={{ color }} strokeWidth={2} />
      <span
        className="absolute -bottom-0.5 -right-0.5 rounded-full flex items-center justify-center bg-white"
        style={{ width: size * 0.52, height: size * 0.52, boxShadow: "0 0 0 1.5px white" }}
      >
        <MapPin size={size * 0.42} style={{ color: PRIMARY }} fill={PRIMARY} strokeWidth={1.5} />
      </span>
    </span>
  );
}

export function FlipkartProductCard({ product, onAddToCart, onWishlist, onView, wishlisted, large = false }: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onWishlist: (id: number) => void;
  onView: (p: Product) => void;
  wishlisted: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden group flex flex-col h-full transition-all duration-250 hover:-translate-y-0.5 ${large ? "min-h-[340px] xl:min-h-[380px]" : ""}`}
      style={{
        border: "1px solid #d1d5db",
        boxShadow: "0 2px 6px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#86b89a";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 22px rgba(36,104,65,0.14), 0 2px 6px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#d1d5db";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 6px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)";
      }}
    >
      <div
        className="relative h-40 sm:h-44 lg:h-48 cursor-pointer mx-2 mt-2 rounded-lg overflow-hidden bg-gray-50"
        style={{ border: "1px solid #eef0f2" }}
        onClick={() => onView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-1.5 left-1.5 font-bold px-1.5 py-0.5 rounded text-white shadow-sm ${large ? "text-[10px]" : "text-[9px]"}`} style={{ background: "#e53935" }}>{product.discount}% off</span>
        {product.inStock && (
          <span className="absolute bottom-1.5 left-1.5 text-[8px] font-semibold px-1.5 py-0.5 rounded bg-white/95 text-green-700 border border-green-200">In Stock</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); onWishlist(product.id); }}
          className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center border ${wishlisted ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-400 border-gray-200 hover:border-red-300 hover:text-red-400"}`}
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}
        >
          <Heart size={12} className={wishlisted ? "fill-current" : ""} />
        </button>
      </div>
      <div className={`flex flex-col flex-1 ${large ? "p-3.5 sm:p-4" : "p-2.5 sm:p-3"}`} style={{ borderTop: "1px solid #eef0f2" }}>
        <h4 className={`font-semibold text-gray-800 leading-snug line-clamp-2 mb-1.5 flex-1 cursor-pointer hover:text-green-700 ${large ? "text-sm sm:text-base xl:text-lg" : "text-[11px] sm:text-xs"}`} onClick={() => onView(product)}>{product.name}</h4>
        <div className="flex items-center gap-1 mb-1.5">
          <span className={`inline-flex items-center gap-0.5 font-bold text-white px-1.5 py-0.5 rounded ${large ? "text-[11px]" : "text-[10px]"}`} style={{ background: PRIMARY }}>
            {product.rating} <Star size={large ? 9 : 8} className="fill-white text-white" />
          </span>
          <span className={`text-gray-400 ${large ? "text-[10px]" : "text-[9px]"}`}>({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mb-2.5">
          <span className={`font-bold text-gray-900 ${large ? "text-lg sm:text-xl xl:text-2xl" : "text-sm sm:text-base"}`}>₹{product.price}</span>
          <span className={`text-gray-400 line-through ${large ? "text-xs" : "text-[10px]"}`}>₹{product.originalPrice}</span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className={`w-full font-bold rounded-lg text-white active:scale-[0.98] transition-transform ${large ? "py-2.5 text-xs sm:text-sm" : "py-1.5 sm:py-2 text-[10px] sm:text-xs"}`}
          style={{ background: PRIMARY, boxShadow: "0 2px 6px rgba(36,104,65,0.35)" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export function ScrollRowIndicator() {
  return (
    <div className="flex items-center justify-center gap-2 mt-2 lg:hidden" aria-hidden="true">
      <ChevronLeft size={14} className="text-gray-300" />
      <div className="flex items-center gap-1">
        <span className="w-8 h-1 rounded-full transition-colors" style={{ background: PRIMARY }} />
        <span className="w-4 h-1 rounded-full bg-gray-200" />
        <span className="w-4 h-1 rounded-full bg-gray-200" />
      </div>
      <ChevronRight size={14} style={{ color: PRIMARY }} />
    </div>
  );
}

const MOBILE_CARD_SLOT = "flex-shrink-0 w-[calc(50%-0.375rem)] snap-start";

export function HorizBrandSection({ title, emoji, tagline, accent, products, onViewAll, onAddToCart, onWishlist, onView, wishlist, index = 0 }: {
  title: string;
  emoji: string;
  tagline?: string;
  accent?: string;
  products: Product[];
  onViewAll: () => void;
  onAddToCart: (p: Product) => void;
  onWishlist: (id: number) => void;
  onView: (p: Product) => void;
  wishlist: number[];
  index?: number;
}) {
  const bgTint = index % 2 === 0 ? "#ffffff" : "#f7faf8";
  const desktopProducts = products.slice(0, 5);
  const viewAllColor = accent || PRIMARY;

  return (
    <section className="py-5 sm:py-6 border-b border-gray-100 transition-colors duration-300 relative z-10" style={{ background: bgTint }} aria-labelledby={`brand-section-${index}`}>
      <div className={`${CONTAINER} mb-4`}>
        <div className="text-center">
          <span className="text-3xl md:text-4xl block mb-1" aria-hidden="true">{emoji}</span>
          <h2
            id={`brand-section-${index}`}
            className="text-2xl sm:text-3xl md:text-4xl font-bold italic tracking-tight"
            style={{ fontFamily: FONT_DISPLAY, color: viewAllColor }}
          >
            {title}
          </h2>
          {tagline && (
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-1.5 text-gray-400 font-medium" style={{ fontFamily: FONT_LABEL }}>
              {tagline}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-px w-8 sm:w-14 transition-all" style={{ background: viewAllColor, opacity: 0.35 }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: viewAllColor }} />
            <span className="h-px w-8 sm:w-14 transition-all" style={{ background: viewAllColor, opacity: 0.35 }} />
          </div>
        </div>
      </div>

      <div className={`${CONTAINER} lg:hidden`}>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 scroll-row-mobile scroll-smooth transition-all">
          {products.map(product => (
            <div key={product.id} className={MOBILE_CARD_SLOT}>
              <FlipkartProductCard
                product={product}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
                onView={onView}
                wishlisted={wishlist.includes(product.id)}
              />
            </div>
          ))}
        </div>
        <ScrollRowIndicator />
        <div className="flex justify-end mt-3">
          <button
            type="button"
            onClick={onViewAll}
            aria-label={`View all ${title} products`}
            className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-bold px-2 py-1 rounded-lg transition-all duration-300 hover:underline hover:bg-green-50/80 active:scale-95"
            style={{ color: viewAllColor, fontFamily: FONT_BODY }}
          >
            View All Product <ChevronRight size={14} className="flex-shrink-0" />
          </button>
        </div>
      </div>

      <div className={`${CONTAINER} hidden lg:block`}>
        <div className="grid grid-cols-5 gap-3 xl:gap-4">
          {desktopProducts.map(product => (
            <GridProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
              onView={onView}
              wishlisted={wishlist.includes(product.id)}
              compact
            />
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onViewAll}
            aria-label={`View all ${title} products`}
            className="inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-lg transition-all duration-300 hover:underline hover:bg-green-50/80 active:scale-95"
            style={{ color: viewAllColor, fontFamily: FONT_BODY }}
          >
            View All Product <ChevronRight size={15} className="flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function LatestNewsMarquee() {
  const loopItems = [...HOME_NEWS, ...HOME_NEWS];

  return (
    <section className="py-6 sm:py-8 border-y border-gray-100 bg-gray-50 overflow-hidden relative z-10" aria-labelledby="latest-news-heading">
      <div className={`${CONTAINER} text-center mb-4 sm:mb-5`}>
        <h2
          id="latest-news-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          Latest News
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY})` }} />
          <Leaf size={12} style={{ color: PRIMARY }} />
          <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(90deg, ${PRIMARY}, transparent)` }} />
        </div>
      </div>
      <div className="relative group/marquee">
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-12 lg:w-16 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-12 lg:w-16 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />
        <div className="overflow-hidden">
          <div className="flex gap-3 sm:gap-4 lg:gap-5 w-max animate-news-marquee group-hover/marquee:[animation-play-state:paused]">
            {loopItems.map((item, i) => (
              <figure
                key={`${item.id}-${i}`}
                className="flex-shrink-0 w-[72vw] sm:w-[300px] md:w-[380px] lg:w-[440px] xl:w-[520px] aspect-[16/10] sm:aspect-[3/2] rounded-lg sm:rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ModernServicesGrid({ services, onNavigate }: { services: typeof HOME_SERVICES; onNavigate: (p: Page) => void }) {
  return (
    <section className="py-6 sm:py-8 border-y border-gray-100 relative z-10" style={{ background: "linear-gradient(180deg, #f7faf8 0%, #ffffff 100%)" }}>
      <div className={CONTAINER}>
        <SectionHeading title="Our Services" subtitle="Comprehensive agricultural support — from soil to market" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id] || Sprout;
            return (
              <button
                key={s.id}
                onClick={() => onNavigate(s.page)}
                className="group relative overflow-hidden rounded-2xl text-left h-44 sm:h-48 lg:h-52 border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/25" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Icon size={18} className="text-white" strokeWidth={1.75} />
                </div>
                <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full text-white/90 border border-white/20" style={{ fontFamily: FONT_LABEL, background: "rgba(36,104,65,0.7)" }}>
                  0{i + 1}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: FONT_DISPLAY }}>{s.title}</h3>
                  <p className="text-white/75 text-[10px] sm:text-[11px] mt-1 leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold mt-2.5 text-green-300 group-hover:gap-2 transition-all" style={{ fontFamily: FONT_BODY }}>
                    Explore <ArrowRight size={11} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AutoScrollTestimonials({ items }: { items: typeof TESTIMONIALS }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const tick = () => {
      const cardWidth = 300;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    };
    const interval = setInterval(tick, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "none" }}>
      {items.map(t => (
        <div key={t.name} className="flex-shrink-0 w-[280px] md:w-[300px] bg-white rounded-2xl border p-5 relative overflow-hidden" style={{ borderColor: G[100] }}>
          <Leaf size={48} className="absolute -bottom-2 -right-2 text-green-100 opacity-70" strokeWidth={1} />
          <StarRating rating={t.rating} size={14} />
          <p className="text-sm text-gray-600 mt-3 mb-4 leading-relaxed line-clamp-4">"{t.review}"</p>
          <div className="flex items-center gap-3">
            <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: PRIMARY }} />
            <div>
              <p className="text-sm font-bold text-gray-800">{t.name}</p>
              <p className="text-[11px] text-gray-500 flex items-center gap-1"><MapPin size={9} />{t.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GridProductCard({ product, onAddToCart, onWishlist, onView, wishlisted, compact = false }: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onWishlist: (id: number) => void;
  onView: (p: Product) => void;
  wishlisted: boolean;
  compact?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col h-full relative z-10" style={{ borderColor: G[100] }}>
      <div
        className={`relative overflow-hidden cursor-pointer bg-gray-50 ${compact ? "h-48" : "h-48 sm:h-52"}`}
        onClick={() => onView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-md text-white z-10" style={{ background: "#e53935" }}>-{product.discount}%</span>
        )}
        {product.badge && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: PRIMARY }}>{product.badge}</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); onWishlist(product.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${wishlisted ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500"}`}
        >
          <Heart size={14} className={wishlisted ? "fill-current" : ""} />
        </button>
      </div>
      <div className={`flex flex-col flex-1 ${compact ? "p-3" : "p-4"}`}>
        <h4 className={`font-semibold text-gray-800 leading-snug mb-1.5 line-clamp-2 cursor-pointer hover:text-[#246841] transition-colors ${compact ? "text-xs" : "text-sm"}`} onClick={() => onView(product)}>{product.name}</h4>
        <div className="flex items-center gap-1.5 mb-1.5">
          <StarRating rating={product.rating} size={compact ? 11 : 12} />
          <span className={`text-gray-400 ${compact ? "text-[10px]" : "text-xs"}`}>({product.reviews})</span>
        </div>
        <div className={`flex items-baseline gap-2 ${compact ? "mb-2" : "mb-3"}`}>
          <span className={`font-bold ${compact ? "text-sm" : "text-base"}`} style={{ color: PRIMARY }}>{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className={`text-gray-400 line-through ${compact ? "text-[10px]" : "text-xs"}`}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className={`w-full font-bold rounded-lg text-white transition-all hover:opacity-90 active:scale-[0.98] mt-auto ${compact ? "py-2 text-[11px]" : "py-2.5 text-xs"}`}
          style={{ background: PRIMARY }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const FEATURE_TICKER_ITEMS = [
  { icon: Leaf, label: "100% Organic", sub: "Quality Product" },
  { icon: Shield, label: "Secure Payment", sub: "100% Protected" },
  { icon: Truck, label: "Fast Delivery", sub: "Across India" },
  { icon: Headphones, label: "Expert Support", sub: "24/7 Support" },
] as const;

export function FeatureTicker() {
  const loop = [...FEATURE_TICKER_ITEMS, ...FEATURE_TICKER_ITEMS];

  return (
    <section className="w-full overflow-hidden border-y bg-white relative z-10" style={{ borderColor: G[100] }} aria-label="Store features">
      <div className="flex w-max animate-feature-marquee py-3">
        {loop.map(({ icon: Icon, label, sub }, index) => (
          <div key={`${label}-${index}`} className="flex items-center gap-8 px-8 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: PRIMARY_LIGHT }}>
                <Icon size={18} style={{ color: PRIMARY }} />
              </div>
              <div className="whitespace-nowrap">
                <p className="text-[11px] font-bold text-gray-800">{label}</p>
                <p className="text-[10px] text-gray-500">{sub}</p>
              </div>
            </div>
            <span className="text-gray-200 text-lg select-none" aria-hidden="true">|</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductSection({ title, products, onViewAll, onAddToCart, onWishlist, onView, wishlist }: {
  title: string;
  products: Product[];
  onViewAll: () => void;
  onAddToCart: (p: Product) => void;
  onWishlist: (id: number) => void;
  onView: (p: Product) => void;
  wishlist: number[];
}) {
  const [pageIdx, setPageIdx] = useState(0);
  const perPage = 4;
  const maxPage = Math.max(0, Math.ceil(products.length / perPage) - 1);
  const displayedProducts = products.slice(pageIdx * perPage, (pageIdx + 1) * perPage);

  const prev = () => setPageIdx(p => Math.max(0, p - 1));
  const next = () => setPageIdx(p => Math.min(maxPage, p + 1));

  return (
    <section className={`${CONTAINER} py-6 relative z-10`}>
      <div className="flex items-center justify-between mb-4">
        <SectionHeading title={title} align="left" />
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={prev} 
            disabled={pageIdx === 0} 
            className="p-2 rounded-full border border-gray-200 disabled:opacity-40 transition-opacity hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            type="button"
            onClick={next} 
            disabled={pageIdx === maxPage} 
            className="p-2 rounded-full border border-gray-200 disabled:opacity-40 transition-opacity hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedProducts.map(product => (
          <GridProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onWishlist={onWishlist}
            onView={onView}
            wishlisted={wishlist.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
}