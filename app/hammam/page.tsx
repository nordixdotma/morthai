"use client"

import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"

export default function HammamPage() {
  const t = useTranslations()

  return (
    <main className="min-h-screen">
      <PageHeroSection title={t.hammam?.pageTitle || "Hammam"} />
      <section className="service-section py-16 md:py-20 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        {/* Empty state for now */}
      </section>
    </main>
  )
}
