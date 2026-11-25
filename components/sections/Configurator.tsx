"use client";
import dynamic from "next/dynamic";
import { Check, ShoppingBag } from "lucide-react";
import { products } from "@/lib/products";
import { useProductStore, useActiveProduct } from "@/store/useProductStore";
import { useCart } from "@/store/useCartStore";
import { money } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/Reveal";

const Viewer = dynamic(() => import("@/components/three/Viewer"), { ssr: false });

/** Live color configurator: swatches tint the model's materials; price + add-to-cart follow the variant. */
export default function Configurator() {
  const p = useActiveProduct();
  const index = useProductStore((s) => s.index);
  const setIndex = useProductStore((s) => s.set);
  const vi = useProductStore((s) => s.variant[p.slug] ?? 0);
  const setVariant = useProductStore((s) => s.setVariant);
  const add = useCart((s) => s.add);
  const v = p.variants[vi] ?? p.variants[0];
  return (
    <section id="configurator" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-8">
      <SectionTitle kicker="Configurator" title="Make it yours" sub="Pick a model and a finish. Drag to rotate, Ctrl + scroll to zoom, double-click to reset." />
      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass relative h-[52vh] overflow-hidden rounded-[2rem] lg:h-[64vh]">
          <Viewer product={p} tint={v.hex} className="h-full w-full" />
        </div>
        <div className="space-y-7">
          <div>
            <p className="mb-3 text-sm text-white/60">Model</p>
            <div className="flex flex-wrap gap-2">
              {products.map((x, i) => (
                <button key={x.id} onClick={() => setIndex(i)} aria-pressed={i === index}
                  className={`rounded-full px-4 py-2 text-sm transition ${i === index ? "bg-accent font-semibold text-black" : "glass hover:bg-white/15"}`}>{x.name}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm text-white/60">Finish — <span className="text-white">{v.name}</span></p>
            <div className="flex gap-3" role="radiogroup" aria-label="Color">
              {p.variants.map((x, i) => (
                <button key={x.sku} role="radio" aria-checked={i === vi} aria-label={x.name} onClick={() => setVariant(p.slug, i)}
                  className={`grid h-12 w-12 place-items-center rounded-full border-2 transition hover:scale-110 ${i === vi ? "border-[var(--accent)]" : "border-white/20"}`} style={{ background: x.hex }}>
                  {i === vi && <Check size={18} className="text-black mix-blend-difference" />}
                </button>
              ))}
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm">{p.features.map((f) => <li key={f} className="glass rounded-xl px-3 py-2">{f}</li>)}</ul>
          <div className="flex items-center gap-5">
            <div><span className="text-3xl font-bold">{money(p.price)}</span>{p.compareAtPrice && <span className="ml-2 text-white/45 line-through">{money(p.compareAtPrice)}</span>}</div>
            <button className="btn btn-accent" onClick={() => add({ slug: p.slug, sku: v.sku, variant: v.name, price: p.price, name: p.name })}>
              <ShoppingBag size={18} /> Add to cart
            </button>
          </div>
          <p className="text-xs text-white/50">SKU {v.sku} · {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"} · Free shipping over $150</p>
        </div>
      </div>
    </section>
  );
}
