"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PageHeroSection from "@/components/page-hero-section"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: "N° 52, 5ème Étage, Immeuble Le Noyer B",
      subDetails: "Rue Ibn Sina Atlassi, Gueliz, Marrakech"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+212 524 207 055",
      subDetails: "+212 610 200 040 / +212 610 705 876",
      link: "tel:+212524207055"
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@morthai-marrakech.com",
      link: "mailto:contact@morthai-marrakech.com"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "10:00 - 22:00",
      subDetails: "Booking recommended"
    }
  ]

  return (
    <main className="min-h-screen">
      <PageHeroSection 
        title="Contact"
      />

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <Container className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-trajan-pro font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} className="text-primary hover:underline font-lato font-medium">
                      {item.details}
                    </a>
                  ) : (
                    <p className="text-gray-700 font-lato font-medium">{item.details}</p>
                  )}
                  {item.subDetails && (
                    <p className="text-gray-600 text-sm font-lato mt-1">{item.subDetails}</p>
                  )}
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container className="max-w-4xl mx-auto px-2 md:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-trajan-pro font-bold text-gray-900 mb-4">
              Send us a Message
            </h2>
            <p className="text-gray-600 font-lato">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-md p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-trajan-pro font-bold text-gray-900 mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-trajan-pro font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-trajan-pro font-bold text-gray-900 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-trajan-pro font-bold text-gray-900 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-trajan-pro font-bold text-gray-900 mb-2">
                Message
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please tell us more about your inquiry..."
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-lato"
              />
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-lato font-medium">
                  Thank you for your message! We'll be in touch soon.
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-trajan-pro font-bold py-3 px-8 rounded-lg transition-colors uppercase"
            >
              Send Message
            </Button>
          </form>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20 bg-[#fff8f5]">
        <Container className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-trajan-pro font-bold text-gray-900 mb-8 text-center">
            Visit Us
          </h2>
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="Mor Thai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.787314047447!2d-8.027944!3d31.629438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee1c4d4d0001%3A0x123456!2sMor%20Thai%20Spa!5e0!3m2!1sen!2sma!4v1234567890"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </Container>
      </section>

      {/* Social Links */}
      <section className="py-12 border-t border-gray-200 bg-white">
        <Container className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-trajan-pro font-bold text-lg text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/massagethailandaismarrakech.ma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-lg"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/morthai_spathailandais/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-lg"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 font-lato mb-2">
                Ready to book your massage?
              </p>
              <Link href="tel:+212524207055">
                <Button className="bg-primary hover:bg-primary/90 text-white font-trajan-pro font-bold uppercase">
                  Call Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
