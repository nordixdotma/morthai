"use client"
import { useState } from "react"
import type React from "react"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useTranslations } from "@/lib/use-translations"

export default function servicessection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations()

  const items = t.homepage.services.items

  const next = () => {
    if (currentIndex < items.length - 3) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <section className="py-16 md:py-24 w-full morocco-expertise-section">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="relative pb-16">
          {/* Desktop carousel view */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex transition-transform duration-300 carousel-container"
              style={
                {
                  "--carousel-index": currentIndex,
                } as React.CSSProperties
              }
            >
              {items.map((item, itemIndex) => (
                <div key={itemIndex} className="w-1/3 flex-shrink-0 px-2">
                  <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 transition-colors duration-300 hover:border-primary/20 shadow-md hover:shadow-lg">
                    {/* Image container with improved aspect ratio */}
                    <div className="relative overflow-hidden bg-gray-100 h-64">
                      <img
                        src={`/sections/e${itemIndex + 1}.${itemIndex === 0 || itemIndex === 3 || itemIndex === 4 || itemIndex === 5 ? "webp" : "jpg"}`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content container with improved spacing and hierarchy */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Title with enhanced typography */}
                      <h3 className="text-lg font-bold mb-4 font-trajan-pro text-gray-900 leading-tight">
                        {item.title}
                      </h3>

                      {/* Decorative accent line */}
                      <div className="w-12 h-0.5 bg-primary mb-4"></div>

                      {/* Description with improved line height and color */}
                      <p className="text-sm text-gray-600 mb-6 flex-1 font-lato leading-relaxed">{item.description}</p>

                      <div className="flex justify-end">
                        <a
                          href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="px-4 py-2 bg-primary text-white font-semibold text-sm rounded-md transition-all duration-300 hover:bg-primary/90 hover:shadow-md active:scale-95 inline-flex items-center gap-2 group"
                        >
                          <span>{t.homepage.services.discover}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden grid grid-cols-2 gap-2 px-1">
            {items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="bg-white rounded-lg overflow-hidden flex flex-col h-full border border-gray-100 transition-colors duration-300 hover:border-primary/20"
              >
                {/* Image container */}
                <div className="relative overflow-hidden bg-gray-100 h-32">
                  <img
                    src={`/sections/e${itemIndex + 1}.${itemIndex === 0 || itemIndex === 3 || itemIndex === 4 || itemIndex === 5 ? "webp" : "jpg"}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content container with reduced padding on mobile */}
                <div className="p-1.5 flex-1 flex flex-col">
                  <h3 className="text-xs font-bold mb-1 font-trajan-pro text-gray-900">{item.title}</h3>

                  {/* Decorative accent line mobile */}
                  <div className="w-6 h-0.5 bg-primary mb-1"></div>

                  <p className="text-xs text-gray-600 mb-2 flex-1 font-lato leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-end">
                    <a
                      href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-2 py-2 bg-primary text-white font-semibold text-xs rounded-sm transition-all duration-300 hover:bg-primary/90 inline-flex items-center gap-1 group"
                    >
                      <span>{t.homepage.services.discover}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5 text-xs">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop carousel controls */}
          <div className="hidden md:flex absolute -bottom-0 right-3 gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={currentIndex === 0}
              aria-label="Previous item"
              className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center disabled:opacity-50 hover:bg-zinc-300 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentIndex >= items.length - 3}
              aria-label="Next item"
              className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center disabled:opacity-50 hover:bg-zinc-300 transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
