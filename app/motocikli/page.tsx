import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MotoListing from "@/components/MotoListing";

export const metadata: Metadata = {
  title: "Мотоцикли",
  description:
    "Целосна понуда на мотоцикли, скутери и квадови во Мисирли Промет, Битола — нејкед, ендуро, ретро скутери, адвенчер и квад модели.",
};

export default function MotocikliPage() {
  return (
    <>
      <PageHero
        full
        image="/Photos/store-outside.png"
        kicker="Понуда"
        title="Нашата понуда"
        subtitle="Избери модел, а потоа неговата верзија на мотор. Сите цени се ориентациони — јави се за актуелна понуда."
      />
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-[92rem] px-5 md:px-8">
          <Suspense fallback={<div className="py-16 text-center font-body text-mute">Се вчитува…</div>}>
            <MotoListing />
          </Suspense>
        </div>
      </section>
    </>
  );
}
