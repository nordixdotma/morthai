"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "@/lib/use-translations"

export default function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const t = useTranslations()

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

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  const getDelayClass = (index: number): string => {
    const delays: { [key: number]: string } = {
      0: "transition-delay-0",
      1: "transition-delay-120",
      2: "transition-delay-240",
    }
    return delays[index] || "transition-delay-0"
  }

  return (
    <section ref={sectionRef} className="latest-articles-section py-16 md:py-24 overflow-hidden w-full relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-xl md:text-2xl font-trajan-pro font-bold text-gray-900 mb-12 text-center transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {t.homepage.features.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.homepage.features.items.map((card, index) => (
            <article
              key={index}
              className={`group transform transition-all duration-300 ease-out rounded-xl p-8 bg-white border-2 border-gray-200 hover:border-primary cursor-pointer feature-card ${getDelayClass(index)} ${isVisible ? "feature-card-visible" : "feature-card-hidden"}`}
            >
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 transition-all duration-300 ease-out">
                <h3
                  id={`card-${index}-title`}
                  className="text-xl font-semibold text-gray-900 font-trajan-pro text-primary"
                >
                  {card.title}
                </h3>
                <div>
                  <p
                    className={`text-gray-700 font-nb-international text-justify leading-relaxed max-w-prose font-lato ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    {card.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
