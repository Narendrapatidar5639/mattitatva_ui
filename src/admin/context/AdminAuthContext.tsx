import React, { createContext, useContext, useState, useEffect } from "react";
import { loadAdminSession } from "../../auth/unifiedAuth";

interface AdminAuthContextType {
  session: boolean; // Ab ye object nahi, sirf true/false hoga
  authReady: boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<boolean>(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const isAdmin =
      localStorage.getItem("is_maati_admin") === "true" || !!loadAdminSession();
    setSession(isAdmin);
    setAuthReady(true);
  }, []);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setSession(false);
    window.location.replace("/login");
  };

  return (
    <AdminAuthContext.Provider value={{ session, authReady, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
}