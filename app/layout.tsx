import type { Metadata } from "next";
import { Exo_2, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { localBusinessSchema } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { FavoritesProvider } from "@/components/FavoritesContext";
import SmoothScroll from "@/components/SmoothScroll";

// Heading — Exo 2: modern geometric sans with a techy, automotive edge.
// Ships native Cyrillic so Macedonian renders with no fallback hack.
const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-exo2",
  display: "swap",
});

// Body — Manrope: the same clean, light body face used on the mehatronika site.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Numerals — Sora: clean geometric face with refined, premium figures.
// Used for prices, stats and engine sizes via the `.font-num` utility.
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Мисирли Промет | Мотоцикли, скутери и квадови — Битола",
    template: "%s | Мисирли Промет",
  },
  description:
    "Мисирли Промет — продажба на мотоцикли, скутери и квадови во Битола. Брендови Hamachi, SYM, Zontes и други. Ендуро, нејкед, ретро скутери и квадови, директна продажба и сервис.",
  keywords: [
    "мотоцикли Битола", "скутери Битола", "мотоцикли Македонија", "Мисирли Промет",
    "Hamachi Битола", "ендуро мотори", "ретро скутери", "квад ATV Битола",
    "motocikli Bitola", "Misirli Promet", "продажба мотоцикли Битола",
  ],
  openGraph: {
    type: "website",
    locale: "mk_MK",
    url: SITE.url,
    siteName: SITE.name,
    title: "Мисирли Промет | Мотоцикли, скутери и квадови — Битола",
    description: "Продажба на мотоцикли, скутери и квадови во Битола.",
    images: [{ url: "/hero.jpg", width: 1200, height: 630, alt: "Мисирли Промет — Битола" }],
  },
  twitter: { card: "summary_large_image", title: "Мисирли Промет | Мотоцикли и скутери" },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mk" className={`${exo2.variable} ${manrope.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="font-body antialiased">
        <FavoritesProvider>
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingActions />
          </SmoothScroll>
        </FavoritesProvider>
      </body>
    </html>
  );
}
