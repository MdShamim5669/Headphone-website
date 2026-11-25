import Hero from "@/components/hero/Hero";
import Collection from "@/components/sections/Collection";
import FeaturesScroll from "@/components/sections/FeaturesScroll";
import Configurator from "@/components/sections/Configurator";
import SoundDemo from "@/components/sections/SoundDemo";
import Specs from "@/components/sections/Specs";
import Reviews from "@/components/sections/Reviews";
import Marquee from "@/components/sections/Marquee";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Collection />
      <FeaturesScroll />
      <Configurator />
      <SoundDemo />
      <Specs />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
