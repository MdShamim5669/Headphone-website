import { NextResponse } from "next/server";
import { siteOrigin } from "@/lib/payments/config";
import { validateSsl } from "@/lib/payments/sslcommerz";

export const dynamic = "force-dynamic";

/** SSLCommerz POSTs the browser back here (success | fail | cancel) and calls ipn server-to-server. */
export async function POST(req: Request, { params }: { params: Promise<{ event: string }> }) {
  const { event } = await params;
  const fd = await req.formData().catch(() => null);
  const valId = String(fd?.get("val_id") || "");
  const tranId = String(fd?.get("tran_id") || "");
  const origin = siteOrigin(req);

  if (event === "ipn") {
    if (valId) {
      const v = await validateSsl(valId).catch(() => null);
      // TODO(agent): mark order paid in DB + send receipt email when a DB exists.
      console.info("[sslcommerz:ipn]", tranId, v?.paid, v?.amount);
    }
    return NextResponse.json({ ok: true });
  }
  if (event === "success" && valId) {
    const q = new URLSearchParams({ id: tranId, provider: "sslcommerz", val_id: valId });
    return NextResponse.redirect(`${origin}/order/success?${q}`, 303);
  }
  const reason = event === "cancel" ? "cancelled" : "failed";
  return NextResponse.redirect(`${origin}/checkout?${reason}=1`, 303);
}
