# DECISIONS
### 1. Where files go
Decision: agent logs/scripts in `Agent Progress save/`; website at repo root.
Why: user's explicit chat instruction (overrides instructions file §3 layout).
### 2. Stack
Decision: Next.js 15 App Router + TS + Tailwind v4 + three/r3f/drei + zustand + framer-motion + lucide-react.
Why: recommended in the task; well-known libs.
### 3. Payments
Decision: demo checkout (form + order success, Stripe-ready API route that only activates if STRIPE_SECRET_KEY is set).
Why: no payment account provided by the user yet.
