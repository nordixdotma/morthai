"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const setHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setHeight()
    window.addEventListener("resize", setHeight)

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => {
      window.removeEventListener("resize", setHeight)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="relative bg-transparent hero-section h-screen flex items-center justify-center">

      {/* Completely New Floating Arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow cursor-pointer">
        <span className="block w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45 animate-slide-down"></span>
        <span className="block w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45 animate-slide-down delay-150"></span>
        <span className="block w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45 animate-slide-down delay-300"></span>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-4px) rotate(45deg); }
          50% { opacity: 1; transform: translateY(0) rotate(45deg); }
          100% { opacity: 0; transform: translateY(4px) rotate(45deg); }
        }
        .animate-slide-down {
          animation: slideDown 1.2s infinite;
        }
        .animate-slide-down.delay-150 {
          animation-delay: 0.15s;
        }
        .animate-slide-down.delay-300 {
          animation-delay: 0.3s;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>

    </section>
  )
}
