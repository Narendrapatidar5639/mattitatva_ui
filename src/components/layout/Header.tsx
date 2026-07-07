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
    `nav-link-laptop text-sm xl:text-[15px] font-semibold px-3 xl:px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${isActive ? "is-active" : ""}`;

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? { color: PRIMARY, background: PRIMARY_LIGHT, fontWeight: 700 } : { color: "#374151" };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b w-full" style={{ borderColor: G[100] }}>
      {/* Top Main Row */}
      <div className={`${CONTAINER} py-1.5 lg:py-2 flex items-center justify-between gap-4 w-full`}>
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0 min-w-0">
          <button className="lg:hidden flex-shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <NavLink to={STORE_ROUTES.home} className="min-w-0 flex items-center gap-2 md:gap-2.5 text-left">
            <img src={LOGO_SRC} alt="Matti Tatva Logo" className="h-8 md:h-10 w-auto object-contain flex-shrink-0" />
            <span
              className="hidden sm:block text-[11px] md:text-xs font-extrabold tracking-wide uppercase max-w-[160px] md:max-w-[200px] leading-tight transition-colors hover:opacity-90"
              style={{ color: PRIMARY, fontFamily: "'Playfair Display', serif" }}
            >
              Matti Tatva Agro Industries Pvt. Ltd.
            </span>
          </NavLink>
        </div>

        {/* Laptop Navigation - Covers Full Center Space Horizontally */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-3 max-w-5xl mx-4">
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
          
          {/* Nearby Shop Integrated perfectly after Contact */}
          <NavLink
            to={STORE_ROUTES.nearby}
            className={navLinkClass}
            style={navLinkStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-1">
              <NearbyStoreIcon size={16} active={page === "nearby"} /> Nearby Store
            </span>
          </NavLink>
        </nav>

        {/* Action Buttons & Account - End of Right Side Edge */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-auto lg:ml-0">
          {/* Notification Icon */}
          <button type="button" className="nav-icon-laptop w-8 h-8 lg:w-9 lg:h-9 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors">
            <BellIcon size={18} className="lg:w-[20px] lg:h-[20px]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>

          {/* Wishlist Icon */}
          <NavLink to={STORE_ROUTES.wishlist} className="nav-icon-laptop w-8 h-8 lg:w-9 lg:h-9 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors">
            <Heart size={18} className="lg:w-[20px] lg:h-[20px]" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 text-white text-[8px] font-bold rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                {wishlist.length}
              </span>
            )}
          </NavLink>

          {/* Cart Icon */}
          <NavLink to={STORE_ROUTES.cart} className="nav-icon-laptop w-8 h-8 lg:w-9 lg:h-9 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors mr-1 lg:mr-2">
            <ShoppingCart size={18} className="lg:w-[20px] lg:h-[20px]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 text-white text-[8px] font-bold rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Account/Login Button - Always pushed to the Far Right Edge */}
          <button 
            type="button" 
            onClick={goToAccountOrAuth} 
            className="nav-icon-laptop flex items-center gap-1.5 text-sm font-bold px-3.5 py-1.5 rounded-full border hover:bg-green-50 transition-all shadow-sm" 
            style={{ color: PRIMARY, borderColor: PRIMARY_LIGHT }}
          >
            <User size={18} className="lg:w-[19px] lg:h-[19px]" /> 
            <span>{isAuthenticated ? "Account" : "Login"}</span>
          </button>
        </div>
      </div>

      {/* Search Bar Row - Compact Layout */}
      <div className={`${CONTAINER} pb-1.5 sm:pb-2 flex justify-center`}>
        <div className="flex items-center gap-2 rounded-full px-3 py-1.5 sm:py-2 lg:py-1.5 lg:px-4 border bg-gray-50 w-full lg:max-w-md xl:max-w-lg mx-auto" style={{ borderColor: G[200] }}>
          <Search size={16} style={{ color: PRIMARY }} className="flex-shrink-0 lg:w-4 lg:h-4" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") navigate("products");
            }}
            placeholder="Search products, seeds, fertilizers…"
            className="flex-1 min-w-0 bg-transparent outline-none text-xs lg:text-sm placeholder:text-gray-400"
          />
          {searchQuery && <button onClick={() => setSearchQuery("")}><X size={14} className="text-gray-400" /></button>}
        </div>
      </div>

      {/* CategoryStrip (Doctor, Organic, Maatifresh, Ayurved) - Full Width Background */}
      {(page === "home" || page === "products") && (
        <div className="w-full lg:-mt-2 lg:-mb-2 overflow-hidden">
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
                `block w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${isActive ? "" : ""}`
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
            className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700"
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