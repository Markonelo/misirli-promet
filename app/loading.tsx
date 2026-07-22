import PageSkeleton from "@/components/PageSkeleton";

// Global route-transition skeleton. Next.js shows this automatically (via
// Suspense) while the destination segment streams in — covering every route
// that doesn't define its own loading.tsx. Fast loads barely flash it.
export default function Loading() {
  return <PageSkeleton />;
}
