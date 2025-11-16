"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, animate } from "framer-motion"

const carouselItems = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=880&auto=format&fit=crop",
    title: "Misty Mountain Majesty",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1539552678512-4005a33c64db?q=80&w=880&auto=format&fit=crop",
    title: "Winter Wonderland",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1709983966747-58c311fa6976?q=80&w=436&auto=format&fit=crop",
    title: "Autumn Mountain Retreat",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1683722319473-f851deb3fdf2?q=80&w=871&auto=format&fit=crop",
    title: "Tranquil Lake Reflection",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?q=80&w=734&auto=format&fit=crop",
    title: "Misty Mountain Peaks",
  },
  {
    id: 6,
    // fixed a small typo in the original URL (removed trailing 'v')
    url: "https://images.unsplash.com/photo-1698774303292-7af9410c3a57?q=80&w=436&auto=format&fit=crop",
    title: "Golden Hour Glow",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1643994542584-1247b5266429?q=80&w=869&auto=format&fit=crop",
    title: "Snowy Mountain Highway",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1613681230409-6423a38c43e1?q=80&w=871&auto=format&fit=crop",
    title: "Foggy Mountain Forest",
  },
]

export default function WhyChooseMoroccoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [index, setIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // observe section visibility
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
      }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // animate x when index changes
  useEffect(() => {
    if (!containerRef.current) return
    const containerWidth = (containerRef.current as HTMLDivElement).offsetWidth || 1
    const targetX = -index * containerWidth

    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    })
  }, [index, x])

  // handle resize so width stays correct
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return
      const containerWidth = (containerRef.current as HTMLDivElement).offsetWidth || 1
      const targetX = -index * containerWidth
      x.set(targetX)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [index, x])

  return (
    <section
      ref={sectionRef}
      className="why-choose-section py-16 md:py-24 overflow-hidden w-full relative bg-pattern"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* 2-column layout (50% / 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left (text) */}
          <div>
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 transition-all duration-1000 ease-out ${
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
                Experience the beauty and diversity of stunning landscapes. From majestic mountains to serene lakes, discover breathtaking views that will take your breath away.
              </p>
              <p
                className={`mb-4 text-sm md:text-base leading-relaxed text-justify transition-all duration-1000 ease-out delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                We combine local knowledge with a passion for adventure to create unforgettable experiences — tailored for every traveler.
              </p>
            </div>
          </div>

          {/* Right (carousel) - now takes 50% */}
          <div
            className={`transition-all duration-1200 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            <div className="relative overflow-hidden rounded-lg" ref={containerRef}>
              {/* sliding track */}
              <motion.div className="flex" style={{ x }}>
                {carouselItems.map((item) => (
                  <div key={item.id} className="shrink-0 w-full h-[450px]">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Prev button */}
              <motion.button
                type="button"
                aria-label="Previous"
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
                  ${
                    index === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "bg-white hover:scale-110 hover:opacity-100 opacity-70"
                  }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              {/* Next button */}
              <motion.button
                type="button"
                aria-label="Next"
                disabled={index === carouselItems.length - 1}
                onClick={() => setIndex((i) => Math.min(carouselItems.length - 1, i + 1))}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
                  ${
                    index === carouselItems.length - 1
                      ? "opacity-40 cursor-not-allowed"
                      : "bg-white hover:scale-110 hover:opacity-100 opacity-70"
                  }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Dots / progress */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/20 rounded-xl border border-white/30">
                {carouselItems.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-white" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
