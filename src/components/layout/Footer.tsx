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
import { CONTAINER, FONT_BODY, FONT_DISPLAY, PRIMARY, PRIMARY_DARK } from "../../constants/theme";

export function Footer() {
  return (
    <footer className="mt-8 border-t-4 w-full" style={{ borderColor: PRIMARY, background: PRIMARY_DARK, color: "#ecfdf3" }}>
      <div className={`${CONTAINER} py-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-white/10`}>
        {[
          { icon: Shield, title: "100% Secure Payments", sub: "SSL encrypted checkout" },
          { icon: Award, title: "Certified Products", sub: "ISO & organic certified" },
          { icon: RotateCcw, title: "Easy Returns", sub: "7-day hassle-free policy" },
          { icon: Headphones, title: "Farmer Helpline", sub: "1800-123-4567 (Toll Free)" },
        ].map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10">
              <Icon size={18} className="text-green-200" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-white">{title}</p>
              <p className="text-[10px] text-green-200/80">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`${CONTAINER} py-8 md:py-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 border-b border-white/10`}>
        <div className="flex-shrink-0 text-center md:text-left">
          <div className="inline-flex items-center justify-center p-4 md:p-5 bg-white rounded-2xl shadow-xl">
            <img src={LOGO_SRC} alt="Matti Tatva" className="h-16 md:h-20 w-auto object-contain" />
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <p className="text-sm md:text-base font-bold text-white tracking-wide mb-2" style={{ fontFamily: FONT_BODY }}>MATTI TATVA AGRO INDUSTRIES PVT. LTD.</p>
          <p className="text-sm text-green-100/90 leading-relaxed mb-4" style={{ fontFamily: FONT_BODY }}>
            Empowering Indian farmers with certified organic products, expert guidance and sustainable farming solutions since 2010.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            {["ISO 9001", "Organic Certified", "FSSAI Licensed", "Govt. Approved"].map(badge => (
              <span key={badge} className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-green-50 border border-white/20">{badge}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
            {["UPI", "Visa", "Mastercard", "RuPay", "Net Banking", "COD"].map(pay => (
              <span key={pay} className="text-[10px] font-semibold px-2.5 py-1 border border-white/20 rounded text-green-100 bg-white/5">{pay}</span>
            ))}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 border border-white/15">
              <Star size={11} className="fill-amber-300 text-amber-300" />
              <span className="text-xs font-bold text-white">4.8</span>
              <span className="text-[10px] text-green-100">· 25,000+ farmers</span>
            </div>
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-green-100 hover:bg-white/20 border border-white/15 transition-colors"><Icon size={15} /></button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${CONTAINER} py-6`}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          {[
            { h: "Company", links: ["About Us", "Careers", "Press", "Blog", "Contact Us"] },
            { h: "Products", links: ["Organic Fertilizers", "Seeds", "Pesticides", "Fresh Produce", "Ayurved"] },
            { h: "Services", links: ["Soil Health Card", "Crop Health Card", "Contract Farming", "Get Franchise", "Consultancy"] },
            { h: "Support", links: ["Track Order", "Returns & Refunds", "Shipping Info", "FAQ", "Privacy Policy"] },
          ].map(col => (
            <div key={col.h}>
              <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-white/10" style={{ fontFamily: FONT_DISPLAY }}>{col.h}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}><button className="text-[11px] text-green-100/80 hover:text-white transition-colors text-left">{l}</button></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-white/10 flex items-center gap-1.5" style={{ fontFamily: FONT_DISPLAY }}><Smartphone size={14} /> Download App</h4>
            <div className="space-y-2 mb-4">
              <button className="w-full flex items-center gap-2 bg-black/30 hover:bg-black/40 rounded-lg border border-white/15 px-3 py-2.5 transition-colors">
                <div className="text-left">
                  <p className="text-[8px] text-green-200/60 leading-none">GET IT ON</p>
                  <p className="text-[11px] font-bold text-white">Google Play</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-2 bg-black/30 hover:bg-black/40 rounded-lg border border-white/15 px-3 py-2.5 transition-colors">
                <div className="text-left">
                  <p className="text-[8px] text-green-200/60 leading-none">Download on the</p>
                  <p className="text-[11px] font-bold text-white">App Store</p>
                </div>
              </button>
            </div>
            <div className="p-3 rounded-lg border border-white/20 bg-white/5">
              <p className="text-[10px] font-bold text-green-100 flex items-center gap-1"><Phone size={11} /> Customer Care</p>
              <p className="text-base font-bold mt-1 text-white" style={{ fontFamily: FONT_DISPLAY }}>1800-123-4567</p>
              <p className="text-[9px] text-green-200/70">Mon–Sat, 8 AM – 8 PM</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-green-100/80">© 2024 Matti Tatva Agro Industries Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4 text-[10px] text-green-100/80">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <button key={l} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}