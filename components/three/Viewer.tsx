"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, OrbitControls, useGLTF, useProgress, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OC } from "three-stdlib";
import { RotateCcw } from "lucide-react";
import HeadphoneModel from "./HeadphoneModel";
import Particles from "./Particles";
import type { Product } from "@/lib/types";

export interface ViewerProps {
  product: Product; tint?: string; mode?: "hero" | "full"; particles?: boolean; hotspots?: boolean;
  preload?: string[]; className?: string; distance?: number;
  /** If set, the model turns to this Y angle (radians) instead of idle-spinning (used by the scroll story). */
  angle?: number;
}

const webglOK = () => { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; } };

/** Interactive 3D headphone viewer: drag rotate, Ctrl/focus wheel zoom, idle auto-rotate, hover tilt, hotspots, reset. */
export default function Viewer({ product, tint, mode = "full", particles = false, hotspots = false, preload = [], className = "", distance = 4.2, angle }: ViewerProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [zoomOK, setZoomOK] = useState(false);
  const [ok, setOk] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  const resetRef = useRef(0);
  const keyRot = useRef(0);
  // model swap with blur/scale out → in (like the reference video)
  const [shown, setShown] = useState(product);
  const [phase, setPhase] = useState<"in" | "out">("in");
  useEffect(() => {
    if (product.id === shown.id) return;
    setPhase("out");
    const t = setTimeout(() => { setShown(product); setPhase("in"); }, 420);
    return () => clearTimeout(t);
  }, [product, shown.id]);

  useEffect(() => { setOk(webglOK()); }, []);
  useEffect(() => { preload.forEach((u) => useGLTF.preload(u)); }, [preload]);
  // pause rendering while off-screen
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  // wheel zoom only with Ctrl held or when the canvas is focused (never hijack page scroll)
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const w = (e: WheelEvent) => setZoomOK(e.ctrlKey || document.activeElement === el);
    el.addEventListener("wheel", w, { capture: true, passive: true });
    return () => el.removeEventListener("wheel", w, { capture: true });
  }, []);

  if (!ok) return (
    <div className={`grid place-items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/${shown.slug}.webp`} alt={`${shown.name} headphones`} className="max-h-full max-w-full object-contain" />
    </div>
  );

  return (
    <div ref={wrap} tabIndex={0} data-cursor="drag" role="img"
      aria-label={`Interactive 3D model of ${shown.name}. Drag to rotate, arrow keys to turn, double-click to reset.`}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") keyRot.current -= 0.3; if (e.key === "ArrowRight") keyRot.current += 0.3; if (e.key === "r") resetRef.current++; }}
      onDoubleClick={() => resetRef.current++}
      className={`relative outline-none ${className}`}
      style={{ transition: "filter .42s ease, transform .42s ease, opacity .42s ease", filter: phase === "out" ? "blur(14px)" : "blur(0)", transform: phase === "out" ? "scale(.85) rotate(-6deg)" : "none", opacity: phase === "out" ? 0.2 : 1 }}>
      <Canvas shadows dpr={[1, dpr]} frameloop={visible ? "always" : "never"} camera={{ position: [0, 0.2, distance], fov: 35 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        className="!touch-pan-y">
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} castShadow />
        <pointLight position={[-3, 1, 2]} intensity={12} color={shown.theme.accent} />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} />
          <Lightformer intensity={1.5} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer intensity={1} position={[4, 1, -2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color={shown.theme.accent} />
        </Environment>
        <Suspense fallback={null}>
          <Rig mode={mode} resetRef={resetRef} keyRot={keyRot} zoom={zoomOK} distance={distance} angle={angle}>
            <HeadphoneModel product={shown} tint={tint} />
            {hotspots && shown.hotspots.map((h) => (
              <Html key={h.label} position={h.position} center distanceFactor={6} zIndexRange={[20, 0]}>
                <div className="group relative">
                  <span className="block h-4 w-4 animate-pulse rounded-full border-2 border-white bg-accent shadow-[0_0_12px_var(--accent)]" />
                  <span className="glass pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs opacity-0 transition group-hover:opacity-100">{h.label}</span>
                </div>
              </Html>
            ))}
          </Rig>
        </Suspense>
        {particles && <Particles kind={shown.theme.particles} color={shown.theme.accent} />}
        <ContactShadows position={[0, -1.35, 0]} opacity={0.55} scale={7} blur={2.6} far={3} />
      </Canvas>
      <Loader />
      <button onClick={() => resetRef.current++} aria-label="Reset 3D view" className="glass absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full transition hover:scale-110"><RotateCcw size={16} /></button>
    </div>
  );
}

function Loader() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-live="polite">
      <div className="text-center">
        <div className="mx-auto h-1 w-40 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} /></div>
        <p className="mt-2 text-xs tracking-widest text-white/70">LOADING {Math.round(progress)}%</p>
      </div>
    </div>
  );
}

