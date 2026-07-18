"use client";
import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function FloatingActions() {
  const [show, setShow] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 400);
      // While the page is moving the button turns to liquid glass; once the
      // user stops (~180ms of no scroll events) it settles back to red.
      setScrolling(true);
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => setScrolling(false), 180);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 transition-all duration-300 sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={SITE.phoneHref}
        aria-label="Јави се"
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${
          scrolling
            ? "border-white/30 bg-white/15 text-white backdrop-blur-md"
            : "border-transparent bg-red text-white"
        }`}
      >
        <Phone size={20} />
      </a>
    </div>
  );
}
