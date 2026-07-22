"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import FavoritesNavButton from "./FavoritesNavButton";

const links = [
  { href: "/", label: "Почетна" },
  { href: "/motocikli", label: "Мотоцикли" },
  { href: "/avtomobili", label: "Автомобили" },
  { href: "/za-nas", label: "За Нас" },
  { href: "/kontakt", label: "Контакт" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex items-center justify-between rounded-full px-4 transition-all duration-300 md:px-6 ${
          scrolled
            ? "h-14 max-w-6xl border border-white/10 bg-[#0E121B]/85 shadow-[0_12px_34px_rgba(0,0,0,0.55)] backdrop-blur-xl md:h-[68px]"
            : "h-[60px] max-w-[78rem] border border-transparent bg-transparent md:h-[76px]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          {/* TODO(client): swap for the real Misirli Promet logo in /public */}
          <span className="flex h-9 items-center rounded-xl bg-gradient-to-br from-blue-mid to-blue-deep px-2.5 font-heading text-lg font-black tracking-tight text-white shadow-[0_6px_16px_rgba(0,60,126,0.4)] md:h-10 md:px-3 md:text-xl">
            М<span className="text-red">П</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-base font-extrabold tracking-tight text-white md:text-xl">
              Мисирли <span className="text-red">Промет</span>
            </span>
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.16em] text-mute md:text-[11px]">
              Мотоцикли Битола
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 font-heading text-sm font-bold transition-all ${
                isActive(l.href)
                  ? "bg-white/10 text-white"
                  : "text-ink-soft hover:bg-white/5 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <FavoritesNavButton />
          <a href={SITE.phoneHref} className="glow-btn glow-btn-red hidden !px-5 !py-2.5 text-sm md:inline-flex">
            <Phone size={16} /> Јави се
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:h-11 md:w-11 lg:hidden"
            aria-label="Мени"
            aria-expanded={open}
          >
            {/* Animated hamburger → X */}
            <span className="relative block h-[14px] w-[22px]">
              <span
                className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-all duration-200 ${
                  open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-[#0A0D14]/98 backdrop-blur-xl sm:top-[92px] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {[...links, { href: "/omileni", label: "Омилени" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                >
                  <Link
                    href={l.href}
                    className={`block border-b border-white/8 px-2 py-4 font-heading text-xl font-extrabold transition-colors ${
                      isActive(l.href) ? "text-red" : "text-white hover:text-blue-light"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={SITE.phoneHref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.35, ease: "easeOut" }}
                className="btn-primary mt-5 w-full"
              >
                <Phone size={18} /> {SITE.phone}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
