import { NextResponse } from "next/server";
import { priceOrder, newOrderId, type CheckoutItemInput, type ShipMethod } from "@/lib/pricing";
import { providers, siteOrigin } from "@/lib/payments/config";
import { createStripeSession } from "@/lib/payments/stripe";
import { createSslSession, type Customer } from "@/lib/payments/sslcommerz";

export const dynamic = "force-dynamic";
type Pay = "card" | "mobile" | "cod";

/** GET → which providers are live (UI uses it to label "demo"). */
export function GET() {
  return NextResponse.json(providers());
}

/** POST { items:[{sku,qty}], coupon, ship, pay, customer } → { mode, orderId, order, url? }
 *  mode: "redirect" (go to provider url) | "cod" (order placed, pay on delivery) | "demo" (no provider configured). */
export async function POST(req: Request) {
  let b: { items?: CheckoutItemInput[]; coupon?: string | null; ship?: ShipMethod; pay?: Pay; customer?: Partial<Customer> };
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const c = b.customer || {};
  const str = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);
  const customer: Customer = { name: str(c.name, 80), email: str(c.email, 120), phone: str(c.phone, 30), address: str(c.address), city: str(c.city, 60), zip: str(c.zip, 12), country: str(c.country, 60) || "Bangladesh" };
  if (!/^\S+@\S+\.\S+$/.test(customer.email) || customer.name.length < 2 || customer.address.length < 5)
    return NextResponse.json({ error: "Please check your contact and shipping details." }, { status: 400 });
  const ship: ShipMethod = b.ship === "express" ? "express" : "standard";
  const pay: Pay = b.pay === "mobile" || b.pay === "cod" ? b.pay : "card";

  let order;
  try { order = priceOrder(b.items || [], b.coupon, ship); }
  catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 400 }); }

  const orderId = newOrderId();
  const p = providers();
  const origin = siteOrigin(req);
  try {
    if (pay === "cod") {
      if (!p.cod) return NextResponse.json({ error: "Cash on delivery is not available." }, { status: 400 });
      // TODO(agent): persist COD orders (DB/email via Resend). For now the order lives only in the browser + server log.
      console.info("[order:cod]", orderId, customer.email, order.total);
      return NextResponse.json({ mode: "cod", orderId, order });
    }
    if (pay === "card" && p.stripe) {
      const s = await createStripeSession(order, orderId, customer.email, origin);
      return NextResponse.json({ mode: "redirect", provider: "stripe", url: s.url, orderId, order });
    }
    if (p.sslcommerz) { // bKash/Nagad, or cards when Stripe isn't configured
      const s = await createSslSession(order, orderId, customer, origin);
      return NextResponse.json({ mode: "redirect", provider: "sslcommerz", url: s.url, orderId, order });
    }
    return NextResponse.json({ mode: "demo", orderId, order });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: (e as Error).message || "Payment provider error" }, { status: 502 });
  }
}
