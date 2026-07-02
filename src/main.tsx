import { createRoot } from "react-dom/client";
import { redirectLegacyAdminHash, resolveRootElement } from "./admin/bootstrap";
import "./styles/index.css";

// Check if the user is attempting to access an admin section
const isAdminPath = window.location.pathname.startsWith("/admin");

if (isAdminPath) {
  // Directly render the admin panel dashboard bundle 
  createRoot(document.getElementById("root")!).render(resolveRootElement());
} else if (!redirectLegacyAdminHash()) {
  // Otherwise render the normal customer storefront
  createRoot(document.getElementById("root")!).render(resolveRootElement());
}