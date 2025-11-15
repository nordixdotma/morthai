"use client"

import HeroSection from "@/components/hero-section"
import MoroccoDiscoverySection from "@/components/morocco-discovery-section"
import MoroccoExpertiseSection from "@/components/morocco-expertise-section"
import WhyChooseMoroccoSection from "@/components/why-choose-morocco-section"
import LatestArticlesSection from "@/components/latest-articles-section"


export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <MoroccoDiscoverySection />
      <MoroccoExpertiseSection />
      <WhyChooseMoroccoSection />
      <LatestArticlesSection />
    </div>
  )
}
