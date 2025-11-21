"use client"

import { Container } from "@/components/ui/container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"

export default function ConditionsPage() {
  const t = useTranslations()
  const sections = t.conditions.sections

  return (
    <main className="min-h-screen">
      <PageHeroSection title={t.conditions.pageTitle} />

      {/* Content Section */}
      <section className="py-16 md:py-20 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <Container className="max-w-6xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <Accordion type="single" collapsible className="space-y-4">
              {sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-300 rounded-lg bg-white"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors font-trajan-pro font-bold text-gray-900">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white text-gray-700 font-lato border-t border-gray-200">
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Last Updated Info */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 font-lato">
              <strong>{t.conditions.lastUpdated}</strong> {t.conditions.lastUpdatedDate}. {t.conditions.applicableToAll}
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}
