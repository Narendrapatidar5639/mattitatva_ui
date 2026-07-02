export function formatPrice(price: number, decimals = false) {
  return "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: decimals ? 2 : 0 });
}
