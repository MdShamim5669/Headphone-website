"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(!localStorage.getItem("soniq-cookies")), []);
  if (!show) return null;
  const done = (v: string) => { localStorage.setItem("soniq-cookies", v); setShow(false); };
  return (
    <div role="dialog" aria-label="Cookie consent" className="glass fixed bottom-3 left-3 right-3 z-[70] mx-auto flex max-w-xl items-center gap-2 rounded-2xl bg-black/80 p-2.5 pl-3.5 text-[11px] leading-snug backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-auto sm:gap-3 sm:p-4 sm:text-sm">
      <p className="min-w-0 flex-1 sm:min-w-[12rem]">Essential cookies for your cart. <Link href="/privacy" className="underline">Privacy policy</Link></p>
      <button className="btn btn-ghost shrink-0 !px-3 !py-1.5 sm:!px-[1.4rem] sm:!py-2" onClick={() => done("essential")}>Essential</button>
      <button className="btn btn-accent shrink-0 !px-3 !py-1.5 sm:!px-[1.4rem] sm:!py-2" onClick={() => done("all")}>Accept</button>
    </div>
  );
}
