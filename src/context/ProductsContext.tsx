import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ALL_PRODUCTS } from "../data/appData";
import type { Product } from "../types";
import { fetchProducts } from "../services/productsApi";

interface ProductsContextValue {
  products: Product[];
  apiProducts: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  usingApi: boolean;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchProducts({ inStockOnly: true });
      setApiProducts(items);
    } catch (err) {
      setApiProducts([]);
      setError(err instanceof Error ? err.message : "Could not load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const products = useMemo(() => {
    if (apiProducts.length === 0) return ALL_PRODUCTS;
    const staticIds = new Set(apiProducts.map(p => p.id));
    const extras = ALL_PRODUCTS.filter(p => !staticIds.has(p.id));
    return [...apiProducts, ...extras];
  }, [apiProducts]);

  const value = useMemo(
    () => ({
      products,
      apiProducts,
      loading,
      error,
      refresh,
      usingApi: apiProducts.length > 0,
    }),
    [products, apiProducts, loading, error, refresh]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
