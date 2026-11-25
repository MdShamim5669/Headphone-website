"use client";
import { useState } from "react";
import { Tag } from "lucide-react";
import { useCart, cartSubtotal } from "@/store/useCartStore";
import { COUPONS, money, SHIPPING_FREE_OVER, totals } from "@/lib/utils";

/** Order summary with coupon field. Shared by /cart and /checkout. */
export default function Summary({ children }: { children?: React.ReactNode }) {
  const coupon = useCart((s) => s.coupon);
  const setCoupon = useCart((s) => s.setCoupon);
  const sub = useCart(cartSubtotal);
  const t = totals(sub, coupon);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (COUPONS[c]) { setCoupon(c); setErr(""); setCode(""); } else setErr("That code isn't valid. Try SONIQ10.");
  };
  const left = SHIPPING_FREE_OVER - (t.subtotal - t.discount);
  return (
    <aside className="glass h-fit space-y-4 rounded-3xl p-6 lg:sticky lg:top-28" aria-label="Order summary">
      <h2 className="text-lg font-semibold">Order summary</h2>
      {left > 0 && sub > 0 && (
        <div>
          <p className="text-sm text-white/70">Add <span className="text-accent">{money(left)}</span> more for free shipping</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-accent transition-all" style={{ width: `${Math.min(100, ((t.subtotal - t.discount) / SHIPPING_FREE_OVER) * 100)}%` }} /></div>
        </div>
      )}
      <form onSubmit={apply} className="flex gap-2">
        <label className="sr-only" htmlFor="coupon">Coupon code</label>
        <input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="min-w-0 flex-1" />
        <button className="btn btn-ghost !px-4" type="submit"><Tag size={16} />Apply</button>
      </form>
      {err && <p role="alert" className="text-sm text-red-300">{err}</p>}
      {coupon && <p className="flex justify-between text-sm text-accent">Code {coupon} applied <button className="underline" onClick={() => setCoupon(null)}>Remove</button></p>}
      <dl className="space-y-1.5 border-t border-white/10 pt-4 text-sm">
        <Row l="Subtotal" v={money(t.subtotal)} />
        {t.discount > 0 && <Row l="Discount" v={`−${money(t.discount)}`} />}
        <Row l="Shipping" v={t.shipping ? money(t.shipping) : "Free"} />
        <Row l="Tax (5%)" v={money(t.tax)} />
        <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-semibold"><dt>Total</dt><dd>{money(t.total)}</dd></div>
      </dl>
      {children}
    </aside>
  );
}
const Row = ({ l, v }: { l: string; v: string }) => <div className="flex justify-between text-white/75"><dt>{l}</dt><dd>{v}</dd></div>;
