import { NavLink, Outlet } from "react-router";
import { LayoutDashboard, LogOut, Package, ShoppingCart, Truck } from "lucide-react";
import { LOGO_SRC } from "../../constants/branding";
import { FONT_BODY, G, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT } from "../../constants/theme";
import { ADMIN_ROUTES } from "../routes";

const NAV = [
  { to: ADMIN_ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { to: ADMIN_ROUTES.products, label: "Products", icon: Package },
  { to: ADMIN_ROUTES.orders, label: "Orders", icon: ShoppingCart },
  { to: ADMIN_ROUTES.shipping, label: "Shipping", icon: Truck },
] as const;

function navClass({ isActive }: { isActive: boolean }) {
  return [
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
    isActive ? "text-white shadow-md" : "text-gray-600 hover:bg-green-50 hover:text-green-800",
  ].join(" ");
}

function mobileNavClass({ isActive }: { isActive: boolean }) {
  return [
    "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors",
    isActive ? "text-white" : "text-gray-600 bg-gray-100",
  ].join(" ");
}

export function AdminLayout() {
  // Static check bypassing context loops
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login"; // Break layout flow instantly
  };

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ fontFamily: FONT_BODY }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white" style={{ borderColor: G[100] }}>
        <div className="p-5 border-b" style={{ borderColor: G[100] }}>
          <NavLink to={ADMIN_ROUTES.dashboard} className="block group">
            <div className="flex flex-col items-center gap-2 text-center">
              <img
                src={LOGO_SRC}
                alt="Maati Tatva"
                className="h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
              <div>
                <p className="text-xs font-bold" style={{ color: PRIMARY }}>Admin Panel</p>
                <p className="text-[10px] text-gray-500">Maati Tatva Agro</p>
              </div>
            </div>
          </NavLink>
        </div>

        <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={navClass}
              style={({ isActive }) => (isActive ? { background: PRIMARY } : undefined)}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User profile drawer fixed placeholder */}
        <div className="p-4 border-t" style={{ borderColor: G[100] }}>
          <div className="flex items-center gap-2 mb-3 px-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: PRIMARY_LIGHT, color: PRIMARY }}>
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">Maati Tatva Admin</p>
              <p className="text-[10px] text-gray-500 truncate">admin@gmail.com</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between" style={{ borderColor: G[100] }}>
          <NavLink to={ADMIN_ROUTES.dashboard} className="flex items-center gap-2">
            <img src={LOGO_SRC} alt="Maati Tatva" className="h-9 w-auto object-contain" />
            <span className="text-sm font-bold" style={{ color: PRIMARY_DARK }}>Admin</span>
          </NavLink>
          <button type="button" onClick={handleLogout} className="text-xs font-bold text-red-600">Logout</button>
        </header>

        {/* Mobile Scroller Navigation */}
        <div className="lg:hidden overflow-x-auto border-b bg-white px-3 py-2 flex gap-2" style={{ borderColor: G[100] }}>
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={mobileNavClass}
              style={({ isActive }) => (isActive ? { background: PRIMARY } : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Nested Content Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}