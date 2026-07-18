import Link from "next/link";
import { SITE } from "@/lib/site";
import { IconFacebook, IconInstagram } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-bg px-3 pb-3 pt-3 sm:px-4 sm:pt-4">
      {/* Blue rounded footer panel */}
      <div className="relative overflow-hidden rounded-[2rem] bg-blue-deep p-8 sm:p-12">
        <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact info */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 items-center rounded-xl bg-white px-2.5 font-heading text-lg font-black tracking-tight text-blue-deep">
                М<span className="text-red">П</span>
              </span>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                Мисирли <span className="text-red">Промет</span>
              </span>
            </div>
            <p className="mt-6 font-body text-sm text-white/70">Јави се за совет и понуда!</p>
            <a href={SITE.phoneHref} className="mt-2 block font-body text-sm text-white/70 transition-colors hover:text-red">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 block font-body text-sm text-white/70 transition-colors hover:text-red">
              {SITE.email}
            </a>
            <p className="mt-2 font-body text-sm text-white/70">{SITE.address}</p>
          </div>

          {/* Навигација */}
          <div>
            <h4 className="font-heading text-lg font-bold !text-white">Навигација</h4>
            <ul className="mt-5 space-y-3 font-body text-sm text-white/70">
              <li><Link href="/" className="transition-colors hover:text-red">Почетна</Link></li>
              <li><Link href="/motocikli" className="transition-colors hover:text-red">Мотоцикли</Link></li>
              <li><Link href="/avtomobili" className="transition-colors hover:text-red">Автомобили</Link></li>
              <li><Link href="/za-nas" className="transition-colors hover:text-red">За Нас</Link></li>
              <li><Link href="/kontakt" className="transition-colors hover:text-red">Контакт</Link></li>
            </ul>
          </div>

          {/* Категории */}
          <div>
            <h4 className="font-heading text-lg font-bold !text-white">Категории</h4>
            <ul className="mt-5 space-y-3 font-body text-sm text-white/70">
              <li><Link href="/motocikli?kategorija=naked" className="transition-colors hover:text-red">Нејкед</Link></li>
              <li><Link href="/motocikli?kategorija=scooter" className="transition-colors hover:text-red">Скутер</Link></li>
              <li><Link href="/motocikli?kategorija=enduro" className="transition-colors hover:text-red">Ендуро</Link></li>
              <li><Link href="/motocikli?kategorija=adventure" className="transition-colors hover:text-red">Адвенчер</Link></li>
              <li><Link href="/motocikli?kategorija=atv" className="transition-colors hover:text-red">Квад / ATV</Link></li>
            </ul>
          </div>

          {/* Контакт */}
          <div>
            <h4 className="font-heading text-lg font-bold !text-white">Контакт</h4>
            <ul className="mt-5 space-y-3 font-body text-sm text-white/70">
              <li>
                <a href={SITE.phoneHref} className="transition-colors hover:text-red">{SITE.phone}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-red">{SITE.email}</a>
              </li>
              <li>{SITE.address}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-center font-body text-xs text-white/70 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Мисирли Промет. Сите права задржани.</p>
          <div className="flex gap-2.5">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-red text-white transition-all hover:-translate-y-0.5"
            >
              <IconFacebook size={16} />
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:-translate-y-0.5 hover:border-red hover:text-red"
            >
              <IconInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
