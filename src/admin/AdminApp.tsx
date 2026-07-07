import { Navigate, Outlet, Route, Routes } from "react-router";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./AdminDashboard";
import { ProductUpload } from "./ProductUpload";
import { OrderManagement } from "./OrderManagement";
import { Shipping } from "./Shipping";
import { ADMIN_CHILD_PATHS, ADMIN_ROUTES } from "./routes";
import { STORE_ROUTES } from "../routes/storefrontRoutes";

function AdminGate() {
  const { session, authReady } = useAdminAuth();

  if (!authReady) {
    return <div className="min-h-screen bg-gray-50" aria-busy="true" />;
  }

  if (!session) {
    return <Navigate to={STORE_ROUTES.login} replace />;
  }

  return <Outlet />;
}

/** Auth wrapper used by the unified root router (`RootRoutes`). */
export function AdminRouteBranch() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}

/**
 * Standalone admin route tree (no BrowserRouter).
 * Prefer mounting via `RootRoutes` in main.tsx.
 */
export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminRouteBranch />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to={ADMIN_CHILD_PATHS.dashboard} replace />} />
          <Route path={ADMIN_CHILD_PATHS.dashboard} element={<AdminDashboard />} />
          <Route path={ADMIN_CHILD_PATHS.products} element={<ProductUpload />} />
          <Route path={ADMIN_CHILD_PATHS.orders} element={<OrderManagement />} />
          <Route path={ADMIN_CHILD_PATHS.shipping} element={<Shipping />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={`${ADMIN_ROUTES.root}/${ADMIN_CHILD_PATHS.dashboard}`} replace />} />
    </Routes>
  );
}

/** @deprecated Use RootRoutes — kept for legacy imports. */
export function AdminApp() {
  return <AdminRoutes />;
}

export default AdminApp;
