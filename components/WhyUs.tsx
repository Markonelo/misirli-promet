import { ShieldCheck, Wrench, Tag, HeadphonesIcon } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Нови возила",
    text: "Само нови, оригинални мотоцикли, скутери и квадови со гаранција од производителот.",
  },
  {
    icon: Tag,
    title: "Директна продажба",
    text: "Купуваш директно од застапник — без посредници и со фер цени.",
  },
  {
    icon: Wrench,
    title: "Сервис & делови",
    text: "Овластен сервис и оригинални резервни делови за твојот мотоцикл.",
  },
  {
    icon: HeadphonesIcon,
    title: "Локална поддршка",
    text: "Тука сме во Битола — лична поддршка и совет пред и по купувањето.",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-blue text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(226,35,26,0.28),transparent_65%)]" />

      <div className="container-wide relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-red-light">
            Зошто Мисирли Промет
          </span>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl">
            Партнер во кого можеш да веруваш
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-white">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-extrabold">{it.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/70">{it.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
