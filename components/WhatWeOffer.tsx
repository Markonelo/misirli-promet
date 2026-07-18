import Link from "next/link";
import { ArrowRight, Bike } from "lucide-react";
import Reveal from "./Reveal";

const POINTS = [
  { n: "01", t: "Директна продажба на нови мотоцикли" },
  { n: "02", t: "Секој модел во повеќе верзии на мотор" },
  { n: "03", t: "Гаранција, сервис и резервни делови во Битола" },
];

export default function WhatWeOffer() {
  return (
    <section className="section-padding bg-bg">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — heading, clean copy, numbered list, CTA */}
        <Reveal>
          <h2 className="font-heading text-4xl font-black tracking-tight text-white sm:text-5xl">
            Што нудиме
          </h2>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-mute sm:text-base">
            Транспарентна продажба и стручна поддршка — од избор на модел,
            преку верзии на мотор, до сервис и резервни делови.
          </p>

          {/* Numbered list with thin dividers */}
          <div className="mt-9 border-t border-line">
            {POINTS.map((p) => (
              <div key={p.n} className="flex items-center gap-6 border-b border-line py-5">
                <span className="font-body text-sm tabular-nums text-mute">{p.n}</span>
                <p className="font-body text-sm leading-snug text-ink-soft sm:text-base">{p.t}</p>
              </div>
            ))}
          </div>

          <Link href="/motocikli" className="btn-primary mt-9 !px-6">
            Погледни модели <ArrowRight size={18} />
          </Link>
        </Reveal>

        {/* Right — one bigger card + one smaller card (top-aligned) */}
        <Reveal delay={0.1} className="grid grid-cols-1 gap-5 sm:grid-cols-12 sm:items-start">
          {/* Bigger card */}
          <div className="relative col-span-1 min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-line bg-cloud-2 sm:col-span-7">
            <div className="dot-grid absolute inset-0" />
            {/* Infinite slow conveyor of the showroom shot (two copies). */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="flex h-full w-max [transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform]" style={{ animation: "marquee 34s linear infinite" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/offer-1.png" alt="Нови мотоцикли — салон" className="h-full w-auto select-none object-cover" draggable={false} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/offer-1.png" alt="" aria-hidden className="h-full w-auto select-none object-cover" draggable={false} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/30" />
            <div className="relative p-7">
              <h3 className="font-heading text-3xl font-black text-white">Нови мотоцикли</h3>
              <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-white/85">
                Истражи ги спорт, нејкед, скутер и адвенчер моделите во нашиот салон.
              </p>
            </div>
          </div>

          {/* Smaller accent card */}
          <Link
            href="/motocikli"
            className="group relative col-span-1 flex min-h-[17rem] flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-blue to-blue-deep p-7 sm:col-span-5"
          >
            <div className="relative z-10">
              <div className="font-heading text-5xl font-black leading-none text-white">+8</div>
              <div className="mt-2 max-w-[10rem] font-body text-sm leading-snug text-white/90">
                Модели достапни во различни верзии на мотор
              </div>
            </div>
            {/* Bike icon, bottom-right */}
            <div className="mt-auto self-end text-white/90 transition-colors group-hover:text-white">
              <Bike size={76} strokeWidth={1.5} />
            </div>
            <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-white">
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
