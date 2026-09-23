"use client";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { motorcycles } from "@/data/motorcycles";
import { cars } from "@/data/cars";
import { useFavorites } from "./FavoritesContext";
import MotoCard from "./MotoCard";
import CarCard from "./CarCard";

export default function FavoritesClient() {
  const { ids, ready } = useFavorites();

  // Motorcycles are saved by bare slug; cars are saved as `car-<slug>`.
  const favMotos = motorcycles.filter((m) => ids.includes(m.slug));
  const favCars = cars.filter((c) => ids.includes(`car-${c.slug}`));
  const total = favMotos.length + favCars.length;

  const label =
    total === 1 ? "зачувано возило" : "зачувани возила";

  return (
    <section className="section-padding bg-bg">
      <div className="mx-auto max-w-[92rem] px-5 md:px-8">
        {!ready ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-2xl bg-surface"
              />
            ))}
          </div>
        ) : total === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface">
              <Bookmark size={26} className="text-red" />
            </span>
            <h2 className="mb-2 font-heading text-2xl font-black text-white">
              Сè уште немаш зачувано возила
            </h2>
            <p className="mb-7 max-w-md font-body text-sm text-mute">
              Кликни на иконата за обележување на било кој мотоцикл или
              автомобил за да го зачуваш тука и полесно да го споредиш подоцна.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/motocikli" className="glow-btn !px-6">
                Разгледај мотоцикли <ArrowRight size={18} />
              </Link>
              <Link href="/avtomobili" className="btn-blue !px-6">
                Разгледај автомобили <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-9 flex items-baseline gap-2">
              <span className="nums text-3xl font-bold leading-none text-red">
                {total}
              </span>
              <span className="font-body text-sm uppercase tracking-wide text-mute">
                {label}
              </span>
            </p>

            {favCars.length > 0 && (
              <div className="mb-14">
                <h2 className="mb-5 font-heading text-xl font-black text-white">
                  Автомобили
                </h2>
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {favCars.map((car) => (
                    <CarCard key={car.slug} car={car} />
                  ))}
                </div>
              </div>
            )}

            {favMotos.length > 0 && (
              <div>
                <h2 className="mb-5 font-heading text-xl font-black text-white">
                  Мотоцикли
                </h2>
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {favMotos.map((moto) => (
                    <MotoCard key={moto.slug} moto={moto} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
