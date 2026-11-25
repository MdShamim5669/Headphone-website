"use client";
import { motion } from "framer-motion";
/** Fades/slides children in when scrolled into view (respects reduced motion via CSS + framer). */
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
export function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{kicker}</p>
      <h2 className="mt-3 font-display text-5xl sm:text-6xl">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-white/70">{sub}</p>}
    </Reveal>
  );
}
