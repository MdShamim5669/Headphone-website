import type { Metadata } from "next";
import CartClient from "@/components/checkout/CartClient";
export const metadata: Metadata = { title: "Your cart", robots: { index: false } };
export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-32 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Cart</p>
      <h1 className="mt-2 font-display text-6xl">Your cart</h1>
      <CartClient />
    </div>
  );
}
