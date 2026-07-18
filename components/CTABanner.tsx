import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

export default function CTABanner() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-red to-red-dark px-6 py-12 text-center text-white shadow-[0_30px_60px_rgba(226,35,26,0.28)] sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-black/10" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-heading text-3xl font-black tracking-tight sm:text-4xl">
                Подготвен за твојот нов мотоцикл?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-white/85">
                Јави се или посети нѐ во Битола — ќе ти помогнеме да го избереш вистинскиот
                мотоцикл за тебе.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={SITE.phoneHref} className="btn-ghost w-full !bg-white sm:w-auto">
                  <Phone size={18} /> {SITE.phone}
                </a>
                <Link
                  href="/motocikli"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/70 px-7 py-[0.8rem] font-heading font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
                >
                  Погледни мотоцикли <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
