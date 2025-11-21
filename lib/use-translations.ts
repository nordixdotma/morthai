"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslations } from "@/lib/translations"

export function useTranslations() {
  const { language } = useLanguage()
  return getTranslations(language)
}
