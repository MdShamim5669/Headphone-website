"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/products";
import { useProductStore } from "@/store/useProductStore";
import { money } from "@/lib/utils";

/** Top-right thumbnail switcher (like the reference video): next 2 products + prev/next arrows. */
export default function ProductSwitcher() {
  const index = useProductStore((s) => s.index);
  const set = useProductStore((s) => s.set);
  const next = useProductStore((s) => s.next);
  const prev = useProductStore((s) => s.prev);
  const shown = [1, 2].map((o) => (index + o) % products.length).filter((i, k, a) => i !== index && a.indexOf(i) === k);
  return (
    <div className="flex max-w-full items-center gap-2" role="group" aria-label="Choose a headphone">
      <button onClick={prev} aria-label="Previous headphone" className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full transition hover:scale-110 hover:bg-white/15"><ChevronLeft size={18} /></button>
      {shown.map((i, k) => {
        const p = products[i];
        return (
          <button key={p.id} onClick={() => set(i)} data-cursor="hover" aria-pressed={i === index}
            className={`glass group ${k > 0 ? "hidden sm:flex" : "flex"} w-40 min-w-0 items-center gap-3 rounded-2xl p-2 pr-3 text-left transition hover:-translate-y-1 hover:border-[var(--accent)] sm:w-48`}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl transition group-hover:scale-105"
              style={{ background: `radial-gradient(circle at 30% 30%, ${p.theme.accent}, ${p.theme.bgFrom} 75%)` }}>
              <span className="h-5 w-7 rounded-t-full border-[3px] border-b-0 border-white/90" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{p.name}</span>
              <span className="block text-xs text-white/70">{money(p.price)}</span>
            </span>
          </button>
        );
      })}
      <button onClick={next} aria-label="Next headphone" className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full transition hover:scale-110 hover:bg-white/15"><ChevronRight size={18} /></button>
    </div>
  );
}
