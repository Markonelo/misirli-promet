import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Deterministic thousands grouping with a dot separator (Macedonian/European
// convention). We format manually instead of Intl.NumberFormat because the
// runtime ICU data differs between the Node server and the browser, which
// picks a different grouping separator and breaks React hydration.
export function formatEUR(value: number) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
