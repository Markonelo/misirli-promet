# Misirli Promet — Work Notes / Handoff

Motorcycle dealer website for Мисирли Промет (Bitola, North Macedonia). Macedonian Cyrillic.
Multi-brand moto dealer that **also** carries some Suzuki cars — NOT a Suzuki-only site. Keep the "Мисирли Промет" branding.

## Stack
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (`@theme` in `app/globals.css`) · lucide-react · Framer Motion
- Lenis smooth scroll (`components/SmoothScroll.tsx`)
- Dev server port: **3004**

## Run locally
```bash
npm install
npm run dev      # http://localhost:3004
npm run build    # production build (used for verification)
```

## Project layout (key files)
- `data/motorcycles.ts` — motorcycle catalog (60 entries). Types: `Motorcycle`, `Variant`, `MotoColor`.
- `data/cars.ts` — car catalog (4 Suzuki cars). Types: `Car`, `CarColor`.
- `components/MotoCard.tsx` / `CarCard.tsx` — listing cards (shared design).
- `components/MotoDetailClient.tsx` — moto detail w/ **color-swap** (press color → swaps photo) + cc/power variant picker.
- `components/CarDetailClient.tsx` — car detail (color swatches display-only).
- `app/motocikli/` + `app/motocikli/[slug]/` — moto listing + detail.
- `app/avtomobili/` + `app/avtomobili/[slug]/` — cars subpage + detail.
- `app/sitemap.ts` — includes moto + car routes.
- Images live in `public/moto/<slug>/N.jpg` and `public/cars/<slug>/N.jpg`.
- `public/moto/_raw/` — raw source images (scratch reference, not used by the site).

## Current state (verified)
- **64 vehicles**: 60 motorcycles + 4 cars. Production build exit 0, 76 static pages, no errors (`npx tsc --noEmit` clean).
- Catalog reconciled to match the **owner's authoritative inventory chat** (~65 hamachi.mk product URLs). Speculative reseller adds removed; missing bikes added from hamachi.mk directly.
- Color-swap works for: 3 Suzuki 125 scooters, Zontes 703F, Zontes 368 G/K, Zontes 703 RR (per-color photos).
- Car detail pages carry real Suzuki content: GL/GL+/GLX trim picker (action + struck regular price, cumulative features), Suzuki Safety Support block, and a visible official-source link to suzukiauto.mk on every car (e-Vitara keeps generic desc + colours, source link only).

## Latest session — responsive + UI polish (commit e172723)
Device-specific fixes from owner's 9 screenshots, plus sitewide polish. All verified (`tsc` clean, build prerenders all routes):
- **FindYourBike**: CTA quad now `lg:flex` only → hidden on mobile **and** tablet (was overlapping the text).
- **Header**: bigger tablet header (up to 76px unscrolled, larger logo/brand) + animated 3-bar hamburger that morphs to an X; menu fades/slides in with staggered links (Framer Motion, `AnimatePresence`).
- **layout.tsx**: `body` is flex column, `main` is `flex-1` → footer sticks to bottom on short pages.
- **Hero + MotoListing**: removed the **"Состојба"** filter everywhere (both hero quick-filters and listing sidebar).
- **SearchedMotos**: removed the edge-fade mask so carousel cards show 100% (no blended cut-off on drag).
- **CarDetailClient**: mobile hardening (`min-w-0`, tighter padding, resized trim buttons) against edge overflow.
- **za-nas**: showroom hero image frame enlarged (taller aspect ratio on phone).
- **Testimonials**: auto-scroll marquee that pauses on hover (desktop) and on touch/drag (touchscreens).
- **Skeleton loading**: new `components/PageSkeleton.tsx` + global `app/loading.tsx` (Next.js route Suspense) with a fast shimmer (`.skeleton` in globals.css) — barely flashes on quick loads.
- SKIPPED per owner: phone hero redesign ("we will change that later").

