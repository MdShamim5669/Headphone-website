"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(!localStorage.getItem("soniq-cookies")), []);
  if (!show) return null;
  const done = (v: string) => { localStorage.setItem("soniq-cookies", v); setShow(false); };
  return (
    <div role="dialog" aria-label="Cookie consent" className="glass fixed bottom-3 left-3 right-3 z-[70] mx-auto flex max-w-xl flex-wrap items-center gap-2 rounded-2xl bg-black/80 p-3 text-xs backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-auto sm:gap-3 sm:p-4 sm:text-sm">
      <p className="w-full sm:w-auto sm:min-w-[12rem] sm:flex-1">We use essential cookies for your cart. <Link href="/privacy" className="underline">Privacy policy</Link></p>
      <button className="btn btn-ghost flex-1 !py-1.5 sm:flex-none sm:!py-2" onClick={() => done("essential")}>Essential only</button>
      <button className="btn btn-accent flex-1 !py-1.5 sm:flex-none sm:!py-2" onClick={() => done("all")}>Accept</button>
    </div>
  );
}
