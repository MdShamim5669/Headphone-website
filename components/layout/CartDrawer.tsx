"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useCart, cartSubtotal } from "@/store/useCartStore";
import { money, totals } from "@/lib/utils";

export default function CartDrawer() {
  const { open, setOpen, items, setQty, remove, coupon } = useCart();
  const sub = useCart(cartSubtotal);
  const t = totals(sub, coupon);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [setOpen]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside role="dialog" aria-modal="true" aria-label="Shopping cart"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0b0b0f]/95 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your cart</h2>
              <button aria-label="Close cart" onClick={() => setOpen(false)} className="glass grid h-9 w-9 place-items-center rounded-full"><X size={18} /></button>
            </div>
            {items.length === 0 ? (
              <div className="grid flex-1 place-items-center text-center text-white/60">
                <div><p className="font-display text-4xl text-white">Silence…</p><p className="mt-2">Your cart is empty.</p>
                  <Link href="/shop" onClick={() => setOpen(false)} className="btn btn-accent mt-6">Browse headphones</Link></div>
              </div>
            ) : (
              <>
                <ul className="mt-6 flex-1 space-y-4 overflow-y-auto">
                  {items.map((i) => (
                    <li key={i.sku} className="glass flex items-center gap-4 rounded-2xl p-4">
                      <div className="flex-1">
                        <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="font-medium hover:text-accent">{i.name}</Link>
                        <p className="text-xs text-white/60">{i.variant} · {money(i.price)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button aria-label="Decrease quantity" onClick={() => setQty(i.sku, i.qty - 1)} className="glass grid h-7 w-7 place-items-center rounded-full"><Minus size={14} /></button>
                          <span aria-live="polite" className="w-6 text-center">{i.qty}</span>
                          <button aria-label="Increase quantity" onClick={() => setQty(i.sku, i.qty + 1)} className="glass grid h-7 w-7 place-items-center rounded-full"><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{money(i.price * i.qty)}</p>
                        <button aria-label={`Remove ${i.name}`} onClick={() => remove(i.sku)} className="mt-2 text-white/50 hover:text-red-300"><Trash2 size={16} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm">
                  <Row l="Subtotal" v={money(t.subtotal)} />
                  {t.discount > 0 && <Row l={`Discount (${coupon})`} v={`−${money(t.discount)}`} />}
                  <Row l="Shipping" v={t.shipping ? money(t.shipping) : "Free"} />
                  <Row l="Total (incl. tax)" v={money(t.total)} bold />
                  <div className="flex gap-2 pt-3">
                    <Link href="/cart" onClick={() => setOpen(false)} className="btn btn-ghost flex-1 justify-center">View cart</Link>
                    <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-accent flex-1 justify-center">Checkout</Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
const Row = ({ l, v, bold }: { l: string; v: string; bold?: boolean }) => (
  <div className={`flex justify-between ${bold ? "pt-1 text-base font-semibold" : "text-white/75"}`}><span>{l}</span><span>{v}</span></div>
);
