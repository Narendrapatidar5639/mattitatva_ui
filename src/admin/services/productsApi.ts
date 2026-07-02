// services/productsApi.ts
// 🎯 फिक्स: दूसरे पैरामीटर को File से File[] (Array) किया
export async function uploadProductApi(productData: any, imageFiles: File[]) {
  const formData = new FormData();

  // सारे टेक्स्ट, नंबर और बूलियन फील्ड्स को सही से अपेंड करें
  Object.keys(productData).forEach((key) => {
    if (productData[key] !== undefined && productData[key] !== null) {
      formData.append(key, String(productData[key]));
    }
  });

  // मल्टीपल इमेजेस को 'images' की पर अपेंड करें
  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  const response = await fetch("http://localhost:8000/api/products/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errorMessage = errData.detail || Object.values(errData).flat().join(", ") || "Failed to upload product.";
    throw new Error(errorMessage);
  }

  return response.json();
}

// services/productsApi.ts

export async function fetchAllProductsApi(brand?: string | null, search?: string | null) {
  let url = "http://localhost:8000/api/products/";
  const params = new URLSearchParams();
  
  if (brand) params.append("brand", brand);
  if (search) params.append("search", search);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products from database.");
  }

  return response.json(); // प्रोडक्ट्स की एरे (Array) लौटाएगा
}