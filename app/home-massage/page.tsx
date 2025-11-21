"use client"

import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"

export default function HomeMassagePage() {
  const t = useTranslations()

  return (
    <main className="min-h-screen">
      <PageHeroSection title={t.homeMassage?.pageTitle || "Home Massage"} />
      <section className="service-section py-16 md:py-20 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        {/* Empty state for now */}
      </section>
    </main>
  )
}
