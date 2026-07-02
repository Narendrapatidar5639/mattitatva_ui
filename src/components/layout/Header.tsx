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
    `nav-link-laptop text-base xl:text-[17px] font-semibold px-3.5 xl:px-4 py-2 xl:py-2.5 rounded-full whitespace-nowrap ${isActive ? "is-active" : ""}`;

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? { color: PRIMARY, background: PRIMARY_LIGHT, fontWeight: 700 } : { color: "#374151" };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b w-full" style={{ borderColor: G[100] }}>
      <div className={`${CONTAINER} py-2.5 lg:py-3.5 flex items-center gap-2 lg:gap-6`}>
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0 min-w-0">
          <button className="lg:hidden flex-shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <NavLink to={STORE_ROUTES.home} className="min-w-0 flex items-center gap-2.5 md:gap-3 text-left">
            <img src={LOGO_SRC} alt="Matti Tatva Logo" className="h-10 md:h-12 w-auto object-contain flex-shrink-0" />
            <span
              className="hidden sm:block text-xs md:text-sm font-extrabold tracking-wide uppercase max-w-[180px] md:max-w-[220px] leading-tight transition-colors hover:opacity-90"
              style={{ color: PRIMARY, fontFamily: "'Playfair Display', serif" }}
            >
              Matti Tatva Agro Industries Pvt. Ltd.
            </span>
          </NavLink>
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 flex-shrink-0 flex-wrap ml-4 xl:ml-8">
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
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 flex-shrink-0 ml-auto">
          <button type="button" onClick={goToAccountOrAuth} className="nav-icon-laptop hidden md:flex items-center gap-2 text-sm lg:text-base font-semibold px-3 lg:px-4 py-2 lg:py-2.5 rounded-full hover:bg-green-50 transition-colors" style={{ color: PRIMARY }}>
            <User size={20} className="lg:w-[22px] lg:h-[22px]" /> {isAuthenticated ? "Account" : "Login"}
          </button>
          <button type="button" className="nav-icon-laptop w-10 h-10 lg:w-11 lg:h-11 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors">
            <BellIcon size={20} className="lg:w-[22px] lg:h-[22px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <NavLink to={STORE_ROUTES.wishlist} className="nav-icon-laptop w-10 h-10 lg:w-11 lg:h-11 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors">
            <Heart size={20} className="lg:w-[22px] lg:h-[22px]" />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                {wishlist.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to={STORE_ROUTES.nearby}
            title="Nearby Shop"
            className="nav-icon-laptop w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-full hover:bg-green-50 transition-colors"
            style={{ color: page === "nearby" ? PRIMARY : "#6b7280" }}
          >
            <NearbyStoreIcon size={20} active={page === "nearby"} />
          </NavLink>
          <NavLink to={STORE_ROUTES.cart} className="nav-icon-laptop w-10 h-10 lg:w-11 lg:h-11 relative flex items-center justify-center rounded-full hover:bg-green-50 text-gray-500 transition-colors">
            <ShoppingCart size={20} className="lg:w-[22px] lg:h-[22px]" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      <div className={`${CONTAINER} pb-2.5 sm:pb-3 flex justify-center`}>
        <div className="flex items-center gap-2 sm:gap-3 rounded-full px-4 py-3 sm:py-3.5 lg:py-2 lg:px-4 border bg-gray-50 w-full lg:max-w-md xl:max-w-lg mx-auto" style={{ borderColor: G[200] }}>
          <Search size={18} style={{ color: PRIMARY }} className="flex-shrink-0 lg:w-4 lg:h-4" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") navigate("products");
            }}
            placeholder="Search products, seeds, fertilizers…"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm lg:text-sm placeholder:text-gray-400"
          />
          {searchQuery && <button onClick={() => setSearchQuery("")}><X size={15} className="text-gray-400" /></button>}
        </div>
      </div>

      <CategoryStrip
        activeId={filterBrand}
        onSelect={id => {
          setFilterBrand(id);
          navigate("products");
        }}
      />

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white py-2" style={{ borderColor: G[100] }}>
          {navLinks.map(l => (
            <NavLink
              key={l.page}
              to={pageToPath(l.page)}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-5 py-3.5 text-base font-semibold transition-colors ${isActive ? "" : ""}`
              }
              style={({ isActive }) =>
                isActive ? { color: PRIMARY, background: PRIMARY_LIGHT } : { color: "#374151" }
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="px-6 pt-3 border-t mt-1" style={{ borderColor: G[100] }}>
            <button onClick={goToAccountOrAuth} className="flex items-center gap-2 text-sm font-bold" style={{ color: PRIMARY }}>
              <User size={14} /> {isAuthenticated ? "My Account" : "Login / Sign Up"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
