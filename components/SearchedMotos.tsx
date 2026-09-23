"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motorcycles, CATEGORY_LABELS, type MotoCategory } from "@/data/motorcycles";
import MotoCard from "./MotoCard";

type Tab = "all" | MotoCategory;

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Сите" },
  { id: "naked", label: CATEGORY_LABELS.naked },
  { id: "scooter", label: CATEGORY_LABELS.scooter },
  { id: "enduro", label: CATEGORY_LABELS.enduro },
  { id: "adventure", label: CATEGORY_LABELS.adventure },
  { id: "atv", label: CATEGORY_LABELS.atv },
];

export default function SearchedMotos() {
  const [tab, setTab] = useState<Tab>("all");
  const rowRef = useRef<HTMLDivElement>(null);

  const list = motorcycles.filter((m) => tab === "all" || m.category === tab);

  const scroll = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    // Step by whole cards so a click never leaves a card half-visible.
    // Card step = card width + gap (gap-5 = 20px). Fall back to 85% width.
    const first = el.firstElementChild as HTMLElement | null;
    const gap = 20;
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.85;
    const visible = Math.max(1, Math.floor(el.clientWidth / step));
    el.scrollBy({ left: dir * visible * step, behavior: "smooth" });
  };

  // ── Click-and-drag to scroll with inertia (desktop/mouse). Touch keeps its
  // own native momentum scrolling. We track pointer velocity while dragging and,
  // on release, glide the row with decaying velocity for a smooth finish. ──
  const drag = useRef({
    down: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
    lastX: 0,
    lastT: 0,
    v: 0,
    raf: 0,
  });

  const stopMomentum = () => cancelAnimationFrame(drag.current.raf);

  const onDown = (e: React.MouseEvent) => {
    const el = rowRef.current;
    if (!el) return;
    stopMomentum();
    const d = drag.current;
    d.down = true;
    d.startX = e.pageX;
    d.scrollLeft = el.scrollLeft;
    d.moved = false;
    d.lastX = e.pageX;
    d.lastT = performance.now();
    d.v = 0;
  };

  const onMove = (e: React.MouseEvent) => {
    const el = rowRef.current;
    const d = drag.current;
    if (!el || !d.down) return;
    e.preventDefault();
    const dx = e.pageX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.scrollLeft - dx;
    // px-per-frame velocity (normalized to ~16ms frames), smoothed a touch.
    // Clamp dt (min 8ms) and the velocity so a fast flick can't run away.
    const now = performance.now();
    const dt = Math.max(now - d.lastT, 8);
    const inst = ((e.pageX - d.lastX) / dt) * 16;
    d.v = Math.max(-45, Math.min(45, d.v * 0.4 + inst * 0.6));
    d.lastX = e.pageX;
    d.lastT = now;
  };

  const onUp = () => {
    const el = rowRef.current;
    const d = drag.current;
    if (!el || !d.down) return;
    d.down = false;
    let v = d.v;
    const glide = () => {
      if (Math.abs(v) < 0.5) return;
      el.scrollLeft -= v;
      v *= 0.92; // friction → smooth decay
      d.raf = requestAnimationFrame(glide);
    };
    d.raf = requestAnimationFrame(glide);
  };

  // If the pointer moved, swallow the click so cards don't navigate after a drag.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  useEffect(() => stopMomentum, []);

  return (
    <section className="section-padding bg-cloud">
      <div className="container-wide">
        {/* Heading + view all */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="kicker">Понуда</span>
            <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-white sm:text-4xl">
              Најбарани мотоцикли
            </h2>
          </div>
          <Link href="/motocikli" className="btn-blue !px-5 !py-2.5 text-sm">
            Сите модели <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 font-heading text-sm font-bold transition-all ${
                tab === t.id
                  ? "border-transparent bg-white text-[#0E1B2E]"
                  : "border-line bg-surface text-ink-soft hover:border-blue/50 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Card row */}
        <div
          ref={rowRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className="no-scrollbar mt-5 flex cursor-grab touch-pan-x select-none gap-5 overflow-x-auto py-2 active:cursor-grabbing"
        >
          {list.map((m) => (
            <div
              key={m.slug}
              className="w-[300px] shrink-0 sm:w-[336px]"
            >
              <MotoCard moto={m} />
            </div>
          ))}
          {list.length === 0 && (
            <p className="py-12 font-body text-mute">Нема модели во оваа категорија.</p>
          )}
        </div>

        {/* Arrows */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Претходно"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-white transition-colors hover:border-blue hover:bg-blue"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Следно"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-red text-white transition-transform hover:scale-105"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
