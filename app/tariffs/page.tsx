"use client"

import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"

const massageServices = [
  { name: "Thai Ancestral en Kimono", "30": "x", "60": 530, "90": 730, "120": 930 },
  { name: "Harmonie des Énergies Thaï", "30": "x", "60": 580, "90": 820, "120": 1020 },
  { name: "Toucher Guérison Anti-Stress | Signature Mor Thaï", "30": "x", "60": 630, "90": 870, "120": 1070 },
  { name: "Berceau des Paumes", "30": "x", "60": 580, "90": 820, "120": 1020 },
  { name: "Secret des plantes médicinales de Kalasin", "30": "x", "60": 930, "90": 1150, "120": "x" },
  { name: "L'Instant Sacré Future Maman", "30": "x", "60": 620, "90": 870, "120": "x" },
  { name: "Evasion Balinaise", "30": "x", "60": 580, "90": 820, "120": "x" },
  { name: "Silhouette Sublime – Adieu Cellulite", "30": 400, "60": 680, "90": "x", "120": "x" },
  { name: "Réveil Musculaire & Performance d'Athlète", "30": "x", "60": 600, "90": 850, "120": "x" },
  { name: "Symphonie Thaï à Quatre Mains", "30": "x", "60": 1020, "90": "x", "120": "x" },
  { name: "La réflexologie plantaire", "30": 350, "60": 580, "90": "x", "120": "x" },
  { name: "Relâchement Tête & Nuque", "30": 350, "60": 580, "90": "x", "120": "x" },
  { name: "Thérapie Dos & Épaules", "30": 380, "60": 630, "90": "x", "120": "x" },
  { name: "Petit Ange (2–10 ans)", "30": "x", "60": 430, "90": "x", "120": "x" },
]

const facialServices = [
  { name: "Soin Pureté Éclat", "30": 400, "60": 550, "90": "x", "120": "x" },
  { name: "Soin Prestige Anti-Âge", "30": 450, "60": 600, "90": "x", "120": "x" },
]

const PriceTable = ({ title, data, t }: { title: string; data: typeof massageServices; t: any }) => (
  <div className="space-y-4">
    <h2 className="text-2xl md:text-3xl font-trajan-pro font-bold text-[#b64a26]">{title}</h2>
    <div className="overflow-x-auto rounded-lg border border-[#e5d5cc] shadow-sm">
      <table className="w-full min-w-full">
        <thead>
          <tr className="bg-gradient-to-r from-[#f5ede5] to-[#f9f1eb] border-b border-[#e5d5cc]">
            <th className="text-left py-4 px-2 md:px-4 font-lato font-semibold text-[#333] text-xs md:text-sm min-w-[140px] md:min-w-[180px]">
              Service
            </th>
            <th className="text-center py-4 px-1 md:px-3 font-lato font-semibold text-[#333] text-xs">
              {t.tariffs.duration["30"]}
            </th>
            <th className="text-center py-4 px-1 md:px-3 font-lato font-semibold text-[#333] text-xs">
              {t.tariffs.duration["60"]}
            </th>
            <th className="text-center py-4 px-1 md:px-3 font-lato font-semibold text-[#333] text-xs">
              {t.tariffs.duration["90"]}
            </th>
            <th className="text-center py-4 px-1 md:px-3 font-lato font-semibold text-[#333] text-xs">
              {t.tariffs.duration["120"]}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((service, index) => (
            <tr
              key={index}
              className={`border-b border-[#e5d5cc] transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-[#fef9f6]"} hover:bg-[#fef5f0] group`}
            >
              <td className="py-4 px-2 md:px-4 font-lato text-[#333] text-xs md:text-sm font-medium group-hover:text-primary transition-colors">
                {service.name}
              </td>
              <td className="text-center py-4 px-1 md:px-3 font-lato text-[#b64a26] font-bold text-xs md:text-sm">
                {service["30"] === "x" ? "x" : `${service["30"]}`}
              </td>
              <td className="text-center py-4 px-1 md:px-3 font-lato text-[#b64a26] font-bold text-xs md:text-sm">
                {service["60"] === "x" ? "x" : `${service["60"]}`}
              </td>
              <td className="text-center py-4 px-1 md:px-3 font-lato text-[#b64a26] font-bold text-xs md:text-sm">
                {service["90"] === "x" ? "x" : `${service["90"]}`}
              </td>
              <td className="text-center py-4 px-1 md:px-3 font-lato text-[#b64a26] font-bold text-xs md:text-sm">
                {service["120"] === "x" ? "x" : `${service["120"]}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default function TariffsPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen">
      <PageHeroSection title={t.tariffs.pageTitle} />
      <section className="tariffs-section py-16 md:py-20 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl relative overflow-hidden">
        <div className="w-full max-w-5xl mx-auto px-2 md:px-4 py-12 md:py-16 relative z-10">
          <div className="space-y-14">
            <PriceTable title={t.tariffs.massage} data={massageServices} t={t} />
            <PriceTable title={t.tariffs.facialCare} data={facialServices} t={t} />
          </div>

          <div className="mt-16 pt-12 border-t border-[#e5d5cc]">
            <p className="font-lato text-[#666] text-center text-sm md:text-base leading-relaxed">
              {t.tariffs.infoText}
              <br className="hidden sm:block" />
              {t.tariffs.contactInfo}{" "}
              <a href="tel:+212610200040" className="font-semibold text-[#b64a26] hover:underline transition-colors">
                +212 610 200 040
              </a>{" "}
              {t.tariffs.or}{" "}
              <a href="tel:+212610705876" className="font-semibold text-[#b64a26] hover:underline transition-colors">
                +212 610 705 876
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
