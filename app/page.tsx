"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/hero-section"
import MoroccoDiscoverySection from "@/components/morocco-discovery-section"
import MoroccoExpertiseSection from "@/components/morocco-expertise-section"
import WhyChooseMoroccoSection from "@/components/why-choose-morocco-section"
import LatestArticlesSection from "@/components/latest-articles-section"
import LocationSection from "@/components/location-section"
import Loader from "@/components/loader"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = ""
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  return (
    <>
      <Loader onLoadingComplete={() => setIsLoading(false)} />
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
