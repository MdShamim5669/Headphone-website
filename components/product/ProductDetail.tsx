"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ChevronRight, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck, Undo2 } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { money, SHIPPING_FREE_OVER } from "@/lib/utils";
import { useCart } from "@/store/useCartStore";
import ProductCard from "@/components/ui/ProductCard";

const Viewer = dynamic(() => import("@/components/three/Viewer"), { ssr: false, loading: () => <div className="grid h-full place-items-center text-white/50">Loading 3D…</div> });

/** Product detail: big interactive 3D viewer with hotspots, variant swatches, qty, add to cart, wishlist, specs, related. */
export default function ProductDetail({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  const [vi, setVi] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const wish = useCart((s) => s.wishlist.includes(p.slug));
  const toggleWish = useCart((s) => s.toggleWish);
  const viewed = useCart((s) => s.viewed);
  useEffect(() => { viewed(p.slug); }, [p.slug, viewed]);
  const v = p.variants[vi];
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3);
  const buy = () => { add({ slug: p.slug, sku: v.sku, variant: v.name, price: p.price, name: p.name }, qty); setAdded(true); setTimeout(() => setAdded(false), 1600); };
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-white/55">
        <Link href="/" className="hover:text-accent">Home</Link><ChevronRight size={14} />
        <Link href="/shop" className="hover:text-accent">Shop</Link><ChevronRight size={14} />
        <span className="text-white">{p.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="glass relative h-[55vh] overflow-hidden rounded-[2rem] lg:sticky lg:top-24 lg:h-[72vh]">
          <Viewer product={p} tint={v.hex} hotspots particles className="h-full w-full" />
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 text-xs text-white/70">Drag to rotate · Ctrl + scroll to zoom · Double-click to reset</p>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{p.category} · {p.tags.join(" · ")}</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{p.name}</h1>
            <p className="mt-1 font-display text-3xl text-accent">{p.tagline}</p>
            <a href="#reviews" className="mt-3 flex items-center gap-1 text-sm text-white/70">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} className={i < Math.round(p.rating) ? "fill-[var(--accent)] text-accent" : "text-white/30"} />)}
              <span className="ml-1">{p.rating} · {p.reviewCount} reviews</span>
            </a>
          </div>
          <p className="text-white/75">{p.description}</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold">{money(p.price)}</span>
            {p.compareAtPrice && <span className="pb-1 text-lg text-white/45 line-through">{money(p.compareAtPrice)}</span>}
          </div>
          <div>
            <p className="mb-2 text-sm text-white/60">Color: <span className="text-white">{v.name}</span></p>
            <div className="flex gap-3">
              {p.variants.map((x, i) => (
                <button key={x.sku} onClick={() => setVi(i)} aria-label={x.name} aria-pressed={vi === i}
                  className={`grid h-11 w-11 place-items-center rounded-full border-2 transition hover:scale-110 ${vi === i ? "border-[var(--accent)]" : "border-white/20"}`}
                  style={{ background: x.hex }}>{vi === i && <Check size={16} className="text-black" />}</button>
              ))}
            </div>
          </div>
          {p.stock > 0 && p.stock <= 5 && <p className="text-sm font-semibold text-orange-300">Hurry — only {p.stock} left in stock</p>}
          <div className="flex flex-wrap items-center gap-3">
            <div className="glass flex items-center gap-2 rounded-full p-1.5">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"><Minus size={16} /></button>
              <span className="w-6 text-center" aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(Math.min(10, qty + 1))} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"><Plus size={16} /></button>
            </div>
            <button onClick={buy} disabled={p.stock === 0} className="btn btn-accent flex-1 justify-center disabled:opacity-40">
              {added ? <><Check size={18} /> Added</> : <><ShoppingBag size={18} /> Add to cart</>}
            </button>
            <button onClick={() => toggleWish(p.slug)} aria-pressed={wish} aria-label={wish ? "Remove from wishlist" : "Add to wishlist"} className="glass grid h-12 w-12 place-items-center rounded-full transition hover:scale-110">
              <Heart size={18} className={wish ? "fill-[var(--accent)] text-accent" : ""} />
            </button>
          </div>
          <ul className="grid gap-2 text-sm text-white/70 sm:grid-cols-3">
            <li className="glass flex items-center gap-2 rounded-2xl p-3"><Truck size={16} className="text-accent" />Free over {money(SHIPPING_FREE_OVER)}</li>
            <li className="glass flex items-center gap-2 rounded-2xl p-3"><Undo2 size={16} className="text-accent" />30-day returns</li>
            <li className="glass flex items-center gap-2 rounded-2xl p-3"><ShieldCheck size={16} className="text-accent" />2-year warranty</li>
          </ul>
          <div>
            <h2 className="mb-3 text-lg font-semibold">Features</h2>
            <div className="flex flex-wrap gap-2">{p.features.map((f) => <span key={f} className="glass rounded-full px-3 py-1.5 text-sm">{f}</span>)}</div>
          </div>
          <div>
            <h2 className="mb-3 text-lg font-semibold">Specifications</h2>
            <dl className="glass divide-y divide-white/10 rounded-2xl">
              {Object.entries(p.specs).map(([k, val]) => (
                <div key={k} className="flex justify-between px-4 py-3 text-sm"><dt className="capitalize text-white/60">{k}</dt><dd>{val}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <section className="mt-24" aria-labelledby="related">
        <h2 id="related" className="mb-8 font-display text-5xl">You may also like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
      </section>
    </div>
  );
}
