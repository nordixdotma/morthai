"use client"

import { useEffect, useState, useRef } from "react"

export default function LocationSection() {
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
        threshold: 0.1,
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
      className={`w-full overflow-hidden transition-all duration-1000 ease-out py-12 md:py-16 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center h-96 md:h-[450px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9622.744055174802!2d-8.011611968737366!3d31.640491233201676!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8f671516eb%3A0xe56463969bef00f6!2sMor%20Thai%20spa!5e0!3m2!1sen!2sma!4v1763206032411!5m2!1sen!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
