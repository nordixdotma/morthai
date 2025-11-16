"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, ChevronDown } from 'lucide-react'
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr">("en")
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigationLinks = [
    { href: "/", label: "HOME" },
    { href: "#", label: "Massages" },
    { href: "#", label: "Hammam" },
    { href: "#", label: "Hammam massage package" },
    { href: "#", label: "Facial care" },
    { href: "#", label: "Prices" },
    { href: "#", label: "Home massage" },
    { href: "#", label: "Gift idea" },
    { href: "#", label: "Contact" },
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

          {/* Right: Modern Menu Button */}
          <button
            onClick={toggleMenu}
            className={`relative z-20 flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors ${scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
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

        {/* Desktop layout - two rows */}
        <div className="hidden md:block">
          {/* First row: Language Switcher, Logo (centered), and Contact */}
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

            {/* Right: Contact */}
            <div className="flex items-center">
              <Link
                href="mailto:contact@enchanting.org"
                className="bg-primary text-white px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary/90 font-optimus-princeps uppercase"
              >
                CONTACT
              </Link>
            </div>
          </div>

          {/* Second row: Navigation with border */}
          <div
            className={cn("border-t transition-colors duration-300", scrolled ? "border-gray-200" : "border-white/20")}
          >
            <nav className="flex items-center justify-center gap-8 py-2">
              <Link
                href="/"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  } ${pathname === "/" ? "text-primary" : ""}`}
              >
                HOME
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Massages
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Hammam
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Hammam massage package
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Facial care

                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Prices
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Home massage
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Gift idea
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="#"
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group font-optimus-princeps uppercase tracking-wider ${scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  }`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
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

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[350px] z-50 md:hidden overflow-y-auto bg-black/80 backdrop-blur-md shadow-2xl"
            >
              <div className="h-full flex flex-col">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <Link href="/" className="inline-block" onClick={toggleMenu}>
                    <div className="relative h-10 w-28">
                      <Image src="/whitelogo.svg" alt="Enchanting Logo" fill className="object-contain" priority />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMenu}
                    className="rounded-full hover:bg-white/10 text-white"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="sr-only">Close menu</span>
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
                          className={`flex items-center py-3 px-4 rounded-xl text-white hover:bg-white/10 transition-colors ${pathname === link.href ? "bg-primary/20 text-primary" : ""
                            }`}
                          onClick={toggleMenu}
                        >
                          <span className="font-medium text-lg font-optimus-princeps uppercase">{link.label}</span>
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                <div className="p-6 border-t border-white/10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Link
                      href="tel:+212524207055"
                      className="flex items-center justify-center py-4 px-6 bg-primary text-white font-medium text-lg font-optimus-princeps uppercase transition-all duration-300 hover:bg-primary/90"
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
    </header>
  )
}
