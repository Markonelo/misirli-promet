import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import KontaktForm from "@/components/KontaktForm";
import SalonFrame from "@/components/SalonFrame";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Контактирај го Мисирли Промет во Битола — телефон, е-пошта и локација. Продажба на мотоцикли, скутери и квадови.",
};

const info = [
  { icon: Mail, label: "Е-пошта", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Телефон", value: SITE.phone, href: SITE.phoneHref },
  { icon: MapPin, label: "Локација", value: SITE.address },
  { icon: Clock, label: "Работно време", value: SITE.hours },
];

export default function KontaktPage() {
  return (
    <>
      <section className="bg-bg pt-[120px] md:pt-[140px]">
        <div className="container-wide">
          {/* Heading */}
          <Reveal className="max-w-2xl">
            <span className="kicker">Контакт</span>
            <h1 className="mt-4 font-heading text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
              Контактирај нѐ
            </h1>
            <p className="mt-5 font-body leading-relaxed text-mute">
              Имаш прашање или ти треба совет? Пополни ја формата подолу — ти
              одговараме во најкус можен рок.
            </p>
          </Reveal>

          {/* Blue horizontal form panel */}
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-[2rem] bg-blue-deep p-7 shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:p-10 lg:p-12">
              <KontaktForm />
            </div>
          </Reveal>

          {/* Contact info strip */}
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col divide-y divide-line overflow-hidden rounded-[1.75rem] border border-line bg-surface sm:flex-row sm:divide-x sm:divide-y-0">
              {info.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <div className="flex h-full flex-col items-center justify-center gap-2.5 px-6 py-7 text-center">
                    <Icon size={24} className="shrink-0 text-red" />
                    <div className="font-body text-[11px] uppercase tracking-wide text-mute">{c.label}</div>
                    <div className="font-body text-sm font-extrabold leading-snug text-white">{c.value}</div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="flex-1 transition-colors hover:bg-surface-2">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="flex-1">{inner}</div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-width map */}
      <section className="section-padding bg-bg">
        <div className="container-wide">
          <Reveal>
            <div className="relative aspect-[21/9] min-h-[20rem] w-full overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-[#11233F] to-[#0E1219]">
              <iframe
                src={SITE.mapsEmbed}
                title={`Мапа · ${SITE.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [color-scheme:light] [filter:invert(0.92)_hue-rotate(180deg)_brightness(0.92)_contrast(0.9)_saturate(0.85)]"
              />
              {/* Subtle brand tint over the map so it reads on-theme */}
              <div className="pointer-events-none absolute inset-0 bg-blue-deep/15 mix-blend-overlay" />

              {/* Salon photo frame (click to enlarge) */}
              <SalonFrame />

              {/* Address overlay card */}
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#10151f]/90 p-5 backdrop-blur-md transition-colors hover:border-red/50 sm:right-auto sm:max-w-sm"
              >
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-red" />
                  <div>
                    <div className="font-heading text-base font-bold text-white">{SITE.name}</div>
                    <div className="mt-0.5 font-body text-sm text-mute">{SITE.address}</div>
                  </div>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
