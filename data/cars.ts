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
  name: string; // Macedonian colour name
  hex: string;  // swatch colour
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
    images: ["/cars/swift/1.jpg", "/cars/swift/2.jpg", "/cars/swift/3.jpg"],
    colors: [
      { name: "Frontier Blue", hex: "#1f3a5f" },
      { name: "Burning Red", hex: "#b81e26" },
      { name: "Cool Yellow", hex: "#f4c542" },
      { name: "Pure White Pearl", hex: "#f1f2f0" },
      { name: "Super Black Pearl", hex: "#101012" },
      { name: "Premium Silver", hex: "#c9ccce" },
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
    images: ["/cars/vitara/1.jpg", "/cars/vitara/2.jpg", "/cars/vitara/3.jpg"],
    colors: [
      { name: "Superior White", hex: "#eeeeea" },
      { name: "Cosmic Black", hex: "#111214" },
      { name: "Bright Red", hex: "#c01823" },
      { name: "Sphere Blue", hex: "#26364f" },
      { name: "Silky Silver", hex: "#c7cacc" },
      { name: "Solar Yellow", hex: "#f2c200" },
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
    images: ["/cars/e-vitara/1.jpg", "/cars/e-vitara/2.jpg", "/cars/e-vitara/3.jpg"],
    colors: [
      { name: "Land Breeze Green", hex: "#5b7d63" },
      { name: "Opulent Red", hex: "#8f1b22" },
      { name: "Arctic White", hex: "#f2f3f0" },
      { name: "Celestial Blue", hex: "#2b4a73" },
      { name: "Grandeur Gray", hex: "#54585c" },
      { name: "Bluish Black", hex: "#14171c" },
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
    images: ["/cars/s-cross/1.jpg", "/cars/s-cross/3.jpg"],
    colors: [
      { name: "Cool White Pearl", hex: "#f0f0ee" },
      { name: "Cosmic Black", hex: "#111214" },
      { name: "Energetic Red", hex: "#b81e2b" },
      { name: "Sphere Blue", hex: "#2a445f" },
      { name: "Canyon Brown", hex: "#5a4433" },
      { name: "Titan Dark Gray", hex: "#3a3d40" },
    ],
    features: ["BOOSTERJET турбо", "Благ хибрид 48V", "ALLGRIP 4x4", "Простран за семејство"],
  },
];

export function getCar(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}
