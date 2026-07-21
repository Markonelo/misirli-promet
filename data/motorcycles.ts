// ─────────────────────────────────────────────────────────────────────────
// Motorcycle catalogue — real inventory of Мисирли Промет (Битола).
//
// Data + images sourced from the dealer's Facebook page (facebook.com/
// misirlipromet). Brands: Hamachi / HMC, SYM, Zontes, Q, SFA.
//
// VARIANT SYSTEM: a model that exists in two engine sizes lists BOTH under
// `variants` (e.g. Tekken 125 / 325). The card shows the combined badge; the
// detail page lets the visitor pick a variant. Prices are the current promo
// prices shown on the Facebook offer cards.
// ─────────────────────────────────────────────────────────────────────────

export type MotoCategory = "naked" | "scooter" | "enduro" | "adventure" | "atv";

export const CATEGORY_LABELS: Record<MotoCategory, string> = {
  naked: "Нејкед",
  scooter: "Скутер",
  enduro: "Ендуро",
  adventure: "Адвенчер",
  atv: "Квад / ATV",
};

export type Variant = {
  cc: number;            // engine displacement, e.g. 125 or 300
  price?: number;        // EUR, optional — null/undefined => "по барање"
};

// A colour option. Selecting it on the detail page swaps the main photo to the
// matching image. `hex` is the swatch colour; `image` is the photo of the bike
// in that colour (e.g. /moto/<slug>/green.jpg).
export type MotoColor = {
  name: string;          // Macedonian colour name, e.g. "Црвена"
  hex: string;           // swatch colour, e.g. "#c0261f"
  image: string;         // photo of the bike in this colour
};

export type Motorcycle = {
  slug: string;
  name: string;
  category: MotoCategory;
  year: number;
  shortDesc: string;
  description: string;
  variants: Variant[];   // 1 or 2 entries
  images: string[];      // /moto/<slug>/<n>.jpg ; empty => placeholder shown
  colors?: MotoColor[];  // optional colour options — swaps the main photo
  features: string[];
  featured?: boolean;
  isNew?: boolean;
};

