"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Award, ArrowDown, Star } from "lucide-react";
import { products } from "@/lib/products";
import { useProductStore, useActiveProduct } from "@/store/useProductStore";
import { useCart } from "@/store/useCartStore";
import { money } from "@/lib/utils";
import ProductSwitcher from "./ProductSwitcher";

const Viewer = dynamic(() => import("@/components/three/Viewer"), { ssr: false, loading: () => <div className="h-full w-full" /> });

export default function Hero() {
  const p = useActiveProduct();
  const index = useProductStore((s) => s.index);
  const set = useProductStore((s) => s.set);
  const next = useProductStore((s) => s.next);
  const prev = useProductStore((s) => s.prev);
  const add = useCart((s) => s.add);

  // URL sync: ?product=slug (read once, then write on change)
  useEffect(() => {
    const slug = new URLSearchParams(location.search).get("product");
    const i = products.findIndex((x) => x.slug === slug);
    if (i > 0) useProductStore.setState({ index: i });
  }, []);
  useEffect(() => {
    const u = new URL(location.href);
    if (u.searchParams.get("product") === p.slug) return;
    if (index === 0 && !u.searchParams.has("product")) return;
    u.searchParams.set("product", p.slug);
    history.replaceState(null, "", u);
  }, [p.slug, index]);
  // keyboard ← → when not typing
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input,textarea,select,[role='img']")) return;
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [next, prev]);

  const n = products.length;
  const neighbors = [products[(index + 1) % n].model.glb, products[(index - 1 + n) % n].model.glb];
  const fade = { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, y: -18, filter: "blur(8px)" }, transition: { duration: 0.5 } };

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pt-24" aria-roledescription="carousel" aria-label="Featured headphones">
      <p className="sr-only" aria-live="polite">Now showing {p.name}, {money(p.price)}</p>
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl grid-rows-[auto_1fr_auto] px-5 lg:px-8">
        <div className="flex flex-col-reverse items-start justify-between gap-6 pt-4 lg:flex-row">
          <div className="relative z-20 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div key={p.id} {...fade}>
                <h1 className="font-display text-6xl leading-[1.05] text-white drop-shadow-lg sm:text-7xl lg:text-8xl">{p.tagline}</h1>
                <p className="mt-4 max-w-sm text-base text-white/75">{p.description}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                  <Star size={14} className="fill-[var(--accent)] text-accent" /> {p.rating} · {p.reviewCount.toLocaleString()} reviews
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button className="btn btn-accent group" data-cursor="hover"
                onClick={() => add({ slug: p.slug, sku: p.variants[0].sku, variant: p.variants[0].name, price: p.price, name: p.name })}>
                Shop Now <span className="grid h-6 w-6 place-items-center rounded-full bg-black/85 text-white transition group-hover:rotate-90"><Plus size={14} /></span>
              </button>
              <div className="leading-tight">
                <span className="text-2xl font-bold">{money(p.price)}</span>
                {p.compareAtPrice && <span className="ml-2 text-sm text-white/50 line-through">{money(p.compareAtPrice)}</span>}
              </div>
            </div>
          </div>
          <div className="relative z-30 self-end lg:self-start"><ProductSwitcher /></div>
        </div>

        {/* 3D model sits behind the second headline for the layered depth effect */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="pointer-events-auto h-[62vh] w-full max-w-4xl translate-y-10 sm:h-[72vh] lg:translate-y-6">
            <Viewer product={p} mode="hero" particles hotspots preload={neighbors} className="h-full w-full" />
          </div>
        </div>

        <div />
        <div className="relative z-20 flex items-end justify-between gap-6 pb-8">
          <div className="hidden items-center gap-4 sm:flex">
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <Award className="text-accent" size={26} />
              <div className="leading-tight"><p className="text-xs uppercase tracking-widest text-white/60">Design Awards</p><p className="text-sm font-semibold">Premium Audio 2026</p></div>
            </div>
            <a href="#collection" aria-label="Scroll down" className="glass grid h-12 w-8 place-items-start justify-center rounded-full pt-2"><span className="scroll-dot block h-2 w-2 rounded-full bg-accent" /><ArrowDown className="sr-only" /></a>
          </div>
          <AnimatePresence mode="wait">
            <motion.h2 key={p.id + "-sub"} {...fade} className="pointer-events-none ml-auto text-right font-display text-5xl leading-none text-white/95 drop-shadow-[0_8px_30px_rgba(0,0,0,.45)] sm:text-7xl lg:text-8xl">
              {p.subTagline}
            </motion.h2>
          </AnimatePresence>
        </div>
        <div className="relative z-20 flex justify-center gap-2 pb-6" role="tablist" aria-label="Product slides">
          {products.map((x, i) => (
            <button key={x.id} role="tab" aria-selected={i === index} aria-label={x.name} onClick={() => set(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
