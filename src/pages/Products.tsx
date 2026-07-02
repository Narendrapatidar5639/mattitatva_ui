import { useEffect, useState } from "react";
import { Filter, Grid, List } from "lucide-react";
import { CONTAINER, G } from "../constants/theme";
import { BRAND_CATEGORIES } from "../data/appData";
import { fetchProducts } from "../services/productsApi";
import { FlipkartProductCard, StarRating } from "../components";

export function ProductsPage(props: any) {
  const {
    wishlist,
    searchQuery,      // ग्लोबल नेवबार सर्च से आ रहा है
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

  // डायनेमिक स्टेट्स
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // जब भी ब्रैंड फ़िल्टर या सर्च क्वेरी बदलेगी, बैकएंड से डेटा दोबारा लोड होगा
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        let filteredData = data;

        if (filterBrand) {
          filteredData = filteredData.filter((product: any) => product.brand === filterBrand);
        }

        if (searchQuery) {
          const normalizedQuery = searchQuery.trim().toLowerCase();
          filteredData = filteredData.filter((product: any) => {
            const name = product.name?.toLowerCase() || "";
            const description = product.description?.toLowerCase() || "";
            return name.includes(normalizedQuery) || description.includes(normalizedQuery);
          });
        }

        setDbProducts(filteredData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filterBrand, searchQuery]);

  // फ्रंटएंड सॉर्टिंग लॉजिक (डेटाबेस से आए प्रोडक्ट्स पर लागू होगा)
  const sortedProducts = [...dbProducts].sort((a, b) => {
    const priceA = Number(a.price);
    const priceB = Number(b.price);
    
    if (sortBy === "price-asc") return priceA - priceB;
    if (sortBy === "price-desc") return priceB - priceA;
    // रेटिंग और रिव्यूज फ़ील्ड्स अगर मॉडल में मोजूद हैं (डिफ़ॉल्ट फॉलबैक 0)
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return (b.reviews || 0) - (a.reviews || 0);
  });

  return (
    <div className={`${CONTAINER} py-6 md:py-8 w-full`}>
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Filters */}
        <aside className="md:w-52 flex-shrink-0">
          <div className="bg-white border rounded-xl p-4 sticky top-24" style={{ borderColor: G[100] }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm flex items-center gap-1.5" style={{ color: G[800] }}>
                <Filter size={13} />Filters
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

        {/* Products Listing Area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <p className="text-sm text-gray-500">
              {loading ? (
                <span className="animate-pulse">Fetching latest stock...</span>
              ) : (
                <>Showing <span className="font-bold text-gray-800">{sortedProducts.length}</span> dynamic items</>
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
                <button onClick={() => setViewMode("grid")} className="p-1.5 transition-colors" style={viewMode === "grid" ? { background: G[700], color: "white" } : {}}><Grid size={14} /></button>
                <button onClick={() => setViewMode("list")} className="p-1.5 transition-colors" style={viewMode === "list" ? { background: G[700], color: "white" } : {}}><List size={14} /></button>
              </div>
            </div>
          </div>

          {/* Error and Loading States UI */}
          {error && (
            <div className="text-center py-12 text-red-500 font-medium">{error}</div>
          )}

          {!loading && sortedProducts.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed text-gray-400 text-sm">
              No products found matching the criteria in Maati Tatva database.
            </div>
          )}

          {/* Grid View */}
          {/* Grid View */}
{!loading && viewMode === "grid" && (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
    {sortedProducts?.map(p => {
      // 1. सुरक्षित इमेज हैंडलिंग: अगर images एरे खाली है, तो एक डिफ़ॉल्ट प्लेसहोल्डर इमेज दें
      const displayImage = p.images && p.images.length > 0 
        ? p.images[0].image 
        : (p.image || "https://via.placeholder.com/300?text=Maati+Tatva"); // 👈 Fallback Image

      // 2. ब्रैंड हैंडलिंग: डेटाबेस में स्ट्रिंग है, तो उसे फ्रंटएंड के ID फॉर्मेट से मैच करें
      // अगर p.brand "Maati Tatva" है, तो उसे लोअरकेस या मैचिंग आईडी में बदलें
      const matchedBrand = BRAND_CATEGORIES.find(
        b => b.id === p.brand || b.name.toLowerCase() === String(p.brand).toLowerCase()
      );

      const normalizedProduct = { 
        ...p, 
        image: displayImage,
        brand: matchedBrand?.id || "maati-tatva" // कार्ड क्रैश होने से बचेगा
      };

      return (
        <FlipkartProductCard 
          key={p.id} 
          product={normalizedProduct} 
          onAddToCart={addToCart} 
          onWishlist={toggleWishlist} 
          onView={prod => navigate("product-detail", prod)} 
          wishlisted={wishlist.includes(p.id)} 
          large 
        />
      );
    })}
  </div>
)}

          {/* List View */}
          {!loading && viewMode === "list" && (
            <div className="flex flex-col gap-3">
              {sortedProducts.map(p => {
                const brand = BRAND_CATEGORIES.find(b => b.id === p.brand);
                const shade = brand?.accent || G[700];
                const displayImage = p.images && p.images.length > 0 ? p.images[0].image : p.image;

                return (
                  <div key={p.id} className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow" style={{ borderColor: G[100] }}>
                    <img src={displayImage} alt={p.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-gray-50" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{p.name}</h3>
                      <StarRating rating={p.rating || 4.5} size={11} />
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-sm" style={{ color: shade }}>₹{p.price}</span>
                        {p.original_price && (
                          <span className="text-xs text-gray-400 line-through">₹{p.original_price}</span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => addToCart(p)} 
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