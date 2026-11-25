# SONIQ — 3D Interactive Headphone Store

A Next.js 15 e-commerce site that sells headphones with real, rotatable 3D (GLB) models.

## Features
- **3D hero**: drag/touch to rotate, scroll/pinch to zoom, floating themed particles, product switcher that swaps the model, background gradient, accent color and headlines.
- **Home sections**: collection carousel, scroll-driven feature story, color configurator, sound demo (Web Audio, muted until clicked), specs/compare, reviews, marquee, FAQ, newsletter CTA.
- **Store**: `/shop` (filter + sort), `/product/[slug]`, `/cart`, `/checkout` (3-step demo), `/order/success`.
- **Cart** with Zustand + localStorage, slide-in cart drawer, coupon support.
- **Info pages**: about, contact (form + `/api/contact`), FAQ, shipping, returns, warranty, privacy, terms, custom 404.
- **SEO**: metadata, generated Open Graph image, `sitemap.xml`, `robots.txt`, Organization + Product JSON-LD.
- Mobile layout, keyboard skip link, reduced-motion support.

## Tech stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · three.js · @react-three/fiber · @react-three/drei · Zustand · Framer Motion · lucide-react

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```
Copy `.env.example` to `.env.local` if you want to set optional keys (no values are required for the demo).

## 3D models
- Original source models (large, ~18–20 MB each) live in `assets/`.
- Optimized web versions (~1.1–1.2 MB each, WebP textures + meshopt) live in `public/models/`:
  `bose-qc2.glb`, `hybrid-anc.glb`, `crusher-540.glb`.
- Re-run the optimizer after changing a source model: `npm run optimize:models`.
- To add a product: add an optimized GLB to `public/models/` and a new entry in `data/products.json` (name, price, theme colors, variants, specs, `model` path).

## Project structure
```
app/                 routes (home, shop, product, cart, checkout, info pages, API routes)
components/          UI: hero, three (Viewer, HeadphoneModel, Particles), sections, layout, shop, checkout
data/                products.json + info page copy
lib/                 types, product helpers, utils
store/               Zustand stores (cart, active product)
public/models/       optimized GLB files
assets/              original GLB source files
Agent Progress save/ AI-agent progress notes, logs and scripts (not part of the website)
```

## Not yet connected (demo mode)
- Payments: checkout is a demo. Stripe can be added when `STRIPE_SECRET_KEY` is set.
- Contact/newsletter emails: forms validate but don't send email yet (Resend planned).
