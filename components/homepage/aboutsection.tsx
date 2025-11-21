"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "@/lib/use-translations"

export default function aboutsection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
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
    <section
      ref={sectionRef}
      className="morocco-discovery-section py-16 md:py-24 overflow-hidden w-full relative rounded-t-xl md:rounded-t-3xl"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-6xl mx-auto">
          <h2
            className={`discovery-heading font-trajan-pro text-xl md:text-3xl font-bold mb-6 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {t.homepage.about.heading}
          </h2>

          <div
            className={`flex items-center justify-center mb-8 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
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

          <div
            className={`discovery-text font-nb-international space-y-6 transition-all duration-1000 ease-out delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <p className="text-sm md:text-base leading-relaxed text-justify">{t.homepage.about.description1}</p>
              <p className="text-sm md:text-base leading-relaxed text-justify">{t.homepage.about.description2}</p>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-center font-trajan-pro font-bold">
              {t.homepage.about.conclusion}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
