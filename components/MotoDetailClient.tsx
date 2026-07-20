"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Check,
  Gauge,
  Cog,
  Droplets,
  Bike,
  Calendar,
  ChevronRight,
  Mail,
  ShieldCheck,
  Zap,
  Lightbulb,
  Mountain,
  CircleDot,
  Fuel,
  Settings2,
  Feather,
  Wrench,
  Banknote,
  ArrowUpRight,
} from "lucide-react";
import {
  type Motorcycle,
  CATEGORY_LABELS,
  variantBadge,
} from "@/data/motorcycles";
import { SITE } from "@/lib/site";
import { formatEUR } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import Lightbox from "./Lightbox";
import { Expand } from "lucide-react";

// Pick a sensible icon for a piece of equipment based on its wording.
function featureIcon(f: string) {
  const s = f.toLowerCase();
  if (s.includes("ладење")) return Droplets;
  if (s.includes("резервоар")) return Fuel;
  if (s.includes("тактен") || s.includes("мотор")) return Cog;
  if (s.includes("led") || s.includes("светл") || s.includes("детали")) return Lightbulb;
  if (s.includes("дисплеј")) return Gauge;
  if (s.includes("клиренс")) return Mountain;
  if (s.includes("гуми") || s.includes("4x4")) return CircleDot;
  if (s.includes("палење") || s.includes("cdi") || s.includes("стартув")) return Zap;
  if (s.includes("менувач")) return Settings2;
  if (s.includes("тежин") || s.includes("лесн")) return Feather;
  if (s.includes("моќ") || s.includes("кс") || s.includes("kw")) return Zap;
  if (s.includes("шасе")) return ShieldCheck;
  return Check;
}

