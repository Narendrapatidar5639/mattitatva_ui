import React, { createContext, useContext, useState, useEffect } from "react";

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
    // Sirf ek simple check: Kya browser me admin ka thappa (flag) laga hua hai?
    const isAdmin = localStorage.getItem("is_maati_admin") === "true";
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