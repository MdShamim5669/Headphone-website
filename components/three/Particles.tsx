"use client";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Floating themed particles (orbs / sound-wave rings / note-like shapes) with mouse parallax. */
export default function Particles({ kind, color, count = 26 }: { kind: "orbs" | "waves" | "notes"; color: string; count?: number }) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const r = 1.9 + Math.random() * 1.8;
    return { pos: new THREE.Vector3(Math.cos(a) * r, (Math.random() - 0.5) * 3.2, Math.sin(a) * r * 0.6 - 0.8),
      s: 0.04 + Math.random() * 0.1, speed: 0.3 + Math.random() * 0.7, phase: Math.random() * 10 };
  }), [count]);
  const geo = useMemo(() => kind === "waves" ? new THREE.TorusGeometry(1, 0.18, 8, 32) : kind === "notes" ? new THREE.OctahedronGeometry(1) : new THREE.SphereGeometry(1, 16, 16), [kind]);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9, roughness: 0.3, metalness: 0.2, transparent: true, opacity: 0.85 }), [color]);
  useFrame((st) => {
    const g = group.current; if (!g) return;
    const t = st.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, st.pointer.x * 0.25, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -st.pointer.y * 0.15, 0.04);
    g.children.forEach((c, i) => {
      const it = items[i];
      c.position.y = it.pos.y + Math.sin(t * it.speed + it.phase) * 0.18;
      c.rotation.x = t * it.speed; c.rotation.y = t * it.speed * 0.7;
    });
  });
  return (
    <group ref={group}>
      {items.map((it, i) => <mesh key={i} geometry={geo} material={mat} position={it.pos} scale={it.s} />)}
    </group>
  );
}
