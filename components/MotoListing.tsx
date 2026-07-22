"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Search, ChevronDown, X } from "lucide-react";
import {
  motorcycles,
  CATEGORY_LABELS,
  fromPrice,
  motoBrand,
  BRANDS,
  type MotoCategory,
} from "@/data/motorcycles";
import MotoCard from "./MotoCard";

type CatFilter = MotoCategory | "all";
type CcFilter = number | "all";
type BrandFilter = string | "all";
type YearFilter = number | "all";
type PriceFilter = "all" | "lt2000" | "2000-4000" | "gt4000";
type SortKey = "featured" | "price-asc" | "price-desc";

type Option = { value: string; label: string };

const CATS: { key: CatFilter; label: string }[] = [
  { key: "all", label: "Сите категории" },
  { key: "naked", label: CATEGORY_LABELS.naked },
  { key: "scooter", label: CATEGORY_LABELS.scooter },
  { key: "enduro", label: CATEGORY_LABELS.enduro },
  { key: "adventure", label: CATEGORY_LABELS.adventure },
  { key: "atv", label: CATEGORY_LABELS.atv },
];

// Distinct engine sizes pulled straight from the catalogue.
const CCS = Array.from(
  new Set(motorcycles.flatMap((m) => m.variants.map((v) => v.cc)))
).sort((a, b) => a - b);

// Distinct model years, newest first.
const YEARS = Array.from(new Set(motorcycles.map((m) => m.year))).sort(
  (a, b) => b - a
);

const PRICES: { key: PriceFilter; label: string }[] = [
  { key: "all", label: "Сите цени" },
  { key: "lt2000", label: "до 2.000 €" },
  { key: "2000-4000", label: "2.000 – 4.000 €" },
  { key: "gt4000", label: "над 4.000 €" },
];

const CAT_OPTS: Option[] = CATS.map((c) => ({ value: c.key, label: c.label }));
const BRAND_OPTS: Option[] = [
  { value: "all", label: "Сите брендови" },
  ...BRANDS.map((b) => ({ value: b, label: b })),
];
const CC_OPTS: Option[] = [
  { value: "all", label: "Сите" },
  ...CCS.map((c) => ({ value: String(c), label: `${c}cc` })),
];
const YEAR_OPTS: Option[] = [
  { value: "all", label: "Сите години" },
  ...YEARS.map((y) => ({ value: String(y), label: String(y) })),
];
const PRICE_OPTS: Option[] = PRICES.map((p) => ({ value: p.key, label: p.label }));
const SORT_OPTS: Option[] = [
  { value: "featured", label: "Препорачани" },
  { value: "price-asc", label: "Цена: ниска → висока" },
  { value: "price-desc", label: "Цена: висока → ниска" },
];

const labelCls =
  "mb-1.5 block font-heading text-[11px] font-bold uppercase tracking-wider text-white/60";

