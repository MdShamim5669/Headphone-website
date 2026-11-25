import Newsletter from "@/components/ui/Newsletter";
import Reveal from "@/components/ui/Reveal";
export default function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24">
      <Reveal className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent opacity-30 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Members get more</p>
        <h2 className="mt-3 font-display text-5xl sm:text-6xl">10% off your first pair</h2>
        <p className="mx-auto mb-8 mt-4 max-w-md text-white/70">Join the newsletter for early drops and sound tips. Use code <b className="text-accent">SONIQ10</b> at checkout.</p>
        <Newsletter />
      </Reveal>
    </section>
  );
}
