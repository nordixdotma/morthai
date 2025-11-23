"use client"

import { useState } from "react"
import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"
import Image from "next/image"
import MassageModal from "@/components/massage-modal"

export default function HomeMassagePage() {
  const t = useTranslations()
  const [selectedMassage, setSelectedMassage] = useState<string | null>(null)

  const homeMassage = t.homeMassage

  return (
    <main className="min-h-screen">
      <PageHeroSection title="Home Massage" />

      <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          <h2 className="font-trajan-pro text-xl md:text-2xl font-bold text-center text-[#43484e] mb-0 leading-relaxed">
            {homeMassage?.heroTitle}
          </h2>

          {/* Main Content - Image Left, Text Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="/sections/e3.jpg" alt="Home massage" fill className="object-cover" />
            </div>
            <div className="space-y-4">
              <h3 className="font-trajan-pro text-center text-xl md:text-2xl font-bold text-[#43484e]">
                {homeMassage?.mainTitle}
              </h3>
              {/* separator with centered SVG and lines on both sides */}
            <div className="flex items-center gap-4 mb-6" aria-hidden="true" role="presentation">
              <span className="flex-1 h-[2px] bg-[#ead9d5]" />

              <div className="flex-shrink-0 px-3 flex items-center justify-center text-[#ead9d5]">
                {/* filled SVG (keeps the fill color) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 66 66" aria-hidden="true">
                  <g transform="translate(1 1)">
                    <g fill="#ead9d5" stroke="#ead9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                      <path d="M44.7 17.5c1.9-1.3 4-2.5 6.1-3.4 1.6 3.8 2.5 7.7 2.8 11.5M11.9 25.4c.2-3.8 1.1-7.6 2.7-11.4 2.3 1 4.5 2.3 6.5 3.7M27.1 58.4C12.8 55.7 2 43.1 2 28c3.5 0 6.8.6 9.9 1.6 2.2.8 4.4 1.8 6.3 3M38.8 58.4C53.2 55.7 64 43.1 64 28c-3.7 0-7.2.6-10.4 1.8-2.1.7-4 1.7-5.8 2.8M33 59c14.3-14.4 14.3-37.6 0-52-7.2 7.2-10.8 16.6-10.8 26S25.8 51.8 33 59z" />
                    </g>
                  </g>
                </svg>
              </div>

              <span className="flex-1 h-[2px] bg-[#ead9d5]" />
            </div>
              <p className="text-xs md:text-sm leading-relaxed text-justify text-gray-700">
                {homeMassage?.mainDescription}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-trajan-pro text-lg md:text-2xl font-bold text-[#43484e]">
                {homeMassage?.pricesTitle}
              </h3>
              <span className="text-xs md:text-sm text-gray-400">Home visit zones</span>
            </div>

            <div className="divide-y divide-gray-100">
              {homeMassage?.prices?.map((priceItem, index) => (
                <div
                  key={index}
                  className="py-3 md:py-4 flex items-center justify-between"
                >
                  {/* Left: zone / distance */}
                  <div className="min-w-0">
                    <div className="text-sm md:text-base font-medium text-gray-800 truncate">
                      {priceItem.distance}
                    </div>
                    {priceItem.note && !priceItem.time60 ? (
                      <div className="mt-1 text-xs text-gray-400">{priceItem.note}</div>
                    ) : null}
                  </div>

                  {/* Middle: only the badges, no right-side price or button */}
                  <div className="flex items-center gap-2 md:gap-3">
                    {priceItem.time60 ? (
                      <>
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                          <span className="text-[11px]">60 min</span>
                          <span className="font-semibold text-sm">{priceItem.time60}</span>
                        </span>

                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                          <span className="text-[11px]">90 min</span>
                          <span className="font-semibold text-sm">{priceItem.time90}</span>
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                        <span className="font-medium text-sm">{priceItem.note}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Massages Grid - cards with light shaded border and hover primary color */}
          <div className="space-y-8">
            <h2 className="font-trajan-pro text-lg md:text-xl font-bold text-center text-[#43484e]">
              {homeMassage?.massagesTitle}
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {homeMassage?.massages?.map((massage, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMassage(massage)}
                  className="relative rounded-lg p-4 md:p-6 text-center min-h-24 cursor-pointer transition-colors duration-300 border border-gray-200 bg-white hover:shadow-md
                             focus:outline-none flex items-center justify-center group"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <p
                    className="text-xs md:text-base font-semibold text-gray-700 transition-colors duration-300 group-hover:text-[#a87e72]"
                    style={{ willChange: "color" }}
                  >
                    {massage}
                  </p>

                  {/* Border / ring effect on hover using absolute overlay */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-[#a87e72] group-hover:bg-[rgba(168,126,114,0.04)]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MassageModal
        isOpen={selectedMassage !== null}
        title={selectedMassage || ""}
        details={homeMassage?.massageDetails?.[selectedMassage as keyof typeof homeMassage.massageDetails] || ""}
        onClose={() => setSelectedMassage(null)}
      />
    </main>
  )
}
