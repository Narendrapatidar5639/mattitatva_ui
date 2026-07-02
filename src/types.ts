export type Page = "home" | "products" | "product-detail" | "cart" | "checkout" | "account" | "orders" | "wishlist" | "contact" | "about" | "events" | "services" | "nearby" | "soil-health" | "crop-health" | "franchise" | "contract-farming";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: boolean;
}

export interface CartItem extends Product { qty: number; }
