import type { Metadata } from "next";
import Link from "next/link";
import { Bike, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { IconFacebook, IconInstagram } from "@/components/icons";
import FallbackImage from "@/components/FallbackImage";
import Testimonials from "@/components/Testimonials";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "За Нас",
  description:
    "Мисирли Промет е продавница за мотоцикли, скутери и квадови во Битола — со долгогодишно искуство и посветеност кон возачите.",
};

// TODO(client): replace with real figures.
const stats = [
  { value: "15+", label: "Години искуство" },
  { value: "2.500+", label: "Задоволни возачи" },
  { value: "20+", label: "Модели на залиха" },
  { value: "5+", label: "Брендови во понуда" },
];

export default function ZaNasPage() {
  return (
    <>
      {/* ── About hero: breadcrumb, big title, wide image frame, stats ── */}
      <section className="bg-bg pt-[104px] md:pt-[128px]">
        <div className="container-wide">
          {/* Breadcrumb */}
          <Reveal className="text-center">
            <nav className="font-body text-sm text-mute">
              <Link href="/" className="transition-colors hover:text-ink">Дома</Link>
              <span className="mx-1.5 text-line">/</span>
              <span className="text-ink-soft">За Нас</span>
            </nav>
            <h1 className="mx-auto mt-4 max-w-4xl font-heading text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Нашата приказна е зад секое возење
            </h1>
          </Reveal>

          {/* Big horizontal frame */}
          <Reveal delay={0.1}>
            <div className="relative mt-10 aspect-[16/7] w-full overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-[#11233F] to-[#0E1219]">
              {/* TODO(client): wide team / showroom photo at /public/about.jpg */}
              <div className="dot-grid absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20">
                <Bike size={54} strokeWidth={1.2} />
                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.22em]">
                  Слика од салон · /public/about.jpg
                </span>
              </div>
              <FallbackImage
                src="/about.jpg"
                alt="Мисирли Промет"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-2 gap-y-9 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="nums text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 font-body text-sm text-mute">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="container-wide grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="kicker">Нашата мисија</span>
            <h2 className="mt-4 font-heading text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl">
              Страст кон две тркала
            </h2>
            <div className="mt-5 space-y-4 font-body leading-relaxed text-mute">
              <p>
                Мисирли Промет е семеен бизнис од Битола, посветен на квалитетни мотоцикли
                и искрена услуга. Нудиме широка понуда на мотоцикли, скутери и квадови од
                реномирани брендови, директно до нашите клиенти.
              </p>
              <p>
                Секој модел е достапен во повеќе верзии на мотор, за да можеш да го избереш
                токму она што ти треба — без разлика дали си нов возач или искусен ентузијаст.
                Нашата цел е едноставна — да те качиме на вистинскиот мотоцикл.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-[#11233F] to-[#0E1219]">
              {/* TODO(client): add a shop / team photo at /public/about-2.jpg */}
              <div className="dot-grid absolute inset-0 flex items-center justify-center font-heading text-sm font-bold uppercase tracking-widest text-white/25">
                Слика од салонот
              </div>
              <FallbackImage
                src="/about-2.jpg"
                alt="Мисирли Промет"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      {/* ── Contact / get-in-touch strip ── */}
      <section className="section-padding bg-bg pb-20 sm:pb-28">
        <div className="container-wide">
          <Reveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue to-blue-deep">
            <div className="relative">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />

              {/* Top bar — heading + CTAs + socials */}
              <div className="relative flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
                <div className="max-w-xl">
                  <h3 className="font-heading text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                    Имаш прашање? Тука сме за тебе.
                  </h3>
                  <p className="mt-3 font-body text-white/80">
                    Јави се, пиши ни или посети нè во салонот во {SITE.city}.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <Link href="/kontakt" className="btn-primary !bg-white !text-[#0E1B2E] !px-6">
                    Контактирај нè <ArrowRight size={18} />
                  </Link>
                  <div className="flex items-center gap-3">
                    <a
                      href={SITE.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-blue-deep"
                    >
                      <IconFacebook size={20} />
                    </a>
                    <a
                      href={SITE.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-blue-deep"
                    >
                      <IconInstagram size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Horizontal info row */}
              <div className="relative grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-white/15 [&>*:not(:first-child)]:border-t sm:[&>*:not(:first-child)]:border-t-0 sm:[&>*:nth-child(even)]:border-l lg:[&>*:not(:first-child)]:border-l">
                <a href={SITE.phoneHref} className="flex items-center gap-3.5 px-8 py-6 transition-colors hover:bg-white/5">
                  <Phone size={22} className="shrink-0 text-white" />
                  <span className="min-w-0">
                    <span className="block font-body text-[11px] uppercase tracking-wide text-white/60">Телефон</span>
                    <span className="nums block truncate font-body text-sm font-semibold text-white">{SITE.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3.5 px-8 py-6 transition-colors hover:bg-white/5">
                  <Mail size={22} className="shrink-0 text-white" />
                  <span className="min-w-0">
                    <span className="block font-body text-[11px] uppercase tracking-wide text-white/60">Е-пошта</span>
                    <span className="block truncate font-body text-sm font-semibold text-white">{SITE.email}</span>
                  </span>
                </a>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-8 py-6 transition-colors hover:bg-white/5">
                  <MapPin size={22} className="shrink-0 text-white" />
                  <span className="min-w-0">
                    <span className="block font-body text-[11px] uppercase tracking-wide text-white/60">Локација</span>
                    <span className="block truncate font-body text-sm font-semibold text-white">{SITE.address}</span>
                  </span>
                </a>
                <div className="flex items-center gap-3.5 px-8 py-6">
                  <Clock size={22} className="shrink-0 text-white" />
                  <span className="min-w-0">
                    <span className="block font-body text-[11px] uppercase tracking-wide text-white/60">Работно време</span>
                    <span className="block truncate font-body text-sm font-semibold text-white">{SITE.hours}</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
