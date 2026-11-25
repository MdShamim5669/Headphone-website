import "server-only";
import { products } from "./products";
import { COUPONS, totals } from "./utils";

/** What the browser sends. Prices from the client are IGNORED — the server re-prices from data/products.json. */
export interface CheckoutItemInput { sku: string; qty: number }
export type ShipMethod = "standard" | "express";
export const EXPRESS_FEE = 15;
export const MAX_QTY = 10;

export interface PricedLine { sku: string; slug: string; name: string; variant: string; qty: number; unit: number }
export interface PricedOrder {
  lines: PricedLine[]; coupon: string | null; ship: ShipMethod;
  subtotal: number; discount: number; shipping: number; tax: number; total: number;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Rebuild the order on the server. Throws Error(message) for anything invalid. */
export function priceOrder(items: CheckoutItemInput[], coupon: string | null | undefined, ship: ShipMethod): PricedOrder {
  if (!Array.isArray(items) || !items.length) throw new Error("Your cart is empty.");
  if (items.length > 30) throw new Error("Too many items in one order.");
  const lines: PricedLine[] = [];
  for (const it of items) {
    const qty = Math.floor(Number(it?.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) throw new Error(`Quantity must be 1–${MAX_QTY}.`);
    const p = products.find((x) => x.variants.some((v) => v.sku === it.sku));
    const v = p?.variants.find((x) => x.sku === it.sku);
    if (!p || !v) throw new Error(`Unknown product (${String(it?.sku).slice(0, 40)}).`);
    if (p.stock < qty) throw new Error(`${p.name} has only ${p.stock} left.`);
    const ex = lines.find((l) => l.sku === v.sku);
    if (ex) ex.qty += qty; else lines.push({ sku: v.sku, slug: p.slug, name: p.name, variant: v.name, qty, unit: p.price });
  }
  const code = coupon ? String(coupon).trim().toUpperCase() : null;
  const validCoupon = code && COUPONS[code] ? code : null;
  const subtotal = lines.reduce((a, l) => a + l.qty * l.unit, 0);
  const t = totals(subtotal, validCoupon);
  const shipping = t.shipping + (ship === "express" ? EXPRESS_FEE : 0);
  return {
    lines, coupon: validCoupon, ship,
    subtotal: r2(t.subtotal), discount: r2(t.discount), shipping: r2(shipping), tax: r2(t.tax),
    total: r2(t.subtotal - t.discount + shipping + t.tax),
  };
}

export const newOrderId = () => "SQ-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
