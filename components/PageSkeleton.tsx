// Lightweight, theme-matched loading skeleton shown by route-level loading.tsx
// during navigation. Kept deliberately short & fast (see `.skeleton` in
// globals.css) so on quick loads it barely flashes, but a slower route still
// gets a polished placeholder instead of a blank screen.
export default function PageSkeleton({
  cards = 6,
  wide = true,
}: {
  cards?: number;
  wide?: boolean;
}) {
  return (
    <div className="container-wide pb-16 pt-24 md:pt-28" aria-busy="true" aria-hidden="true">
      {/* Kicker + title */}
      <div className="flex flex-col items-center gap-3">
        <div className="skeleton h-4 w-28 rounded-full" />
        <div className="skeleton h-9 w-72 max-w-full rounded-xl" />
      </div>

      {/* Hero / banner block */}
      {wide && <div className="skeleton mt-9 h-52 w-full rounded-[1.75rem] sm:h-64" />}

      {/* Card grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="skeleton h-72 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
