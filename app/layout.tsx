import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Mor Thai | Thai Massage in Marrakech",
  description:
    "Mor Thai offers authentic Thai massage and spa services in Marrakech. Located in Gueliz, we provide traditional Thai therapeutic massage, relaxation treatments, and wellness services.",
  keywords: ["Thai massage", "Marrakech", "Spa", "Massage", "Wellness", "Gueliz", "Traditional Thai massage", "Mor Thai"],
  authors: [{ name: "Mor Thai" }],
  creator: "Mor Thai",
  publisher: "Mor Thai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://morthai-marrakech.com/",
    title: "Mor Thai | Thai Massage in Marrakech",
    description: "Authentic Thai massage and spa services in Marrakech, Gueliz",
    siteName: "Mor Thai",
    images: [
      {
        url: "https://morthai-marrakech.com/og-image.png",
        width: 800,
        height: 600,
        alt: "Mor Thai Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mor Thai | Thai Massage in Marrakech",
    description: "Authentic Thai massage and spa services in Marrakech, Gueliz",
    images: ["https://morthai-marrakech.com/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-y-scroll">
      <head>
        <link href="https://fonts.cdnfonts.com/css/optimus-princeps" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/lato" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.cdnfonts.com/css/optima" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" as="style" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={`${workSans.variable} font-work-sans overflow-x-hidden`}>
        <script dangerouslySetInnerHTML={{
          __html: `window.scrollTo(0, 0);`
        }} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="fixed inset-0 z-[-1]">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/videoframe_0.png"
            >
              <source src="/background.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
          </div>

          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
