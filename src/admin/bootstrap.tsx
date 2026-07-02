import type { ReactElement } from "react";
import App from "../app/App";
import { AdminApp } from "./AdminApp";

/**
 * Redirect legacy hash admin URLs (/#/admin/...) to pathname routes (/admin/...).
 * Triggers a full navigation; call before rendering the root element.
 */
export function redirectLegacyAdminHash(): boolean {
  const { hash, search } = window.location;
  if (hash.startsWith("#/admin")) {
    window.location.replace(`${hash.slice(1)}${search}`);
    return true;
  }
  return false;
}

export function isAdminPathname(): boolean {
  return window.location.pathname.startsWith("/admin");
}

/** Choose storefront or admin tree without altering storefront page routing. */
export function resolveRootElement(): ReactElement {
  return isAdminPathname() ? <AdminApp /> : <App />;
}
