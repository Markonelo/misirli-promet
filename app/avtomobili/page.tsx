import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

export const metadata: Metadata = {
  title: "Автомобили",
  description:
    "Автомобили во понудата на Мисирли Промет, Битола — Suzuki Swift, Vitara, e-Vitara и S-Cross. Хибридни и електрични модели со гаранција.",
};

export default function AvtomobiliPage() {
  return (
    <>
      <PageHero
        kicker="Мисирли Промет"
        title="Автомобили"
        subtitle="Освен мотоцикли, во понудата имаме и автомобили — актуелни Suzuki модели, хибридни и електрични, со гаранција и сервис во Битола."
      />

      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-[92rem] px-5 md:px-8">
          <p className="font-body text-sm text-mute">
            Прикажани <span className="font-bold text-ink">{cars.length}</span>{" "}
            {cars.length === 1 ? "модел" : "модели"}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
