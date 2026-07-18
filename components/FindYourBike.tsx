import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import FallbackImage from "./FallbackImage";

export default function FindYourBike() {
  return (
    <section className="bg-bg px-3 pb-2 pt-10 sm:px-4 sm:pt-14">
      <div className="container-wide !px-0">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-deep via-[#0B3A78] to-blue-mid">
          <div className="pointer-events-none absolute -right-20 -top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(90,160,240,0.35),transparent_65%)] blur-2xl" />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />

          <div className="relative grid items-center gap-6 p-8 sm:p-10 md:grid-cols-2 md:p-12">
            {/* Copy */}
            <div>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                Најди го мотоциклот што ти одговара најмногу
              </h2>
              <p className="mt-3 max-w-md font-body text-white/80">
                Разгледај ја понудата или јави се — ќе ти помогнеме да ја избереш
                вистинската верзија за тебе.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/motocikli" className="glow-btn !px-6">
                  Погледни мотоцикли <ArrowRight size={18} />
                </Link>
                <Link href="/kontakt" className="btn-ghost !border-white/30 !text-white !px-6">
                  Контакт
                </Link>
              </div>
            </div>

            {/* Bike */}
            <div className="relative flex h-56 items-center justify-center sm:h-64 md:h-72">
              <FallbackImage
                src="/cta-bike.png"
                alt="Мотоцикл"
                className="relative z-10 max-h-full w-auto max-w-full scale-[1.232] object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
