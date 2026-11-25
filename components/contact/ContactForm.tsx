"use client";
import { useState } from "react";
import { Send } from "lucide-react";
type Status = "idle" | "sending" | "ok" | "error";
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setStatus("sending"); setErr("");
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const json = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) { setStatus("ok"); form.reset(); } else { setStatus("error"); setErr(json.error ?? "Something went wrong. Please try again."); }
  }
  const input = "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/40 focus:border-accent";
  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 md:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">Name<input name="name" required minLength={2} maxLength={80} className={input} placeholder="Your name" /></label>
        <label className="space-y-1 text-sm">Email<input name="email" type="email" required maxLength={200} className={input} placeholder="you@example.com" /></label>
      </div>
      <label className="block space-y-1 text-sm">Topic
        <select name="topic" className={input} defaultValue="Order">{["Order", "Product question", "Warranty", "Returns", "Other"].map((t) => <option key={t} className="bg-neutral-900">{t}</option>)}</select>
      </label>
      <label className="block space-y-1 text-sm">Message<textarea name="message" required minLength={10} maxLength={2000} rows={6} className={input} placeholder="How can we help?" /></label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button disabled={status === "sending"} className="btn btn-accent disabled:opacity-60"><Send size={16} />{status === "sending" ? "Sending…" : "Send message"}</button>
      <p aria-live="polite" className="text-sm">
        {status === "ok" && <span className="text-accent">Thanks! We&apos;ll reply within 24 hours.</span>}
        {status === "error" && <span className="text-red-400">{err}</span>}
      </p>
    </form>
  );
}
