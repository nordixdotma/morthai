"use client"

import HeroSection from "@/components/hero-section"
import MoroccoDiscoverySection from "@/components/morocco-discovery-section"
import MoroccoExpertiseSection from "@/components/morocco-expertise-section"
import WhyChooseMoroccoSection from "@/components/why-choose-morocco-section"
import LatestArticlesSection from "@/components/latest-articles-section"
import LocationSection from "@/components/location-section"
import Loader from "@/components/loader"

export default function Home() {
  return (
    <>
      <Loader />
      <div className="overflow-x-hidden">
        <HeroSection />
        <MoroccoDiscoverySection />
        <MoroccoExpertiseSection />
        <WhyChooseMoroccoSection />
        <LatestArticlesSection />
        <LocationSection />
      </div>
    </>
  )
}
