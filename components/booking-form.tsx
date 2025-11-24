"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useLanguage } from "@/lib/language-context"
import { useTranslations } from "@/lib/use-translations"

interface BookingFormProps {
  serviceTitle: string
  selectedOption: string
  numberOfPeople: number
  selectedPrice?: number
  onClose: () => void
  isGridLayout?: boolean
}

interface FormData {
  firstName: string
  lastName: string
  reservationDate: string
  reservationTime: string
  phoneNumber: string
  email: string
  note: string
}

export default function BookingForm({
  serviceTitle,
  selectedOption,
  numberOfPeople,
  selectedPrice = 0,
  onClose,
  isGridLayout = false,
}: BookingFormProps) {
  const { language } = useLanguage()
  const t = useTranslations()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    reservationDate: "",
    reservationTime: "",
    phoneNumber: "",
    email: "",
    note: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"spa" | "online">("spa")

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", { ...formData, paymentMethod, numberOfPeople, totalPrice })
  }

  const totalPrice = selectedPrice * numberOfPeople

  const containerClass = isGridLayout
    ? "bg-white rounded-lg"
    : "min-h-screen bg-white w-full overflow-y-auto flex flex-col"

  const contentClass = isGridLayout ? "p-4 md:p-6" : "p-4 md:p-6 max-w-7xl mx-auto pb-16 flex-grow"

  return (
    <div className={containerClass}>
      {/* Header with Back Button */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 z-1">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium mb-4"
          aria-label={t.bookingForm?.backToServiceDetails || "Back to service details"}
        >
          <ChevronLeft size={24} />
          {t.bookingForm?.back || "Back"}
        </button>
        <h2 className="text-2xl md:text-3xl font-trajan-pro font-bold text-gray-900">
          {t.bookingForm?.completeYourBooking || "Complete Your Booking"}
        </h2>
      </div>

      {/* Content */}
      <div className={contentClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.bookingForm?.firstName || "First Name"} *
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder={language === "fr" ? "Jean" : "John"}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.bookingForm?.lastName || "Last Name"} *
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder={language === "fr" ? "Dupont" : "Doe"}
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.bookingForm?.reservationDate || "Reservation Date"} *
                </label>
                <input
                  id="reservationDate"
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.bookingForm?.reservationTime || "Reservation Time"} *
                </label>
                <input
                  id="reservationTime"
                  type="time"
                  name="reservationTime"
                  value={formData.reservationTime}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                {t.bookingForm?.phoneNumber || "Phone Number"} *
              </label>
              <div className="react-phone-input-2 w-full">
                <PhoneInput
                  country={"ma"}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    id: "phoneNumber",
                    required: true,
                    "aria-required": "true",
                    title: "Enter your phone number",
                  }}
                  containerClass="w-full"
                  inputClass="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-base"
                  preferredCountries={["ma", "fr", "es", "gb", "us"]}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.bookingForm?.email || "Email"} *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder={language === "fr" ? "jean@exemple.com" : "john@example.com"}
              />
            </div>

            {/* Note/Message */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                {t.bookingForm?.noteMessage || "Note or Message"} ({t.bookingForm?.optional || "Optional"})
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                placeholder={
                  language === "fr"
                    ? "Demandes spéciales ou informations supplémentaires..."
                    : "Any special requests or additional information..."
                }
              />
            </div>
          </form>

          {/* Right Column - Summary and Payment */}
          <div className="space-y-4 md:space-y-6">
            {/* Booking Summary */}
            <div className="bg-[#fff8f5] rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-trajan-pro font-bold text-gray-900 mb-4">
                {t.bookingForm?.bookingSummary || "Booking Summary"}
              </h3>

              <div className="space-y-3 border-b border-gray-300 pb-4">
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">{t.bookingForm?.service || "Service"}:</span>
                  <span className="text-right font-semibold text-gray-900">{serviceTitle}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">{t.bookingForm?.option || "Option"}:</span>
                  <span className="text-right font-semibold text-gray-900">{selectedOption}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">
                    {t.bookingForm?.numberOfPeople || "Number of People"}:
                  </span>
                  <span className="text-right font-semibold text-gray-900">{numberOfPeople}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{t.bookingForm?.pricePerPerson || "Price per person"}:</span>
                  <span className="font-semibold text-gray-900">{selectedPrice} MAD</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-lg border-t border-gray-200">
                  <span className="font-trajan-pro font-bold text-gray-900">
                    {t.bookingForm?.totalPrice || "Total Price"}:
                  </span>
                  <span className="text-primary font-bold text-xl">{totalPrice} MAD</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="text-lg font-trajan-pro font-bold text-gray-900">
                {t.bookingForm?.paymentMethod || "Payment Method"}
              </h3>

              <label
                className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                style={{ borderColor: paymentMethod === "spa" ? "hsl(15, 60%, 43%)" : "#d1d5db" }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="spa"
                  checked={paymentMethod === "spa"}
                  onChange={(e) => setPaymentMethod("spa" as "spa" | "online")}
                  className="w-4 h-4 accent-primary"
                />
                <span className="ml-3 font-medium text-gray-900">{t.bookingForm?.payAtSpa || "Pay at the Spa"}</span>
              </label>

              <label
                className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                style={{ borderColor: paymentMethod === "online" ? "hsl(15, 60%, 43%)" : "#d1d5db" }}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod("online" as "spa" | "online")}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="ml-3 font-medium text-gray-900">{t.bookingForm?.payOnline || "Pay Online"}</span>
                </div>
                <Image
                  src="/payment.png"
                  alt="Credit Card"
                  width={50}
                  height={30}
                  className="h-4 md:h-8 w-auto"
                />
              </label>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 pt-4">
              <label className="flex items-start p-4 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 mt-1 accent-primary" />
                <span className="ml-3 text-sm text-gray-700">
                  {t.bookingForm?.acceptanceText ||
                    "By clicking CONFIRM, you acknowledge that you have read, understood, and accepted the terms and conditions of sale described in our"}{" "}
                  <a href="/conditions" className="text-primary font-medium hover:underline">
                    {t.bookingForm?.conditions || "conditions"}
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors mt-6"
            >
              {t.bookingForm?.confirmBooking || "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
