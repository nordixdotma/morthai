"use client"

import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"
import { useLanguage } from "@/lib/language-context"
import { hammamData } from "@/lib/services-data"
import Image from "next/image"
import Link from "next/link"

export default function HammamPage() {
  const t = useTranslations()
  const { language } = useLanguage()
  const hammam = t.hammam

  return (
    <main className="min-h-screen">
      <PageHeroSection title={hammam?.pageTitle || "Hammam"} />

      <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl pb-24">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="font-trajan-pro text-xl md:text-3xl font-bold mb-6 text-[#43484e] leading-relaxed">
              {hammam?.heroTitle}
            </h2>

            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">
                {hammam?.introDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-24 space-y-16 md:space-y-20">
          {hammamData?.map((hammamService, index) => {
            const isEven = index % 2 === 0
            const title = language === "fr" ? hammamService.title.fr : hammamService.title.en
            const description = language === "fr" ? hammamService.description.fr : hammamService.description.en

            return (
              <div key={hammamService.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className={isEven ? "" : "order-2 md:order-2"}>
                  <div className="space-y-4">
                    <h3 className="font-trajan-pro text-center text-xl md:text-2xl font-bold text-[#43484e] hover:text-primary transition-colors">
                      {title}
                    </h3>

                    {/* separator */}
                    <div className="flex items-center gap-4 mb-4" aria-hidden="true" role="presentation">
                      <span className="flex-1 h-[2px] bg-[#ead9d5]" />
                      <div className="flex-shrink-0 px-3 flex items-center justify-center text-[#ead9d5]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 66 66"
                          aria-hidden="true"
                        >
                          <g transform="translate(1 1)">
                            <g
                              fill="#ead9d5"
                              stroke="#ead9d5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            >
                              <path d="M44.7 17.5c1.9-1.3 4-2.5 6.1-3.4 1.6 3.8 2.5 7.7 2.8 11.5M11.9 25.4c.2-3.8 1.1-7.6 2.7-11.4 2.3 1 4.5 2.3 6.5 3.7M27.1 58.4C12.8 55.7 2 43.1 2 28c3.5 0 6.8.6 9.9 1.6 2.2.8 4.4 1.8 6.3 3M38.8 58.4C53.2 55.7 64 43.1 64 28c-3.7 0-7.2.6-10.4 1.8-2.1.7-4 1.7-5.8 2.8M33 59c14.3-14.4 14.3-37.6 0-52-7.2 7.2-10.8 16.6-10.8 26S25.8 51.8 33 59z" />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span className="flex-1 h-[2px] bg-[#ead9d5]" />
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">{description}</p>

                    <div>
                      <Link
                        href={`/services/${hammamService.id}`}
                        className="inline-flex items-center gap-2 text-[#a87e72] font-semibold hover:text-[#8a6a5e] transition-colors"
                      >
                        Read More →
                      </Link>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <Link
                          href={`/services/${hammamService.id}`}
                          className="relative overflow-hidden group block w-full text-center py-3 rounded-sm shadow-md text-sm font-medium bg-gradient-to-r from-primary to-primary text-white border-2 border-primary transition-all duration-500"
                        >
                          {/* left half fill */}
                          <span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 left-0 w-1/2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right pointer-events-none z-0 bg-white"
                          />
                          {/* right half fill */}
                          <span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 right-0 w-1/2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none z-0 bg-white"
                          />
                          <span className="relative z-10 group-hover:text-primary transition-colors duration-500">
                            {t.hammam?.reserve || "Reserve"}
                          </span>
                        </Link>

                        <Link
                          href={`/services/${hammamService.id}?offer=true`}
                          className="relative overflow-hidden group block w-full text-center py-3 rounded-sm shadow-sm text-sm font-medium border-2 border-primary bg-white text-primary transition-all duration-500"
                        >
                          {/* left half fill */}
                          <span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 left-0 w-1/2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right pointer-events-none z-0 bg-gradient-to-r from-primary to-primary"
                          />
                          {/* right half fill */}
                          <span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 right-0 w-1/2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none z-0 bg-gradient-to-r from-primary to-primary"
                          />
                          <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                            {t.hammam?.offer || "Offer"}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg ${isEven ? "" : "order-1 md:order-1"}`}
                >
                  <Image
                    src={hammamService.mainImage || "/placeholder.svg?height=500&width=500&query=hammam"}
                    alt={title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}