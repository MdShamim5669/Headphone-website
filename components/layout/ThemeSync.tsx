"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useActiveProduct } from "@/store/useProductStore";
import { getProduct } from "@/lib/products";
/** Writes the active product's theme into CSS variables so the whole site re-colors. */
export default function ThemeSync() {
  const active = useActiveProduct();
  const path = usePathname();
  useEffect(() => {
    const slug = path?.startsWith("/product/") ? path.split("/")[2] : null;
    const p = (slug && getProduct(slug)) || active;
    const r = document.documentElement.style;
    r.setProperty("--bg-from", p.theme.bgFrom);
    r.setProperty("--bg-to", p.theme.bgTo);
    r.setProperty("--accent", p.theme.accent);
  }, [active, path]);
  return null;
}
