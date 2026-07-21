// ─────────────────────────────────────────────────────────────────────────
// Car catalogue — Suzuki passenger cars carried by Мисирли Промет.
//
// Misirli is a MOTORCYCLE dealer that also stocks some cars (mostly Suzuki).
// This is a small, separate catalogue rendered on /avtomobili with the same
// card + detail design as the motorcycles, but with car-appropriate specs
// (тип каросерија, погон, менувач) instead of engine displacement.
//
// Data + images sourced from suzukiauto.mk. Prices are the "starting from"
// figures shown there and are subject to the dealer's confirmation.
// ─────────────────────────────────────────────────────────────────────────

export type CarColor = {
  name: string;   // Macedonian colour name
  hex: string;    // swatch colour
  image?: string; // per-colour full-car render; selecting the swatch swaps the main photo
};

export type Car = {
  slug: string;
  name: string;
  bodyType: string;      // e.g. "SUV", "Хечбек"
  fuel: string;          // e.g. "Хибрид", "Електричен"
  transmission?: string; // e.g. "Автоматски", "Мануелен"
  drive?: string;        // e.g. "ALLGRIP 4x4"
  year: number;
  priceFrom?: number;    // EUR "од"
  shortDesc: string;
  description: string;
  images: string[];      // /cars/<slug>/<n>.jpg
  colors?: CarColor[];
  features: string[];
  featured?: boolean;
  isNew?: boolean;
};

