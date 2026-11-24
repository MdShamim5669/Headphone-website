"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(!localStorage.getItem("soniq-cookies")), []);
  if (!show) return null;
  const done = (v: string) => { localStorage.setItem("soniq-cookies", v); setShow(false); };
  return (
    <div role="dialog" aria-label="Cookie consent" className="glass fixed bottom-4 left-4 right-4 z-[70] mx-auto flex max-w-xl flex-wrap items-center gap-3 rounded-2xl p-4 text-sm sm:right-auto">
      <p className="flex-1">We use essential cookies for your cart. <Link href="/privacy" className="underline">Privacy policy</Link></p>
      <button className="btn btn-ghost !py-2" onClick={() => done("essential")}>Essential only</button>
      <button className="btn btn-accent !py-2" onClick={() => done("all")}>Accept</button>
    </div>
  );
}
