"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function MoroccoDiscoverySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 font-optima transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              Discover Morocco with a Leading Morocco Tours Company
            </h2>
            <div className="text-gray-600">
              <p
                className={`mb-6 text-sm md:text-base leading-relaxed text-justify transition-all duration-1000 ease-out delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Welcome to Enchanting Morocco, your trusted partner for unforgettable travel experiences. As a premier
                Morocco tours company, we specialize in creating journeys that capture the spirit of Morocco's diverse
                landscapes, vibrant culture, and rich history.
              </p>
              <p
                className={`mb-6 text-sm md:text-base leading-relaxed text-justify transition-all duration-1000 ease-out delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                From the colorful souks of Marrakech to the golden sands of the Sahara Desert, our carefully curated
                tours offer an immersive experience like no other. Whether you're traveling for a honeymoon, planning a
                family trip, or organizing a group tour, we ensure every detail is handled with precision.
              </p>
              <p
                className={`text-sm md:text-base leading-relaxed text-justify transition-all duration-1000 ease-out delay-600 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                For insights and tips to enhance your travel planning, explore our comprehensive Morocco Travel Guide.
                As a renowned Morocco tours agency, we take pride in helping travelers discover the beauty and
                authenticity of Morocco with ease and comfort.
              </p>
            </div>

            <div
              className={`mt-8 transition-all duration-1000 ease-out delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button className="bg-primary rounded-none hover:bg-primary/90 text-white px-8 py-3 font-semibold">
                Explore Our Tours
              </Button>
            </div>
          </div>

          <div
            className={`md:col-span-2 aspect-[4/5] bg-gray-900 rounded-lg overflow-hidden relative transition-all duration-1200 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            <Image
              src="https://enchantingmorocco.com/wp-content/uploads/2025/04/morocco-desert-tours-from-marrakech.webp"
              alt="Morocco Desert Tours from Marrakech"
              fill
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />

            <div
              className={`absolute -top-4 -left-4 w-16 h-16 border-2 border-primary/40 rounded-full transition-all duration-1000 ease-out delay-1000 ${
                isVisible ? "opacity-30 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"
              }`}
            />
            <div
              className={`absolute -bottom-4 -right-4 w-12 h-12 border-2 border-primary/40 rounded-full transition-all duration-1000 ease-out delay-1200 ${
                isVisible ? "opacity-30 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
