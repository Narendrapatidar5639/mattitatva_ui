import type { AdminProductDraft } from "../types";
import { API_BASE } from "../../services/api";

export interface UploadedProductImage {
  id: number;
  image: string;
}

export interface UploadedProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  original_price: string | null;
  stock: number;
  category: string;
  brand: string;
  clay_type: string | null;
  material_spec: string | null;
  weight_kg: string;
  organic_certified: boolean;
  in_stock: boolean;
  created_at: string;
  images: UploadedProductImage[];
}

/** Map admin form draft → Django snake_case multipart fields. */
function appendProductFields(formData: FormData, draft: AdminProductDraft) {
  formData.append("name", draft.name.trim());
  formData.append("description", draft.description.trim());
  formData.append("price", String(draft.price));
  formData.append("stock", String(draft.stock));
  formData.append("category", draft.category);
  formData.append("brand", draft.brand);
  formData.append("clay_type", draft.clayType);
  formData.append("material_spec", draft.materialSpec);
  formData.append("weight_kg", String(draft.weightKg));
  formData.append("organic_certified", draft.organicCertified ? "true" : "false");
  formData.append("in_stock", draft.inStock ? "true" : "false");

  if (draft.originalPrice > 0) {
    formData.append("original_price", String(draft.originalPrice));
  }
}

function formatApiError(payload: Record<string, unknown>): string {
  if (typeof payload.detail === "string") return payload.detail;
  const messages = Object.values(payload).flatMap(value => {
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === "string") return [value];
    return [];
  });
  return messages.join(", ") || "Failed to upload product.";
}

export async function uploadProductApi(
  draft: AdminProductDraft,
  imageFiles: File[]
): Promise<UploadedProduct> {
  const formData = new FormData();
  appendProductFields(formData, draft);

  imageFiles.forEach(file => {
    formData.append("images", file);
  });

  const response = await fetch(`${API_BASE}/api/products/`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(formatApiError(data));
  }

  return data as unknown as UploadedProduct;
}

export async function fetchAllProductsApi(brand?: string | null, search?: string | null) {
  const params = new URLSearchParams();
  if (brand) params.append("brand", brand);
  if (search) params.append("search", search);

  const query = params.toString();
  const url = `${API_BASE}/api/products/${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products from database.");
  }

  return response.json() as Promise<UploadedProduct[]>;
}
