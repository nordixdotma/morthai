"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, ChevronDown, Calendar } from 'lucide-react'
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [reservationModalOpen, setReservationModalOpen] = useState(false)
  const [reservationCount] = useState(3) // Mock data - replace with real data
  const pathname = usePathname()

  const languages = [
    {
      code: "fr",
      name: "Français",
      flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    },
    {
      code: "en",
      name: "English",
      flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (languageDropdownOpen && !target.closest('.language-dropdown-container')) {
        setLanguageDropdownOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [languageDropdownOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (reservationModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [reservationModalOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigationLinks = [
    { href: "/", label: "HOME" },
    { href: "#", label: "Massages" },
    { href: "#", label: "Hammam" },
    { href: "#", label: "Hammam massage package" },
    { href: "#", label: "Facial care" },
    { href: "/tariffs", label: "Prices" }, // updated Prices link to point to /tariffs
    { href: "#", label: "Home massage" },
    { href: "#", label: "Gift idea" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent",
      )}
    >
      <Container className="max-w-7xl mx-auto">
        {/* Mobile layout - three columns */}
        <div className="md:hidden flex h-16 items-center justify-between">
          {/* Left: Language Switcher */}
          <div className="relative z-20 language-dropdown-container">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                }`}
            >
              <img
                src={languages.find((lang) => lang.code === language)?.flag || "/placeholder.svg"}
                alt={language}
                className="w-6 h-4 object-cover rounded"
              />
              <span
                className={`text-sm font-medium uppercase ${scrolled ? "text-gray-800" : "text-white"}`}
              >
                {language}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${languageDropdownOpen ? "rotate-180" : ""
                  } ${scrolled ? "text-gray-800" : "text-white"}`}
              />
            </button>

            {languageDropdownOpen && (
              <div className="absolute left-0 top-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[140px] z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as "en" | "fr")
                      setLanguageDropdownOpen(false)
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-primary/20 transition-colors ${lang.code === language ? "bg-primary/10" : ""
                      }`}
                  >
                    <img src={lang.flag || "/placeholder.svg"} alt={lang.name} className="w-6 h-4 object-cover rounded" />
                    <span className="text-sm font-medium text-gray-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
            <div className="relative h-14 w-28">
              <Image
                src={scrolled ? "/logo.svg" : "/whitelogo.svg"}
                alt="Enchanting Association Logo"
                fill
                className="object-contain transition-opacity duration-300"
                priority
              />
            </div>
          </Link>

          {/* Right: Menu Button */}
          <div className="flex items-center gap-2 z-20">
            {/* Modern Menu Button */}
            <button
              onClick={toggleMenu}
              className={`relative flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors ${scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                }`}
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300"
              >
                <path
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"}
                  stroke={scrolled ? "#1f2937" : "#ffffff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop layout - two rows */}
        <div className="hidden md:block">
          {/* First row: Language Switcher, Logo (centered), and Reservation Badge */}
          <div className="flex h-20 items-center justify-between relative">
            {/* Left: Language Switcher */}
            <div className="relative language-dropdown-container">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                  }`}
              >
                <img
                  src={languages.find((lang) => lang.code === language)?.flag || "/placeholder.svg"}
                  alt={language}
                  className="w-6 h-4 object-cover rounded"
                />
                <span
                  className={`text-sm font-medium uppercase ${scrolled ? "text-gray-800" : "text-white"}`}
                >
                  {language}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${languageDropdownOpen ? "rotate-180" : ""
                    } ${scrolled ? "text-gray-800" : "text-white"}`}
                />
              </button>

              {languageDropdownOpen && (
                <div className="absolute left-0 top-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[160px] z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as "en" | "fr")
                        setLanguageDropdownOpen(false)
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-primary/20 transition-colors ${lang.code === language ? "bg-primary/10" : ""
                        }`}
                    >
                      <img src={lang.flag || "/placeholder.svg"} alt={lang.name} className="w-6 h-4 object-cover rounded" />
                      <span className="text-sm font-medium text-gray-800">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
              <div className="relative h-16 w-32">
                <Image
                  src={scrolled ? "/logo.svg" : "/whitelogo.svg"}
                  alt="Enchanting Association Logo"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                />
              </div>
            </Link>

            {/* Right: Reservation Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setReservationModalOpen(true)}
                className="relative inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-lg p-2.5 transition-colors"
                aria-label="Reservation history"
              >
                <Calendar className="w-5 h-5" />
                {reservationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {reservationCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Second row: Navigation with border */}
          <div
            className={cn("border-t transition-colors duration-300", scrolled ? "border-gray-200" : "border-white/20")}
          >
            <nav className="flex items-center justify-center gap-8 py-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-trajan-pro uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                    } ${pathname === link.href ? "text-primary" : ""}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Container>

      {/* Mobile Menu - Improved UI/UX */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay with blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={toggleMenu}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[350px] z-50 md:hidden overflow-y-auto bg-white shadow-2xl"
            >
              <div className="h-full flex flex-col">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Link href="/" className="inline-block" onClick={toggleMenu}>
                    <div className="relative h-10 w-28">
                      <Image src="/logo.svg" alt="Enchanting Logo" fill className="object-contain" priority />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMenu}
                    className="rounded-full hover:bg-gray-100 text-black"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke="currentColor"          // <- make path use currentColor
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>

                </div>

                {/* Navigation links */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <nav className="space-y-1">
                    {/* Navigation links */}
                    {navigationLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center py-3 px-4 rounded-xl text-gray-800 hover:bg-gray-100 transition-colors ${pathname === link.href ? "bg-primary/20 text-primary" : ""
                            }`}
                          onClick={toggleMenu}
                        >
                          <span className="font-medium text-lg font-trajan-pro uppercase">{link.label}</span>
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                <div className="p-6 border-t border-gray-200 space-y-3">
                  {/* Reservation Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => {
                      setReservationModalOpen(true)
                      toggleMenu()
                    }}
                    className="relative w-full flex items-center justify-center py-3 px-6 bg-primary text-white font-medium text-base font-trajan-pro uppercase transition-all duration-300 hover:bg-primary/90 rounded-lg"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Reservations
                    {reservationCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {reservationCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Link
                      href="/contact"
                      className="flex items-center justify-center py-3 px-6 bg-gray-200 text-gray-800 font-medium text-base font-trajan-pro uppercase transition-all duration-300 hover:bg-gray-300 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      CONTACT
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
      <AnimatePresence>
        {reservationModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setReservationModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              onClick={() => setReservationModalOpen(false)}
            >
              <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-md pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold font-trajan-pro text-gray-900">Reservation History</h2>
                  <button
                    onClick={() => setReservationModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 max-h-80 overflow-y-auto">
                  <div className="space-y-2">
                    {/* Sample reservation items - replace with real data */}
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">Thai Massage</h3>
                      <p className="text-xs text-gray-600">Nov 15, 2025 - 2:00 PM</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">Hammam Treatment</h3>
                      <p className="text-xs text-gray-600">Nov 10, 2025 - 4:30 PM</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">Facial Care</h3>
                      <p className="text-xs text-gray-600">Nov 5, 2025 - 11:00 AM</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => setReservationModalOpen(false)}
                    className="w-full bg-primary text-white py-2 px-4 rounded font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
