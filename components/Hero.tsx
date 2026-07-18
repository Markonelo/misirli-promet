"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { SITE } from "@/lib/site";
import { motorcycles, motoBrand, BRANDS } from "@/data/motorcycles";
import FallbackImage from "./FallbackImage";

const ALL_BRANDS = "Сите брендови";
const ALL_MODELS = "Сите модели";

// Segmented filters. Options are generic placeholders for now — selecting one
// just updates the pill label; "Барај" opens the full catalogue.
// The "Модел" options are computed at render time so they only list bikes of the
// chosen brand (otherwise the list is 27+ long and runs off the screen).
// TODO(client): wire selections to real catalogue filtering.
const FILTERS: { key: string; label: string; options: string[] }[] = [
  { key: "cond", label: "Состојба", options: ["Сите", "Ново", "Половно"] },
  { key: "brand", label: "Бренд", options: [ALL_BRANDS, ...BRANDS] },
  { key: "model", label: "Модел", options: [] },
  { key: "price", label: "Цена", options: ["Сите цени", "до 2.000 €", "2.000 – 4.000 €", "над 4.000 €"] },
];

export default function Hero() {
  const router = useRouter();
  const go = () => router.push("/motocikli");

  const [openKey, setOpenKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});
  // Height budget for the open dropdown, sized to the space below its button so
  // a long list scrolls instead of running off the screen — while short lists
  // (e.g. brands) still show every option.
  const [menuMax, setMenuMax] = useState<number>(320);
  const barRef = useRef<HTMLDivElement>(null);

  // Toggle a dropdown; when opening, measure the room below the button.
  const toggle = (key: string, btn: HTMLElement) => {
    if (openKey === key) {
      setOpenKey(null);
      return;
    }
    const space = window.innerHeight - btn.getBoundingClientRect().bottom - 20;
    setMenuMax(Math.max(180, Math.min(space, 384)));
    setOpenKey(key);
  };

  // Close the open dropdown when clicking outside the filter bar.
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openKey]);

  return (
    <section className="bg-blue-sky p-2 sm:p-2.5">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[calc(100svh-1rem)] min-h-[38rem] w-full overflow-hidden rounded-[1.75rem] sm:h-[calc(100svh-1.25rem)] sm:rounded-[2rem]"
      >
        {/* Brand navy backdrop — matched to the hero photo so the bikes (placed
            low, via object-contain) blend seamlessly into the same deep navy. */}
        <div className="absolute inset-0 bg-[radial-gradient(52%_74%_at_50%_70%,#0e2c58_0%,#06183a_36%,#020912_66%,#010310_90%,#010208_100%)]" />

        {/* Hero image — ONE full-bleed composite: the navy radial gradient and the
            three bikes are baked into a single image, so there is no second navy
            layer to mismatch and therefore no seam anywhere. The bikes are
            feathered into the same gradient they sit on. Canvas ratio matches the
            desktop panel (1.885) so it fills with no crop; object-cover keeps it
            gapless on every other size. */}
        <FallbackImage
          src="/hero.jpg?v=9"
          alt="Мотоцикли — Мисирли Промет"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Legibility vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

        {/* ── Content overlay ───────────────────────────────────────── */}
        <div className="relative z-10 flex h-full flex-col items-center px-5 sm:px-8">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-24 text-center font-heading text-[2.25rem] font-extrabold leading-[1.04] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:mt-28 sm:text-6xl lg:mt-32 lg:text-7xl"
          >
            Најди го моторот<br />од соништата
          </motion.h1>

          {/* Search / filter bar */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => {
              e.preventDefault();
              go();
            }}
            className="mt-8 w-full max-w-4xl sm:mt-10"
          >
            <div
              ref={barRef}
              className="relative flex flex-col gap-1.5 rounded-2xl border border-white/15 bg-white/10 p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:flex-row sm:items-stretch sm:rounded-full"
            >
              {FILTERS.map((f) => {
                const isOpen = openKey === f.key;
                const value = selected[f.key];

                // The model list depends on the chosen brand. With no brand
                // picked we show a small "pick a brand first" prompt instead of
                // dumping every model; once a brand is set we list only its bikes.
                const brand = selected.brand;
                const brandChosen = !!brand && brand !== ALL_BRANDS;
                const needsBrand = f.key === "model" && !brandChosen;
                const options =
                  f.key === "model"
                    ? brandChosen
                      ? [ALL_MODELS, ...motorcycles.filter((m) => motoBrand(m) === brand).map((m) => m.name)]
                      : []
                    : f.options;

                return (
                  <div key={f.key} className="relative sm:flex-1">
                    <button
                      type="button"
                      onClick={(e) => toggle(f.key, e.currentTarget)}
                      className={`flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-full border px-5 py-3 font-heading text-sm font-semibold transition-colors ${
                        isOpen || value
                          ? "border-white/30 bg-white/15 text-white"
                          : "border-white/15 bg-white/5 text-white/90 hover:border-white/30 hover:bg-white/15"
                      }`}
                    >
                      <span className="truncate">{value ?? f.label}</span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#0E1B2E]">
                        <ChevronDown
                          size={13}
                          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{ maxHeight: menuMax }}
                        className="no-scrollbar absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full min-w-[12rem] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#1b212b]/95 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                      >
                        {needsBrand ? (
                          <p className="px-5 py-4 text-left font-body text-sm leading-snug text-white/70">
                            Прво избери <span className="font-bold text-white">бренд</span>, па потоа моделот.
                          </p>
                        ) : (
                          options.map((opt, i) => {
                            const active = value ? value === opt : i === 0;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setSelected((s) => {
                                    const next = { ...s, [f.key]: opt };
                                    // Changing brand invalidates the current model.
                                    if (f.key === "brand") delete next.model;
                                    return next;
                                  });
                                  setOpenKey(null);
                                }}
                                className={`block w-full px-5 py-3.5 text-left font-heading text-sm transition-colors hover:bg-white/10 ${
                                  i > 0 ? "border-t border-white/10" : ""
                                } ${active ? "font-bold text-white" : "text-white/80"}`}
                              >
                                {opt}
                              </button>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                className="glow-btn shrink-0 !px-7 !py-3 text-sm"
              >
                <Search size={16} /> Барај
              </button>
            </div>
          </motion.form>

          {/* Bottom row — description (left) + location card (right) */}
          <div className="mt-auto flex w-full flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xs font-body text-sm leading-relaxed text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            >
              Мисирли Промет — мотоцикли, скутери и квадови во {SITE.city}.
              Нови возила, искрена услуга и совет за секој возач.
            </motion.p>

            <motion.a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex items-center gap-4 self-start rounded-2xl bg-white px-5 py-5 shadow-[0_18px_44px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5 sm:self-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-9 w-9 shrink-0 text-red">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              <span className="leading-snug">
                <span className="block font-heading text-base font-bold text-[#0E1B2E] underline decoration-1 underline-offset-2">
                  Погледни на мапа
                </span>
                <span className="mt-1 block max-w-[16rem] font-body text-sm text-[#5C6B82]">
                  {/* TODO(client): exact location — replace SITE.address once provided. */}
                  {SITE.address}
                </span>
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
