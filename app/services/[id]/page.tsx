"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import PageHeroSection from "@/components/page-hero-section"
import BookingForm from "@/components/booking-form"
import OfferBooking from "@/components/offer-booking"
import { massagesData, hammamData, facialCareData } from "@/lib/services-data"
import { useLanguage } from "@/lib/language-context"
import { useTranslations } from "@/lib/use-translations"
import Image from "next/image"

interface ServiceItem {
  id: string
  title: { en: string; fr: string }
  description: { en: string; fr: string }
  mainImage?: string
  availability?: Array<{ duration: string; price: number; priceEUR?: number }>
  options?: Array<{ optionName: string; price: number; priceEUR?: number }>
}

export default function ServiceDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const serviceId = params.id as string
  const { language } = useLanguage()
  const t = useTranslations()
  const [service, setService] = useState<ServiceItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [serviceType, setServiceType] = useState<"massage" | "hammam" | "facial">("massage")
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showOfferBooking, setShowOfferBooking] = useState(false)
  const [showMaxPeopleWarning, setShowMaxPeopleWarning] = useState(false)

  useEffect(() => {
    let foundService: ServiceItem | undefined
    let type: "massage" | "hammam" | "facial" = "massage"

    foundService = massagesData.find((s) => s.id === serviceId)
    if (foundService) {
      type = "massage"
      setService(foundService)
    } else {
      foundService = hammamData.find((s) => s.id === serviceId)
      if (foundService) {
        type = "hammam"
        setService(foundService)
      } else {
        foundService = facialCareData.find((s) => s.id === serviceId)
        if (foundService) {
          type = "facial"
          setService(foundService)
        }
      }
    }

    setLoading(false)
  }, [serviceId])

  useEffect(() => {
    if (searchParams.get("offer") === "true") {
      setShowOfferBooking(true)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <main className="min-h-screen">
        <PageHeroSection title="Service Not Found" />
        <section className="py-16 bg-[#fff8f5]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-trajan-pro font-bold text-gray-900 mb-4">Service not found</h2>
            <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </section>
      </main>
    )
  }

  const title = language === "fr" ? service.title.fr : service.title.en
  const description = language === "fr" ? service.description.fr : service.description.en
  const priceOptions = (service.availability || service.options) ?? []

  const selectedOption = priceOptions[selectedOptionIndex]
  const selectedOptionName = "duration" in selectedOption ? selectedOption.duration : selectedOption.optionName

  const handleNumberOfPeopleIncrement = () => {
    if (numberOfPeople < 4) {
      setNumberOfPeople(numberOfPeople + 1)
      setShowMaxPeopleWarning(false)
    } else {
      setShowMaxPeopleWarning(true)
    }
  }

  const handleNumberOfPeopleDecrement = () => {
    setNumberOfPeople(Math.max(1, numberOfPeople - 1))
    setShowMaxPeopleWarning(false)
  }

  return (
    <main className="min-h-screen">
      <PageHeroSection title={title} />

      <section className="py-12 service-section md:py-16 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl relative overflow-hidden pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="relative">
            <div
              className={`transition-all duration-700 ease-in-out ${
                showBookingForm || showOfferBooking
                  ? "-translate-x-full opacity-0 invisible"
                  : "translate-x-0 opacity-100 visible"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="relative overflow-hidden rounded-lg h-96 md:h-full min-h-96">
                  <Image
                    src={service.mainImage || "/placeholder.svg?height=500&width=500&query=service"}
                    alt={title}
                    fill
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-2xl md:text-3xl font-trajan-pro font-bold text-gray-900 mb-4 text-balance">
                    {title}
                  </h1>

                  <div className="w-12 h-1 bg-primary mb-6"></div>

                  <p className="text-sm md:text-base text-gray-600 font-lato leading-relaxed text-justify mb-8">
                    {description}
                  </p>

                  {priceOptions.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg md:text-xl font-trajan-pro font-bold text-gray-900 mb-4">
                        {t.bookingForm?.availabilityPricing || "Availability & Pricing"}
                      </h3>
                      <div className="space-y-3">
                        {priceOptions.map((option, index) => {
                          const durationOrName = "duration" in option ? option.duration : option.optionName
                          const isSelected = index === selectedOptionIndex
                          return (
                            <button
                              key={index}
                              onClick={() => setSelectedOptionIndex(index)}
                              className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                                isSelected
                                  ? "border-2 border-primary bg-primary/10"
                                  : "border border-gray-200 bg-white hover:border-primary"
                              }`}
                            >
                              <span className="font-medium text-gray-900">{durationOrName}</span>
                              <div className="text-right">
                                <div className={`font-bold ${isSelected ? "text-primary" : "text-primary"}`}>
                                  {option.price} MAD
                                </div>
                                {option.priceEUR && <div className="text-sm text-gray-500">{option.priceEUR} €</div>}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {(serviceType === "massage" || serviceType === "facial") && (
                    <div className="mb-8">
                      <h3 className="text-lg md:text-xl font-trajan-pro font-bold text-gray-900 mb-4">
                        {t.bookingForm?.numberOfPeople || "Number of People"}
                      </h3>
                      <div className="flex gap-3 items-center">
                        <button
                          onClick={handleNumberOfPeopleDecrement}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition-colors font-semibold"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 text-center min-w-16 font-bold text-lg">{numberOfPeople}</span>
                        <button
                          onClick={handleNumberOfPeopleIncrement}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition-colors font-semibold"
                        >
                          +
                        </button>
                      </div>
                      {showMaxPeopleWarning && (
                        <p className="text-red-500 text-sm mt-2 font-medium">
                          {language === "fr"
                            ? "Si vous voulez plus de 4 personnes, veuillez faire une réservation par contact."
                            : "If you want more than 4 people, please contact us for a reservation."}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="flex-1 py-3 px-4 bg-primary text-white font-semibold text-center rounded-md hover:bg-primary/90 transition-colors"
                      aria-label={`Book ${title}`}
                    >
                      {t.bookingForm?.bookNow || "Book Now"}
                    </button>
                    <button
                      onClick={() => setShowOfferBooking(true)}
                      className="flex-1 py-3 px-4 border-2 border-primary text-primary font-semibold text-center rounded-md hover:bg-primary/5 transition-colors"
                      aria-label={`Offer ${title}`}
                    >
                      {t.bookingForm?.offerAsGift || "Offer as Gift"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showOfferBooking && (
              <div className={`absolute inset-0 transition-all duration-700 ease-in-out animate-slideInRight`}>
                <OfferBooking
                  initialServiceId={serviceId}
                  initialServiceType={
                    serviceType === "massage" ? "massages" : serviceType === "hammam" ? "hammams" : "facials"
                  }
                  onClose={() => setShowOfferBooking(false)}
                />
              </div>
            )}

            {showBookingForm && (
              <div className={`absolute inset-0 transition-all duration-700 ease-in-out animate-slideInRight`}>
                <BookingForm
                  serviceTitle={title}
                  selectedOption={selectedOptionName}
                  numberOfPeople={numberOfPeople}
                  selectedPrice={selectedOption?.price || 0}
                  onClose={() => setShowBookingForm(false)}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
