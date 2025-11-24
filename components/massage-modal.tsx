"use client"
import { useState, useMemo, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { getAllServices, type GiftCard, type Massage, type FacialCare, type Hammam } from "@/lib/services-data"
import BookingForm from "./booking-form"

interface OfferBookingProps {
  initialGiftCardId?: string
  initialServiceId?: string
  initialServiceType?: "massages" | "hammams" | "packages" | "facials"
  onClose: () => void
  isGridLayout?: boolean
}

type ServiceType = "massages" | "hammams" | "packages" | "facials"
type Service = Massage | Hammam | FacialCare

export default function OfferBooking({
  initialGiftCardId,
  initialServiceId,
  initialServiceType,
  onClose,
  isGridLayout = false,
}: OfferBookingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGiftCard, setSelectedGiftCard] = useState<string | null>(initialGiftCardId || null)
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>(initialServiceType || "massages")
  const [selectedService, setSelectedService] = useState<string | null>(initialServiceId || null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [senderName, setSenderName] = useState("")
  const [senderNote, setSenderNote] = useState("")
  const [showBookingForm, setShowBookingForm] = useState(false)

  const services = getAllServices()
  const giftCards = services.giftCards as GiftCard[]
  const allServices = services

  const currentGiftCard = useMemo(() => {
    if (!selectedGiftCard) return null
    return giftCards.find((gc) => gc.id === selectedGiftCard)
  }, [selectedGiftCard, giftCards])

  const currentServices = useMemo(() => {
    return allServices[selectedServiceType] as Service[]
  }, [selectedServiceType, allServices])

  const currentService = useMemo(() => {
    if (!selectedService) return null
    return currentServices.find((s) => s.id === selectedService)
  }, [selectedService, currentServices])

  const currentOptions = useMemo(() => {
    if (!currentService) return []
    if ("availability" in currentService) {
      return (currentService as Massage | FacialCare).availability.map((a) => a.duration)
    } else if ("options" in currentService) {
      return (currentService as Hammam).options.map((o) => o.optionName)
    }
    return []
  }, [currentService])

  const isThemeComplete = !!selectedGiftCard
  const isServiceComplete = !!selectedService && !!selectedOption
  const isInfoComplete = !!recipientName && !!recipientEmail && !!recipientPhone && !!senderName

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
    else setShowBookingForm(true)
  }

  const handlePreviousStep = () => {
    if (showBookingForm) {
      setShowBookingForm(false)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onClose()
    }
  }

  const getStepLabel = () => {
    const labels = [
      "Please choose a gift card theme",
      "Please choose a service",
      "Please choose an option",
      "Gift Card Information",
    ]
    return labels[currentStep - 1] || ""
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  if (showBookingForm && currentService) {
    const serviceTitle = "title" in currentService ? currentService.title.en : ""
    return (
      <BookingForm
        serviceTitle={serviceTitle}
        selectedOption={selectedOption || ""}
        numberOfPeople={1}
        onClose={() => setShowBookingForm(false)}
        isGridLayout={isGridLayout}
      />
    )
  }

  const containerClass = isGridLayout ? "bg-transparent rounded-lg" : "min-h-screen bg-white w-full overflow-y-auto"

  return (
    <div className={containerClass}>
      {/* Step Indicator - Centered at top */}
      <div className="flex flex-col items-center pt-6 md:pt-8 px-4">
        <div className="flex gap-2 md:gap-3 mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm ${step < currentStep
                    ? "bg-primary text-white"
                    : step === currentStep
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {step < currentStep ? "✓" : step}
              </div>
              {step < 4 && <div className={`w-6 md:w-8 h-1 ${step < currentStep ? "bg-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Step Label */}
        <p className="text-sm md:text-base text-gray-600 text-center">{getStepLabel()}</p>
      </div>

      {/* Content */}
      <div className={`${isGridLayout ? "p-4 md:p-6" : "p-4 md:p-6 max-w-7xl mx-auto"}`}>
        {/* Step 1: Theme Selection - Grid like gift card page */}
        {currentStep === 1 && (
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {giftCards.map((gc) => (
                <button
                  key={gc.id}
                  onClick={() => setSelectedGiftCard(gc.id)}
                  className={`relative h-40 md:h-56 rounded-lg overflow-hidden group transition-all ${selectedGiftCard === gc.id ? "ring-2 ring-primary" : "hover:shadow-lg"
                    }`}
                >
                  <Image
                    src={gc.mainImage || "/placeholder.svg"}
                    alt={gc.id}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {selectedGiftCard === gc.id && (
                    <div className="absolute inset-0 border-3 border-primary rounded-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Service Selection - 5 columns desktop, 2 mobile */}
        {currentStep === 2 && (
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
            {/* Service Type Tabs */}
            <div className="flex gap-2 flex-wrap justify-center">
              {(["massages", "hammams", "packages", "facials"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedServiceType(type)
                    setSelectedService(null)
                    setSelectedOption(null)
                  }}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${selectedServiceType === type
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {type === "packages" ? "Hammam & Massage" : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {currentServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id)
                    setSelectedOption(null)
                  }}
                  className={`p-3 md:p-4 rounded-lg border-2 text-center transition-all ${selectedService === service.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                    }`}
                >
                  <p className="font-semibold text-xs md:text-sm text-gray-900 line-clamp-2">
                    {"title" in service ? service.title.en : service.id}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    From{" "}
                    {"availability" in service
                      ? service.availability[0]?.price || "N/A"
                      : service.options?.[0]?.price || "N/A"}{" "}
                    MAD
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Option Selection - Centered options */}
        {currentStep === 3 && (
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              {currentOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg border-2 font-medium text-sm md:text-base transition-all ${selectedOption === option
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 text-gray-900 hover:border-primary"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Recipient Info */}
        {currentStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-4 md:mt-6">
            {/* Left: Images */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-trajan-pro font-bold text-gray-900">Gift Card Preview</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {currentGiftCard && (
                  <>
                    <Image
                      src={currentGiftCard.mainImage || "/placeholder.svg"}
                      alt="Gift card main"
                      width={200}
                      height={150}
                      className="w-full h-32 md:h-48 object-cover rounded-lg"
                    />
                    <Image
                      src={currentGiftCard.previewImage || "/placeholder.svg"}
                      alt="Gift card preview"
                      width={200}
                      height={150}
                      className="w-full h-32 md:h-48 object-cover rounded-lg"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Right: Form */}
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">To my dearest *</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm"
                  placeholder="Recipient name"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm"
                  placeholder="Recipient email"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm"
                  placeholder="Recipient phone"
                />
              </div>

              <div className="pt-3 md:pt-4 border-t border-gray-200">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">From *</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Note or Message (Optional)
                </label>
                <textarea
                  value={senderNote}
                  onChange={(e) => setSenderNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none text-sm"
                  placeholder="Add a personal message..."
                />
              </div>
            </form>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 md:gap-4 mt-6 md:mt-8 justify-end">
          <button
            onClick={handlePreviousStep}
            className="px-4 md:px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium text-sm md:text-base"
          >
            {currentStep === 1 && !initialServiceId ? "Close" : "Back"}
          </button>
          <button
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && !isThemeComplete) ||
              (currentStep === 2 && !selectedService) ||
              (currentStep === 3 && !selectedOption) ||
              (currentStep === 4 && !isInfoComplete)
            }
            className="px-4 md:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300 transition-colors font-medium text-sm md:text-base flex items-center gap-2"
          >
            {currentStep === 4 ? "Continue" : "Next"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
