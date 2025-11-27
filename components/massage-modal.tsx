"use client"

import { X, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

interface MassageModalProps {
  isOpen: boolean
  title: string
  details: string
  onClose: () => void
}

export default function MassageModal({ isOpen, title, details, onClose }: MassageModalProps) {
  const [cleanDetails, setCleanDetails] = useState("")
  const { language } = useLanguage()
  const phoneNumber = "+212524207055"

  useEffect(() => {
    if (details) {
      const cleaned = details
        .replace(/Pour toutes les réservations le jour même, veuillez nous contacter au \+212 524 207 055/g, "")
        .replace(/For all same-day reservations, please contact us on \+212 524 207 055/g, "")
        .trim()
      setCleanDetails(cleaned)
    }
  }, [details])

  useEffect(() => {
    if (!isOpen) return

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const backdrop = document.querySelector("[data-modal-backdrop]")
    if (backdrop) {
      backdrop.addEventListener("click", handleBackdropClick)
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      if (backdrop) {
        backdrop.removeEventListener("click", handleBackdropClick)
      }
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-modal-backdrop
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative md:p-8 md:p-10 py-8 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#a87e72] hover:bg-[#94696a] text-white rounded-full p-2 transition-colors duration-200"
          aria-label="Close modal"
          title="Close"
        >
          <X size={20} />
        </button>

        <div className="pr-8 md:pr-12">
          <h2 id="modal-title" className="font-trajan-pro text-2xl md:text-3xl font-bold text-[#43484e] mb-6">
            {title}
          </h2>
          <div className="space-y-4">
            {cleanDetails.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-sm md:text-base leading-relaxed text-justify text-gray-700 font-nb-international"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex gap-3">
              <a
                href={`https://wa.me/212610200040`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:shadow-md text-white rounded-lg font-semibold text-sm transition-all duration-500 relative overflow-hidden group py-2.5"
                aria-label="Contact via WhatsApp"
              >
                {/* Filling background effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#94696a] to-[#94696a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#94696a] to-[#94696a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                <span className="w-5 h-5 flex items-center justify-center relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.94C.155 5.3 5.3.155 11.897.155c3.18 0 6.167 1.24 8.41 3.482a11.79 11.79 0 013.49 8.409c-.003 6.598-5.148 11.743-11.744 11.743a11.9 11.9 0 01-5.933-1.594L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.35 1.593 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.456 0-9.89 4.434-9.893 9.884a9.822 9.822 0 001.55 5.271l-.999 3.648 3.984-1.619zm11.387-5.464c-.074-.124-.272-.198-.568-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.148-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.412z" />
                  </svg>
                </span>

                <span className="relative z-10">WhatsApp</span>
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#a87e72] to-[#a87e72] hover:shadow-md text-white rounded-lg font-semibold text-sm transition-all duration-500 relative overflow-hidden group"
                aria-label="Call us"
              >
                {/* Filling background effect */}
                <span className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                <Phone size={18} className="relative z-10" />
                <span className="relative z-10">{language === "en" ? "Call" : "Appeler"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
