"use client"

import { X } from "lucide-react"

interface MassageModalProps {
  isOpen: boolean
  title: string
  details: string
  onClose: () => void
}

export default function MassageModal({ isOpen, title, details, onClose }: MassageModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#a87e72] hover:bg-[#94696a] text-white rounded-full p-2 transition-colors duration-200"
          aria-label="Close modal"
          title="Close"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8 md:p-10 pr-12">
          <h2 className="font-trajan-pro text-2xl md:text-3xl font-bold text-[#43484e] mb-6">{title}</h2>
          <div className="space-y-4">
            {details.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-sm md:text-base leading-relaxed text-justify text-gray-700 font-nb-international"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
