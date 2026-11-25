import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";
export const metadata: Metadata = { title: "Shop all headphones", description: "Browse every SONIQ headphone. Filter by type and features, sort by price or popularity.", alternates: { canonical: "/shop" } };
export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-32 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Shop</p>
      <h1 className="mt-2 font-display text-6xl">All headphones</h1>
      <Suspense fallback={<p className="mt-10 text-white/60">Loading…</p>}><ShopClient /></Suspense>
    </div>
  );
}
