"use client"

import { useState, useEffect, useRef } from "react"
import PageHeroSection from "@/components/page-hero-section"
import { useTranslations } from "@/lib/use-translations"
import Image from "next/image"
import MassageModal from "@/components/massage-modal"

const massageDetails: Record<string, string> = {
  "Ancestral Thai in Kimono":
    "Dating back more than 2500 years, traditional Thai massage has its roots in India, Ayurvedic medicine and yoga. Holistic, ancestral and energetic, traditional Thai massage is a source of serenity and inner peace.\n\nPracticed lying on a futon, dressed in a kimono and massaged from head to toe, the therapist alternates a sequence of deep pressure on different points and energy lines of your body, stretching postures of your muscles and Yoga techniques to release any form of tension accumulated by your body. The intensity of the moves adapts perfectly to your preferences to provide you with absolute relaxation.\n\nThe benefits of Thai massage are felt almost immediately. It recovers the body's natural vitality, removes blockages and muscular tensions and improves blood circulation in your body.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Thai Energy Harmony":
    "Our Thai massage with organic aromatic oils involves direct contact with your skin. The therapist alternates fluid movements, deep pressures which stimulate your body's energy lines and points with gentle tapping and smooth muscle stretching.\n\nThe oils used during the massage nourish, hydrate and tone your skin leaving a smooth and relaxing therapeutic effect. Our selection of oil differs depending on the season. To give you perfect comfort, hot oils are used during the cold season and normal oils are used in summer.\n\nThe combination of scents in the essential oils with calming, purifying and therapeutic properties ensures the absolute relaxation and wellness created by your Thai massage.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Healing Anti-Stress Touch | MorThai Signature":
    "For a unique sensory experience, we have created our Signature Massage. This Thai therapeutic treatment is practised with essential oils and homemade pain relief balm made from medicinal plants from Thailand.\n\nIn this magical and therapeutic ritual, we invite you to experience a variety of aromatic and emotional sensation. From head to toe, the therapist will identify areas of tension, focussing on releasing them. She will also practice fluid and harmonious moves, helping you disconnect both physically and mentally. This massage relieves sore muscles and joint pains, improving blood circulation, bringing immediate muscle relaxation and well-being.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Cradle of Palms":
    "During the anti-stress relaxing massage, the therapist's movements, music and aromas are harmoniously combined to offer a luxurious relaxation in a cloud of sensory natural oils! This massage combines celestial happiness, deep muscle relaxation, magical aromatherapy and nourishing skin care.\n\nIt is a gentle and relaxing massage creating a complete harmony of body and mind.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Secret of Medicinal Herbs from Kalasin":
    "The traditional Thai massage with hot herbal pads is an ancient therapy from Thailand. The miraculous pads contain a collection of Thai traditional herbs.\n\nHeated with steam and applied to the body, the medicinal herbs release their active ingredients and beneficial aromas. The combined effect of heat with the natural benefits of the herbs relieves your body's pain significantly, removes muscular tensions and improves blood circulation.\n\nThis massage helps treat stress, those with health problems or painful muscles.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Mum to be sacred moment":
    "During pregnancy, you look forward to experience the joy of being a MUM. But the pain and discomfort worries you. Our pregnancy massage will help you minimize these feelings during this time, relieving back, ankle and leg tension.\n\nFor this massage, we use natural, odourless and hypoallergenic oils to saturate your skin with nutrients, alleviating the appearance of stretch marks.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Balinese Escape":
    "Dive into a unique sensory journey with our Balinese massage in Marrakech, an ancestral ritual blending gentleness and energy. Inspired by traditions from Bali, it combines deep pressure, gentle stretches, and fluid movements to restore balance to both body and mind. Perfect for releasing muscle tension, stimulating blood circulation and achieving deep relaxation, this treatment transports you to an exotic and revitalizing experience in the heart of Marrakech.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Sculpted Silhouette":
    "At Mor Thai Marrakech, not only can you immerse yourself in an atmosphere of relaxation and pleasure, you can also benefit from a corrective massage to maintain an ideal body shape and a sculpted, smooth silhouette. Furthermore, with the therapist's deep palpating, rolling movement, together with a mixture of natural oils will help to drain fat, stimulate lymphatic circulation, eliminate toxins, improve skin elasticity and reduce cellulite significantly.\n\nAt the end of this treatment you will feel an incredible sensation of lightness and a pleasant relaxation.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Sports Muscle Revival":
    "After a sports session, a long walk or intense physical effort, muscle pain is inevitable. Mor Thai Marrakech offers you a magical ritual which can help rejuvenate your muscles. This massage is practiced by working the muscles deeply, it quickly restores muscle performance, relieve pain and significantly increase your physical endurance.\n\nThis treatment is relaxing, energizing and detoxyfying. The effects of this massage can be beneficial before, during or after a competition to prepare the muscles, to prevent injuries, to reduce muscular tension and relax your body to recover more quickly.\n\nAfter pampering your body, the desire to aim for new victories will be irresistible!\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Thai Four Hands Symphony":
    "Pamper yourself and get the most out of the Thai massage experience by choosing the Four-hands massage. Two expert therapists, trained and experienced in performing this massage, carry out perfectly synchronized movements with identical pressure.\n\nA magical multi-sensory massage combining the properties of essential oils, relaxing music and the deep harmonized movements, take you on a journey of absolute serenity and ultimate freedom.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Foot Reflexology":
    "Inspired by an ancestral therapy originating from oriental medicine, foot reflexology involves stimulating reflex zones on the soles of the feet, which correspond to the main organs of the body. With an extremely careful touch, our therapist locates the areas of tension and helps to restore balance to the corresponding area of body.\n\nThis magical technique helps to release stress, eliminates nervous tension and improve blood circulation, providing you with complete relaxation of body and mind.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Head & Neck Tension release":
    "At Mor Thai, we offer you the ideal head massage. Our aim is to provide you with the much-needed break with intense pleasure you deserve. Our therapist's expert hands perform a set of smooth and harmonious moves to the head to give you a feeling of deep, inner relaxation.\n\nBeyond its effectiveness for people who suffer from migraine or headaches, this massage guarantees good blood stimulation, helping release accumulated tension and providing therapeutic pain relief.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Back & Shoulders Therapy":
    "Because of our accelerated lifestyle, the back becomes knotted and the shoulders become heavy. We suggest you experience an ultimate unrivalled moment with our specialist Back and Shoulder massage, relieving accumulated tension along the vertebral axis.\n\nAn extremely relaxing massage to remove Back and Shoulder pain, specially relieving the discomfort experienced by those often sitting at desk, thus boosting the body's energy.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Little Angel (2–10 years)":
    "At Mor Thai, we never stop thinking about the well-being of each of our guests, even the youngest ones! This is why we have created a massage specially dedicated for kids until 12 years old. The benefits of this massage are countless, ideal to help children to overcome the difficulties they may face.\n\nThis can be especially helpful during stressful and tense exam periods, offering them moments of relaxation and well-being in a Zen and wonderful environment. The pressure of the therapist's hands are adjusted, the aromatic oils adapted perfectly to their taste, will offer them joy and pleasure.\n\nDuring this massage, the child must be accompanied by a parent. The parent can choose to be pampered too with a pleasant massage or just wait their child while enjoying peace and calm in our lounge.\n\nFor an unforgettable and intimate experience for the whole family, we have dual or triple cabins where everyone can be massaged next to each other.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Purity Radiance Facial":
    "Are you looking for a hydrating and deep cleansing treatment for your face ?\n\nThis purifying face care, combined with the quality of natural cosmetic products from Thailand and the expertise of traditional modeling practiced manually, eliminates effectively dead cells, energizes and hydrates the skin deeply.\n\nIt all starts with the application of warm compresses to open the pores, then a deep cleansing with virgin coconut oil and rose water to revitalize the skin, followed by a regenerating scrub using a Thai herbal hydrating mask, and to finish peacefully, a relaxing facial massage with a hydrating cream to bring you a soft, smooth and radiant skin and a perfectly relaxed mind.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
  "Anti-Aging Prestige Facial":
    "Inspired from Thai beauty rituals, this soothing facial treatment will let yourself be invaded by the delicate fragrances from Thailand's natural cosmetics.\n\nIt begins with a gentle application of warm compresses on the face to open the pores, followed by a deep cleansing with virgin coconut oil and rose water for perfectly cleansed and hydrated skin, then a gentle exfoliation using a moisturizing and nourishing mask made from Thai cosmetic herbs.\n\nFinally an excellent anti-aging facial massage is practiced to target the facial muscles in depth to lift and firm the skin.\n\nFor all same-day reservations, please contact us on +212 524 207 055",
}

