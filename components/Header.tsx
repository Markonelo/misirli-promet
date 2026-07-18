"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
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
            ? "h-14 max-w-6xl border border-white/10 bg-[#0E121B]/85 shadow-[0_12px_34px_rgba(0,0,0,0.55)] backdrop-blur-xl md:h-16"
            : "h-[60px] max-w-[78rem] border border-transparent bg-transparent md:h-[68px]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          {/* TODO(client): swap for the real Misirli Promet logo in /public */}
          <span className="flex h-9 items-center rounded-xl bg-gradient-to-br from-blue-mid to-blue-deep px-2.5 font-heading text-lg font-black tracking-tight text-white shadow-[0_6px_16px_rgba(0,60,126,0.4)]">
            М<span className="text-red">П</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-base font-extrabold tracking-tight text-white md:text-lg">
              Мисирли <span className="text-red">Промет</span>
            </span>
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.16em] text-mute">
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Мени"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-[76px] bottom-0 z-40 bg-[#0A0D14]/98 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-white/8 px-2 py-4 font-heading text-xl font-extrabold transition-colors ${
                  isActive(l.href) ? "text-red" : "text-white hover:text-blue-light"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/omileni"
              className={`border-b border-white/8 px-2 py-4 font-heading text-xl font-extrabold transition-colors ${
                isActive("/omileni") ? "text-red" : "text-white hover:text-blue-light"
              }`}
            >
              Омилени
            </Link>
            <a href={SITE.phoneHref} className="btn-primary mt-5 w-full">
              <Phone size={18} /> {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
