"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoaderProps {
  onLoadingComplete?: () => void
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      onLoadingComplete?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-auto overflow-hidden">
      <style>{`
        @keyframes spin-border {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animated-border {
          animation: spin-border 3s linear forwards;
        }
      `}</style>

      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Animated border circle */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#b0d236] border-r-[#b0d236] animated-border"
          style={{
            animation: "spin-border 3s linear forwards",
          }}
        ></div>

        {/* Logo in center */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Image src="/logo.svg" alt="Mor Thai Logo" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  )
}