export const cars: Car[] = [
  {
    slug: "swift",
    name: "Suzuki Swift",
    bodyType: "Хечбек",
    fuel: "Хибрид (12V SHVS)",
    transmission: "Мануелен / CVT",
    year: 2025,
    priceFrom: 16990,
    shortDesc: "Компактен, пргав и економичен хечбек — забавен за возење секој ден.",
    description:
      "Новиот Suzuki Swift е стилски, лесен и извонредно економичен градски автомобил. Со 1.2 DualJet мотор и благ хибриден систем нуди ниска потрошувачка, жив карактер и модерна опрема — идеален за секојдневно возење во град и на отворен пат.",
    images: [
      "/cars/swift/blue.png",
      "/cars/swift/red.png",
      "/cars/swift/orange.png",
      "/cars/swift/white.png",
      "/cars/swift/black.png",
      "/cars/swift/silver.png",
    ],
    colors: [
      { name: "Frontier Blue", hex: "#1f3a5f", image: "/cars/swift/blue.png" },
      { name: "Burning Red", hex: "#b81e26", image: "/cars/swift/red.png" },
      { name: "Sizzle Orange", hex: "#c2571d", image: "/cars/swift/orange.png" },
      { name: "Pure White Pearl", hex: "#f1f2f0", image: "/cars/swift/white.png" },
      { name: "Super Black Pearl", hex: "#101012", image: "/cars/swift/black.png" },
      { name: "Premium Silver", hex: "#c9ccce", image: "/cars/swift/silver.png" },
    ],
    features: ["Благ хибрид 12V", "DualJet мотор", "Ниска потрошувачка", "Модерна инфозабава"],
    featured: true,
    isNew: true,
  },
  {
    slug: "vitara",
    name: "Suzuki Vitara",
    bodyType: "SUV",
    fuel: "Strong Hybrid",
    transmission: "Автоматски",
    drive: "ALLGRIP 4x4 (опционо)",
    year: 2025,
    priceFrom: 21990,
    shortDesc: "Компактен SUV со силен хибрид и легендарен ALLGRIP погон на сите тркала.",
    description:
      "Suzuki Vitara е препознатлив компактен SUV што комбинира издржливост, простор и ефикасност. Новиот 1.5 DualJet Strong Hybrid систем овозможува возење и во целосно електричен режим, додека ALLGRIP 4x4 технологијата дава сигурност на секаков терен и во секакви услови.",
    images: [
      "/cars/vitara/white.png",
      "/cars/vitara/black.png",
      "/cars/vitara/red.png",
      "/cars/vitara/blue.png",
      "/cars/vitara/silver.png",
      "/cars/vitara/yellow.png",
    ],
    colors: [
      { name: "Superior White", hex: "#eeeeea", image: "/cars/vitara/white.png" },
      { name: "Cosmic Black", hex: "#111214", image: "/cars/vitara/black.png" },
      { name: "Bright Red", hex: "#c01823", image: "/cars/vitara/red.png" },
      { name: "Sphere Blue", hex: "#26364f", image: "/cars/vitara/blue.png" },
      { name: "Silky Silver", hex: "#c7cacc", image: "/cars/vitara/silver.png" },
      { name: "Solar Yellow", hex: "#f2c200", image: "/cars/vitara/yellow.png" },
    ],
    features: ["Strong Hybrid", "ALLGRIP 4x4", "Висок клиренс", "Простран багажник"],
    featured: true,
  },
  {
    slug: "e-vitara",
    name: "Suzuki e-Vitara",
    bodyType: "SUV",
    fuel: "Електричен (EV)",
    transmission: "Автоматски",
    drive: "ALLGRIP-e (опционо)",
    year: 2026,
    priceFrom: 33990,
    shortDesc: "Првиот целосно електричен Suzuki SUV — автентичен дизајн, нула емисии.",
    description:
      "e-Vitara е првиот целосно електричен SUV на Suzuki. Спојува автентичен SUV дизајн со модерна електрична платформа, тивко и моќно возење и напредна технологија. Избор за оние што сакаат чиста мобилност без компромис во карактер и практичност.",
    images: [
      "/cars/e-vitara/green.png",
      "/cars/e-vitara/red.png",
      "/cars/e-vitara/white.png",
      "/cars/e-vitara/blue.png",
      "/cars/e-vitara/grey.png",
      "/cars/e-vitara/black.png",
    ],
    colors: [
      { name: "Land Breeze Green", hex: "#5b7d63", image: "/cars/e-vitara/green.png" },
      { name: "Opulent Red", hex: "#8f1b22", image: "/cars/e-vitara/red.png" },
      { name: "Arctic White", hex: "#f2f3f0", image: "/cars/e-vitara/white.png" },
      { name: "Celestial Blue", hex: "#2b4a73", image: "/cars/e-vitara/blue.png" },
      { name: "Grandeur Gray", hex: "#54585c", image: "/cars/e-vitara/grey.png" },
      { name: "Bluish Black", hex: "#14171c", image: "/cars/e-vitara/black.png" },
    ],
    features: ["100% електричен", "Автентичен SUV дизајн", "Нула емисии", "Напредна технологија"],
    isNew: true,
  },
  {
    slug: "s-cross",
    name: "Suzuki S-Cross",
    bodyType: "SUV",
    fuel: "Хибрид (48V SHVS)",
    transmission: "Автоматски",
    drive: "ALLGRIP 4x4 (опционо)",
    year: 2025,
    priceFrom: 24990,
    shortDesc: "Простран кросовер SUV со турбо мотор и благ хибриден систем.",
    description:
      "Suzuki S-Cross е простран и удобен кросовер со 1.4 BOOSTERJET турбо мотор и 48V благ хибриден систем. Нуди повеќе простор за патници и багаж, богата опрема и опционен ALLGRIP 4x4 погон — практичен избор за семејство и подолги патувања.",
    images: [
      "/cars/s-cross/white.png",
      "/cars/s-cross/black.png",
      "/cars/s-cross/red.png",
      "/cars/s-cross/blue.png",
      "/cars/s-cross/brown.png",
      "/cars/s-cross/grey.png",
    ],
    colors: [
      { name: "Cool White Pearl", hex: "#f0f0ee", image: "/cars/s-cross/white.png" },
      { name: "Cosmic Black", hex: "#111214", image: "/cars/s-cross/black.png" },
      { name: "Energetic Red", hex: "#b81e2b", image: "/cars/s-cross/red.png" },
      { name: "Sphere Blue", hex: "#2a445f", image: "/cars/s-cross/blue.png" },
      { name: "Canyon Brown", hex: "#8a5a2b", image: "/cars/s-cross/brown.png" },
      { name: "Titan Dark Gray", hex: "#3a3d40", image: "/cars/s-cross/grey.png" },
    ],
    features: ["BOOSTERJET турбо", "Благ хибрид 48V", "ALLGRIP 4x4", "Простран за семејство"],
  },
];

export function getCar(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}
