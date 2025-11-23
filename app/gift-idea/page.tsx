"use client"

import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"
import Image from "next/image"
import Link from "next/link"

export default function GiftIdeaPage() {
  const t = useTranslations()

  const giftIdea = t.giftIdea

  // Gift card images cycling
  const giftCardImages = [
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
    "https://en.morthai-marrakech.com/images/gift/model/default.png",
  ]

  return (
    <main className="min-h-screen">
      <PageHeroSection title={giftIdea?.heroTitle || "Gift Idea"} />

      <section className="morocco-discovery-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl overflow-hidden w-full relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="discovery-heading font-trajan-pro text-xl md:text-3xl font-bold mb-6 text-[#43484e]">
              {giftIdea?.aboutHeading}
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

            <div className="discovery-text font-nb-international">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-[#43484e]">
                <p className="text-sm md:text-base leading-relaxed text-justify">{giftIdea?.aboutDescription1}</p>
                <p className="text-sm md:text-base leading-relaxed text-justify">{giftIdea?.aboutDescription2}</p>
              </div>
              <p className="font-trajan-pro font-bold text-sm md:text-base leading-relaxed text-center mt-6 text-[#43484e]">
                {giftIdea?.aboutDescription3}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-5">
          <h2 className="font-trajan-pro text-xl md:text-3xl font-bold text-center text-[#43484e] mb-12 md:mb-16">
            {giftIdea?.optionsTitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {giftIdea?.giftOptions?.map((option, index) => {
              const imageUrl = giftCardImages[index % giftCardImages.length]
              return (
                <Link
                  key={index}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`${index === 0 ? "col-span-2 md:col-span-1" : "col-span-1"} block relative h-80 md:h-[480px]`}
                >
                  <Image src={imageUrl || "/placeholder.svg"} alt={option.title} fill className="object-contain" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