export default function HomeMassagePage() {
  const t = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedMassage, setSelectedMassage] = useState<string | null>(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const homeMassage = t.homeMassage

  return (
    <main className="min-h-screen">
      <PageHeroSection title="Home Massage" />

      <section className="service-section py-16 md:py-24 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
          <h2 className="font-trajan-pro text-xl md:text-2xl font-bold text-center text-[#43484e] mb-0 leading-relaxed">
            {homeMassage?.heroTitle}
          </h2>
          {/* Main Content - Image Left, Text Right */}
          <div
            ref={sectionRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="/sections/e3.jpg" alt="Home massage" fill className="object-cover" />
            </div>
            <div className="space-y-4">
              <h3 className="font-trajan-pro text-2xl md:text-3xl font-bold text-[#43484e]">
                {homeMassage?.mainTitle}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-justify text-gray-700">
                {homeMassage?.mainDescription}
              </p>
            </div>
          </div>

          {/* Prices Section */}
          <div
            className={`bg-white rounded-lg shadow-md p-8 md:p-12 border-l-4 border-[#a87e72] transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h3 className="font-trajan-pro text-2xl md:text-3xl font-bold text-[#43484e] mb-6">
              {homeMassage?.pricesTitle}
            </h3>
            <div className="space-y-4">
              {homeMassage?.prices?.map((priceItem, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <span className="font-semibold text-gray-800">{priceItem.distance}</span>
                  {priceItem.time60 ? (
                    <span className="text-sm text-gray-600">
                      {priceItem.time60} (60min) | {priceItem.time90} (90min)
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600">{priceItem.note}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Massages Grid */}
          <div className="space-y-8">
            <h2 className="font-trajan-pro text-2xl md:text-3xl font-bold text-center text-[#43484e]">
              {homeMassage?.massagesTitle}
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {homeMassage?.massages?.map((massage, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMassage(massage)}
                  className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg hover:bg-[#f5ede8] transition-all duration-300 flex items-center justify-center text-center min-h-24 cursor-pointer group"
                >
                  <p className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-[#a87e72] transition-colors duration-300">
                    {massage}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MassageModal
        isOpen={selectedMassage !== null}
        title={selectedMassage || ""}
        details={homeMassage?.massageDetails?.[selectedMassage as keyof typeof homeMassage.massageDetails] || ""}
        onClose={() => setSelectedMassage(null)}
      />
    </main>
  )
}
