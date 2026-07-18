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
- `data/motorcycles.ts` — motorcycle catalog (49 entries). Types: `Motorcycle`, `Variant`, `MotoColor`.
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
- **53 vehicles**: 49 motorcycles + 4 cars. Production build exit 0, 63 static pages, no errors.
- All detail routes + images return 200; sitemap has 58 URLs.
- Color-swap works for the 3 Suzuki 125 scooters (per-color photos).

## Data model notes
- Prices are in **EUR** (e.g. `price: 1890`).
- A model with 2 engine sizes lists both in `variants: [{cc, price}, ...]`.
- `colors?: MotoColor[]` — each `{name, hex, image}`; selecting a swatch swaps the main photo. Only populated where distinct per-color images exist (Suzuki). Most Hamachi bikes use gallery images (angles), no color-swap.
- Brand is derived from the first word of `name` (HMC → Hamachi).

## Data sourcing (IMPORTANT)
- **hamachi.mk is BLOCKED** to automation (403 on fetch; browser tool refuses the domain). Cannot read its prices directly.
- Prices/specs/images pulled from Macedonian resellers whose prices match hamachi.mk:
  `palmashop.mk`, `emicompany.com.mk`, `hemimotor.com.mk`, `jpmotocentar.mk`, `supermart.mk`, `motortrade.mk`.
  (`skuter.mk` is a different dealer with discounted prices — fallback only.)
- Suzuki cars: `suzukiauto.mk`; Suzuki scooters: `suzukimoto.mk` (both expose per-color images).
- **All prices are pending owner verification.**

## Added this session (18 entries, 3 batches)
- Batch 1: Hamachi ADV 200, QMAX 150, SYM Fiddle III 50, SYM Jet 14 200, Zontes 368 G, Zontes 368 K
- Batch 2: Kove 500X, Cyclone RX401, Zontes 703F, HMC V400, Hamachi Cruiser 250, Mikilon Hammer 300
- Batch 3: HMC A7, Dragon A9, Hamachi Ibiza, 8M Charger, Milan 3, HMC Flash 50, EVOC 2

## TODO / open items
- **Could not source** (no reliable MK reseller page — need owner to supply price+photos): Kove 500F, Zontes 703 RR, AMAX 150, Vampire 200, NVH 125.
- **Verify displacement**: HMC A7 (resellers list 50cc; sometimes called 125cc).
- Remaining minor 50/125cc trim variants can be added in further batches.
- Prices → confirm with dealer owner.

## Pipeline to add a new model
1. WebSearch model + reseller → get product URL.
2. WebFetch the reseller page → extract name, price (den → EUR ≈ den/61.5), cc, specs, image URLs.
3. `curl -A "Mozilla/5.0..."` download images to `public/moto/<slug>/N.jpg` (PNG/WebP saved as .jpg render fine).
4. Add entry to `data/motorcycles.ts`.
5. Verify: `npx tsc --noEmit` + curl the `/motocikli/<slug>` route and images for 200.
