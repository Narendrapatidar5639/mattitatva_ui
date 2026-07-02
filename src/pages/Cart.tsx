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
import { useState, type Dispatch, type SetStateAction } from "react";

interface CartPageActions {
  addToCart: (product: Product, quantity?: number) => void;
  toggleWishlist: (product: Product) => void;
  updateQty: (id: string | number, amount: number) => void;
  removeFromCart: (id: string | number) => void;
  navigate: (path: string) => void;
}

interface CartPageProps extends CartPageActions {
  page: Page;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  wishlist: Product[];
  selectedProduct: Product | null;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  checkoutStep: number;
  setCheckoutStep: Dispatch<SetStateAction<number>>;
  orderPlaced: boolean;
  setOrderPlaced: Dispatch<SetStateAction<boolean>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<string>>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  filterBrand: string;
  setFilterBrand: Dispatch<SetStateAction<string>>;
  cartCount: number;
  cartTotal: number;
}
export function CartPage(props: CartPageProps) {
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
    const [coupon, setCoupon] = useState(""); const [applied, setApplied] = useState(false);
    const disc = applied ? Math.round(cartTotal * 0.1) : 0;
    const delivery = cartTotal > 999 ? 0 : 79;
    const total = cartTotal - disc + delivery;
    return (
      <div className={`${CONTAINER} py-6 md:py-8 w-full`}>
        <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>
          Shopping Cart <span className="text-gray-400 text-lg font-normal">({cartCount})</span>
        </h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart size={56} className="mx-auto mb-4 text-gray-200" />
            <h2 className="text-xl font-bold mb-2 text-gray-700">Your cart is empty</h2>
            <button onClick={() => navigate("products")} className="mt-4 text-white px-6 py-3 rounded-full font-bold text-sm" style={{ background: G[700] }}>Browse Products</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white border rounded-xl p-4 flex gap-4" style={{ borderColor: G[100] }}>
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                    <p className="font-bold text-sm" style={{ color: G[700] }}>₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    <div className="flex items-center gap-1 border rounded-xl overflow-hidden" style={{ borderColor: G[200] }}>
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"><Minus size={11} /></button>
                      <span className="w-7 text-center text-xs font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"><Plus size={11} /></button>
                    </div>
                    <p className="text-xs font-bold text-gray-700">₹{(item.price*item.qty).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-white border rounded-xl p-4" style={{ borderColor: G[100] }}>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Tag size={13} style={{ color: G[700] }} />Coupon</h3>
                <div className="flex gap-2">
                  <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="e.g. MATTI25" className="flex-1 text-xs border rounded-xl px-3 py-2 outline-none" style={{ borderColor: G[200] }} />
                  <button onClick={() => { if (coupon.toUpperCase() === "MATTI25") setApplied(true); }} className="text-white text-xs font-bold px-4 py-2 rounded-xl" style={{ background: G[700] }}>Apply</button>
                </div>
                {applied && <p className="text-[11px] font-bold mt-2" style={{ color: G[600] }}>✓ 10% discount applied!</p>}
              </div>
              <div className="bg-white border rounded-xl p-4" style={{ borderColor: G[100] }}>
                <h3 className="font-semibold text-sm mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                  {disc > 0 && <div className="flex justify-between font-medium" style={{ color: G[600] }}><span>Discount</span><span>-₹{disc}</span></div>}
                  <div className="flex justify-between text-gray-500"><span>Delivery</span><span>{delivery === 0 ? <span style={{ color: G[600] }}>FREE</span> : `₹${delivery}`}</span></div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold" style={{ borderColor: G[50] }}>
                    <span>Total</span><span style={{ color: G[700] }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => { setCheckoutStep(1); navigate("checkout"); }} className="w-full mt-4 py-3 text-white rounded-xl font-bold text-sm" style={{ background: G[700] }}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
