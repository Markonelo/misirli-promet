import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motorcycles } from "@/data/motorcycles";
import MotoCard from "./MotoCard";
import Reveal from "./Reveal";

export default function FeaturedMotos() {
  const featured = motorcycles.filter((m) => m.featured).slice(0, 4);

  return (
    <section className="section-padding bg-cloud">
      <div className="container-wide">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="kicker">Издвоени модели</span>
            <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Популарни модели
            </h2>
            <p className="mt-3 font-body text-mute">
              Секој модел е достапен во повеќе верзии на мотор — кликни за да ја избереш твојата.
            </p>
          </div>
          <Link
            href="/motocikli"
            className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-blue transition-all hover:gap-3"
          >
            Сите мотоцикли <ArrowRight size={18} />
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.07}>
              <MotoCard moto={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
