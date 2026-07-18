import { SITE } from "./site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MotorcycleDealer",
    name: SITE.name,
    alternateName: SITE.nameLatin,
    description: `${SITE.name} — ${SITE.tagline} во ${SITE.city}, ${SITE.country}.`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: "MK",
    },
    sameAs: [SITE.facebook, SITE.instagram],
    brand: [
      { "@type": "Brand", name: "Hamachi" },
      { "@type": "Brand", name: "SYM" },
      { "@type": "Brand", name: "Zontes" },
      { "@type": "Brand", name: "Q" },
      { "@type": "Brand", name: "SFA" },
    ],
  };
}
