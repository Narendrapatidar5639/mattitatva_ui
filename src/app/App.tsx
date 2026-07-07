import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router";
import { CheckCircle } from "lucide-react";
import type { CartItem, Page, Product } from "../types";
import { isUserAuthenticated, persistUserAuth } from "../auth/unifiedAuth";
import { ProductsProvider, useProducts } from "../context/ProductsContext";
import { G, FONT_BODY, PRIMARY } from "../constants/theme";
import { ScrollToTop } from "../components";
import { AuthPage } from "../components/AuthPage";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { MobileNav } from "../components/layout/MobileNav";
import { HomePage } from "../pages/Home";
import { ProductsPage } from "../pages/Products";
import { ProductDetailPage } from "../pages/ProductDetail";
import { CartPage } from "../pages/Cart";
import { CheckoutPage } from "../pages/Checkout";
import { AccountPage } from "../pages/Account";
import { ServicesPage } from "../pages/Services";
import ServiceFormPage from "../pages/ServiceForm";
import { AboutPage } from "../pages/About";
import { Contact as ContactPage } from "../pages/Contact";
import { NearbyShopPage } from "../pages/NearbyShop";
import { GetFranchisePage } from "../pages/GetFranchise";
import {
  authModeFromPath,
  isAuthPath,
  pageToPath,
  pathToPage,
  redirectLegacyAuthHash,
  STORE_ROUTES,
} from "../routes/storefrontRoutes";

type PendingAuthAction = { type: "cart" | "purchase"; product: Product };

function ProductDetailRoute(props: Record<string, unknown>) {
  const { productId } = useParams();
  const id = Number(productId);

  if (!productId || Number.isNaN(id)) {
    return <Navigate to={STORE_ROUTES.products} replace />;
  }

  return <ProductDetailPage {...props} productId={id} />;
}

function AuthRouteShell() {
  return null;
}

function StorefrontApp() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const { products } = useProducts();
  const page = pathToPage(location.pathname);
  const authMode = authModeFromPath(location.pathname);

  const [authReady, setAuthReady] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<string>("grid");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toastMsg, setToastMsg] = useState("");
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingAuthAction, setPendingAuthAction] = useState<PendingAuthAction | null>(null);

  const showAuthModal = authReady && isAuthPath(location.pathname) && !isAuthenticated;

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(""), 2500);
  };

  const navigate = useCallback(
    (p: Page, product?: Product) => {
      if (product) setSelectedProduct(product);
      setMobileMenuOpen(false);
      routerNavigate(pageToPath(p, product));
    },
    [routerNavigate]
  );

  const openAuthModal = useCallback(
    (mode: "login" | "signup" = "login") => {
      routerNavigate(mode === "signup" ? STORE_ROUTES.signup : STORE_ROUTES.login);
    },
    [routerNavigate]
  );

  const closeAuthModal = useCallback(() => {
    setPendingAuthAction(null);
    if (isAuthPath(location.pathname)) {
      routerNavigate(STORE_ROUTES.home, { replace: true });
      return;
    }
    if (window.history.length > 1) {
      routerNavigate(-1);
    } else {
      routerNavigate(STORE_ROUTES.home);
    }
  }, [location.pathname, routerNavigate]);

  const addToCartInternal = (product: Product) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      setPendingAuthAction({ type: "cart", product });
      openAuthModal("login");
      return;
    }
    addToCartInternal(product);
  };

  const handlePurchase = (product: Product) => {
    if (!isAuthenticated) {
      setPendingAuthAction({ type: "purchase", product });
      openAuthModal("login");
      return;
    }
    addToCartInternal(product);
    navigate("cart");
  };

  const handleAuthSuccess = useCallback(() => {
    persistUserAuth();
    setIsAuthenticated(true);

    if (pendingAuthAction) {
      addToCartInternal(pendingAuthAction.product);
      if (pendingAuthAction.type === "purchase") {
        routerNavigate(STORE_ROUTES.cart, { replace: true });
      } else {
        routerNavigate(STORE_ROUTES.home, { replace: true });
      }
      setPendingAuthAction(null);
    } else {
      routerNavigate(STORE_ROUTES.home, { replace: true });
    }

    showToast("Welcome! You're signed in.");
  }, [pendingAuthAction, routerNavigate]);

  useEffect(() => {
    setIsAuthenticated(isUserAuthenticated());
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!authReady || !isAuthenticated) return;
    if (isAuthPath(location.pathname)) {
      routerNavigate(STORE_ROUTES.home, { replace: true });
    }
  }, [authReady, isAuthenticated, location.pathname, routerNavigate]);
