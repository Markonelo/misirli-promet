import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCar, cars } from "@/data/cars";
import CarDetailClient from "@/components/CarDetailClient";
import CarCard from "@/components/CarCard";

// Next.js 16: route params arrive as a Promise and must be awaited.
type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return { title: "Автомобилот не е пронајден" };
  return {
    title: `${car.name} (${car.bodyType})`,
    description: car.shortDesc,
  };
}

export default async function CarDetailPage({ params }: Params) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const related = cars.filter((c) => c.slug !== car.slug).slice(0, 3);

  return (
    <>
      <CarDetailClient car={car} />

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-bg">
          <div className="container-wide">
            <div className="flex items-end justify-between">
              <h2 className="font-heading text-2xl font-black tracking-tight text-ink sm:text-3xl">
                Слични модели
              </h2>
              <Link
                href="/avtomobili"
                className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-blue transition-all hover:gap-3"
              >
                Сите <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CarCard key={c.slug} car={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
