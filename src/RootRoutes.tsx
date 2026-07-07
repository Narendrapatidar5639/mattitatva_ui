import { Navigate, Outlet, Route, Routes } from "react-router";
import App from "./app/App";
import { AdminDashboard } from "./admin/AdminDashboard";
import { ProductUpload } from "./admin/ProductUpload";
import { OrderManagement } from "./admin/OrderManagement";
import { Shipping } from "./admin/Shipping";
import { AdminLayout } from "./admin/components/AdminLayout";
import { AdminAuthProvider, useAdminAuth } from "./admin/context/AdminAuthContext";
import { ADMIN_CHILD_PATHS, ADMIN_ROUTES } from "./admin/routes";
import { STORE_ROUTES } from "./routes/storefrontRoutes";

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

function AdminRouteBranch() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}

/**
 * Single router tree for storefront + admin.
 * Admin routes are nested under /admin with AdminLayout <Outlet /> for child pages.
 */
export function RootRoutes() {
  return (
    <Routes>
      <Route path={ADMIN_ROUTES.root} element={<AdminRouteBranch />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to={ADMIN_CHILD_PATHS.dashboard} replace />} />
          <Route path={ADMIN_CHILD_PATHS.dashboard} element={<AdminDashboard />} />
          <Route path={ADMIN_CHILD_PATHS.products} element={<ProductUpload />} />
          <Route path={ADMIN_CHILD_PATHS.orders} element={<OrderManagement />} />
          <Route path={ADMIN_CHILD_PATHS.shipping} element={<Shipping />} />
        </Route>
      </Route>

      <Route path="/*" element={<App />} />
    </Routes>
  );
}
