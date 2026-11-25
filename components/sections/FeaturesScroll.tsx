"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BatteryFull, Bluetooth, Ear, AudioWaveform, ShieldCheck } from "lucide-react";
import { useActiveProduct } from "@/store/useProductStore";

const Viewer = dynamic(() => import("@/components/three/Viewer"), { ssr: false });

const STEPS = [
  { icon: ShieldCheck, title: "Active Noise Cancellation", text: "Six microphones read the world 50,000 times a second and cancel it out, so only your music remains.", angle: 0 },
  { icon: AudioWaveform, title: "40mm Hi-Res drivers", text: "Custom dynamic drivers deliver deep, controlled bass and crisp highs across 4Hz–40kHz.", angle: 1.2 },
  { icon: BatteryFull, title: "Up to 60h battery", text: "A full week of commutes on one charge. Ten minutes on USB-C gives you five more hours.", angle: 2.6 },
  { icon: Ear, title: "Memory-foam cushions", text: "Protein-leather cushions mould to your ears, sealing out noise without pressure.", angle: 3.8 },
  { icon: Bluetooth, title: "Bluetooth 5.3 multipoint", text: "Stay connected to laptop and phone at once, with low-latency mode for games and video.", angle: 5.2 },
];

/** Scroll story: the 3D model stays pinned (sticky) and turns to each feature as its text scrolls into view. */
export default function FeaturesScroll() {
  const p = useActiveProduct();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r)); return () => io.disconnect();
  }, []);
  const S = STEPS[active];
  return (
    <section id="features" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="sticky top-20 z-0 h-[48vh] lg:top-0 lg:h-screen lg:py-24">
          <div className="relative h-full">
            <Viewer product={p} angle={S.angle} className="h-full w-full" distance={4.6} />
            <div key={active} className="glass pointer-events-none absolute left-2 top-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold [animation:fadeIn_.5s_ease]">
              <S.icon size={16} className="text-accent" /> {S.title}
            </div>
            <div className="absolute bottom-4 left-2 flex gap-1.5" aria-hidden>{STEPS.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-accent" : "w-1.5 bg-white/30"}`} />)}</div>
          </div>
        </div>
        <div className="relative z-10 pb-[30vh] lg:pt-[30vh]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Features</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl">Engineered for focus</h2>
          {STEPS.map((s, i) => (
            <div key={s.title} ref={(el) => { refs.current[i] = el; }} data-i={i}
              className={`flex min-h-[60vh] flex-col justify-center transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-35"}`}>
              <s.icon className="mb-4 text-accent" size={36} />
              <h3 className="text-3xl font-bold sm:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-lg text-white/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
