import { AboutTeaser } from "@/components/home/about-teaser";
import { CompaniesSection } from "@/components/home/companies-section";
import { FeaturedDeck } from "@/components/home/featured-deck";
import { HeroScene } from "@/components/home/hero-scene";
import { VideoShowcase } from "@/components/home/video-showcase";

export default function HomePage() {
  return (
    <>
      <HeroScene />
      <VideoShowcase />
      <CompaniesSection />
      <FeaturedDeck />
      <AboutTeaser />
    </>
  );
}
