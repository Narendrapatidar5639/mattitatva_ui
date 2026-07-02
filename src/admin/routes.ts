/** Browser-router paths for the Maati Tatva admin panel (e.g. /admin/dashboard). */
export const ADMIN_ROUTES = {
  root: "/admin",
  dashboard: "/admin/dashboard",
  products: "/admin/products",
  orders: "/admin/orders",
  shipping: "/admin/shipping",
} as const;

export type AdminRoutePath = (typeof ADMIN_ROUTES)[keyof typeof ADMIN_ROUTES];

const ROOT_PREFIX = `${ADMIN_ROUTES.root}/`;

/** Protected child segments derived from full ADMIN_ROUTES paths (for nested routes under root). */
export const ADMIN_CHILD_PATHS = {
  dashboard: adminSegment(ADMIN_ROUTES.dashboard),
  products: adminSegment(ADMIN_ROUTES.products),
  orders: adminSegment(ADMIN_ROUTES.orders),
  shipping: adminSegment(ADMIN_ROUTES.shipping),
} as const;

/** Returns the path segment after `/admin/` for use in nested `<Route path={...} />`. */
export function adminSegment(fullPath: AdminRoutePath): string {
  if (fullPath === ADMIN_ROUTES.root) {
    throw new Error(`${fullPath} is not a nested child of ${ADMIN_ROUTES.root}`);
  }
  if (!fullPath.startsWith(ROOT_PREFIX)) {
    throw new Error(`${fullPath} is not nested under ${ADMIN_ROUTES.root}`);
  }
  return fullPath.slice(ROOT_PREFIX.length);
}
