import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";
export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-32 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Secure checkout</p>
      <h1 className="mt-2 font-display text-6xl">Checkout</h1>
      <CheckoutClient />
    </div>
  );
}
