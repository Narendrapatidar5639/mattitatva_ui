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

export const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=700&fit=crop&auto=format",
    tag: "Premium Organic Agriculture",
    title: "Nurturing Soil,\nEmpowering Farmers",
    subtitle: "Certified organic fertilizers, hybrid seeds & expert farming solutions across India.",
  },
  {
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=700&fit=crop&auto=format",
    tag: "Farm Fresh Quality",
    title: "Pure Organic\nProducts",
    subtitle: "100% authentic agri-inputs trusted by 25,000+ farmers nationwide.",
  },
  {
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600&h=700&fit=crop&auto=format",
    tag: "Smart Farming",
    title: "Grow More,\nEarn More",
    subtitle: "Doctor recommended crop care, soil health cards & contract farming support.",
  },
  {
    image: "https://images.unsplash.com/photo-1592982537447-6c4d0f012f90?w=1600&h=700&fit=crop&auto=format",
    tag: "Pan India Delivery",
    title: "Delivered To\nYour Farm Gate",
    subtitle: "Fast shipping on seeds, fertilizers, pesticides & fresh produce.",
  },
];

export const BRAND_SHOP_CATEGORIES = [
  { id: "doctor", name: "Doctor Maatitatva", logo: "🩺" },
  { id: "organic", name: "Organic Maatitatva", logo: "🌿" },
  { id: "maatifresh", name: "Maatifresh", logo: "🥦" },
  { id: "ayurved", name: "Ayurved Maatitatva", logo: "🌱" },
];

const CONTAINER = "w-full px-3 sm:px-5 lg:px-8 xl:px-12";
const PRODUCT_SCROLL_ITEM = "flex-shrink-0 w-[78vw] sm:w-[46vw] md:w-[34vw] lg:w-[24%] xl:w-[22%] min-w-[260px] lg:min-w-[300px] xl:min-w-[320px] max-w-[400px] snap-start";
const FONT_DISPLAY = "'Cormorant Garamond', 'Playfair Display', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LABEL = "'DM Mono', monospace";

