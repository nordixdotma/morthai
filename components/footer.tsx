"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MapPin, Phone, Mail, Heart } from 'lucide-react'
import { Container } from "@/components/ui/container"
import { useState } from "react"

export default function Footer() {
  const [heartClicks, setHeartClicks] = useState(0)
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/massagethailandaismarrakech.ma/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/morthai_spathailandais/", label: "Instagram" },
  ]

  const usefulLinks = [
    { href: "#", label: "Massages" },
    { href: "#", label: "Hammam massage package" },
    { href: "#", label: "Facial care" },
    { href: "#", label: "Prices" },
    { href: "#", label: "Home massage" },
    { href: "#", label: "Gift idea" },
    { href: "#", label: "Contact" },
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      value: "N° 52, 5ème Etage, Immeuble Le Noyer B, Rue Ibn Sina Atlassi, Gueliz, Marrakech (at the back of American Language Center)",
      link: false,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+212 524 207 055",
      link: "tel:+212524207055",
    },
    {
      icon: Mail,
      title: "Email",
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
    <footer className="footer-section rounded-t-[1rem] md:rounded-t-[2rem] relative">
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
              <p className="text-sm leading-relaxed text-white/90 mb-8 font-work-sans">
                Experience authentic Thai massage and spa treatments in Marrakech. Mor Thai brings traditional Thai wellness and relaxation to the heart of Gueliz.
              </p>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white font-optima">Follow Us</h4>
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

            {/* Useful Links */}
            <div>
              <h3 className="font-optima mb-6 text-xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-4">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="inline-block text-white/90 text-sm transition-all duration-300 hover:text-primary relative group font-work-sans"
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
              <h3 className="font-optima mb-6 text-xl font-bold text-white">Contact Info</h3>
              <ul className="space-y-6">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary/70 mr-4 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white font-optima">{item.title}</p>
                      {item.link ? (
                        <p className="mt-1 text-sm text-white/90 font-work-sans">
                          <a
                            href={typeof item.link === "string" ? item.link : undefined}
                            className="transition-all duration-300 hover:text-primary relative group"
                          >
                            {item.value}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                          </a>
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-white/90 font-work-sans">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Security */}
            <div>
              <h3 className="font-optima mb-6 text-xl font-bold text-white">Pay Safely With Us</h3>
              <p className="text-sm leading-relaxed text-white/90 mb-6 font-work-sans">
                The payment is encrypted and transmitted securely with an SSL protocol.
              </p>
              <div className="mt-6">
                <Image
                  src="/creditcard-logo.png"
                  alt="Accepted Payment Methods"
                  width={300}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Copyright */}
      <div className="border-t border-white/30 py-6 relative z-10">
        <Container className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/90 font-work-sans">
              © {currentYear} Mor Thai. All rights reserved.
            </p>
            <p className="text-sm text-white/90 flex items-center font-work-sans">
              Made with
              <button onClick={handleHeartClick} className="mx-1 p-1" aria-label="Click the heart">
                <Heart
                  className={`h-4 w-4 transition-all duration-300 ${
                    isHeartAnimating ? "scale-150 text-red-400" : "text-primary"
                  }`}
                  fill={heartClicks > 0 ? "#f87171" : "none"}
                />
                {heartClicks > 0 && <span className="sr-only">Heart clicked {heartClicks} times</span>}
              </button>
              in Marrakech
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
