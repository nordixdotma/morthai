"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const defaultLanguage: Language = "en"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Try to get language from cookie
    const cookieLanguage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("language="))
      ?.split("=")[1] as Language | undefined

    if (cookieLanguage && (cookieLanguage === "en" || cookieLanguage === "fr")) {
      setLanguageState(cookieLanguage)
    } else {
      // Get browser language preference
      const browserLanguage = navigator.language.split("-")[0]
      const detectedLanguage = browserLanguage === "fr" ? "fr" : "en"
      setLanguageState(detectedLanguage)
      // Set cookie for first time
      document.cookie = `language=${detectedLanguage}; path=/; max-age=${365 * 24 * 60 * 60}`
    }

    setIsMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    document.cookie = `language=${lang}; path=/; max-age=${365 * 24 * 60 * 60}`
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
