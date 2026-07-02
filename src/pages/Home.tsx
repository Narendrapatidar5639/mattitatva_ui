import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronRight, ChevronLeft, Star,
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Truck,
  Shield, RotateCcw, Headphones, Plus, Minus, Trash2, Tag, Package,
  CheckCircle, Filter, Grid, List, Eye, Calendar, Clock, ArrowRight,
  Leaf, Home, LayoutGrid, LogOut, CreditCard, Bell as BellIcon,
  Award, BarChart2, Stethoscope, Sprout, Apple, FlaskConical, Smartphone,
  Linkedin, Users, Store, Percent, Handshake, FileText, Droplets, Wheat, Bug, Cog
} from "lucide-react";
import type { Page, Product, CartItem } from "../types";
import { CONTAINER, FONT_BODY, FONT_DISPLAY, FONT_LABEL, G, PAGE_BG, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT } from "../constants/theme";
import { ALL_PRODUCTS, BRAND_CATEGORIES, EVENTS, HOME_EVENTS, HOME_NEWS, HOME_SERVICES, NEARBY_SHOPS, SERVICE_FORMS, TESTIMONIALS, TRUST_METRICS } from "../data/appData";
import { formatPrice } from "../utils/formatPrice";
import {
  AutoScrollTestimonials,
  FlipkartProductCard,
  GridProductCard,
  HeroCarousel,
  HomeEventsSection,
  LatestNewsMarquee,
  MobileShopBar,
  ModernServicesGrid,
  PagePattern,
  ProductSection,
  SectionHeading,
  FeatureTicker,
  HorizBrandSection,
} from "../components";

export function HomePage(props: any) {
  const {
  page,
  cartItems,
  setCartItems,
  wishlist,
  selectedProduct,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  checkoutStep,
  setCheckoutStep,
  orderPlaced,
  setOrderPlaced,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  filterBrand,
  setFilterBrand,
  cartCount,
  cartTotal,
  addToCart,
  toggleWishlist,
  updateQty,
  removeFromCart,
  navigate,
  products = ALL_PRODUCTS,
} = props;

  const brandProducts = (brandId: string, staticProducts: Product[]) => {
    const fromApi = products.filter(p => p.brand === brandId);
    if (fromApi.length === 0) return staticProducts;
    const apiIds = new Set(fromApi.map(p => p.id));
    const extras = staticProducts.filter(p => !apiIds.has(p.id));
    return [...fromApi, ...extras].slice(0, 5);
  };

  return (
    <PagePattern>
      <MobileShopBar
        activeId={filterBrand}
        onSelect={id => { setFilterBrand(id); navigate("products"); }}
      />
      <HeroCarousel onShop={() => navigate("products")} onServices={() => navigate("services")} />
      <FeatureTicker />

      {/* Brand product grids */}
      <div>
        {[
          { brandId: "doctor", title: "Dr Recommended", emoji: "🩺" },
          { brandId: "ayurved", title: "Ayurved Maatitatva", emoji: "🌱" },
          { brandId: "maatifresh", title: "Maatifresh", emoji: "🥦" },
          { brandId: "organic", title: "Organic Maatitatva", emoji: "🌿" },
        ].map(({ brandId, title, emoji }, idx) => {
          const brand = BRAND_CATEGORIES.find(b => b.id === brandId)!;
          return (
            <HorizBrandSection
              key={brandId}
              index={idx}
              title={title}
              emoji={emoji}
              tagline={brand.tagline}
              accent={brand.accent}
              products={brandProducts(brandId, brand.products)}
              onViewAll={() => { setFilterBrand(brandId); navigate("products"); }}
              onAddToCart={addToCart}
              onWishlist={toggleWishlist}
              onView={p => navigate("product-detail", p)}
              wishlist={wishlist}
            />
          );
        })}
      </div>

      <ModernServicesGrid services={HOME_SERVICES} onNavigate={p => navigate(p)} />

      <LatestNewsMarquee />

      <HomeEventsSection events={HOME_EVENTS} onViewAll={() => navigate("events")} />

      {/* Testimonials */}
      <section className={`${CONTAINER} py-6`}>
        <SectionHeading title="What Our Customers Say" subtitle="Trusted by farmers across Maharashtra and beyond" />
        <AutoScrollTestimonials items={TESTIMONIALS} />
      </section>

      {/* Trust Badges & Newsletter */}
      <section className={`${CONTAINER} py-6 pb-10`}>
        <div className="grid lg:grid-cols-2 gap-4 items-stretch">
          <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: FONT_DISPLAY }}>Trusted By Thousands Of Farmers</h2>
            <p className="text-sm text-gray-500 mb-6">Building India's most trusted agriculture brand</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {TRUST_METRICS.map(m => (
                <div key={m.label} className="text-center p-3 rounded-xl" style={{ background: PRIMARY_LIGHT }}>
                  <m.icon size={20} className="mx-auto mb-2" style={{ color: PRIMARY }} strokeWidth={1.5} />
                  <p className="text-lg font-bold" style={{ color: PRIMARY }}>{m.value}</p>
                  <p className="text-[10px] text-gray-600 leading-tight mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-4 md:p-6 relative overflow-hidden flex flex-col justify-center rounded-xl shadow-sm">
            <Sprout size={120} className="absolute -bottom-6 -right-6 text-green-100 opacity-50" strokeWidth={1} />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 relative z-10" style={{ fontFamily: FONT_DISPLAY }}>Subscribe to Our Newsletter</h2>
            <p className="text-sm text-gray-500 mb-5 relative z-10">Get farming tips, seasonal offers & product updates delivered to your inbox.</p>
            <div className="flex gap-2 relative z-10">
              <input type="email" placeholder="Enter your email address" className="flex-1 border rounded-full px-4 py-3 text-sm outline-none focus:border-green-400" style={{ borderColor: G[200] }} />
              <button className="px-6 py-3 rounded-full text-sm font-bold text-white flex-shrink-0 hover:opacity-90" style={{ background: PRIMARY }}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </PagePattern>
  );
}
