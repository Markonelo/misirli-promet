"use client";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { motorcycles } from "@/data/motorcycles";
import { useFavorites } from "./FavoritesContext";
import MotoCard from "./MotoCard";

export default function FavoritesClient() {
  const { ids, ready } = useFavorites();
  const favMotos = motorcycles.filter((m) => ids.includes(m.slug));

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
        ) : favMotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface">
              <Bookmark size={26} className="text-red" />
            </span>
            <h2 className="mb-2 font-heading text-2xl font-black text-white">
              Сè уште немаш зачувано мотоцикли
            </h2>
            <p className="mb-7 max-w-md font-body text-sm text-mute">
              Кликни на иконата за обележување на било кој мотоцикл за да го
              зачуваш тука и полесно да го споредиш подоцна.
            </p>
            <Link href="/motocikli" className="glow-btn !px-6">
              Разгледај мотоцикли <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-7 flex items-baseline gap-2">
              <span className="nums text-3xl font-bold leading-none text-red">
                {favMotos.length}
              </span>
              <span className="font-body text-sm uppercase tracking-wide text-mute">
                {favMotos.length === 1 ? "зачуван мотоцикл" : "зачувани мотоцикли"}
              </span>
            </p>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {favMotos.map((moto) => (
                <MotoCard key={moto.slug} moto={moto} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
