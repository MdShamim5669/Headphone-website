"use client";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { SectionTitle } from "@/components/ui/Reveal";

const FILTERS = [["all", "All"], ["over-ear", "Over-ear"], ["on-ear", "On-ear"], ["in-ear", "In-ear"], ["wireless", "Wireless"], ["anc", "ANC"], ["gaming", "Gaming"]] as const;

/** Horizontal, swipeable collection with filters + sort. Data-driven from products.json. */
export default function Collection() {
  const [f, setF] = useState<string>("all");
  const [sort, setSort] = useState("popular");
  const track = useRef<HTMLDivElement>(null);
  const list = useMemo(() => {
    const l = products.filter((p) => f === "all" || p.category === f || p.tags.includes(f));
    return [...l].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : b.popularity - a.popularity);
  }, [f, sort]);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section id="collection" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-8">
      <SectionTitle kicker="The Collection" title="Find your sound" sub="Every pair is built around comfort, clarity and all-day battery. Drag, swipe or use the arrows." />
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {FILTERS.map(([k, l]) => (
            <button key={k} onClick={() => setF(k)} aria-pressed={f === k}
              className={`rounded-full px-4 py-2 text-sm transition ${f === k ? "bg-accent font-semibold text-black" : "glass hover:bg-white/15"}`}>{l}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">Sort</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="!rounded-full !py-2 text-sm">
            <option value="popular">Most popular</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
          </select>
          <button onClick={() => scroll(-1)} aria-label="Scroll left" className="glass grid h-10 w-10 place-items-center rounded-full hover:bg-white/15"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} aria-label="Scroll right" className="glass grid h-10 w-10 place-items-center rounded-full hover:bg-white/15"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div ref={track} tabIndex={0} aria-label="Products" onKeyDown={(e) => { if (e.key === "ArrowRight") scroll(1); if (e.key === "ArrowLeft") scroll(-1); }}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none]">
        {list.map((p) => <div key={p.id} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"><ProductCard p={p} /></div>)}
        {list.length === 0 && <p className="py-16 text-white/60">No headphones in this category yet.</p>}
      </div>
    </section>
  );
}
