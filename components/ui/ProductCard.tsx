"use client";
import Link from "next/link";
import { useRef } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/utils";
import { useCart } from "@/store/useCartStore";
import ProductArt from "./ProductArt";

/** Product card with 3D tilt + glare on hover, color dots, rating, add-to-cart and view buttons. */
export default function ProductCard({ p }: { p: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const add = useCart((s) => s.add);
  const wish = useCart((s) => s.wishlist.includes(p.slug));
  const toggleWish = useCart((s) => s.toggleWish);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`); el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  const low = p.stock > 0 && p.stock <= 5;
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} data-cursor="hover"
      className="glass group relative flex flex-col overflow-hidden rounded-3xl transition-[transform,box-shadow,border-color] duration-300 hover:border-[var(--accent)] hover:shadow-[0_20px_60px_-20px_var(--accent)]">
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,.14), transparent 40%)" }} />
      <Link href={`/product/${p.slug}`} aria-label={`View ${p.name}`}>
        <ProductArt accent={p.theme.accent} from={p.theme.bgFrom} color={p.variants[0].hex} className="aspect-[4/3]" />
      </Link>
      <button onClick={() => toggleWish(p.slug)} aria-label={wish ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wish}
        className="glass absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full transition hover:scale-110">
        <Heart size={16} className={wish ? "fill-[var(--accent)] text-accent" : ""} />
      </button>
      {p.compareAtPrice && <span className="absolute left-3 top-3 z-20 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-black">-{Math.round((1 - p.price / p.compareAtPrice) * 100)}%</span>}
      <div className="relative z-20 flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span className="uppercase tracking-widest">{p.category}</span>
          <span className="flex items-center gap-1"><Star size={12} className="fill-[var(--accent)] text-accent" />{p.rating} ({p.reviewCount})</span>
        </div>
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <div className="flex gap-1.5" aria-label="Colors">{p.variants.map((v) => <span key={v.sku} title={v.name} className="h-4 w-4 rounded-full border border-white/30" style={{ background: v.hex }} />)}</div>
        {low && <p className="text-xs font-semibold text-orange-300">Only {p.stock} left</p>}
        {p.stock === 0 && <p className="text-xs font-semibold text-red-300">Out of stock</p>}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span><span className="text-xl font-bold">{money(p.price)}</span>{p.compareAtPrice && <span className="ml-2 text-sm text-white/45 line-through">{money(p.compareAtPrice)}</span>}</span>
          <div className="flex gap-2">
            <Link href={`/product/${p.slug}`} className="btn btn-ghost !px-3 !py-2 text-sm">View</Link>
            <button disabled={p.stock === 0} aria-label={`Add ${p.name} to cart`}
              onClick={() => add({ slug: p.slug, sku: p.variants[0].sku, variant: p.variants[0].name, price: p.price, name: p.name })}
              className="btn btn-accent !px-3 !py-2 text-sm disabled:opacity-40"><ShoppingBag size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
