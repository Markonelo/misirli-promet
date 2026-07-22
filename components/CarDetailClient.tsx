"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Check,
  Car as CarIcon,
  Fuel,
  Cog,
  Zap,
  Calendar,
  ChevronRight,
  Mail,
  ShieldCheck,
  Wrench,
  Banknote,
  ArrowUpRight,
  Gauge,
  Compass,
} from "lucide-react";
import { type Car } from "@/data/cars";
import { SITE } from "@/lib/site";
import { formatEUR } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";

function featureIcon(f: string) {
  const s = f.toLowerCase();
  if (s.includes("хибрид") || s.includes("електрич")) return Zap;
  if (s.includes("мотор") || s.includes("turbo") || s.includes("турбо") || s.includes("jet")) return Cog;
  if (s.includes("4x4") || s.includes("allgrip") || s.includes("погон")) return Compass;
  if (s.includes("потрош") || s.includes("емисии")) return Fuel;
  if (s.includes("клиренс") || s.includes("багаж") || s.includes("простор")) return CarIcon;
  return Check;
}

export default function CarDetailClient({ car }: { car: Car }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [trimIndex, setTrimIndex] = useState(0);
  const colors = car.colors ?? [];
  const hasColors = colors.length > 0;
  const hasImages = car.images.length > 0;

  const trims = car.trims ?? [];
  const hasTrims = trims.length > 0;
  const trim = hasTrims ? trims[trimIndex] : undefined;

  // Higher trims are cumulative — show every feature from the base trim up to the
  // selected one. Falls back to the flat `features` list when a car has no trims.
  const equipment = hasTrims
    ? trims.slice(0, trimIndex + 1).flatMap((t) => t.features)
    : car.features;

  // Price shown in the price block: selected trim's action price, else `priceFrom`.
  const activePrice = trim ? trim.priceFrom : car.priceFrom;
  const activeRegular = trim?.priceRegular;

  const specs = [
    { icon: CarIcon, label: "Каросерија", value: car.bodyType, key: "body" },
    { icon: Fuel, label: "Погон", value: car.fuel, key: "fuel" },
    ...(car.transmission ? [{ icon: Cog, label: "Менувач", value: car.transmission, key: "gear" }] : []),
    ...(car.drive ? [{ icon: Compass, label: "Тркала", value: car.drive, key: "drive" }] : []),
    { icon: Calendar, label: "Година", value: String(car.year), key: "year" },
  ];

  const trust = [
    { icon: ShieldCheck, title: "Гаранција", text: "Секое ново возило доаѓа со фабричка гаранција и сервисна книшка." },
    { icon: Gauge, title: "Тест возење", text: "Пробај го моделот пред да одлучиш." },
    { icon: Wrench, title: "Сервис и делови", text: "Овластен сервис и оригинални резервни делови." },
    { icon: Banknote, title: "Поволно плаќање", text: "Можност за плаќање на рати — прашај за услови." },
  ];

  return (
    <div className="container-wide pb-16 pt-24 md:pt-28">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 font-body text-sm text-mute">
        <Link href="/" className="transition-colors hover:text-blue-light">Почетна</Link>
        <ChevronRight size={14} className="text-line" />
        <Link href="/avtomobili" className="transition-colors hover:text-blue-light">Автомобили</Link>
        <ChevronRight size={14} className="text-line" />
        <span className="font-medium text-ink">{car.name}</span>
      </nav>

      {/* ══ Showcase panel ══ */}
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="grid lg:grid-cols-[1.06fr_0.94fr]">
          {/* ── Gallery ── */}
          <div className="relative flex min-w-0 flex-col gap-3 p-4 sm:p-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-sky to-cloud-2">
              {hasImages ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={car.images[imgIndex]}
                  alt={car.name}
                  className="h-full w-full object-contain p-3"
                />
              ) : (
                <div className="dot-grid flex h-full w-full flex-col items-center justify-center gap-2 text-blue/40">
                  <CarIcon size={56} strokeWidth={1.3} />
                  <span className="font-heading text-sm font-bold uppercase tracking-widest">Фото наскоро</span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent" />

              {car.isNew && (
                <span className="absolute left-4 top-4 rounded-full bg-red px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-wide text-white shadow">
                  Ново
                </span>
              )}

              <FavoriteButton slug={`car-${car.slug}`} name={car.name} />
            </div>

            {/* Thumbnails */}
            {hasImages && car.images.length > 1 && (
              <div className="no-scrollbar flex gap-3 overflow-x-auto">
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Слика ${i + 1}`}
                    className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      i === imgIndex ? "border-blue" : "border-line hover:border-blue/50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="flex min-w-0 flex-col p-5 sm:p-8">
            <h1 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              {car.name}
            </h1>
            <p className="mt-2 font-body text-sm text-mute">
              {car.year} · {car.bodyType} · {car.fuel}
            </p>

            <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft">
              {car.shortDesc}
            </p>

            {/* Price */}
            <div className="mt-6 rounded-2xl border border-line bg-cloud px-5 py-4">
              <span className="font-body text-[11px] uppercase tracking-wide text-mute">
                {hasTrims ? `Цена (${trim!.level})` : "Цена"}
              </span>
              <div className="mt-1 flex flex-wrap items-end gap-x-2.5 gap-y-1">
                <motion.span
                  key={`${trimIndex}-${activePrice}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="nums text-4xl font-bold text-white sm:text-[2.75rem] sm:leading-none"
                >
                  {activePrice ? `од ${formatEUR(activePrice)} €` : "по барање"}
                </motion.span>
                {activeRegular && activeRegular > (activePrice ?? 0) && (
                  <span className="nums pb-1 text-lg font-semibold text-mute line-through decoration-red/60">
                    {formatEUR(activeRegular)} €
                  </span>
                )}
              </div>
            </div>

            {/* Trim picker */}
            {hasTrims && (
              <div className="mt-6">
                <span className="font-heading text-xs font-bold uppercase tracking-wide text-ink">
                  Изведба (пакет опрема)
                </span>
                <div className="mt-3 flex flex-wrap gap-3">
                  {trims.map((t, i) => (
                    <button
                      key={t.level}
                      onClick={() => setTrimIndex(i)}
                      className={`relative rounded-2xl border-2 px-4 py-2.5 text-left transition-all sm:px-5 sm:py-3 ${
                        i === trimIndex
                          ? "border-red bg-red-muted"
                          : "border-line bg-surface-2 hover:border-red/50"
                      }`}
                    >
                      <span className="block font-heading text-base font-bold text-ink sm:text-lg">{t.level}</span>
                      <span className="nums text-xs text-mute">од {formatEUR(t.priceFrom)} €</span>
                      {i === trimIndex && (
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red text-white">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colour swatches */}
            {hasColors && (
              <div className="mt-6">
                <span className="font-heading text-xs font-bold uppercase tracking-wide text-ink">
                  Боја: <span className="text-mute">{colors[colorIndex].name}</span>
                </span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setColorIndex(i);
                        if (c.image) {
                          const idx = car.images.indexOf(c.image);
                          if (idx >= 0) setImgIndex(idx);
                        }
                      }}
                      aria-label={c.name}
                      title={c.name}
                      className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                        i === colorIndex ? "border-red scale-105" : "border-line hover:border-red/50"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {i === colorIndex && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red text-white">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-7">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={SITE.phoneHref} className="btn-primary flex-1">
                  <Phone size={18} /> Јави се: {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="btn-ghost flex-1">
                  <Mail size={18} /> Прашај понуда
                </a>
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 font-body text-xs text-mute">
                <ShieldCheck size={15} className="text-blue-light" />
                Бесплатна консултација и тест возење во салонот во Битола
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Spec highlights band ══ */}
      <div className="mt-10">
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-1 rounded-full bg-red" />
          <h2 className="font-heading text-lg font-black uppercase tracking-wide text-ink">
            Спецификации
          </h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
          {specs.map((s) => {
            const Icon = s.icon;
            const numeric = /^\d/.test(s.value);
            return (
              <div
                key={s.key}
                className="flex min-w-[150px] flex-1 items-center gap-3.5 rounded-2xl border border-line bg-surface px-4 py-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-muted">
                  <Icon size={20} className="text-blue-light" />
                </span>
                <div className="leading-tight">
                  <div className="font-body text-[11px] uppercase tracking-wide text-mute">{s.label}</div>
                  <div className={`mt-0.5 text-[15px] font-bold text-ink ${numeric ? "nums" : "font-heading"}`}>
                    {s.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ About + Equipment ══ */}
      <div className="mt-11 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-1 rounded-full bg-red" />
            <h2 className="font-heading text-lg font-black uppercase tracking-wide text-ink">
              За моделот
            </h2>
          </div>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft">
            {car.description}
          </p>
          {car.extraInfo && (
            <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft">
              {car.extraInfo}
            </p>
          )}
          {car.sourceUrl && (
            <a
              href={car.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-blue-light transition-colors hover:text-white"
            >
              Повеќе на официјалната страница на Suzuki
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        {equipment.length > 0 && (
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-5 w-1 rounded-full bg-red" />
              <h2 className="font-heading text-lg font-black uppercase tracking-wide text-ink">
                Опрема{hasTrims ? ` · ${trim!.level}` : ""}
              </h2>
            </div>
            {hasTrims && (
              <p className="mt-2 font-body text-xs text-mute">
                Прикажана е опремата за избраната изведба (вклучува и пониските пакети).
              </p>
            )}
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {equipment.map((f) => {
                const Icon = featureIcon(f);
                return (
                  <li
                    key={f}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 font-body text-sm text-ink-soft"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-muted">
                      <Icon size={16} className="text-red-light" />
                    </span>
                    {f}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* ══ Safety — Suzuki Safety Support ══ */}
      {(car.safetyHighlights?.length || car.safety?.length) && (
        <div className="mt-12">
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-1 rounded-full bg-red" />
            <h2 className="font-heading text-lg font-black uppercase tracking-wide text-ink">
              Безбедност · Suzuki Safety Support
            </h2>
          </div>

          {/* Highlighted systems */}
          {car.safetyHighlights && car.safetyHighlights.length > 0 && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {car.safetyHighlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-muted">
                      <ShieldCheck size={18} className="text-blue-light" />
                    </span>
                    <h3 className="font-heading text-base font-bold text-ink">{h.title}</h3>
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{h.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Full safety system list */}
          {car.safety && car.safety.length > 0 && (
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {car.safety.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 font-body text-sm text-ink-soft"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-muted">
                    <ShieldCheck size={15} className="text-blue-light" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          )}

          {car.sourceUrl && (
            <p className="mt-5 font-body text-xs text-mute">
              Извор: Suzuki ·{" "}
              <a
                href={car.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-light transition-colors hover:text-white"
              >
                погледни ги сите детали на suzukiauto.mk
                <ArrowUpRight size={13} />
              </a>
            </p>
          )}
        </div>
      )}

      {/* ══ Trust strip ══ */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {trust.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.title}
              className="group relative overflow-hidden rounded-2xl border border-line bg-cloud p-5 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue/60 hover:shadow-[0_18px_44px_-22px_rgba(45,123,224,0.7)]"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-mid to-blue [clip-path:circle(22px_at_42px_42px)] transition-[clip-path] duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[clip-path:circle(460px_at_42px_42px)]" />
              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-muted transition-colors duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-white/20">
                  <Icon size={20} className="text-white" />
                </span>
                <h3 className="mt-3.5 font-heading text-base font-bold text-ink transition-colors duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white">
                  {t.title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-mute transition-colors duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white/85">
                  {t.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ CTA band ══ */}
      <div className="mt-12 rounded-[2rem] border border-blue/25 bg-gradient-to-br from-blue-deep via-blue-mid to-blue p-8 shadow-[0_10px_60px_-6px_rgba(45,123,224,0.28)] sm:p-11">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
              Заинтересиран за {car.name}?
            </h2>
            <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-white/80">
              Јави се или испрати порака — ќе ти дадеме актуелна понуда, услови за плаќање и термин за тест возење во салонот во Битола.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4.5 font-heading text-base font-bold text-blue-deep transition-transform hover:-translate-y-0.5"
            >
              <Phone size={19} /> {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/40 px-8 py-4.5 font-heading text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              <Mail size={19} /> Испрати порака <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
