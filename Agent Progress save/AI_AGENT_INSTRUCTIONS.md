==========================================================================================
  AI AGENT INSTRUCTIONS — ULTRA VERSION
  Checkpoint, GitHub Backup & Handoff Protocol (for software projects)
==========================================================================================

READ THIS WHOLE FILE BEFORE DOING ANYTHING.

You (the AI agent) can be stopped at ANY moment because of a usage, message, or time limit.
You will NOT get a warning. A different agent, on a different computer, in a different
workspace, with ZERO memory of this chat, will continue your work.

That means:
  1. Your only memory is the GitHub repo.
  2. Work that is not pushed counts as lost.
  3. You push after every MEANINGFUL micro-task, not only after big steps.
  4. Pushing costs tool calls and credits too. Push often enough to be safe, but not so
     often that pushing becomes the work. The notes in PROGRESS.md matter more than
     the number of pushes.

Mindset: "If I'm stopped right now, can a stranger open PROGRESS.md and continue within
a few minutes?" If the answer is no, update the notes and push now.


==========================================================================================
  0. FILL-IN SECTION  (the USER edits ONLY this section)
==========================================================================================

REPO_URL     : https://github.com/MdShamim5669/Headphone-website
GITHUB_TOKEN : <TOKEN>
BRANCH       : main
MODE         : NEW TASK          (NEW TASK  or  RESUME)

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
  <languages, frameworks, things to avoid, design or brand rules, deadline>

DEFINITION OF DONE (optional, but recommended):
  <How do we know it's finished? e.g. "npm run build passes, all pages work,
   README explains how to run it">

Rules:
- MODE = RESUME → the task is already in PROGRESS.md in the repo. Read it and continue.
- Extra instructions in the user's chat message also apply. If they conflict with this
  file, the user's newest message wins. Record the conflict in DECISIONS.md.


==========================================================================================
  1. GOLDEN RULES  (never break these)
==========================================================================================

 1. CLONE / PULL THE REPO FIRST, before any other work.
 2. THE REPO IS THE SINGLE SOURCE OF TRUTH. Don't rely on memory. Trust the real files
    over the logs.
 3. MICRO-TASKS: split every step into micro-tasks of 1–2 tool calls each.
 4. PUSH AFTER EVERY MEANINGFUL MICRO-TASK with the checkpoint script (section 8).
    Manual push rule: after each finished micro-task, OR at the latest every 3–4 tool
    calls, AND always BEFORE a long command (big install, long build, long test).
    Don't try to measure minutes; you can't time yourself reliably. Count tool calls.
    The AUTO-PUSH safety net (section 8.5, every 3–5 minutes) backs up the files in
    between. Manual pushes exist mainly to keep PROGRESS.md notes up to date.
 5. NEVER DELETE WORK. Move failed or replaced code to archive/ with a short note.
 6. LOG EVERYTHING: commands → COMMANDS.md, progress → PROGRESS.md,
    decisions → DECISIONS.md.
 7. NO SECRETS IN THE REPO. Never write a token, password, API key, or .env value into
    any file, commit message, or log. Write <TOKEN> or <SECRET> instead.
 8. NO DESTRUCTIVE GIT. Never use: git push --force, git reset --hard on pushed commits,
    git clean -fdx, or deleting branches. If history looks wrong, ask the user.
 9. WRITE FOR A STRANGER. Every log line should make sense to an agent with zero context.
    Use exact file paths, line numbers, and commands.
10. HALF-DONE CODE IS STILL PUSHED. Mark it with:  TODO(agent): <what is missing>
11. DON'T LOOP. If the same approach fails 3 times, stop. Write the problem in
    PROGRESS.md → Problems, try a different approach, or ask the user.
12. VERIFY, DON'T ASSUME. After writing code, run it, build it, or test it before marking
    the micro-task as done.


==========================================================================================
  2. STARTUP PROCEDURE  (do this exactly, in order)
==========================================================================================

2.1  Network
-----------
If cloning fails because the network is blocked, ask the user to enable internet access
and retry. Don't continue the task without the repo.

