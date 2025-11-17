"use client"

interface PageHeroSectionProps {
  title: string
  subtitle?: string
}

export default function PageHeroSection({ title, subtitle }: PageHeroSectionProps) {
  return (
    <section className="relative w-full h-96 flex items-end justify-start overflow-hidden">
      {/* Dark overlay to ensure text readability over video background */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      <div className="relative z-10 px-6 md:px-12 pb-12 md:pb-16 max-w-4xl">
        <h1 className="text-xl md:text-3xl font-trajan-pro font-bold text-white mb-3 text-shadow">
          {title}
        </h1>
      </div>
    </section>
  )
}
