"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionTitle } from "@/components/ui/Reveal";

export const FAQS = [
  ["How long does shipping take?", "Orders ship within 24 hours. Standard delivery takes 3–5 business days; express takes 1–2. Shipping is free on orders over $150."],
  ["What is the warranty?", "Every SONIQ headphone has a 2-year limited warranty covering manufacturing defects, plus free battery replacement in year one."],
  ["Can I return my headphones?", "Yes — 30-day no-questions-asked returns. Send them back in any condition and we refund you within 5 days of receiving them."],
  ["Do they work with iPhone, Android and laptops?", "Yes. All models use Bluetooth 5.3 with multipoint, so you can pair with two devices at once. A 3.5mm cable is included for wired use."],
  ["Do you ship to Bangladesh?", "Yes, we ship worldwide including Bangladesh. Duties are calculated at checkout so there are no surprise fees."],
] as const;

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24">
      <SectionTitle kicker="FAQ" title="Questions, answered" />
      <div className="space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className="glass overflow-hidden rounded-2xl">
            <h3>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold transition hover:text-accent">
                {q}<Plus size={18} className={`shrink-0 transition ${open === i ? "rotate-45 text-accent" : ""}`} />
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden px-6 text-white/70"><span className="block pb-5">{a}</span></p>
            </div>
          </div>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}