export const motorcycles: Motorcycle[] = [
  // ── NAKED / STREET ──────────────────────────────────────────────────────
  {
    slug: "tekken",
    name: "Hamachi Tekken 125",
    category: "naked",
    year: 2025,
    shortDesc: "Нејкед стрит мотор од 125cc со агресивен став.",
    description:
      "Tekken 125 е модерен нејкед мотор создаден за град и отворен пат — спортска позиција, LED осветлување и дигитален дисплеј во достапна класа од 125cc.",
    variants: [{ cc: 125, price: 1790 }],
    images: ["/moto/tekken/1.jpg"],
    features: ["LED светла", "Дигитален дисплеј", "Спортска позиција", "4-тактен мотор"],
    featured: true,
    isNew: true,
  },
  {
    slug: "hamachi-nf-200",
    name: "Hamachi NF-200",
    category: "naked",
    year: 2025,
    shortDesc: "Лесен супермото-нејкед за динамично градско возење.",
    description:
      "NF-200 комбинира висок клиренс и лесно шасе со исправена, удобна позиција — подеднакво способен на асфалт и на макадам.",
    variants: [{ cc: 200, price: 1390 }],
    images: ["/moto/hamachi-nf-200/1.jpg"],
    features: ["LED светла", "Висок клиренс", "Лесна тежина", "4-тактен мотор"],
  },

  // ── ENDURO / OFF-ROAD ───────────────────────────────────────────────────
  {
    slug: "hamachi-250-pro",
    name: "Hamachi 250 PRO",
    category: "enduro",
    year: 2025,
    shortDesc: "Ендуро од 250cc со 14 КС и резервоар од 10L.",
    description:
      "250 PRO е опремен со помоќен мотор, воздушно ладење и поголем резервоар за подолги тури — подготвен за посериозни теренски предизвици.",
    variants: [{ cc: 250, price: 1590 }],
    images: ["/moto/hamachi-250-pro/1.jpg"],
    features: ["Воздушно ладење", "Резервоар 10L", "Висок клиренс", "Електрично палење"],
  },
  {
    slug: "hamachi-u200",
    name: "Hamachi U200 GY-5",
    category: "enduro",
    year: 2025,
    shortDesc: "Ендуро од 200cc, 12 КС, со резервоар од 10L.",
    description:
      "U200 GY-5 е сигурен и економичен ендуро со воздушно ладење и резервоар од 10 литри — направен за долготрајна употреба и лесно одржување.",
    variants: [{ cc: 200, price: 1490 }],
    images: ["/moto/hamachi-u200/1.jpg"],
    features: ["Воздушно ладење", "Резервоар 10L", "4-тактен мотор", "Висок клиренс"],
  },
  {
    slug: "hamachi-250-extreme",
    name: "Hamachi 250 Extreme",
    category: "enduro",
    year: 2025,
    shortDesc: "Спортски ендуро со 17 КС и електрично палење.",
    description:
      "250 Extreme носи поагресивен дизајн и моќност од 17 КС со CDI и електрично палење — за возачи што бараат повеќе адреналин на терен.",
    variants: [{ cc: 250, price: 1990 }],
    images: ["/moto/hamachi-250-extreme/1.jpg"],
    features: ["17 КС", "CDI палење", "Електрично палење", "Долг ход на амортизери"],
    isNew: true,
  },
  {
    slug: "hamachi-extreme-300-pro",
    name: "Hamachi Extreme 300 PRO",
    category: "enduro",
    year: 2025,
    shortDesc: "Врвен ендуро со нов дизајн и електрично стартување.",
    description:
      "Extreme 300 PRO е најопремениот ендуро во понудата — нов дизајн, CDI и електрично стартување за бескомпромисни теренски перформанси.",
    variants: [{ cc: 300, price: 2250 }],
    images: ["/moto/hamachi-extreme-300-pro/1.jpg"],
    features: ["Нов дизајн", "CDI палење", "Електрично стартување", "Висок клиренс"],
    isNew: true,
  },

  // ── SCOOTERS — RETRO 50cc ────────────────────────────────────────────────
  {
    slug: "avenza",
    name: "Hamachi Avenza",
    category: "scooter",
    year: 2025,
    shortDesc: "Класичен ретро скутер со чисти линии.",
    description:
      "Avenza е ретро скутер со безвременски дизајн и сигурен четиритактен мотор — практичен и убав избор за секој ден.",
    variants: [{ cc: 50, price: 1390 }],
    images: ["/moto/avenza/1.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Ретро дизајн", "Простор под седиште"],
  },
  {
    slug: "eivissa",
    name: "Hamachi Eivissa",
    category: "scooter",
    year: 2025,
    shortDesc: "Елегантен ретро скутер со карактер.",
    description:
      "Eivissa спојува ретро естетика со современа практичност — четиритактен мотор и докажан квалитет за безгрижно градско возење.",
    variants: [{ cc: 50, price: 1530 }],
    images: ["/moto/eivissa/1.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Ретро дизајн", "Докажан квалитет"],
  },

  // ── SCOOTERS — SPORTY 50cc ───────────────────────────────────────────────
  {
    slug: "rs-daytona",
    name: "Hamachi RS Daytona 50",
    category: "scooter",
    year: 2025,
    shortDesc: "Спортски скутер со динамичен дизајн.",
    description:
      "RS Daytona 50 е спортски скутер со агресивни линии и четиритактен мотор — забавен и економичен избор за младите возачи.",
    variants: [{ cc: 50, price: 1390 }],
    images: ["/moto/rs-daytona/1.jpg"],
    features: ["Спортски дизајн", "4-тактен мотор", "Воздушно ладење", "LED детали"],
  },
  {
    slug: "evoc",
    name: "Hamachi EVOC",
    category: "scooter",
    year: 2025,
    shortDesc: "Спортски скутер со изразит футуристички став.",
    description:
      "EVOC привлекува внимание со динамичен, футуристички дизајн и сигурен четиритактен мотор — спортски скутер за град.",
    variants: [{ cc: 50, price: 1390 }],
    images: ["/moto/evoc/1.jpg"],
    features: ["Спортски дизајн", "4-тактен мотор", "Воздушно ладење", "LED детали"],
    featured: true,
  },
  {
    slug: "sym-orbit-ii",
    name: "SYM Orbit II 50",
    category: "scooter",
    year: 2025,
    shortDesc: "Докажан градски скутер од брендот SYM.",
    description:
      "SYM Orbit II 50 е сигурен и квалитетен градски скутер со четиритактен мотор и воздушно ладење — препознатлив по издржливост и ниска потрошувачка.",
    variants: [{ cc: 50, price: 1490 }],
    images: ["/moto/sym-orbit-ii/1.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Докажан квалитет", "Простор под седиште"],
  },

  // ── SUZUKI 125cc SCOOTERS ────────────────────────────────────────────────
  {
    slug: "suzuki-burgman-125",
    name: "Suzuki Burgman Street 125EX",
    category: "scooter",
    year: 2025,
    shortDesc: "Луксузен градски скутер во стил на макси-скутер, со 125cc мотор.",
    description:
      "Burgman Street 125EX го носи препознатливиот макси-скутер стил на Suzuki во компактно 125cc пакување. Со економичен четиритактен мотор, CVT менувач и удобна позиција — идеален за секојдневно градско возење со доза на престиж.",
    variants: [{ cc: 125, price: 3490 }],
    images: [
      "/moto/suzuki-burgman-125/1.jpg",
      "/moto/suzuki-burgman-125/2.jpg",
      "/moto/suzuki-burgman-125/3.jpg",
    ],
    colors: [
      { name: "Pearl Moon Stone Gray", hex: "#8b8d90", image: "/moto/suzuki-burgman-125/1.jpg" },
      { name: "Metallic Mat Black", hex: "#17181a", image: "/moto/suzuki-burgman-125/2.jpg" },
      { name: "Pearl Mirage White", hex: "#ededea", image: "/moto/suzuki-burgman-125/3.jpg" },
    ],
    features: ["CVT менувач", "4-тактен мотор", "Воздушно ладење", "Простор под седиште"],
    featured: true,
    isNew: true,
  },
  {
    slug: "suzuki-avenis-125",
    name: "Suzuki Avenis 125",
    category: "scooter",
    year: 2025,
    shortDesc: "Спортски 125cc скутер со динамичен дизајн и ниска потрошувачка.",
    description:
      "Avenis 125 е спортски настроен градски скутер со агресивни линии, LED осветлување и економичен четиритактен мотор од 124cc. CVT менувачот и малата тежина го прават лесен и забавен за секојдневно возење.",
    variants: [{ cc: 125, price: 3290 }],
    images: [
      "/moto/suzuki-avenis-125/1.jpg",
      "/moto/suzuki-avenis-125/2.jpg",
    ],
    colors: [
      { name: "White / Matte Grey", hex: "#d9dadb", image: "/moto/suzuki-avenis-125/1.jpg" },
      { name: "Matte Grey / Green", hex: "#5b6b57", image: "/moto/suzuki-avenis-125/2.jpg" },
    ],
    features: ["9 КС", "CVT менувач", "4-тактен мотор", "Ниска потрошувачка"],
  },
  {
    slug: "suzuki-address-125",
    name: "Suzuki Address 125",
    category: "scooter",
    year: 2025,
    shortDesc: "Практичен и економичен 125cc скутер за секој ден.",
    description:
      "Address 125 е лесен, економичен и практичен скутер создаден за градот. Со ниска потрошувачка од само 1.9 L/100km, CVT менувач и удобна позиција, нуди сигурна и достапна секојдневна мобилност.",
    variants: [{ cc: 125, price: 3190 }],
    images: [
      "/moto/suzuki-address-125/1.jpg",
      "/moto/suzuki-address-125/2.jpg",
      "/moto/suzuki-address-125/3.jpg",
    ],
    colors: [
      { name: "Blue", hex: "#1f4aa8", image: "/moto/suzuki-address-125/1.jpg" },
      { name: "Matte Red", hex: "#8e2a2a", image: "/moto/suzuki-address-125/2.jpg" },
      { name: "Mirage White", hex: "#ededea", image: "/moto/suzuki-address-125/3.jpg" },
    ],
    features: ["9 КС", "CVT менувач", "4-тактен мотор", "Ниска потрошувачка"],
  },

  // ── 50cc ГРАДСКИ СКУТЕРИ ─────────────────────────────────────────────────
  {
    slug: "hmc-a7",
    name: "HMC A7",
    category: "scooter",
    year: 2025,
    shortDesc: "Компактен четиритактен градски скутер за секојдневно возење.",
    description:
      "HMC A7 е модерен компактен градски скутер со економичен четиритактен мотор. Практичен, лесен за управување и идеален за секојдневни градски релации.",
    variants: [{ cc: 50, price: 1650 }],
    images: ["/moto/hmc-a7/1.jpg", "/moto/hmc-a7/2.jpg", "/moto/hmc-a7/3.jpg"],
    features: ["4-тактен мотор", "Компактен дизајн", "Економичен", "Простор под седиште"],
    isNew: true,
  },
  {
    slug: "dragon-a9",
    name: "Hamachi Dragon A9 4T",
    category: "scooter",
    year: 2025,
    shortDesc: "Економичен 50cc четиритактен скутер со ниска потрошувачка.",
    description:
      "Dragon A9 4T е економичен градски скутер со едноцилиндричен четиритактен мотор од 3.8 КС, воздушно ладење и електрично и кик палење. Резервоар од 5L и тежина од само 110кг за практична градска мобилност.",
    variants: [{ cc: 50, price: 1390 }],
    images: ["/moto/dragon-a9/1.jpg", "/moto/dragon-a9/2.jpg"],
    features: ["3.8 КС", "4-тактен мотор", "Воздушно ладење", "Електрично + кик палење"],
  },
  {
    slug: "hamachi-ibiza",
    name: "Hamachi Ibiza",
    category: "scooter",
    year: 2025,
    shortDesc: "Ретро 50cc скутер со диск сопирачка напред и класичен изглед.",
    description:
      "Hamachi Ibiza е шармантен ретро скутер со едноцилиндричен четиритактен мотор, воздушно ладење и предна диск сопирачка. Стилски и практичен избор за градот, со резервоар од 5L.",
    variants: [{ cc: 50, price: 1590 }],
    images: ["/moto/hamachi-ibiza/1.jpg"],
    features: ["4-тактен мотор", "Ретро дизајн", "Предна диск сопирачка", "Воздушно ладење"],
  },
  {
    slug: "8m-charger",
    name: "Hamachi 8M Charger",
    category: "scooter",
    year: 2025,
    shortDesc: "Спортски водено-ладен 2-тактен скутер со диск сопирачки.",
    description:
      "8M Charger е спортски скутер со водено-ладен двотактен мотор од 4.3 КС, хидраулични диск сопирачки напред и назад и агресивен дизајн. Резервоар од 6.3L за динамично градско возење.",
    variants: [{ cc: 50, price: 2050 }],
    images: ["/moto/8m-charger/1.jpg", "/moto/8m-charger/2.jpg", "/moto/8m-charger/3.jpg"],
    features: ["4.3 КС", "Водено ладење", "Диск сопирачки", "Спортски дизајн"],
  },
  {
    slug: "milan-3",
    name: "Hamachi Milan 3",
    category: "scooter",
    year: 2025,
    shortDesc: "Класичен компактен 50cc скутер по пристапна цена.",
    description:
      "Milan 3 е класичен компактен градски скутер — едноставен, економичен и лесен за управување. Идеален избор за првиот скутер и секојдневна градска употреба.",
    variants: [{ cc: 50, price: 1280 }],
    images: ["/moto/milan-3/1.jpg", "/moto/milan-3/2.jpg", "/moto/milan-3/3.jpg"],
    features: ["4-тактен мотор", "Класичен дизајн", "Економичен", "Лесно управување"],
  },
  {
    slug: "hmc-flash-50",
    name: "HMC Flash 50",
    category: "scooter",
    year: 2025,
    shortDesc: "Лесен и агилен 50cc скутер со ниска потрошувачка.",
    description:
      "HMC Flash 50 е лесен градски скутер со едноцилиндричен четиритактен мотор, воздушно ладење и тежина од само 80кг. Резервоар од 6.3L и агилно управување — совршен за градските улици.",
    variants: [{ cc: 50, price: 1150 }],
    images: ["/moto/hmc-flash-50/1.jpg", "/moto/hmc-flash-50/2.jpg", "/moto/hmc-flash-50/3.jpg"],
    features: ["4-тактен мотор", "Лесна тежина 80кг", "Воздушно ладење", "Економичен"],
  },
  {
    slug: "evoc-ii",
    name: "Hamachi EVOC 2 50-4T",
    category: "scooter",
    year: 2025,
    shortDesc: "Модерен 50cc четиритактен скутер за сигурен градски транспорт.",
    description:
      "EVOC 2 50-4T е модерен градски скутер со едноцилиндричен четиритактен мотор од 3.8 КС, воздушно ладење и електрично и кик палење. Сигурен, економичен и практичен за секојдневна употреба.",
    variants: [{ cc: 50, price: 1590 }],
    images: ["/moto/evoc-ii/1.jpg", "/moto/evoc-ii/2.jpg"],
    features: ["3.8 КС", "4-тактен мотор", "Воздушно ладење", "Електрично + кик палење"],
  },

  // ── SCOOTER / MAXI-SCOOTER ───────────────────────────────────────────────
  {
    slug: "hmc-adv-200",
    name: "Hamachi ADV 200",
    category: "scooter",
    year: 2025,
    shortDesc: "Адвенчер-стил макси-скутер со висок став и долг ход на амортизери.",
    description:
      "ADV 200 е макси-скутер со авантуристички карактер — висок клиренс, долг ход на вешањето и доминантен став на патот. Резервоар од 7.2L и удобно седиште на 830mm го прават подеднакво добар за градот и за подолги релации.",
    variants: [{ cc: 200, price: 2350 }],
    images: [
      "/moto/hmc-adv-200/1.jpg",
      "/moto/hmc-adv-200/2.jpg",
      "/moto/hmc-adv-200/3.jpg",
    ],
    features: ["Адвенчер дизајн", "Резервоар 7.2L", "Преден и заден амортизер", "Диск сопирачки"],
  },
  {
    slug: "hamachi-qmax",
    name: "Hamachi QMAX 150",
    category: "scooter",
    year: 2025,
    shortDesc: "Комотен 150cc макси-скутер за секојдневно градско возење.",
    description:
      "QMAX 150 е макси-скутер создаден за удобност и практичност — автоматски CVT менувач, простран простор за товар и мирно возење низ градот. Достапен и на рати.",
    variants: [{ cc: 150, price: 2090 }],
    images: [
      "/moto/hamachi-qmax/1.jpg",
      "/moto/hamachi-qmax/2.jpg",
      "/moto/hamachi-qmax/3.jpg",
    ],
    features: ["CVT менувач", "Простор за товар", "4-тактен мотор", "Удобно седиште"],
  },
  {
    slug: "sym-fiddle-iii-50",
    name: "SYM Fiddle III 50",
    category: "scooter",
    year: 2025,
    shortDesc: "Ретро градски скутер од 50cc со класични линии и диск сопирачки.",
    description:
      "Fiddle III 50 го спојува шармантниот ретро дизајн со модерна техника — четиритактен мотор со воздушно ладење, CVT менувач и предна и задна диск сопирачка. Идеален и стилски избор за градот.",
    variants: [{ cc: 50, price: 1890 }],
    images: [
      "/moto/sym-fiddle-iii-50/1.jpg",
      "/moto/sym-fiddle-iii-50/2.jpg",
    ],
    features: ["Ретро дизајн", "Диск сопирачки", "CVT менувач", "Резервоар 6.2L"],
  },
  {
    slug: "sym-jet-14",
    name: "SYM Jet 14 200 ABS",
    category: "scooter",
    year: 2025,
    shortDesc: "Спортски градски скутер со водено ладење, ABS и 14-инчни тркала.",
    description:
      "Jet 14 200 ABS е агилен и спортски градски скутер со водено ладен мотор, EFI и Euro 5 стандард. Со ABS сопирачки, 14-инчни тркала, LED светло и дигитален дисплеј — сигурен и модерен избор за динамично возење.",
    variants: [{ cc: 200, price: 3300 }],
    images: [
      "/moto/sym-jet-14/1.jpg",
      "/moto/sym-jet-14/2.jpg",
      "/moto/sym-jet-14/3.jpg",
    ],
    features: ["ABS сопирачки", "Водено ладење", "14-инчни тркала", "LED светло"],
    isNew: true,
  },

  // ── ADVENTURE ────────────────────────────────────────────────────────────
  {
    slug: "xdv-300",
    name: "Hamachi XDV 300",
    category: "adventure",
    year: 2025,
    shortDesc: "Адвенчер макси-скутер со водено ладење, 300cc.",
    description:
      "XDV 300 е авантуристички макси-скутер инспириран од големите адвенчер модели — 300cc мотор со водено ладење, висок клиренс и доминантен став на патот.",
    variants: [{ cc: 300, price: 3290 }],
    images: ["/moto/xdv-300/1.jpg"],
    features: ["Водено ладење", "Висок клиренс", "LED светла", "Адвенчер дизајн"],
    featured: true,
    isNew: true,
  },
  {
    slug: "zontes-368-g",
    name: "Zontes 368 G",
    category: "adventure",
    year: 2025,
    shortDesc: "Адвенчер-турер со 368cc, TFT дисплеј и двоканален ABS.",
    description:
      "Zontes 368 G е богато опремен адвенчер-турер со едноцилиндричен 368cc мотор (38.8 КС, 40 Nm), водено-масно ладење и двоканален ABS. Со TFT дисплеј во боја, целосно LED осветлување и резервоар од 17.5L — подготвен за долги авантури.",
    variants: [{ cc: 368, price: 6290 }],
    images: [
      "/moto/zontes-368-g/siva.jpg",
      "/moto/zontes-368-g/kafeava.jpg",
      "/moto/zontes-368-g/zelena.jpg",
      "/moto/zontes-368-g/crna.jpg",
    ],
    colors: [
      { name: "Сива", hex: "#c4c7ca", image: "/moto/zontes-368-g/siva.jpg" },
      { name: "Кафеава", hex: "#a68b6a", image: "/moto/zontes-368-g/kafeava.jpg" },
      { name: "Зелена", hex: "#6a7860", image: "/moto/zontes-368-g/zelena.jpg" },
      { name: "Црна", hex: "#262626", image: "/moto/zontes-368-g/crna.jpg" },
    ],
    features: ["38.8 КС", "Двоканален ABS", "TFT дисплеј", "Резервоар 17.5L"],
    featured: true,
  },
  {
    slug: "zontes-368-k",
    name: "Zontes 368 K",
    category: "scooter",
    year: 2025,
    shortDesc: "Луксузен туринг макси-скутер со 368cc, висока заштита од ветар и ABS.",
    description:
      "Zontes 368 K е луксузен туринг макси-скутер на 368 платформата — 368cc едноцилиндричен мотор со водено ладење, висока заштита од ветар и удобна туринг позиција. Со TFT дисплеј во боја, двоканален ABS и целосно LED осветлување — создаден за релаксирани долги релации.",
    variants: [{ cc: 368, price: 5490 }],
    images: [
      "/moto/zontes-368-k/siva.jpg",
      "/moto/zontes-368-k/crna.jpg",
    ],
    colors: [
      { name: "Сива", hex: "#b8bcc0", image: "/moto/zontes-368-k/siva.jpg" },
      { name: "Црна", hex: "#232323", image: "/moto/zontes-368-k/crna.jpg" },
    ],
    features: ["Туринг макси-скутер", "Двоканален ABS", "TFT дисплеј", "Висока заштита од ветар"],
  },
  {
    slug: "kove-500x",
    name: "Kove 500X",
    category: "adventure",
    year: 2025,
    shortDesc: "471cc паралелен твин адвенчер-турер за долги релации на пат и терен.",
    description:
      "Kove 500X е лесен и способен адвенчер-турер со 471cc двоцилиндричен водено-ладен мотор (~54 КС), Bosch EFI и резервоар од 21L. Со тежина од само 149кг нуди беспрекорна контрола и на асфалт и на макадам — вистински партнер за долги авантури.",
    variants: [{ cc: 471, price: 4990 }],
    images: [
      "/moto/kove-500x/1.jpg",
      "/moto/kove-500x/2.jpg",
      "/moto/kove-500x/3.jpg",
    ],
    features: ["~54 КС", "Паралелен твин", "Bosch EFI", "Резервоар 21L"],
    featured: true,
  },
  {
    slug: "cyclone-rx401",
    name: "Cyclone RX401",
    category: "adventure",
    year: 2025,
    shortDesc: "400cc паралелен твин адвенчер со инјекција и турер ергономија.",
    description:
      "Cyclone RX401 е адвенчер-турер со 400cc водено-ладен паралелен твин со инјекција (~45 КС), долг ход на вешањето и резервоар од 20.5L. Удобната позиција и висината на седиштето од 815mm го прават погоден за подолги патувања.",
    variants: [{ cc: 400, price: 4500 }],
    images: [
      "/moto/cyclone-rx401/1.jpg",
      "/moto/cyclone-rx401/2.jpg",
      "/moto/cyclone-rx401/3.jpg",
    ],
    features: ["~45 КС", "Паралелен твин", "Инјекција (EFI)", "Резервоар 20.5L"],
  },

  // ── STREET / CRUISER (голема класа) ──────────────────────────────────────
  {
    slug: "zontes-703f",
    name: "Zontes 703F",
    category: "adventure",
    year: 2025,
    shortDesc: "Адвенчер-турер од средната класа со двоканален ABS, TFT дисплеј и спицасти тркала.",
    description:
      "Zontes 703F е адвенчер-турер од средната класа — водено-ладен мотор од 700-класа, двоканален ABS, целосно LED осветлување и TFT дисплеј во боја. Со високо ветробранско стакло, спицасти тркала и голем резервоар подготвен е за долги авантури на асфалт и терен.",
    variants: [{ cc: 700, price: 7990 }],
    images: [
      "/moto/zontes-703f/nardo.jpg",
      "/moto/zontes-703f/white-red.jpg",
      "/moto/zontes-703f/black-gold.jpg",
      "/moto/zontes-703f/blue-orange.jpg",
    ],
    colors: [
      { name: "Nardo сива / Сина", hex: "#8f979e", image: "/moto/zontes-703f/nardo.jpg" },
      { name: "Бела / Црвена", hex: "#d9d9d9", image: "/moto/zontes-703f/white-red.jpg" },
      { name: "Црна / Златна", hex: "#2a2a2a", image: "/moto/zontes-703f/black-gold.jpg" },
      { name: "Сина / Портокалова", hex: "#3f5f8a", image: "/moto/zontes-703f/blue-orange.jpg" },
    ],
    features: ["Адвенчер-турер", "Двоканален ABS", "TFT дисплеј", "Спицасти тркала"],
    featured: true,
  },
  {
    slug: "kove-500f",
    name: "Kove 500F",
    category: "naked",
    year: 2025,
    shortDesc: "471cc паралелен твин скрамблер-нејкед со ретро карактер.",
    description:
      "Kove 500F е ретро скрамблер-нејкед со 471cc двоцилиндричен водено-ладен мотор (~54 КС) и Bosch EFI. Класичниот кружен LED фар, минималистичките линии и лесната шасија нудат забавно и агилно возење и во град и на отворен пат.",
    variants: [{ cc: 471, price: 5502 }],
    images: [
      "/moto/kove-500f/1.jpg",
      "/moto/kove-500f/2.jpg",
    ],
    features: ["~54 КС", "Паралелен твин", "Bosch EFI", "Скрамблер дизајн"],
  },
  {
    slug: "hmc-v400",
    name: "HMC V400",
    category: "naked",
    year: 2025,
    shortDesc: "400cc водено-ладен V-твин чопер со двојни предни дискови и ABS.",
    description:
      "HMC V400 е чопер со карактер — 400cc водено-ладен V-twin мотор (~32 КС), двојни предни диск сопирачки и заден двоканален ABS. Ниското седиште на 710mm и класичниот крузер став нудат релаксирано и уверливо возење.",
    variants: [{ cc: 400, price: 4290 }],
    images: [
      "/moto/hmc-v400/1.jpg",
      "/moto/hmc-v400/2.jpg",
      "/moto/hmc-v400/3.jpg",
    ],
    features: ["V-твин мотор", "Водено ладење", "Двоканален ABS", "Ниско седиште 710mm"],
  },
  {
    slug: "hamachi-cruiser-250",
    name: "Hamachi Cruiser 250",
    category: "naked",
    year: 2025,
    shortDesc: "Пристапен 250cc крузер со воздушно ладење и класичен став.",
    description:
      "Hamachi Cruiser 250 е идеален влезен крузер — 250cc воздушно ладен едноцилиндричен мотор (~17.6 КС), електрично палење и удобна крузер позиција. Класичен изглед и достапна цена за уживање на отворен пат.",
    variants: [{ cc: 250, price: 2190 }],
    images: ["/moto/hamachi-cruiser-250/1.jpg"],
    features: ["~17.6 КС", "Воздушно ладење", "Електрично палење", "Крузер дизајн"],
  },

  // ── ATV / QUAD ───────────────────────────────────────────────────────────
  {
    slug: "mikilon-hammer-300",
    name: "ATV Mikilon Hammer 300 Touring",
    category: "atv",
    year: 2025,
    shortDesc: "300cc туринг квад со автоматски менувач и носачи за товар.",
    description:
      "Mikilon Hammer 300 Touring е робустен туринг квад со 300cc мотор, автоматски менувач и електрично палење. Предните и задните носачи за товар го прават подеднакво погоден за рекреација и за лесна работа на терен.",
    variants: [{ cc: 300, price: 3999 }],
    images: ["/moto/mikilon-hammer-300/1.jpg"],
    features: ["Автоматски менувач", "Електрично палење", "Носачи за товар", "Туринг квад"],
  },

  // ── ДОПОЛНИТЕЛНИ МОДЕЛИ (Hamachi/HMC/Zontes 2025–2026) ──────────────────
  {
    slug: "hamachi-angel",
    name: "Hamachi Angel",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Спортски 50cc скутер со динамичен став за град.",
    description:
      "Angel е лесен и агилен спортски скутер со четиритактен мотор и воздушно ладење — економичен избор за секојдневно градско возење и првите километри на две тркала.",
    variants: [{ cc: 50, price: 1150 }],
    images: ["/moto/hamachi-angel/1.jpg", "/moto/hamachi-angel/2.jpg", "/moto/hamachi-angel/3.jpg", "/moto/hamachi-angel/4.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Спортски дизајн", "LED детали"],
  },
  {
    slug: "dragon-a8",
    name: "Hamachi Dragon A8 4T",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Спортски 50cc скутер со агресивни линии.",
    description:
      "Dragon A8 4T е спортски скутер со изразит дизајн, четиритактен мотор и ниска потрошувачка — забавен и практичен за градот.",
    variants: [{ cc: 50, price: 1490 }],
    images: ["/moto/dragon-a8/1.jpg", "/moto/dragon-a8/2.jpg", "/moto/dragon-a8/3.jpg", "/moto/dragon-a8/4.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Спортски дизајн", "Простор под седиште"],
  },
  {
    slug: "hamachi-jog-3",
    name: "Hamachi Jog 3",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Компактен 50cc скутер за секојдневна употреба.",
    description:
      "Jog 3 е лесен градски скутер со докажан четиритактен мотор — економичен, сигурен и лесен за управување низ градската гужва.",
    variants: [{ cc: 50, price: 1090 }],
    images: ["/moto/hamachi-jog-3/1.jpg", "/moto/hamachi-jog-3/2.jpg", "/moto/hamachi-jog-3/3.jpg", "/moto/hamachi-jog-3/4.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Компактен", "Економичен"],
  },
  {
    slug: "hmc-r9",
    name: "HMC R9",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Спортски 50cc скутер со модерен дизајн.",
    description:
      "R9 нуди спортски изглед и сигурен четиритактен мотор со воздушно ладење — динамичен избор за млади возачи во градот.",
    variants: [{ cc: 50, price: 1390 }],
    images: ["/moto/hmc-r9/1.jpg", "/moto/hmc-r9/2.jpg", "/moto/hmc-r9/3.jpg", "/moto/hmc-r9/4.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Спортски дизајн", "LED детали"],
  },
  {
    slug: "hmc-grace-v5",
    name: "HMC Grace V5",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Ретро 50cc скутер со елегантен, класичен шарм.",
    description:
      "Grace V5 спојува безвременски ретро дизајн со модерна практичност — четиритактен мотор, удобна позиција и стил што се издвојува.",
    variants: [{ cc: 50, price: 1590 }],
    images: ["/moto/hmc-grace-v5/1.jpg", "/moto/hmc-grace-v5/2.jpg", "/moto/hmc-grace-v5/3.jpg", "/moto/hmc-grace-v5/4.jpg"],
    features: ["4-тактен мотор", "Воздушно ладење", "Ретро дизајн", "Простор под седиште"],
  },
  {
    slug: "dragon-a9-2t",
    name: "Hamachi Dragon A9 2T",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Двотактен 50cc скутер со жива динамика.",
    description:
      "Dragon A9 2T е лесен двотактен скутер со брза реакција и минимално одржување — директен и забавен за градско возење.",
    variants: [{ cc: 50, price: 1190 }],
    images: ["/moto/dragon-a9-2t/1.jpg", "/moto/dragon-a9-2t/2.jpg", "/moto/dragon-a9-2t/3.jpg", "/moto/dragon-a9-2t/4.jpg"],
    features: ["2-тактен мотор", "Воздушно ладење", "Лесна тежина", "Електрично + кик палење"],
  },
  {
    slug: "hamachi-evoc-125",
    name: "Hamachi EVOC 125",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Спортски 125cc скутер со футуристички дизајн.",
    description:
      "EVOC 125 го носи препознатливиот футуристички став на EVOC серијата во посилна класа од 125cc — динамичен и практичен за секој ден.",
    variants: [{ cc: 125, price: 1640 }],
    images: ["/moto/hamachi-evoc-125/1.jpg", "/moto/hamachi-evoc-125/2.jpg", "/moto/hamachi-evoc-125/3.jpg", "/moto/hamachi-evoc-125/4.jpg"],
    features: ["125cc 4-тактен мотор", "Воздушно ладење", "Спортски дизајн", "LED светла"],
  },
  {
    slug: "imola-125",
    name: "Hamachi Imola 125",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Комплетно опремен 125cc скутер за секојдневие.",
    description:
      "Imola 125 е модерен градски скутер со четиритактен мотор од 125cc, богата опрема и удобство за подолги релации.",
    variants: [{ cc: 125, price: 2190 }],
    images: ["/moto/imola-125/1.jpg", "/moto/imola-125/2.jpg", "/moto/imola-125/3.jpg", "/moto/imola-125/4.jpg"],
    features: ["125cc 4-тактен мотор", "LED светла", "Дигитален дисплеј", "Простор под седиште"],
  },
  {
    slug: "hmc-adv-150",
    name: "HMC ADV 150",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Адвенчер макси-скутер од 150cc со висок став.",
    description:
      "ADV 150 комбинира адвенчер естетика со практичноста на скутер — висок клиренс, заштита од ветер и четиритактен мотор за град и отворен пат.",
    variants: [{ cc: 150, price: 2390 }],
    images: ["/moto/hmc-adv-150/1.jpg", "/moto/hmc-adv-150/2.jpg", "/moto/hmc-adv-150/3.jpg", "/moto/hmc-adv-150/4.jpg"],
    features: ["150cc 4-тактен мотор", "ADV дизајн", "LED светла", "Голем предводобран"],
  },
  {
    slug: "hmc-nvh-125",
    name: "HMC NVH 125",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Компактен 125cc макси-скутер за градот.",
    description:
      "NVH 125 е практичен скутер од средна класа со четиритактен мотор од 125cc — удобен, економичен и лесен за секојдневна употреба.",
    variants: [{ cc: 125, price: 1790 }],
    images: ["/moto/hmc-nvh-125/1.jpg", "/moto/hmc-nvh-125/2.jpg"],
    features: ["125cc 4-тактен мотор", "LED светла", "Простор под седиште", "Економичен"],
  },
  {
    slug: "hmc-vampire-200",
    name: "HMC Vampire 200",
    category: "scooter",
    year: 2025,
    shortDesc:
      "Моќен 200cc макси-скутер за подолги релации.",
    description:
      "Vampire 200 нуди перформанси и удобство на макси-скутер класата — мотор од 200cc, богата опрема и заштита за долги патувања.",
    variants: [{ cc: 200, price: 2790 }],
    images: ["/moto/hmc-vampire-200/1.jpg", "/moto/hmc-vampire-200/2.jpg", "/moto/hmc-vampire-200/3.jpg", "/moto/hmc-vampire-200/4.jpg"],
    features: ["200cc мотор", "LED светла", "Дигитален дисплеј", "Голем товарен простор"],
  },
  {
    slug: "hmc-galaxy-pro-125",
    name: "HMC Galaxy Pro 125",
    category: "naked",
    year: 2025,
    shortDesc:
      "Спортски 125cc нејкед со модерна опрема.",
    description:
      "Galaxy Pro 125 спојува спортски дизајн со практичност — четиритактен мотор од 125cc, LED светла и дигитален инструмент.",
    variants: [{ cc: 125, price: 1350 }],
    images: ["/moto/hmc-galaxy-pro-125/1.jpg", "/moto/hmc-galaxy-pro-125/2.jpg", "/moto/hmc-galaxy-pro-125/3.jpg", "/moto/hmc-galaxy-pro-125/4.jpg"],
    features: ["125cc 4-тактен мотор", "LED светла", "Дигитален дисплеј", "Спортска позиција"],
  },
  {
    slug: "hmc-krs-200",
    name: "HMC KRS 200",
    category: "naked",
    year: 2025,
    shortDesc:
      "Нејкед мотор од 200cc со агресивен став.",
    description:
      "KRS 200 е динамичен нејкед за град и отворен пат — мотор од 200cc, спортска геометрија и модерна опрема.",
    variants: [{ cc: 200, price: 1350 }],
    images: ["/moto/hmc-krs-200/1.jpg", "/moto/hmc-krs-200/2.jpg", "/moto/hmc-krs-200/3.jpg", "/moto/hmc-krs-200/4.jpg"],
    features: ["200cc мотор", "LED светла", "Дигитален дисплеј", "Спортска позиција"],
  },
  {
    slug: "hamachi-buccaner-250",
    name: "Hamachi Buccaner 250-V",
    category: "naked",
    year: 2025,
    shortDesc:
      "V-твин крусер-нејкед од 250cc со карактер.",
    description:
      "Buccaner 250-V носи препознатлив крусер став со мотор од 250cc — удобна позиција, ниска линија на седиштето и стил што се памети.",
    variants: [{ cc: 250, price: 3090 }],
    images: ["/moto/hamachi-buccaner-250/1.jpg", "/moto/hamachi-buccaner-250/2.jpg", "/moto/hamachi-buccaner-250/3.jpg", "/moto/hamachi-buccaner-250/4.jpg"],
    features: ["250cc мотор", "Крусер дизајн", "LED светла", "Ниска висина на седиште"],
  },
  {
    slug: "hamachi-gts-280",
    name: "Hamachi GTS 280",
    category: "naked",
    year: 2025,
    shortDesc:
      "Спортски нејкед од 280cc за динамично возење.",
    description:
      "GTS 280 е моќен нејкед од средна класа — мотор од 280cc, спортска геометрија и модерна опрема за уверливи перформанси.",
    variants: [{ cc: 280, price: 2290 }],
    images: ["/moto/hamachi-gts-280/1.jpg", "/moto/hamachi-gts-280/2.jpg", "/moto/hamachi-gts-280/3.jpg", "/moto/hamachi-gts-280/4.jpg"],
    features: ["280cc мотор", "LED светла", "Дигитален дисплеј", "Спортска позиција"],
  },
  {
    slug: "hamachi-alien-monster-300",
    name: "Hamachi Alien Monster 300",
    category: "naked",
    year: 2026,
    shortDesc:
      "Агресивен нејкед стритфајтер од 300cc.",
    description:
      "Alien Monster 300 е впечатлив стритфајтер со остар дизајн и мотор од 300cc — создаден за оние што бараат став и перформанси на градските улици.",
    variants: [{ cc: 300, price: 3590 }],
    images: ["/moto/hamachi-alien-monster-300/1.jpg", "/moto/hamachi-alien-monster-300/2.jpg", "/moto/hamachi-alien-monster-300/3.jpg", "/moto/hamachi-alien-monster-300/4.jpg"],
    features: ["300cc мотор", "LED светла", "Дигитален дисплеј", "Стритфајтер дизајн"],
    isNew: true,
    featured: true,
  },
  {
    slug: "hamachi-rs310",
    name: "Hamachi RS310",
    category: "naked",
    year: 2025,
    shortDesc:
      "Спортски нејкед од 310cc со модерна линија.",
    description:
      "RS310 е динамичен нејкед од средната класа — мотор од 310cc, спортска ергономија и комплетна LED опрема за секојдневно уживање.",
    variants: [{ cc: 310, price: 2490 }],
    images: ["/moto/hamachi-rs310/1.jpg", "/moto/hamachi-rs310/2.jpg", "/moto/hamachi-rs310/3.jpg", "/moto/hamachi-rs310/4.jpg"],
    features: ["310cc мотор", "LED светла", "Дигитален дисплеј", "Спортска позиција"],
  },
  {
    slug: "hamachi-tekken-325",
    name: "Hamachi Tekken 325",
    category: "naked",
    year: 2026,
    shortDesc:
      "Најсилниот Tekken — нејкед стрит од 325cc.",
    description:
      "Tekken 325 2026 е врвот на Tekken серијата: мотор од 325cc, агресивен нејкед дизајн и модерна опрема за отворен пат и град.",
    variants: [{ cc: 325, price: 2590 }],
    images: ["/moto/hamachi-tekken-325/1.jpg", "/moto/hamachi-tekken-325/2.jpg", "/moto/hamachi-tekken-325/3.jpg", "/moto/hamachi-tekken-325/4.jpg"],
    features: ["325cc мотор", "LED светла", "Дигитален дисплеј", "Спортска позиција"],
    isNew: true,
  },
  {
    slug: "hmc-150gy-18",
    name: "HMC 150GY-18 Pro",
    category: "enduro",
    year: 2025,
    shortDesc:
      "Ендуро од 150cc со тркала од 18/21 инчи.",
    description:
      "150GY-18 Pro е лесен и издржлив ендуро мотор со висок клиренс и долг ход на амортизерите — идеален за терен и макадам.",
    variants: [{ cc: 150, price: 1300 }],
    images: ["/moto/hmc-150gy-18/1.jpg", "/moto/hmc-150gy-18/2.jpg", "/moto/hmc-150gy-18/3.jpg", "/moto/hmc-150gy-18/4.jpg"],
    features: ["150cc 4-тактен мотор", "Висок клиренс", "Теренски гуми", "Долг ход на вилушка"],
  },
  {
    slug: "hmc-200gy-18",
    name: "HMC 200GY-18 Pro",
    category: "enduro",
    year: 2025,
    shortDesc:
      "Универзален ендуро од 200cc за терен и пат.",
    description:
      "200GY-18 Pro нуди повеќе моќ и стабилност со мотор од 200cc, висок клиренс и издржливо шасе — подготвен за посериозни теренски авантури.",
    variants: [{ cc: 200, price: 1390 }],
    images: ["/moto/hmc-200gy-18/1.jpg", "/moto/hmc-200gy-18/2.jpg", "/moto/hmc-200gy-18/3.jpg", "/moto/hmc-200gy-18/4.jpg"],
    features: ["200cc 4-тактен мотор", "Висок клиренс", "Теренски гуми", "Издржливо шасе"],
  },
  {
    slug: "hmc-250-18l",
    name: "HMC 250-18L",
    category: "enduro",
    year: 2025,
    shortDesc:
      "Ендуро од 250cc со долг ход и висок клиренс.",
    description:
      "250-18L е моќен ендуро за посериозни терени — мотор од 250cc, долг ход на амортизерите и издржлива конструкција.",
    variants: [{ cc: 250, price: 1490 }],
    images: ["/moto/hmc-250-18l/1.jpg", "/moto/hmc-250-18l/2.jpg", "/moto/hmc-250-18l/3.jpg", "/moto/hmc-250-18l/4.jpg"],
    features: ["250cc 4-тактен мотор", "Висок клиренс", "Долг ход на амортизери", "Теренски гуми"],
  },
  {
    slug: "hmc-enduromax-200",
    name: "HMC EnduroMax 200",
    category: "enduro",
    year: 2026,
    shortDesc:
      "Модерен ендуро од 200cc со агресивен дизајн.",
    description:
      "EnduroMax 200 (2026) е нова генерација ендуро со освежен дизајн, мотор од 200cc и опрема подготвена за секаков терен.",
    variants: [{ cc: 200, price: 1590 }],
    images: ["/moto/hmc-enduromax-200/1.jpg", "/moto/hmc-enduromax-200/2.jpg", "/moto/hmc-enduromax-200/3.jpg", "/moto/hmc-enduromax-200/4.jpg"],
    features: ["200cc 4-тактен мотор", "Висок клиренс", "LED светла", "Долг ход на вилушка"],
    isNew: true,
  },
  {
    slug: "hmc-enduromax-250",
    name: "HMC EnduroMax 250",
    category: "enduro",
    year: 2026,
    shortDesc:
      "Најсилниот EnduroMax — 250cc за секаков терен.",
    description:
      "EnduroMax 250 (2026) е врвот на серијата: мотор од 250cc, нов дизајн и издржлива конструкција за бескомпромисни теренски перформанси.",
    variants: [{ cc: 250, price: 1690 }],
    images: ["/moto/hmc-enduromax-250/1.jpg", "/moto/hmc-enduromax-250/2.jpg", "/moto/hmc-enduromax-250/3.jpg", "/moto/hmc-enduromax-250/4.jpg"],
    features: ["250cc 4-тактен мотор", "Висок клиренс", "LED светла", "Долг ход на амортизери"],
    isNew: true,
    featured: true,
  },
  {
    slug: "zontes-703rr",
    name: "Zontes 703 RR",
    category: "naked",
    year: 2026,
    shortDesc:
      "Спортски мотор од 700cc со полна оплата.",
    description:
      "Zontes 703 RR е врвен спортски мотор со трицилиндричен мотор од 700cc, полна аеродинамична оплата и премиум опрема — за возачи што бараат перформанси и престиж.",
    variants: [{ cc: 700, price: 8390 }],
    images: ["/moto/zontes-703rr/silver-blue.jpg", "/moto/zontes-703rr/white-red.jpg"],
    colors: [
      { name: "SILVER BLUE", hex: "#c3ccd4", image: "/moto/zontes-703rr/silver-blue.jpg" },
      { name: "WHITE RED", hex: "#dcdcdc", image: "/moto/zontes-703rr/white-red.jpg" },
    ],
    features: ["700cc трицилиндричен мотор", "Полна оплата", "TFT дисплеј", "Premium суспензија"],
    isNew: true,
    featured: true,
  },
  {
    slug: "hm-300-atv",
    name: "Hamachi HM 300 ATV",
    category: "atv",
    year: 2025,
    shortDesc:
      "Четиритркач од 300cc за работа и авантура.",
    description:
      "HM 300 е робустен ATV со мотор од 300cc — способен на терен, со издржливо шасе и голема носивост за работа и рекреација.",
    variants: [{ cc: 300, price: 2890 }],
    images: ["/moto/hm-300-atv/1.jpg", "/moto/hm-300-atv/2.jpg", "/moto/hm-300-atv/3.jpg", "/moto/hm-300-atv/4.jpg"],
    features: ["300cc мотор", "4x2 погон", "Издржливо шасе", "Теренски гуми"],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────
export function getMotorcycle(slug: string): Motorcycle | undefined {
  return motorcycles.find((m) => m.slug === slug);
}

/** Brand name, taken from the first token of the model name. HMC (Hamachi
 * Motor Company) is the same brand as Hamachi, so it's normalised. */
export function motoBrand(m: Motorcycle): string {
  const first = m.name.split(" ")[0];
  return first === "HMC" ? "Hamachi" : first;
}

/** Distinct brands present in the catalogue, in a sensible display order. */
export const BRANDS: string[] = (() => {
  const seen = Array.from(new Set(motorcycles.map(motoBrand)));
  const order = ["Hamachi", "Suzuki", "SYM", "Zontes", "Q", "SFA"];
  return seen.sort(
    (a, b) =>
      (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) -
      (order.indexOf(b) === -1 ? 99 : order.indexOf(b))
  );
})();

/** "125cc / 300cc" badge string from a motorcycle's variants. */
export function variantBadge(m: Motorcycle): string {
  return m.variants.map((v) => `${v.cc}cc`).join(" / ");
}

/** Lowest price across variants, or undefined if none priced. */
export function fromPrice(m: Motorcycle): number | undefined {
  const prices = m.variants.map((v) => v.price).filter((p): p is number => typeof p === "number");
  return prices.length ? Math.min(...prices) : undefined;
}

export function relatedMotorcycles(m: Motorcycle, count = 3): Motorcycle[] {
  return motorcycles
    .filter((x) => x.slug !== m.slug)
    .sort((a, b) => (a.category === m.category ? -1 : 0) - (b.category === m.category ? -1 : 0))
    .slice(0, count);
}
