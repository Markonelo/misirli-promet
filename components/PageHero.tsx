import { Bike } from "lucide-react";
import FallbackImage from "./FallbackImage";

export default function PageHero({
  kicker,
  title,
  subtitle,
  full = false,
  image = "/Photos/Outside.jpg",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  full?: boolean;       // full-viewport hero with a background photo
  image?: string;       // background photo path (used when `full`)
}) {
  // ── Full-viewport hero (image fills the frame, small white seams) ──
  if (full) {
    return (
      <section className="bg-bg">
        <div className="relative h-svh min-h-[34rem] w-full overflow-hidden">
          {/* Studio backdrop (shows until the real photo lands) */}
          <div className="absolute inset-0 bg-[radial-gradient(125%_105%_at_50%_28%,#3b4250_0%,#222834_45%,#0e1219_78%,#080b11_100%)]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[60%] -translate-x-1/2 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.14),transparent_70%)]" />

          {/* Salon / showroom photo */}
          <FallbackImage
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Placeholder hint — only visible while the photo is missing */}
          <div className="pointer-events-none absolute left-1/2 top-[58%] flex -translate-x-1/2 flex-col items-center gap-2 text-white/15">
            <Bike size={58} strokeWidth={1.1} />
          </div>

          {/* Legibility vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
            {kicker && <span className="kicker">{kicker}</span>}
            <h1 className="mt-3 font-heading text-4xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto mt-5 max-w-2xl font-body text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── Compact hero (default — used by the other pages) ──
  return (
    <section className="relative overflow-hidden border-b border-line bg-cloud">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(23,99,198,0.14),transparent_65%)]" />
      <div className="container-wide relative pb-12 pt-[92px] text-center md:pb-16 md:pt-[120px]">
        {kicker && <span className="kicker">{kicker}</span>}
        <h1 className="mt-3 font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl font-body text-mute sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
