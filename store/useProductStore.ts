"use client";
import { create } from "zustand";
import { products } from "@/lib/products";
interface S {
  index: number; locked: boolean; variant: Record<string, number>;
  set: (i: number) => void; next: () => void; prev: () => void;
  setVariant: (slug: string, v: number) => void;
}
const wrap = (i: number) => (i + products.length) % products.length;
export const useProductStore = create<S>((set, get) => ({
  index: 0, locked: false, variant: {},
  set: (i) => {
    if (get().locked || wrap(i) === get().index) return;
    set({ index: wrap(i), locked: true });
    setTimeout(() => set({ locked: false }), 900); // debounce while the transition runs
  },
  next: () => get().set(get().index + 1),
  prev: () => get().set(get().index - 1),
  setVariant: (slug, v) => set({ variant: { ...get().variant, [slug]: v } }),
}));
export const useActiveProduct = () => products[useProductStore((s) => s.index)];
