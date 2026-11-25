import data from "@/data/products.json";
import type { Product } from "./types";
export const products = data as unknown as Product[];
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const SITE = { name: "SONIQ", url: "https://soniq.example.com" };
