"use client"
import { useState } from "react"
import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"

export default function MassagesPage() {
  const t = useTranslations()
  const [selectedLang, setSelectedLang] = useState("fr")

  const massageData = t.massages

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PageHeroSection title={massageData?.pageTitle || "Massages"} />

      {/* Main Content Section */}
      <section className="py-12 service-section md:py-16 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Intro Section with Image Left and Text Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 items-center">
            {/* Image - Left */}
            <div className="relative overflow-hidden rounded-lg">
              <img src="/sections/l4.webp" alt="Massage ritual" className="w-full h-96 object-cover rounded-lg" />
            </div>

            {/* Text - Right */}
            <div>
              <h2 className="text-2xl md:text-3xl font-trajan-pro font-bold text-gray-900 mb-4">
                {massageData?.introTitle}
              </h2>
              <p className="text-gray-600 font-lato leading-relaxed text-justify mb-6">{massageData?.introText}</p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center mb-16">
            <p className="text-sm md:text-xl font-trajan-pro text-gray-700 leading-relaxed text-pretty">
              {massageData?.closingText}
            </p>
          </div>

          {/* Services Grid - 14 Cards */}
          <div>
            <h3 className="text-2xl font-trajan-pro font-bold text-gray-900 mb-8">
              {selectedLang === "fr" ? "Nos Massages" : "Our Massages"}
            </h3>

            {/* Desktop Grid (3 columns) and Mobile Grid (2 columns) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
              {massageData?.services?.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md overflow-hidden flex flex-col h-full border border-gray-200 transition-all duration-300 hover:border-primary"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gray-200 h-40 md:h-56">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-3 md:p-4 flex-1 flex flex-col">
                    {/* Title */}
                    <h4 className="text-xs md:text-base font-bold font-trajan-pro text-gray-900 mb-2 md:mb-3">
                      {service.title}
                    </h4>

                    {/* Decorative Accent Line */}
                    <div className="w-8 h-0.5 bg-primary mb-3 md:mb-4"></div>

                    {/* Price */}
                    <div className="mb-4 md:mb-6 flex-1">
                      <p className="text-xs md:text-sm text-gray-600 font-lato">
                        <span className="font-semibold">{massageData?.priceFrom}</span>
                      </p>
                      <p className="text-sm md:text-base font-bold text-primary font-trajan-pro">
                        {service.priceMAD} MAD / {service.priceEUR} €
                      </p>
                    </div>

                    {/* CTA Button with Light Border */}
                    <div className="flex justify-end">
                      <button
                        className="px-3 md:px-4 py-2 border-2 font-semibold text-xs md:text-sm rounded-md transition-all duration-300 border-primary bg-primary text-white inline-flex items-center gap-1 group"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <span>{massageData?.readMore}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
