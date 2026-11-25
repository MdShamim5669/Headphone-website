import { ImageResponse } from "next/og";

export const alt = "SONIQ — premium headphones you can explore in 3D";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social share image (replaces the old missing /og.png). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "radial-gradient(circle at 70% 40%, #0d3b2e, #03140f 70%)", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700, letterSpacing: 12 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <path d="M6 18a10 10 0 0 1 20 0" fill="none" stroke="#7dffb3" strokeWidth="3" strokeLinecap="round" />
            <rect x="3" y="17" width="6" height="10" rx="3" fill="#7dffb3" />
            <rect x="23" y="17" width="6" height="10" rx="3" fill="#7dffb3" />
          </svg>
          SONIQ
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 40, lineHeight: 1 }}>Pure Sound.</div>
        <div style={{ fontSize: 96, fontWeight: 800, color: "#7dffb3", lineHeight: 1.1 }}>Deeply Immersive.</div>
        <div style={{ fontSize: 32, marginTop: 36, opacity: 0.8 }}>Spin, zoom and explore premium headphones in 3D.</div>
      </div>
    ),
    size,
  );
}
