import type { AdminOrder, AdminShipment, InventoryItem, PincodeZone, ShippingPartner } from "./types";

export const MOCK_ORDERS: AdminOrder[] = [
  {
    id: "MT-2401",
    customer: "Ramesh Patil",
    email: "ramesh@example.com",
    phone: "+91 98765 43210",
    items: 3,
    total: 2847,
    status: "Pending",
    placedAt: "2026-03-20 10:24",
    address: "Nashik, Maharashtra 422001",
    payment: "UPI",
  },
  {
    id: "MT-2402",
    customer: "Sunita Deshmukh",
    email: "sunita@example.com",
    phone: "+91 98220 11884",
    items: 1,
    total: 799,
    status: "Shipped",
    placedAt: "2026-03-19 16:10",
    address: "Pune, Maharashtra 411001",
    payment: "COD",
  },
  {
    id: "MT-2403",
    customer: "Vijay Chavan",
    email: "vijay@example.com",
    phone: "+91 90112 33445",
    items: 5,
    total: 5420,
    status: "Delivered",
    placedAt: "2026-03-18 09:05",
    address: "Aurangabad, Maharashtra 431001",
    payment: "Card",
  },
  {
    id: "MT-2404",
    customer: "Anita Kulkarni",
    email: "anita@example.com",
    phone: "+91 97654 22110",
    items: 2,
    total: 1299,
    status: "Pending",
    placedAt: "2026-03-20 14:40",
    address: "Kolhapur, Maharashtra 416001",
    payment: "UPI",
  },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: "inv1", name: "Organic Vermicompost 25kg", category: "Organic Maatitatva", stock: 142, lowStockThreshold: 30, inStock: true },
  { id: "inv2", name: "Doctor NPK Blend 10kg", category: "Doctor Maatitatva", stock: 18, lowStockThreshold: 25, inStock: true },
  { id: "inv3", name: "Maatifresh Hybrid Seeds", category: "Maatifresh", stock: 0, lowStockThreshold: 15, inStock: false },
  { id: "inv4", name: "Ayurved Herbal Clay Mix", category: "Ayurved Maatitatva", stock: 56, lowStockThreshold: 20, inStock: true },
  { id: "inv5", name: "Terracotta Planter Set", category: "Organic Maatitatva", stock: 12, lowStockThreshold: 15, inStock: true },
];

export const MOCK_SHIPMENTS: AdminShipment[] = [
  {
    id: "SH-901",
    orderId: "MT-2402",
    customer: "Sunita Deshmukh",
    partner: "Delhivery Agro",
    trackingId: "DLV882910MT",
    status: "In-Transit",
    pincode: "411001",
    updatedAt: "2026-03-20 08:00",
  },
  {
    id: "SH-902",
    orderId: "MT-2403",
    customer: "Vijay Chavan",
    partner: "BlueDart Express",
    trackingId: "BDX441220MT",
    status: "Delivered",
    pincode: "431001",
    updatedAt: "2026-03-19 18:30",
  },
  {
    id: "SH-903",
    orderId: "MT-2401",
    customer: "Ramesh Patil",
    partner: "India Post Agri",
    trackingId: "—",
    status: "Pending",
    pincode: "422001",
    updatedAt: "2026-03-20 10:30",
  },
];

export const MOCK_PARTNERS: ShippingPartner[] = [
  { id: "p1", name: "Delhivery Agro", baseRate: 49, perKgRate: 12, active: true },
  { id: "p2", name: "BlueDart Express", baseRate: 79, perKgRate: 18, active: true },
  { id: "p3", name: "India Post Agri", baseRate: 35, perKgRate: 8, active: true },
  { id: "p4", name: "Maati Tatva Fleet", baseRate: 0, perKgRate: 10, active: false },
];

export const MOCK_PINCODES: PincodeZone[] = [
  { pincode: "422001", city: "Nashik", state: "Maharashtra", available: true, etaDays: 2 },
  { pincode: "411001", city: "Pune", state: "Maharashtra", available: true, etaDays: 1 },
  { pincode: "431001", city: "Aurangabad", state: "Maharashtra", available: true, etaDays: 3 },
  { pincode: "110001", city: "New Delhi", state: "Delhi", available: false, etaDays: 5 },
];

export const SALES_CHART = [
  { month: "Oct", sales: 42, orders: 128 },
  { month: "Nov", sales: 48, orders: 142 },
  { month: "Dec", sales: 55, orders: 165 },
  { month: "Jan", sales: 51, orders: 151 },
  { month: "Feb", sales: 58, orders: 178 },
  { month: "Mar", sales: 62, orders: 194 },
];

export const VENDOR_CHART = [
  { name: "Organic", value: 35 },
  { name: "Doctor", value: 25 },
  { name: "Maatifresh", value: 22 },
  { name: "Ayurved", value: 18 },
];
