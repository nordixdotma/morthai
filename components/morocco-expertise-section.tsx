import React, { useState } from "react"
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function MoroccoExpertiseSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const items = [
    {
      id: 1,
      title: "Hammam",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      description: "Live the unforgettable sensory experience or offer yourself a romantic moment in our private hammam reserved for couples.",
      link: "/hammam"
    },
    {
      id: 2,
      title: "Massages",
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=600&fit=crop",
      description: "We invite you to immerse yourself in a wonderful multi-sensory universe through a variety of exceptional massages.",
      link: "/massages"
    },
    {
      id: 3,
      title: "Hammam and Massage Package",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
      description: "Let yourself be carried away by the magic of the peaceful atmosphere of Mor Thai Marrakech!",
      link: "/hammam-massage-package"
    },
    {
      id: 4,
      title: "Face Treatment",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop",
      description: "Are you looking for a hydrating and deep cleansing treatment for your face? This purifying face care.",
      link: "/face-treatment"
    },
    {
      id: 5,
      title: "Home Delivery Massage",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      description: "Do you want to relax after a busy week? Or do you simply want to offer yourself a moment of relaxation and well-being, to regenerate your body and mind?",
      link: "/home-delivery-massage"
    },
    {
      id: 6,
      title: "Gift Vouchers",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop",
      description: "Are you looking for an original gift idea to impress your loved ones? Whether it is for a birthday, Christmas, Valentine's Day...",
      link: "/gift-vouchers"
    },
  ]
  
  const next = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  
  return (
    <section 
      className="py-16 md:py-24 w-full morocco-expertise-section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Our Expertise
        </h2>
        
        <div className="relative pb-16">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 carousel-container"
              style={{ "--carousel-index": currentIndex } as React.CSSProperties}
            >
              {items.map((item) => (
                <div key={item.id} className="w-1/3 flex-shrink-0 px-2">
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 flex-1">{item.description}</p>
                      <a 
                        href={item.link}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 text-left inline-block"
                      >
                        Discover →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute -bottom-10 right-0 flex gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={currentIndex === 0}
              aria-label="Previous item"
              className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentIndex === items.length - 1}
              aria-label="Next item"
              className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
