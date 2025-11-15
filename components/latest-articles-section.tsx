"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const articles = [
  {
    title: "Discovering the Hidden Gems of Marrakech's Medina",
    image:
      "https://enchantingmorocco.com/wp-content/uploads/2025/07/Self%E2%80%91Drive-Adventure-Morocco-600x700.jpg.webp",
    alt: "Traditional Moroccan architecture in Marrakech medina",
  },
  {
    title: "The Art of Moroccan Cuisine: A Culinary Journey",
    image:
      "https://enchantingmorocco.com/wp-content/uploads/2025/07/Cap-Spartel-Lighthouse-Tangier-600x700.jpg.webp",
    alt: "Traditional Moroccan tagine and spices",
  },
  {
    title: "Preserving Morocco's Cultural Heritage for Future Generations",
    image:
      "https://enchantingmorocco.com/wp-content/uploads/2025/08/Taghazout-Beach-600x700.jpg.webp",
    alt: "Traditional Moroccan craftsman working on pottery",
  },
]

export default function LatestArticlesSection() {
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
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden w-full ">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-optima font-bold text-white mb-12 text-center transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Latest Articles From Enchanting Morocco
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className={`group relative bg-white overflow-hidden cursor-pointer transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay that comes from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Article title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:-translate-y-11">
                  <h3 className="text-white font-semibold text-lg leading-tight">{article.title}</h3>
                </div>

                {/* CTA button that appears on hover */}
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-none font-semibold">
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
