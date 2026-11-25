import type { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";
export const metadata: Metadata = { title: "FAQ", description: "Answers about shipping, returns, warranty and compatibility of SONIQ headphones.", alternates: { canonical: "/faq" } };
export default function FaqPage() { return <div className="pt-16"><FAQ /></div>; }
