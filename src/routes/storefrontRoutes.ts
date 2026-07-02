import type { Page, Product } from "../types";

/** Storefront browser paths (BrowserRouter at app root). */
export const STORE_ROUTES = {
  home: "/",
  products: "/products",
  cart: "/cart",
  checkout: "/checkout",
  account: "/account",
  orders: "/orders",
  wishlist: "/wishlist",
  contact: "/contact",
  about: "/about",
  events: "/events",
  services: "/services",
  nearby: "/nearby",
  franchise: "/franchise",
  soilHealth: "/services/soil-health",
  cropHealth: "/services/crop-health",
  contractFarming: "/services/contract-farming",
  login: "/login",
  signup: "/signup",
} as const;

export function productDetailPath(product: Product | number): string {
  const id = typeof product === "number" ? product : product.id;
  return `/products/${id}`;
}

export function pageToPath(page: Page, product?: Product): string {
  const paths: Record<Page, string> = {
    home: STORE_ROUTES.home,
    products: STORE_ROUTES.products,
    "product-detail": product ? productDetailPath(product) : STORE_ROUTES.products,
    cart: STORE_ROUTES.cart,
    checkout: STORE_ROUTES.checkout,
    account: STORE_ROUTES.account,
    orders: STORE_ROUTES.orders,
    wishlist: STORE_ROUTES.wishlist,
    contact: STORE_ROUTES.contact,
    about: STORE_ROUTES.about,
    events: STORE_ROUTES.events,
    services: STORE_ROUTES.services,
    nearby: STORE_ROUTES.nearby,
    franchise: STORE_ROUTES.franchise,
    "soil-health": STORE_ROUTES.soilHealth,
    "crop-health": STORE_ROUTES.cropHealth,
    "contract-farming": STORE_ROUTES.contractFarming,
  };
  return paths[page];
}

export function pathToPage(pathname: string): Page {
  if (pathname === "/" || pathname === "") return "home";
  if (/^\/products\/\d+/.test(pathname)) return "product-detail";
  if (pathname === STORE_ROUTES.products) return "products";
  if (pathname === STORE_ROUTES.cart) return "cart";
  if (pathname === STORE_ROUTES.checkout) return "checkout";
  if (pathname === STORE_ROUTES.account) return "account";
  if (pathname === STORE_ROUTES.orders) return "orders";
  if (pathname === STORE_ROUTES.wishlist) return "wishlist";
  if (pathname === STORE_ROUTES.contact) return "contact";
  if (pathname === STORE_ROUTES.about) return "about";
  if (pathname === STORE_ROUTES.events) return "events";
  if (pathname === STORE_ROUTES.services) return "services";
  if (pathname === STORE_ROUTES.nearby) return "nearby";
  if (pathname === STORE_ROUTES.franchise) return "franchise";
  if (pathname === STORE_ROUTES.soilHealth) return "soil-health";
  if (pathname === STORE_ROUTES.cropHealth) return "crop-health";
  if (pathname === STORE_ROUTES.contractFarming) return "contract-farming";
  return "home";
}

export function isAuthPath(pathname: string): boolean {
  return pathname === STORE_ROUTES.login || pathname === STORE_ROUTES.signup;
}

export function authModeFromPath(pathname: string): "login" | "signup" {
  return pathname === STORE_ROUTES.signup ? "signup" : "login";
}

/** Redirect legacy hash auth URLs (#login, #signup) to pathname routes. */
export function redirectLegacyAuthHash(): boolean {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "login" || hash === "signup") {
    const target = hash === "signup" ? STORE_ROUTES.signup : STORE_ROUTES.login;
    window.location.replace(`${target}${window.location.search}`);
    return true;
  }
  return false;
}
