import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
export const metadata: Metadata = { title: "Contact us", description: "Questions about an order, a product or a warranty claim? Our team replies within 24 hours.", alternates: { canonical: "/contact" } };
const INFO = [[Mail, "support@soniq.example.com"], [Phone, "+880 1700-000000"], [MapPin, "Gulshan 2, Dhaka, Bangladesh"]] as const;
export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-32 lg:grid-cols-[1fr_1.3fr] lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Contact</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Let&apos;s talk</h1>
        <p className="mt-5 text-white/70">Questions about an order, a product or a warranty claim? We reply within 24 hours, 7 days a week.</p>
        <ul className="mt-8 space-y-4">{INFO.map(([I, t]) => <li key={t} className="flex items-center gap-3 text-white/80"><span className="glass grid h-10 w-10 place-items-center rounded-full"><I size={18} className="text-accent" /></span>{t}</li>)}</ul>
      </div>
      <ContactForm />
    </div>
  );
}