2.2  Git identity + safe token storage
--------------------------------------
The token is stored ONLY in ~/.git-credentials, which is OUTSIDE the repo. It never goes
in the remote URL, .git/config, or any project file. Never echo or print the token.

    cd /data
    git config --global user.name  "AI Agent"
    git config --global user.email "ai-agent@users.noreply.github.com"
    git config --global init.defaultBranch main
    git config --global pull.rebase true
    git config --global credential.helper store

    # Replace <TOKEN> with the real token in YOUR tool call only. Never log this command.
    printf 'https://x-access-token:%s@github.com\n' '<TOKEN>' > ~/.git-credentials
    chmod 600 ~/.git-credentials

    git clone https://github.com/<owner>/<repo>.git project
    cd project
    git checkout <BRANCH> 2>/dev/null || git checkout -b <BRANCH>

In COMMANDS.md, log this step only as: "Configured git credentials (token hidden)".

2.3  Decide: NEW TASK or RESUME
-------------------------------
A) Repo is empty, or has no PROGRESS.md → NEW TASK
   1. Create the folder structure (section 3) and .gitignore (section 7).
   2. Save this file into the repo as AI_AGENT_INSTRUCTIONS.md (WITHOUT the token).
   3. Create scripts/checkpoint.sh (section 8) and make it executable.
   3b. Create scripts/autopush.sh (section 8.5) and start it in the background.
       Check that `flock` exists (`command -v flock`). It's needed for the lock.
   4. Create PROGRESS.md: paste the user's exact task, then write a plan.
      Split it into Steps, and split each Step into micro-tasks (3.1, 3.2, ...).
   5. Create COMMANDS.md and DECISIONS.md.
   6. Checkpoint:  ./scripts/checkpoint.sh "step 0/N: project setup and plan"

B) PROGRESS.md exists → RESUME
   1. Read PROGRESS.md (the QUICK STATE block first), DECISIONS.md, and the last ~40
      lines of COMMANDS.md.
   2. Run:  git log --oneline -25
   3. Find the micro-task marked  ← IN PROGRESS  (or the first unchecked one).
   4. READ THE REAL CODE, not only the logs:
        git show --stat HEAD~5..HEAD               # recently changed files
        grep -rn "TODO(agent)" --exclude-dir=node_modules .
      Open every file related to the IN PROGRESS micro-task and the files it depends on.
   4b. Start the AUTO-PUSH loop (section 8.5) right away.
   5. Reinstall the environment (section 2.4) and run the project, build, or tests to
      see what works right now.
   6. If the logs don't match the real files, trust the files and fix PROGRESS.md.
   7. Add to Session History: "Session #X started, resuming from step Y.Z".
   8. Checkpoint:  ./scripts/checkpoint.sh "resume: session #X started at step Y.Z"
   9. Continue the work.

2.4  Reinstall the environment
------------------------------
A new agent always gets a fresh computer. Run every command listed in
PROGRESS.md → Environment setup (e.g. npm install, pip install -r requirements.txt).
When you install something new, IMMEDIATELY add it to that section and to the dependency
file (package.json, requirements.txt, ...).


==========================================================================================
  3. REQUIRED REPO STRUCTURE
==========================================================================================

project/
├── AI_AGENT_INSTRUCTIONS.md   ← copy of this file (no secrets)
├── PROGRESS.md                ← task, plan, quick state, next action   (MOST IMPORTANT)
├── COMMANDS.md                ← every terminal command + short result, numbered
├── DECISIONS.md               ← important choices and WHY
├── README.md                  ← how to install, run, and use the project (for humans)
├── .gitignore
├── .env.example               ← variable NAMES only, no real values (if env vars are used)
├── src/                       ← main project code
├── tests/                     ← tests (if the project has them)
├── scripts/
│   ├── checkpoint.sh          ← safe commit + push script (section 8)
│   ├── autopush.sh            ← background safety-net loop (section 8.5)
│   ├── logs/                  ← long command outputs (trimmed, no secrets)
│   └── (helper, test, one-off and data scripts)
├── assets/                    ← small input files, images, fonts, data
├── output/                    ← builds, exports, generated results (< 50 MB)
│   └── preview/               ← screenshots of the app or UI
└── archive/                   ← failed or replaced code, each with a short note why

If the project already has its own structure (e.g. a Next.js or Django layout), keep that
structure for the code and only add the log files and folders above.
Empty folders get a .gitkeep file.


==========================================================================================
  4. WHAT MUST BE PUSHED
==========================================================================================

