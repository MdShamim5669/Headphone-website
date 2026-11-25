import "server-only";
import type { PricedOrder } from "../pricing";

/** SSLCommerz (Bangladesh: bKash, Nagad, Rocket, local + intl cards). Docs: https://developer.sslcommerz.com/doc/v4/
 *  SSLCOMMERZ_LIVE=1 → securepay, otherwise sandbox. Prices are USD in products.json; we convert with BDT_PER_USD. */
const base = () => (process.env.SSLCOMMERZ_LIVE === "1" ? "https://securepay.sslcommerz.com" : "https://sandbox.sslcommerz.com");
const creds = () => ({ store_id: process.env.SSLCOMMERZ_STORE_ID!, store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD! });
export const sslCurrency = () => (process.env.SSLCOMMERZ_CURRENCY || "BDT").toUpperCase();
export const toSslAmount = (usd: number) =>
  sslCurrency() === "BDT" ? Math.round(usd * Number(process.env.BDT_PER_USD || 120) * 100) / 100 : Math.round(usd * 100) / 100;

export interface Customer { name: string; email: string; phone: string; address: string; city: string; zip: string; country: string }

export async function createSslSession(o: PricedOrder, orderId: string, c: Customer, origin: string) {
  const cb = `${origin}/api/checkout/sslcommerz`;
  const body = new URLSearchParams({
    ...creds(),
    total_amount: toSslAmount(o.total).toFixed(2),
    currency: sslCurrency(),
    tran_id: orderId,
    success_url: `${cb}/success`, fail_url: `${cb}/fail`, cancel_url: `${cb}/cancel`, ipn_url: `${cb}/ipn`,
    cus_name: c.name, cus_email: c.email, cus_phone: c.phone, cus_add1: c.address, cus_city: c.city, cus_postcode: c.zip, cus_country: c.country,
    shipping_method: "Courier", num_of_item: String(o.lines.reduce((a, l) => a + l.qty, 0)),
    ship_name: c.name, ship_add1: c.address, ship_city: c.city, ship_postcode: c.zip, ship_country: c.country,
    product_name: o.lines.map((l) => `${l.name} (${l.variant}) x${l.qty}`).join(", ").slice(0, 250),
    product_category: "Electronics", product_profile: "physical-goods",
    value_a: c.email, value_b: o.coupon || "", value_c: o.ship,
  });
  const res = await fetch(`${base()}/gwprocess/v4/api.php`, { method: "POST", body, cache: "no-store" });
  const j = await res.json().catch(() => ({}));
  if (j?.status !== "SUCCESS" || !j?.GatewayPageURL) throw new Error(j?.failedreason || "Could not start SSLCommerz payment.");
  return { url: j.GatewayPageURL as string, sessionKey: j.sessionkey as string };
}

/** Server-to-server validation of a val_id. Never trust the browser POST alone. */
export async function validateSsl(valId: string) {
  if (!/^[A-Za-z0-9]+$/.test(valId)) throw new Error("Bad val_id");
  const q = new URLSearchParams({ val_id: valId, ...creds(), format: "json" });
  const res = await fetch(`${base()}/validator/api/validationserverAPI.php?${q}`, { cache: "no-store" });
  const j = await res.json();
  return {
    paid: j?.status === "VALID" || j?.status === "VALIDATED",
    amount: Number(j?.amount || 0), currency: String(j?.currency || sslCurrency()),
    orderId: String(j?.tran_id || ""), email: j?.value_a as string | undefined, method: j?.card_type as string | undefined,
  };
}
