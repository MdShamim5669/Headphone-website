"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/store/useCartStore";
import { getProduct } from "@/lib/products";
import { money } from "@/lib/utils";
import ProductArt from "@/components/ui/ProductArt";
import Summary from "./Summary";
import { useHydrated } from "./useHydrated";

/** Full cart page: line items with qty controls, remove, move to wishlist, and the summary. */
export default function CartClient() {
  const hydrated = useHydrated();
  const { items, setQty, remove, toggleWish, wishlist } = useCart();
  if (!hydrated) return <p className="mt-10 text-white/60">Loading cart…</p>;
  if (!items.length) return (
    <div className="glass mt-10 rounded-3xl p-14 text-center">
      <p className="font-display text-5xl">Silence…</p>
      <p className="mt-2 text-white/60">Your cart is empty.</p>
      <Link href="/shop" className="btn btn-accent mt-6">Browse headphones <ArrowRight size={16} /></Link>
    </div>
  );
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
      <ul className="space-y-4">
        {items.map((i) => {
          const p = getProduct(i.slug);
          return (
            <li key={i.sku} className="glass flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center">
              <Link href={`/product/${i.slug}`} className="h-28 w-full shrink-0 overflow-hidden rounded-2xl sm:w-36">{p && <ProductArt p={p} />}</Link>
              <div className="flex-1">
                <Link href={`/product/${i.slug}`} className="text-lg font-semibold hover:text-accent">{i.name}</Link>
                <p className="text-sm text-white/60">{i.variant} · {money(i.price)}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="glass flex items-center gap-1 rounded-full p-1">
                    <button aria-label="Decrease quantity" onClick={() => setQty(i.sku, i.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10"><Minus size={14} /></button>
                    <span className="w-6 text-center" aria-live="polite">{i.qty}</span>
                    <button aria-label="Increase quantity" onClick={() => setQty(i.sku, Math.min(10, i.qty + 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10"><Plus size={14} /></button>
                  </div>
                  {!wishlist.includes(i.slug) && <button onClick={() => { toggleWish(i.slug); remove(i.sku); }} className="text-sm text-white/60 underline-offset-4 hover:text-accent hover:underline">Save for later</button>}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="text-lg font-semibold">{money(i.price * i.qty)}</p>
                <button aria-label={`Remove ${i.name}`} onClick={() => remove(i.sku)} className="text-white/50 transition hover:text-red-300"><Trash2 size={18} /></button>
              </div>
            </li>
          );
        })}
      </ul>
      <Summary>
        <Link href="/checkout" className="btn btn-accent w-full justify-center">Checkout <ArrowRight size={16} /></Link>
        <Link href="/shop" className="block text-center text-sm text-white/60 hover:text-accent">Continue shopping</Link>
      </Summary>
    </div>
  );
}
