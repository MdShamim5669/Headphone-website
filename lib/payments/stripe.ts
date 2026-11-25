import "server-only";
import type { PricedOrder } from "../pricing";

/** Minimal Stripe REST client (no SDK). Docs: https://docs.stripe.com/api/checkout/sessions */
const API = "https://api.stripe.com/v1";
const cents = (n: number) => Math.round(n * 100);

function form(obj: Record<string, string | number | undefined>) {
  const b = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) if (v !== undefined && v !== "") b.append(k, String(v));
  return b;
}
async function stripe<T>(path: string, method: "GET" | "POST", body?: URLSearchParams): Promise<T> {
  const res = await fetch(API + path, {
    method, body, cache: "no-store",
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
  });
  const j = await res.json();
  if (!res.ok) throw new Error(j?.error?.message || `Stripe error ${res.status}`);
  return j as T;
}

export async function createStripeSession(o: PricedOrder, orderId: string, email: string, origin: string) {
  const cur = (process.env.STRIPE_CURRENCY || "usd").toLowerCase();
  const f: Record<string, string | number | undefined> = {
    mode: "payment",
    customer_email: email,
    client_reference_id: orderId,
    success_url: `${origin}/order/success?id=${orderId}&provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?cancelled=1`,
    "metadata[order_id]": orderId,
    "metadata[coupon]": o.coupon || "",
    "payment_intent_data[metadata][order_id]": orderId,
  };
  let i = 0;
  for (const l of o.lines) {
    f[`line_items[${i}][quantity]`] = l.qty;
    f[`line_items[${i}][price_data][currency]`] = cur;
    f[`line_items[${i}][price_data][unit_amount]`] = cents(l.unit);
    f[`line_items[${i}][price_data][product_data][name]`] = `${l.name} — ${l.variant}`;
    f[`line_items[${i}][price_data][product_data][metadata][sku]`] = l.sku;
    i++;
  }
  if (o.tax > 0) {
    f[`line_items[${i}][quantity]`] = 1;
    f[`line_items[${i}][price_data][currency]`] = cur;
    f[`line_items[${i}][price_data][unit_amount]`] = cents(o.tax);
    f[`line_items[${i}][price_data][product_data][name]`] = "Tax (5%)";
  }
  f["shipping_options[0][shipping_rate_data][type]"] = "fixed_amount";
  f["shipping_options[0][shipping_rate_data][display_name]"] = o.ship === "express" ? "Express · 1–2 days" : "Standard · 3–5 days";
  f["shipping_options[0][shipping_rate_data][fixed_amount][amount]"] = cents(o.shipping);
  f["shipping_options[0][shipping_rate_data][fixed_amount][currency]"] = cur;
  if (o.discount > 0) {
    // One-off coupon for the exact discount amount (Stripe doesn't allow negative line items).
    const c = await stripe<{ id: string }>("/coupons", "POST", form({ amount_off: cents(o.discount), currency: cur, duration: "once", name: o.coupon || "Discount" }));
    f["discounts[0][coupon]"] = c.id;
  }
  const s = await stripe<{ id: string; url: string }>("/checkout/sessions", "POST", form(f));
  return { id: s.id, url: s.url };
}

export async function getStripeSession(id: string) {
  if (!/^cs_[A-Za-z0-9_]+$/.test(id)) throw new Error("Bad session id");
  const s = await stripe<{ payment_status: string; amount_total: number; currency: string; client_reference_id: string; customer_details?: { email?: string } }>(
    `/checkout/sessions/${id}`, "GET");
  return { paid: s.payment_status === "paid", amount: s.amount_total / 100, currency: s.currency.toUpperCase(), orderId: s.client_reference_id, email: s.customer_details?.email };
}
