"use client";
import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import type { Product } from "@/lib/types";

const TARGET = 2.2; // every model is scaled so its largest side = TARGET units

/** Loads a GLB, auto-centers + auto-scales it, applies per-product overrides and a live color tint. */
export default function HeadphoneModel({ product, tint = "#ffffff" }: { product: Product; tint?: string }) {
  const { scene } = useGLTF(product.model.glb);
  const { object, mats } = useMemo(() => {
    const object = scene.clone(true);
    const mats: THREE.MeshStandardMaterial[] = [];
    object.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        const mat = (m.material as THREE.MeshStandardMaterial).clone();
        mat.envMapIntensity = 1.2;
        m.material = mat; mats.push(mat);
      }
    });
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3()); const center = box.getCenter(new THREE.Vector3());
    const s = (TARGET / Math.max(size.x, size.y, size.z)) * product.model.scale;
    object.position.copy(center.multiplyScalar(-s));
    object.scale.setScalar(s);
    return { object, mats };
  }, [scene, product.model.scale]);

  useLayoutEffect(() => { mats.forEach((m) => m.color.set(tint)); }, [mats, tint]);
  useLayoutEffect(() => () => mats.forEach((m) => m.dispose()), [mats]); // free cloned materials on unmount

  return (
    <group rotation={product.model.rotation} position={product.model.position}>
      <primitive object={object} />
    </group>
  );
}
