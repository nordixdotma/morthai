"use client"

import { useState, useEffect, useRef } from "react"
import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"
import Image from "next/image"

export default function HammamPage() {
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

  const hammam = t.hammam

  return (
    <main className="min-h-screen">
      <PageHeroSection title={t.hammam?.pageTitle || "Hammam"} />
      <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="font-trajan-pro text-xl md:text-3xl font-bold mb-6 text-[#43484e] leading-relaxed">
              {hammam?.heroTitle}
            </h2>

            <div className="flex items-center justify-center mb-8">
              <div className="separator-line"></div>
              <div className="header-separator mx-6">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40px" height="40px" viewBox="0 0 66 66">
                  <g transform="matrix(1.0000000000000009,0,0,1.0000000000000009,1.4210854715202004e-14,1.4210854715202004e-14)">
                    <g className="separator-svg">
                      <path
                        d="M44.7 17.5c1.9-1.3 4-2.5 6.1-3.4 1.6 3.8 2.5 7.7 2.8 11.5M11.9 25.4c.2-3.8 1.1-7.6 2.7-11.4 2.3 1 4.5 2.3 6.5 3.7M27.1 58.4C12.8 55.7 2 43.1 2 28c3.5 0 6.8.6 9.9 1.6 2.2.8 4.4 1.8 6.3 3M38.8 58.4C53.2 55.7 64 43.1 64 28c-3.7 0-7.2.6-10.4 1.8-2.1.7-4 1.7-5.8 2.8M33 59c14.3-14.4 14.3-37.6 0-52-7.2 7.2-10.8 16.6-10.8 26S25.8 51.8 33 59z"
                        fill="#ead9d5"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="separator-line"></div>
            </div>

            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">
                {hammam?.introDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-24">
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
                  {hammam?.offers[0]?.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">
                  {hammam?.offers[0]?.description}
                </p>
                <button className="inline-flex items-center gap-2 text-[#a87e72] font-semibold hover:text-[#8a6a5e] transition-colors">
                  {hammam?.offers[0]?.cta} →
                </button>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/sections/e4.webp"
                  alt={hammam?.offers[0]?.title || "Hammam treatment"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Second Offer - Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center md:grid-cols-2-reverse">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                <Image
                  src="/sections/e5.webp"
                  alt={hammam?.offers[1]?.title || "Hammam package"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 order-1 md:order-2">
                <h3 className="font-trajan-pro text-2xl md:text-3xl font-bold text-[#43484e]">
                  {hammam?.offers[1]?.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">
                  {hammam?.offers[1]?.description}
                </p>
                <button className="inline-flex items-center gap-2 text-[#a87e72] font-semibold hover:text-[#8a6a5e] transition-colors">
                  {hammam?.offers[1]?.cta} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
