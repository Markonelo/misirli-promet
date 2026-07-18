import Hero from "@/components/Hero";
import BrandsMarquee from "@/components/BrandsMarquee";
import WhatWeOffer from "@/components/WhatWeOffer";
import SearchedMotos from "@/components/SearchedMotos";
import FindYourBike from "@/components/FindYourBike";
import ContactStrip from "@/components/ContactStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandsMarquee />
      <WhatWeOffer />
      <SearchedMotos />
      <FindYourBike />
      <ContactStrip />
    </>
  );
}
