"use client";
import { useEffect, useState } from "react";
import { Bike, X, Expand } from "lucide-react";

// Clickable salon photo frame that sits on top of the map. Until the client
// supplies /public/salon.jpg it shows a labelled placeholder so the position is
// visible; once the file exists the photo appears and clicking opens a lightbox.
export default function SalonFrame({
  src = "/Photos/Outside.jpg",
  alt = "Салон · Мисирли Промет",
}: {
  src?: string;
  alt?: string;
}) {
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.onload = () => active && setOk(true);
    img.onerror = () => active && setOk(false);
    img.src = src;
    return () => {
      active = false;
    };
  }, [src]);

  // Close lightbox on Escape + lock scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Floating frame on the map */}
      <button
        type="button"
        onClick={() => ok && setOpen(true)}
        aria-label={ok ? "Зголеми ја сликата од салонот" : "Слика од салонот наскоро"}
        className="group absolute left-[calc(50%_+_1rem)] top-1/2 w-24 -translate-y-1/2 cursor-pointer overflow-hidden rounded-xl border border-white/15 bg-[#10151f]/90 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-transform hover:scale-[1.03] sm:w-32"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-[#11233F] to-[#0E1219]">
          {ok ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} className="h-full w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
                <Expand size={20} />
              </span>
            </>
          ) : (
            <div className="dot-grid flex h-full w-full flex-col items-center justify-center gap-1.5 text-white/25">
              <Bike size={22} strokeWidth={1.4} />
              <span className="font-heading text-[9px] font-bold uppercase tracking-[0.15em]">
                Салон
              </span>
            </div>
          )}
        </div>
      </button>

      {/* Lightbox */}
      {open && ok && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Затвори"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl border border-white/10 object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          />
        </div>
      )}
    </>
  );
}
