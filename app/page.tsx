import { AboutTeaser } from "@/components/home/about-teaser";
import { CompaniesSection } from "@/components/home/companies-section";
import { FeaturedDeck } from "@/components/home/featured-deck";
import { HeroScene } from "@/components/home/hero-scene";
import { VideoShowcase } from "@/components/home/video-showcase";
import { getFeaturedReelGroups } from "@/lib/reels";

export default async function HomePage() {
  const featuredGroups = await getFeaturedReelGroups();

  return (
    <>
      <HeroScene />
      <VideoShowcase />
      <CompaniesSection />
      <FeaturedDeck featuredGroups={featuredGroups} />
      <AboutTeaser />
    </>
  );
}
