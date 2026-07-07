import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  ChevronRight, Minus, Plus, Heart, CheckCircle, Star,
} from "lucide-react";
import { CONTAINER, G, PRIMARY, FONT_LABEL } from "../constants/theme";
import {
  fetchProductDetailApi,
  mapApiProductToStorefront,
  type ApiProduct,
} from "../services/productsApi";
import { BRAND_CATEGORIES, TESTIMONIALS } from "../data/appData";
import type { Product } from "../types";
import { FlipkartProductCard } from "../components";

type StarRatingProps = { rating: number; size?: number };
function StarRating({ rating, size = 14 }: StarRatingProps) {
  const stars = Array.from({ length: 5 }).map((_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      {stars.map(s => (
        <Star key={s} size={size} style={{ color: s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb" }} />
      ))}
    </div>
  );
}

const PRODUCT_SCROLL_ITEM = "shrink-0 w-72 snap-start";

function isWishlisted(wishlist: Product[], productId: number) {
  return wishlist.some(item => item.id === productId);
}

export function ProductDetailPage(props: any) {
  const {
    productId: productIdProp,
    selectedProduct,
    wishlist,
    addToCart,
    purchaseProduct,
    toggleWishlist,
    navigate,
  } = props;

  const { productId: routeProductId } = useParams();
  const resolvedId = productIdProp ?? selectedProduct?.id ?? Number(routeProductId);

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (!resolvedId || Number.isNaN(resolvedId)) {
      setLoading(false);
      setApiError("Invalid product.");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setApiError(null);

    fetchProductDetailApi(resolvedId)
      .then(data => {
        if (cancelled) return;
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts ?? []);
        const firstImage = data.product.images?.[0]?.image ?? "";
        setActiveImage(firstImage);
      })
      .catch(err => {
        if (cancelled) return;
        setProduct(null);
        setRelatedProducts([]);
        setApiError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [resolvedId]);

  const storefrontProduct = useMemo(
    () => (product ? mapApiProductToStorefront(product) : null),
    [product]
  );

  const relatedCardProducts = useMemo(
    () => relatedProducts.map(mapApiProductToStorefront),
    [relatedProducts]
  );

  if (loading) {
    return (
      <div className={`${CONTAINER} py-20 text-center text-sm font-semibold text-gray-500`}>
        Loading Maati Tatva Product Details...
      </div>
    );
  }

  if (apiError || !product || !storefrontProduct) {
    return (
      <div className={`${CONTAINER} py-20 text-center text-red-500 font-medium`}>
        {apiError || "Product not found."}
      </div>
    );
  }

  const brandKey = product.category || product.brand;
  const brand = BRAND_CATEGORIES.find(b => b.id === brandKey) || BRAND_CATEGORIES[0];
  const shade = brand?.accent || PRIMARY;

  const discountPercent =
    product.original_price && Number(product.original_price) > Number(product.price)
      ? Math.round(
          ((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100
        )
      : 0;

  const galleryImages = product.images?.length
    ? product.images
    : storefrontProduct.image
      ? [{ id: 0, image: storefrontProduct.image }]
      : [];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i += 1) addToCart(storefrontProduct);
  };

  const handleBuyNow = () => {
    if (purchaseProduct) {
      purchaseProduct(storefrontProduct);
      return;
    }
    handleAddToCart();
    navigate("cart");
  };

  return (
    <div className={`${CONTAINER} py-6 md:py-8 w-full`}>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <button onClick={() => navigate("home")} className="hover:text-green-700">
          Home
        </button>
        <ChevronRight size={11} />
        <button onClick={() => navigate("products")} className="hover:text-green-700">
          Products
        </button>
        <ChevronRight size={11} />
        <span className="text-gray-700 font-medium line-clamp-1 max-w-xs">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100" style={{ background: G[50] }}>
            {activeImage ? (
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No image</div>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {galleryImages.map((imgObj, idx) => (
                <button
                  key={imgObj.id || idx}
                  type="button"
                  onClick={() => setActiveImage(imgObj.image)}
                  className="w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all"
                  style={{ borderColor: activeImage === imgObj.image ? shade : "transparent" }}
                >
                  <img src={imgObj.image} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {brand && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-white text-xs font-bold mb-3" style={{ background: shade }}>
              <span>{brand.logo}</span>
              {brand.name}
            </div>
          )}

          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={4.5} size={15} />
            <span className="text-sm text-gray-500">4.5 (24 reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold" style={{ color: shade }}>
              ₹{product.price}
            </span>
            {product.original_price && Number(product.original_price) > 0 && (
              <>
                <span className="text-base text-gray-400 line-through mb-0.5">₹{product.original_price}</span>
                {discountPercent > 0 && (
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded mb-0.5">
                    {discountPercent}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          <div className="rounded-xl p-4 mb-6" style={{ background: G[50], border: `1px solid ${G[100]}` }}>
            <p className="text-xs font-bold mb-2" style={{ color: shade, fontFamily: FONT_LABEL }}>
              Key Specifications
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle size={13} style={{ color: shade }} />
                Material / Clay Type: <span className="font-semibold">{product.clay_type || "Natural Clay"}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={13} style={{ color: shade }} />
                Weight: <span className="font-semibold">{product.weight_kg} kg</span>
              </li>
              {product.organic_certified && (
                <li className="flex items-center gap-2">
                  <CheckCircle size={13} style={{ color: shade }} />
                  Certification: <span className="text-green-700 font-semibold">100% Organic Certified</span>
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: G[200] }}>
              <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-semibold text-sm">{qty}</span>
              <button type="button" onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                <Plus size={14} />
              </button>
            </div>
            <span className="text-xs font-semibold" style={{ color: product.in_stock ? "#16a34a" : "#dc2626" }}>
              {product.in_stock ? `✓ In Stock (${product.stock} units left)` : "✗ Out of Stock"}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!product.in_stock}
              className="flex-1 py-3 text-white rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: shade }}
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="flex-1 py-3 border-2 rounded-xl font-bold text-sm transition-all hover:opacity-80 disabled:opacity-50"
              style={{ borderColor: shade, color: shade }}
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(storefrontProduct)}
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors"
              style={
                isWishlisted(wishlist, product.id)
                  ? { background: "#fef2f2", borderColor: "#fca5a5", color: "#ef4444" }
                  : { borderColor: G[200], color: G[600] }
              }
            >
              <Heart size={16} className={isWishlisted(wishlist, product.id) ? "fill-current" : ""} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-b mb-6 flex gap-6" style={{ borderColor: G[100] }}>
        {["description", "specifications", "reviews"].map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="pb-3 text-sm font-semibold capitalize border-b-2 transition-colors"
            style={tab === t ? { borderColor: shade, color: shade } : { borderColor: "transparent", color: "#9ca3af" }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "description" && (
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl whitespace-pre-line">
          {product.description ||
            "Premium quality product from Maati Tatva Agro Industries. Carefully formulated for maximum yield and environment health improvement."}
        </p>
      )}

      {tab === "specifications" && (
        <div className="max-w-2xl">
          {[
            ["Weight", `${product.weight_kg} kg`],
            ["Material Type", product.clay_type || "N/A"],
            ["Specific Details", product.material_spec || "No supplementary specs given."],
            ["Organic Certified", product.organic_certified ? "Yes (Certified)" : "No"],
          ].map(([k, v]) => (
            <div key={k} className="flex border-b py-3" style={{ borderColor: G[50] }}>
              <span className="w-40 text-sm text-gray-400">{k}</span>
              <span className="text-sm font-medium text-gray-700">{v}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "reviews" && (
        <div className="max-w-2xl space-y-4">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="border rounded-xl p-4" style={{ borderColor: G[100] }}>
              <div className="flex items-center gap-3 mb-2">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <StarRating rating={t.rating} size={11} />
                </div>
              </div>
              <p className="text-sm text-gray-500">{t.review}</p>
            </div>
          ))}
        </div>
      )}

      {relatedCardProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: G[950] }}>
            Related Products
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory w-full" style={{ scrollbarWidth: "none" }}>
            {relatedCardProducts.map(rp => (
              <div key={rp.id} className={PRODUCT_SCROLL_ITEM}>
                <FlipkartProductCard
                  product={rp}
                  onAddToCart={addToCart}
                  onWishlist={toggleWishlist}
                  onView={prod => navigate("product-detail", prod)}
                  wishlisted={isWishlisted(wishlist, rp.id)}
                  large
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