// File: App.tsx
useEffect(() => {
  if (!authReady) return;
  
  // Strict condition: Only redirect to home if user is explicitly authenticated 
  // AND they are trying to manually type /login or /signup in the address bar.
  if (isAuthenticated && isAuthPath(location.pathname)) {
    routerNavigate(STORE_ROUTES.home, { replace: true });
  }
}, [authReady, isAuthenticated, location.pathname, routerNavigate]);
  useEffect(() => {
    if (location.pathname === STORE_ROUTES.orders) setActiveTab("orders");
    else if (location.pathname === STORE_ROUTES.wishlist) setActiveTab("wishlist");
    else if (location.pathname === STORE_ROUTES.account) setActiveTab("dashboard");
  }, [location.pathname]);

  const toggleWishlist = (product: Product) =>
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });

  const updateQty = (id: number, d: number) =>
    setCartItems(prev => prev.map(i => (i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)));

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id));

  const appProps = useMemo(
    () => ({
      page,
      products,
      cartItems,
      setCartItems,
      wishlist,
      selectedProduct,
      mobileMenuOpen,
      setMobileMenuOpen,
      searchQuery,
      setSearchQuery,
      checkoutStep,
      setCheckoutStep,
      orderPlaced,
      setOrderPlaced,
      sortBy,
      setSortBy,
      viewMode,
      setViewMode,
      activeTab,
      setActiveTab,
      filterBrand,
      setFilterBrand,
      cartCount,
      cartTotal,
      addToCart: handleAddToCart,
      purchaseProduct: handlePurchase,
      isAuthenticated,
      openAuthModal,
      toggleWishlist,
      updateQty,
      removeFromCart,
      navigate,
    }),
    [
      page,
      products,
      cartItems,
      wishlist,
      selectedProduct,
      mobileMenuOpen,
      searchQuery,
      checkoutStep,
      orderPlaced,
      sortBy,
      viewMode,
      activeTab,
      filterBrand,
      cartCount,
      cartTotal,
      isAuthenticated,
      navigate,
      openAuthModal,
    ]
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-white" style={{ fontFamily: FONT_BODY }}>
      <ScrollToTop pageKey={location.pathname} />
      <Header {...appProps} />
      <main className="flex-1 w-full pb-24 md:pb-0">
        <Routes>
          <Route path={STORE_ROUTES.home} element={<HomePage {...appProps} />} />
          <Route path={STORE_ROUTES.products} element={<ProductsPage {...appProps} />} />
          <Route path="/products/:productId" element={<ProductDetailRoute {...appProps} />} />
          <Route
            path={STORE_ROUTES.cart}
            element={(() => {
              const CartComponent = CartPage as any;
              return (
                <CartComponent
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                  updateQty={updateQty}
                  removeFromCart={removeFromCart}
                  navigate={navigate}
                />
              );
            })()}
          />
          <Route path={STORE_ROUTES.checkout} element={<CheckoutPage {...appProps} />} />
          <Route path={STORE_ROUTES.account} element={<AccountPage {...appProps} />} />
          <Route path={STORE_ROUTES.orders} element={<AccountPage {...appProps} />} />
          <Route path={STORE_ROUTES.wishlist} element={<AccountPage {...appProps} />} />
          <Route path={STORE_ROUTES.services} element={<ServicesPage />} />
          <Route
            path={STORE_ROUTES.soilHealth}
            element={(() => {
              const ServiceFormComponent = ServiceFormPage as any;
              return <ServiceFormComponent {...appProps} slug="soil-health" />;
            })()}
          />
          <Route
            path={STORE_ROUTES.cropHealth}
            element={(() => {
              const ServiceFormComponent = ServiceFormPage as any;
              return <ServiceFormComponent {...appProps} slug="crop-health" />;
            })()}
          />
          <Route path={STORE_ROUTES.franchise} element={<GetFranchisePage />} />
          <Route
            path={STORE_ROUTES.contractFarming}
            element={(() => {
              const ServiceFormComponent = ServiceFormPage as any;
              return <ServiceFormComponent {...appProps} slug="contract-farming" />;
            })()}
          />
          <Route path={STORE_ROUTES.events} element={<Navigate to={STORE_ROUTES.home} replace />} />
          <Route path={STORE_ROUTES.about} element={<AboutPage {...appProps} />} />
          <Route path={STORE_ROUTES.contact} element={<ContactPage />} />
          <Route path={STORE_ROUTES.nearby} element={<NearbyShopPage {...appProps} />} />
          <Route path={STORE_ROUTES.login} element={<AuthRouteShell />} />
          <Route path={STORE_ROUTES.signup} element={<AuthRouteShell />} />
          <Route path="*" element={<Navigate to={STORE_ROUTES.home} replace />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav {...appProps} />

      {toastMsg && (
        <div
          className="fixed bottom-28 md:bottom-6 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl z-50 flex items-center gap-2 whitespace-nowrap"
          style={{ background: PRIMARY }}
        >
          <CheckCircle size={13} style={{ color: G[400] }} />
          {toastMsg}
        </div>
      )}

      {showAuthModal && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
          role="presentation"
          onClick={closeAuthModal}
        >
          <div
            className="h-[100dvh] w-full max-w-5xl overflow-y-auto sm:h-auto sm:max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            <AuthPage
              initialMode={authMode}
              onAuthSuccess={handleAuthSuccess}
              onClose={closeAuthModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  if (redirectLegacyAuthHash()) {
    return null;
  }

  return (
    <ProductsProvider>
      <StorefrontApp />
    </ProductsProvider>
  );
}
