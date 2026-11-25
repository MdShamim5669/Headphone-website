import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, SITE } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return { title: "Not found" };
  return { title: p.name, description: p.description, alternates: { canonical: `/product/${p.slug}` }, openGraph: { title: `${p.name} | SONIQ`, description: p.description } };
}
export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, sku: p.variants[0].sku, brand: { "@type": "Brand", name: "SONIQ" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
    offers: { "@type": "Offer", price: p.price, priceCurrency: p.currency, availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: `${SITE.url}/product/${p.slug}` },
  };
  return (
    <>
      <ProductDetail slug={p.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
