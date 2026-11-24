export type Vec3 = [number, number, number];
export interface Variant { name: string; hex: string; sku: string }
export interface Product {
  id: string; slug: string; name: string; tagline: string; subTagline: string; description: string;
  price: number; compareAtPrice?: number; currency: string; category: string; tags: string[];
  rating: number; reviewCount: number; stock: number; popularity: number;
  model: { glb: string; scale: number; rotation: Vec3; position: Vec3 };
  theme: { bgFrom: string; bgTo: string; accent: string; text: string; particles: "orbs" | "waves" | "notes" };
  variants: Variant[]; features: string[]; specs: Record<string, string>;
  hotspots: { label: string; position: Vec3 }[];
}
