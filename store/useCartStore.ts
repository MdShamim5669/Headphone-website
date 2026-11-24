"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface CartItem { slug: string; sku: string; variant: string; qty: number; price: number; name: string }
interface S {
  items: CartItem[]; wishlist: string[]; coupon: string | null; open: boolean; recent: string[];
  add: (i: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (sku: string, qty: number) => void; remove: (sku: string) => void; clear: () => void;
  toggleWish: (slug: string) => void; setCoupon: (c: string | null) => void;
  setOpen: (o: boolean) => void; viewed: (slug: string) => void;
}
export const useCart = create<S>()(
  persist(
    (set, get) => ({
      items: [], wishlist: [], coupon: null, open: false, recent: [],
      add: (i, qty = 1) => {
        const ex = get().items.find((x) => x.sku === i.sku);
        set({
          items: ex ? get().items.map((x) => (x.sku === i.sku ? { ...x, qty: x.qty + qty } : x)) : [...get().items, { ...i, qty }],
          open: true,
        });
      },
      setQty: (sku, qty) => set({ items: get().items.map((x) => (x.sku === sku ? { ...x, qty: Math.max(1, qty) } : x)) }),
      remove: (sku) => set({ items: get().items.filter((x) => x.sku !== sku) }),
      clear: () => set({ items: [], coupon: null }),
      toggleWish: (slug) => set({ wishlist: get().wishlist.includes(slug) ? get().wishlist.filter((s) => s !== slug) : [...get().wishlist, slug] }),
      setCoupon: (coupon) => set({ coupon }),
      setOpen: (open) => set({ open }),
      viewed: (slug) => set({ recent: [slug, ...get().recent.filter((s) => s !== slug)].slice(0, 6) }),
    }),
    { name: "soniq-cart", partialize: (s) => ({ items: s.items, wishlist: s.wishlist, coupon: s.coupon, recent: s.recent }) }
  )
);
export const cartCount = (s: S) => s.items.reduce((a, b) => a + b.qty, 0);
export const cartSubtotal = (s: S) => s.items.reduce((a, b) => a + b.qty * b.price, 0);
