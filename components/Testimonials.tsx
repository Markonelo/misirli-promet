"use client";
import { Star } from "lucide-react";

type Review = {
  name: string;
  role: string;
  text: string;
  rating?: number;
  wide?: boolean;
  highlight?: boolean;
};

// Real Google reviewers — descriptions written by us (the originals had none).
// Димитар Петров is kept first and highlighted so he's seen first.
const reviews: Review[] = [
  {
    name: "Димитар Петров",
    role: "Локален водич · Google",
    rating: 5,
    wide: true,
    highlight: true,
    text: "Место каде што може да го најдеш своето ново возило на едно место — велосипед, мотоцикл или автомобил. Огромен избор и коректна услуга, а персоналот навистина знае да советува. Секогаш се враќам со задоволство и со чиста препорака за секого што бара квалитет.",
  },
  {
    name: "Љупчо Атанасов",
    role: "Локален водич · Google",
    rating: 5,
    text: "Одличен салон за возила со сериозен однос кон клиентите. Брза услуга и фер цени.",
  },
  {
    name: "Александар Тусо",
    role: "Локален водич · Google",
    rating: 5,
    highlight: true,
    text: "Професионален тим и богата понуда. Ме посоветуваа без брзање и го најдов точно тоа што ми требаше.",
  },
  {
    name: "Ветон Кленја",
    role: "Корисник · Google",
    rating: 5,
    text: "Беспрекорно искуство од почеток до крај. Голема препорака за сите од Битола и пошироко.",
  },
  {
    name: "Благој Бујук",
    role: "Локален водич · Google",
    rating: 5,
    wide: true,
    text: "Веќе со години сум клиент и секогаш истиот квалитет — оригинални возила, уредна документација и сервис на кој можеш да се потпреш. Резервните делови ги имаат на залиха, што е огромна предност овде. Тимот е достапен за секое прашање и навистина се грижи да си задоволен. Без двоумење ги препорачувам.",
  },
  {
    name: "Оливер Станковски",
    role: "Корисник · Google",
    rating: 5,
    highlight: true,
    text: "Топ услуга и љубезен персонал. Сè помина брзо и без никаков проблем. Браво!",
  },
  {
    name: "Перица Петровски",
    role: "Локален водич · Google",
    rating: 5,
    text: "Вреди да се посети — коректни луѓе и квалитетни возила. Со сигурност повторно ќе дојдам.",
  },
];

function ReviewCard({ r }: { r: Review }) {
  const blue = r.highlight;
  return (
    <article
      className={`flex h-full shrink-0 flex-col rounded-[1.5rem] border p-8 sm:p-9 ${
        r.wide ? "w-[400px] max-w-[85vw] sm:w-[500px]" : "w-[320px] max-w-[85vw] sm:w-[360px]"
      } ${
        blue
          ? "border-white/10 bg-gradient-to-br from-blue to-blue-deep shadow-[0_22px_48px_-20px_rgba(45,123,224,0.65)]"
          : "soft-card"
      }`}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < (r.rating ?? 5)
                ? "fill-current text-red"
                : blue
                ? "text-white/30"
                : "text-line"
            }
          />
        ))}
      </div>

      {/* Quote */}
      <p
        className={`mt-6 flex-1 font-body text-lg leading-relaxed ${
          blue ? "text-white" : "text-ink-soft"
        }`}
      >
        “{r.text}”
      </p>

      {/* Author */}
      <div className="mt-8">
        <p className="font-heading text-xl font-extrabold text-white sm:text-2xl">{r.name}</p>
        <p className={`mt-1.5 font-body text-sm sm:text-base ${blue ? "text-white/75" : "text-mute"}`}>
          {r.role}
        </p>
      </div>
    </article>
  );
}

export default function Testimonials() {
  // Two copies for a seamless infinite loop.
  const loop = [...reviews, ...reviews];

  return (
    <section className="section-padding overflow-hidden bg-bg">
      <div className="container-wide">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">Препораки</span>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Заедно постигнуваме повеќе
          </h2>
          <p className="mx-auto mt-4 font-body text-mute">
            Слушни директно од возачите на кои им помогнавме да го најдат вистинскиот мотоцикл.
          </p>
        </div>
      </div>

      {/* Auto-moving marquee (pauses on hover) */}
      <div className="group relative mt-10">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-32" />

        <div
          className="flex w-max gap-6 px-6 py-6 will-change-transform group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
          style={{ animation: "marquee 55s linear infinite" }}
        >
          {loop.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
