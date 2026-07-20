"use client";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

export default function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition-transform duration-200 hover:scale-105 active:scale-95 [box-shadow:0_10px_28px_-8px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-2px_8px_rgba(255,255,255,0.08)]"
      >
        {/* phone + signal waves (brand red) */}
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          className="relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="fa-phone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FF453A" />
              <stop offset="1" stopColor="#E2231A" />
            </linearGradient>
          </defs>
          <g
            transform="translate(-0.56 0.54)"
            stroke="url(#fa-phone)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* signal waves */}
            <path d="M15.05 5A5 5 0 0 1 19 8.95" />
            <path d="M15.05 1A9 9 0 0 1 23 8.94" />
            {/* handset */}
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </g>
        </svg>
      </a>
    </div>
  );
}
