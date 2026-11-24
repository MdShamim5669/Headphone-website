"use client";
import { useEffect, useRef, useState } from "react";
/** Custom cursor: circle that grows over interactive elements, shows "Drag" over the 3D canvas. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "hover" | "drag">("");
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      setMode(t.closest("[data-cursor='drag']") ? "drag" : t.closest("a,button,[data-cursor='hover'],input,select,label") ? "hover" : "");
    };
    const loop = () => { cx += (x - cx) * 0.22; cy += (y - cy) * 0.22; if (ref.current) ref.current.style.transform = `translate(${cx}px,${cy}px)`; raf = requestAnimationFrame(loop); };
    window.addEventListener("pointermove", move); loop();
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  const size = mode === "drag" ? 72 : mode === "hover" ? 44 : 14;
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[999] hidden [@media(pointer:fine)]:block">
      <div className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent text-[11px] font-bold uppercase tracking-wider text-black transition-all duration-200"
        style={{ width: size, height: size, background: mode === "drag" ? "var(--accent)" : mode === "hover" ? "transparent" : "var(--accent)" }}>
        {mode === "drag" && "Drag"}
      </div>
    </div>
  );
}
