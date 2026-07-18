import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

const HOURS = [
  { day: "Понеделник – Петок", time: "08:30 – 16:30" },
  { day: "Сабота", time: "09:00 – 14:00" },
  { day: "Недела", time: "Затворено", closed: true },
];

export default function ContactStrip() {
  return (
    <section className="section-padding bg-bg">
      <div className="container-wide grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left — heading, copy, button, open hours */}
        <Reveal className="flex flex-col">
          <h2 className="font-heading text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
            Започни го твоето<br />патување со нас денес
          </h2>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-mute sm:text-base">
            Посети нè во салонот за да ја разгледаш нашата понуда на мотоцикли и да
            добиеш стручен совет. Сакаш онлајн? Разгледај ги моделите, закажи пробно
            возење или прашај за достапност од дома.
          </p>

          <Link href="/kontakt" className="btn-primary mt-8 self-start !px-6">
            Контактирај нè <ArrowRight size={18} />
          </Link>

          {/* Open hours card */}
          <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2.5">
              <Clock size={18} className="text-blue-light" />
              <h3 className="font-heading text-base font-bold text-white">Работно време</h3>
            </div>
            <div className="mt-4 flex flex-col border-t border-line">
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between border-b border-line py-3 last:border-b-0"
                >
                  <span className="font-body text-sm text-mute">{h.day}</span>
                  <span
                    className={`nums text-sm font-semibold ${
                      h.closed ? "text-mute/70" : "text-white"
                    }`}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact pills */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-blue/50"
            >
              <Mail size={20} className="shrink-0 text-red" />
              <span className="min-w-0">
                <span className="block font-body text-[11px] uppercase tracking-wide text-mute">Е-пошта</span>
                <span className="block truncate font-body text-sm font-medium text-ink-soft">{SITE.email}</span>
              </span>
            </a>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-blue/50"
            >
              <Phone size={20} className="shrink-0 text-red" />
              <span className="min-w-0">
                <span className="block font-body text-[11px] uppercase tracking-wide text-mute">Телефон</span>
                <span className="nums block truncate text-sm font-medium text-ink-soft">{SITE.phone}</span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* Right — live Google Map */}
        <Reveal delay={0.1} className="flex">
          <div className="relative h-[24rem] w-full overflow-hidden rounded-[1.75rem] border border-line bg-surface lg:h-full">
            <iframe
              src={SITE.mapsEmbed}
              title="Локација — Мисирли Промет, Битола"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, filter: "grayscale(0.25) contrast(1.05) brightness(0.95)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Address overlay → opens full map */}
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0E121B]/92 px-4 py-3 backdrop-blur-md transition-colors hover:border-blue/60"
            >
              <span className="flex min-w-0 items-center gap-3">
                <MapPin size={20} className="shrink-0 text-red" />
                <span className="min-w-0">
                  <span className="block font-body text-[11px] uppercase tracking-wide text-mute">Локација</span>
                  <span className="block truncate font-body text-sm font-medium text-white">{SITE.address}</span>
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 font-heading text-xs font-bold text-blue-light">
                Отвори
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
