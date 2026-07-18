import Link from "next/link";
import { Bike, Wind, Mountain, Compass, Truck } from "lucide-react";
import { CATEGORY_LABELS, motorcycles, type MotoCategory } from "@/data/motorcycles";
import Reveal from "./Reveal";

const ICONS: Record<MotoCategory, typeof Bike> = {
  naked: Bike,
  scooter: Wind,
  enduro: Mountain,
  adventure: Compass,
  atv: Truck,
};

const ORDER: MotoCategory[] = ["naked", "scooter", "enduro", "adventure", "atv"];

export default function BrowseByType() {
  const counts = ORDER.map((cat) => ({
    cat,
    count: motorcycles.filter((m) => m.category === cat).length,
  }));

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker">Категории</span>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Најди го твојот стил
          </h2>
          <p className="mt-3 font-body text-mute">
            Од спортски машини до практични скутери — избери според начинот на возење.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {counts.map(({ cat, count }, i) => {
            const Icon = ICONS[cat];
            return (
              <Reveal key={cat} delay={i * 0.06}>
                <Link
                  href={`/motocikli?kategorija=${cat}`}
                  className="soft-card group flex h-full flex-col items-center gap-3 p-6 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-muted text-blue transition-all group-hover:bg-blue group-hover:text-white">
                    <Icon size={26} />
                  </span>
                  <span className="font-heading text-base font-extrabold text-ink">
                    {CATEGORY_LABELS[cat]}
                  </span>
                  <span className="font-body text-xs text-mute">{count} модели</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
