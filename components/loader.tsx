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
    <div className="loader-container z-60">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Animated border circle */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#b0d236] animated-border"></div>

        {/* Logo in center */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Image src="/logo.svg" alt="Mor Thai Logo" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  )
}
