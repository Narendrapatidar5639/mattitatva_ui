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

const PRODUCT_SCROLL_ITEM = "min-w-[220px] flex-shrink-0";

export function AccountPage(props: any) {
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
    const tabs = [
      { id: "dashboard", label: "Dashboard", icon: BarChart2 },
      { id: "orders", label: "My Orders", icon: Package },
      { id: "wishlist", label: "Wishlist", icon: Heart },
      { id: "addresses", label: "Addresses", icon: MapPin },
      { id: "profile", label: "Profile", icon: User },
      { id: "notifications", label: "Notifications", icon: BellIcon },
    ];
    const orders = [
      { id: "#MT2024-8571", date: "15 Nov 2024", items: 3, total: 2499, status: "Delivered", sc: "text-green-700 bg-green-50" },
      { id: "#MT2024-7423", date: "8 Nov 2024", items: 1, total: 1299, status: "Shipped", sc: "text-blue-600 bg-blue-50" },
      { id: "#MT2024-6108", date: "22 Oct 2024", items: 2, total: 899, status: "Processing", sc: "text-orange-600 bg-orange-50" },
    ];
    return (
      <div className={`${CONTAINER} py-6 md:py-8 w-full`}>
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-56 flex-shrink-0">
            <div className="bg-white border rounded-xl overflow-hidden" style={{ borderColor: G[100] }}>
              <div className="p-4 text-white text-center" style={{ background: `linear-gradient(135deg, ${G[950]}, ${G[700]})` }}>
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User size={26} className="text-white" />
                </div>
                <p className="font-bold text-sm">Ramesh Patil</p>
                <p className="text-[11px]" style={{ color: G[200] }}>ramesh@example.com</p>
              </div>
              <nav className="p-2">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left"
                    style={activeTab === t.id ? { background: G[50], color: G[800] } : { color: "#4b5563" }}>
                    <t.icon size={14} style={activeTab === t.id ? { color: G[700] } : {}} />{t.label}
                  </button>
                ))}
               
<button 
  onClick={() => {
    // 1. Clear both user and admin cookies/tokens from storage completely
    sessionStorage.clear();
    localStorage.clear(); // Hamein matti_token, maati_user_auth, sab udaana hai

    // 2. Redirect completely to login or home with a hard refresh
    window.location.href = "/login";
  }}
  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left mt-1"
>
  <LogOut size={14} />Logout
