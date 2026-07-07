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
import { ALL_PRODUCTS, BRAND_CATEGORIES, EVENTS, HOME_NEWS, HOME_SERVICES, NEARBY_SHOPS, SERVICE_FORMS, TESTIMONIALS, TRUST_METRICS } from "../data/appData";
import { formatPrice } from "../utils/formatPrice";
import {
  AutoScrollTestimonials,
  FlipkartProductCard,
  GridProductCard,
  HeroCarousel,
  LatestNewsMarquee,
  MobileShopBar,
  ModernServicesGrid,
  PagePattern,
  ProductSection,
  SectionHeading,
  HorizBrandSection,
} from "../components";

export function NearbyShopPage(props: any) {
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
} = props;
  return (
    <div className={`${CONTAINER} py-10`}>
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2" style={{ background: PRIMARY_LIGHT, borderColor: PRIMARY }}>
            <Store size={26} />
          </div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>Nearby Shops</h1>
        <p className="text-sm text-gray-500 mt-1">Find the nearest authorised Matti Tatva dealer</p>
      </div>
      <div className="flex items-center gap-2 rounded-xl border px-4 py-3 mb-6 bg-white shadow-sm" style={{ borderColor: G[200] }}>
        <MapPin size={16} style={{ color: G[600] }} />
        <input placeholder="Enter your city or PIN code…" className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-400" />
        <button className="text-white text-xs font-bold px-4 py-2 rounded-lg" style={{ background: G[700] }}>Search</button>
      </div>
      <div className="rounded-2xl overflow-hidden mb-6 h-52 relative">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&h=400&fit=crop&auto=format" alt="Map" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 px-5 py-3 rounded-xl shadow text-sm font-semibold" style={{ color: G[800] }}>🗺️ Showing 4 nearby stores</div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {NEARBY_SHOPS.map((shop, i) => {
          const shade = [G[600], G[700], G[800], G[900]][i];
          return (
            <div key={shop.name} className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ borderColor: G[100] }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: shade }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{shop.name}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${shop.open ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"}`}>
                      {shop.open ? "● Open Now" : "● Closed"}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold" style={{ color: shade }}>{shop.dist}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1 pl-13">{shop.address}</p>
              <p className="text-xs text-gray-400 mb-3 flex items-center gap-1 pl-1"><Phone size={10} />{shop.phone}</p>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 text-white text-[11px] font-bold rounded-xl" style={{ background: shade }}>Get Directions</button>
                <button className="flex-1 py-1.5 border text-[11px] font-bold rounded-xl" style={{ borderColor: shade, color: shade }}>Call Now</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
