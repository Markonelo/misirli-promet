import Link from "next/link";
import { Car as CarIcon, Fuel, Cog, ArrowRight } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { type Car } from "@/data/cars";
import { formatEUR } from "@/lib/utils";

// Card for the /avtomobili grid — mirrors MotoCard's design, but the spec rows
// show car attributes (тип, погон, менувач) instead of engine cc.
export default function CarCard({ car }: { car: Car }) {
  const hasImage = car.images.length > 0;

  const specs = [
    { icon: CarIcon, label: car.bodyType },
    { icon: Fuel, label: car.fuel },
    { icon: Cog, label: car.drive ?? car.transmission ?? "Автоматски" },
  ];

  return (
    <Link
      href={`/avtomobili/${car.slug}`}
      className="soft-card group flex h-full flex-col p-4"
    >
      {/* Image */}
      <div className="relative aspect-[7/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#11233F] to-[#0E1219]">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={car.images[0]}
            alt={car.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="dot-grid flex h-full w-full flex-col items-center justify-center gap-2 text-white/20">
            <CarIcon size={46} strokeWidth={1.3} />
            <span className="font-heading text-[11px] font-bold uppercase tracking-widest">Фото наскоро</span>
          </div>
        )}

        {/* Bottom fade for depth */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

        {car.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-red px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-white shadow">
            Ново
          </span>
        )}
        <FavoriteButton slug={`car-${car.slug}`} name={car.name} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-1 pt-3.5">
        <h3 className="line-clamp-1 font-body text-xl font-extrabold leading-tight text-white">
          {car.name}
        </h3>
        <p className="mt-1.5 font-body text-base text-mute">
          {car.bodyType} · {car.year}
        </p>

        {/* Spec list — one line each */}
        <div className="mt-auto space-y-2.5 border-y border-line py-4">
          {specs.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <s.icon size={19} className="shrink-0 text-blue-light" strokeWidth={1.8} />
              <span className={`line-clamp-1 text-sm leading-tight text-ink-soft ${i === 0 ? "font-semibold" : "font-body"}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            {car.priceFrom && (
              <span className="block font-body text-xs uppercase tracking-wide text-mute">од</span>
            )}
            <span className="nums text-2xl font-bold text-white">
              {car.priceFrom ? `${formatEUR(car.priceFrom)} €` : "по барање"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-heading text-base font-bold text-red transition-colors group-hover:text-red-light">
            Детали
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
