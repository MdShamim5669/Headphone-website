import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-display text-[9rem] leading-none text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold">This track doesn&apos;t exist</h1>
      <p className="mt-3 text-white/60">The page you&apos;re looking for was moved or never existed.</p>
      <div className="mt-8 flex gap-3"><Link href="/" className="btn btn-accent">Back home</Link><Link href="/shop" className="btn btn-ghost">Shop headphones</Link></div>
    </div>
  );
}