</button>
              </nav>
            </div>
          </aside>
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>Welcome back, Ramesh!</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[{ label: "Total Orders", value: "12", icon: Package, shade: G[600] },
                    { label: "Wishlist", value: String(wishlist.length), icon: Heart, shade: "#ef4444" },
                    { label: "Cart Items", value: String(cartCount), icon: ShoppingCart, shade: G[700] },
                    { label: "Rewards", value: "850 pts", icon: Award, shade: G[900] }].map(card => (
                    <div key={card.label} className="bg-white border rounded-xl p-4" style={{ borderColor: G[100] }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 text-white" style={{ background: card.shade }}><card.icon size={16} /></div>
                      <p className="text-xl font-bold text-gray-800">{card.value}</p>
                      <p className="text-xs text-gray-400">{card.label}</p>
                    </div>
                  ))}
                </div>
                <h3 className="font-semibold text-sm mb-3 text-gray-600">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.map(o => (
                    <div key={o.id} className="bg-white border rounded-xl p-4 flex items-center gap-4" style={{ borderColor: G[100] }}>
                      <Package size={18} className="text-gray-400 flex-shrink-0" />
                      <div className="flex-1"><p className="text-sm font-semibold text-gray-800">{o.id}</p><p className="text-[11px] text-gray-400">{o.date}</p></div>
                      <span className="font-bold text-sm">₹{o.total.toLocaleString()}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${o.sc}`}>{o.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>My Orders</h2>
                <div className="space-y-4">
                  {orders.map(o => (
                    <div key={o.id} className="bg-white border rounded-xl p-4" style={{ borderColor: G[100] }}>
                      <div className="flex items-center justify-between mb-3">
                        <div><p className="font-semibold text-sm">{o.id}</p><p className="text-[11px] text-gray-400">{o.date}</p></div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${o.sc}`}>{o.status}</span>
                      </div>
                      <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-3" style={{ scrollbarWidth: "none" }}>
                        {["Ordered","Packed","Shipped","Out for Delivery","Delivered"].map((stage, i) => {
                          const passed = o.status === "Delivered" || (o.status === "Shipped" && i < 3) || i < 2;
                          return (
                            <div key={stage} className="flex items-center gap-0.5 flex-shrink-0">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: passed ? G[700] : "#e5e7eb" }}>
                                <CheckCircle size={11} className={passed ? "text-white" : "text-gray-400"} />
                              </div>
                              <span className="text-[8px] font-medium" style={{ color: passed ? G[700] : "#9ca3af" }}>{stage}</span>
                              {i < 4 && <div className="w-3 h-0.5" style={{ background: passed ? G[700] : "#e5e7eb" }} />}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 border text-xs font-bold rounded-xl" style={{ borderColor: G[200], color: G[700] }}>Download Invoice</button>
                        {o.status !== "Delivered" && <button className="px-3 py-1.5 border border-red-200 text-red-500 text-xs font-bold rounded-xl">Cancel</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>My Wishlist</h2>
                {wishlist.length === 0
                  ? <div className="text-center py-12"><Heart size={44} className="mx-auto mb-3 text-gray-200" /><p className="text-gray-400 text-sm">Empty</p><button onClick={() => navigate("products")} className="mt-4 text-white px-6 py-2.5 rounded-full text-sm font-bold" style={{ background: G[700] }}>Browse</button></div>
                  : <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory w-full" style={{ scrollbarWidth: "none" }}>{ALL_PRODUCTS.filter(p => wishlist.includes(p.id)).map(p => (
                    <div key={p.id} className={PRODUCT_SCROLL_ITEM}>
                      <FlipkartProductCard product={p} onAddToCart={addToCart} onWishlist={toggleWishlist} onView={prod => navigate("product-detail", prod)} wishlisted={true} large />
                    </div>
                  ))}</div>
                }
              </div>
            )}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>Profile Settings</h2>
                <div className="bg-white border rounded-xl p-6 max-w-lg" style={{ borderColor: G[100] }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[["First Name","Ramesh"],["Last Name","Patil"],["Email","ramesh@example.com"],["Phone","+91 98765 43210"],["City","Nashik"],["State","Maharashtra"]].map(([l,v]) => (
                      <div key={l}><label className="text-xs font-medium text-gray-400 mb-1 block">{l}</label><input defaultValue={v} className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400 transition-colors" style={{ borderColor: G[200] }} /></div>
                    ))}
                  </div>
                  <button className="mt-6 text-white px-6 py-2.5 rounded-xl font-bold text-sm" style={{ background: G[700] }}>Save Changes</button>
                </div>
              </div>
            )}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>Notifications</h2>
                <div className="space-y-3">
                  {[{ title: "Order Shipped!", desc: "Order #MT2024-7423 shipped", time: "2 hours ago", unread: true },
                    { title: "Special Offer", desc: "30% off on fertilizers this weekend", time: "1 day ago", unread: true },
                    { title: "Order Delivered", desc: "Order #MT2024-8571 delivered", time: "3 days ago", unread: false }].map((n, i) => (
                    <div key={i} className="p-4 rounded-xl border flex gap-3" style={{ background: n.unread ? G[50] : "white", borderColor: n.unread ? G[200] : G[100] }}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.unread ? G[600] : "#d1d5db" }} />
                      <div><p className="text-sm font-semibold text-gray-800">{n.title}</p><p className="text-xs text-gray-500">{n.desc}</p><p className="text-[10px] text-gray-400 mt-1">{n.time}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>Addresses</h2>
                  <button className="text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1" style={{ background: G[700] }}><Plus size={12} />Add</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[{ type: "Home", addr: "123 Farm Road, Nashik, MH 422001", phone: "+91 98765 43210" }, { type: "Farm", addr: "Survey No. 45, Dindori, Nashik, MH 422202", phone: "+91 87654 32109" }].map((a, i) => (
                    <div key={a.type} className="bg-white border rounded-xl p-4" style={{ borderColor: G[100] }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ background: G[100], color: G[800] }}>{a.type}</span>
                        <div className="flex gap-3 text-xs font-bold"><button style={{ color: G[700] }}>Edit</button><button className="text-red-500">Delete</button></div>
                      </div>
                      <p className="text-sm text-gray-600">{a.addr}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Phone size={10} />{a.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