/** Clean custom dropdown styled like the hero filter popups. */
function Dropdown({
  label,
  options,
  value,
  onChange,
  open,
  onToggle,
  className = "",
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const current = options.find((o) => o.value === value) ?? options[0];
  return (
    <div className={`relative ${className}`}>
      <span className={labelCls}>{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-2.5 font-body text-sm transition-colors ${
          open
            ? "border-white/50 bg-white/15 text-white"
            : "border-white/20 bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        <span className="truncate">{current.label}</span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#0E1B2E]">
          <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+0.45rem)] z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#1b212b]/95 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {options.map((o, i) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => onChange(o.value)}
                className={`block w-full px-4 py-2.5 text-left font-body text-sm transition-colors hover:bg-white/10 ${
                  i > 0 ? "border-t border-white/10" : ""
                } ${active ? "font-bold text-white" : "text-white/80"}`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MotoListing() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CatFilter>("all");
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [cc, setCc] = useState<CcFilter>("all");
  const [year, setYear] = useState<YearFilter>("all");
  const [price, setPrice] = useState<PriceFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const [openKey, setOpenKey] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggle = (key: string) => setOpenKey((k) => (k === key ? null : key));

  // Sync category from the ?kategorija= query (set by category links).
  useEffect(() => {
    const q = params.get("kategorija") as CatFilter | null;
    if (q && CATS.some((c) => c.key === q)) setCat(q);
  }, [params]);

  // Close any open dropdown on outside click.
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openKey]);

  const list = useMemo(() => {
    let r = motorcycles.filter((m) => {
      if (cat !== "all" && m.category !== cat) return false;
      if (brand !== "all" && motoBrand(m) !== brand) return false;
      if (cc !== "all" && !m.variants.some((v) => v.cc === cc)) return false;
      if (year !== "all" && m.year !== year) return false;
      if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (price !== "all") {
        const p = fromPrice(m);
        if (p == null) return false;
        if (price === "lt2000" && !(p < 2000)) return false;
        if (price === "2000-4000" && !(p >= 2000 && p <= 4000)) return false;
        if (price === "gt4000" && !(p > 4000)) return false;
      }
      return true;
    });

    if (sort === "price-asc") {
      r = r.sort((a, b) => (fromPrice(a) ?? Infinity) - (fromPrice(b) ?? Infinity));
    } else if (sort === "price-desc") {
      r = r.sort((a, b) => (fromPrice(b) ?? -Infinity) - (fromPrice(a) ?? -Infinity));
    } else {
      r = r.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
    return r;
  }, [cat, brand, cc, year, price, query, sort]);

  const isFiltered =
    query !== "" ||
    cat !== "all" ||
    brand !== "all" ||
    cc !== "all" ||
    year !== "all" ||
    price !== "all";

  const clear = () => {
    setQuery("");
    setCat("all");
    setBrand("all");
    setCc("all");
    setYear("all");
    setPrice("all");
    setSort("featured");
    setOpenKey(null);
  };

  // Pick a value + close the menu.
  const pick = <T,>(setter: (v: T) => void, v: T) => {
    setter(v);
    setOpenKey(null);
  };

  return (
    <div className="lg:grid lg:grid-cols-[290px_1fr] lg:items-start lg:gap-8">
      {/* ── Filter sidebar (blue) ──
          `filter-sticky` (see globals.css) only pins the panel when the
          viewport is tall enough to show it in full; on short laptop
          viewports it scrolls with the page so nothing is ever clipped. */}
      <aside className="filter-sticky">
        <div ref={panelRef} className="rounded-[1.5rem] bg-blue-deep p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:p-6">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-white">
              <SlidersHorizontal size={16} /> Филтер
            </div>
            {isFiltered && (
              <button
                onClick={clear}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 font-body text-xs text-white/80 transition-colors hover:border-red hover:text-red"
              >
                <X size={13} /> Исчисти
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Пребарај модел…"
              className="w-full rounded-xl border border-white/20 bg-white/10 py-2.5 pl-10 pr-4 font-body text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/60"
            />
          </div>

          {/* Dropdowns — single column in the sidebar, 2-col on tablet */}
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
            <Dropdown
              label="Категорија"
              options={CAT_OPTS}
              value={cat}
              open={openKey === "cat"}
              onToggle={() => toggle("cat")}
              onChange={(v) => pick(setCat, v as CatFilter)}
            />
            <Dropdown
              label="Бренд"
              options={BRAND_OPTS}
              value={brand}
              open={openKey === "brand"}
              onToggle={() => toggle("brand")}
              onChange={(v) => pick<BrandFilter>(setBrand, v)}
            />
            <Dropdown
              label="Кубикажа"
              options={CC_OPTS}
              value={cc === "all" ? "all" : String(cc)}
              open={openKey === "cc"}
              onToggle={() => toggle("cc")}
              onChange={(v) => pick<CcFilter>(setCc, v === "all" ? "all" : Number(v))}
            />
            <Dropdown
              label="Година"
              options={YEAR_OPTS}
              value={year === "all" ? "all" : String(year)}
              open={openKey === "year"}
              onToggle={() => toggle("year")}
              onChange={(v) => pick<YearFilter>(setYear, v === "all" ? "all" : Number(v))}
            />
            <Dropdown
              label="Цена"
              options={PRICE_OPTS}
              value={price}
              open={openKey === "price"}
              onToggle={() => toggle("price")}
              onChange={(v) => pick(setPrice, v as PriceFilter)}
              className="col-span-2 lg:col-span-1"
            />
            <Dropdown
              label="Сортирај"
              options={SORT_OPTS}
              value={sort}
              open={openKey === "sort"}
              onToggle={() => toggle("sort")}
              onChange={(v) => pick(setSort, v as SortKey)}
              className="col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </aside>

      {/* ── Results ── */}
      <div className="mt-6 lg:mt-0">
        {/* Count */}
        <p className="font-body text-sm text-mute">
          Прикажани <span className="font-bold text-ink">{list.length}</span>{" "}
          {list.length === 1 ? "модел" : "модели"}
        </p>

        {/* Grid */}
        <motion.div layout className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((m) => (
              <motion.div
                key={m.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <MotoCard moto={m} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-body text-mute">Нема модели што одговараат на филтерот.</p>
            <button onClick={clear} className="btn-blue mt-5 !px-6">
              Исчисти филтери
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
