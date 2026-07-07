import { NavLink } from "react-router";
import type { Page } from "../../types";
import {
  Search, ShoppingCart, Heart, User, Menu, X,
  Bell as BellIcon,
} from "lucide-react";
import { CONTAINER, G, PRIMARY, PRIMARY_LIGHT } from "../../constants/theme";
import { CategoryStrip, NearbyStoreIcon } from "../index";
import { LOGO_SRC } from "../../constants/branding";
import { pageToPath, STORE_ROUTES } from "../../routes/storefrontRoutes";

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Products", page: "products" },
  { label: "Services", page: "services" },
  { label: "Get Franchise", page: "franchise" },
  { label: "Contact", page: "contact" },
];

export function Header(props: any) {
  const {
    page,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    filterBrand,
    setFilterBrand,
    cartCount,
    wishlist,
    navigate,
    isAuthenticated,
    openAuthModal,
  } = props;

  const goToAccountOrAuth = () => {
    if (isAuthenticated) navigate("account");
    else openAuthModal?.("login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link-laptop text-xs xl:text-sm font-semibold px-2 xl:px-3.5 py-1 rounded-full whitespace-nowrap transition-all ${isActive ? "is-active" : ""}`;

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? { color: PRIMARY, background: PRIMARY_LIGHT, fontWeight: 700 } : { color: "#374151" };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b w-full" style={{ borderColor: G[100] }}>
      {/* Top Main Row */}
      <div className="w-full px-4 lg:px-6 py-1.5 flex items-center justify-between gap-2 md:gap-4">
        
        {/* Logo Section - Enhanced height & alignment for laptop view */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <button className="lg:hidden flex-shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <NavLink to={STORE_ROUTES.home} className="min-w-0 flex items-center gap-1.5 md:gap-2 text-left self-center">
            <img 
              src={LOGO_SRC} 
              alt="Matti Tatva Logo" 
              className="h-7 md:h-9 lg:h-11 w-auto object-contain flex-shrink-0 align-middle" 
            />
            <span
              className="hidden sm:block text-[10px] md:text-xs font-extrabold tracking-wide uppercase max-w-[140px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[300px] leading-tight transition-colors hover:opacity-90 truncate lg:whitespace-normal"
              style={{ color: PRIMARY, fontFamily: "'Playfair Display', serif" }}
            >
              MATTI TATVA AGRO INDUSTRIES PVT. LTD.
            </span>
          </NavLink>
        </div>

        {/* Laptop Navigation - Full Center Space Coverage & Fluid Responsive */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2.5 mx-2 min-w-0 overflow-x-auto no-scrollbar">
          {navLinks.map(l => (
            <NavLink
              key={l.page}
              to={pageToPath(l.page)}
              className={navLinkClass}
              style={navLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          
          {/* Nearby Shop Link after Contact */}
          <NavLink
            to={STORE_ROUTES.nearby}
            className={navLinkClass}
            style={navLinkStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-1">
              <NearbyStoreIcon size={14} active={page === "nearby"} /> Nearby Store
            </span>
          </NavLink>
        </nav>

        {/* Action Buttons & Account - Perfectly Fits in laptop view without clipping */}
        <div className="flex items-center gap-1 xl:gap-2 flex-shrink-0">
          {/* Notification Icon */}
          <button type="button" className="w-8 h-8 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors">
            <BellIcon size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>

          {/* Wishlist Icon */}
          <NavLink to={STORE_ROUTES.wishlist} className="w-8 h-8 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors">
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 text-white text-[8px] font-bold rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                {wishlist.length}
              </span>
            )}
          </NavLink>

          {/* Cart Icon */}
          <NavLink to={STORE_ROUTES.cart} className="w-8 h-8 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors mr-1">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 text-white text-[8px] font-bold rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Account/Login Button - Always Visible on Right Edge */}
          <button 
            type="button" 
            onClick={goToAccountOrAuth} 
            className="flex items-center gap-1 text-xs xl:text-sm font-bold px-2.5 xl:px-4 py-1.5 rounded-full border hover:bg-green-50 transition-all shadow-sm flex-shrink-0" 
            style={{ color: PRIMARY, borderColor: PRIMARY_LIGHT }}
          >
            <User size={16} /> 
            <span>{isAuthenticated ? "Account" : "Login"}</span>
          </button>
        </div>
      </div>

      {/* Search Bar Row */}
      <div className={`${CONTAINER} pb-1.5 flex justify-center`}>
        <div className="flex items-center gap-2 rounded-full px-3 py-1.5 border bg-gray-50 w-full lg:max-w-md xl:max-w-lg mx-auto" style={{ borderColor: G[200] }}>
          <Search size={15} style={{ color: PRIMARY }} className="flex-shrink-0" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") navigate("products");
            }}
            placeholder="Search products, seeds, fertilizers…"
            className="flex-1 min-w-0 bg-transparent outline-none text-xs placeholder:text-gray-400"
          />
          {searchQuery && <button onClick={() => setSearchQuery("")}><X size={14} className="text-gray-400" /></button>}
        </div>
      </div>

      {/* CHANGED: Laptop view padding completely optimized to reduce height for Doctor, Organic strip */}
      {(page === "home" || page === "products") && (
        <div className="w-full lg:py-0 border-t overflow-hidden bg-transparent lg:[&_button]:py-0.5 lg:[&_button]:my-0 lg:[&_button]:text-[11px] lg:[&_img]:h-3.5 lg:[&_div]:gap-1.5">
          <CategoryStrip
            activeId={filterBrand}
            onSelect={id => {
              setFilterBrand(id);
              navigate("products");
            }}
          />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white py-1" style={{ borderColor: G[100] }}>
          {navLinks.map(l => (
            <NavLink
              key={l.page}
              to={pageToPath(l.page)}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${isActive ? "" : ""}`
              }
              style={({ isActive }) =>
                isActive ? { color: PRIMARY, background: PRIMARY_LIGHT } : { color: "#374151" }
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to={STORE_ROUTES.nearby}
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-2 text-sm font-semibold text-gray-700"
          >
            Nearby Store
          </NavLink>
          <div className="px-5 pt-2 border-t mt-1" style={{ borderColor: G[100] }}>
            <button onClick={goToAccountOrAuth} className="flex items-center gap-2 text-xs font-bold" style={{ color: PRIMARY }}>
              <User size={12} /> {isAuthenticated ? "My Account" : "Login / Sign Up"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}