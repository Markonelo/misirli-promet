import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-bg px-5">
      <div className="text-center">
        <span className="font-heading text-7xl font-black text-blue sm:text-8xl">404</span>
        <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink">Страницата не е пронајдена</h1>
        <p className="mx-auto mt-3 max-w-md font-body text-mute">
          Изгледа дека страницата што ја бараш не постои или е преместена.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <Home size={18} /> Почетна
          </Link>
          <Link href="/motocikli" className="btn-ghost">
            <ArrowLeft size={18} /> Мотоцикли
          </Link>
        </div>
      </div>
    </section>
  );
}
