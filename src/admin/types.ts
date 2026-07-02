export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
}

export type OrderStatus = "Pending" | "Shipped" | "Delivered";

export type ShipmentStatus = "Pending" | "Dispatched" | "In-Transit" | "Delivered";

export interface AdminProductDraft {
  id?: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  stock: number;
  category: string;
  brand: string;
  clayType: string;
  materialSpec: string;
  weightKg: number;
  organicCertified: boolean;
  imagePreview?: string;
  inStock: boolean;
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: number;
  total: number;
  status: OrderStatus;
  placedAt: string;
  address: string;
  payment: string;
}

export interface AdminShipment {
  id: string;
  orderId: string;
  customer: string;
  partner: string;
  trackingId: string;
  status: ShipmentStatus;
  pincode: string;
  updatedAt: string;
}

export interface ShippingPartner {
  id: string;
  name: string;
  baseRate: number;
  perKgRate: number;
  active: boolean;
}

export interface PincodeZone {
  pincode: string;
  city: string;
  state: string;
  available: boolean;
  etaDays: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  lowStockThreshold: number;
  inStock: boolean;
}
