"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, CreditCard, Smartphone, Truck } from "lucide-react";
import { useCart, cartSubtotal } from "@/store/useCartStore";
import { money, totals } from "@/lib/utils";
import Summary from "./Summary";
import { useHydrated } from "./useHydrated";

type Form = { email: string; name: string; phone: string; address: string; city: string; zip: string; country: string; ship: "standard" | "express"; pay: "card" | "mobile" | "cod" };
const EMPTY: Form = { email: "", name: "", phone: "", address: "", city: "", zip: "", country: "Bangladesh", ship: "standard", pay: "card" };
const STEPS = ["Contact", "Shipping", "Payment"] as const;

function validate(f: Form, step: number) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (step === 0) {
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (f.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^[+\d][\d\s-]{6,}$/.test(f.phone)) e.phone = "Enter a valid phone number";
  }
  if (step === 1) {
    if (f.address.trim().length < 5) e.address = "Enter your street address";
    if (f.city.trim().length < 2) e.city = "Enter your city";
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(f.zip)) e.zip = "Enter a valid postal code";
  }
  return e;
}

/** 3-step demo checkout (contact → shipping → payment). No real charge is made.
 *  TODO(agent): when STRIPE_SECRET_KEY is set, POST the cart to an /api/checkout route and redirect to Stripe Checkout. */
export default function CheckoutClient() {
  const hydrated = useHydrated();
  const router = useRouter();
  const items = useCart((s) => s.items);
  const coupon = useCart((s) => s.coupon);
  const clear = useCart((s) => s.clear);
  const sub = useCart(cartSubtotal);
  const [f, setF] = useState<Form>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  if (!hydrated) return <p className="mt-10 text-white/60">Loading…</p>;
  if (!items.length) return (
    <div className="glass mt-10 rounded-3xl p-14 text-center"><p className="font-display text-5xl">Nothing to check out</p>
      <Link href="/shop" className="btn btn-accent mt-6">Browse headphones</Link></div>
  );

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(f, step); setErrors(v);
    if (Object.keys(v).length) return;
    if (step < 2) { setStep(step + 1); return; }
    setBusy(true);
    const t = totals(sub, coupon);
    const total = t.total + (f.ship === "express" ? 15 : 0);
    const order = { id: "SQ-" + Date.now().toString(36).toUpperCase(), email: f.email, name: f.name, total, items, pay: f.pay, ship: f.ship, date: new Date().toISOString() };
    sessionStorage.setItem("soniq-last-order", JSON.stringify(order));
    setTimeout(() => { clear(); router.push(`/order/success?id=${order.id}`); }, 900);
  };

  const field = (k: keyof Form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block text-sm">
      <span className="mb-1 block text-white/70">{label}</span>
      <input value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={`w-full ${errors[k] ? "!border-red-400" : ""}`} {...props} />
      {errors[k] && <span id={`${k}-err`} className="mt-1 block text-xs text-red-300">{errors[k]}</span>}
    </label>
  );

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
      <form onSubmit={next} noValidate className="space-y-6">
        <ol className="flex gap-2" aria-label="Checkout steps">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1">
              <button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}
                className={`w-full rounded-full px-3 py-2 text-sm transition ${i === step ? "bg-accent text-black" : i < step ? "glass text-accent" : "glass text-white/40"}`}>{i + 1}. {s}</button>
            </li>
          ))}
        </ol>
        <div className="glass space-y-4 rounded-3xl p-6">
          {step === 0 && <>
            <h2 className="text-lg font-semibold">Contact</h2>
            {field("email", "Email", { type: "email", autoComplete: "email" })}
            <div className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full name", { autoComplete: "name" })}
              {field("phone", "Phone", { type: "tel", autoComplete: "tel" })}
            </div>
          </>}
          {step === 1 && <>
            <h2 className="text-lg font-semibold">Shipping address</h2>
            {field("address", "Street address", { autoComplete: "street-address" })}
            <div className="grid gap-4 sm:grid-cols-3">
              {field("city", "City", { autoComplete: "address-level2" })}
              {field("zip", "Postal code", { autoComplete: "postal-code" })}
              <label className="block text-sm"><span className="mb-1 block text-white/70">Country</span>
                <select value={f.country} onChange={set("country")} className="w-full">{["Bangladesh", "India", "United States", "United Kingdom", "Canada", "Germany", "Australia"].map((c) => <option key={c}>{c}</option>)}</select></label>
            </div>
            <fieldset className="grid gap-3 sm:grid-cols-2"><legend className="mb-2 text-sm text-white/70">Delivery</legend>
              {([["standard", "Standard · 3–5 days", "Included"], ["express", "Express · 1–2 days", money(15)]] as const).map(([v, l, price]) => (
                <label key={v} className={`glass flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition hover:bg-white/10 ${f.ship === v ? "!border-[var(--accent)]" : ""}`}>
                  <input type="radio" name="ship" value={v} checked={f.ship === v} onChange={set("ship")} className="accent-[var(--accent)]" />
                  <Truck size={16} className="text-accent" /><span className="flex-1">{l}</span><span className="text-sm text-white/60">{price}</span>
                </label>
              ))}
            </fieldset>
          </>}
          {step === 2 && <>
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="text-sm text-white/60">Demo store — no real payment is taken.</p>
            <fieldset className="grid gap-3 sm:grid-cols-3"><legend className="sr-only">Payment method</legend>
              {([["card", "Card", CreditCard], ["mobile", "bKash / Nagad", Smartphone], ["cod", "Cash on delivery", Truck]] as const).map(([v, l, Icon]) => (
                <label key={v} className={`glass flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-4 text-center text-sm transition hover:bg-white/10 ${f.pay === v ? "!border-[var(--accent)]" : ""}`}>
                  <input type="radio" name="pay" value={v} checked={f.pay === v} onChange={set("pay")} className="sr-only" />
                  <Icon size={22} className="text-accent" />{l}
                </label>
              ))}
            </fieldset>
            <div className="rounded-2xl border border-white/10 p-4 text-sm text-white/70">
              <p><span className="text-white">{f.name}</span> · {f.email} · {f.phone}</p>
              <p>{f.address}, {f.city} {f.zip}, {f.country}</p>
            </div>
          </>}
        </div>
        <div className="flex items-center justify-between gap-3">
          {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="btn btn-ghost">Back</button> : <Link href="/cart" className="btn btn-ghost">Back to cart</Link>}
          <button type="submit" disabled={busy} className="btn btn-accent disabled:opacity-60">
            {step < 2 ? "Continue" : busy ? "Placing order…" : <><Lock size={16} /> Place order</>}
          </button>
        </div>
      </form>
      <Summary>{f.ship === "express" && <p className="text-sm text-white/70">+ {money(15)} express delivery at payment</p>}</Summary>
    </div>
  );
}
