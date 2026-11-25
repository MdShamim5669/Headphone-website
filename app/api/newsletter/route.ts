import { NextResponse } from "next/server";
// Minimal validation; TODO(agent): connect to an email provider (e.g. Resend audience) via env vars.
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
