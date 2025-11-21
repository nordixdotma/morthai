"use client"

import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"

const massageServices = [
  { name: "Ancestral Thai in Kimono", "30": 530, "60": 730, "90": 930, "120": "-" },
  { name: "Thai Energy Harmony", "30": 580, "60": 820, "90": 1020, "120": "-" },
  { name: "Healing Anti-Stress Touch | MorThai Signature", "30": 630, "60": 870, "90": 1070, "120": "-" },
  { name: "Cradle of Palms", "30": 580, "60": 820, "90": 1020, "120": "-" },
  { name: "Secret of Medicinal Herbs from Kalasin", "30": "-", "60": 930, "90": 1150, "120": "-" },
  { name: "Mum to be sacred moment", "30": "-", "60": 620, "90": 870, "120": "-" },
  { name: "Balinese Escape", "30": "-", "60": 580, "90": 820, "120": "-" },
  { name: "Sculpted Silhouette", "30": 400, "60": 680, "90": "-", "120": "-" },
  { name: "Sports Muscle Revival", "30": 600, "60": 850, "90": "-", "120": "-" },
  { name: "Thai Four Hands Symphony", "30": "-", "60": "-", "90": 1020, "120": "-" },
  { name: "Foot Reflexology", "30": 350, "60": 580, "90": "-", "120": "-" },
  { name: "Head & Neck Tension release", "30": 350, "60": 580, "90": "-", "120": "-" },
  { name: "Back & Shoulders Therapy", "30": 380, "60": 630, "90": "-", "120": "-" },
  { name: "Little Angel (2-10 years)", "30": 430, "60": "-", "90": "-", "120": "-" },
]

const facialServices = [
  { name: "Purity Radiance Facial", "30": 400, "60": 550, "90": "-", "120": "-" },
  { name: "Anti-Aging Prestige Facial", "30": 450, "60": 600, "90": "-", "120": "-" },
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
                {service["30"] === "-" ? "—" : `${service["30"]}`}
              </td>
              <td className="text-center py-4 px-1 md:px-3 font-lato text-[#b64a26] font-bold text-xs md:text-sm">
                {service["60"] === "-" ? "—" : `${service["60"]}`}
              </td>
              <td className="text-center py-4 px-1 md:px-3 font-lato text-[#b64a26] font-bold text-xs md:text-sm">
                {service["90"] === "-" ? "—" : `${service["90"]}`}
              </td>
              <td className="text-center py-4 px-1 md:px-3 font-lato text-[#b64a26] font-bold text-xs md:text-sm">
                {service["120"] === "-" ? "—" : `${service["120"]}`}
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

          {/* Info Section */}
          <div className="mt-16 pt-12 border-t border-[#e5d5cc]">
            <p className="font-lato text-[#666] text-center text-sm md:text-base leading-relaxed">
              {t.tariffs.infoText}
              <br className="hidden sm:block" />
              {t.tariffs.contactInfo} <span className="font-semibold text-[#b64a26]">+212 610 200 040</span>{" "}
              {t.tariffs.or} <span className="font-semibold text-[#b64a26]">+212 610 705 876</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
