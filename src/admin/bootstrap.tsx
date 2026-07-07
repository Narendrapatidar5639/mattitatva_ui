import type { ReactElement } from "react";
import { RootRoutes } from "../RootRoutes";

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

/** Legacy helper — routing is unified in RootRoutes (main.tsx). */
export function resolveRootElement(): ReactElement {
  return <RootRoutes />;
}
