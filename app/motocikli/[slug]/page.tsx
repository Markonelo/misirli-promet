import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getMotorcycle,
  motorcycles,
  relatedMotorcycles,
  variantBadge,
} from "@/data/motorcycles";
import MotoDetailClient from "@/components/MotoDetailClient";
import MotoCard from "@/components/MotoCard";

// Next.js 16: route params arrive as a Promise and must be awaited.
type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return motorcycles.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const moto = getMotorcycle(slug);
  if (!moto) return { title: "Мотоциклот не е пронајден" };
  return {
    title: `${moto.name} (${variantBadge(moto)})`,
    description: moto.shortDesc,
  };
}

export default async function MotoDetailPage({ params }: Params) {
  const { slug } = await params;
  const moto = getMotorcycle(slug);
  if (!moto) notFound();

  const related = relatedMotorcycles(moto);

  return (
    <>
      <MotoDetailClient moto={moto} />

      {/* Related */}
      <section className="section-padding bg-bg">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl font-black tracking-tight text-ink sm:text-3xl">
              Слични модели
            </h2>
            <Link
              href="/motocikli"
              className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-blue transition-all hover:gap-3"
            >
              Сите <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((m) => (
              <MotoCard key={m.slug} moto={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
