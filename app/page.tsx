"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/homepage/hero-section"
import MoroccoDiscoverySection from "@/components/homepage/aboutsection"
import MoroccoExpertiseSection from "@/components/homepage/servicessection"
import WhyChooseMoroccoSection from "@/components/homepage/journeysection"
import LatestArticlesSection from "@/components/homepage/featuresection"
import LocationSection from "@/components/location-section"
import Loader from "@/components/loader"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
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
