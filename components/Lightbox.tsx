"use client";
import { useCallback, useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Lightbox({
  images,
  index,
  alt = "",
  onIndexChange,
  onClose,
}: {
  images: string[];
  index: number;
  alt?: string;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const count = images.length;

  const go = useCallback(
    (dir: number) => {
      setZoomed(false);
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Keyboard: Esc closes, ← / → navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Lock background scroll while the lightbox is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const setOriginFromEvent = (e: ReactMouseEvent<HTMLImageElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const toggleZoom = (e: ReactMouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setOriginFromEvent(e);
    setZoomed((z) => !z);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Затвори"
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <X size={22} />
      </button>

      {/* Counter */}
      {count > 1 && (
        <span className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full bg-white/10 px-3.5 py-1.5 font-body text-sm text-white backdrop-blur-md">
          {index + 1} / {count}
        </span>
      )}

      {/* Prev */}
      {count > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Претходна слика"
          className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={index}
        src={images[index]}
        alt={alt}
        draggable={false}
        onClick={toggleZoom}
        onMouseMove={(e) => zoomed && setOriginFromEvent(e)}
        style={{
          transform: zoomed ? "scale(2)" : "scale(1)",
          transformOrigin: `${origin.x}% ${origin.y}%`,
          cursor: zoomed ? "zoom-out" : "zoom-in",
        }}
        className="max-h-[86vh] max-w-[92vw] select-none rounded-lg object-contain transition-transform duration-300 ease-out"
      />

      {/* Next */}
      {count > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Следна слика"
          className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6"
        >
          <ChevronRight size={26} />
        </button>
      )}

      {/* Zoom hint */}
      <span className="pointer-events-none absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-body text-xs text-white/80 backdrop-blur-md">
        {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
        {zoomed ? "Кликни за намалување" : "Кликни за зумирање"}
      </span>
    </motion.div>
  );
}
