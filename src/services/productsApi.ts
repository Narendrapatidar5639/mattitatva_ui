import type { Product } from "../types";
import { API_BASE, apiFetch } from "./api";

export interface ApiProduct {
  id: number;
  title: string;
  name: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  in_stock: boolean;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  success: boolean;
  count: number;
  products: ApiProduct[];
}

export interface UploadProductResponse {
  success: boolean;
  message: string;
  product: ApiProduct;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
  };
}

/** Map backend product → storefront Product shape (UI unchanged). */
export function mapApiProductToStorefront(api: ApiProduct): Product {
  const price = Number.parseFloat(api.price);
  const originalPrice = Math.round(price * 1.15);
  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

  return {
    id: api.id,
    name: api.name || api.title,
    brand: api.category,
    price,
    originalPrice,
    discount,
    rating: 4.5,
    reviews: 0,
    image: api.image || "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    badge: api.in_stock ? "New" : undefined,
    inStock: api.in_stock,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await apiFetch<ProductsResponse>("/api/products/");
  return data.products.map(mapApiProductToStorefront);
}

export async function loginAdminApi(email: string, password: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function uploadProductApi(
  payload: {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
  },
  imageFile?: File | null
): Promise<UploadProductResponse> {
  const form = new FormData();
  form.append("name", payload.name);
  form.append("description", payload.description);
  form.append("category", payload.category);
  form.append("price", String(payload.price));
  form.append("stock", String(payload.stock));
  if (imageFile) form.append("image", imageFile);

  const response = await fetch(`${API_BASE}/api/products/upload/`, {
    method: "POST",
    credentials: "include",
    body: form,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { error?: string }).error || `Upload failed (${response.status})`);
  }
  return data as UploadProductResponse;
}
// services/productsApi.ts

export async function fetchProductDetailApi(productId: number) {
  const response = await fetch(`http://localhost:8000/api/products/${productId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product details.");
  }

  return response.json(); // { product: {...}, relatedProducts: [...] } लौटाएगा
}