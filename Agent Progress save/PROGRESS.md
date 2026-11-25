# PROGRESS

## ⚡ QUICK STATE  (read this first; update at EVERY checkpoint)
- Overall: IN PROGRESS
- Current: Step 6/6 → README, brand assets (icon/OG), SEO/a11y/mobile polish, screenshots (Session #10)
- Last action: Session #10 started. Steps 5.2 + 5.3 are DONE (build log in scripts/logs/build.log shows all routes, EXIT=0, pushed in 2f96d86).
- NEXT ACTION: npm install + npm run build; then write README.md (repo root), app/icon.svg, app/opengraph-image; then a11y/mobile pass; screenshots LAST into `Agent Progress save/output/preview/`.
- Project runs?: YES (build passes with all pages)
- Last updated: 2026-11-25 18:35 (Asia/Dhaka) by Session #10

## ‼️ USER RULES FROM CHAT (Session #2, 2026-11-25)
- ALL agent-progress files (PROGRESS/COMMANDS/DECISIONS, checkpoint scripts, logs, previews, archive)
  live ONLY inside the folder `Agent Progress save/`.
- The actual website is built OUTSIDE that folder (repo root = Next.js app).
- Use the GLB files in `assets/` (3 headphones) as the product models.
- Session #1 (previous agent) did NOT push anything; it was stopped by a usage policy while
  optimizing GLBs and rendering posters. Everything restarted in Session #2.

## Definition of Done
- [ ] `npm run build` passes
- [ ] Home page: navbar, 3D hero with GLB rotate/zoom + product switcher with theme transitions, all home sections
- [ ] /shop, /product/[slug], /cart, /checkout (demo), /order/success, info pages, 404
- [ ] Cart (zustand + localStorage), wishlist, coupon
- [ ] Mobile layout + reduced motion + basic SEO (metadata, sitemap, robots, JSON-LD)
- [ ] README explains setup

## Plan
- [x] Step 0: progress folder, scripts, plan
- [ ] Step 1: Setup
  - [x] 1.1 Next.js scaffold at repo root (package.json, tsconfig, next.config.ts, postcss)
  - [x] 1.2 Install deps (three, r3f, drei, zustand, framer-motion, lucide-react)
  - [x] 1.3 Optimize GLBs → public/models (gltf-transform, webp textures, meshopt) + posters
- [x] Step 2: Data
  - [x] Step 2 data + design system: data/products.json, theme vars, fonts, Navbar, Footer, CartDrawer
- [x] Step 3: (done Session #5, build passes) 3D viewer (Scene, HeadphoneModel, loader, fallback) + Hero + product switcher
- [x] Step 4: (done Session #6, build passes) Home sections (Collection, FeaturesScroll, Configurator, Sound, Specs, Reviews, Marquee, FAQ, CTA)
- [x] Step 5: done (Session #8/#9)
  - [x] 5.1 shop + product/[slug] (build passes, Session #7)
  - [x] 5.2 cart, checkout, order/success (build passes)
  - [x] 5.3 info pages (about, contact, shipping, returns, warranty, privacy, terms) + 404 + sitemap/robots (build passes)
  (Session #6) Pages: shop, product/[slug], cart, checkout (demo, Stripe-ready), success, info pages, 404
- [ ] Step 6: ← IN PROGRESS (Session #10)
  - [ ] 6.1 README.md at repo root (setup, run, structure, GLB pipeline)
  - [ ] 6.2 brand assets: app/icon.svg, app/opengraph-image.tsx, metadata check, product JSON-LD
  - [ ] 6.3 a11y + mobile polish pass (focus rings, aria labels, reduced motion)
  - [ ] 6.4 final build + screenshots → Agent Progress save/output/preview/ (do LAST; sessions #5 and #9 were stopped while screenshotting)

## Done so far (details)
- Step 0: created `Agent Progress save/` structure; checkpoint.sh + autopush.sh adapted to this folder.

## Problems / Notes
- (none yet)

## Environment setup (run these on a fresh computer)
```
# git creds: store token only in ~/.git-credentials (see AI_AGENT_INSTRUCTIONS.md §2.2)
cd <repo> && npm install
npm run dev     # http://localhost:3000
npm run build
# start autopush:  nohup "Agent Progress save/scripts/autopush.sh" >/dev/null 2>&1 &
# checkpoint:      "Agent Progress save/scripts/checkpoint.sh" "msg"
```

## External actions (not in code)
- User gave repo URL + token in Notion AI chat (token NOT stored in repo).

## Session History
- Session #1: started, nothing pushed (stopped by usage policy).
- Session #2: NEW TASK setup, step 0 + step 1 done. It also WROTE (but never pushed) product data,
  stores, 3D scene, viewer, navbar/footer/cart drawer and hero, then was stopped by a usage policy.
  Those files were LOST. Lesson: checkpoint right after each file batch.
- Session #3 (2026-11-25): started, resuming from step 2 (rewriting the lost files). Pushed step 2 + Viewer/HeadphoneModel/Particles; stopped by usage policy while writing hero/ProductSwitcher (lost).
- Session #4 (2026-11-25): started, resuming from step 3 (hero + switcher). User re-confirmed: progress files ONLY in `Agent Progress save/`, website outside, use assets/*.glb. Pushed hero/switcher/page (b9bb290); build FAILED on lib/products.ts type cast (see scripts/logs/build.log).
- Session #5 (2026-11-25 17:40 Dhaka): an unlogged session was stopped by usage policy while screenshotting the hero (nothing pushed). Session #5 started, resuming at step 3 (fix build error, then verify hero). User re-confirmed the same 3 rules.
- Session #7 (2026-11-25 17:50 Dhaka): Session #6 was stopped by usage policy while writing cart/checkout/success (lost). Session #7 started, resuming at step 5.1 (build check). User re-confirmed the same 3 rules.
- Session #8 (2026-11-25 18:17 Dhaka): Session #7 was stopped by usage policy after pushing checkout/success (2743906); its info pages, FAQ/contact, contact API, 404, sitemap/robots were NOT pushed (lost). Session #8 started, resuming at 5.2 (build check) then 5.3. User re-confirmed the same 3 rules.
- Session #6 (2026-11-25 17:45 Dhaka): Session #5 was stopped by usage policy after pushing all home sections (b956cba). Session #6 started, resuming at step 4 (build check). User re-confirmed the same 3 rules.

- Session #9 (2026-11-25 ~18:25 Dhaka): verified build after 5.3 (pushed by autopush), started README/brand assets/screenshots; stopped by usage policy before pushing them (lost).
- Session #10 (2026-11-25 18:35 Dhaka): started, resuming at step 6. User re-confirmed the same 3 rules (progress files only in `Agent Progress save/`, website outside it, use assets/*.glb).

## Task (copied exactly from the user — section 0 of AI_AGENT_INSTRUCTIONS.md)
TASK (only for NEW TASK; be as detailed as possible):
 ===========================================================================
  3D INTERACTIVE HEADPHONE E-COMMERCE WEBSITE — FULL PRODUCTION REQUIREMENTS
  (Reference: the soda-can "Pure Zero / Refreshingly Clean" hero video)
===========================================================================

---------------------------------------------------------------------------
0. VIDEO REVIEW — WHAT THE REFERENCE DOES (AND WHAT IT'S MISSING)
---------------------------------------------------------------------------
What's in the reference video (7 seconds, 1280x912):
  - Navbar: small logo on the left ("Soda"), center pill-shaped nav
    (Home / Ingredients / Taste / Eco / Reviews), and the active item
    highlighted in pink. A "Contact Us" button sits on the right.
  - Hero: big italic script headline on the left ("Pure Zero"), a short
    description, and a "Shop Now" button with a "+" icon.
  - Big product (a can) in the center, tilted, with floating 3D-style
    particles around it (cherries / blueberries / leaves).
  - Second headline bottom-right ("Refreshingly Clean") that overlaps
    the product, which gives a layered depth effect.
  - Product switcher, top-right: 2 small thumbnail cards with name and
    price (Diet Classic $2.99, Zero Lime $2.99) plus prev/next arrows.
  - Switching products: the current can blurs or motion-blurs out, the
    new can comes in, the whole background color theme changes
    (green -> blue), and the particles change (cherry -> blueberry).
  - Bottom-left badge: "Design Awards — Premium Beverage 2025" with a
    scroll-down arrow.

What's missing (you need to add all of this):
  - Only the navbar and hero exist. There are no other sections, no
    real 3D model (it's a rendered image or video), no mouse-drag
    rotation, no cart or checkout, no product pages, no footer, and no
    mobile layout.

Target: the same look and feel, but for HEADPHONES. It should use real
.glb 3D models that the user can rotate with the mouse or touch, a
multi-product carousel, rich hover interactions, and a complete working
store.

---------------------------------------------------------------------------
1. PROJECT GOAL
---------------------------------------------------------------------------
Build a production-grade, highly interactive 3D e-commerce site that sells
headphones. Every product has its own GLB model, color theme, and
particles. Users can:
  - rotate, drag, and zoom the 3D headphone (mouse + touch)
  - switch between many headphones through a carousel (5 to 50+ models)
  - see hover effects on everything (buttons, cards, nav, model)
  - browse, choose a color variant, add to cart, and check out

---------------------------------------------------------------------------
2. RECOMMENDED TECH STACK
---------------------------------------------------------------------------
Framework     : Next.js 15 (App Router) + React 19 + TypeScript
Styling       : Tailwind CSS v4 (+ CSS variables for per-product themes)
3D            : three.js + @react-three/fiber + @react-three/drei
                (OrbitControls/PresentationControls, useGLTF, Environment,
                 ContactShadows, Float, Html, Bounds, useProgress)
Post-FX       : @react-three/postprocessing (Bloom, DepthOfField, light)
Animation     : GSAP + ScrollTrigger (scroll scenes), Framer Motion (UI)
Smooth scroll : Lenis
State         : Zustand (active product, cart, UI state)
Data          : products.json for v1, or a headless CMS (Sanity/Strapi)
                or Shopify Storefront API for production
Payments      : Stripe Checkout (or Shopify checkout / SSLCommerz /
                bKash for Bangladesh)
Auth (opt.)   : NextAuth / Clerk (order history, wishlist)
Database      : PostgreSQL + Prisma (if not using Shopify)
Email         : Resend (order confirmation)
Forms         : React Hook Form + Zod
Analytics     : Vercel Analytics / GA4 + Meta Pixel
Hosting       : Vercel (site) + Cloudflare R2/S3 + CDN (GLB files)
3D tooling    : Blender, gltf-transform CLI, gltf.report, KTX2/Basis
Testing       : Vitest, Playwright (E2E), Lighthouse CI

---------------------------------------------------------------------------
3. NAVBAR (HEADPHONE VERSION)
---------------------------------------------------------------------------
Layout (same as the reference): logo on the left, floating pill nav in
the center, actions on the right.
  Logo     : brand name + icon (e.g. "SONIQ" / "AURAL"), links to Home
  Center   : Home | Collection | Features | Sound | Specs | Reviews
  Right    : Search icon, Wishlist icon, Cart icon (badge count),
             "Contact Us" / "Shop Now" button
Behavior:
  - Sticky, glassmorphism (backdrop-blur, semi-transparent)
  - Active pill highlight slides smoothly between items (Framer
    Motion layoutId)
  - Highlight color follows the active product's accent color
  - Hover: text color change + small scale + underline/glow
  - Scrollspy: the active item updates as each section scrolls into view
  - Hides on scroll down, shows on scroll up
  - Mobile: hamburger -> full-screen animated menu
  - Cart icon opens a slide-in cart drawer

---------------------------------------------------------------------------
4. FULL PAGE SECTIONS (HOME PAGE)
---------------------------------------------------------------------------
4.1 HERO (the reference recreated with 3D)
  - Top-left headline (script/italic display font): e.g. "Pure Sound"
  - Bottom-right headline overlapping the model: e.g. "Deeply Immersive"
  - Short description + "Shop Now (+)" button + price
  - CENTER: live 3D GLB headphone (see section 5)
  - Floating particles that match the product theme (sound waves,
    music notes, glowing orbs, foam ear-cushion pieces), with parallax
    on mouse move
  - Top-right product carousel thumbnails with name + price + arrows
  - Bottom-left: award badge + animated scroll-down indicator
  - Changing the product animates: model swap, background gradient,
    accent color, headline text, particles, price

4.2 PRODUCT COLLECTION / CAROUSEL SECTION
  - Horizontal 3D carousel of ALL headphones (swipe/drag/arrow/keyboard)
  - Each card: mini 3D preview or high-quality render, name, price,
    color dots, rating, "Add to cart" and "View" buttons
  - Hover: card lifts and tilts (3D tilt), model rotates, glow border
  - Filters: Over-ear / On-ear / In-ear / Wireless / ANC / Gaming;
    sort by price/popularity

4.3 SCROLL-DRIVEN 3D STORY (FEATURES)
  - The model is pinned while the user scrolls (GSAP ScrollTrigger)
  - Model rotates and zooms to each feature, with a callout label:
      * Active Noise Cancellation
      * 40mm/50mm drivers, Hi-Res audio
      * 60h battery, fast charge
      * Memory-foam ear cushions
      * Bluetooth 5.3, multipoint, low-latency
  - Optional "exploded view" animation (needs a split/rigged GLB)

4.4 COLOR CUSTOMIZER / CONFIGURATOR
  - Swatches change the material colors live (body, cushions, metal)
  - Rotate freely, zoom, reset view
  - Price + "Add to cart" update with the selected variant

4.5 SOUND EXPERIENCE
  - Audio sample player with an animated waveform/visualizer
    (Web Audio API); "Listen with ANC on/off" demo toggle
  - Muted by default; plays only after the user clicks

4.6 SPECS / COMPARISON
  - Spec table per product + compare 2 to 3 headphones side by side

4.7 REVIEWS / TESTIMONIALS
  - Star rating, review cards slider, verified-buyer badge, avg rating

4.8 PRESS / AWARDS / BRAND LOGOS strip (marquee)

4.9 FAQ (accordion) — shipping, warranty, returns, compatibility

4.10 NEWSLETTER / CTA banner with a discount code

4.11 FOOTER
  - Links (Shop, Support, Company, Legal), socials, payment icons,
    newsletter, language/currency, copyright

---------------------------------------------------------------------------
5. 3D VIEWER REQUIREMENTS (MOST IMPORTANT)
---------------------------------------------------------------------------
Interaction:
  - Mouse drag = rotate 360° (OrbitControls or PresentationControls)
  - Touch drag on mobile, pinch to zoom
  - Scroll-wheel zoom ONLY when the canvas is focused or Ctrl is held
    (so the page scroll is never hijacked)
  - Limits: minDistance/maxDistance, polar angle limits (can't flip
    upside down), damping enabled (smooth inertia)
  - Auto-rotate slowly when idle; pause on hover/drag; resume after
    3 seconds
  - Hover parallax: the model tilts slightly toward the cursor even
    without dragging
  - Hover hotspots on parts (ear cup, headband, buttons) -> tooltip
  - Double-click / "Reset" button -> animate back to the default view
  - Cursor changes: grab / grabbing
  - Snap/spring back to the hero angle after the user releases (hero only)

Rendering:
  - Environment map (HDRI studio) for realistic reflections
  - ACESFilmic tone mapping, sRGB output, soft ContactShadows under
    the model
  - Light Bloom on accent/LED parts; optional depth of field
  - DPR clamp: [1, 2]; adaptive performance (drei PerformanceMonitor)
  - Pause rendering when the canvas is off-screen (frameloop="demand"
    or IntersectionObserver)

Model normalization (all GLBs must behave the same):
  - Auto-center and auto-scale every model with <Center>/<Bounds> so
    different files fit the same frame
  - Per-product overrides in data: scale, position, rotation, camera

Loading:
  - Suspense + branded loader showing the % progress (useProgress)
  - A static poster image (WebP) is shown first, then the 3D fades in
  - Preload the NEXT and PREVIOUS carousel models (useGLTF.preload)
  - Lazy-load the rest; cache them; dispose unused geometry/textures to
    avoid memory leaks when there are many models
  - Fallback: if WebGL isn't available, or the device is very
    low-end -> show image/360° image sequence

---------------------------------------------------------------------------
6. CAROUSEL REQUIREMENTS (MANY GLB FILES)
---------------------------------------------------------------------------
  - 100% data-driven: adding a product = adding 1 entry to products.json
    plus 1 GLB file. No code changes.
  - Controls: arrows, thumbnails, dots, swipe/drag, keyboard ← →,
    optional autoplay (pauses on hover)
  - Transition (like the video): current model scales/blurs/spins out ->
    new model spins in; background gradient + accent color + particles
    + headline cross-fade (GSAP timeline, ~0.8 to 1.2s)
  - Only 1 heavy model is rendered in the hero at a time; thumbnails
    use images (not live 3D) to keep FPS high
  - Debounce rapid clicks (lock while the transition runs)
  - URL sync: ?product=slug (shareable, back-button works)
  - Infinite loop; correct state on resize
  - Tested with 20+ models without memory growth (check in Chrome
    DevTools Memory)

---------------------------------------------------------------------------
7. PRODUCT DATA SCHEMA (products.json example)
---------------------------------------------------------------------------
{
  "id": "aura-x1",
  "slug": "aura-x1",
  "name": "Aura X1",
  "tagline": "Pure Sound",
  "subTagline": "Deeply Immersive",
  "description": "Hybrid ANC over-ear headphones with 60h battery.",
  "price": 199.00,
  "compareAtPrice": 249.00,
  "currency": "USD",
  "category": "over-ear",
  "rating": 4.8,
  "reviewCount": 1240,
  "stock": 35,
  "model": {
    "glb": "/models/aura-x1.glb",
    "poster": "/images/aura-x1-poster.webp",
    "thumbnail": "/images/aura-x1-thumb.webp",
    "scale": 1.0,
    "rotation": [0, 0.4, 0],
    "position": [0, 0, 0],
    "camera": { "position": [0, 0, 4], "fov": 35 }
  },
  "theme": {
    "bgFrom": "#0b3d2e", "bgTo": "#02140f",
    "accent": "#ff7ab6", "text": "#ffffff",
    "particles": "sound-waves"
  },
  "variants": [
    { "name": "Midnight Black", "hex": "#111111",
      "materialTargets": ["Body", "Headband"], "sku": "AX1-BLK" },
    { "name": "Arctic White", "hex": "#f2f2f2",
      "materialTargets": ["Body", "Headband"], "sku": "AX1-WHT" }
  ],
  "features": ["ANC", "60h Battery", "Bluetooth 5.3", "Hi-Res"],
  "specs": {
    "driver": "40mm dynamic", "frequency": "4Hz–40kHz",
    "battery": "60h", "weight": "250g", "bluetooth": "5.3",
    "charging": "USB-C, 10 min = 5h"
  },
  "hotspots": [
    { "label": "Touch Controls", "position": [0.6, 0.2, 0.1] }
  ]
}

---------------------------------------------------------------------------
8. GLB FILE PREPARATION CHECKLIST (VERY IMPORTANT)
---------------------------------------------------------------------------
For EACH headphone model:
  [ ] Format: .glb (binary glTF 2.0)
  [ ] Origin/pivot at the model's center; facing +Z; Y-up; real-world scale
  [ ] Apply all transforms in Blender (Ctrl+A) before export
  [ ] Polycount: hero model under 100k triangles; carousel/mobile
      under 30k
  [ ] Textures: max 2048px (1024px for mobile), PBR (BaseColor,
      Normal, ORM), converted to KTX2/WebP
  [ ] Compression: Draco or Meshopt
      e.g.  npx @gltf-transform/cli optimize in.glb out.glb \
              --compress meshopt --texture-compress webp
  [ ] Final file size target: under 3 MB hero, under 1.5 MB others
  [ ] Clear material names (Body, Cushion, Headband, Metal, LED) so
      colors can be changed in code
  [ ] Separate meshes for parts if you want an exploded view or hotspots
  [ ] Check in gltf.report / three.js editor before uploading
  [ ] Matching poster image (WebP, transparent background, ~1600px)
      and thumbnail (~400px)
  [ ] License: you own it, or it has a commercial-use license
      (Sketchfab/CGTrader)
  [ ] Host on a CDN with correct headers:
      Content-Type: model/gltf-binary, long cache, CORS enabled

---------------------------------------------------------------------------
9. OTHER PAGES / E-COMMERCE FEATURES
---------------------------------------------------------------------------
Pages:
  /                     Home (all sections above)
  /shop                 All products grid + filters + sort + search
  /product/[slug]       Product detail: big 3D viewer, color variants,
                        gallery, specs, reviews, related products,
                        sticky add-to-cart bar
  /cart                 Cart page (also a slide-in drawer)
  /checkout             Stripe/Shopify checkout
  /order/success        Confirmation
  /account              Login, orders, wishlist (optional v2)
  /about, /contact      Brand story, contact form + map
  /faq, /shipping, /returns, /warranty, /privacy, /terms
  /404                  Custom animated 404 page

Commerce features:
  - Add to cart (with a fly-to-cart animation), qty update, remove
  - Cart saved in localStorage (+ server if logged in)
  - Variant selection (color) -> correct SKU/price/stock
  - Coupon/discount codes, shipping calculation, tax
  - Wishlist, recently viewed, related products
  - Stock status: "Only 3 left", out-of-stock state
  - Order confirmation email; admin order management
    (Shopify admin / CMS)
  - Webhooks for payment success (Stripe webhook -> create order)
  - Currency: USD / BDT (optional switcher)

---------------------------------------------------------------------------
10. INTERACTIONS & HOVER EFFECTS LIST
---------------------------------------------------------------------------
  - Custom cursor (circle that grows on hover over buttons/model,
    shows "Drag" text over the 3D canvas)
  - Magnetic buttons (button moves slightly toward the cursor)
  - Card 3D tilt + glare on hover
  - Nav pill sliding highlight
  - Text reveal animations (split lines/letters) on scroll
  - Parallax particles that follow the mouse
  - Image/model zoom on hover in the shop grid
  - Ripple/press feedback on click
  - Smooth page transitions between routes
  - Marquee for awards/brand logos
  - All motion respects prefers-reduced-motion (disable heavy motion)

---------------------------------------------------------------------------
11. DESIGN SYSTEM
---------------------------------------------------------------------------
  - Fonts: display script/italic for headlines (e.g. "Lobster Two",
    "Kaushan Script", or a premium font like "Clash Display" for a modern
    look) + clean sans for body (Inter / Satoshi / General Sans)
  - Dark, rich gradient backgrounds per product (like green/blue in
    the video)
  - Accent color per product (CSS variable --accent switched with JS)
  - Rounded pill buttons, glass cards, soft shadows, 8px spacing grid
  - Breakpoints: 360, 768, 1024, 1440, 1920+
  - Icons: Lucide / Phosphor
  - Assets needed: logo (SVG), favicon set, OG image (1200x630),
    product posters, HDRI environment (.hdr from Poly Haven),
    audio samples (.mp3/.ogg), particle textures/models

---------------------------------------------------------------------------
12. PERFORMANCE TARGETS (PRODUCTION)
---------------------------------------------------------------------------
  - Lighthouse: Performance ≥ 85 (mobile), ≥ 95 (desktop); A11y ≥ 95;
    SEO ≥ 95
  - LCP < 2.5s (use a poster image as the LCP, not the 3D canvas)
  - CLS < 0.1, INP < 200ms
  - 3D at 60 FPS desktop, ≥ 30 FPS mid-range mobile
  - Code-split the 3D canvas (next/dynamic, ssr:false)
  - Images: next/image, WebP/AVIF, responsive sizes
  - Fonts: next/font, preload, font-display: swap
  - Total initial JS < 300 KB gzipped (excluding lazy 3D chunk)
  - Don't render offscreen canvases; dispose on unmount

---------------------------------------------------------------------------
13. ACCESSIBILITY
---------------------------------------------------------------------------
  - Everything is keyboard-usable (carousel arrows, model rotate with
    arrow keys, nav, cart)
  - aria-labels on icon buttons; aria-live for carousel changes and the
    cart count
  - Visible focus rings; color contrast ≥ 4.5:1
  - Alt text for all images; text description of each 3D model
  - prefers-reduced-motion support; no autoplay sound

---------------------------------------------------------------------------
14. SEO & SHARING
---------------------------------------------------------------------------
  - Metadata per page (title, description, canonical, OG/Twitter)
  - JSON-LD: Product (price, availability, rating), Organization,
    BreadcrumbList, FAQPage
  - sitemap.xml, robots.txt, clean slugs
  - Server-render the product text (3D is client-only)

---------------------------------------------------------------------------
15. SECURITY & LEGAL
---------------------------------------------------------------------------
  - HTTPS, secure headers (CSP, HSTS), env secrets never in the client
  - Payments handled by Stripe/Shopify (no card data stored)
  - Rate limiting + validation on forms/APIs (Zod)
  - Cookie consent banner (GDPR), Privacy Policy, Terms, Return Policy

---------------------------------------------------------------------------
16. SUGGESTED FOLDER STRUCTURE
---------------------------------------------------------------------------
/app
  layout.tsx, page.tsx, shop/, product/[slug]/, cart/, checkout/, api/
/components
  /layout     Navbar.tsx, Footer.tsx, CartDrawer.tsx, Cursor.tsx
  /hero       Hero.tsx, HeroHeadline.tsx, ProductSwitcher.tsx
  /three      Scene.tsx, HeadphoneModel.tsx, Particles.tsx,
              Lights.tsx, Loader.tsx, Hotspot.tsx, CameraRig.tsx
  /sections   Collection.tsx, FeaturesScroll.tsx, Configurator.tsx,
              SoundDemo.tsx, Specs.tsx, Reviews.tsx, FAQ.tsx, CTA.tsx
  /ui         Button.tsx, Card.tsx, Badge.tsx, Carousel.tsx ...
/data         products.json
/store        useProductStore.ts, useCartStore.ts
/lib          stripe.ts, utils.ts, seo.ts
/public
  /models     *.glb
  /images     posters, thumbs
  /hdr        studio.hdr
  /audio      samples

---------------------------------------------------------------------------
17. DEVELOPMENT PHASES
---------------------------------------------------------------------------
Phase 1  Setup, design system, navbar, footer, products.json
Phase 2  3D scene: load 1 GLB, rotate/zoom/hover, loader, fallback
Phase 3  Hero + carousel with theme transitions (match the video)
Phase 4  Other home sections (scroll story, configurator, specs, reviews)
Phase 5  Shop + product pages + cart + checkout (Stripe/Shopify)
Phase 6  Mobile polish, performance optimization, accessibility, SEO
Phase 7  Testing (cross-browser: Chrome, Safari iOS, Firefox, Edge;
         low-end Android), analytics, deploy to Vercel + CDN

---------------------------------------------------------------------------
18. LAUNCH CHECKLIST
---------------------------------------------------------------------------
  [ ] All GLBs optimized and loading on 4G within ~3s
  [ ] Carousel tested with every model; no memory leaks
  [ ] Drag-rotate works on mouse + touch; page scroll is not hijacked
  [ ] Full checkout tested (Stripe test mode -> live)
  [ ] Emails, webhooks, order records working
  [ ] Lighthouse + Core Web Vitals targets met
  [ ] 404, error, empty-cart, out-of-stock states designed
  [ ] Legal pages + cookie banner done
  [ ] Domain, SSL, analytics, Search Console, sitemap submitted
  [ ] Backups + error monitoring (Sentry)

---------------------------------------------------------------------------
19. READY-TO-USE MASTER PROMPT (paste into an AI builder: v0 / Bolt /
    Lovable / Cursor / Claude)
---------------------------------------------------------------------------
"Build a complete, production-ready 3D interactive e-commerce website
for selling premium headphones using Next.js 15 (App Router), TypeScript,
Tailwind CSS, three.js with @react-three/fiber and @react-three/drei,
GSAP + ScrollTrigger, Framer Motion, Lenis, and Zustand.

DESIGN (match this reference style): dark rich gradient background that
changes per product; a sticky glass pill navbar with logo left, center
links (Home, Collection, Features, Sound, Specs, Reviews) with an animated
active pill highlight, and right side search/wishlist/cart (with
count)/'Contact Us' button. The hero has a big italic script headline
top-left ('Pure Sound'), short description, 'Shop Now (+)' pill button,
a second large script headline bottom-right ('Deeply Immersive') that
overlaps the 3D model, product thumbnail cards with name + price and
prev/next arrows at top-right, an award badge and scroll indicator
bottom-left, and floating parallax particles.

3D: In the center render a real .glb headphone model (useGLTF) that
users can rotate 360° by mouse drag and touch, with damping, zoom
limits, polar limits, slow auto-rotate when idle, subtle tilt toward the
cursor on hover, hotspots with tooltips, a reset view button, an HDRI
environment, contact shadows and light bloom. Auto-center/scale every
model. Show a progress loader and a poster image first. Fallback to an
image if WebGL is unavailable.

CAROUSEL: Fully data-driven from /data/products.json (schema: id, slug,
name, tagline, subTagline, description, price, model{glb, poster,
thumbnail, scale, rotation, position}, theme{bgFrom, bgTo, accent,
particles}, variants[], specs{}, features[], hotspots[]). Support
unlimited products. Arrows, thumbnails, swipe, keyboard. On change,
animate with a GSAP timeline: the old model spins/blurs out, the new one
spins in, and the background gradient, accent color, headlines,
particles and price all cross-fade. Preload neighbor models, dispose
unused ones, lock input during transitions, sync ?product=slug in the URL.

SECTIONS after the hero: Collection carousel/grid with 3D tilt hover
cards and filters; pinned scroll-driven feature story where the model
rotates to show ANC, drivers, battery, cushions, Bluetooth; live color
configurator that changes material colors; sound demo with a Web Audio
visualizer; specs + comparison table; reviews slider; press/awards
marquee; FAQ accordion; newsletter CTA; full footer.

E-COMMERCE: /shop, /product/[slug] with large 3D viewer and variants,
cart drawer + /cart, Stripe Checkout with webhook, order success page,
persistent cart (localStorage), wishlist, coupon codes, stock status.

INTERACTION: custom cursor ('Drag' over canvas), magnetic buttons,
text reveal on scroll, smooth page transitions, fly-to-cart animation.
Respect prefers-reduced-motion.

QUALITY: fully responsive (mobile-first), accessible (keyboard, aria,
contrast), SEO (metadata, JSON-LD Product, sitemap), lazy-load the 3D
via next/dynamic ssr:false, DPR clamp [1,2], pause offscreen rendering,
Lighthouse performance ≥ 85 on mobile. Clean component structure:
components/layout, components/hero, components/three, components/sections,
components/ui, store/, data/, lib/."

---------------------------------------------------------------------------
20. WHAT YOU NEED TO PROVIDE / PREPARE
---------------------------------------------------------------------------
  1. Brand name, logo (SVG), brand colors, fonts
  2. All headphone .glb files (optimized as in section 8)
  3. Poster + thumbnail image for each model
  4. Product info: name, price, description, specs, color variants, stock
  5. Headline copy for each product (tagline + subTagline)
  6. Theme colors per product (background gradient + accent)
  7. Reviews/testimonials, FAQ content, policies (shipping/returns)
  8. Payment account (Stripe / Shopify / SSLCommerz / bKash)
  9. Domain name + hosting (Vercel) + CDN storage for models
 10. Optional: audio samples, HDRI, award/press logos, social links
===========================================================================


TECH / CONSTRAINTS (optional):
