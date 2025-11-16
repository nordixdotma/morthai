"use client"

import React, { useState, useEffect, useRef } from "react"

const cards = [
  {
    title: "Our Mission",
    content:
      "Our mission is to offer you the most beautiful relaxing experience upon your arrival, by offering you not just a massage, but a journey towards well-being and peace. We focus on the quality of treatments and products, respect for hygiene and tranquility — exactly what our guests are looking for.",
  },
  {
    title: "Our Values",
    content:
      "We are a team rooted in Thai and Moroccan cultures who share the same passion – creating unique experiences of relaxation through small details. Passionate about well-being, we inspire and motivate our team so our guests return time and time again.",
  },
  {
    title: "Our Vision",
    content:
      "Become a benchmark spa in Morocco offering relaxing and therapeutic treatments using ancestral techniques revisited by expert Thai therapists.",
  },
]

export default function LatestArticlesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

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

  return (
    <section
      ref={sectionRef}
      className="latest-articles-section py-16 md:py-24 overflow-hidden w-full relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-optima font-bold text-gray-900 mb-12 text-center transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          Latest Articles From Enchanting Morocco
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <article
              key={index}
              aria-labelledby={`card-${index}-title`}
              className={`group transform transition-all duration-700 ease-out rounded-md p-8 bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01]`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <h3 id={`card-${index}-title`} className="text-xl font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-prose">
                  {card.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
