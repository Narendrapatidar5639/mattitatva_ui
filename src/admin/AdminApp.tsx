import { useLayoutEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AdminAuthProvider,  useAdminAuth } from "./context/AdminAuthContext";
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./AdminDashboard";
import { ProductUpload } from "./ProductUpload";
import { OrderManagement } from "./OrderManagement";
import { Shipping } from "./Shipping";
import { ADMIN_CHILD_PATHS, ADMIN_ROUTES } from "./routes";

function StorefrontLoginRedirect() {
  const redirected = useRef(false);

  useLayoutEffect(() => {
    if (redirected.current) return;
    redirected.current = true;
    window.location.replace("/login");
  }, []);

  return <div className="min-h-screen bg-gray-50" aria-hidden="true" />;
}

// File: AdminApp.tsx me sirf ye ProtectedShell badal lijiye
function ProtectedShell() {
  const { session, authReady } = useAdminAuth();

  if (!authReady) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  // Agar session true nahi hai (yaani admin nahi hai), toh seedhe storefront login bhejo
  if (!session) {
    window.location.replace("/login");
    return null;
  }

  return <AdminLayout />;
}

function AdminFallback() {
  const { session, authReady } = useAdminAuth();

  if (!authReady) {
    return <div className="min-h-screen bg-gray-50" aria-hidden="true" />;
  }

  if (!session) {
    return <StorefrontLoginRedirect />;
  }

  return <Navigate to={ADMIN_ROUTES.dashboard} replace />;
}

export function AdminApp() {
  // KOI CONTEXT NHI, KOI IF-ELSE CHECK NHI, DIRECT DASHBOARD LOAD HOGA
  return (
    <BrowserRouter>
      <Routes>
        {/* Base Admin Layout */}
        <Route path={ADMIN_ROUTES.root} element={<AdminLayout />}>
          {/* Automatically redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to={ADMIN_ROUTES.dashboard} replace />} />
          
          {/* All Child Pages */}
          <Route path={ADMIN_CHILD_PATHS.dashboard} element={<AdminDashboard />} />
          <Route path={ADMIN_CHILD_PATHS.products} element={<ProductUpload />} />
          <Route path={ADMIN_CHILD_PATHS.orders} element={<OrderManagement />} />
          <Route path={ADMIN_CHILD_PATHS.shipping} element={<Shipping />} />
        </Route>

        {/* Catch-all route: Agar koi galat URL dale toh direct dashboard par bhejo */}
        <Route path="*" element={<Navigate to={ADMIN_ROUTES.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;