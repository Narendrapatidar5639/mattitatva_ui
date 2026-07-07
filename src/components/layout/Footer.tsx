import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronRight, ChevronLeft, Star,
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Truck,
  Shield, RotateCcw, Headphones, Plus, Minus, Trash2, Tag, Package,
  CheckCircle, Filter, Grid, List, Eye, Calendar, Clock, ArrowRight,
  Leaf, Home, LayoutGrid, LogOut, CreditCard, Bell as BellIcon,
  Award, BarChart2, Stethoscope, Sprout, Apple, FlaskConical, Smartphone,
  Linkedin, Users, Store, Percent, Handshake, FileText, Droplets, Wheat, Bug, Cog
} from "lucide-react";

import { LOGO_SRC } from "../../constants/branding";
import { CONTAINER, FONT_BODY, FONT_DISPLAY, PRIMARY } from "../../constants/theme";

export function Footer() {
  return (
    <footer className="mt-6 border-t-4 w-full" style={{ borderColor: PRIMARY, background: "#774936", color: "#fbf8f6" }}>
      {/* Trust Badges Bar (Height Compressed) */}
      <div className={`${CONTAINER} py-3.5 grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-white/10`}>
        {[
          { icon: Shield, title: "100% Secure Payments", sub: "SSL encrypted checkout" },
          { icon: Award, title: "Certified Products", sub: "ISO & organic certified" },
          { icon: RotateCcw, title: "Easy Returns", sub: "7-day hassle-free policy" },
          { icon: Headphones, title: "Farmer Helpline", sub: "1800-123-4567" },
        ].map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10">
              <Icon size={15} className="text-amber-100" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">{title}</p>
              <p className="text-[9px] text-amber-100/60 leading-none mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Branding Section (Merged Spacing) */}
      <div className={`${CONTAINER} py-5 flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-8 border-b border-white/10`}>
        <div className="flex-shrink-0">
          <div className="inline-flex items-center justify-center p-2.5 bg-white rounded-xl shadow-md">
            <img src={LOGO_SRC} alt="Matti Tatva" className="h-12 w-auto object-contain" />
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1.5">
            <p className="text-xs md:text-sm font-bold text-white tracking-wide" style={{ fontFamily: FONT_BODY }}>MATTI TATVA AGRO INDUSTRIES PVT. LTD.</p>
            <div className="flex justify-center gap-1.5">
              {["ISO 9001", "Organic Certified"].map(badge => (
                <span key={badge} className="text-[8px] font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">{badge}</span>
              ))}
            </div>
          </div>
          <p className="text-xs text-amber-50/80 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_BODY }}>
            Empowering Indian farmers with certified organic products, expert guidance and sustainable farming solutions since 2010.
          </p>
        </div>
        
        {/* Rating and Social Icons (Aligned horizontally to save vertical space) */}
        <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 border border-white/10">
            <Star size={11} className="fill-amber-300 text-amber-300" />
            <span className="text-xs font-bold text-white">4.8</span>
            <span className="text-[9px] text-amber-100/70">· 25k+ farmers</span>
          </div>
          <div className="flex gap-1.5">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <button key={i} className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 text-amber-50 hover:bg-white/20 border border-white/10 transition-colors"><Icon size={13} /></button>
            ))}
          </div>
        </div>
      </div>

      {/* Links & Newsletter Grid Block (高度を抑えた構造) */}
      <div className={`${CONTAINER} py-5`}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 items-start">
          
          {/* Links Columns */}
          {[
            { h: "Company", links: ["About Us", "Careers", "Blog", "Contact Us"] },
            { h: "Products", links: ["Fertilizers", "Seeds", "Pesticides", "Ayurved"] },
            { h: "Services", links: ["Soil Health", "Crop Health", "Franchise", "Consultancy"] },
            { h: "Support", links: ["Track Order", "Returns", "Shipping Info", "FAQ"] },
          ].map(col => (
            <div key={col.h} className="col-span-1">
              <h4 className="text-xs font-bold text-white mb-2 pb-1 border-b border-white/10" style={{ fontFamily: FONT_DISPLAY }}>{col.h}</h4>
              <ul className="space-y-1.5">
                {col.links.map(l => (
                  <li key={l}><button className="text-[11px] text-amber-100/70 hover:text-white transition-colors text-left leading-none">{l}</button></li>
                ))}
              </ul>
            </div>
          ))}

          {/* Right Side Compressed Box (Newsletter + App Compact Layout) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col gap-3">
            
            {/* Newsletter Box */}
            <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex-1">
              <h4 className="text-xs font-bold text-white mb-0.5" style={{ fontFamily: FONT_DISPLAY }}>Newsletter</h4>
              <p className="text-[9px] text-amber-100/60 mb-2 leading-none">Farming tips & seasonal offers.</p>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 text-[11px] px-2.5 py-1.5 rounded bg-white/10 text-white placeholder:text-amber-100/40 border border-white/10 outline-none focus:border-white/20"
                />
                <button
                  type="button"
                  className="px-2.5 py-1.5 text-[10px] font-bold rounded text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ background: PRIMARY }}
                >
                  Join
                </button>
              </div>
            </div>

            {/* App Downloads & Call Support Component */}
            <div className="flex-1 flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between gap-1.5 p-2 rounded-lg border border-white/10 bg-white/5">
                <div className="flex items-center gap-1 text-[10px] text-white font-medium">
                  <Smartphone size={12} className="text-amber-100" />
                  <span>Our App:</span>
                </div>
                <div className="flex gap-1">
                  <button className="text-[9px] font-bold bg-black/20 hover:bg-black/30 border border-white/10 px-1.5 py-0.5 rounded text-white">Play</button>
                  <button className="text-[9px] font-bold bg-black/20 hover:bg-black/30 border border-white/10 px-1.5 py-0.5 rounded text-white">iOS</button>
                </div>
              </div>

              <div className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between gap-2">
                <p className="text-[9px] font-bold text-amber-50 flex items-center gap-1"><Phone size={10} /> Call Support</p>
                <p className="text-xs font-black text-white" style={{ fontFamily: FONT_DISPLAY }}>1800-123-4567</p>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Payment Gateways Block */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {["UPI", "Visa", "Mastercard", "RuPay", "COD"].map(pay => (
              <span key={pay} className="text-[9px] font-medium px-2 py-0.5 border border-white/10 rounded text-amber-100 bg-white/5">{pay}</span>
            ))}
          </div>
          <div className="flex gap-3 text-[9px] text-amber-100/60">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <button key={l} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>

        {/* Copyright Footer Sub-Line */}
        <div className="pt-2 mt-2 border-t border-white/5 text-center sm:text-left">
          <p className="text-[9px] text-amber-100/40">© 2026 Matti Tatva Agro Industries Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}