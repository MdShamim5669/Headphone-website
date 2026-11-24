"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useCart, cartCount } from "@/store/useCartStore";

const LINKS = [
  { id: "home", label: "Home" }, { id: "collection", label: "Collection" }, { id: "features", label: "Features" },
  { id: "sound", label: "Sound" }, { id: "specs", label: "Specs" }, { id: "reviews", label: "Reviews" },
];

export default function Navbar() {
  const path = usePathname();
  const isHome = path === "/";
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart(cartCount);
  const setOpen = useCart((s) => s.setOpen);
  useEffect(() => setMounted(true), []);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const on = () => { const y = window.scrollY; setHidden(y > last && y > 200); last = y; };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // scrollspy
  useEffect(() => {
    if (!isHome) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [isHome]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  return (
    <>
      <motion.header
        animate={{ y: hidden && !menu ? -110 : 0 }} transition={{ duration: 0.35 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4" aria-label="Main">
          <Logo />
          <ul className="glass hidden items-center gap-1 rounded-full p-1.5 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id} className="relative">
                {isHome && active === l.id && (
                  <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <a href={href(l.id)} data-cursor="hover"
                  className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition hover:scale-105 ${isHome && active === l.id ? "text-black" : "text-white/80 hover:text-white"}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <Link href="/shop" aria-label="Search products" className="glass grid h-10 w-10 place-items-center rounded-full transition hover:scale-110"><Search size={18} /></Link>
            <Link href="/shop?wishlist=1" aria-label="Wishlist" className="glass hidden h-10 w-10 place-items-center rounded-full transition hover:scale-110 sm:grid"><Heart size={18} /></Link>
            <button onClick={() => setOpen(true)} aria-label={`Open cart, ${mounted ? count : 0} items`} className="glass relative grid h-10 w-10 place-items-center rounded-full transition hover:scale-110" id="cart-icon">
              <ShoppingBag size={18} />
              {mounted && count > 0 && <span aria-live="polite" className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-black">{count}</span>}
            </button>
            <Link href="/contact" className="btn btn-accent ml-1 hidden !py-2.5 text-sm md:inline-flex">Contact Us</Link>
            <button className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}><Menu size={18} /></button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/85 p-6 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="flex justify-between"><Logo /><button aria-label="Close menu" onClick={() => setMenu(false)} className="glass grid h-10 w-10 place-items-center rounded-full"><X /></button></div>
            <ul className="mt-12 space-y-3">
              {[...LINKS.map((l) => ({ h: href(l.id), t: l.label })), { h: "/shop", t: "Shop" }, { h: "/contact", t: "Contact" }].map((l, i) => (
                <motion.li key={l.h} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <a href={l.h} onClick={() => setMenu(false)} className="font-display text-5xl hover:text-accent">{l.t}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