export const HOME_SERVICES: { id: string; title: string; desc: string; image: string; page: Page }[] = [
  { id: "soil-health", title: "Soil Health Card", desc: "NPK testing & personalised soil plans", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&auto=format", page: "soil-health" },
  { id: "crop-health", title: "Crop Health Card", desc: "Expert pest & disease diagnosis", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop&auto=format", page: "crop-health" },
  { id: "nearby", title: "Nearby Shop", desc: "Find authorised dealers near you", image: "https://images.unsplash.com/photo-1604719312566-8912a922856c?w=600&h=400&fit=crop&auto=format", page: "nearby" },
  { id: "franchise", title: "Get Franchise", desc: "Partner & grow with Matti Tatva", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format", page: "franchise" },
  { id: "contract-farming", title: "Contract Farming", desc: "Assured buy-back & farm support", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop&auto=format", page: "contract-farming" },
];

export const SERVICE_ICONS: Record<string, typeof Droplets> = {
  "soil-health": Droplets,
  "crop-health": Wheat,
  "nearby": Store,
  franchise: Handshake,
  "contract-farming": FileText,
};

export const SERVICE_FORMS: Record<string, {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  fields: { label: string; type: string; placeholder: string; span?: number }[];
  submitLabel: string;
}> = {
  "soil-health": {
    title: "Soil Health Card",
    subtitle: "Get a complete soil analysis for your farm",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&h=500&fit=crop&auto=format",
    description: "Fill in your details and our agronomists will visit your farm for NPK testing, pH analysis and a personalised soil improvement plan.",
    fields: [
      { label: "Full Name", type: "text", placeholder: "Enter your full name" },
      { label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
      { label: "Email", type: "email", placeholder: "your@email.com" },
      { label: "Village / City", type: "text", placeholder: "Nashik, Maharashtra" },
      { label: "Land Area (acres)", type: "text", placeholder: "e.g. 5 acres" },
      { label: "Current Crop", type: "text", placeholder: "Tomato, Onion, etc." },
      { label: "Additional Details", type: "textarea", placeholder: "Any specific soil concerns…", span: 2 },
    ],
    submitLabel: "Request Soil Health Card",
  },
  "crop-health": {
    title: "Crop Health Card",
    subtitle: "Expert crop disease & pest diagnosis",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&h=500&fit=crop&auto=format",
    description: "Share your crop details and our experts will diagnose pest, disease or nutrient issues and recommend the right Matti Tatva solutions.",
    fields: [
      { label: "Full Name", type: "text", placeholder: "Enter your full name" },
      { label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
      { label: "Email", type: "email", placeholder: "your@email.com" },
      { label: "Village / City", type: "text", placeholder: "Pune, Maharashtra" },
      { label: "Crop Name", type: "text", placeholder: "e.g. Cotton, Grapes" },
      { label: "Problem Description", type: "textarea", placeholder: "Describe symptoms, affected area…", span: 2 },
    ],
    submitLabel: "Request Crop Health Card",
  },
  franchise: {
    title: "Get Franchise",
    subtitle: "Partner with Matti Tatva Agro Industries",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=500&fit=crop&auto=format",
    description: "Interested in opening a Matti Tatva authorised store? Submit your details and our franchise team will contact you with investment plans and support packages.",
    fields: [
      { label: "Full Name", type: "text", placeholder: "Enter your full name" },
      { label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
      { label: "Email", type: "email", placeholder: "your@email.com" },
      { label: "Preferred Location", type: "text", placeholder: "City / District" },
      { label: "Investment Budget", type: "text", placeholder: "e.g. ₹5–10 Lakhs" },
      { label: "Business Experience", type: "textarea", placeholder: "Tell us about your background…", span: 2 },
    ],
    submitLabel: "Apply for Franchise",
  },
  "contract-farming": {
    title: "Contract Farming",
    subtitle: "Grow with guaranteed buy-back support",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&h=500&fit=crop&auto=format",
    description: "Register for our contract farming programme — we provide seeds, inputs, technical guidance and assured market linkage for your produce.",
    fields: [
      { label: "Full Name", type: "text", placeholder: "Enter your full name" },
      { label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
      { label: "Email", type: "email", placeholder: "your@email.com" },
      { label: "Farm Location", type: "text", placeholder: "Village, District, State" },
      { label: "Land Area (acres)", type: "text", placeholder: "e.g. 10 acres" },
      { label: "Crop Interest", type: "text", placeholder: "Vegetables, Pulses, etc." },
      { label: "Message", type: "textarea", placeholder: "Any questions or requirements…", span: 2 },
    ],
    submitLabel: "Register for Contract Farming",
  },
};

export const TRUST_METRICS = [
  { value: "25K+", label: "Happy Customers", icon: Users },
  { value: "1500+", label: "Quality Products", icon: Package },
  { value: "500+", label: "Expert Farmers", icon: Sprout },
  { value: "50+", label: "Offline Stores", icon: Store },
  { value: "98%", label: "Customer Satisfaction", icon: Percent },
];

// ─── Brand Categories ─────────────────────────────────────────────────────────
export const BRAND_CATEGORIES = [
  {
    id: "doctor",
    name: "Doctor Maatitatva",
    tagline: "Plant Health Solutions",
    icon: Stethoscope,
    accent: "#16a34a",
    logo: "🩺",
    products: [
      { id: 101, name: "Fungicide Shield 500ml", brand: "doctor", price: 349, originalPrice: 449, discount: 22, rating: 4.6, reviews: 84, image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=400&fit=crop&auto=format", badge: "Bestseller", inStock: true },
      { id: 102, name: "Bio Insecticide Spray 1L", brand: "doctor", price: 499, originalPrice: 649, discount: 23, rating: 4.4, reviews: 61, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&auto=format", inStock: true },
      { id: 103, name: "Neem Pesticide 250ml", brand: "doctor", price: 199, originalPrice: 279, discount: 29, rating: 4.7, reviews: 112, image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=400&h=400&fit=crop&auto=format", badge: "New", inStock: true },
      { id: 104, name: "Root Booster Capsules", brand: "doctor", price: 279, originalPrice: 349, discount: 20, rating: 4.5, reviews: 55, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop&auto=format", inStock: true },
      { id: 105, name: "Wilt Guard Treatment", brand: "doctor", price: 599, originalPrice: 749, discount: 20, rating: 4.3, reviews: 39, image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop&auto=format", inStock: true },
    ],
  },
  {
    id: "organic",
    name: "Organic Maatitatva",
    tagline: "Pure & Certified Organic",
    icon: Leaf,
    accent: "#15803d",
    logo: "🌿",
    products: [
      { id: 201, name: "Vermicompost 25kg", brand: "organic", price: 799, originalPrice: 999, discount: 20, rating: 4.8, reviews: 198, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&auto=format", badge: "Top Rated", inStock: true },
      { id: 202, name: "Organic NPK 50kg", brand: "organic", price: 1299, originalPrice: 1599, discount: 19, rating: 4.6, reviews: 134, image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=400&h=400&fit=crop&auto=format", badge: "Bestseller", inStock: true },
      { id: 203, name: "Cow Dung Manure 40kg", brand: "organic", price: 449, originalPrice: 549, discount: 18, rating: 4.5, reviews: 89, image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop&auto=format", inStock: true },
      { id: 204, name: "Seaweed Extract 500ml", brand: "organic", price: 349, originalPrice: 449, discount: 22, rating: 4.7, reviews: 76, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop&auto=format", badge: "New", inStock: true },
      { id: 205, name: "Humic Acid Granules 5kg", brand: "organic", price: 599, originalPrice: 749, discount: 20, rating: 4.4, reviews: 52, image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=400&fit=crop&auto=format", inStock: true },
    ],
  },
  {
    id: "maatifresh",
    name: "Maatifresh",
    tagline: "Farm-Fresh Produce & Seeds",
    icon: Apple,
    accent: "#166534",
    logo: "🥦",
    products: [
      { id: 301, name: "Hybrid Tomato Seeds 10g", brand: "maatifresh", price: 249, originalPrice: 349, discount: 29, rating: 4.7, reviews: 96, image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=400&fit=crop&auto=format", badge: "New", inStock: true },
      { id: 302, name: "Spinach Seeds 50g", brand: "maatifresh", price: 99, originalPrice: 139, discount: 29, rating: 4.5, reviews: 143, image: "https://images.unsplash.com/photo-1535912260-6a4fad1ca0d8?w=400&h=400&fit=crop&auto=format", inStock: true },
      { id: 303, name: "Brinjal F1 Hybrid 5g", brand: "maatifresh", price: 189, originalPrice: 249, discount: 24, rating: 4.6, reviews: 78, image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop&auto=format", badge: "Bestseller", inStock: true },
      { id: 304, name: "Okra Seeds 100g", brand: "maatifresh", price: 129, originalPrice: 169, discount: 24, rating: 4.3, reviews: 55, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop&auto=format", inStock: true },
      { id: 305, name: "Bitter Gourd Seeds 25g", brand: "maatifresh", price: 159, originalPrice: 209, discount: 24, rating: 4.4, reviews: 47, image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop&auto=format", inStock: true },
    ],
  },
  {
    id: "ayurved",
    name: "Ayurved Maatitatva",
    tagline: "Herbal & Natural Remedies",
    icon: FlaskConical,
    accent: "#14532d",
    logo: "🌱",
    products: [
      { id: 401, name: "Ashwagandha Extract 100g", brand: "ayurved", price: 399, originalPrice: 499, discount: 20, rating: 4.8, reviews: 167, image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=400&h=400&fit=crop&auto=format", badge: "Top Rated", inStock: true },
      { id: 402, name: "Neem Leaf Powder 200g", brand: "ayurved", price: 199, originalPrice: 269, discount: 26, rating: 4.6, reviews: 122, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&auto=format", inStock: true },
      { id: 403, name: "Tulsi Ark 100ml", brand: "ayurved", price: 149, originalPrice: 199, discount: 25, rating: 4.7, reviews: 98, image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=400&fit=crop&auto=format", badge: "New", inStock: true },
      { id: 404, name: "Amla Juice 500ml", brand: "ayurved", price: 249, originalPrice: 329, discount: 24, rating: 4.5, reviews: 84, image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=400&fit=crop&auto=format", inStock: true },
      { id: 405, name: "Herbal Soil Tonic 250ml", brand: "ayurved", price: 299, originalPrice: 399, discount: 25, rating: 4.6, reviews: 61, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop&auto=format", inStock: true },
    ],
  },
];

export const ALL_PRODUCTS: Product[] = BRAND_CATEGORIES.flatMap(b => b.products);

export const EVENTS = [
  { id: 1, title: "Organic Farming Workshop", date: "22 Dec 2024", time: "10:00 AM – 4:00 PM", location: "Pune, Maharashtra", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop&auto=format", desc: "Hands-on workshop on organic certification and sustainable practices." },
  { id: 2, title: "Soil Health Management Seminar", date: "5 Jan 2025", time: "9:00 AM – 1:00 PM", location: "Nagpur, Maharashtra", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&auto=format", desc: "Expert panel on NPK analysis, pH balance and soil improvement." },
  { id: 3, title: "Smart Farming Exhibition 2025", date: "2 Feb 2025", time: "11:00 AM – 6:00 PM", location: "Mumbai, Maharashtra", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&auto=format", desc: "Latest agri-tech showcase, machinery demos and expert consultations." },
  { id: 4, title: "Kisan Mela 2025", date: "15 Mar 2025", time: "9:00 AM – 5:00 PM", location: "Nashik, Maharashtra", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop&auto=format", desc: "Annual farmer fair with live demos of latest agri technologies." },
];

export const HOME_NEWS = [
  { id: 1, title: "Matti Tatva Launches New Organic Fertilizer Range", date: "18 Jun 2024", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop&auto=format", excerpt: "Certified vermicompost and NPK blends now available pan-India." },
  { id: 2, title: "Government Approves Matti Tatva Soil Health Programme", date: "12 Jun 2024", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop&auto=format", excerpt: "Free soil testing camps rolling out across Maharashtra districts." },
  { id: 3, title: "Record Harvest Reported Using Maatifresh Hybrid Seeds", date: "5 Jun 2024", image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=800&h=500&fit=crop&auto=format", excerpt: "Farmers in Nashik report 35% higher tomato yields this season." },
  { id: 4, title: "Franchise Opportunities Expanded to 12 New Cities", date: "28 May 2024", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop&auto=format", excerpt: "Join India's fastest-growing agro retail network today." },
  { id: 5, title: "Ayurved Crop Care Series Wins National Innovation Award", date: "20 May 2024", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=500&fit=crop&auto=format", excerpt: "Herbal plant protection recognised for sustainable farming impact." },
  { id: 6, title: "Monsoon Preparedness Guide Released for Farmers", date: "15 May 2024", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&auto=format", excerpt: "Expert tips on seed selection, soil prep and crop planning." },
];

export const TESTIMONIALS = [
  { name: "Ramesh Patil", location: "Nashik", rating: 5, review: "Excellent fertilizers! My tomato yield increased by 40% this season.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
  { name: "Sunita Deshmukh", location: "Pune", rating: 5, review: "The drip irrigation kit saved so much water. Great value and fast delivery.", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&auto=format" },
  { name: "Vijay Chavan", location: "Aurangabad", rating: 4, review: "Seeds germination rate was excellent. Customer support was very helpful.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format" },
  { name: "Anita Kulkarni", location: "Kolhapur", rating: 5, review: "Organic Maatitatva vermicompost transformed my soil quality within one season.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
  { name: "Ganesh More", location: "Satara", rating: 5, review: "Doctor Maatitatva pesticides are effective and safe. Highly recommended!", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format" },
  { name: "Priya Jadhav", location: "Nagpur", rating: 4, review: "Maatifresh seeds gave me the best brinjal harvest in years. Will buy again.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format" },
  { name: "Suresh Pawar", location: "Dhule", rating: 5, review: "Ayurved products are pure and natural. My crop health improved noticeably.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format" },
];

export const NEARBY_SHOPS = [
  { id: "nashik-hub", name: "Matti Tatva Nashik Hub", address: "Plot 12, MIDC, Nashik – 422010", dist: "0.8 km", phone: "+91 98765 43210", open: true },
  { id: "deolali", name: "Agri Point Deolali", address: "Near Bus Stand, Deolali Camp", dist: "4.2 km", phone: "+91 87654 32109", open: true },
  { id: "igatpuri", name: "Green Agro Igatpuri", address: "Main Bazar Road, Igatpuri", dist: "7.6 km", phone: "+91 76543 21098", open: false },
  { id: "sinnar", name: "Kisan Store Sinnar", address: "Sinnar Phata, Nashik-Pune Highway", dist: "12.1 km", phone: "+91 65432 10987", open: true },
];
