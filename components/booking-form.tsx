"use client"

import type React from "react"

import { useState } from "react"
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", { ...formData, paymentMethod, numberOfPeople })
  }

  const containerClass = isGridLayout ? "bg-white rounded-lg" : "min-h-screen bg-white w-full overflow-y-auto"

  const contentClass = isGridLayout ? "p-4 md:p-6" : "p-4 md:p-6 max-w-7xl mx-auto pb-16"

  return (
    <div className={containerClass}>
      {/* Header with Back Button */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 z-1">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium mb-4"
          aria-label="Back to service details"
        >
          <ChevronLeft size={24} />
          Back
        </button>
        <h2 className="text-2xl md:text-3xl font-trajan-pro font-bold text-gray-900">Complete Your Booking</h2>
      </div>

      {/* Content */}
      <div className={contentClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reservation Date *</label>
                <input
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reservation Time *</label>
                <input
                  type="time"
                  name="reservationTime"
                  value={formData.reservationTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Phone Number - added .react-phone-input-2 styles for full width and increased height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <div className="react-phone-input-2">
                <PhoneInput
                  country={"ma"}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-base"
                  preferredCountries={["ma", "fr", "es", "gb", "us"]}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="john@example.com"
              />
            </div>

            {/* Note/Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note or Message (Optional)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                placeholder="Any special requests or additional information..."
              />
            </div>
          </form>

          {/* Right Column - Summary and Payment */}
          <div className="space-y-4 md:space-y-6">
            {/* Booking Summary */}
            <div className="bg-[#fff8f5] rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-trajan-pro font-bold text-gray-900 mb-4">Booking Summary</h3>

              <div className="space-y-3 border-b border-gray-300 pb-4">
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">Service:</span>
                  <span className="text-right font-semibold text-gray-900">{serviceTitle}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">Option:</span>
                  <span className="text-right font-semibold text-gray-900">{selectedOption}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">Number of People:</span>
                  <span className="text-right font-semibold text-gray-900">{numberOfPeople}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 text-lg">
                <span className="font-trajan-pro font-bold text-gray-900">Total Price:</span>
                <span className="text-primary font-bold text-xl">600 MAD</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="text-lg font-trajan-pro font-bold text-gray-900">Payment Method</h3>

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
                <span className="ml-3 font-medium text-gray-900">Pay at the Spa</span>
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
                  <span className="ml-3 font-medium text-gray-900">Pay Online</span>
                </div>
                <Image
                  src="https://en.morthai-marrakech.com/wp-content/uploads/2023/04/cb.png"
                  alt="Credit Card"
                  width={50}
                  height={30}
                  className="h-8 w-auto"
                />
              </label>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 pt-4">
              <label className="flex items-start p-4 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 mt-1 accent-primary" />
                <span className="ml-3 text-sm text-gray-700">
                  By clicking CONFIRM, you acknowledge that you have read, understood, and accepted the terms and
                  conditions of sale described in our{" "}
                  <a href="/privacy-policy" className="text-primary font-medium hover:underline">
                    privacy policy
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
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
