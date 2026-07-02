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

export function CheckoutPage(props: any) {
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
    const steps = ["Address","Shipping","Payment","Confirm"];
    const total = cartItems.reduce((s: number, i: CartItem) => s + i.price * i.qty, 0);
    if (orderPlaced) return (
      <div className={`${CONTAINER} py-12 md:py-16 text-center w-full`}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: G[100] }}>
          <CheckCircle size={40} style={{ color: G[700] }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-8">Order <strong>#MT2024-8571</strong> confirmed. Delivery in 3–5 days.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { navigate("account"); setOrderPlaced(false); setActiveTab("orders"); }} className="px-5 py-2.5 border-2 rounded-full text-sm font-bold" style={{ borderColor: G[700], color: G[700] }}>Track Order</button>
          <button onClick={() => { navigate("home"); setOrderPlaced(false); setCartItems([]); }} className="px-5 py-2.5 text-white rounded-full text-sm font-bold" style={{ background: G[700] }}>Continue Shopping</button>
        </div>
      </div>
    );
    return (
      <div className={`${CONTAINER} py-6 md:py-8 w-full`}>
        <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>Checkout</h1>
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
                  style={checkoutStep > i+1 ? { background: G[700], borderColor: G[700], color: "white" } : checkoutStep === i+1 ? { borderColor: G[700], color: G[700], background: "white" } : { borderColor: "#e5e7eb", color: "#d1d5db", background: "white" }}>
                  {checkoutStep > i+1 ? <CheckCircle size={13} /> : i+1}
                </div>
                <span className="text-[10px] mt-1 font-medium" style={{ color: checkoutStep === i+1 ? G[700] : "#9ca3af" }}>{s}</span>
              </div>
              {i < steps.length-1 && <div className="w-16 md:w-24 h-0.5 mb-4 mx-1" style={{ background: checkoutStep > i+1 ? G[700] : "#e5e7eb" }} />}
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {checkoutStep === 1 && (
              <div className="bg-white border rounded-xl p-6" style={{ borderColor: G[100] }}>
                <h2 className="font-semibold mb-4" style={{ color: G[800] }}>Delivery Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Full Name","Phone","Address Line 1","Address Line 2","City","PIN Code"].map(label => (
                    <div key={label} className={label.includes("Address") ? "sm:col-span-2" : ""}>
                      <label className="text-xs font-medium text-gray-400 mb-1 block">{label}</label>
                      <input placeholder={`Enter ${label}`} className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 transition-colors" style={{ borderColor: G[200] }} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setCheckoutStep(2)} className="mt-6 text-white px-8 py-3 rounded-xl font-bold text-sm" style={{ background: G[700] }}>Continue</button>
              </div>
            )}
            {checkoutStep === 2 && (
              <div className="bg-white border rounded-xl p-6" style={{ borderColor: G[100] }}>
                <h2 className="font-semibold mb-4" style={{ color: G[800] }}>Shipping Method</h2>
                <div className="space-y-3">
                  {[["Standard","3-5 days","FREE",true],["Express","1-2 days","₹149",false],["Same Day","Today","₹299",false]].map(([n,t,p,sel]) => (
                    <label key={n as string} className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer" style={sel ? { borderColor: G[700], background: G[50] } : { borderColor: "#e5e7eb" }}>
                      <input type="radio" name="ship" defaultChecked={sel as boolean} className="accent-green-700" />
                      <div className="flex-1"><p className="text-sm font-semibold">{n}</p><p className="text-xs text-gray-400">{t}</p></div>
                      <span className="text-sm font-bold" style={sel ? { color: G[700] } : {}}>{p}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setCheckoutStep(1)} className="px-6 py-3 border rounded-xl text-sm font-bold" style={{ borderColor: G[200] }}>Back</button>
                  <button onClick={() => setCheckoutStep(3)} className="flex-1 text-white py-3 rounded-xl font-bold text-sm" style={{ background: G[700] }}>Continue</button>
                </div>
              </div>
            )}
            {checkoutStep === 3 && (
              <div className="bg-white border rounded-xl p-6" style={{ borderColor: G[100] }}>
                <h2 className="font-semibold mb-4" style={{ color: G[800] }}>Payment Method</h2>
                <div className="space-y-3">
                  {[["UPI / Google Pay","Instant payment"],["Debit / Credit Card","Visa, Mastercard, RuPay"],["Net Banking","All major banks"],["Cash on Delivery","Pay on delivery"]].map(([n,d]) => (
                    <label key={n} className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer hover:border-green-400 transition-colors" style={{ borderColor: "#e5e7eb" }}>
                      <input type="radio" name="pay" className="accent-green-700" />
                      <div><p className="text-sm font-semibold">{n}</p><p className="text-xs text-gray-400">{d}</p></div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setCheckoutStep(2)} className="px-6 py-3 border rounded-xl text-sm font-bold" style={{ borderColor: G[200] }}>Back</button>
                  <button onClick={() => setCheckoutStep(4)} className="flex-1 text-white py-3 rounded-xl font-bold text-sm" style={{ background: G[700] }}>Review Order</button>
                </div>
              </div>
            )}
            {checkoutStep === 4 && (
              <div className="bg-white border rounded-xl p-6" style={{ borderColor: G[100] }}>
                <h2 className="font-semibold mb-4" style={{ color: G[800] }}>Review Order</h2>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item: CartItem) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1"><p className="text-sm font-medium line-clamp-1">{item.name}</p><p className="text-xs text-gray-400">Qty: {item.qty}</p></div>
                      <p className="font-bold text-sm">₹{(item.price*item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setCheckoutStep(3)} className="px-6 py-3 border rounded-xl text-sm font-bold" style={{ borderColor: G[200] }}>Back</button>
                  <button onClick={() => setOrderPlaced(true)} className="flex-1 text-white py-3 rounded-xl font-bold text-sm" style={{ background: G[700] }}>Place Order ₹{total.toLocaleString()}</button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white border rounded-xl p-4 h-fit" style={{ borderColor: G[100] }}>
            <h3 className="font-semibold text-sm mb-3">Summary</h3>
            <div className="space-y-1 text-sm border-t pt-3" style={{ borderColor: G[50] }}>
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>Delivery</span><span style={{ color: G[600] }}>FREE</span></div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold" style={{ borderColor: G[50] }}><span>Total</span><span style={{ color: G[700] }}>₹{total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
}
