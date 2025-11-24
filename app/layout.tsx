import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lato } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalLayout from "@/components/conditional-layout"
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/lib/language-context"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#a87e72",
}

export const metadata: Metadata = {
  title: "Mor Thai | Authentic Thai Massage & Spa Services in Marrakech",
  description:
    "Experience authentic Thai massage, hammam rituals, and spa treatments in Marrakech. Mor Thai offers traditional Thai therapeutic massage, relaxation packages, and wellness services in Gueliz.",
  keywords: [
    "Thai massage Marrakech",
    "massage Gueliz",
    "hammam Marrakech",
    "spa Marrakech",
    "Thai therapy",
    "massage therapy",
    "wellness Marrakech",
    "traditional Thai massage",
    "therapeutic massage",
    "facial care",
    "Mor Thai",
  ],
  authors: [{ name: "Mor Thai", url: "https://morthai-marrakech.com" }],
  creator: "Mor Thai",
  publisher: "Mor Thai",
  category: "Wellness & Spa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://morthai-marrakech.com/",
    title: "Mor Thai | Authentic Thai Massage & Spa in Marrakech",
    description: "Traditional Thai massage, hammam rituals, and spa treatments in Marrakech, Gueliz",
    siteName: "Mor Thai",
    images: [
      {
        url: "https://morthai-marrakech.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mor Thai Thai Massage & Spa Marrakech",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mor Thai | Thai Massage & Spa Marrakech",
    description: "Authentic Thai massage and spa services in Marrakech",
    images: ["https://morthai-marrakech.com/og-image.png"],
    creator: "@morthai_spa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://morthai-marrakech.com/",
    languages: {
      "en-US": "https://morthai-marrakech.com/",
      "fr-FR": "https://morthai-marrakech.com/fr",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-y-scroll">
      <head>
        <link href="https://fonts.cdnfonts.com/css/trajan-pro" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" as="style" />
        <link rel="icon" href="/logo.svg" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Mor Thai",
              image: "https://morthai-marrakech.com/og-image.png",
              description: "Authentic Thai massage and spa services in Marrakech",
              url: "https://morthai-marrakech.com/",
              telephone: "+212610200040",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gueliz",
                addressLocality: "Marrakech",
                addressRegion: "Marrakech-Safi",
                postalCode: "",
                addressCountry: "MA",
              },
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "09:00",
                  closes: "20:00",
                },
              ],
              sameAs: ["https://facebook.com/morthai", "https://instagram.com/morthai"],
            }),
          }}
        />
      </head>
      <body className={`${lato.variable} font-lato overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </LanguageProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
