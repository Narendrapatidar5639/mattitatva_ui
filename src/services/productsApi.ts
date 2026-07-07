import type { Product } from "../types";
import { API_BASE, apiFetch } from "./api";

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  original_price?: string | null;
  stock: number;
  in_stock: boolean;
  clay_type?: string | null;
  material_spec?: string | null;
  weight_kg?: string;
  organic_certified?: boolean;
  images?: { id: number; image: string }[];
  created_at: string;
  /** @deprecated legacy matti API */
  title?: string;
  image?: string | null;
  updated_at?: string;
}

export interface ApiProductDetailResponse {
  product: ApiProduct;
  relatedProducts: ApiProduct[];
}

export interface FetchProductsParams {
  brand?: string | null;
  search?: string | null;
  inStockOnly?: boolean;
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
  const originalPrice = api.original_price
    ? Number.parseFloat(api.original_price)
    : Math.round(price * 1.15);
  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;
  const firstImage = api.images?.[0]?.image ?? api.image;

  return {
    id: api.id,
    name: api.name || api.title || "Product",
    // category stores brand-section ids (doctor, organic, …) used by filters/cards
    brand: api.category || api.brand,
    price,
    originalPrice,
    discount,
    rating: 4.5,
    reviews: 0,
    image: firstImage || "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    badge: api.in_stock ? "New" : undefined,
    inStock: api.in_stock,
  };
}

export async function fetchProductsList(params: FetchProductsParams = {}): Promise<ApiProduct[]> {
  const qs = new URLSearchParams();
  if (params.brand) qs.append("brand", params.brand);
  if (params.search?.trim()) qs.append("search", params.search.trim());

  const query = qs.toString();
  const path = query ? `/api/products/?${query}` : "/api/products/";
  const data = await apiFetch<ApiProduct[] | ProductsResponse>(path);
  const list = Array.isArray(data) ? data : data.products;

  if (params.inStockOnly) {
    return list.filter(item => item.in_stock);
  }
  return list;
}

export async function fetchProducts(params?: FetchProductsParams): Promise<Product[]> {
  const list = await fetchProductsList(params);
  return list.map(mapApiProductToStorefront);
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
  imageFiles: File[]
): Promise<UploadProductResponse> {
  const form = new FormData();
  form.append("name", payload.name);
  form.append("description", payload.description);
  form.append("category", payload.category);
  form.append("price", String(payload.price));
  form.append("stock", String(payload.stock));
  imageFiles.forEach(file => form.append("images", file));

  const response = await fetch(`${API_BASE}/api/products/`, {
    method: "POST",
    credentials: "include",
    body: form,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = (data as { detail?: string }).detail;
    throw new Error(detail || (data as { error?: string }).error || `Upload failed (${response.status})`);
  }
  return data as UploadProductResponse;
}
// services/productsApi.ts

export async function fetchProductDetailApi(productId: number): Promise<ApiProductDetailResponse> {
  const response = await fetch(`${API_BASE}/api/products/${productId}/`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = (data as { detail?: string }).detail;
    throw new Error(detail || "Failed to fetch product details.");
  }

  return data as ApiProductDetailResponse;
}