import { NavLink } from "react-router";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import type { Page } from "../../types";
import { PRIMARY, PRIMARY_DARK } from "../../constants/theme";
import { NearbyStoreIcon } from "../index";
import { pageToPath, STORE_ROUTES } from "../../routes/storefrontRoutes";

export function MobileNav(props: any) {
  const {
    page,
    cartCount,
    isAuthenticated,
    openAuthModal,
  } = props;

  const tabs: { label: string; p: Page; center?: boolean; kind: "home" | "nearby" | "products" | "cart" | "account" }[] = [
    { label: "Home", p: "home", kind: "home" },
    { label: "Products", p: "products", kind: "products" },
    { label: "Nearby", p: "nearby", center: true, kind: "nearby" },
    { label: "Cart", p: "cart", kind: "cart" },
    { label: "Account", p: "account", kind: "account" },
  ];

  const renderIcon = (kind: typeof tabs[0]["kind"], active: boolean, large = false) => {
    const sz = large ? 26 : 20;
    const color = active ? PRIMARY : "#9ca3af";
    if (kind === "nearby") return <NearbyStoreIcon size={large ? 22 : 18} active={active} />;
    if (kind === "home") return <Home size={sz} style={{ color: large ? "#fff" : color }} strokeWidth={active ? 2.5 : 2} />;
    if (kind === "products") return <LayoutGrid size={sz} style={{ color: large ? "#fff" : color }} strokeWidth={active ? 2.5 : 2} />;
    if (kind === "cart") return <ShoppingCart size={sz} style={{ color: large ? "#fff" : color }} strokeWidth={active ? 2.5 : 2} />;
    return <User size={sz} style={{ color: large ? "#fff" : color }} strokeWidth={active ? 2.5 : 2} />;
  };

  const tabPath = (p: Page) => {
    if (p === "account" && !isAuthenticated) return STORE_ROUTES.login;
    return pageToPath(p);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden z-40 pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-[72px] pointer-events-auto">
        <svg className="absolute bottom-0 w-full h-[72px]" viewBox="0 0 400 72" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0,24 L0,72 L400,72 L400,24 C340,24 320,8 280,8 C240,8 220,0 200,0 C180,0 160,8 120,8 C80,8 60,24 0,24 Z"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative flex items-end justify-around px-1 pb-2 pt-1 pointer-events-auto" style={{ minHeight: 72 }}>
        {tabs.map(({ label, p, center, kind }) => {
          const active = page === p;
          const to = tabPath(p);

          if (center) {
            return (
              <NavLink
                key={p}
                to={to}
                onClick={e => {
                  if (p === "account" && !isAuthenticated) {
                    e.preventDefault();
                    openAuthModal?.("login");
                  }
                }}
                className="flex flex-col items-center -mt-7 relative z-10"
              >
                <div
                  className="w-[58px] h-[58px] rounded-full flex items-center justify-center border-4 border-white"
                  style={{
                    background: `linear-gradient(145deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                    boxShadow: "0 6px 18px rgba(36,104,65,0.45), 0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  {renderIcon(kind, active, true)}
                </div>
                <span className="text-[9px] font-bold mt-1" style={{ color: active ? PRIMARY : "#6b7280" }}>{label}</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={p}
              to={to}
              onClick={e => {
                if (p === "account" && !isAuthenticated) {
                  e.preventDefault();
                  openAuthModal?.("login");
                }
              }}
              className="flex flex-col items-center gap-0.5 px-2 py-1 relative min-w-[52px]"
              style={{ color: active ? PRIMARY : "#9ca3af" }}
            >
              {renderIcon(kind, active)}
              <span className={`text-[9px] ${active ? "font-bold" : "font-medium"}`}>{label}</span>
              {p === "cart" && cartCount > 0 && (
                <span className="absolute top-0 right-1 w-4 h-4 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white" style={{ background: PRIMARY }}>
                  {cartCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