| What                                                    | Where                          |
|---------------------------------------------------------|--------------------------------|
| All project code, created or edited                     | src/ (or the project layout)   |
| Half-finished or broken code, marked TODO(agent)        | its normal place               |
| Helper, test, temporary, one-off scripts                | scripts/                       |
| Failed or replaced code + a 1-line reason               | archive/                       |
| Every terminal command + short result                   | COMMANDS.md                    |
| Long logs (trimmed, secrets removed)                    | scripts/logs/                  |
| Plan, status, next action                               | PROGRESS.md                    |
| Decisions + reasons                                     | DECISIONS.md                   |
| Errors and how they were fixed                          | PROGRESS.md → Problems         |
| Dependency files (package.json, lock files, reqs)       | project root                   |
| Builds, exports, screenshots (< 50 MB)                  | output/, output/preview/       |
| Work outside the computer (Notion edits, web research,  | PROGRESS.md → External actions |
|   links, info from the user in chat)                    |                                |
| Required env variable names (no values)                 | .env.example                   |

RULE OF THUMB: if a file was created on the computer for this task, it goes in the repo,
except secrets, node_modules/venv/caches, and files over 50 MB.

Important user info shared in chat (requirements, preferences, answers to questions)
must be written to PROGRESS.md or DECISIONS.md. The next agent can't see this chat.


==========================================================================================
  5. PROGRESS.md FORMAT  (update its QUICK STATE block at every checkpoint)
==========================================================================================

# PROGRESS

## ⚡ QUICK STATE  (read this first; update at EVERY checkpoint)
- Overall: IN PROGRESS        (IN PROGRESS | BLOCKED | DONE)
- Current: Step 3/6 → micro-task 3.2 — Add login form validation
- Last action: Created src/components/LoginForm.jsx (form UI done, no validation yet)
- NEXT ACTION: In src/components/LoginForm.jsx, add email/password validation in
  handleSubmit() (line ~40, marked TODO(agent)). Then run COMMANDS.md #14 to test.
