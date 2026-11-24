import clsx, { type ClassValue } from "clsx";
export const cn = (...c: ClassValue[]) => clsx(c);
export const money = (n: number, cur = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format(n);
export const COUPONS: Record<string, number> = { SONIQ10: 0.1, WELCOME15: 0.15 };
export const SHIPPING_FREE_OVER = 150;
export const SHIPPING_FLAT = 9.99;
export const TAX_RATE = 0.05;
export function totals(subtotal: number, coupon?: string | null) {
  const discount = coupon && COUPONS[coupon] ? subtotal * COUPONS[coupon] : 0;
  const after = subtotal - discount;
  const shipping = subtotal === 0 || after >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FLAT;
  const tax = after * TAX_RATE;
  return { subtotal, discount, shipping, tax, total: after + shipping + tax };
}
