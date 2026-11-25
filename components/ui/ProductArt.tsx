/** Lightweight 2D headphone illustration (no 3D) used for thumbnails/cards so many products stay fast.
 *  TODO(agent): replace with real WebP posters in public/images/<slug>.webp when rendered. */
export default function ProductArt({ accent, from, color = "#ffffff", className = "" }: { accent: string; from: string; color?: string; className?: string }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at 50% 35%, ${accent}55, ${from} 70%)` }}>
      <svg viewBox="0 0 200 180" className="h-3/4 w-3/4 drop-shadow-[0_20px_30px_rgba(0,0,0,.45)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" aria-hidden>
        <path d="M40 110 V85 a60 60 0 0 1 120 0 V110" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" />
        <path d="M40 85 a60 60 0 0 1 120 0" fill="none" stroke={accent} strokeWidth="3" opacity=".7" />
        <rect x="18" y="95" width="44" height="66" rx="20" fill={color} />
        <rect x="138" y="95" width="44" height="66" rx="20" fill={color} />
        <rect x="26" y="105" width="28" height="46" rx="13" fill="#000" opacity=".25" />
        <rect x="146" y="105" width="28" height="46" rx="13" fill="#000" opacity=".25" />
        <circle cx="160" cy="112" r="3" fill={accent} />
      </svg>
    </div>
  );
}
