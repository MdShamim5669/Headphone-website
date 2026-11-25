const ITEMS = ["What Hi-Fi? ★★★★★", "Red Dot Design 2026", "TechRadar Editor's Pick", "The Verge", "Wired Recommended", "SoundGuys Best ANC", "CNET Top Rated", "iF Design Award"];
/** Press / awards strip. Pure CSS marquee (pauses under reduced motion). */
export default function Marquee() {
  return (
    <section aria-label="Press and awards" className="border-y border-white/10 py-6 overflow-hidden">
      <div className="marquee flex w-max gap-14 whitespace-nowrap text-lg font-semibold text-white/50 hover:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map((t, i) => <span key={i} className="transition hover:text-accent" aria-hidden={i >= ITEMS.length}>{t}</span>)}
      </div>
    </section>
  );
}
