"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { money } from "@/lib/utils";
interface Order { id: string; email: string; name: string; total: number; items: { sku: string; name: string; variant: string; qty: number; price: number }[]; date: string }

/** Order confirmation, read from sessionStorage (demo; a real store would load it from the DB/Stripe session). */
export default function SuccessClient() {
  const id = useSearchParams().get("id");
  const [o, setO] = useState<Order | null>(null);
  useEffect(() => { try { const x = JSON.parse(sessionStorage.getItem("soniq-last-order") || "null"); if (x && (!id || x.id === id)) setO(x); } catch {} }, [id]);
  return (
    <div className="glass rounded-[2rem] p-8 text-center sm:p-12">
      <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="mx-auto w-fit text-accent"><CheckCircle2 size={72} /></motion.div>
      <h1 className="mt-4 font-display text-6xl">Thank you!</h1>
      <p className="mt-2 text-white/70">{o ? <>Order <b className="text-white">{o.id}</b> is confirmed. A receipt goes to {o.email}.</> : <>Your order{id ? <> <b className="text-white">{id}</b></> : null} is confirmed.</>}</p>
      {o && (
        <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm">
          {o.items.map((i) => <li key={i.sku} className="flex justify-between border-b border-white/10 pb-2"><span>{i.qty} × {i.name} <span className="text-white/50">({i.variant})</span></span><span>{money(i.qty * i.price)}</span></li>)}
          <li className="flex justify-between pt-2 text-base font-semibold"><span>Total paid</span><span>{money(o.total)}</span></li>
        </ul>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/shop" className="btn btn-accent">Keep shopping</Link><Link href="/" className="btn btn-ghost">Home</Link></div>
    </div>
  );
}