- Project runs?: YES — `npm run dev` works (last checked in session #2)
- Last updated: 2026-11-13 21:30 (Asia/Dhaka) by Session #2

## Task (copied exactly from the user)
<full original task text>

## Definition of Done
- [ ] <e.g. npm run build passes with no errors>
- [ ] <e.g. all pages work on mobile and desktop>
- [ ] <e.g. README explains setup and usage>

## Plan
- [x] Step 1: Project setup (Vite + React)
  - [x] 1.1 Init project   - [x] 1.2 Install deps   - [x] 1.3 First run OK
- [x] Step 2: Layout + routing
- [ ] Step 3: Authentication
  - [x] 3.1 Login form UI
  - [ ] 3.2 Form validation   ← IN PROGRESS
  - [ ] 3.3 Auth logic + session storage
- [ ] Step 4: Task CRUD
- [ ] Step 5: Testing + bug fixes
- [ ] Step 6: Final build, README, summary

## Done so far (details)
- Step 1: Vite + React 18 in src/. Commands #1–#5.
- Step 2: React Router v6, pages Home/Login/Dashboard. Screenshot: output/preview/home.png

## Problems / Notes
- #1 Port 5173 busy → used --port 5174 (COMMANDS.md #9).

## Environment setup (run these on a fresh computer)
cd project && npm install
npm run dev        # dev server
npm run build      # production build

## External actions (not in code)
- User said in chat: primary color #2563EB, no dark mode needed.
- Read Notion page "Brand guide" for colors (#FF5500, #111111).

## Session History
- Session #1: steps 0–2 done.
- Session #2: resumed at 3.1; 3.1 done, 3.2 in progress.


==========================================================================================
  6. COMMANDS.md AND DECISIONS.md FORMAT
==========================================================================================

COMMANDS.md
-----------
### 13. Install validation library (micro-task 3.2)
$ npm install zod
Result: SUCCESS — zod 3.23 added to package.json

### 14. Run dev server to test the form
$ npm run dev
Result: ERROR — "Cannot find module './schema'"
Fix: created src/lib/schema.js → re-ran as #15

Rules:
- Number every command. Write a short result: SUCCESS or ERROR plus a 1-line summary.
- Long output → save a trimmed copy to scripts/logs/<name>.log and reference it.
- Replace any secret with <TOKEN> or <SECRET>.
- Log in batches: you can add several commands at once, but always before the next push.

DECISIONS.md
------------
### 3. Validation library
Decision: zod.
Why: small, works with plain JS and TS, clear error messages.
Alternatives considered: yup (bigger), manual checks (more code).
Revisit if: the project moves to a form library that has validation built in.


==========================================================================================
  7. WHAT MUST NEVER BE PUSHED + .gitignore
==========================================================================================

Never push: tokens, passwords, API keys, .env files, cookies, SSH keys, credentials,
node_modules/, virtual envs, caches, or files over 50 MB (GitHub rejects > 100 MB).

Default .gitignore:

    node_modules/
    .venv/
    venv/
    env/
    __pycache__/
    *.pyc
    .cache/
    .next/
    dist/.cache/
    .env
    .env.*
    !.env.example
    *.key
    *.pem
    .git-credentials
    .DS_Store
    Thumbs.db
    scripts/logs/autopush.log
    scripts/logs/autopush.heartbeat

Note: build folders (dist/, build/) are normally ignored. If the user wants the built
result in the repo, copy it to output/ instead.

Large files: push a compressed or smaller version, and write in PROGRESS.md the exact
command to regenerate the full version.

If a secret was EVER committed by mistake: don't try to rewrite history yourself.
Tell the user right away to REVOKE that token or key on GitHub/the provider, and note it
in PROGRESS.md → Problems (without the secret).


==========================================================================================
  8. CHECKPOINT  (commit + push after every meaningful micro-task)
==========================================================================================

8.1  Create this script once (NEW TASK setup): scripts/checkpoint.sh
--------------------------------------------------------------------
What it protects against:
  - Secrets and files over 50 MB getting committed.
  - Two pushes running at the same time (manual + auto) → uses a LOCK (flock), so no
    "index.lock" errors.
  - Committing while a rebase/merge is half-done → it refuses to run.
  - Rebase conflicts → it runs `git rebase --abort`, keeps your commit locally, and
    exits with code 3 so you can tell the user. It never hides the error.
  - (Auto mode only) Half-written files → it skips the round if any file changed in
    the last 30 seconds.

#!/usr/bin/env bash
# Usage (manual):  ./scripts/checkpoint.sh "wip(3.2): form validation half done"
# Usage (auto):    AUTO=1 ./scripts/checkpoint.sh "auto: checkpoint"
# Exit codes: 0 ok/nothing to do, 1 blocked (secret/big file/bad state),
#             2 push failed, 3 rebase conflict (aborted), 4 lock busy
set -uo pipefail
cd "$(git rev-parse --show-toplevel)" || exit 1
MSG="${1:-wip: checkpoint}"
AUTO="${AUTO:-0}"
BRANCH="$(git symbolic-ref --short HEAD 2>/dev/null || echo main)"
GITDIR="$(git rev-parse --git-dir)"

# 0) LOCK: only one checkpoint at a time.
#    Auto mode: skip this round if busy. Manual mode: wait up to 120s.
exec 9>/tmp/checkpoint.lock
if [ "$AUTO" = "1" ]; then
  flock -n 9 || { echo "ℹ️ Another checkpoint is running. Skipped."; exit 0; }
else
  flock -w 120 9 || { echo "❌ Lock busy for 120s. Try again."; exit 4; }
fi

# 0b) Refuse to run in the middle of a rebase / merge / other git operation
if [ -d "$GITDIR/rebase-merge" ] || [ -d "$GITDIR/rebase-apply" ] || \
   [ -f "$GITDIR/MERGE_HEAD" ] || [ -f "$GITDIR/index.lock" ]; then
  echo "❌ Git is in the middle of a rebase/merge (or index.lock exists). Not committing."
  echo "   Fix it first (see section 8.4). Auto-push stays paused until then."
  [ "$AUTO" = "1" ] && exit 0 || exit 1
fi

# 0c) Auto mode only: skip if files are still being written (changed in last 30s)
if [ "$AUTO" = "1" ]; then
  RECENT="$(find . -path ./.git -prune -o -path ./node_modules -prune \
            -o -path ./scripts/logs -prune -o -type f -mmin -0.5 -print -quit)"
  if [ -n "$RECENT" ]; then
    echo "ℹ️ Files changed in the last 30s (e.g. $RECENT). Skipped this round."
    exit 0
  fi
fi

git add -A

# 1) Block known secret patterns in staged changes
PATTERNS='ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|gh[ousr]_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----'
if git diff --cached -U0 | grep -E "^\+" | grep -Eq "$PATTERNS"; then
  echo "❌ SECRET PATTERN FOUND in staged changes. Commit blocked."
  git diff --cached --name-only
  git reset -q
  exit 1
fi

# 2) Block the actual stored token value, if one exists
if [ -f ~/.git-credentials ]; then
  TOK="$(sed -n 's#https://[^:]*:\([^@]*\)@.*#\1#p' ~/.git-credentials | head -1)"
  if [ -n "$TOK" ] && git diff --cached | grep -qF "$TOK"; then
    echo "❌ GITHUB TOKEN FOUND in staged changes. Commit blocked."
    git reset -q
    exit 1
  fi
fi

# 3) Block files over 50 MB
BIG="$(git diff --cached --name-only --diff-filter=AM | while read -r f; do
  [ -f "$f" ] && [ "$(stat -c%s "$f")" -gt 52428800 ] && echo "$f"; done)"
if [ -n "$BIG" ]; then
  echo "❌ Files over 50 MB (add them to .gitignore or compress them):"; echo "$BIG"
  git reset -q
  exit 1
fi

# 4) Commit (skip if nothing changed)
if git diff --cached --quiet; then
  [ "$AUTO" = "1" ] && [ -z "$(git log "origin/$BRANCH..HEAD" --oneline 2>/dev/null)" ] \
    && { echo "ℹ️ Nothing to commit or push."; exit 0; }
  echo "ℹ️ Nothing new to commit. Pushing any unpushed commits."
else
  git commit -q -m "$MSG"
fi

# 5) Sync + push. Conflicts are NEVER hidden: abort the rebase and report.
for i in 1 2 3; do
  if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
    if ! git pull -q --rebase origin "$BRANCH"; then
      if [ -d "$GITDIR/rebase-merge" ] || [ -d "$GITDIR/rebase-apply" ]; then
        git rebase --abort
        echo "❌ REBASE CONFLICT with origin/$BRANCH. Rebase aborted."
        echo "   Your commit is safe locally: $(git log -1 --oneline)"
        echo "   Tell the user. Do NOT force-push. See section 8.4."
        exit 3
      fi
      echo "Pull failed (try $i/3, probably network). Retrying in 5s..."; sleep 5
      continue
    fi
  fi
  if git push -q -u origin "$BRANCH"; then
    echo "✅ Pushed: $(git log -1 --oneline)"
    exit 0
  fi
  echo "Push failed (try $i/3), retrying in 5s..."; sleep 5
done
echo "❌ PUSH FAILED after 3 tries. Work is committed locally. Tell the user."
exit 2

Then run:  chmod +x scripts/checkpoint.sh

Note: if `flock` is missing (rare), install util-linux, or tell the user. Don't remove
the lock from the script.

8.2  The micro-task loop  (repeat this for every micro-task)
-------------------------------------------------------------
  1. DO     → write or edit code for ONE micro-task.
  2. CHECK  → run, build, or test it quickly. If it's broken, still continue to step 3
              with a TODO(agent) note.
  3. LOG    → update PROGRESS.md QUICK STATE (Last action + NEXT ACTION), tick the
              checkbox, and add the commands to COMMANDS.md.
  4. PUSH   → ./scripts/checkpoint.sh "wip(3.2): <what was done>"
  5. CONFIRM→ the output says "✅ Pushed". If it doesn't, follow section 8.4.

Push when the micro-task is done, or at the latest after 3–4 tool calls, even if the
micro-task isn't finished yet (mark it with TODO(agent)).

Steps 3 + 4 should take ONE tool call: a single bash call that updates PROGRESS.md
and then runs the script.

SAVE TOOL CALLS: put the push in the SAME bash call as the work, so pushing doesn't
cost an extra tool call:

    cat > src/utils/date.js <<'CODE'
    ...code...
    CODE
    ./scripts/checkpoint.sh "wip(3.2): add date utils"

    npm run build 2>&1 | tail -20; ./scripts/checkpoint.sh "wip(3.3): build tested"

If you edit files with a separate edit tool, run the checkpoint in your next bash call
(together with the next command).

BEFORE A LONG COMMAND (install, long build, render, long test): push first, in the
same bash call:

    ./scripts/checkpoint.sh "wip(4.1): before npm install" && npm install 2>&1 | tail -20

8.3  Commit message format
--------------------------
  step 0/6: project setup and plan        ← setup
  wip(3.2): login validation half done    ← micro-task in progress
  step 3/6: authentication done           ← a full Step finished
  fix: crash when task list is empty      ← bug fix
  test: add tests for auth                ← tests
  docs: update README                     ← docs only
  resume: session #3 started at 4.1       ← new session
  done: final build + README              ← task complete
  auto: checkpoint 14:32                  ← made by autopush.sh only

Make messages specific: "wip(3.2): validation for email done, password pending" is
better than "update files".

To read the history WITHOUT the auto commits:
    git log --oneline --invert-grep --grep='^auto:'

8.4  If the checkpoint fails
----------------------------
  1. Exit code 3 = rebase conflict. The script already ran `git rebase --abort`, so the
     repo is clean and your commit is safe locally. Then:
       - Write it in PROGRESS.md → Problems (which files conflict, if known).
       - TELL THE USER. Don't resolve big conflicts by guessing.
       - Keep working locally; commits still work, only the push waits.
       - Auto-push keeps trying, but it will keep failing until this is fixed.
     If the user asks you to fix it: `git pull --rebase origin <BRANCH>`, open each
     conflicted file, keep BOTH changes when unsure, then
       git add -A && git rebase --continue && ./scripts/checkpoint.sh "fix: merge conflict"
     If anything goes wrong in the middle:  git rebase --abort
  2. "Git is in the middle of a rebase/merge" → run `git status`. If a rebase is stuck,
     run `git rebase --abort` (or `git merge --abort`), then checkpoint again.
     If `.git/index.lock` exists and NO git command is running, delete it:
       rm -f .git/index.lock
  3. Authentication error (401/403) → the token may be wrong, expired, or missing write
     access. Tell the user. Don't print the token.
  4. Network error → retry once. If it still fails, ask the user to enable internet access.
     Keep working locally and push as soon as possible.
  5. Exit code 4 = lock busy for 2 minutes → check that no stuck git command is running
     (`ps aux | grep git`), then try again.
  6. Never use --force.


8.5  AUTO-PUSH SAFETY NET  (background push every 4 minutes)
-------------------------------------------------------------
A background loop pushes the files every 4 minutes (anything in 3–5 minutes is fine),
so file changes are backed up even between manual pushes. Not 60 seconds: that wastes
resources and fills the history with hundreds of commits.

It is SAFE because it uses the same checkpoint.sh in AUTO mode:
  - it shares the lock with manual pushes, so they never run at the same time;
  - it skips a round while a rebase/merge is in progress;
  - it skips a round while files are still being written (changed in last 30s);
  - it does nothing if nothing changed.

Create scripts/autopush.sh:

#!/usr/bin/env bash
# Background auto-push every 4 minutes. Stop it with:  kill "$(cat /tmp/autopush.pid)"
cd "$(git rev-parse --show-toplevel)" || exit 1
mkdir -p scripts/logs
echo $$ > /tmp/autopush.pid
INTERVAL="${AUTOPUSH_INTERVAL:-240}"   # seconds (180–300 recommended)
while true; do
  sleep "$INTERVAL"
  date '+%s' > scripts/logs/autopush.heartbeat
  AUTO=1 ./scripts/checkpoint.sh "auto: checkpoint $(date '+%H:%M')" \
    >> scripts/logs/autopush.log 2>&1
  # keep the log small
  tail -n 200 scripts/logs/autopush.log > scripts/logs/autopush.tmp && \
    mv scripts/logs/autopush.tmp scripts/logs/autopush.log
done

Then run:
    chmod +x scripts/autopush.sh
    mkdir -p scripts/logs
    # Start only if it isn't already running (uses a PID file; don't use pgrep/pkill -f,
    # because they also match the shell running this command)
    if ! { [ -f /tmp/autopush.pid ] && kill -0 "$(cat /tmp/autopush.pid)" 2>/dev/null; }; then
      nohup ./scripts/autopush.sh >/dev/null 2>&1 &
    fi

Check that it is still alive (the sandbox can kill background processes WITHOUT any
warning). Put this in the same bash call as a manual checkpoint, about every 5 manual
pushes:

    if [ -f /tmp/autopush.pid ] && kill -0 "$(cat /tmp/autopush.pid)" 2>/dev/null; then
      echo "auto-push: running"; tail -n 3 scripts/logs/autopush.log 2>/dev/null
    else
      echo "auto-push: STOPPED → restarting"; nohup ./scripts/autopush.sh >/dev/null 2>&1 &
    fi

Rules:
- The loop is ONLY a safety net. It saves files, NOT notes. Still update PROGRESS.md
  QUICK STATE and push manually after every meaningful micro-task. Auto commits don't
  say what was done; your notes do.
- Never trust that it is running. If it stopped, restart it (above).
- If autopush.log shows "REBASE CONFLICT" or "PUSH FAILED", handle it (section 8.4)
  and tell the user.
- autopush.log and autopush.heartbeat are in .gitignore, so they don't create commits.
- If the computer is restarted or the session resumes, start the loop again.

==========================================================================================
  9. WHEN TO CHECKPOINT  (push immediately when ANY of these happens)
==========================================================================================

- A micro-task is finished (even a tiny one).
- A file was created, or meaningfully changed.
- A build, test, or run finished (success OR failure).
- A bug was found, or fixed.
- A decision was made, or the user gave new info in chat.
- 3–4 tool calls have passed since the last push (even if the micro-task isn't done).
- BEFORE a long command (big install, long build, render, long test run): push first,
  in the same bash call, then run it.
- You've been working a long time, or the chat is getting long → push now.

Don't push after EVERY single tool call. Each push costs a tool call and credits; too
many pushes means less real work before the limit. Combine the push with work in the
same bash call whenever you can (section 8.2).


==========================================================================================
 10. WORKING QUALITY RULES  (so the project ends up good, not just backed up)
==========================================================================================

- PLAN FIRST: before coding, write the plan in PROGRESS.md and push it.
- SMALL, WORKING INCREMENTS: after each Step, the project should still run.
- TEST AS YOU GO: run the app, build, or tests after each meaningful change. Save
  screenshots of UI work to output/preview/.
- READ BEFORE EDITING: open a file before you change it. Don't overwrite work you
  haven't read.
- KEEP IT SIMPLE: use well-known libraries, and avoid adding dependencies you don't need.
  Explain each new dependency in DECISIONS.md.
- CLEAR CODE: meaningful names, short functions, and comments where the logic isn't
  obvious.
- ASK WHEN TRULY BLOCKED: if a requirement is unclear and guessing wrong would waste a
  lot of work, ask the user. Write the question and answer in DECISIONS.md. For small
  things, pick a sensible default and log it.
- STAY IN SCOPE: do what the task asks. Write extra ideas in PROGRESS.md →
  Problems / Notes as "Ideas for later" instead of building them.
- UPDATE README.md when setup or usage changes.


==========================================================================================
 11. FINISHING THE TASK
==========================================================================================

 1. Check every item in "Definition of Done". Run the final build and tests.
 2. Put the final output in output/, or explain how to generate it in README.md.
 3. README.md: what the project is, how to install it, how to run it, how to build it.
 4. PROGRESS.md: Overall = DONE, all boxes checked, plus a "How to use the result" section.
 5. Final checkpoint:  ./scripts/checkpoint.sh "done: <short summary>"
 6. Optional milestone tag:  git tag v1.0 && git push origin v1.0
 7. Tell the user in chat:
      - what was built
      - where things are in the repo (main files, output, README)
      - how to run it
      - anything left open or worth improving
      - remind them to REVOKE the GitHub token now (it was shared in chat, so it stays
        in the chat history)
 8. Stop the auto-push loop:  kill "$(cat /tmp/autopush.pid)" 2>/dev/null


==========================================================================================
 12. QUICK CHECKLIST  (scan this every few minutes)
==========================================================================================

[ ] Did I push after the last finished micro-task / within the last 3–4 tool calls?
[ ] Will my next command take long? → push first.
[ ] Is the AUTO-PUSH loop (section 8.5) still running? Any errors in autopush.log?
[ ] Is the QUICK STATE in PROGRESS.md up to date, with an exact NEXT ACTION?
[ ] Are new commands logged in COMMANDS.md?
[ ] Is every new dependency in package.json/requirements.txt AND in Environment setup?
[ ] Is half-done code marked TODO(agent)?
[ ] Did I write user info from chat into the repo?
[ ] Are there zero secrets in the files I'm about to commit?
[ ] If I'm stopped right now, can a stranger continue from PROGRESS.md quickly?


==========================================================================================
 13. MESSAGE TO THE NEXT AGENT
==========================================================================================

"Assume you can be stopped at any moment. Micro-task → test → log → push. Repeat.
Push smart, not constantly: after each meaningful micro-task, every 3–4 tool calls, and
before long commands. Leave the repo so a stranger can open PROGRESS.md, read QUICK
STATE, and continue right away."

==========================================================================================
  END OF FILE
==========================================================================================