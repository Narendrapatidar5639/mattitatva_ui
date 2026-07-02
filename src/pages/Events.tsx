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
  HorizBrandSection,
} from "../components";

export function EventsPage(props: any) {
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
    <div className={`${CONTAINER} py-8 md:py-10 w-full`}>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>Upcoming Events</h1>
        <p className="text-sm text-gray-400 mt-1">Connect with farmers, experts and agri-innovators</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...EVENTS, { id: 4, title: "Kisan Credit Camp", date: "18 Jan 2025", location: "Kolhapur, MH", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&auto=format", desc: "Learn about Kisan Credit Card and government subsidies." }, { id: 5, title: "Agri-Tech Expo", date: "2 Feb 2025", location: "Mumbai, MH", image: "https://images.unsplash.com/photo-1535912260-6a4fad1ca0d8?w=600&h=400&fit=crop&auto=format", desc: "Latest agri technology showcase and machinery demo." }]
          .map((ev, i) => {
            const shade = [G[600], G[700], G[800], G[900], G[950]][i % 5];
            return (
              <div key={ev.id} className="bg-white rounded-xl overflow-hidden border group hover:shadow-md transition-shadow" style={{ borderColor: G[100] }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ background: shade }}>{ev.date}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 text-gray-800">{ev.title}</h3>
                  <p className="text-[11px] text-gray-400 mb-2 flex items-center gap-1"><MapPin size={10} />{ev.location}</p>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{ev.desc}</p>
                  <button className="w-full py-2.5 text-white text-xs font-bold rounded-xl" style={{ background: shade }}>Register for Free</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
