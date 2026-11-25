"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/store/useCartStore";
import ProductCard from "@/components/ui/ProductCard";

const FILTERS = [
  { id: "all", label: "All" }, { id: "over-ear", label: "Over-ear" }, { id: "on-ear", label: "On-ear" }, { id: "in-ear", label: "In-ear" },
  { id: "wireless", label: "Wireless" }, { id: "anc", label: "ANC" }, { id: "bass", label: "Bass" }, { id: "gaming", label: "Gaming" },
];
const SORTS = { popular: "Most popular", "price-asc": "Price: low → high", "price-desc": "Price: high → low", rating: "Top rated" } as const;

/** Shop grid with search, type/feature filters, sort, and a wishlist-only toggle (?wishlist=1). */
export default function ShopClient() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [f, setF] = useState(params.get("filter") ?? "all");
  const [sort, setSort] = useState<keyof typeof SORTS>("popular");
  const [onlyWish, setOnlyWish] = useState(params.get("wishlist") === "1");
  const wishlist = useCart((s) => s.wishlist);
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const r = products.filter((p) =>
      (f === "all" || p.category === f || p.tags.includes(f)) &&
      (!onlyWish || wishlist.includes(p.slug)) &&
      (!term || [p.name, p.tagline, p.description, ...p.tags].join(" ").toLowerCase().includes(term)));
    return [...r].sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.popularity - a.popularity);
  }, [q, f, sort, onlyWish, wishlist]);
  return (
    <>
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Search headphones</span>
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search headphones…" className="w-full !pl-10" type="search" />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setOnlyWish(!onlyWish)} aria-pressed={onlyWish} className={`rounded-full px-4 py-2 text-sm transition ${onlyWish ? "bg-accent text-black" : "glass hover:bg-white/15"}`}>♥ Wishlist ({wishlist.length})</button>
          <label className="text-sm text-white/60">Sort{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)} className="ml-1 !py-2 text-sm">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter">
        {FILTERS.map((x) => (
          <button key={x.id} onClick={() => setF(x.id)} aria-pressed={f === x.id}
            className={`rounded-full px-4 py-2 text-sm transition hover:scale-105 ${f === x.id ? "bg-accent text-black" : "glass hover:bg-white/15"}`}>{x.label}</button>
        ))}
      </div>
      <p className="mt-6 text-sm text-white/50" aria-live="polite">{list.length} {list.length === 1 ? "product" : "products"}</p>
      {list.length ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : (
        <div className="glass mt-6 rounded-3xl p-12 text-center text-white/60"><p className="font-display text-4xl text-white">No match</p><p className="mt-2">Try another filter or search term.</p></div>
      )}
    </>
  );
}
