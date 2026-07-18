"use client";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useFavorites } from "./FavoritesContext";

/**
 * Header favourites control — a pill icon button that links to /omileni.
 * The bookmark fills red once you've saved a bike, and a count badge springs
 * in to show how many. Honors prefers-reduced-motion.
 */
export default function FavoritesNavButton({
  className = "",
}: {
  className?: string;
}) {
  const { count } = useFavorites();
  const reduce = useReducedMotion();
  const active = count > 0;

  return (
    <Link
      href="/omileni"
      aria-label="Омилени мотоцикли"
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
        active
          ? "border-red bg-red-muted text-red"
          : "border-white/10 bg-white/5 text-white hover:border-red hover:text-red"
      } ${className}`}
    >
      <motion.span
        className="flex items-center justify-center"
        whileHover={reduce ? undefined : { scale: [1, 1.22, 0.94, 1.12, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Bookmark size={18} className={active ? "fill-current" : ""} />
      </motion.span>

      <AnimatePresence>
        {active && (
          <motion.span
            initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            transition={
              reduce
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 520, damping: 24 }
            }
            className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1 font-heading text-[11px] font-bold leading-none text-white ring-2 ring-[#0E121B]"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
