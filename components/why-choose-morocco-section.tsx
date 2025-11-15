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
              Why Choose Us Section
            </h2>
            <div className="text-gray-600">
              <p
                className={`mb-6 text-sm md:text-base leading-relaxed text-justify transition-all duration-1000 ease-out delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Coming soon. We are working on bringing you amazing content and experiences.
              </p>
            </div>
          </div>

          <div
            className={`md:col-span-2 aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden relative transition-all duration-1200 ease-out delay-300 flex items-center justify-center ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            <div className="text-center">
              <p className="text-gray-400 font-work-sans">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