/** Controls + idle logic: auto-rotate when idle, pause on drag, resume after 3s; hover tilt; animated reset / spring-back. */
function Rig({ children, mode, resetRef, keyRot, zoom, distance, angle }: {
  children: React.ReactNode; angle?: number; mode: "hero" | "full"; resetRef: React.MutableRefObject<number>; keyRot: React.MutableRefObject<number>; zoom: boolean; distance: number;
}) {
  const g = useRef<THREE.Group>(null);
  const controls = useRef<OC>(null);
  const { camera, gl } = useThree();
  // Touch screens: OrbitControls sets touch-action:none, which traps page scrolling on a big
  // mobile canvas. Allow vertical page scroll (pan-y); horizontal drags still rotate the model.
  useEffect(() => {
    if (!matchMedia("(pointer: coarse)").matches) return;
    const el = gl.domElement;
    const apply = () => { el.style.touchAction = "pan-y"; };
    apply(); const id = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(id);
  }, [gl]);
  const st = useRef({ dragging: false, lastEnd: -10, ended: false, reset: 0, resetting: false, spin: 0 });
  const home = useMemo(() => new THREE.Vector3(0, 0.2, distance), [distance]);
  const reduced = useMemo(() => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useFrame((s, dt) => {
    const r = st.current; const now = s.clock.elapsedTime;
    if (r.ended) { r.ended = false; r.lastEnd = now; } // release time on the r3f clock
    if (resetRef.current !== r.reset) { r.reset = resetRef.current; r.resetting = true; r.spin = 0; }
    const idle = !r.dragging && now - r.lastEnd > 3;
    if (mode === "hero" && idle && !r.resetting && camera.position.distanceTo(home) > 0.05) r.resetting = true; // spring back
    if (r.resetting) {
      camera.position.lerp(home, 0.08); controls.current?.target.lerp(new THREE.Vector3(), 0.08);
      if (camera.position.distanceTo(home) < 0.01) r.resetting = false;
    }
    if (g.current) {
      if (angle !== undefined) r.spin = angle; else if (idle && !reduced) r.spin += dt * 0.35;
      g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, r.spin + keyRot.current, 0.08);
      const tilt = r.dragging ? 0 : 1;
      g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.18 * tilt, 0.06);
      g.current.rotation.z = THREE.MathUtils.lerp(g.current.rotation.z, (mode === "hero" ? -0.12 : 0) - s.pointer.x * 0.08 * tilt, 0.06);
      g.current.position.y = Math.sin(now * 1.2) * 0.04;
    }
    controls.current?.update();
  });

  return (
    <>
      <OrbitControls ref={controls as never} makeDefault enablePan={false} enableDamping dampingFactor={0.08} enableZoom={zoom}
        minDistance={2.6} maxDistance={7} minPolarAngle={Math.PI * 0.2} maxPolarAngle={Math.PI * 0.72}
        onStart={() => { st.current.dragging = true; st.current.resetting = false; }}
        onEnd={() => { st.current.dragging = false; st.current.ended = true; }} />
      <group ref={g}>{children}</group>
    </>
  );
}
