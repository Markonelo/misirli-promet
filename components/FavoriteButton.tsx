"use client";
import { Bookmark } from "lucide-react";
import { useFavorites } from "./FavoritesContext";

export default function FavoriteButton({
  slug,
  name,
  className = "",
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const { has, toggle } = useFavorites();
  const fav = has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        // The button lives inside the card's <Link> — don't navigate.
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={fav}
      aria-label={
        fav ? `Отстрани ${name} од омилени` : `Зачувај ${name} во омилени`
      }
      className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors ${
        fav
          ? "border-red bg-red text-white"
          : "border-white/40 bg-black/35 text-white hover:border-red hover:bg-red"
      } ${className}`}
    >
      <Bookmark size={16} className={`translate-y-[0.5px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] ${fav ? "fill-current" : ""}`} />
    </button>
  );
}
