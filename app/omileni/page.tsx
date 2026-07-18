import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FavoritesClient from "@/components/FavoritesClient";

export const metadata: Metadata = {
  title: "Омилени мотоцикли",
  description:
    "Твоите зачувани омилени мотоцикли во Мисирли Промет, Битола — спореди ги моделите што ти се допаѓаат на едно место.",
  robots: { index: false, follow: true },
};

export default function OmileniPage() {
  return (
    <>
      <PageHero
        kicker="Твојата листа"
        title="Омилени"
        subtitle="Мотоциклите што ги зачува на едно место — спореди и одлучи без брзање."
      />
      <FavoritesClient />
    </>
  );
}
