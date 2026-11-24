import Link from "next/link";
import Logo from "./Logo";
import Newsletter from "@/components/ui/Newsletter";
const COLS = {
  Shop: [["All headphones", "/shop"], ["Cart", "/cart"], ["Wishlist", "/shop?wishlist=1"]],
  Support: [["FAQ", "/faq"], ["Shipping", "/shipping"], ["Returns", "/returns"], ["Warranty", "/warranty"]],
  Company: [["About", "/about"], ["Contact", "/contact"]],
  Legal: [["Privacy", "/privacy"], ["Terms", "/terms"]],
};
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-white/60">Headphones you can explore in 3D before they reach your ears.</p>
          <Newsletter compact />
        </div>
        {Object.entries(COLS).map(([t, ls]) => (
          <div key={t}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">{t}</h3>
            <ul className="space-y-2 text-sm">{ls.map(([l, h]) => <li key={h}><Link className="text-white/75 transition hover:text-accent" href={h}>{l}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-xs text-white/50">
        <p>© {new Date().getFullYear()} SONIQ Audio. All rights reserved.</p>
        <div className="flex gap-2">{["VISA", "Mastercard", "AMEX", "PayPal", "bKash"].map((p) => <span key={p} className="rounded border border-white/15 px-2 py-1">{p}</span>)}</div>
        <div className="flex gap-4">{["Instagram", "YouTube", "X", "TikTok"].map((s) => <a key={s} href="#" className="hover:text-accent">{s}</a>)}</div>
        <span>USD · English</span>
      </div>
    </footer>
  );
}