## Data model notes
- Prices are in **EUR** (e.g. `price: 1890`).
- A model with 2 engine sizes lists both in `variants: [{cc, price}, ...]`.
- `colors?: MotoColor[]` — each `{name, hex, image}`; selecting a swatch swaps the main photo. Only populated where distinct per-color images exist (Suzuki). Most Hamachi bikes use gallery images (angles), no color-swap.
- Brand is derived from the first word of `name` (HMC → Hamachi).

## Data sourcing (IMPORTANT)
- **hamachi.mk IS reachable via `curl` with a browser User-Agent** (returns 200) even though WebFetch/browser tool are blocked. The site is a **Shopify store**.
- **Shopify products.json API** is the primary source now:
  `curl -A "Mozilla/5.0" "https://hamachi.mk/products.json?limit=250&page=N"` → pages 1–2, ~394 products.
  Each product: `handle`, `title`, `product_type`, `options[]`, `variants[]` (option1/2, `price` in denars, `featured_image.src`), `images[]` (src, `width`/`height`, `position`).
- **Image selection**: position-1 images are usually **promo flyers** (square, ar≈1.0, with price/branding text). Filter to landscape shots: `ar = width/height` between **1.4 and 2.4**, `width ≥ 700`. Always VISUALLY verify (Read tool) — some bikes only have flyer/detail shots.
- Price conversion: `EUR ≈ denars / 61.5`.
- Suzuki cars: `suzukiauto.mk`; Suzuki scooters: `suzukimoto.mk` (both expose per-color images).
- **All prices are pending owner verification.**

## This session — full catalog reconciliation to owner's list
- Owner sent a chat with ~65 exact hamachi.mk product URLs = the authoritative inventory. Matched all 65 to Shopify products.json.
- **ADDED 27 bikes** (data + images from Shopify CDN): Hamachi Angel, Dragon A8 4T, Jog 3, HMC R9, HMC Grace V5, Dragon A9 2T, Hamachi EVOC 125, Imola 125, HMC ADV 150, HMC NVH 125, HMC Vampire 200, HMC Galaxy Pro 125, HMC KRS 200, Hamachi Buccaner 250-V, Hamachi GTS 280, Hamachi Alien Monster 300, Hamachi RS310, Hamachi Tekken 325, HMC 150GY-18 Pro, HMC 200GY-18 Pro, HMC 250-18L, HMC EnduroMax 200, HMC EnduroMax 250, Zontes 703 RR (2 colors), Hamachi HM 300 ATV. (Tekken split: existing `tekken` now = Tekken 125 only.)
- **REMOVED 17 speculative/off-list bikes**: hamachi-200-pro, hamachi-250, hamachi-300-pro, venice, azzuro, margherita, symphony-s, il-bello-s, mustang, papaki-runner, zontes-125x, fort-350, sym-joyride-300, cyclone-650, srt-800-sx, mikilon (HMC Mikilon 200), sfa-1000. (Their `public/moto/<slug>/` dirs deleted too.)

## TODO / open items
- **On owner list but only flyer/detail images on store — need owner to supply clean photos** (not added, or added w/o color-swap):
  - `Dragon A9 4T 125cc` (flyer only; price ~€1540) — NOT added.
  - `Hamachi King 125` (Black Friday flyer only; price €940) — NOT added.
  - `Zontes 368 E` & `Zontes 368 D` (only flyer + dark detail shots) — NOT added.
- **Unavailable on live store** (owner listed but no product page found): `zn50qt-r8` (HMC R8 50cc), `imola-50cc` (only 125cc exists), `zn-50qt-52a`.
- suzukimoto.mk 125cc scooters: 3 already present (Burgman/Avenis/Address) — confirm complete with owner.
- Prices → all pending owner confirmation (auto-converted from denars ÷ 61.5).

## Pipeline to add a new model
1. WebSearch model + reseller → get product URL.
2. WebFetch the reseller page → extract name, price (den → EUR ≈ den/61.5), cc, specs, image URLs.
3. `curl -A "Mozilla/5.0..."` download images to `public/moto/<slug>/N.jpg` (PNG/WebP saved as .jpg render fine).
4. Add entry to `data/motorcycles.ts`.
5. Verify: `npx tsc --noEmit` + curl the `/motocikli/<slug>` route and images for 200.
