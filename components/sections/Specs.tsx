"use client";
import { useState } from "react";
import { products } from "@/lib/products";
import { money } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/Reveal";

const ROWS: [string, string][] = [["driver", "Driver"], ["frequency", "Frequency"], ["battery", "Battery"], ["weight", "Weight"], ["bluetooth", "Bluetooth"], ["charging", "Charging"]];

/** Spec comparison: choose 2–3 headphones and compare them side by side. */
export default function Specs() {
  const [sel, setSel] = useState(products.slice(0, 3).map((p) => p.slug));
  const toggle = (s: string) => setSel((cur) => cur.includes(s) ? (cur.length > 2 ? cur.filter((x) => x !== s) : cur) : cur.length < 3 ? [...cur, s] : [...cur.slice(1), s]);
  const cols = products.filter((p) => sel.includes(p.slug));
  return (
    <section id="specs" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <SectionTitle kicker="Specs" title="Compare side by side" sub="Pick two or three models." />
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {products.map((p) => (
          <button key={p.id} onClick={() => toggle(p.slug)} aria-pressed={sel.includes(p.slug)}
            className={`rounded-full px-4 py-2 text-sm transition ${sel.includes(p.slug) ? "bg-accent font-semibold text-black" : "glass hover:bg-white/15"}`}>{p.name}</button>
        ))}
      </div>
      <div className="glass overflow-x-auto rounded-3xl">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Headphone specification comparison</caption>
          <thead><tr className="border-b border-white/10">
            <th scope="col" className="p-5 text-white/50">Spec</th>
            {cols.map((p) => <th key={p.id} scope="col" className="p-5 text-base font-semibold">{p.name}<span className="block text-sm font-normal text-accent">{money(p.price)}</span></th>)}
          </tr></thead>
          <tbody>
            {ROWS.map(([k, l]) => (
              <tr key={k} className="border-b border-white/5 transition hover:bg-white/5">
                <th scope="row" className="p-5 font-medium text-white/60">{l}</th>
                {cols.map((p) => <td key={p.id} className="p-5">{p.specs[k] ?? "—"}</td>)}
              </tr>
            ))}
            <tr className="transition hover:bg-white/5"><th scope="row" className="p-5 font-medium text-white/60">Features</th>
              {cols.map((p) => <td key={p.id} className="p-5">{p.features.join(" · ")}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
