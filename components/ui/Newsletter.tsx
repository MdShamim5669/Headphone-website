"use client";
import { useState } from "react";
export default function Newsletter({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email") as string;
        const r = await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }), headers: { "Content-Type": "application/json" } });
        setState(r.ok ? "ok" : "err");
      }}
      className={`flex gap-2 ${compact ? "" : "mx-auto max-w-md"}`}
    >
      <label htmlFor={compact ? "nl-f" : "nl-m"} className="sr-only">Email</label>
      <input id={compact ? "nl-f" : "nl-m"} name="email" type="email" required placeholder="you@email.com" className="min-w-0 flex-1 !rounded-full" />
      <button className="btn btn-accent !py-2 text-sm">{state === "ok" ? "Subscribed ✓" : "Join"}</button>
      {state === "err" && <p role="alert" className="text-xs text-red-300">Please enter a valid email.</p>}
    </form>
  );
}
