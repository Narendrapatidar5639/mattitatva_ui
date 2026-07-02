import type { AdminSession } from "../admin/types";
import { ADMIN_ROUTES } from "../admin/routes";

export const ADMIN_SESSION_KEY = "maati_admin_session";
// Ab tokens ko ham localStorage mein dekhenge taaki page refresh par auth na ude
export const TOKEN_KEY = "matti_token"; 
export const USER_AUTH_KEY = "maati_user_auth";

/** Unified storefront login route. */
export const STOREFRONT_LOGIN_URL = "/login";

/** 
 * REMOVED Static hardcoded admin credentials.
 * Ab verification backend se aane waale handleUserRouting data par depend karegi.
 */

export function loadAdminSession(): AdminSession | null {
  try {
    // Agar session local ya session dono jagah save ho sake, toh hum safe fallback rakh rahe hain
    const raw = localStorage.getItem(ADMIN_SESSION_KEY) || sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function persistAdminSession(session: AdminSession): void {
  // Session details ko dono jagah backup rakh rahe hain taaki login bounce na ho
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function isUserAuthenticated(): boolean {
  return (
    sessionStorage.getItem(USER_AUTH_KEY) === "true" ||  // 1. Kya session me key h?
    localStorage.getItem(USER_AUTH_KEY) === "true" ||   // 2. Kya local storage me key h?
    !!localStorage.getItem(TOKEN_KEY)                    // 3. Kya backend se mila token active h?
  );
}

export function persistUserAuth(): void {
  localStorage.setItem(USER_AUTH_KEY, "true");
  sessionStorage.setItem(USER_AUTH_KEY, "true");
}

export function clearUserAuth(): void {
  localStorage.removeItem(USER_AUTH_KEY);
  sessionStorage.removeItem(USER_AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function redirectToStorefrontLogin(): void {
  window.location.replace(STOREFRONT_LOGIN_URL);
}

export function redirectToAdminDashboard(): void {
  window.location.assign(ADMIN_ROUTES.dashboard || "/admin/dashboard");
}