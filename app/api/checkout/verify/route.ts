import { NextResponse } from "next/server";
import { getStripeSession } from "@/lib/payments/stripe";
import { validateSsl } from "@/lib/payments/sslcommerz";
import { stripeEnabled, sslEnabled } from "@/lib/payments/config";

export const dynamic = "force-dynamic";

/** GET ?provider=stripe&session_id=cs_... | ?provider=sslcommerz&val_id=... → { paid, amount, currency, orderId } */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const provider = u.searchParams.get("provider");
  try {
    if (provider === "stripe" && stripeEnabled()) return NextResponse.json(await getStripeSession(u.searchParams.get("session_id") || ""));
    if (provider === "sslcommerz" && sslEnabled()) return NextResponse.json(await validateSsl(u.searchParams.get("val_id") || ""));
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
