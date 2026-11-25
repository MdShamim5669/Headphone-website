import type { MetadataRoute } from "next";
import { products, SITE } from "@/lib/products";
const STATIC = ["", "/shop", "/cart", "/faq", "/contact", "/about", "/shipping", "/returns", "/warranty", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.6 })),
    ...products.map((p) => ({ url: `${SITE.url}/product/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
