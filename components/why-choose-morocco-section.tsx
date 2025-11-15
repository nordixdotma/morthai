"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WhyChooseMoroccoSection() {
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
              Why Choose Enchanting Morocco for Your Next Adventure?
            </h2>
            <div className="text-gray-600">
              <p
                className={`mb-6 text-sm md:text-base leading-relaxed text-justify transition-all duration-1000 ease-out delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Enchanting Morocco is not just another Morocco tours company—we are a team of passionate travel experts
                dedicated to helping you explore the wonders of Morocco. Our role as a trusted Moroccan tours agency
                means we provide comprehensive services, from planning and logistics to on-the-ground support, ensuring
                your experience is stress-free.
              </p>
              <p
                className={`mb-6 text-sm md:text-base leading-relaxed text-justify transition-all duration-1000 ease-out delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Whether it's your first time visiting Morocco or a return trip, we're here to make your adventure truly
                special. Discover why travelers around the world trust us as their preferred Morocco tour company by
                contacting us today.
              </p>
            </div>

            <div
              className={`mt-8 transition-all duration-1000 ease-out delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button className="bg-primary rounded-none hover:bg-primary/90 text-white px-8 py-3 font-semibold">
                Contact Us Today
              </Button>
            </div>
          </div>

          <div
            className={`md:col-span-2 aspect-[4/5] bg-gray-900 rounded-lg overflow-hidden relative transition-all duration-1200 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            <Image
              src="https://enchantingmorocco.com/wp-content/uploads/2023/03/b1.jpg.webp"
              alt="Why Choose Enchanting Morocco"
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
