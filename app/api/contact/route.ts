import { NextResponse } from "next/server";
// Validates a contact message. TODO(agent): send it by email (e.g. Resend) when RESEND_API_KEY is set.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const name = String(b.name ?? "").trim(), email = String(b.email ?? "").trim(), message = String(b.message ?? "").trim();
  if (b.company) return NextResponse.json({ ok: true }); // honeypot: silently accept bots
  if (name.length < 2 || name.length > 80) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!EMAIL.test(email) || email.length > 200) return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  if (message.length < 10 || message.length > 2000) return NextResponse.json({ ok: false, error: "Message must be 10–2000 characters." }, { status: 400 });
  return NextResponse.json({ ok: true });
}
