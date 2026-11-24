import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" aria-label="SONIQ home" className="flex items-center gap-2 font-bold tracking-[0.2em] text-lg">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <path d="M6 18a10 10 0 0 1 20 0" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        <rect x="3" y="17" width="6" height="10" rx="3" fill="var(--accent)" />
        <rect x="23" y="17" width="6" height="10" rx="3" fill="var(--accent)" />
      </svg>
      SONIQ
    </Link>
  );
}
