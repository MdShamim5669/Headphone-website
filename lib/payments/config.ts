import "server-only";
/** Which real payment providers are switched on (by env vars). Nothing set → demo mode. */
export const stripeEnabled = () => !!process.env.STRIPE_SECRET_KEY;
export const sslEnabled = () => !!(process.env.SSLCOMMERZ_STORE_ID && process.env.SSLCOMMERZ_STORE_PASSWORD);
export const providers = () => ({ stripe: stripeEnabled(), sslcommerz: sslEnabled(), cod: process.env.CHECKOUT_DISABLE_COD !== "1" });

/** Absolute site origin for provider redirect URLs. */
export function siteOrigin(req: Request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && !env.includes("localhost")) return env.replace(/\/$/, "");
  const h = req.headers;
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || "http";
  return host ? `${proto}://${host}` : (env || "http://localhost:3000").replace(/\/$/, "");
}
