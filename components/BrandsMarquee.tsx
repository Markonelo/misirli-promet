// Infinite brand conveyor. CSS-only marquee (no JS) — the track is duplicated
// once and translated -50% so the loop is seamless.
//
// Real brand logos live in /public/brands (normalized to white-on-transparent
// PNGs). They're rendered through `brightness-0 invert` so every logo becomes a
// uniform muted-white silhouette — consistent on the dark surface regardless of
// each logo's native colour, and lighting up on hover.
const BRANDS: { name: string; src: string; h: string }[] = [
  { name: "Hamachi", src: "/brands/hamachi.png", h: "h-11" },
  { name: "SYM", src: "/brands/sym.png", h: "h-7" },
  { name: "Zontes", src: "/brands/zontes.png", h: "h-5" },
  { name: "QJMOTOR", src: "/brands/qjmotor.png", h: "h-9" },
  { name: "SFA", src: "/brands/sfa.png", h: "h-11" },
];

export default function BrandsMarquee() {
  // Repeat the set enough times that a single half-track overfills the widest
  // viewport. The keyframe translates by -50% (exactly one half), so the second
  // half seamlessly takes the first's place — a continuous, gapless loop.
  const set = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];
  const row = [...set, ...set];
  return (
    <section className="border-y border-white/5 bg-cloud-2 py-7">
      <div className="container-wide">
        <p className="mb-6 text-center font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-mute">
          Брендови што ги нудиме
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track items-center gap-16 pr-16">
            {row.map((b, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${b.name}-${i}`}
                src={`${b.src}?v=3`}
                alt={b.name}
                className={`${b.h} w-auto shrink-0 select-none object-contain opacity-45 brightness-0 invert transition-opacity duration-300 hover:opacity-90`}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
