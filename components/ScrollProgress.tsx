"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin red bar pinned to the very top of the viewport that fills as the page
 * is scrolled. Sits above the fixed header (z-50).
 *
 * `useScroll` tracks the window scroll that Lenis drives; the spring smooths
 * the fill so it glides with the eased page scroll instead of stepping.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-red-dark via-red to-red-light shadow-[0_0_10px_rgba(226,35,26,0.55)]"
    />
  );
}
