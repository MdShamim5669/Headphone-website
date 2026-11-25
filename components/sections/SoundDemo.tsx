"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/ui/Reveal";

/** Sound experience: a generated music loop + city noise via Web Audio, with an ANC on/off demo and a live visualizer.
 *  Nothing plays until the user clicks Play (no autoplay). No audio files needed.
 *  TODO(agent): optionally swap the synth for real samples in public/audio/ when the user provides them. */
export default function SoundDemo() {
  const [playing, setPlaying] = useState(false);
  const [anc, setAnc] = useState(true);
  const ctx = useRef<AudioContext | null>(null);
  const nodes = useRef<{ noise: GainNode; analyser: AnalyserNode; master: GainNode; timer?: number } | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const start = () => {
    const ac = ctx.current ?? new AudioContext(); ctx.current = ac;
    const master = ac.createGain(); master.gain.value = 0.5;
    const analyser = ac.createAnalyser(); analyser.fftSize = 256;
    master.connect(analyser); analyser.connect(ac.destination);
    // noise bed (the "city" that ANC removes)
    const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const d = buf.getChannelData(0);
    let last = 0; for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
    const noise = ac.createGain(); noise.gain.value = anc ? 0.02 : 0.6; src.connect(noise).connect(master); src.start();
    // simple chord loop + bass
    const chords = [[220, 277.2, 329.6], [196, 246.9, 293.7], [174.6, 220, 261.6], [196, 246.9, 329.6]];
    let step = 0;
    const tick = () => {
      const t = ac.currentTime; const c = chords[step++ % chords.length];
      [...c, c[0] / 2].forEach((f, k) => {
        const o = ac.createOscillator(); const g = ac.createGain();
        o.type = k === 3 ? "sine" : "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(k === 3 ? 0.28 : 0.09, t + 0.05); g.gain.exponentialRampToValueAtTime(0.001, t + 1.15);
        o.connect(g).connect(master); o.start(t); o.stop(t + 1.2);
      });
    };
    tick(); const timer = window.setInterval(tick, 1200);
    nodes.current = { noise, analyser, master, timer };
    (src as AudioBufferSourceNode & { _stop?: () => void })._stop = () => src.stop();
    nodes.current = { ...nodes.current, timer };
    (nodes.current as unknown as { src: AudioBufferSourceNode }).src = src;
    setPlaying(true);
  };
  const stop = () => {
    const n = nodes.current as (typeof nodes.current & { src?: AudioBufferSourceNode }) | null;
    if (n) { clearInterval(n.timer); n.src?.stop(); n.master.disconnect(); }
    nodes.current = null; setPlaying(false);
  };
  useEffect(() => { const n = nodes.current; if (n && ctx.current) n.noise.gain.setTargetAtTime(anc ? 0.02 : 0.6, ctx.current.currentTime, 0.15); }, [anc]);
  useEffect(() => () => { stop(); ctx.current?.close(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // visualizer (idle animation when not playing)
  useEffect(() => {
    const c = canvas.current; if (!c) return; const g = c.getContext("2d")!; let raf = 0;
    const data = new Uint8Array(128);
    const draw = (t: number) => {
      const w = (c.width = c.clientWidth * devicePixelRatio), h = (c.height = c.clientHeight * devicePixelRatio);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#7dffb3";
      g.clearRect(0, 0, w, h); g.fillStyle = accent;
      const n = nodes.current; if (n) n.analyser.getByteFrequencyData(data);
      const bars = 64, bw = w / bars;
      for (let i = 0; i < bars; i++) {
        const v = n ? data[i] / 255 : (Math.sin(t / 600 + i / 4) + 1) * 0.08 + 0.04;
        const bh = Math.max(4, v * h * 0.9);
        g.globalAlpha = 0.35 + v * 0.65; g.beginPath(); g.roundRect(i * bw + bw * 0.2, (h - bh) / 2, bw * 0.6, bh, bw * 0.3); g.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw); return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="sound" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionTitle kicker="Sound Experience" title="Hear the silence" sub="Press play, then flip noise cancelling on and off. Best with headphones." />
      <div className="glass rounded-[2rem] p-6 sm:p-10">
        <canvas ref={canvas} className="h-40 w-full sm:h-56" aria-hidden />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button onClick={playing ? stop : start} className="btn btn-accent" aria-label={playing ? "Pause demo" : "Play demo"}>
            {playing ? <Pause size={18} /> : <Play size={18} />} {playing ? "Pause" : "Play demo"}
          </button>
          <button role="switch" aria-checked={anc} onClick={() => setAnc(!anc)} className="glass flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm">
            <ShieldCheck size={16} className={anc ? "text-accent" : "text-white/50"} /> Noise cancelling
            <span className={`relative h-7 w-12 rounded-full transition ${anc ? "bg-accent" : "bg-white/20"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-black transition-all ${anc ? "left-6" : "left-1"}`} /></span>
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-white/50" aria-live="polite">{playing ? (anc ? "ANC on — background noise removed" : "ANC off — you hear the street") : "Muted until you press play"}</p>
      </div>
    </section>
  );
}
