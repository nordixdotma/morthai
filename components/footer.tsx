"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react"
import { Container } from "@/components/ui/container"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useTranslations } from "@/lib/use-translations"

interface FooterProps {
  isHomepage?: boolean
}

export default function Footer({ isHomepage = false }: FooterProps) {
  const pathname = usePathname()
  const shouldRound = isHomepage || pathname === "/"
  const t = useTranslations()

  const [heartClicks, setHeartClicks] = useState(0)
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/massagethailandaismarrakech.ma/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/morthai_spathailandais/", label: "Instagram" },
  ]

  const usefulLinks = [
    { href: "/tariffs", label: t.header.prices },
    { href: "#", label: t.header.hammamPackage },
    { href: "#", label: t.header.facialCare },
    { href: "#", label: t.header.homeMassage },
    { href: "#", label: t.header.giftIdea },
    { href: "/contact", label: t.header.contact },
    { href: "/conditions", label: t.footer.conditions },
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: t.footer.address,
      value:
        "N° 52, 5ème Etage, Immeuble Le Noyer B, Rue Ibn Sina Atlassi, Gueliz, Marrakech (at the back of American Language Center)",
      link: false,
    },
    {
      icon: Phone,
      title: t.footer.phone,
      value: "+212 524 207 055",
      link: "tel:+212524207055",
    },
    {
      icon: Mail,
      title: t.footer.email,
      value: "contact@morthai-marrakech.com",
      link: "mailto:contact@morthai-marrakech.com",
    },
  ]

  const handleHeartClick = () => {
    setHeartClicks((prev) => prev + 1)
    setIsHeartAnimating(true)
    setTimeout(() => setIsHeartAnimating(false), 500)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className={`footer-section relative ${shouldRound ? "rounded-t-xl md:rounded-t-3xl" : ""}`}>
      <Container className="max-w-7xl mx-auto relative z-10">
        <div className="py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Vision */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <div className="relative h-16 w-32">
                  <Image src="/whitelogo.svg" alt="Mor Thai Logo" fill className="object-contain" priority />
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-white/90 mb-8 font-lato">{t.footer.vision}</p>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white font-trajan-pro">{t.footer.followUs}</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center bg-primary/70 text-white hover:bg-primary transition-all duration-300 hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-trajan-pro mb-6 text-lg font-bold text-white">{t.footer.quickLinks}</h3>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="inline-block font-nb-international text-white/90 text-sm transition-all duration-300 hover:text-primary relative group font-lato"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-trajan-pro mb-6 text-lg font-bold text-white">{t.footer.contactInfo}</h3>
              <ul className="space-y-6">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary/70 mr-4 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white font-trajan-pro">{item.title}</p>
                      {item.link ? (
                        <p className="mt-1 text-sm text-white/90 font-lato">
                          <a
                            href={typeof item.link === "string" ? item.link : undefined}
                            className="transition-all duration-300 hover:text-primary relative group"
                          >
                            {item.value}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                          </a>
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-white/90 font-lato">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-trajan-pro mb-6 text-lg font-bold text-white">{t.footer.paySafely}</h3>
              <p className="text-sm leading-relaxed text-white/90 mb-4 font-lato">{t.footer.paymentEncryption}</p>
              <div className="mt-6 mb-8">
                <Image
                  src="/creditcard-logo.png"
                  alt="Accepted Payment Methods"
                  width={300}
                  height={60}
                  className="object-contain"
                />
              </div>

              <h4 className="font-trajan-pro mb-3 text-sm font-bold text-white">{t.footer.awards}</h4>
              <p className="text-xs leading-relaxed text-white/90 font-lato">{t.footer.awardsText}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Copyright */}
      <div className="border-t border-white/30 py-6 relative z-10">
        <Container className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/90 font-lato">
              © {currentYear} {t.footer.copyright}
            </p>
            <p className="text-sm text-white/90 flex items-center font-lato">
              {t.footer.madeBy}{" "}
              <Link
                href="https://nexusdweb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold ml-1"
              >
                Nexusweb
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
