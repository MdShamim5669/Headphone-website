import Link from "next/link";
export type Block = { h: string; p: string[] };
export default function InfoPage({ kicker, title, intro, blocks, updated }: { kicker: string; title: string; intro: string; blocks: Block[]; updated?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-10 pt-32 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{kicker}</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">{title}</h1>
      <p className="mt-5 text-lg text-white/70">{intro}</p>
      {updated && <p className="mt-2 text-xs text-white/40">Last updated: {updated}</p>}
      <div className="mt-10 space-y-6">
        {blocks.map((b) => (
          <section key={b.h} className="glass rounded-3xl p-6 transition hover:border-accent/50">
            <h2 className="text-xl font-semibold">{b.h}</h2>
            {b.p.map((t, i) => <p key={i} className="mt-3 leading-relaxed text-white/70">{t}</p>)}
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-white/60">Still have questions? <Link href="/contact" className="text-accent hover:underline">Contact us</Link> or read the <Link href="/faq" className="text-accent hover:underline">FAQ</Link>.</p>
    </div>
  );
}
