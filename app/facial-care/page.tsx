"use client"

import { useState, useEffect, useRef } from "react"
import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"
import Image from "next/image"

export default function FacialCarePage() {
  const t = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const facialCare = t.facialCare

  return (
    <main className="min-h-screen">
      <PageHeroSection title="Facial Care" />

      <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          <h2 className="font-trajan-pro text-xl md:text-2xl font-bold text-center text-[#43484e] mb-0 leading-relaxed">
            {facialCare?.heroTitle}
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          {/* Offers Section */}
          <div
            ref={sectionRef}
            className={`space-y-16 md:space-y-20 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* First Offer - Text Left, Image Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-4">
                <h3 className="font-trajan-pro text-2xl md:text-3xl font-bold text-[#43484e]">
                  {facialCare?.offers[0]?.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">
                  {facialCare?.offers[0]?.description}
                </p>
                <button className="inline-flex items-center gap-2 text-[#a87e72] font-semibold hover:text-[#8a6a5e] transition-colors">
                  {facialCare?.offers[0]?.cta} →
                </button>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/sections/e1.webp"
                  alt={facialCare?.offers[0]?.title || "Facial treatment"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Second Offer - Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center md:grid-cols-2-reverse">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                <Image
                  src="/sections/e2.jpg"
                  alt={facialCare?.offers[1]?.title || "Anti-aging facial"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 order-1 md:order-2">
                <h3 className="font-trajan-pro text-2xl md:text-3xl font-bold text-[#43484e]">
                  {facialCare?.offers[1]?.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">
                  {facialCare?.offers[1]?.description}
                </p>
                <button className="inline-flex items-center gap-2 text-[#a87e72] font-semibold hover:text-[#8a6a5e] transition-colors">
                  {facialCare?.offers[1]?.cta} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
