"use client";
import { useEffect, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { products } from "@/lib/products";
import { SectionTitle } from "@/components/ui/Reveal";

export const REVIEWS = [
  { name: "Ayesha R.", product: "bose-qc2", rating: 5, text: "The noise cancelling is unreal. My Dhaka commute went from chaos to calm. Comfortable for 6+ hours." },
  { name: "Daniel K.", product: "hybrid-anc", rating: 5, text: "Best value I've found. Battery lasted me a whole week of work calls and the ANC is way better than the price suggests." },
  { name: "Tanvir H.", product: "crusher-540", rating: 4, text: "The bass slider is so much fun. Movies and games feel physical. A bit heavier than others, but worth it." },
  { name: "Mira S.", product: "bose-qc2", rating: 5, text: "Spun the 3D model for ten minutes before buying — it looks exactly like that in person. Premium all round." },
  { name: "Rafi A.", product: "hybrid-anc", rating: 5, text: "Multipoint works flawlessly between my laptop and phone. Delivered in 3 days." },
];

export default function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = REVIEWS.length;
  useEffect(() => { if (paused) return; const t = setInterval(() => setI((x) => (x + 1) % n), 5000); return () => clearInterval(t); }, [paused, n]);
  const avg = (products.reduce((a, p) => a + p.rating * p.reviewCount, 0) / products.reduce((a, p) => a + p.reviewCount, 0)).toFixed(1);
  const total = products.reduce((a, p) => a + p.reviewCount, 0);
  return (
    <section id="reviews" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <SectionTitle kicker="Reviews" title="Loved by listeners" />
      <div className="mb-10 flex items-center justify-center gap-3">
        <span className="text-5xl font-bold">{avg}</span>
        <div><div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={18} className="fill-[var(--accent)] text-accent" />)}</div>
          <p className="text-sm text-white/60">{total.toLocaleString()} verified reviews</p></div>
      </div>
      <div className="relative overflow-hidden" aria-roledescription="carousel" aria-label="Customer reviews">
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
          {REVIEWS.map((r, k) => {
            const p = products.find((x) => x.slug === r.product);
            return (
              <figure key={k} className="w-full shrink-0 px-1 sm:px-16" aria-hidden={k !== i}>
                <div className="glass rounded-[2rem] p-8 text-center sm:p-12">
                  <div className="mb-4 flex justify-center">{Array.from({ length: 5 }).map((_, s) => <Star key={s} size={18} className={s < r.rating ? "fill-[var(--accent)] text-accent" : "text-white/30"} />)}</div>
                  <blockquote className="text-xl leading-relaxed sm:text-2xl">“{r.text}”</blockquote>
                  <figcaption className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
                    <b className="text-white">{r.name}</b><BadgeCheck size={16} className="text-accent" /> Verified buyer · {p?.name}
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous review" className="glass absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full hover:bg-white/15 sm:grid"><ChevronLeft /></button>
        <button onClick={() => setI((i + 1) % n)} aria-label="Next review" className="glass absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full hover:bg-white/15 sm:grid"><ChevronRight /></button>
      </div>
      <div className="mt-6 flex justify-center gap-2">{REVIEWS.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-white/30"}`} />)}</div>
    </section>
  );
}