export default function MotoDetailClient({ moto }: { moto: Motorcycle }) {
  const [vIndex, setVIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const variant = moto.variants[vIndex];
  const colors = moto.colors ?? [];
  const hasColors = colors.length > 0;
  const hasImages = moto.images.length > 0;
  // When colours exist, the selected colour drives the main photo; otherwise
  // fall back to the thumbnail gallery.
  const mainImage = hasColors ? colors[colorIndex].image : moto.images[imgIndex];

  // Unified gallery for the lightbox — colour photos when present, else the
  // regular image gallery. The active index and its setter track whichever
  // source is driving the main photo.
  const galleryImages = hasColors ? colors.map((c) => c.image) : moto.images;
  const galleryIndex = hasColors ? colorIndex : imgIndex;
  const setGalleryIndex = hasColors ? setColorIndex : setImgIndex;
  const canOpenLightbox = hasColors || hasImages;

  // ── Derive real specs from the feature list + copy (no empty placeholders) ──
  const hay = [...moto.features, moto.description, moto.shortDesc].join(" ");
  const powerMatch = hay.match(/(\d+)\s?(КС|kW)/i);
  const tankMatch = hay.match(/(\d+)\s?(?:L|литр)/i);
  const cooling = moto.features
    .find((f) => f.includes("ладење"))
    ?.replace(/\s*ладење/, "");
  const engine = moto.features.find((f) => f.includes("тактен"));
  const starter = moto.features.find((f) => /палење|стартув/i.test(f));

  const specs = [
    { icon: Gauge, label: "Кубикажа", value: `${variant.cc} cc`, key: "cc" },
    ...(powerMatch
      ? [{ icon: Zap, label: "Моќност", value: `${powerMatch[1]} ${powerMatch[2].toUpperCase() === "KW" ? "kW" : "КС"}`, key: "pw" }]
      : []),
    ...(cooling ? [{ icon: Droplets, label: "Ладење", value: cooling, key: "cool" }] : []),
    ...(engine ? [{ icon: Cog, label: "Мотор", value: engine.replace(/\s*мотор/, ""), key: "eng" }] : []),
    ...(tankMatch ? [{ icon: Fuel, label: "Резервоар", value: `${tankMatch[1]} L`, key: "tank" }] : []),
    { icon: Bike, label: "Категорија", value: CATEGORY_LABELS[moto.category], key: "cat" },
    ...(starter ? [{ icon: Zap, label: "Палење", value: starter.replace(/\s*(палење|стартување)/i, "").trim() || "Електрично", key: "start" }] : []),
    { icon: Calendar, label: "Година", value: String(moto.year), key: "year" },
  ];

  const trust = [
    { icon: ShieldCheck, title: "Гаранција", text: "Секој нов мотор доаѓа со гаранција и сервисна книшка." },
    { icon: Bike, title: "Тест возење", text: "Пробај го моделот во салонот пред да одлучиш." },
    { icon: Wrench, title: "Сервис и делови", text: "Овластен сервис и оригинални резервни делови." },
    { icon: Banknote, title: "Поволно плаќање", text: "Можност за плаќање на рати — прашај за услови." },
  ];

  return (
    // pt clears the fixed pill header so the breadcrumb never hides beneath it.
    <div className="container-wide pb-16 pt-24 md:pt-28">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 font-body text-sm text-mute">
        <Link href="/" className="transition-colors hover:text-blue-light">Почетна</Link>
        <ChevronRight size={14} className="text-line" />
        <Link href="/motocikli" className="transition-colors hover:text-blue-light">Мотоцикли</Link>
        <ChevronRight size={14} className="text-line" />
        <span className="font-medium text-ink">{moto.name}</span>
      </nav>

      {/* ══ Showcase panel ══ */}
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="grid lg:grid-cols-[1.06fr_0.94fr]">
          {/* ── Gallery ── */}
          <div className="relative flex flex-col gap-3 p-4 sm:p-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-sky to-cloud-2">
              {hasColors || hasImages ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainImage}
                  alt={hasColors ? `${moto.name} — ${colors[colorIndex].name}` : moto.name}
                  onClick={() => setLightboxOpen(true)}
                  className="h-full w-full cursor-zoom-in object-cover"
                />
              ) : (
                <div className="dot-grid flex h-full w-full flex-col items-center justify-center gap-2 text-blue/40">
                  <Bike size={56} strokeWidth={1.3} />
                  <span className="font-heading text-sm font-bold uppercase tracking-widest">Фото наскоро</span>
                </div>
              )}

              {/* Bottom fade for depth */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent" />

              {/* Badge — only "Ново" is shown on the photo */}
              {moto.isNew && (
                <span className="absolute left-4 top-4 rounded-full bg-red px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-wide text-white shadow">
                  Ново
                </span>
              )}

              <FavoriteButton slug={moto.slug} name={moto.name} />

              {/* Expand → open the full-screen lightbox */}
              {canOpenLightbox && (
                <button
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Зголеми слика"
                  className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:bg-black/70"
                >
                  <Expand size={18} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]" />
                </button>
              )}
            </div>

            {/* Thumbnails — hidden when colour options drive the photo */}
            {!hasColors && hasImages && moto.images.length > 1 && (
              <div className="no-scrollbar flex gap-3 overflow-x-auto">
                {moto.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Слика ${i + 1}`}
                    className={`h-20 w-24 overflow-hidden rounded-xl border-2 transition-all ${
                      i === imgIndex ? "border-blue" : "border-line hover:border-blue/50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col p-6 sm:p-8">
            <h1 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              {moto.name}
            </h1>
            <p className="mt-2 font-body text-sm text-mute">
              {moto.year} · достапен во {variantBadge(moto)}
            </p>

            <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft">
              {moto.shortDesc}
            </p>

            {/* Live price */}
            <div className="mt-6 rounded-2xl border border-line bg-cloud px-5 py-4">
              <span className="font-body text-[11px] uppercase tracking-wide text-mute">
                {moto.variants.length > 1 ? "Цена (избрана верзија)" : "Цена"}
              </span>
              <div className="mt-1 flex items-end gap-2.5">
                <motion.span
                  key={vIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="nums text-4xl font-bold text-white sm:text-[2.75rem] sm:leading-none"
                >
                  {variant.price ? `${formatEUR(variant.price)} €` : "по барање"}
                </motion.span>
                {variant.price && (
                  <span className="pb-1 font-body text-sm text-mute">верзија {variant.cc}cc</span>
                )}
              </div>
            </div>

            {/* Colour selector — pressing a swatch swaps the main photo */}
            {hasColors && (
              <div className="mt-6">
                <span className="font-heading text-xs font-bold uppercase tracking-wide text-ink">
                  Боја: <span className="text-mute">{colors[colorIndex].name}</span>
                </span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIndex(i)}
                      aria-label={c.name}
                      title={c.name}
                      className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                        i === colorIndex
                          ? "border-red scale-105"
                          : "border-line hover:border-red/50"
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

            {/* Variant selector */}
            {moto.variants.length > 1 && (
              <div className="mt-6">
                <span className="font-heading text-xs font-bold uppercase tracking-wide text-ink">
                  Избери верзија
                </span>
                <div className="mt-3 flex flex-wrap gap-3">
                  {moto.variants.map((v, i) => (
                    <button
                      key={v.cc}
                      onClick={() => setVIndex(i)}
                      className={`relative rounded-2xl border-2 px-5 py-3 text-left transition-all ${
                        i === vIndex
                          ? "border-red bg-red-muted"
                          : "border-line bg-surface-2 hover:border-red/50"
                      }`}
                    >
                      <span className="block nums text-lg font-bold text-ink">{v.cc}cc</span>
                      <span className="nums text-xs text-mute">
                        {v.price ? `${formatEUR(v.price)} €` : "по барање"}
                      </span>
                      {i === vIndex && (
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red text-white">
                          <Check size={12} strokeWidth={3} />
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
        <motion.div
          key={`specs-${vIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex flex-wrap gap-3 sm:gap-4"
        >
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
        </motion.div>
      </div>

      {/* ══ About + Equipment ══ */}
      <div className="mt-11 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* About */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-1 rounded-full bg-red" />
            <h2 className="font-heading text-lg font-black uppercase tracking-wide text-ink">
              За моделот
            </h2>
          </div>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft">
            {moto.description}
          </p>
        </div>

        {/* Equipment */}
        {moto.features.length > 0 && (
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-5 w-1 rounded-full bg-red" />
              <h2 className="font-heading text-lg font-black uppercase tracking-wide text-ink">
                Опрема
              </h2>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {moto.features.map((f) => {
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

      {/* ══ Trust strip ══ */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {trust.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.title}
              className="group relative overflow-hidden rounded-2xl border border-line bg-cloud p-5 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue/60 hover:shadow-[0_18px_44px_-22px_rgba(45,123,224,0.7)]"
            >
              {/* Blue reveal — a circle that grows out from the icon to fill the whole card */}
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

                {/* CTA — smoothly expands + fades in on hover */}
                <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-heading text-xs font-bold text-blue-deep transition-transform hover:scale-[1.03]"
                    >
                      <Calendar size={14} /> Закажи термин
                    </Link>
                  </div>
                </div>
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
              Заинтересиран за {moto.name}?
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

      {/* ══ Full-screen image lightbox ══ */}
      {lightboxOpen && canOpenLightbox && (
        <Lightbox
          images={galleryImages}
          index={galleryIndex}
          alt={moto.name}
          onIndexChange={setGalleryIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
