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

// A single equipment level (GL / GL+ / GLX). Higher trims are cumulative —
// their `features` list only the equipment ADDED on top of the trim below.
export type CarTrim = {
  level: string;         // "GL" | "GL+" | "GLX"
  priceFrom: number;     // EUR — the current "action" price (the lower "од" figure)
  priceRegular?: number; // EUR — the higher list "од" price, rendered struck-through
  features: string[];    // equipment this trim adds (base trim = full base list)
};

// A highlighted safety/tech system with an explanatory paragraph (DSBS II, DMS, …).
export type SafetyHighlight = {
  title: string;
  text: string;
};

export type Car = {
  slug: string;
  name: string;
  bodyType: string;      // e.g. "SUV", "Хечбек"
  fuel: string;          // e.g. "Хибрид", "Електричен"
  transmission?: string; // e.g. "Автоматски", "Мануелен"
  drive?: string;        // e.g. "ALLGRIP 4x4"
  year: number;
  priceFrom?: number;    // EUR "од" — mirrors the base trim's action price
  shortDesc: string;
  description: string;
  extraInfo?: string;             // extra marketing paragraph shown under the description
  images: string[];      // /cars/<slug>/<n>.jpg
  colors?: CarColor[];
  features: string[];             // fallback equipment list (used when no `trims`)
  trims?: CarTrim[];              // GL / GL+ / GLX equipment levels
  safety?: string[];              // Suzuki Safety Support bullet list
  safetyHighlights?: SafetyHighlight[];
  sourceUrl?: string;             // official suzukiauto.mk model page (attribution / verification)
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
    trims: [
      {
        level: "GL",
        priceRegular: 18960,
        priceFrom: 16990,
        features: [
          "LED фарови",
          "4,2'' LCD екран во боја на таблата со инструменти",
          "9'' мултимедијален екран со камера за рикверц и навигација",
          "A/C со дигитален дисплеј",
          "USB тип А порта",
          "Автоматски систем за префрлување на долго светло (HBA)",
          "Suzuki Safety Support",
          "Паркинг сензори (задни)",
          "Систем за стартување без клуч",
          "Систем за задржување на нагорнина",
          "Suzuki CONNECT",
        ],
      },
      {
        level: "GL+",
        priceRegular: 19960,
        priceFrom: 18960,
        features: [
          "16\" алуминиумски тркала",
          "Затемнети задни стакла",
          "Кожен волан",
          "Греење на предните седишта",
          "USB порти: 2 x тип A + 1 x тип C",
        ],
      },
      {
        level: "GLX",
        priceRegular: 21690,
        priceFrom: 20690,
        features: [
          "16\" двобојни алуминиумски тркала",
          "Електрично преклопување огледала со интегриран блиц",
          "Автоматска климатизација",
        ],
      },
    ],
    safetyHighlights: [
      {
        title: "Систем за поддршка на сопирање II (DSBS II)",
        text:
          "Милиметарски радар и камера се користат во комбинација за откривање возила, велосипеди и пешаци пред возилото и помагаат да се избегнат фронтални, дијагонални и странични судири. Кога ќе се открие ризик од судир, се активираат звучни и визуелни предупредувања. Ако возачот не сопира доволно, помошта за сопирање автоматски се активира за да помогне во забавување на возилото. При зголемена веројатност за судир, системот автоматски ги активира сопирачките за да помогне да се намали силата на удар и да се ограничи материјалната штета.",
      },
    ],
    sourceUrl: "https://suzukiauto.mk/swift/",
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
    extraInfo:
      "Возбудливи изведби. VITARA е синоним за слобода. Опремен со напредната хибридна технологија на Suzuki, тоа е 4x4 SUV кој е подготвен да ве однесе каде и да посакате, кога и да посакате. Со возбудливи перформанси, лесно ракување и импресивен изглед, ви овозможува да ја доживеете врвната радост на возењето секогаш кога ќе седнете зад воланот.",
    trims: [
      {
        level: "GL",
        priceRegular: 23900,
        priceFrom: 21990,
        features: [
          "Задни сензори за паркирање",
          "Автоматска климатизација",
          "6 воздушни перничиња",
          "Автоматски бришачи",
          "Автоматски светла",
          "Автоматско долго светло (HBA)",
          "Suzuki Safety Support",
          "Мултимедијален екран 9\" со камера за рикверц, Apple CarPlay Wireless, Android Auto и навигација",
          "Услуга Suzuki Connect",
          "Стартување со притискање без клуч",
          "Алуминиумски тркала 17\"",
        ],
      },
      {
        level: "GL+",
        priceRegular: 24900,
        priceFrom: 23900,
        features: [
          "Задни затемнети стакла",
          "Автоматски внатрешен ретровизор",
          "Кожен волан",
          "Задни електрични стакла",
          "Предни загреани седишта",
          "Осветлена патничка кабина",
          "Осветлување на подножјето на возачот и совозачот",
          "Преден потпирач за рака",
          "Штекер 12V во багажниот простор",
          "Систем за следење на слепи точки (BSM)",
          "Помош за заден вкрстен сообраќај (RCTA)",
        ],
      },
      {
        level: "GLX",
        priceRegular: 27900,
        priceFrom: 26990,
        features: [
          "Двобојни алуминиумски тркала со гуми 215/55R17",
          "Електрични преклопни странични ретровизори со интегриран трепкач",
          "Предни високотонци",
          "Облоги на вратите од велур",
          "Облоги на потпирачот за рака од синтетичка кожа",
          "Велурни седишта со синтетичка кожа",
          "Предни сензори за паркирање",
        ],
      },
    ],
    safetyHighlights: [
      {
        title: "Систем за следење на возачот (DMS)",
        text:
          "Камерата поставена помеѓу централните отвори за воздух ги надгледува очите и лицето на возачот. Ако системот детектира симптоми на поспаност и одвраќање, дава звучно и визуелно предупредување преку релевантен индикатор на екранот на таблата со инструменти.",
      },
    ],
    safety: [
      "Систем за помош при сопирање II (DSBS II)",
      "Помош за задржување лента (LKA)",
      "Систем за спречување на заминување од лента",
      "Адаптивна контрола на патувањето (ACC)",
      "Функција за препознавање сообраќајни знаци",
      "Монитор на слепа точка",
      "Помош за вкрстен сообраќај (RCTA)",
      "Систем за итни повици eCall",
      "Интелигентна поддршка за контрола на брзината (ISA)",
      "Систем за следење на возачот (DMS)",
      "Систем за предупредување за напуштање лента (LDW)",
      "Систем за предупредување за отклонување на возилото",
      "Систем за следење на притисокот во гумите (TPSM)",
      "Систем за задржување на рид",
      "Систем за контрола на спуштање (4WD)",
      "Автоматски систем за префрлување на долго светло (HBA)",
    ],
    sourceUrl: "https://suzukiauto.mk/vitara/",
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
    sourceUrl: "https://suzukiauto.mk/e-vitara/",
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
    trims: [
      {
        level: "GL",
        priceRegular: 26990,
        priceFrom: 24990,
        features: [
          "17-инчни алуминиумски тркала",
          "4,2-инчен екран во боја на инструмент таблата",
          "LED светла (кратки / долги светла)",
          "9-инчен мултимедијален екран со камера за движење наназад",
          "6 воздушни перничиња",
          "Клима уред",
          "Suzuki Safety Support",
          "Задни сензори за паркирање",
        ],
      },
      {
        level: "GL+",
        priceRegular: 28490,
        priceFrom: 25500,
        features: [
          "Кровни шини",
          "Сензори за светлина и дожд",
          "Светла за магла",
          "Затемнети задни прозорци",
          "Електрично склопливи надворешни ретровизори со интегриран трепкач",
          "Внатрешен ретровизор со автоматско прилагодување на осветленоста",
          "Волан со 3 краци обложен со кожа",
          "Автоматски двозонски клима уред",
          "Греење на предните седишта (возач и совозач)",
          "Монитор за мртов агол",
          "Предупредување за вкрстен сообраќај одзади",
          "Сензори за паркирање напред",
          "Заден потпирач за раце",
          "Потпирачи за грб на задните седишта со двонасочно спуштање",
        ],
      },
      {
        level: "GLX",
        priceRegular: 29990,
        priceFrom: 27900,
        features: [
          "17-инчни двобојни алуминиумски тркала",
          "Врати од синтетичка кожа",
          "Камера од 360°",
          "Седишта од кожа",
          "Централен звучник",
          "Панорамски подвижен покрив (опционално)",
        ],
      },
    ],
    safetyHighlights: [
      {
        title: "Систем за следење на возачот (DMS)",
        text:
          "Користејќи камера интегрирана во контролната табла, системот ги препознава очите и лицето на возачот. Доколку детектира поспаност, губење на контакт со патот или одвлекување на вниманието, се активира звучно предупредување и на екранот на контролната табла се прикажува соодветна индикација, со што се нуди зголемена безбедност при возење.",
      },
      {
        title: "Хибридна технологија на Suzuki",
        text:
          "S-CROSS има 1,4-литарски BOOSTERJET турбо мотор со директно вбризгување кој испорачува многу вртежен момент. Интеркулерот за турбополначот го турка компримираниот воздух во цилиндрите, испорачувајќи максимален вртежен момент при ниски вртежи. Системот за директно вбризгување ја оптимизира контролата на количината на гориво, времето и притисокот за подобрени перформанси и ефикасност. Покрај тоа, променливото време на вентилите (VVT), рециркулацијата на издувните гасови (EGR) и повисокиот однос на компресија обезбедуваат уште поголема ефикасност.",
      },
    ],
    safety: [
      "Систем за динамичка поддршка на сопирањето II (DSBS II)",
      "Помош при одржување на лентата (LKA)",
      "Систем за спречување на напуштање на лентата",
      "Адаптивен темпомат (ACC)",
      "Препознавање на сообраќајни знаци",
      "Монитор на слепа точка",
      "Предупредување за вкрстен сообраќај одзади (RCTA)",
      "Систем за итни повици eCall",
      "Интелигентна поддршка за контрола на брзината (ISA)",
      "Систем за следење на возачот (DMS)",
      "Систем за предупредување за напуштање на лентата (LDW)",
      "Систем за предупредување за напуштање на возилото",
      "Систем за следење на притисокот во гумите (TPSM)",
      "Систем за задржување на угорница",
      "Систем за контрола на спуштање по угорница (4WD)",
      "Систем за помош при долги светла (HBA)",
    ],
    sourceUrl: "https://suzukiauto.mk/scross/",
  },
];

export function getCar(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}
