import type { Metadata } from "next";
import { Suspense } from "react";
import SuccessClient from "@/components/checkout/SuccessClient";
export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };
export default function SuccessPage() {
  return <div className="mx-auto max-w-3xl px-5 pb-10 pt-32"><Suspense><SuccessClient /></Suspense></div>;
}
