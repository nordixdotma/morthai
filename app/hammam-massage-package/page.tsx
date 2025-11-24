"use client"

import { useState } from "react"
import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"
import BookingForm from "@/components/booking-form"
import OfferBooking from "@/components/offer-booking"
import { hammamMassagePackagesData } from "@/lib/services-data"
import { useLanguage } from "@/lib/language-context"

export default function HammamMassagePackagePage() {
  const t = useTranslations()
  const { language } = useLanguage()
  const hammamPackage = t.hammamMassagePackage

  const rituals = hammamMassagePackagesData

  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showOfferBooking, setShowOfferBooking] = useState(false)
  const [selectedRitualIndex, setSelectedRitualIndex] = useState(0)
  const [selected, setSelected] = useState("solo")

  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>(
    rituals.reduce((acc, _, index) => ({ ...acc, [index]: "solo" }), {}),
  )

  if (showBookingForm) {
    const ritual = rituals[selectedRitualIndex]
    const selectedOption = selectedOptions[selectedRitualIndex] || "solo"
    const selectedPrice = selectedOption === "solo" ? ritual.soloPrice : ritual.duoPrice
    const priceNumber = Number.parseInt(selectedPrice.split(" ")[0], 10)

    return (
      <main className="min-h-screen">
        <PageHeroSection title={hammamPackage?.pageTitle || "Hammam Massage Package"} />
        <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-slideInRight">
              <BookingForm
                serviceTitle={language === "en" ? ritual.title.en : ritual.title.fr}
                selectedOption={selectedOption === "solo" ? ritual.soloLabel : ritual.duoLabel}
                numberOfPeople={1}
                selectedPrice={priceNumber}
                onClose={() => setShowBookingForm(false)}
                isGridLayout={true}
              />
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (showOfferBooking) {
    return (
      <main className="min-h-screen">
        <PageHeroSection title={hammamPackage?.pageTitle || "Hammam Massage Package"} />
        <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-slideInRight">
              <OfferBooking
                onClose={() => setShowOfferBooking(false)}
                isGridLayout={true}
                initialServiceType="packages"
              />
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <PageHeroSection title={hammamPackage?.pageTitle || "Hammam Massage Package"} />
      <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="font-trajan-pro text-xl md:text-2xl font-bold mb-6 text-[#43484e] leading-relaxed">
              {hammamPackage?.heroTitle}
            </h2>

            <div className="flex items-center justify-center mb-8">
              <div className="separator-line" />
              <div className="header-separator mx-6">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40px" height="40px" viewBox="0 0 66 66">
                  <g transform="matrix(1.0000000000000009,0,0,1.0000000000000009,1.4210854715202004e-14,1.4210854715202004e-14)">
                    <g className="separator-svg">
                      <path
                        d="M44.7 17.5c1.9-1.3 4-2.5 6.1-3.4 1.6 3.8 2.5 7.7 2.8 11.5M11.9 25.4c.2-3.8 1.1-7.6 2.7-11.4 2.3 1 4.5 2.3 6.5 3.7M27.1 58.4C12.8 55.7 2 43.1 2 28c3.5 0 6.8.6 9.9 1.6 2.2.8 4.4 1.8 6.3 3M38.8 58.4C53.2 55.7 64 43.1 64 28c-3.7 0-7.2.6-10.4 1.8-2.1.7-4 1.7-5.8 2.8M33 59c14.3-14.4 14.3-37.6 0-52-7.2 7.2-10.8 16.6-10.8 26S25.8 51.8 33 59z"
                        fill="#ead9d5"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="separator-line" />
            </div>

            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed text-center text-gray-700">
                {hammamPackage?.introDescription}
              </p>
              <p className="text-sm md:text-base leading-relaxed text-center text-gray-700">
                {hammamPackage?.introDescription2}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-2 md:py-6">
              {rituals.map((ritual, index) => {
                const cardSelected = selectedOptions[index] || "solo"
                const labelSolo = ritual.soloLabel
                const priceSolo = ritual.soloPrice
                const priceEurSolo = ritual.soloPriceEur
                const labelDuo = ritual.duoLabel
                const priceDuo = ritual.duoPrice
                const priceEurDuo = ritual.duoPriceEur

                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="p-4 md:p-8 flex flex-col h-full">
                      <h3 className="font-trajan-pro text-xl md:text-2xl font-bold text-[#43484e] mb-4">
                        {language === "en" ? ritual.title.en : ritual.title.fr}
                      </h3>

                      <div className="w-12 h-0.5 bg-primary mb-6"></div>

                      <div className="mb-6">
                        <p className="font-semibold text-[#43484e] mb-2">{ritual.hammamTitle}</p>
                        <p className="text-sm leading-relaxed text-gray-700 text-justify">{ritual.hammamDescription}</p>
                      </div>

                      <div className="mb-6">
                        <p className="font-semibold text-[#43484e] mb-2">{ritual.massageTitle}</p>
                        <p className="text-sm leading-relaxed text-gray-700 text-justify mb-2">
                          {ritual.massageDuration}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-700">{ritual.massageOptions}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6 py-6 border-t border-b border-gray-200">
                        {["solo", "duo"].map((type) => {
                          const isSelectedType = type === cardSelected
                          const label = type === "solo" ? labelSolo : labelDuo
                          const price = type === "solo" ? priceSolo : priceDuo
                          const priceEur = type === "solo" ? priceEurSolo : priceEurDuo

                          return (
                            <div
                              key={type}
                              onClick={() => setSelectedOptions({ ...selectedOptions, [index]: type })}
                              className={`p-4 rounded-md cursor-pointer border-2 ${
                                isSelectedType
                                  ? "border-primary bg-primary/10"
                                  : "border-gray-200 bg-white hover:bg-gray-50"
                              } flex flex-col items-center transition-all duration-300`}
                            >
                              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">{label}</p>
                              <p className="font-bold text-[#a87e72]">{price}</p>
                              <p className="text-xs text-gray-600">{priceEur}</p>
                            </div>
                          )
                        })}
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => {
                            setSelectedRitualIndex(index)
                            setSelected(cardSelected)
                            setShowBookingForm(true)
                          }}
                          className="flex-1 px-4 py-3 bg-primary text-white font-semibold rounded-md transition-all duration-300 hover:bg-primary/90 active:scale-95 inline-flex items-center justify-center gap-2 group"
                        >
                          <span>{ritual.cta}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRitualIndex(index)
                            setShowOfferBooking(true)
                          }}
                          className="flex-1 px-4 py-3 border-2 border-primary text-primary font-semibold rounded-md transition-all duration-300 hover:bg-primary/10 active:scale-95 inline-flex items-center justify-center gap-2 group"
                        >
                          <span className="transition-transform duration-300 group-hover:scale-110">✨</span>
                          <span>Offer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
