"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { money } from "@/lib/utils";
import { useCart } from "@/store/useCartStore";
interface Order { id: string; email: string; name: string; total: number; pay?: string; mode?: string; items: { sku: string; name: string; variant: string; qty: number; price: number }[]; date: string }
type Verify = { state: "checking" } | { state: "paid"; amount: number; currency: string } | { state: "unpaid"; error?: string } | { state: "none" };

/** Order confirmation. For Stripe / SSLCommerz redirects it verifies the payment server-side via /api/checkout/verify.
 *  Order lines come from sessionStorage (saved by CheckoutClient). TODO(agent): load orders from a DB once one exists. */
export default function SuccessClient() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const provider = sp.get("provider");
  const mode = sp.get("mode");
  const clear = useCart((s) => s.clear);
  const [o, setO] = useState<Order | null>(null);
  const [v, setV] = useState<Verify>(provider ? { state: "checking" } : { state: "none" });

  useEffect(() => { try { const x = JSON.parse(sessionStorage.getItem("soniq-last-order") || "null"); if (x && (!id || x.id === id)) setO(x); } catch {} }, [id]);
  useEffect(() => {
    if (!provider) return;
    const q = new URLSearchParams({ provider });
    const sid = sp.get("session_id"); const val = sp.get("val_id");
    if (sid) q.set("session_id", sid); if (val) q.set("val_id", val);
    fetch(`/api/checkout/verify?${q}`).then((r) => r.json()).then((j) => {
      if (j.paid) { setV({ state: "paid", amount: j.amount, currency: j.currency }); clear(); }
      else setV({ state: "unpaid", error: j.error });
    }).catch(() => setV({ state: "unpaid", error: "Could not verify the payment." }));
  }, [provider, sp, clear]);

  if (v.state === "checking") return (
    <div className="glass rounded-[2rem] p-12 text-center"><Loader2 className="mx-auto animate-spin text-accent" size={56} /><p className="mt-4 text-white/70">Confirming your payment…</p></div>
  );
  if (v.state === "unpaid") return (
    <div className="glass rounded-[2rem] p-12 text-center">
      <XCircle className="mx-auto text-red-300" size={64} />
      <h1 className="mt-4 font-display text-5xl">Payment not confirmed</h1>
      <p className="mt-2 text-white/70">{v.error || "We couldn't confirm this payment. You have not been charged twice — please try again."}</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/checkout" className="btn btn-accent">Back to checkout</Link><Link href="/contact" className="btn btn-ghost">Contact support</Link></div>
    </div>
  );

  const isCod = mode === "cod" || o?.pay === "cod";
  const totalLabel = isCod ? "Pay on delivery" : mode === "demo" ? "Total (demo)" : "Total paid";
  return (
    <div className="glass rounded-[2rem] p-8 text-center sm:p-12">
      <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="mx-auto w-fit text-accent"><CheckCircle2 size={72} /></motion.div>
      <h1 className="mt-4 font-display text-6xl">Thank you!</h1>
      <p className="mt-2 text-white/70">{o ? <>Order <b className="text-white">{o.id}</b> is confirmed. A receipt goes to {o.email}.</> : <>Your order{id ? <> <b className="text-white">{id}</b></> : null} is confirmed.</>}</p>
      {v.state === "paid" && <p className="mt-1 text-sm text-accent">Payment received: {v.currency === "USD" ? money(v.amount) : `${v.amount.toFixed(2)} ${v.currency}`}</p>}
      {o && (
        <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm">
          {o.items.map((i) => <li key={i.sku} className="flex justify-between border-b border-white/10 pb-2"><span>{i.qty} × {i.name} <span className="text-white/50">({i.variant})</span></span><span>{money(i.qty * i.price)}</span></li>)}
          <li className="flex justify-between pt-2 text-base font-semibold"><span>{totalLabel}</span><span>{money(o.total)}</span></li>
        </ul>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/shop" className="btn btn-accent">Keep shopping</Link><Link href="/" className="btn btn-ghost">Home</Link></div>
    </div>
  );
}
