import { useEffect, useMemo, useState } from "react";
import { Filter, Grid, List } from "lucide-react";
import { CONTAINER, G } from "../constants/theme";
import { BRAND_CATEGORIES } from "../data/appData";
import type { Product } from "../types";
import {
  fetchProductsList,
  mapApiProductToStorefront,
  type ApiProduct,
} from "../services/productsApi";
import { FlipkartProductCard, StarRating } from "../components";

function isWishlisted(wishlist: Product[], productId: number) {
  return wishlist.some(item => item.id === productId);
}

export function ProductsPage(props: any) {
  const {
    wishlist,
    searchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filterBrand,
    setFilterBrand,
    addToCart,
    toggleWishlist,
    navigate,
  } = props;

  const [dbProducts, setDbProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProductsList({
      brand: filterBrand || undefined,
      search: searchQuery || undefined,
      inStockOnly: true,
    })
      .then(data => {
        if (cancelled) return;
        setDbProducts(data);
        setError(null);
      })
      .catch(err => {
        if (cancelled) return;
        setDbProducts([]);
        setError(err instanceof Error ? err.message : "Failed to load products.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filterBrand, searchQuery]);

  const cardProducts = useMemo(
    () => dbProducts.map(mapApiProductToStorefront),
    [dbProducts]
  );

  const sortedProducts = useMemo(() => {
    return [...cardProducts].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [cardProducts, sortBy]);

  return (
    <div className={`${CONTAINER} py-6 md:py-8 w-full`}>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-52 flex-shrink-0">
          <div className="bg-white border rounded-xl p-4 sticky top-24" style={{ borderColor: G[100] }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm flex items-center gap-1.5" style={{ color: G[800] }}>
                <Filter size={13} />
                Filters
              </h3>
              <button onClick={() => setFilterBrand(null)} className="text-[10px] hover:underline" style={{ color: G[600] }}>
                Clear
              </button>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Brand</p>
            <div className="space-y-1">
              <button
                onClick={() => setFilterBrand(null)}
                className="w-full text-left text-xs px-2.5 py-2 rounded-xl transition-colors font-medium"
                style={!filterBrand ? { background: G[700], color: "white" } : { color: "#4b5563" }}
              >
                All Products
              </button>

              {BRAND_CATEGORIES.map((b, i) => {
                const shade = [G[600], G[700], G[800], G[900]][i % 4];
                return (
                  <button
                    key={b.id}
                    onClick={() => setFilterBrand(b.id)}
                    className="w-full text-left text-xs px-2.5 py-2 rounded-xl transition-colors font-medium flex items-center gap-2"
                    style={filterBrand === b.id ? { background: shade, color: "white" } : { color: "#4b5563" }}
                  >
                    <span>{b.logo}</span>
                    <span className="line-clamp-1">{b.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <p className="text-sm text-gray-500">
              {loading ? (
                <span className="animate-pulse">Fetching latest stock...</span>
              ) : (
                <>
                  Showing <span className="font-bold text-gray-800">{sortedProducts.length}</span> products
                </>
              )}
            </p>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-xs border rounded-xl px-3 py-1.5 bg-white outline-none"
                style={{ borderColor: G[200] }}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>

              <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: G[200] }}>
                <button onClick={() => setViewMode("grid")} className="p-1.5 transition-colors" style={viewMode === "grid" ? { background: G[700], color: "white" } : {}}>
                  <Grid size={14} />
                </button>
                <button onClick={() => setViewMode("list")} className="p-1.5 transition-colors" style={viewMode === "list" ? { background: G[700], color: "white" } : {}}>
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {error && <div className="text-center py-12 text-red-500 font-medium">{error}</div>}

          {!loading && !error && sortedProducts.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed text-gray-400 text-sm">
              No products found matching your filters.
            </div>
          )}

          {!loading && viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
              {sortedProducts.map(product => (
                <FlipkartProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onWishlist={toggleWishlist}
                  onView={prod => navigate("product-detail", prod)}
                  wishlisted={isWishlisted(wishlist, product.id)}
                  large
                />
              ))}
            </div>
          )}

          {!loading && viewMode === "list" && (
            <div className="flex flex-col gap-3">
              {sortedProducts.map(product => {
                const brand = BRAND_CATEGORIES.find(b => b.id === product.brand);
                const shade = brand?.accent || G[700];

                return (
                  <div
                    key={product.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate("product-detail", product)}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") navigate("product-detail", product);
                    }}
                    className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
                    style={{ borderColor: G[100] }}
                  >
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-gray-50" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                      <StarRating rating={product.rating} size={11} />
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-sm" style={{ color: shade }}>
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="self-center text-white text-xs font-bold px-4 py-2 rounded-xl transition-transform active:scale-95"
                      style={{ background: shade }}
                    >
                      Add
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
